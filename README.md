# College Placement Notification Platform

This project contains a reference implementation for a college placement notification platform built from the system design prompt.

## Contents

- `notification_system_design.md` — detailed design document for all stages.
- `frontend/` — Next.js + Material UI frontend skeleton.
- `backend/` — Node.js + Express backend API skeleton.

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a local `.env` file inside `backend/` with secrets and local overrides. Example values are available in `backend/.env.example`.

For frontend local config, use `frontend/.env.example` as a template.

Example backend `.env`:

```env
PORT=4000
API_TOKEN=your-secret-api-token-here
```

Example frontend `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_API_TOKEN=your-api-token-here
```

## Notes

The frontend attaches the token as an Authorization header, and the backend validates it against `API_TOKEN` from the environment.
