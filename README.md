# BlogVibe - Your Personal Blogging Platform

<!-- Project Images -->

![Blog Screenshot](https://github.com/Mehdi-Zarei/Blog-V2/raw/fa5087e20b679c72faa5534038b442e33e1c8f61/public/images/2.jpg)

![Blog Screenshot](https://github.com/Mehdi-Zarei/Blog-V2/raw/fa5087e20b679c72faa5534038b442e33e1c8f61/public/images/1.jpg)

## A simple and functional blogging website that allows users to create articles, manage tags, read other users' articles, and leave comments.

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
- **CAPTCHA Verification**: Prevent bots with CAPTCHA during login.
- **API Documentation**: API documentation is available via Swagger at [http://localhost:3000/api-doc#/](http://localhost:3000/api-doc#/).

## 🛠️ Technologies

- **Programming Languages**: JavaScript
- **Frameworks**: Express.js
- **Database**: MySQL (using Sequelize)
- **Caching**: Redis (for storing refresh tokens and one-time links)
- **Authentication**: Passport.js (with Local, Google, and JWT strategies)
- **Password Hashing**: bcrypt
- **Validation**: Yup (for data validation)
- **Email Service**: Nodemailer (for sending emails)
- **Other Tools**: Node.js, npm

## 🚀 Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Mehdi-Zarei/Blog-V2.git
   cd Blog-V2
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables:**
   ```bash
   A) Rename the .envExample file to .env
   B) Fill in the required values in the .env file.
   ```
4. **Set Up the Database**:

   - Inside the root directory, you will find a file named `blog_v2.sql`.
   - Import this file into your MySQL database to create the necessary structure.
   - You can do this using a MySQL client or command line tool. For example, in MySQL Workbench:
     - Go to **File > Open SQL Script** and open `blog_v2.sql`.
     - Run the script to create the required database structure.

5. **Run the Project**:

   ```bash
   npm run dev
   ```

6. **Access the Project**:

   ```
   Open your browser and go to http://localhost:3000/api/auth/register
   ```

7. **API Documentation**:
   - For detailed API documentation, visit [Swagger API Docs](http://localhost:3000/api-doc#/).

🗂️ **Project Structure**

The project follows the MVC structure:

```
Blog_V2/
├── apiDoc             # Swagger Api Documents
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

#### CAPTCHA Verification:

- During login, you'll be asked to complete a CAPTCHA to prove you're human.

---

#### 📜 License

- This project is licensed under the MIT License. For more information, see the LICENSE file.

---

#### 📞 Contact

- To get in touch with me, you can email mahdizareiofficial@gmail.com.
