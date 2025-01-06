import mongoose from "mongoose";

// Define the schema fields
const field = {
  name: {
    type: String,
    default: null, // Default value if not provided
  },
  email: {
    type: String,
    default: null, // Default value if not provided
  },
  phone: {
    type: String,
    required: true, // This field is required
  },
  password: {
    type: String,
    required: true, // This field is required
  },
  avatar: {
    type: String,
    default: null, // Default value if not provided
  },
  username: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "user"], // Allowed values
      message: "User role value can't be {VALUE}, must be admin / user", // Custom error message for invalid values
    },
    default: "employee", // Default value if not provided
  },

  status: {
    type: String,
    enum: {
      values: ["active", "inactive"],
    },
    default: "active",
  },
  existence: {
    type: Boolean,
    default: true, // Default value if not provided
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
};

// Create a new schema using the defined fields
const appUserSchema = mongoose.Schema(field, { timestamps: true });

// Create a model using the schema
const User = mongoose.model("User", appUserSchema);

// Export the model
export default User;
