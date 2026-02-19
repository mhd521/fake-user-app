# Cloud-Native Quality Engineering Showcase: Fake User App
[![CI - Kind + Playwright](https://github.com/mhd521/fake-user-app/actions/workflows/ci.yml/badge.svg)](https://github.com/mhd521/fake-user-app/actions/workflows/ci.yml)

This project is a **Senior SDET / Quality Platform Engineering** portfolio piece. It demonstrates a complete, "Shift-Left" quality lifecycle—bridging the gap between **Java/Spring Boot development**, **Kubernetes Platform Admin**, and **Advanced Playwright Automation**.

## 🚀 Architecture Overview
The system is built on a **Cloud-Native** architecture designed for reliability and observability.

- **Application:** Java Spring Boot REST API providing user-related data.
- **Database:** PostgreSQL (deployed as a Kubernetes StatefulSet).
- **Infrastructure:** Local Kubernetes (Kind) orchestrated via GitHub Actions.
- **Validation:** Playwright API test suite acting as the final "Quality Gate" in CI.

## 🛠️ Engineering Features
Unlike a basic tutorial, this project implements professional-grade reliability patterns:

- **Resource Management (Anti-OOMKilled):** All Kubernetes manifests include `requests` and `limits` (CPU/Memory) to ensure container stability and prevent node exhaustion.
- **Observability (Health Probes):** Implemented `Liveness` and `Readiness` probes to ensure the application is healthy before any tests are executed.
- **Security-First:** Docker containers are configured with a **Multi-stage Build** and run as a **Non-root user** to minimize the attack surface.
- **Ephemeral Environments:** The CI pipeline creates a fresh, isolated Kubernetes cluster (Kind) for every build, ensuring a clean state for testing.

## ⛓️ CI/CD Pipeline: The "Build-per-Build" Strategy
The GitHub Actions workflow implements a professional "Build Once, Test Everywhere" lifecycle:

1. **Build:** Multi-stage Docker build from source code.
2. **Orchestrate:** Provisioning a local Kubernetes cluster (Kind).
3. **Deploy:** Applying hardened K8s manifests (Namespace, StatefulSet, Deployment, Service).
4. **Validate:** Running **Playwright API tests** against the cluster-deployed services via port-forwarding.
5. **RCA Support:** Automatically captures logs and cluster state artifacts on failure for Root Cause Analysis.

## 🧪 Automated Testing (Playwright)
The project includes a robust API validation suite located in `/tests`:
- Validates both `with-db` and `no-db` endpoints.
- Ensures data integrity and response accuracy.
- Generates an HTML report as a CI artifact for every run.

## 📖 How to Run Locally
### Prerequisites
- Docker
- Kind (`brew install kind`)
- Kubectl

### Local Deployment
```bash
# 1. Create the cluster
kind create cluster --name local-dev

# 2. Build and Load the image
docker build -t fake-user-app:latest .
kind load docker-image fake-user-app:latest --name local-dev

# 3. Deploy
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/postgres.yaml
kubectl apply -f k8s/fake-user-app.yaml

# 4. Run Tests
npm install
APP_URL=http://localhost:8080 npx playwright test
```

---
**Contact:** [Mohamed Turghun](https://linkedin.com/in/mohamed-t-589824192) - Senior SDET / Quality Platform Engineer
