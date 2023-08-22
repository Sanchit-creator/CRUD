// Import required modules
import express, { Request, Response } from 'express';
import { Sequelize, DataTypes } from 'sequelize';

// Set up Express app
const app = express();
app.use(express.json());

// Set up Sequelize
const sequelize = new Sequelize('test', 'sanchit', 'sanchit', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync model with database
sequelize.authenticate().then(() => {
  console.log('Database and tables created!');
});

// Create signup route
app.post('/signup', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const newUser = await User.create({ username, password });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        console.log(users); // Log the fetched users to the console
        res.status(200).json(users); // Send the users array as a JSON response
        // res.json({ message: "Welcome to bezkoder application." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});


app.put('/users/:id', async (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    try {
        const user = await User.update(
            {username: username, password: password},
            {where: {id: req.params.id}}
        )
        res.status(200).json(user)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user' });
    }
  });

  app.delete('/users/:id', async (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    try {
        const user = await User.destroy(
            {where: {id: req.params.id}}
        )
        res.status(200).json(user)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user' });
    }
  });

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
