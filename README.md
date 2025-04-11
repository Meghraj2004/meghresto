# MeghResto - Indian Restaurant Web Application

A modern web application for the MeghResto Indian restaurant offering online reservations, menu browsing, and more.

---

## ✨ Features

- Interactive menu with filter by categories and dietary preferences
- Online reservation system with email confirmation
- User authentication with Firebase
- Responsive design for all devices
- Modern UI with elegant gold accents

---

## 🛠 Technologies Used

- **Frontend**: React, TailwindCSS, shadcn/ui components  
- **Backend**: Express.js  
- **Database**: PostgreSQL with Drizzle ORM  
- **Authentication**: Firebase Auth  
- **State Management**: React Query  

---

## 🚀 Getting Started

_(Refer to the “Installation Guide” below for full setup instructions)_

---

## 📆 Installation Guide (Step-by-Step)

### ✅ Prerequisites

- **Node.js** (v16 or higher)  
- **PostgreSQL** installed and running  
- **Firebase** project (for authentication)  

---

### 🧹 Step 1: Clone the Repository

```bash
git clone <repository-url>
cd meghresto
```

---

### 📅 Step 2: Install Dependencies

```bash
npm install
```

---

### 📂 Step 3: Set Up PostgreSQL Database

#### Option 1: Using the Setup Script (Recommended)

```bash
chmod +x setup-database.sh
./setup-database.sh
```

#### Option 2: Manual Setup

```bash
psql -U postgres
CREATE DATABASE meghreso_db;
\l
\q
```

---

### 🔐 Step 4: Create Environment Variables File

Create a `.env` file in the root directory:

```
# PostgreSQL Database
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/meghreso_db
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your_password
PGDATABASE=meghreso_db

# Firebase Auth
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

---

### 🗃 Step 5: Apply Database Schema

```bash
npm run db:push
```

---

### 🔄 Step 6: Start the Development Server

```bash
npm run dev
```

Visit: `http://localhost:5000`

---

### 🔐 Firebase Authentication Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create project & add Web App
3. Enable **Google Sign-In** under Authentication
4. Add `localhost` to **Authorized Domains**
5. Copy the config details to `.env`

---

### 📧 Email Notification Setup

- Sign up at [Web3Forms](https://web3forms.com/)
- Use your API key to enable reservation email confirmations

---

## 📸 Project Screenshots

| 📱 Homepage | 📟 Menu | 📅 Reservation |
|------------|--------|----------------|
| ![Home](https://github.com/user-attachments/assets/8bd8b9af-077d-4066-a8d9-38224394a5cc) | ![Menu](https://github.com/user-attachments/assets/93bd33a9-ca6b-4e56-9de3-dea810c76f40) | ![Reservation](https://github.com/user-attachments/assets/b02a05f8-4348-4516-bab1-350ba22b89e7) |
_

---

## 🔁 Application Flowcharts

![diagram-export-08-04-2025-22_40_17](https://github.com/user-attachments/assets/ba3d6042-03cb-42e9-bfd8-2f58b55fb1eb)
![diagram-export-08-04-2025-22_45_13](https://github.com/user-attachments/assets/c126cefe-347a-4ecc-93f4-127757c9fc25)

---

## 📚 Documentation 
 
- Software Engineering Reports:
[MeghResto_Deployment_Report.docx](https://github.com/user-attachments/files/19703197/MeghResto_Deployment_Report.docx)
[MeghResto_Testing_Report.docx](https://github.com/user-attachments/files/19703195/MeghResto_Testing_Report.docx)
[MeghResto_SRC_Report.docx](https://github.com/user-attachments/files/19703194/MeghResto_SRC_Report.docx)
[MeghResto_Software_Development_Implementation.docx](https://github.com/user-attachments/files/19703193/MeghResto_Software_Development_Implementation.docx)
[MeghResto_Design_Report.docx](https://github.com/user-attachments/files/19703192/MeghResto_Design_Report.docx)


---

## 🚀 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

