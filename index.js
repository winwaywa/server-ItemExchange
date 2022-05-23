require('dotenv').config({ path: './config.env' });
require('express-async-errors');

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const fileUpload = require('express-fileupload');

//middleware
app.use(cors());
//giúp nhận ra object json đc gửi từ client với 'Content-Type': 'application/json'
app.use(express.json());
//giúp nhận ra object file đc gửi từ client và xử lý cho ra ở req.files
app.use(fileUpload({ useTempFiles: true })); //https://www.npmjs.com/package/express-fileupload

//localhost:5000/uploads/avatar.jpg
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);
app.use(morgan('dev'));

//db
const connectDB = require('./src/db/connect');

//router
const authRouter = require('./src/routes/auth');
const userRouter = require('./src/routes/user');
const categoryRouter = require('./src/routes/category');
const productRouter = require('./src/routes/product');
const transactionRouter = require('./src/routes/transaction');
const sendMailRouter = require('./src/routes/send-mail');
// const authenticateUser = require('./src/middleware/authentication');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/mail', sendMailRouter);

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
