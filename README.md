# BlogVibe - Your Personal Blogging Platform

<!-- Project Images -->

![Blog Screenshot](https://github.com/Mehdi-Zarei/Blog-V2/raw/fa5087e20b679c72faa5534038b442e33e1c8f61/public/images/2.jpg)

![Blog Screenshot](https://github.com/Mehdi-Zarei/Blog-V2/raw/fa5087e20b679c72faa5534038b442e33e1c8f61/public/images/1.jpg)

A simple and functional blogging website that allows users to create articles, manage tags, read other users' articles, and leave comments.

## ✨ Features

- **Create Articles**: Registered users can create new articles.
- **Tags**: Each article can have relevant tags.
- **Read Articles**: All users (even without registration) can read articles.
- **Password Reset**: Users can reset their password using a one-time link sent to their email.
- **OTP Verification**: Users can verify their identity using a one-time password (OTP) sent to their phones.
- **Email Notifications**: Users receive email notifications for important actions (e.g., password reset).
- **Google Login**: Users can log in using their Google account.
- **JWT Authentication**: Secure authentication using JSON Web Tokens (JWT) for access and refresh tokens.
- **Password Hashing**: User passwords are securely hashed using bcrypt.

## 🛠️ Technologies

- **Programming Languages**: JavaScript
- **Frameworks**: Express.js
- **Database**: MySQL (using Sequelize)
- **Caching**: Redis (for storing refresh tokens and one-time links)
- **Authentication**: Passport.js (with Local, Google and JWT strategies)
- **Password Hashing**: bcrypt
- **Validation**: Yup (for data validation)
- **Email Service**: Nodemailer (for sending emails)
- **Other Tools**: Node.js, npm

## 🚀 Getting Started

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Mehdi-Zarei/Blog-V2.git
    cd Blog-V2
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Set Up Environment Variables:**
    ```bash
    A) Rename the .envExample file to .env
    B) Fill in the required values in the .env file.
    ```
4.  **Run the Project**:

    ```bash
      npm run dev
    ```

5.  **Access the Project:**

    ```
    Open your browser and go to http://localhost:3000/api/auth/register

    ```

    🗂️ Project Structure

        The project follows the MVC structure:

```
Blog_V2/
├── controllers/       # Controllers
├── models/            # Database models
├── routes/            # Application routes
├── middlewares        # Custom middleware (e.g., authentication middleware)
├── config/            # Configuration files
├── utils/             # Business logic (e.g., email service, Redis service)
├── validator/         # Validation schemas (using Yup)
├── strategies/        # Passport Strategy (Google,local-jwt for access and refresh token)
├── public             # Static files
├── .envExample        # Environment variables example
├── server.js          # server file
├── app.js             # Main application
├── db.js              # MySQl configs
├── redis.js           # Redis configs
 file
└── package.json       # Dependencies file
```

---

### **📝 How to Use**

#### Create Articles:

- After registering, you can create new articles from the "New article" section.

#### Manage tags:

- Add relevant tags when creating an article.

#### Reset password:

- If you forgot your password, click "Forgot Password" and follow the instructions sent to your email.

#### OTP verification:

- For sensitive actions (e.g., changing email), you will receive an OTP to verify your identity.

#### Google login:

- By clicking "Sign in with Google", you can log in using your Google account.

#### JWT authentication:

- After logging in, you will receive an access token and a refresh token for secure authentication.

---

#### 📜 License

- This project is licensed under the MIT License. For more information, see the LICENSE file.

---

#### 📞 Contact

- To get in touch with me, you can email mahdizareiofficial@gmail.com.

---
