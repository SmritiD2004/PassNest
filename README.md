# 🔐 PassNest – Password Manager

A simple password manager built with **React (frontend)**, **Express (backend)**, and **MongoDB (database)**.  
It allows you to **save, view, copy, edit, and delete** your credentials securely in one place.

---

## ✨ Features
- 📝 Add passwords with **site, username, and password**
- 👀 Toggle password visibility
- 📋 One-click copy to clipboard
- ✏️ Edit existing passwords
- ❌ Delete passwords with confirmation
- 🔄 Data persisted in MongoDB database
- 🎉 Toast notifications for user feedback

---

## 🛠️ Tech Stack
- **Frontend:** React, TailwindCSS, React-Toastify, React-Icons
- **Backend:** Node.js, Express.js, MongoDB
- **Database:** MongoDB Atlas / Local MongoDB

---

## 📂 Project Structure
├── frontend/ # React app (UI)
│ ├── src/
│ │ └── Manager.jsx # Main password manager component
│ └── package.json
│
├── backend/ # Express + MongoDB API
│ ├── server.js # Main server file
│ └── package.json
│
└── README.md
## 🚀 Getting Started


### 1️⃣ Clone repository
git clone https://github.com/SmritiD2004/PassNest.git
cd passnest

### 2️⃣ Setup Backend
cd backend

npm install


### 3️⃣ Create a .env file inside backend/:

MONGO_URI=your-mongodb-connection-string

DB_NAME=your-database-name


### 4️⃣ Run the backend:

npm start

Server runs at 👉 http://localhost:3000

### 5️⃣ Setup Frontend
cd frontend

npm install

npm run dev

Frontend runs at 👉 http://localhost:5173 (Vite default) or http://localhost:3001 depending on setup.

### 📡 API Endpoints
**Get all passwords**
GET /

Returns all saved passwords.

**Save a password**
POST /

Content-Type: application/json

{
  "site": "example.com",
  "username": "john_doe",
  "password": "mypassword123"
}

**Delete a password**
DELETE /

Content-Type: application/json
{
  "id": "password-id"
}

### ⚠️ Security Note

This project is for learning purposes only.
In production, passwords should never be stored in plain text. You should:

🔒 Encrypt passwords before saving (e.g., AES, bcrypt, or hashing with salt)

⚡ Use authentication to protect endpoints

🚫 Do not expose MongoDB credentials publicly

🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to change.
