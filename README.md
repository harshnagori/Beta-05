## 🚀 Eventure AI — Intelligent Event Discovery Platform

**Eventure AI** is a full-stack web platform that helps users discover, create, and manage events smarter using **AI-powered recommendations**.
It combines a **React** frontend, **Node.js** backend, and a **Python FastAPI** AI service to deliver personalized, interactive event experiences.

---

### 🔗 Live Project

**Live Demo:** [https://eventure-ai.vercel.app/](https://eventure-ai.vercel.app/)

> ⚠️ **Note:** The backend and AI services are hosted on **Render**, which may enter sleep mode during inactivity.
> When accessed after a long gap, the site may take **up to 60 seconds** to fully start up.

---

### 🌟 Overview

Eventure AI solves the problem of finding relevant events by:

* Showing **personalized “For You” events** with **match percentage** based on user interests and past activity.
* Allowing users to create, update, and manage events (title, description, date, time, location, mode, tags).
* Providing smooth **RSVP feedback** via UI toasts instead of intrusive alerts.
* Offering **analytics for organizers** with real-time engagement tracking.

---

### 🧠 Key Features

| Icon | Feature Name                   | Description                                                                                                      |
| :--: | :----------------------------- | :--------------------------------------------------------------------------------------------------------------- |
|   ✅  | **AI-Powered Recommendations** | Personalized events via a **FastAPI microservice** using **Hugging Face Inference API** and semantic embeddings. |
|   ✅  | **Enhanced Event Management**  | Full event creation and management capabilities.                                                                 |
|   ✅  | **Smart RSVP System**          | Interactive, toast-based feedback for RSVPs.                                                                     |
|   ✅  | **Organizer Dashboard**        | Engagement analytics and insights for event creators.                                                            |
|   ✅  | **Profile Management**         | Editable user profile with a smooth UI.                                                                          |
|   ✅  | **Responsive & Animated UI**   | Modern design built with **React, Tailwind, and Framer Motion**.                                                 |
|   ✅  | **Secure Authentication**      | **JWT-based login** with role-based access control.                                                              |

---

### 🧩 Tech Stack & AI Deep Dive

| Layer              | Technologies                                                             | Description                                                           |
| :----------------- | :----------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| **Frontend**       | React + Vite, Tailwind CSS, Framer Motion                                | Modern, responsive, and animated user interface.                      |
| **Backend**        | Node.js, Express.js                                                      | Robust RESTful API for business logic.                                |
| **AI Service**     | Python, FastAPI, **Hugging Face Inference API (BAAI/bge-small-en-v1.5)** | Lightweight, real-time semantic similarity model for recommendations. |
| **Database**       | MongoDB                                                                  | Flexible, scalable NoSQL data storage.                                |
| **Authentication** | JWT + bcrypt                                                             | Secure user authorization and password hashing.                       |
| **Hosting**        | Frontend: Vercel, Backend & AI Service: Render                           | Full-stack deployment with uptime monitoring to prevent cold starts.  |



### 📈 Future Enhancements

* Add **collaborative filtering** for group-based recommendations.
* Integrate **ticketing and payments** for events.
* Optimize AI service for **real-time, large-scale recommendations**.
* Migrate to a **fully containerized, cloud-based deployment** (Vercel + Render/Railway).

---

## 👨‍💻 Creator

Created by **Harsh Nagori**

🌟 **Star this repository if you like this project!** 🌟

Connect on LinkedIn: [https://www.linkedin.com/in/harshnagori/](https://www.linkedin.com/in/harshnagori/)

---
