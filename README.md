# Storefront Backend Project

## Project Tech

1. bcrypt
2. cors
3. db-migrate
4. dotenv
5. express
6. jsonwebtoken
7. pg
8. typescript
9. jasmine
10. supertest
11. eslint
****


## .env Variables

**You must create a .env file with this config to be able to use this project**

POSTGRES_HOST=127.0.0.1

POSTGRES_PORT=5432

POSTGRES_DB=shopping

POSTGRES_DB_TEST=shopping_test

POSTGRES_USER=shopping_user

POSTGRES_PASSWORD=password123

ENV=dev

PEPPER = storefront-backend-udacity

SALT_ROUNDS = 10

TOKEN_SECRET = yticady!

****
## How To run the project

**Install packages**

    npm i

**Run eslinter**
    
    npm run lint
**Run Test**

    npm run test

**Build Project**

    npm run start
****
## Server setup
**Express Server Port -> 3000**

1. Ensure you have install the packages using

        npm i
2. Run this script

        npm run watch

****

## How to setup the database
**Database Server Port -> 5423**

**Database Server Host -> 127.0.0.1**

**Database Driver Postgres**


1. Create database user

        CREATE USER shopping_user WITH PASSWORD 'password123';


2. Create a dev and test databases

    a. Create dev database
    
        CREATE DATABASE shopping;
    b. Create test database

        CREATE DATABASE shopping_test;

3. Grant privileges for the created user to the databases

    
        GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
        
        GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;

4. Migrate the dev database to add the tables

        db-migrate up
