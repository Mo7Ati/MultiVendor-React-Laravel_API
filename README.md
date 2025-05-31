# 🛒 MultiVendor Store – Laravel API + React Dashboard + Blade Front Store

A full-stack eCommerce platform that supports multiple vendors. The backend is powered by **Laravel**, the admin dashboard is built with **React.js**, and the customer-facing storefront uses **Laravel Blade templates** with Vite.

---

## 📁 Project Structure

```
MultiVendor-React-Laravel_API/
│
├── backend/         # Laravel API + Blade frontend (store)
└── dashboard/       # React admin panel (dashboard)
```

---

## ⚙️ Requirements

- PHP >= 8.1
- Composer
- Node.js >= 18
- MySQL or SQLite
- Laravel CLI
- npm / yarn

---

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/Mo7Ati/MultiVendor-React-Laravel_API.git
cd MultiVendor-React-Laravel_API
```

---

## 🔙 Backend Setup (Laravel API + Blade Store)

```bash
cd backend
```

### Step 1: Install PHP and JS Dependencies

```bash
composer install
npm install
```

### Step 2: Create Environment File

```bash
cp .env.example .env
```

Update `.env` with your database credentials:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_db_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### Step 3: Generate App Key

```bash
php artisan key:generate
```

### Step 4: Run Migrations and Seeders

```bash
php artisan migrate --seed
```

### Step 5: Link Storage (for image uploads)

```bash
php artisan storage:link
```

### Step 6: Start Laravel Server & Vite

In one terminal, serve the backend:

```bash
php artisan serve
```

In a second terminal, run Vite to compile assets:

```bash
npm run dev
```

Your Blade front store and API will be available at:  
👉 `http://localhost:8000`

---

## 🧠 Frontend Setup (React Dashboard)

```bash
cd ../dashboard
```

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure API URL

Create a `.env` file and set the Laravel backend URL:

```env
VITE_API_URL=http://localhost:8000/api
```

### Step 3: Start React Development Server

```bash
npm run dev
```

Vite will generate a URL like:  
👉 `http://localhost:5173`  
This is your **React dashboard URL**.

---

## 🔑 Authentication

- Uses **Laravel Sanctum** for token-based authentication.
- The frontend should include the token in `Authorization` headers when making API calls.

---

## 🎯 Features

### Vendors
- Register/Login
- Add/Edit/Delete Products
- View Orders

### Admin
- Manage Vendors, Products, Users
- Dashboard Analytics

### Customers (Blade Frontend)
- Browse & Search Products
- Add to Cart / Checkout
- View Orders

---

## 🛠 Development Tips

- Use Postman/Insomnia to test API endpoints.
- Keep frontend and backend running on separate ports.
- Use `.env` files to configure base URLs dynamically.
- Make sure both backend and frontend run `npm run dev` if using Vite.

---

## 📃 License

This project is licensed under the MIT License.

---

## 🤝 Contributions

Pull requests, issues, and feedback are welcome!
