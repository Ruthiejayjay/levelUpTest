# levelUpTest
This is a Project that contains a Vue.js Frontend and Node.js Backend. 

## To run Frontend

### Project setup
```
cd frontend
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
The Frontend runs on port 8080

## To run Backend

### Project setup
```
cd backend
npm install
```
### Compiles and hot-reloads for development
```
npm start
```
Run backend project on postman using http://localhost:5000/api/validation.


### The backend has two routes:
- **Create A Payment**: http://localhost:5000/api/validation.
The create a payment route is a POST requests that takes five required parameters (Email: String, Card Number: Number, Expiration Date: Date (format: MM/DD/YYY), CVV: Number, Name: String)

- **Get All Payments**: http://localhost:5000/api/validation. The Get all payments is a get requests that gets all the created payments.

## Database: 
The project is connected to a NoSQL database, Mongodb. Mongoose was used in the project
