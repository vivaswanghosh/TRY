# Smart Academic Management Platform

This repository contains a secure, role-based academic management platform with Auth0 integration. It includes both frontend and backend components.

## Features

- **Authentication & Authorization** using Auth0 JWT tokens
- **E-Library** for uploading and viewing PDF books
- **Smart Calendar** for holidays and exams
- **Assignment Submission** with PDF uploads and grading
- **Dynamic Routine** with semester-based scheduling and overrides
- **Teacher Swap Workflow**
- **Notifications** and audit logging for actions

## Structure

```
smart-academic-platform/
│
├── frontend/ (React)
└── backend/ (Express/Mongoose)
```

## Setup

### Backend

1. `cd backend`
2. Create `.env` with `MONGO_URI` and Auth0 config
3. `npm install`
4. `npm run dev` to start server

### Frontend

1. `cd frontend`
2. Replace Auth0 settings in `auth/authConfig.js`
3. `npm install`
4. `npm start`

## Notes

- Authentication middleware currently decodes JWT token directly; you should validate against Auth0 public keys in production.
- File uploads stored in `backend/uploads`.

This scaffold implements the core file structure and basic route/controllers. Additional business logic, validation, and UI components need to be built out per requirements.
