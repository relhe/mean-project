# Explore Canada project

Welcome to the official repository of **Explore Canada project** , a fully integrated full-stack web application built with the MEAN stack: **MongoDB** , **Express.js** , **Angular** , and **Node.js** .

# Key Features

- **User Authentication** (Sign up / Login / JWT)
- **RESTful API** with Express.js
- **Responsive Angular Frontend**
- **MongoDB** integration with Mongoose
- Modular and maintainable code structure
- Deployed on Heroku

# Project structure

```
mean-app/
├── client/
│   ├── src/
│   └── ...
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── ...
└── README.md

```

# Getting Started

## Clone the repository

```
git clone https://github.com/relhe/mean-project.git
cd mean-project
```

## Install dependencies

### Install dependencies for angular application

From project root

```
cd client
npm install
```

### Install dependencies for NodeJs Express application

From project root

```
cd server
npm install
```

## Set up environment Variables

Create a `.env` file in the `server` directory:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Run the full-stack mean application

### backend

From your project root

```
cd server
npm run dev
```

### frontend

From your project root

cd client
ng serve --open

## Security Notes

- Passwords are hashed with bcrypt.
- JWT tokens are stored securely in HTTP-only cookies or local storage.
- Input validation is performed server-side and client-side.

# How to contribute to this project

- Fork this repo
- Create your feature branch: `git checkout -b feature/branchName`
- Commit your changes
- Push and open a Pull Request

# Contact

For questions, feedback, or bug reports:

- GitHub: https://github.com/relhe

# License

This project is licensed under the MIT License. See the [LICENSE]() file for details.
