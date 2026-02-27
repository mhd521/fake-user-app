# Cloud-Native Quality Engineering Showcase: Fake User App

[![CI - Kind + Playwright](https://github.com/mhd521/fake-user-app/actions/workflows/ci.yml/badge.svg)](https://github.com/mhd521/fake-user-app/actions/workflows/ci.yml)

A **Senior SDET / Quality Platform Engineering** portfolio project demonstrating a complete, production-grade "Shift-Left" quality lifecycle — bridging **Java/Spring Boot development**, **Kubernetes infrastructure**, and **Playwright automation** in a single end-to-end CI/CD pipeline.

---

## 👋 What This Demonstrates (For Hiring Managers)

Most SDET portfolios show a test framework in isolation. This project shows the full picture: a real service, a real database, a real Kubernetes environment, and a real automated quality gate — all wired together and running on every commit via GitHub Actions.

| Capability | How It's Demonstrated |
|---|---|
| **Test Automation (Playwright/TypeScript)** | API test suite validating live, cluster-deployed endpoints |
| **CI/CD Pipeline Design** | Multi-stage GitHub Actions workflow: build → deploy → test → report |
| **Kubernetes Engineering** | Full K8s manifests: Namespace, Deployment, StatefulSet, Service |
| **Reliability Engineering** | Liveness/Readiness probes, resource limits, OOMKilled prevention |
| **Security-Minded Development** | Multi-stage Docker build, non-root container user |
| **Observability & RCA Support** | Automatic log + cluster-state artifact capture on pipeline failure |
| **Backend Development** | Spring Boot REST API with PostgreSQL integration (Spring JPA) |

---

## 🏗️ Architecture Overview

```
GitHub Actions CI
│
├── 1. Build        → Multi-stage Docker image (non-root, hardened)
├── 2. Orchestrate  → Provision ephemeral Kind (Kubernetes-in-Docker) cluster
├── 3. Deploy       → Apply K8s manifests (Namespace, StatefulSet, Deployment, Service)
├── 4. Validate     → Playwright API test suite via port-forwarding
└── 5. Report       → HTML test report + cluster logs as CI artifacts
```

**Stack:**
- **Application:** Java 17 + Spring Boot REST API
- **Database:** PostgreSQL (deployed as a Kubernetes StatefulSet)
- **Infrastructure:** Kubernetes via Kind (local), orchestrated by GitHub Actions
- **Testing:** Playwright (TypeScript) API test suite
- **Containerization:** Docker with multi-stage build

---

## 🛠️ Engineering Features

### Reliability Patterns
- **Anti-OOMKilled:** All K8s manifests include `requests` and `limits` for CPU and Memory — preventing node exhaustion and container instability
- **Health Probes:** `Liveness` and `Readiness` probes ensure the application is fully healthy before any tests execute — no false failures from race conditions
- **Ephemeral Environments:** A fresh, isolated Kubernetes cluster is created for every CI run, guaranteeing a clean state and eliminating environment bleed between builds

### Security
- **Multi-stage Docker build** — final image contains only runtime artifacts, no build tools
- **Non-root user** — container runs with least-privilege configuration to minimize attack surface

### Observability & RCA
- On pipeline failure, logs and cluster state are automatically captured and uploaded as GitHub Actions artifacts — enabling fast root cause analysis without needing to reproduce the failure locally

---

## ⛓️ CI/CD Pipeline: Build-per-Build Strategy

The GitHub Actions workflow implements a "Build Once, Test in Environment" lifecycle:

1. **Build** — Multi-stage Docker build from source
2. **Orchestrate** — Provision a local Kubernetes cluster using Kind
3. **Deploy** — Apply hardened K8s manifests (Namespace, StatefulSet, Deployment, Service)
4. **Validate** — Run Playwright API tests against cluster-deployed services via port-forwarding
5. **Report** — Publish HTML test report as a CI artifact on every run
6. **RCA Support** — Capture logs and cluster state on failure for debugging

---

## 🧪 Playwright Test Suite

Located in `/tests`. The suite validates both application endpoints:

- `with-db` — endpoint backed by PostgreSQL; validates data integrity and response accuracy
- `no-db` — lightweight endpoint; validates service availability and response structure

Every CI run produces an **HTML test report** as a downloadable artifact in GitHub Actions.

---

## 🚀 Run Locally

### Prerequisites
- Docker
- Kind (`brew install kind`)
- kubectl
- Node.js (for Playwright)

### Steps

```bash
# 1. Create the cluster
kind create cluster --name local-dev

# 2. Build and load the image
docker build -t fake-user-app:latest .
kind load docker-image fake-user-app:latest --name local-dev

# 3. Deploy
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/postgres.yaml
kubectl apply -f k8s/fake-user-app.yaml

# 4. Wait for pods to be ready
kubectl wait --for=condition=ready pod -l app=fake-user-app -n fake-user-app --timeout=120s

# 5. Port-forward and run tests
kubectl port-forward svc/fake-user-app 8080:8080 -n fake-user-app &
npm install
APP_URL=http://localhost:8080 npx playwright test

# 6. View the HTML report
npx playwright show-report
```

---

## 📁 Project Structure

```
fake-user-app/
├── .github/workflows/    # GitHub Actions CI pipeline
├── k8s/                  # Kubernetes manifests (Namespace, Deployment, StatefulSet, Service)
├── src/                  # Java/Spring Boot application source
├── tests/                # Playwright (TypeScript) API test suite
├── Dockerfile            # Multi-stage, non-root Docker build
├── docker-compose.yaml   # Local development convenience
├── playwright.config.ts  # Playwright configuration
└── pom.xml               # Maven build config
```

---

## 👤 Author

**Mohamed Turghun** — Senior SDET / QA Automation Engineer

[LinkedIn](https://linkedin.com/in/mohamed-t-589824192) · [GitHub](https://github.com/mhd521)