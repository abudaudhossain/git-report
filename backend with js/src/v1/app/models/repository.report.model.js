import mongoose from "mongoose";

const field = {
  repository: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Repository",
  },
  totalCommit: {
    type: Number,
    default: null,
  },
  lastDayCommit: {
    type: Number,
    default: null,
  },
  totalPullRequest: {
    type: Number,
    default: null,
  },
  totalContributors: {
    type: Number,
    default: null,
  },
  totalFork: {
    type: Number,
    default: null,
  },
  totalStart: {
    type: Number,
    default: null,
  },
  watch: {
    type: Number,
    default: null,
  },
  openIssues: {
    type: Number,
    default: null,
  },
  closeIssues: {
    type: Number,
    default: null,
  },
  totalRelease: {
    type: Number,
    default: null,
  },
};

const repoSchema = mongoose.Schema(field, { timestamps: true });
const RepoReports = mongoose.model("RepoReports", repoSchema);

export default RepoReports;
