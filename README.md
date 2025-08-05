# 🧠 Memory Game

A beautiful memory card matching game built with **React**, **TypeScript**, and **Node.js**. Features stunning animations, multiple difficulty levels, and real-time scoring.

---

## 🚀 Deployment Overview

This project is deployed using:

- 🐳 **Docker + Docker Hub**
- ☸️ **Kubernetes (Amazon EKS)**
- 🌐 **NGINX Ingress Controller**
- ⚙️ **GitHub Actions for CI**
- 📦 **Separated Frontend & Backend structure**

---

## 📁 Project Structure

```

memory-game/
├── frontend/                  # React + Vite + Tailwind + TypeScript
│   ├── src/
│   └── Dockerfile
├── backend/                   # Node.js + Express
│   ├── controllers/
│   ├── service/
│   ├── middleware/
│   ├── routes/
│   ├── server.js
│   └── Dockerfile
├── k8s/                       # Kubernetes manifests
│   ├── ingress.yaml
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
├── .github/workflows/
│   └── docker-ci.yml          # GitHub Actions workflow
└── README.md

````

---

## 🎮 Features

- ✅ Interactive memory card matching gameplay
- 💫 Smooth animations with Framer Motion
- 🧠 Multiple difficulty levels
- 🏆 Leaderboard system
- 📊 Real-time statistics
- 📱 Responsive design
- 🎉 Confetti celebration on victory

---

## 🧱 Tech Stack

| Layer     | Technology                                    |
|-----------|-----------------------------------------------|
| Frontend  | React 18, TypeScript, Tailwind CSS, Framer Motion |
| Backend   | Node.js, Express                              |
| Build     | Vite                                           |
| CI/CD     | GitHub Actions, Docker, Docker Hub            |
| Hosting   | Kubernetes (EKS on AWS)                       |
| Routing   | NGINX Ingress Controller                      |

---

## ⚙️ Quick Start (Local)

### Prerequisites

- Docker & Docker Compose
- Node.js and npm

### 1. Clone the Repository

```bash
git clone <repo-url>
cd memory-game
````

### 2. Run Frontend and Backend Separately
Frontend

```bash
cd frontend
docker build -t memory-frontend .
docker run -p 5173:80 memory-frontend
````

Backend

Open a new terminal:

```bash
cd backend
docker build -t memory-backend .
docker run -p 3001:3001 memory-backend
````

Access:

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:3001](http://localhost:3001)

---

## 🐳 Docker Commands (Manual Build & Run)

### Frontend

```bash
cd frontend
docker build -t memory-frontend .
docker run -p 5173:80 memory-frontend
```

### Backend

```bash
cd backend
docker build -t memory-backend .
docker run -p 3001:3001 memory-backend
```

---

## ☸️ Kubernetes Deployment (EKS)

### Folder: `k8s/`

Kubernetes manifests:

* `frontend-deployment.yaml`: Frontend deployment
* `backend-deployment.yaml`: Backend deployment
* `ingress.yaml`: Ingress controller configuration

### Deployment Steps

1. Ensure your **EKS cluster** is up and running.
2. Install **NGINX Ingress Controller**.
3. Apply manifests:

```bash
kubectl apply -f k8s/
```

4. Point your **DNS or IP** to the Ingress LoadBalancer.

---

## ⚙️ GitHub Actions CI/CD

**Workflow file**: `.github/workflows/docker-ci.yml`

Features:

* Builds frontend & backend Docker images
* Pushes to **Docker Hub**
* Triggered on push to `main` branch

Make sure your GitHub repository has:

* `DOCKER_USERNAME`
* `DOCKER_PASSWORD`

as **GitHub Secrets**.

---

## ✨ Game Rules

1. **Objective**: Match all pairs of cards.
2. **Gameplay**: Click to flip cards; matched pairs stay visible.
3. **Scoring**: Based on number of moves and completion time.
4. **Difficulty Levels**:

   * 🟢 Easy: 6 pairs / 60s
   * 🟡 Medium: 8 pairs / 90s
   * 🔴 Hard: 12 pairs / 120s

---

## 🔌 API Endpoints (Backend)

| Endpoint                 | Method | Description               |
| ------------------------ | ------ | ------------------------- |
| `/api/game/start`        | POST   | Start a new game          |
| `/api/game/:gameId/move` | POST   | Submit a move (flip card) |
| `/api/game/:gameId`      | GET    | Get current game status   |
| `/api/leaderboard`       | GET    | Get leaderboard scores    |

---

## 📦 NPM Scripts

### Frontend

```bash
npm run dev       # Start Vite dev server
npm run build     # Build for production
npm run preview   # Preview built app
```

### Backend

```bash
npm run server    # Start the Express server
```

### Monorepo (if using concurrently)

```bash
npm run start     # Start both frontend and backend
```

---

## 🙌 Credits

Created with ❤️ by **Vipun Sanjana**
Former Software Engineer @ WSO2 - Cloud Security Operations Center
Powered by **React**, **Node.js**, **Docker**, **CI/CD**, **Ingress**,**AWS** and **Kubernetes**

---