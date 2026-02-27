#  Food Delivery App

A full-stack Food Delivery Web Application built using:

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB

Users can browse food items, add to cart, and place orders.

---

##  Project Structure

food-delivery-app/
│
├── backend/   → Express API
└── client/    → React Frontend

---

#  How to Run the Project

##  Run Backend

### Step 1: Go to backend folder
cd backend

### Step 2: Install dependencies
npm install

### Step 3: Create .env file
Create a `.env` file inside backend folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### Step 4: Start backend server
npm run dev
(or)
npm start

Backend will run on:
http://localhost:5000

---

## Run Frontend

### Step 1: Go to client folder
cd client

### Step 2: Install dependencies
npm install

### Step 3: Start frontend
npm run dev

Frontend will run on:
http://localhost:5173

---

#  Environment Variables Example

Inside backend/.env file:

PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/foodapp
JWT_SECRET=supersecretkey

⚠ Do NOT upload .env file to GitHub.

---

#  Features

✔ User Authentication (Login/Register)  
✔ Browse Food Items  
✔ Add to Cart  
✔ Order Placement  
✔ Responsive UI  

---

#  Technologies Used

Frontend:
- React
- Vite
- Axios
- CSS / Bootstrap

Backend:
- Node.js
- Express
- MongoDB
- JWT Authentication

---

#  Author

Krithi  
Frontend Developer