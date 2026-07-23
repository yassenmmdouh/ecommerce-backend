const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB = require('./config/db');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Server is running",
        data: null
    });
});

app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(
                `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
            );
        });

    } catch (error) {
        console.error(`Server failed to start: ${error.message}`);
        process.exit(1);
    }
};

startServer();