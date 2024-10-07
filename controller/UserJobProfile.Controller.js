const JobPost = require("../models/JobPost.models");
const UserJobProfile = require("../models/UserProfile.models");
const fs = require("fs");
const path = require("path");
async function HandleUserJobProfile(req, res) {
    try {
        const userProfile = req.body;

        // Validate input
        if (!userProfile.name || !userProfile.skills || !userProfile.experience_level || !userProfile.preferences) {
            return res.status(400).json({ error: 'Missing required fields in user profile' });
        }

        // Fetch job postings from the database
        const jobPostings = JSON.parse(fs.readFileSync(path.join(__dirname, "../models/JobPostData.json"), "utf8"));

        // Generate recommendations based on user profile and job postings
        const recommendations = jobPostings
            .filter(job =>
                job.experience_level.toLowerCase() === userProfile.experience_level.toLowerCase() &&
                userProfile.preferences.desired_roles.some(role => jobTitleMatches(role, job.job_title))
            )
            .map(job => formatJobPost(job)); // Map to format the job post

        // Sort recommendations by score (if you had scoring)
        // recommendations.sort((a, b) => b.score - a.score);

        res.json(recommendations);
    } catch (err) {
        console.error('Error in HandleUserJobProfile:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Helper function to check if a job title strictly matches any of the desired roles
function jobTitleMatches(desiredRole, jobTitle) {
    return jobTitle.toLowerCase() === desiredRole.toLowerCase();
}

// Helper function to format the job post output to match the expected output format
function formatJobPost(job) {
    return {
        job_title: job.job_title,
        company: job.company,
        location: job.location,
        job_type: job.job_type,
        required_skills: job.required_skills,
        experience_level: job.experience_level
    };
}


module.exports = { HandleUserJobProfile };
