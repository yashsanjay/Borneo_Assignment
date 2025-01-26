const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

async function createAdmin() {
    await mongoose.connect(process.env.MONGO_URI);

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
