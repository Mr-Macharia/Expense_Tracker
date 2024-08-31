
# Expense Tracker



Welcome to my Expense Tracker web application! This project allows users to manage and track their expenses efficiently. Below is a comprehensive guide on how to set up, run, and use the application.

## Features

- **User Registration & Authentication**: Secure sign-up with unique values required during registration.
- **Add Expenses**: Easily add new expenses that will automatically be saved to the database.
- **Edit Expenses**: Modify existing expenses, with changes instantly reflected in the database.
- **Delete Expenses**: Remove unwanted expenses from the database with a simple click.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Environment Variables**: `.env` file for secure configuration management

## Getting Started

To get the Expense Tracker up and running on your local machine, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/Mr-Macharia/expense-tracker.git
cd expense-tracker
```

### 2. Set Up the Database

Create a MySQL database and set up two tables: one for users and another for expenses. The table structure is up to you, but ensure it matches the queries in the application.

### 3. Update SQL Connection Details

Ensure your SQL connection details are accurate. These details are stored in a `.env` file, included in `.gitignore` for security. Example:

```
DB_HOST=your_host
DB_USER=your_username
DB_PASSWORD=your_password
DB_DB=your_database_name
```

### 4. Install Dependencies

Before running the application, you need to install the necessary Node.js packages:

```bash
npm install mysql bcrypt nodemon dotenv jsonwebtoken path
```

### 5. Run the Application

Start the server by running:

```bash
nodemon server.js
```

Or, if you prefer:

```bash
node server.js
```

Your application should now be running; you can access it through your browser.

## Usage

- **Sign Up**: Create a new account by registering with a unique email.
- **Log In**: Access your account with your credentials.
- **Add an Expense**: Fill out the expense form and submit it to add a new expense to your list.
- **Edit or Delete Expenses**: Use the edit and delete buttons next to each expense to make modifications or remove them from the list.

## Security & Best Practices

- **Environment Variables**: Sensitive information such as database credentials should be stored in a `.env` file and never publicly exposed.
- **Data Validation**: Ensure all user inputs are properly validated on both the client and server sides to prevent SQL injection and other security issues.
- **Authentication**: User authentication is managed through JSON Web Tokens (JWT) to keep your sessions secure.

## Future Enhancements

- **Reporting**: Implementing expense reporting features such as charts or graphs.
- **User Profiles**: Adding more personalization options for users.
- **Mobile Responsiveness**: Improving the mobile user experience.

## Enjoy
