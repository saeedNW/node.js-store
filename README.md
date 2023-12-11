# node.js-store

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
    - [Starting Development Environment](#starting-development-environment)
    - [Starting Production Environment](#starting-production-environment)
    - [Restful API Swagger Doc URL](#restful-api-swagger-doc-url)
    - [Socket-based chat system URL](#socket-based-chat-system-url)
- [Additional Notes](#additional-notes)
- [Technologies Used](#technologies-used)
- [Contributors](#contributors)

## Getting Started

`node.js-store` is a simple physical and digital goods store. which was developed in order to increase the level of
familiarity and personal skill of its developer while passing the **node.js** programming course under the supervision
of [Erfan Yousefi](https://github.com/erfanyousefi/).

The project is a node.js web application which contains technologies such
as `restful api`, `graphql`, `swagger`, `socket.io`, `ejs` and etc.

The project is divided into two parts, a **restful api** store and a **socket-based** chat system with ejs as the
template engine.

## Prerequisites

Before you begin, ensure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) (latest version)
- [MongoDB](https://www.mongodb.com/) (latest version)
- [Redis](https://redis.io/) (latest version)
- [Visual Studio Code](https://code.visualstudio.com/) (or any code editor of your choice)

## Installation and Setup

In order to get this application up and running on your local machine, follow the steps below.

1. Clone the repository from GitHub:
    ```shell
    git clone https://github.com/saeedNW/node.js-store.git
    ```

2. Navigate to the project directory:
    ```shell
    cd node.js-store
    ```

3. Install project dependencies:
    ```shell
    npm install
    ```

Note that the application default Listing port is ` 3000 `.

### Starting Development Environment

To run the application in development mode you can use this command:

```shell
npm run dev
```

### Starting Production Environment

To run the application in production mode you can use this command:

```shell
npm run start
```

### Restful API Swagger Doc URL

```http request
http://localhost:3000/api-doc
```

### Socket-based chat system URL

In order to open the Chat system follow these steps

1. Create a new account through swagger doc
2. Create some `namespaces` and `rooms` through swagger doc
3. Go to chat system login page

    ```http request
    http://localhost:3000/support/login
    ```
4. Open chat system page

    ```http request
    http://localhost:3000/support/
    ```

## Additional Notes

- Make sure to set up environment variables as needed in the **.env** file.

- If you encounter any issues during the installation process or while running the application, please check the
  project's issue tracker on GitHub or contact the project maintainers for support.

Now you should have your Node.js store application up and running!

## Technologies Used

List of the major technologies and libraries used to build this application:

- Node.js & Express.js
- MongoDB
- Redis
- Graphql
- Swagger
- EJS (Embedded JavaScript templates)
- Socket.IO

## Contributors

We would like to thank the following individuals who have contributed to the development of this application:

![avatar](https://images.weserv.nl/?url=https://github.com/erfanyousefi.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)
‎ ‎ ‎ ![avatar](https://images.weserv.nl/?url=https://github.com/saeedNW.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)


[**Erfan Yousefi - Supervisor and instructor of the node.js programming course**](https://github.com/erfanyousefi/)

[**Saeed Norouzi - Back-end Developer**](https://github.com/saeedNW)
