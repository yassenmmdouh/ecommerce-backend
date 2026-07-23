const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Category = require("../models/Category");
const Product = require("../models/Product");

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        
        await Product.deleteMany();
        await Category.deleteMany();

        
        const categories = await Category.insertMany([
            {
                name: "Electronics",
                description: "Electronic devices"
            },
            {
                name: "Books",
                description: "Books and learning materials"
            },
            {
                name: "Clothing",
                description: "Fashion and clothes"
            }
        ]);

        
        const products = await Product.insertMany([
            {
                name: "Laptop",
                description: "High performance laptop",
                price: 1200,
                stock: 10,
                category: categories[0]._id,
                images: []
            },
            {
                name: "Smartphone",
                description: "Latest smartphone",
                price: 800,
                stock: 15,
                category: categories[0]._id,
                images: []
            },
            {
                name: "Node.js Guide",
                description: "Learn Backend Development",
                price: 40,
                stock: 5,
                category: categories[1]._id,
                images: []
            },
            {
                name: "JavaScript Book",
                description: "Master JavaScript",
                price: 35,
                stock: 8,
                category: categories[1]._id,
                images: []
            },
            {
                name: "T-Shirt",
                description: "Cotton T-Shirt",
                price: 25,
                stock: 20,
                category: categories[2]._id,
                images: []
            },
            {
                name: "Jeans",
                description: "Blue Denim Jeans",
                price: 50,
                stock: 12,
                category: categories[2]._id,
                images: []
            }
        ]);

        console.log("=================================");
        console.log(`${categories.length} Categories Added`);
        console.log(`${products.length} Products Added`);
        console.log("Seed Completed Successfully");
        console.log("=================================");

    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB Disconnected");
        process.exit();
    }
};

seedData();