require('dotenv').config({ path: './config.env' });
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

//db
const connectDB = require('./src/db/connect');

//router
const authRouter = require('./src/routes/auth');
const userRouter = require('./src/routes/user');
const categoryRouter = require('./src/routes/category');
const productRouter = require('./src/routes/product');
const authenticateUser = require('./src/middleware/authentication');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/user', authenticateUser, userRouter);

////////////////// run
const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
