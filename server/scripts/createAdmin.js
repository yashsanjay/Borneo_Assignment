const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user'); // Adjust path as needed
const dotenv = require('dotenv');

dotenv.config(); // Ensure environment variables are loaded

async function createAdmin() {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const email = "admin@example.com";
    const password = await bcrypt.hash("admin123", 10);

    const admin = new User({
        email,
        password,
        role: "Admin",
        status: "active",
    });

    await admin.save();
    console.log("Admin created successfully!");
    process.exit();
}

createAdmin().catch((err) => {
    console.error("Error creating admin:", err);
    process.exit(1);
});
