# 📘 Project Title

*A concise tagline describing your app (1 sentence).*

---

## 🚀 Overview

Briefly describe:

My full stack app is called subBook and the purpose is for the use of an organization to use it as a way to keep track of its employees that work an hourly wage and need to be subbed in and out for when an employee can not work that shift at all. This is to prevent underhanded tatics that people might use to act like thier shift is covered and stearm line the work place comunication as well


---

## 🌐 Live Demo

| Type                         | Link                                                           |
| ---------------------------- | -------------------------------------------------------------- |
| **Frontend (Deployed Site)** | [ https://cute-concha-4b9cc8.netlify.app/]( https://cute-concha-4b9cc8.netlify.app/) |
| **Backend (API Base URL)**   | [https://subbook-back.onrender.com/](https://subbook-back.onrender.com/)   |
---

## ✨ Features

List **3–6 key features**, ideally with short bullets:

* Create, read, update, and delete **[Shifts]**
* Responsive UI with reusable components
* Backend API with full CRUD operations
* Data persisted in MongoDB
* Advanced feature: authentating user sign in
* Error handling on client + server

### **Advanced Feature**

When the user register for an account in subBook it record relevent infomation that is used and uses your email as a id KEY. this prevent the same email having two acounts and password, which is encrtpyed, to verify a users identity.


---

## 📸 Screenshots
![home screen of the website](./screenshots/home.png)
![home screen of the website](./screenshots/home.png)

---

## 🏗️ Project Architecture

Describe how the pieces fit together.

```
/server
  /backend
    /models
    /routes
    server.js
  /frontend
    /src
     /api
     /assets
     /components
     app.jsx
     main.jsx
```

The React frontend communicates with the Express backend through API routes. The backend interacts with MongoDB using Mongoose models, and environment variables are used to store secrets. I made sure the API calls that the system starts are exact as they can be and so the system does not pass any missing infomation to the database by when its needed the user has to put it in the system.

---

## 📦 Installation & Setup

### **1. Clone the project**

```bash
git https://github.com/97kiwi101/SubBook
cd SubBook
(create two terminals)

(terminal 1)
cd backend
npm install
npm run dev

(terminal 2)
cd frontend 
npm install
npm run dev

```

---

### **3. Install Dependencies**

#### Frontend:

```bash
cd frontend
npm install
npm run dev
```

#### Backend:

```bash
cd backend
npm install
npm run dev
```

---

### **4. Running Entire App Locally**

1. Start backend on `http://localhost:3001`
2. Start frontend on `http://localhost:3002`
3. Confirm CORS + API requests are working

---

## 🛠 API Documentation

####Authentication
POST /api/auth/login

Authenticates a user and returns a success token/message. Body:
JSON
```bash
{
  "email": "jane.doe@example.com",
  "password": "yourSecurePassword123"
}
'''
POST /api/auth/register

Registers a new user in the system. Body:
JSON
```bash
{
  "email": "jane.doe@example.com",
  "password": "yourSecurePassword123",
  "name": "Jane Doe",
  "jobTitle": "Nurse Practitioner"
}

```


####Shift Management
GET /api/available

Returns a list of all shifts currently available for pickup.
GET /api/user/:email

Returns all shifts assigned to a specific user. Example Path: /api/user/jane.doe@example.com
POST /api/create

Creates a new shift entry. Body:
JSON
```bash
{
  "date": "2025-12-15",
  "startTime": "08:00",
  "endTime": "16:00",
  "location": "Main Ward",
  "assignedTo": "jane.doe@example.com"
}
```

PUT /api/release

Marks a shift as "released" (available for others to cover) with a reason. Body:
JSON
```bash
{
  "shiftId": "60d5ecb8b487343542a12345",
  "reason": "Family emergency"
}
```
PUT /api/retract

Cancels a shift release request (takes the shift back). Body:
JSON
```bash
{
  "shiftId": "60d5ecb8b487343542a12345"
}
```
PUT /api/cover

Assigns a covering user to a released shift. Body:
JSON
```bash
{
  "shiftId": "60d5ecb8b487343542a12345",
  "coveringEmail": "john.smith@example.com"
}
```
---

## 🚀 Deployment Notes

### **Frontend**

* Vercel / Netlify
* (`npm run build`)
* also make sure to do VITE_API_BASE_URL = https://your-backend.com/

### **Backend**

* Render / Railway
* CLIENT_ORIGIN = https://your-frontend.com (make sure this does not have / at the end)
* MONGODB_URI = URL_for_your_back_end


---

## 🎥 Video Walkthrough

**Link to Loom/YouTube:**
[https://youtu.be/FPSSV05U_3g](https://youtu.be/FPSSV05U_3g)

---

# 🧠 Reflection



### **1. What was the hardest part of this project?**

Write 3–5 sentences.
there where to hard things in this project. Trying to viulize what I wanted the website to look and which direation I wanted to go. This is why I ended up useing the html code found in www.papercut.com and its login page / home screen. this code gave me a great jumpstart as to where I wanted the site to look and how to get it there

### **2. What are you most proud of?**

Could be a feature, a UI improvement, debugging work, or personal growth.

I am the most proud of getting this big of a github repo and having a project out on the web for people to see and look at. I the growth I have had since I started learning Computer science and Artficial intellgence has been amazing and surpises me now. If you wereto show me the code in this repo I would have had no idea what it was doing but now not only can I understand the code but catch errors/problems that can occur with it.

### **3. What would you do differently next time?**

I would have 1rst talked to my boss and asked what would be handy and have that meeting on what kind of website she would want then I would do a front end development to then checkbase and then worked on getting the site up and running fully once we have had that in place. I feel like that converstion would have allowed me to talk and figure out what we needed and how to achieve that and given me a better direaction to go for.

### **4. How did you incorporate feedback from the 12/5 check-in gallery?**

based off of the feedback I was able get a good idea of where to start, ie what I wanted the page to look like, I also was able to achieve this look. I was also to incorpet the database design and what kind of infomation I would need to use for my system to try and make it as easy as possible.

---

# Acknowledgments / AI Usage Disclosure

* “Used Gemmini to help troubleshoot a CORS issue.”
* “Used Gemmini for help writing documentation.”
* "Used Gemini to help troubleshoot API issues."