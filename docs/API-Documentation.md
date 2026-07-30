# API Documentation

Base URL

http://localhost:5000

---

## Health API

GET

/api/health

Response

```json
{
  "success": true,
  "project": "EduExam India (RankOne)"
}
```

---

## Admin Login

POST

/api/auth/login

Request

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response

```json
{
  "success": true,
  "data": {
    "token": "...",
    "username": "admin"
  }
}
```

---

Upcoming APIs

POST /api/questions/upload

GET /api/questions

POST /api/questions/approve

POST /api/exams

GET /api/exams

POST /api/student/login

POST /api/exams/submit

GET /api/results