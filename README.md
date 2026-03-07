# Authentication API (Node.js + Express + MongoDB)

Production-ready authentication API with:
- User registration
- User login
- JWT auth protection
- Password hashing with bcrypt
- Input validation
- Centralized error handling

## Folder Structure

```
src/
  config/
  controllers/
  middlewares/
  models/
  routes/
  utils/
  validators/
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me` (Bearer token required)
- `GET /health`
