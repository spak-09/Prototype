# ElevateFit — Premium Gym Management SaaS

A modern, community-driven gym management platform with three dashboards.

## Features

### 🏠 Public Website
- Premium landing page with hero, stats, features, pricing
- About, Membership Plans, Trainers, Community, Gallery, Testimonials, Contact
- Login/Register with role-based redirect

### 👑 Owner Dashboard
- **Dashboard**: Stats, revenue charts, attendance trends, activity feed
- **Members**: Search, filter, paginate, add/edit/delete members
- **Attendance**: Today's attendance, weekly charts, peak hours, CSV export
- **Payments**: Revenue dashboard, pending/paid, payment verification
- **Trainers**: Trainer profiles, session stats
- **Community**: Challenges, leaderboard, announcements, posts
- **Analytics**: Revenue, churn, member growth, attendance, popular workouts
- **Settings**: Gym profile, membership plans, QR payment, notifications

### 🏋️ Trainer Dashboard
- **Dashboard**: Assigned members, sessions, quick actions
- **My Members**: Member cards, progress tracking, notes
- **Workout Plans**: Create/edit workout plans with exercises
- **Schedule**: Calendar view with sessions
- **Attendance**: Mark attendance for assigned members
- **Reports**: Member performance, workout completion charts
- **Messages**: Team announcements and messages
- **Profile**: Edit trainer profile

### 💪 Member Dashboard
- **Dashboard**: Calories, streak, attendance, reward points, BMI, leaderboard
- **My Workouts**: Workout list with exercise details, completion tracking
- **Progress**: Weight, BMI, strength charts, photo timeline, measurements
- **Nutrition**: Daily calories, macros, meals, water intake tracker
- **Payments**: Membership status, renewal countdown, QR payment upload
- **Community**: Feed, likes, comments, announcements
- **Challenges**: Join challenges, daily progress, leaderboard
- **Profile**: Personal info, fitness goals, achievements

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, TypeScript, Framer Motion, Recharts, Zustand, React Router
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT Auth, bcrypt
- **UI**: Premium dark/orange theme, rounded cards, soft shadows, animations

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elevatefit
JWT_SECRET=elevatefit_super_secret_key_2024
JWT_REFRESH_SECRET=elevatefit_refresh_secret_key_2024
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
NODE_ENV=development
```

Seed the database:
```bash
npm run seed
```

Start the backend:
```bash
npm run dev
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Login Credentials

| Role    | Email                    | Password     |
|---------|--------------------------|--------------|
| Owner   | owner@elevatefit.com     | password123  |
| Trainer | rajesh@elevatefit.com    | password123  |
| Member  | aarav.gupta@gmail.com    | password123  |

## Project Structure

```
Complete/
├── backend/
│   ├── src/
│   │   ├── config/         # DB connection, seed data
│   │   ├── middleware/      # Auth, error handler
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── server.js       # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Shared & layout components
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # All page components
│   │   │   ├── public/     # Public website pages
│   │   │   ├── owner/      # Owner dashboard pages
│   │   │   ├── trainer/    # Trainer dashboard pages
│   │   │   └── member/     # Member dashboard pages
│   │   ├── services/       # API service layer
│   │   ├── stores/         # Zustand stores
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app with routing
│   │   └── main.jsx        # Entry point
│   └── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint                     | Description          |
|--------|------------------------------|----------------------|
| POST   | /api/auth/login              | Login                |
| POST   | /api/auth/register           | Register             |
| GET    | /api/auth/me                 | Get current user     |
| GET    | /api/members                 | Get all members      |
| POST   | /api/members                 | Create member        |
| PUT    | /api/members/:id             | Update member        |
| DELETE | /api/members/:id             | Delete member        |
| POST   | /api/attendance/checkin      | Check in             |
| POST   | /api/attendance/checkout     | Check out            |
| GET    | /api/attendance/member/:id   | Member attendance    |
| POST   | /api/payments                | Create payment       |
| GET    | /api/payments                | Get all payments     |
| PUT    | /api/payments/:id/verify     | Verify payment       |
| GET    | /api/trainer/dashboard       | Trainer dashboard    |
| GET    | /api/trainer/members         | Trainer's members    |
| POST   | /api/trainer/workout         | Create workout       |
| GET    | /api/community/posts         | Get posts            |
| POST   | /api/community/posts         | Create post          |
| GET    | /api/community/challenges    | Get challenges       |
| GET    | /api/analytics/dashboard     | Owner analytics      |
| GET    | /api/leaderboard             | Get leaderboard      |

## Mock Data

- **120 Members** with realistic Indian names
- **8 Trainers** with specialties and certifications
- **10 Workout Plans** with exercises
- **12 Challenges** with participants
- **10 Community Posts**
- **Attendance records** for last 30 days
- **Payment history** for all members

## Design System

- **Primary Color**: Orange (#F97316)
- **Theme**: Dark premium with white cards
- **Border Radius**: 18-20px
- **Shadows**: Soft, layered shadows
- **Animations**: Framer Motion page transitions, hover effects
- **Typography**: Inter font family
