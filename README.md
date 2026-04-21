# VidyaSetu — School Management SaaS

Full-stack school management platform with a public marketing site, JWT authentication (with optional Firebase Auth), MongoDB as the system of record, Firebase (Firestore + Storage) for real-time notices and file uploads, and Razorpay for Indian payments with an automatic dummy fallback when keys are missing.

## Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React (Vite), Tailwind CSS, Framer Motion, React Router, Recharts |
| Backend  | Node.js, Express, Mongoose, JWT, bcrypt, express-validator |
| Database | MongoDB |
| Realtime / files | Firebase Firestore, Firebase Storage, Firebase Auth (optional) |
| Payments | Razorpay + demo mode |

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- (Optional) Firebase project with Firestore, Storage, Authentication, and a service account for the backend
- (Optional) Razorpay key pair for live payments

## Installation

### 1. Clone and install dependencies

```bash
cd mvs/backend
npm install

cd ../frontend
npm install
```

### 2. Environment variables

Copy examples and edit values:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

- Set `MONGODB_URI` and a strong `JWT_SECRET` in `backend/.env`.
- For Firebase Admin, download a service account JSON and map `project_id`, `client_email`, and `private_key` into the `FIREBASE_*` variables. Set `FIREBASE_STORAGE_BUCKET` to your bucket (e.g. `project-id.appspot.com`).
- For the Vite app, add Firebase **Web** config keys to `frontend/.env` if you want Google sign-in and client-side Firestore listeners.
- For Razorpay, set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`. If omitted, fee payments are recorded in **dummy** mode for demos.

### 3. Seed demo users (recommended)

With MongoDB running and `backend/.env` configured:

```bash
cd backend
npm run seed
```

Default accounts (override with `SEED_*` in `.env`):

| Role    | Email              | Password     |
|---------|--------------------|--------------|
| Admin   | admin@school.edu   | Admin@12345  |
| Teacher | teacher@school.edu | Teacher@123 |
| Student | student@school.edu | Student@123 |

### 4. Run in development

Terminal 1 — API:

```bash
cd backend
npm run dev
```

Terminal 2 — Frontend (proxies `/api` to `http://localhost:5000`):

```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## API overview

| Prefix | Purpose |
|--------|---------|
| `GET /api/health` | Health check |
| `/api/auth` | Register, login, JWT refresh profile, Firebase token exchange |
| `/api/public` | Suggestions, contact, admissions, public events, faculty, notice ticker |
| `/api/admin` | Admin CRUD, reports, notices (Mongo + Firestore sync) |
| `/api/teacher` | Classes, attendance, homework, notes upload, marks |
| `/api/student` | Profile, attendance, homework, notes, marks, notices, feedback, chat, notifications |
| `/api/payment` | Razorpay order, verify, student history, admin payment list |

## Production build

```bash
cd frontend
npm run build
```

Serve the `frontend/dist` static files behind your CDN or reverse proxy, and run the Node API with `NODE_ENV=production` and a real `CLIENT_ORIGIN` for CORS.

## Security notes

- Change all secrets for production; never commit `.env`.
- Restrict who can register as `admin` (e.g. env flag or invite-only) before going live.
- Configure Firebase Storage rules and Firestore rules to match your trust model.
- Use HTTPS everywhere and rotate JWT secrets on compromise.

## Deploy on Render

This repo includes `render.yaml` for Blueprint deploy (frontend + backend).

### One-time setup

1. Push latest code to GitHub (already done for this repo).
2. Create a MongoDB Atlas database and copy its connection string.
3. In Render: **New +** -> **Blueprint** -> connect this GitHub repo -> select branch `main`.
4. Render will create:
   - `mvs-backend` (Node web service from `backend`)
   - `mvs-frontend` (static site from `frontend`)

### Required edits in Render after first sync

- Update `CLIENT_ORIGIN` in `mvs-backend` to your actual frontend URL.
- Update `VITE_API_URL` in `mvs-frontend` to your actual backend URL.
- Set secret env vars in `mvs-backend`:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - (optional) Razorpay and Firebase keys

### CORS note

`CLIENT_ORIGIN` now supports a comma-separated list, for example:

`https://mvs-frontend.onrender.com,https://www.yourdomain.com`

### Verify deployment

- Backend health: `https://<your-backend>.onrender.com/api/health`
- Frontend opens and can reach API endpoints.

## Project structure

```
mvs/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    scripts/
    server.js
  frontend/
    public/
    src/
      components/
      context/
      dashboard/
      pages/
      services/
      App.jsx
      main.jsx
```

## License

Proprietary / use as needed for your institution.
