Here’s your updated `README.md` that reflects the **separated frontend/backend structure**, **Kubernetes deployment (EKS with Ingress)**, and **CI with GitHub Actions + Docker Hub**:

---

```md
# Memory Game 🧠

A beautiful memory card matching game built with React, TypeScript, and Node.js. Features stunning animations, multiple difficulty levels, and real-time scoring.

---

## 🚀 Deployment Overview

This project is deployed using:

- ⚓ **Docker + Docker Hub**
- ☸️ **Kubernetes (Amazon EKS)**
- 🌐 **Ingress Controller (e.g., NGINX Ingress)**
- 🛠️ **GitHub Actions for CI**
- 📦 **Frontend & Backend separated in folders**

---

## 📁 Project Structure

```

├── frontend/               # React + Vite + Tailwind + TypeScript
│   ├── src/
│   └── Dockerfile
├── backend/                # Node.js + Express
│   ├── controllers/
|   ├── service/
|   ├── middleware/
│   ├── routes/
│   ├── server.js
│   └── Dockerfile
├── k8s/                    # Kubernetes manifests
│   ├── ingress.yaml
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
├── .github/workflows/
│   └── docker-ci.yml       # GitHub Actions CI for Docker Hub
|
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
- 🎉 Confetti on victory

---

## 🧱 Tech Stack

| Layer     | Technology                          |
|-----------|--------------------------------------|
| Frontend  | React 18, TypeScript, Tailwind CSS, Framer Motion |
| Backend   | Node.js, Express                    |
| Build     | Vite                                 |
| CI/CD     | GitHub Actions + Docker + Docker Hub |
| Hosting   | Kubernetes on AWS EKS               |
| Routing   | Ingress Controller (NGINX)           |

---

## 🚀 Quick Start (Local)

### Prerequisites
- Docker + Docker Compose
- Node.js & npm

### 1. Clone the repository

```bash
git clone <repo-url>
cd memory-game
````

### 2. Run locally with Docker Compose

```bash
docker-compose up --build
```

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend API: [http://localhost:3001](http://localhost:3001)

---

## 🐳 Docker Commands

### Build & Run Individually

**Frontend**

```bash
cd frontend
docker build -t memory-frontend .
docker run -p 5173:80 memory-frontend
```

**Backend**

```bash
cd backend
docker build -t memory-backend .
docker run -p 3001:3001 memory-backend
```

---

## ☸️ Kubernetes Deployment (EKS)

### Folder: `k8s/`

* `frontend-deployment.yaml`: Deploy React app to EKS
* `backend-deployment.yaml`: Deploy Node.js backend
* `ingress.yaml`: Ingress setup to route traffic via domain or IP

Apply all resources:

```bash
kubectl apply -f k8s/
```

Make sure:

* Your EKS cluster is ready
* Ingress controller (like NGINX) is installed
* DNS or LoadBalancer IP points to the ingress

---

## ⚙️ GitHub Actions CI

* CI builds Docker images for frontend & backend
* Pushes them to **Docker Hub**
* Triggered on every push to `main` branch

### GitHub Actions File: `.github/workflows/docker-ci.yml`

---

## ✨ Game Rules

1. **Objective**: Match all pairs of cards by flipping them
2. **Gameplay**: Click to flip; matched pairs stay revealed
3. **Scoring**: Based on moves and time
4. **Difficulty**:

   * Easy: 6 pairs / 60s
   * Medium: 8 pairs / 90s
   * Hard: 12 pairs / 120s

---

## 🔌 API Endpoints (Backend)

| Endpoint                 | Method | Description            |
| ------------------------ | ------ | ---------------------- |
| `/api/game/start`        | POST   | Start a new game       |
| `/api/game/:gameId/move` | POST   | Flip a card            |
| `/api/game/:gameId`      | GET    | Get game status        |
| `/api/leaderboard`       | GET    | Get leaderboard scores |

---

## 📦 NPM Scripts

**Frontend**

```bash
npm run dev       # Dev server
npm run build     # Build for prod
npm run preview   # Preview built app
```

**Backend**

```bash
npm run server    # Start Express server
```

**Monorepo**

```bash
npm run start     # Start frontend and backend concurrently
```

---

## 🙌 Credits

Created with ❤️ by **Vipun Sanjana**
SE Cloud Security Operations Center
Powered by React, Node.js, Kubernetes, and CI/CD

---
