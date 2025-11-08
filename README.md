## 🚀 Eventure AI — Intelligent Event Discovery Platform

**Eventure AI** is a full-stack web platform that helps users discover, create, and manage events smarter using **AI-powered recommendations**. It combines a **React** frontend, **Node.js** backend, and **Python FastAPI** AI service to deliver personalized, interactive event experiences.

---
### 🌟 Overview

Eventure AI solves the problem of finding relevant events by:

* Showing **personalized “For You” events** with **match percentage** based on user interests and past activity.
* Allowing users to create, update, and manage events (title, description, date, time, location, mode, tags).
* Providing smooth **RSVP feedback** via UI toasts instead of intrusive alerts.
* Offering **analytics for organizers** with real-time engagement tracking.

---
### 🧠 Key Features

| Icon | Feature Name | Description |
| :---: | :--- | :--- |
| ✅ | **AI-Powered Recommendations** | Personalized events via **FastAPI ML service** with match percentage. |
| ✅ | **Enhanced Event Management** | Full event creation and management capabilities. |
| ✅ | **Smart RSVP System** | Interactive, toast-based feedback for RSVPs. |
| ✅ | **Organizer Dashboard** | Engagement analytics and insights for event creators. |
| ✅ | **Profile Management** | Editable user profile with a smooth UI. |
| ✅ | **Responsive & Animated UI** | Modern design built with **React, Tailwind, and Framer Motion**. |
| ✅ | **Secure Authentication** | **JWT-based login** with role-based access control. |

---
### 🧩 Tech Stack & AI Deep Dive

| Layer | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend** | React + Vite, Tailwind CSS, Framer Motion | Modern, responsive, and animated user interface. |
| **Backend** | Node.js, Express.js | Robust RESTful API for business logic. |
| **AI Service** | Python, FastAPI, **Sentence-BERT** | High-performance machine learning inference service. |
| **Database** | MongoDB  | Flexible, scalable NoSQL data storage. |
| **Authentication** | JWT + bcrypt | Secure user authorization and password hashing. |
| **Hosting** | Frontend: Vercel, Backend & AI Service: Render/Railway | Scalable cloud deployment strategy. |

#### **💡 AI Logic Explained**

The AI model generates **vector embeddings** of events and users using **Sentence-BERT**. These high-dimensional embeddings let the system understand the **semantic meaning** of event descriptions and user interests. This approach allows the recommender to suggest **semantically related events** (e.g., matching "Deep Learning Workshop" to a user interested in "Neural Networks") rather than just simple tag or keyword matching.

---
### 🔗 Live Project

* Coming soon

---
### 📈 Future Enhancements

* Add **collaborative filtering** for user-group recommendations.
* Integrate **ticketing & payments** for events.
* Optimize AI service for **real-time large-scale recommendations**.
* Full-stack cloud deployment with Vercel + Render/Railway.

---
## Creator

Created by **Harsh Nagori**

🌟 **Star this repository if you like this project!** 🌟

Connect with me on LinkedIn: [https://www.linkedin.com/in/harshnagori/]