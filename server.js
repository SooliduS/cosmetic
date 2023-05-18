require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middlewares/logEvents');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const credentials = require('./middlewares/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swaggerOptions');
const verifyJWT = require('./middlewares/verifyJWT');
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

//routes 
//public routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); //swagger api docs
app.use('/register' , require('./routes/users/register'))
app.use('/login' , require('./routes/users/auth'))
app.use('/getproducts' , require('./routes/products/getProducts'))
app.use('/getposts' , require('./routes/posts/getPosts'))
app.use('/getcategories' , require('./routes/categories/getCategories'))

//private routes
// app.use(verifyJWT)//↓
app.use('/refresh' , require('./routes/users/refresh'))
app.use('/logout' , require('./routes/users/logout'))
app.use('/product' , require('./routes/products/crud'))//all products crud controller
app.use('/salesmanrequest' , require('./routes/users/salesmanRequest')) //request for earn salesman role

//handle errors
app.use(errorHandler);

//connect to server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});


