// controllers/recommendationController.js
const UserProfile = require('../models/user.js');
const JobPosting = require('../models/job.js');

exports.getRecommendations = async (req, res) => {
    try {
        const userProfileData = req.body;

        // Validate required fields
        if (!userProfileData.name || !userProfileData.skills || !userProfileData.experience_level || !userProfileData.preferences) {
            return res.status(400).json({ error: 'Missing required fields in user profile' });
        }

        // Save user profile to database (optional)
        const userProfile = new UserProfile(userProfileData);
        await userProfile.save();

        // Fetch all job postings
        const jobPostings = await JobPosting.find();

        // Implement matching logic
        const recommendations = jobPostings.map(job => {
            let score = 0;

            // Match skills
            const matchingSkills = userProfile.skills.filter(skill =>
                job.required_skills.includes(skill)
            );
            const skillMatchScore = (matchingSkills.length / job.required_skills.length) * 50; // Skills matching contributes up to 50 points
            score += skillMatchScore;

            // Match experience level
            if (userProfile.experience_level === job.experience_level) {
                score += 15;
            }

            // Match desired roles
            const roleMatch = userProfile.preferences.desired_roles.some(role =>
                job.job_title.toLowerCase().includes(role.toLowerCase())
            );
            if (roleMatch) {
                score += 15;
            }

            // Match locations
            if (userProfile.preferences.locations.includes(job.location)) {
                score += 10;
            }

            // Match job type
            if (userProfile.preferences.job_type === job.job_type) {
                score += 10;
            }

            return {
                job: job,
                score: score
            };
        });

        // Sort recommendations by score
        recommendations.sort((a, b) => b.score - a.score);

        // Return top recommendations
        const topRecommendations = recommendations
            .filter(rec => rec.score > 0)
            .map(rec => {
                return {
                    job_title: rec.job.job_title,
                    company: rec.job.company,
                    location: rec.job.location,
                    job_type: rec.job.job_type,
                    required_skills: rec.job.required_skills,
                    experience_level: rec.job.experience_level
                };
            });

        res.json(topRecommendations);
    } catch (err) {
        console.error('Error in getRecommendations:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
