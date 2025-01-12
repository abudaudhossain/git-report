import mongoose from "mongoose";

const field = {
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  githubId: {
    type: Number,
    required: true,
    unique: true,
  },
  githubNodeId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: null,
  },
  fullName: {
    type: String,
    default: null,
  },
  owner: {
    type: String,
    required: true,
  },
  private: {
    type: Boolean,
    default: false,
  },
  htmlUrl: {
    type: String,
    default: null,
  },
  tags: [
    {
      type: String,
    },
  ],
  generatedReport: {
    type: Boolean,
    default: false,
  },
  senderId: {
    type: String,
    required: true,
  },
};

const repositorySchema = mongoose.Schema(field, { timestamps: true });

const Repositories = mongoose.model("Repositories", repositorySchema);

export default Repositories;
