import mongoose from "mongoose";

// Define the schema fields
const field = {
  githubId: {
    type: String,
    default: null,
  },
  githubNodeId: {
    type: String,
    default: null,
  },
  installationId: {
    type: String,
    default: null,
  },
  clientId: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null, // Default value if not provided
  },
  email: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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
    default: "user", // Default value if not provided
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
