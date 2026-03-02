# QuickShrink 🔗

QuickShrink is a full-stack URL Shortener web application built using Node.js, Express, MongoDB, and EJS. It allows users to securely register, log in, and generate short URLs that redirect to original long links.

This project follows a clean MVC architecture and demonstrates backend development concepts like authentication, routing, middleware usage, and database integration.

---

## 🚀 Features

- 🔐 User Authentication (Register & Login)
- 🛡 Secure Session Handling
- 🔗 URL Shortening
- ↪ Redirect to Original URL
- 📋 View All User Shortened Links
- 🧱 Structured MVC Architecture
- 🌍 Environment-based Configuration
- 🎨 EJS Templating with Static Assets

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- JWT / Session-based Authentication
- HTML, CSS
- dotenv

---

## 📂 Project Structure

```
QuickShrink/
 ├── config/
 │    ├── db-client.js
 │    └── env.js
 ├── controllers/
 ├── models/
 ├── routes/
 ├── services/
 ├── middlewares/
 ├── views/
 │    ├── auth/
 │    ├── partials/
 │    └── index.ejs
 ├── public/
 │    └── images/
 ├── .gitignore
 ├── package.json
 └── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/saivivekanand27/QuickShrink.git
```

### 2️⃣ Navigate into the project

```
cd QuickShrink
```

### 3️⃣ Install dependencies

```
npm install
```

### 4️⃣ Create a `.env` file in the root directory and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5️⃣ Start the server

```
npm start
```

Server will run on:

```
http://localhost:5000
```

---

## 🔄 How It Works

1. User registers and logs in.
2. Authenticated user submits a long URL.
3. The server generates a unique short ID.
4. The short URL is stored in MongoDB.
5. When accessed, the short URL redirects to the original link.

---

## 📌 Future Improvements

- 📊 Click Analytics
- 📅 Expiry-based Links
- 🔎 Custom Short URLs
- 📱 Responsive UI Improvements
- 🧾 Admin Dashboard
- 🐳 Docker Deployment

---

## 👨‍💻 Author

**Sai Vivekanand**  
GitHub: https://github.com/saivivekanand27  

---

## 📜 License

This project is open-source and available for learning and educational purposes.