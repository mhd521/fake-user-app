# Fake User App — Local Kubernetes Setup (kind)

A Spring Boot + PostgreSQL app deployed to a local Kubernetes cluster for development and demo purposes.

This project is designed to be easy to run locally and mirrors a CI-style workflow where the app is deployed into Kubernetes and then tested.

---

## Tech Stack

- Java / Spring Boot
- PostgreSQL
- Docker (for container images)
- Kubernetes manifests (Deployment, Service, StatefulSet)
- kind (Kubernetes-in-Docker) for local cluster
- kubectl for deployment and debugging

---

## Prerequisites

You need:

- **Docker Desktop** (Docker engine running)
- **kubectl**
- **kind**

### macOS install (Homebrew)
```bash
brew install kubectl kind