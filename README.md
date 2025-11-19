# advanced-authentication
Advanced Authentication is built with React.js and Node.js

Using Database MongoDB

## Installation

This project uses pnpm as the package manager. Make sure you have pnpm installed globally:
```bash
npm install -g pnpm
```

## Setup

### Install dependencies for all packages:
```bash
pnpm install
```

This will install dependencies for both front-end and back-end packages.

## Development

### Run both frontend and backend simultaneously (Recommended):
```bash
pnpm dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend dev server on `http://localhost:3000`

### Run individually:

**Frontend only:**
```bash
pnpm dev:frontend
# or
cd front-end && pnpm dev
```

**Backend only:**
```bash
pnpm dev:backend
# or
cd back-end && pnpm run back-end
```

## Production

### Build frontend:
```bash
pnpm build
# or
pnpm build:frontend
```

### Preview production build:
```bash
pnpm preview
```

## Available Scripts

From the root directory:

- `pnpm install:all` - Install all dependencies
- `pnpm dev` - Run both frontend and backend in development mode
- `pnpm dev:frontend` - Run only frontend
- `pnpm dev:backend` - Run only backend
- `pnpm start` - Run both in production mode
- `pnpm build` - Build frontend for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests
- `pnpm clean` - Clean build directories

## Environment Variables

### Backend (.env in back-end directory):
- `MONGO_URI` - MongoDB connection string (required)
- `JWT_SECRET` - JWT signing secret (required)
- `JWT_REFRESH_SECRET` - Refresh token secret (required)
- `CRYPTR_KEY` - Encryption key (required)
- `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS` - Email configuration
- `FRONTEND_URL` - Frontend URL for redirects
- `GOOGLE_CLIENT_ID` - Google OAuth client ID

### Frontend (.env in front-end directory):
- `VITE_BACKEND_URL` - Backend API URL
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `VITE_CLOUD_NAME` - Cloudinary cloud name (optional)
- `VITE_UPLOAD_PRESET` - Cloudinary upload preset (optional)
