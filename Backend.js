// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


// Initialize the app
const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());




// Connect to the database
mongoose.connect("mongodb://localhost:27017/dezt")
    .then(() => {
        console.log('Server connected to the database');
    })
    .catch((error) => {
        console.log('Something went wrong while connecting to the database:', error);
    });

// Define the schema
const userSchema = new mongoose.Schema({
    UserId: {
        type: String,
        unique: true,
        required: true
    },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    address: { type: String, required: true, unique: true },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true }
});

// Create the model
const UserModel = mongoose.model("Beztlabusers", userSchema);

// Define routes
app.get("/", (req, res) => {
    res.send("Welcome To HomePage");
});

// new profile create api 
app.post('/create', (req, res) => {
    const { UserId, email, gender, address, pincode, city, state, country } = req.body;
    console.log('Request Body:', req.body);

    //  if all required fields are provided
    if (!UserId || !email || !gender || !address || !pincode || !city || !state || !country) {
        return res.status(400).send({ msg: "All fields are required" });
    }

    // Create a new user profile
    UserModel.create(req.body)
        .then((newUser) => {
            res.status(201).send({ msg: "Profile created successfully", user: newUser });
        })
        .catch((error) => {
            console.error('Error creating profile:', error);
            res.status(500).send({ msg: "Error creating profile", error: error.message });
        });
});


// Update user profile API
app.put('/update/:UserId', async (req, res) => {
    try {
        const userId = req.params.UserId; 
        const updates = req.body; 

        const updatedUser = await UserModel.findOneAndUpdate({ UserId: userId }, updates, { new: true, runValidators: true });
        
        if (!updatedUser) {
            return res.status(404).send({ msg: "User not found" });
        }
        res.send({ msg: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send({ msg: "Error updating profile", error: error.message });
    }
});



app.get('/users/:UserId', (req, res) => {
    const { UserId } = req.params;
    UserModel.findOne({ UserId })
        .then(user => {
            if (!user) {
                return res.status(404).send({ msg: "User not found" });
            }
            res.send(user);
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            res.status(500).send({ msg: "Error fetching user" });
        });
});




// Delete user profile API
app.delete('/delete/:UserId', (req, res) => {
    const userId = req.params.UserId; 

    UserModel.findOneAndDelete({ UserId: userId })
        .then((deletedUser) => {
            if (!deletedUser) {
                return res.status(404).send({ msg: "User not found" });
            }
            res.send({ msg: "User deleted successfully", user: deletedUser });
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
            res.status(500).send({ msg: "Error deleting user", error: error.message });
        });
});

// Get all user profiles API
app.get('/users', (req, res) => {
    UserModel.find({}, 'UserId email')
        .then((users) => {
            res.send(users);
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
            res.status(500).send({ msg: "Error fetching users", error: error.message });
        });
});
 


// Start the server
const PORT = 3001;  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

 