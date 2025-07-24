require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/productSchema'); // adjust path if needed

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("DB Connected"))
.catch(err => console.log(err));

const products = [
    {
        productName: "iPhone 14 Pro",
        description: "Apple iPhone 14 Pro with A16 Bionic chip, 128GB storage",
        price: { cost: 119900, mrp: 129900, discountPercent: 8 },
        category: "Electronics",
        subcategory: "Mobile",
        productImage: "https://via.placeholder.com/300x300?text=iPhone+14+Pro",
        reviews: []
    },
    {
        productName: "Samsung Galaxy S23",
        description: "Samsung Galaxy S23 with Snapdragon 8 Gen 2, 256GB storage",
        price: { cost: 79999, mrp: 89999, discountPercent: 11 },
        category: "Electronics",
        subcategory: "Mobile",
        productImage: "https://via.placeholder.com/300x300?text=Samsung+S23",
        reviews: []
    },
    {
        productName: "MacBook Air M2",
        description: "Apple MacBook Air with M2 chip, 13.6-inch display, 256GB SSD",
        price: { cost: 114900, mrp: 124900, discountPercent: 8 },
        category: "Electronics",
        subcategory: "Laptop",
        productImage: "https://via.placeholder.com/300x300?text=MacBook+Air+M2",
        reviews: []
    },
    {
        productName: "Sony WH-1000XM5",
        description: "Sony premium noise-cancelling wireless headphones",
        price: { cost: 29990, mrp: 34990, discountPercent: 14 },
        category: "Electronics",
        subcategory: "Headphones",
        productImage: "https://via.placeholder.com/300x300?text=Sony+XM5",
        reviews: []
    },
    {
        productName: "Men's Cotton T-shirt",
        description: "Comfortable and stylish 100% cotton T-shirt",
        price: { cost: 599, mrp: 999, discountPercent: 40 },
        category: "Fashion",
        subcategory: "Clothing",
        productImage: "https://via.placeholder.com/300x300?text=Men+Tshirt",
        reviews: []
    },
    {
        productName: "Women's Summer Dress",
        description: "Lightweight and breathable summer dress",
        price: { cost: 1499, mrp: 2499, discountPercent: 40 },
        category: "Fashion",
        subcategory: "Clothing",
        productImage: "https://via.placeholder.com/300x300?text=Women+Dress",
        reviews: []
    },
    {
        productName: "Running Shoes",
        description: "Durable and comfortable running shoes for all-day wear",
        price: { cost: 2999, mrp: 4999, discountPercent: 40 },
        category: "Fashion",
        subcategory: "Footwear",
        productImage: "https://via.placeholder.com/300x300?text=Running+Shoes",
        reviews: []
    },
    {
        productName: "Noise Smartwatch",
        description: "Noise smartwatch with fitness tracking and heart rate monitoring",
        price: { cost: 2499, mrp: 4999, discountPercent: 50 },
        category: "Electronics",
        subcategory: "Wearables",
        productImage: "https://via.placeholder.com/300x300?text=Noise+Watch",
        reviews: []
    }
];

async function seed() {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Sample products added");
    mongoose.connection.close();
}

seed();
