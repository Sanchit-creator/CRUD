"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import required modules
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
// Set up Express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Set up Sequelize
const sequelize = new sequelize_1.Sequelize('test', 'sanchit', 'sanchit', {
    host: 'localhost',
    dialect: 'mysql',
});
// Define User model
const User = sequelize.define('User', {
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
// Sync model with database
sequelize.sync({ force: true }).then(() => {
    console.log('Database and tables created!');
});
// Create signup route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await User.create({ username, password });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        console.log(users); // Log the fetched users to the console
        res.status(200).json(users); // Send the users array as a JSON response
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});
// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
