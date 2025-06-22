
# 📚 Book Library Management System

A full-stack web application for librarians to manage books, members, loans, returns, fines, and generate reports like active loans and member history.

---

## ✅ What You Need to Run This Project

### 🔧 System Requirements

| Component      | Requirement                          |
|----------------|--------------------------------------|
| Java           | 21 or higher                         |
| Node.js        | v18.x or higher                      |
| MySQL Server   | 8.x or higher                        |
| Maven          | 3.8+ (if using Maven)                |
| Git            | Latest version                       |
| Browser        | Chrome / Firefox / Edge              |
| Package Manager| `npm` (comes with Node.js)           |

---

## 🗃️ Project Folder Structure

```
book-library-system/
├── backend/              # Spring Boot app (Java)
│   └── src/
├── frontend/             # React app (JS/TS + Tailwind CSS)
│   └── src/
└── README.md
```

---

## ⚙️ Configuration Files

### Backend – `backend/src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/library_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.cors.allowed-origins=http://localhost:5173
```

### Frontend – `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/book-library-system.git
cd book-library-system
```

---

### 2. Create the Database

Log into MySQL and run:

```sql
CREATE DATABASE library_db;
```

---

### 3. Start the Backend Server

```bash
cd backend
./mvnw spring-boot:run
# or if using Gradle:
# ./gradlew bootRun
```

📍 Backend will be available at `http://localhost:8080`

---

### 4. Start the Frontend Server

```bash
cd frontend
npm install
npm run dev
```

🌐 Frontend will be running at `http://localhost:5173`

---

## 🔁 Common Development Scripts

| Command                    | Location     | Purpose                             |
|----------------------------|--------------|-------------------------------------|
| `npm install`              | frontend     | Install frontend dependencies       |
| `npm run dev`              | frontend     | Run frontend dev server             |
| `npm run build`            | frontend     | Build production frontend           |
| `./mvnw spring-boot:run`   | backend      | Run backend Spring Boot app         |
| `./mvnw test`              | backend      | Run backend unit tests              |

---

## 🧪 Testing the App

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
```

---

## 📝 Final Notes

- Ensure MySQL is running before starting the backend.
- The backend exposes REST APIs under `/api/...`.
- CORS is configured to allow frontend access from `http://localhost:5173`.
- Use Postman or your frontend UI to interact with the API.

