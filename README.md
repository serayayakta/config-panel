# ⚙️ Config Panel – Admin & Mobile

A full-stack configuration management panel built for a challenge.
This frontend provides both a secured admin interface and a mobile-friendly view.

## ✨ Features

- Admin Panel
  - Login with Firebase Auth (email/password)
  - View, add, edit, delete config parameters
  - Syncs with Firestore
- Mobile View
  - Read-only config access
  - Fetches from deployed API using API key
- Fully responsive with Tailwind CSS
- Two separate access levels (admin & mobile)

## 🧱 Project Structure

config-panel/
├── public/
├── src/
│   ├── assets/
│   ├── components/          # Navbar, layout elements
│   ├── router/              # Vue Router setup
│   ├── services/            # Firebase + API modules
│   ├── views/               # HomePage.vue, SignIn.vue, MobileConfigView.vue
│   └── App.vue
├── .env                     # Environment variables (see below)
└── README.md

## ⚙️ Environment Setup

1. Clone the repo

git clone https://github.com/serayayakta/config-panel.git
cd config-panel
npm install

2. Create a .env file

VUE_APP_FIREBASE_API_KEY=your_firebase_key
VUE_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
VUE_APP_FIREBASE_PROJECT_ID=your_project_id
VUE_APP_FIREBASE_APP_ID=your_app_id

VUE_APP_API_URL=https://your-api.onrender.com/api
VUE_APP_API_KEY=your_mobile_api_key

3. Run locally

npm run serve

## 🚀 Deployment

Live URL:
https://config-panel-one.vercel.app/

Route         | Description
--------------|----------------------------
/             | Admin panel (requires login)
/mobile       | Public mobile config view

## 🛠 Tech Stack

Frontend      | Notes
--------------|-----------------------------
Vue 3         | Composition API
Tailwind CSS  | Responsive design system
Firebase Auth | Email/password login for admin
Firestore     | Config storage
API Key Auth  | Used in mobile view

## 📌 Notes

- Admin panel connects directly to Firebase (via Admin SDK).
- Mobile view pulls data from deployed Express backend with API key.
- Conflict prevention is considered in architecture.
- Styling is closely matched to the design references provided.

## 🧠 Learning Points

- Example use of Node.js + Express + Firebase Admin SDK
- Realistic use of dual-auth strategies