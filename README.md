# task-management-system
## 📋 Overview
This is a fullstack application built with:
- Frontend: ⚡ Vite + React
- Backend: ☕ Spring Boot
- Database: 🗃️ MysQL
- Authentication: JWT

## 📦 Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v22 or higher recommended)
- npm 
- Java JDK (v21 or higher recommended)
- Xampp
- Gmail account with 2FA enabled & app Password

## 🛠️ Setup Instructions

### 1️. Clone the Repository
```bash
git clone https://github.com/nipun-dezoysa/task-management-system.git
cd task-management-system
```

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd task-api
```
- Configure Application Properties.
- Modify src/main/resources/application.properties with your database & email smtp configuration:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/<yourdb>
spring.datasource.username=<yourusername>
spring.datasource.password=<yourpassword>

spring.mail.username=<your@gmail.com>
spring.mail.password=<password>
```
Build and Run
```bash
mvn clean install
mvn spring-boot:run
```
- (optional) use Idea like intelij to install and run the backend
- The backend should now be running on http://localhost:8080

### 3. Frontend Setup
Navigate to the frontend directory:
```bash
cd task-client
```
Install Dependencies
```bash
npm install
```
Run the Development Server
```bash
npm run dev
```
The client should now be running on http://localhost:5173/
