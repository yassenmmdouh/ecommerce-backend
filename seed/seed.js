const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Category = require('../models/Category');
const Product = require('../models/Product');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Category.deleteMany();
        await Product.deleteMany();

        const cat1 = await Category.create({
            name: 'Electronics'
        });

        const cat2 = await Category.create({
            name: 'Books'
        });

        await Product.create([
            {
                name: 'Laptop',
                description: 'High performance laptop',
                price: 1200,
                category: cat1._id,
                countInStock: 10
            },
            {
                name: 'Node.js Guide',
                description: 'Learn Backend Development',
                price: 40,
                category: cat2._id,
                countInStock: 5
            }
        ]);

        console.log('Sample Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

seedData();