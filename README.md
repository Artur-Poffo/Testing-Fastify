# Testing Fastify

I'm studying the Fastify framework right now, so I made this simple project using Fastify and Prisma.

In addition I also wanted to test the efficiency of free hosting on [Render](https://dashboard.render.com/).

## Technologies 

Here are the technologies used in this project.

* Node.js
* TypeScript
* Fastify
* Prisma
* PostgreSQL
* zod
* jsonwebtoken
* bcrypt
* tsx
* tsup

## Services Used

* [GitHub](https://github.com/)
* [Render](https://dashboard.render.com/)

## Getting started

* Clone the repository
```bash
  git clone https://github.com/Artur-Poffo/Testing-Fastify.git
```

* Install PostgreSQL in your machine
  - Follow the steps in the [documentation](https://www.postgresql.org/) for your operating system and install
  
* Connect your database to the application
  - Create a `.env` file on root directory
  - insert two environment variable:
  ```.env
    DATABASE_URL="postgresql://<YOUR USER>:<YOUR PASSWORD>@localhost:5432/<YOUR DB NAME>?schema=public"
    SECRET=<WHATEVER STRING FOR JWT>
  ```
  - That's it, in the Prisma schema it calls this environment variable to connect the DB, just replace it with your PostgreSQL user information
  
* install dependencies.
  - `npm install` on root directory (you need installed node and npm for this)
  
* To run the project.
  - `npm run dev` on root directory

## How to use

**Obs: you will need a program to test the Endpoints, like [Insomnia](https://insomnia.rest/products/insomnia) but i recommended the [Thunder Client](https://www.thunderclient.com/) VScode extension**

### Routes and Features

* **_/users/_**
  * **GET**
    * Get a list of users

* **_/users/:id_**
  * **GET**
    * Get a specific user

* **_/users/signup_**
  * **POST**
    * Add a new user to DB

* **_/users/signin_**
  * **POST**
    * Sign In function

* **_/users/:id_**
  * **PATCH**
    * Update a user

* **_/users/:id_**
  * **DELETE**
    * Delete a user

* **_/products/_**
  * **GET**
    * Get a list of products

* **_/products/:id_**
  * **GET**
    * Get a specific product

* **_/products/_**
  * **POST**
    * Create a new product

* **_/products/:id_**
  * **PATCH**
    * Update a product

* **_/products/:id_**
  * **DELETE**
    * Delete a product

## Links
  - Repository: https://github.com/Artur-Poffo/Testing-Fastify
  - Deploy on Render: https://testing-fastify.onrender.com

## Versioning

1.0.0

## Authors

> **_Artur Poffo_** 

Please follow github and join us!
Thanks to visiting me and good coding!