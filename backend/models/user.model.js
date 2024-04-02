// Objective: Define a Mongoose schema for a user and create a corresponding model.

// Importing the mongoose library, which provides tools for interacting with MongoDB.
import mongoose, { mongo } from "mongoose";

// Defining the schema for a user.
const userSchema = new mongoose.Schema({        

  // Defining properties of the user schema, including data type and validation rules.

  // Full name of the user.
  fullName: {
    type: String,
    required: [true, "Please add a name"],
  },

  // Username of the user. It must be unique.
  username: {
    type: String,
    required: [true, "Please add a username"],  
    unique: true,
  },

  // Password of the user. It must be at least 6 characters long.
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6
  },

  // Gender of the user. It must be either "male" or "female".
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"]
  },

  // Profile picture of the user. 
  profilePic: {
    type: String,
    default: "",
  }
}, {
    // Enabling automatic creation of createdAt and updatedAt fields.
    timestamps: true
  }
);    

// Creating a model based on the user schema.
const User = mongoose.model("User", userSchema);

// Exporting the User model for use in other parts of the application.
export default User;
