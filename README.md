# Home Assignment for Adcash Full Stack Developer Position

Task was to create a simple virutal investment portfolio management for stock market. Because it is a full web development project, then I needed to take care of data handling at database level, creating queries and REST endpoints in backend and fetching them at the frontend - whole life cycle if you will. There were following requirements for the task:

Domain:
Each client should have some balance in their virtual investment portfolios. Gain
and loss of clients should be calculated based on the difference between purchase
and current prices of stocks. Each purchase should be deducted from the client’s
balance. 

App should allow users to:
- Purchase stock for a client
- List of transactions done per client
- List the most profitable clients and view their transactions
- List recent stocks based on creation time

Technical:
- PHP/Python framework for backend
- Vue/React for frontend
- Data should be stored in MySQL/PostgreSQL;


Project has only one view with modal for stock purchase, all the data manipulation is taken care at database and backend level, frontend is just for visualization.

_My final goal was also to dockerize the whole project inorder to make the deployment process smoother, but due lack of knowledge I didn't succeed - so this project is not finalized but in-progress._

---

## Starting database

    - install MySQL Community Server and Workbench (for convenient db insertion and visualization) into your computer if you haven't yet
    - create a db called 'virtual-portfolio', PORT:3306
    - import from folder 'mysql' file 'virtual-portfolio-db'
    - run the query


## Starting backend

    $ install Python into your computer if you haven't yet
    $ git clone https://github.com/msalu/loan-app.git
    $ cd flask-server
    $ pip install Flask
    $ pip install mysql-connector-python
    $ python server.py


## Starting frontend

    $ cd virtual-portfolio
    $ npm i
    $ npm start


## Start & Watch
    - MySQL Server has to work
    - Backend -> $ python server.py
    - Front -> $ npm start
    - Viewing backend -> http://localhost:5000 -> corresponding URL endpoints are in the file 'server-py'
    - Viewing frontend -> http://localhost:3000

---

## Languages & Tools

 - Languages: SQL, Python ,React

 - Database: MySQL
 - Backend: Python Flask, MySQL Connector
 - Frontend: ReactJS, Ant Design Framework
