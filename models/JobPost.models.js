const mongoose = require("mongoose");

const JobPostSchema = new mongoose.Schema(
    {
        job_id: Number,
        job_title: String,
        company: String,
        required_skills: [String],
        location: String,
        job_type: String,
        experience_level: String
    });


const JobPost = mongoose.model("jobpost", JobPostSchema);

module.exports = JobPost;