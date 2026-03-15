# Policy Ghost 👻

**Autonomous Compliance Intelligence Platform**

> Upload any compliance policy PDF. Policy Ghost reads every rule, monitors your 
> transactions in real time, and writes the audit report — automatically.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![Claude](https://img.shields.io/badge/Claude-claude--sonnet-CC785C?logo=anthropic)](https://anthropic.com)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://docker.com)

---

## What It Does

Policy Ghost solves the compliance gap: the 14–21 day window between a violation 
occurring and a human discovering it. It collapses that gap to under 3 seconds.

| Feature | What happens |
|---|---|
| PDF rule extraction | Upload any policy PDF → AI extracts every enforceable rule as typed JSON |
| Live transaction monitoring | Transactions stream at 5/sec → every record checked against every rule |
| AI audit memos | Each violation gets a 3-paragraph regulatory memo written by Claude |
| Policy conflict detection | Contradictions between two uploaded policies surface automatically |
| One-click audit report | All violations, memos, and conflicts exported as a professional PDF |

---

## System Architecture
```
┌─────────────────────────────────────────────┐
│  Frontend  React 18 + TypeScript + Tailwind  │
└──────────────┬──────────────────────────────┘
               │ REST + WebSocket
┌──────────────▼──────────────────────────────┐
│  Backend   FastAPI + Celery + Redis          │
└──────────────┬──────────────────────────────┘
               │ async tasks
┌──────────────▼──────────────────────────────┐
│  AI Pipeline  pdfplumber + Claude + Instructor│
│               sentence-transformers + ChromaDB│
└──────────────┬──────────────────────────────┘
               │ read/write
┌──────────────▼──────────────────────────────┐
│  Data Layer  SQLite/PostgreSQL + ChromaDB    │
└─────────────────────────────────────────────┘
```

---

## Quick Start

### Prerequisites
- Docker + Docker Compose
- Anthropic API key

### 1. Clone and configure
```bash
git clone https://github.com/your-org/policy-ghost.git
cd policy-ghost
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

### 2. Start everything
```bash
docker-compose up --build
```

This starts:
- Frontend at http://localhost:3000
- FastAPI at http://localhost:8000
- API docs at http://localhost:8000/docs
- Redis at localhost:6379

### 3. Seed sample data
```bash
docker-compose exec api python scripts/seed_db.py
```

### 4. Run the live stream simulator
```bash
docker-compose exec api python scripts/run_stream.py
```

Open http://localhost:3000 and watch violations appear in real time.

---

## Environment Variables
```env
# Required
ANTHROPIC_API_KEY=sk-ant-...

# Database (defaults to SQLite for development)
DATABASE_URL=sqlite:///./policy_ghost.db
# For production: DATABASE_URL=postgresql://user:pass@localhost/policy_ghost

# Redis
REDIS_URL=redis://localhost:6379/0

# ChromaDB
CHROMA_DB_PATH=./chroma_db

# App
SECRET_KEY=your-secret-key-here
DEBUG=true
```

---

## Running Without Docker

### Backend
```bash
cd backend
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

### Celery Worker (separate terminal)
```bash
cd backend
celery -A app.workers.celery_app worker --loglevel=info
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Folder Structure
```
policy-ghost/
├── frontend/           React 18 + TypeScript + Tailwind UI
├── backend/            FastAPI + Celery + SQLAlchemy
├── ai_pipeline/        All AI/ML code (pdfplumber, Claude, Instructor)
│   ├── ingestion/      PDF parsing and CSV loading
│   ├── extraction/     Rule extraction with Claude API
│   ├── validation/     Pandas transaction validator
│   ├── memo/           Audit memo generation
│   └── conflict/       Cross-policy contradiction detection
├── database/           Alembic migrations + seed data
├── scripts/            Dev tooling (seed_db, run_stream, test_pipeline)
└── docs/               Architecture docs and demo script
```

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/policies/upload` | Upload compliance PDF |
| `GET` | `/api/v1/policies/:id/rules` | Get extracted rules |
| `POST` | `/api/v1/transactions/validate` | Validate transaction batch |
| `GET` | `/api/v1/violations` | List all violations |
| `GET` | `/api/v1/conflicts` | List policy conflicts |
| `POST` | `/api/v1/reports/generate` | Generate audit PDF |
| `GET` | `/api/v1/reports/:id/download` | Download audit PDF |
| `WS` | `/ws/violations` | Real-time violation stream |

Full interactive docs: http://localhost:8000/docs

---

## Demo

**The 2-minute demo flow:**

1. Drag `database/seeds/sample_policy.pdf` onto the Upload page
2. Watch 6 rule cards appear as Claude reads the document  
3. Click "Start Monitoring" — violations stream live onto the dashboard
4. Click a CRITICAL violation — the AI-written audit memo slides open
5. Switch to Conflicts — see the GDPR vs AML contradiction flagged automatically
6. Click Download — receive a full PDF audit report

**Key numbers:**
- `< 3 seconds` from transaction to violation detection
- `100%` of violations get AI-written audit memos
- `1 click` to generate a complete regulatory audit report

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Recharts |
| Backend | Python 3.11, FastAPI, Celery, Redis, SQLAlchemy, Alembic |
| AI | Claude API (claude-sonnet), Instructor, pdfplumber |
| Vectors | sentence-transformers (all-MiniLM-L6-v2), ChromaDB |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Export | WeasyPrint |
| Deploy | Docker Compose |

---

## Team

Built at VIT Code Apex 2.0 — Track 2: AI Agents, Problem 2.3

---

## License

MIT
