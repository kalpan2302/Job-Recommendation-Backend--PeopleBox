const User = require('../models/user.js');
const Job = require('../models/job.js');

exports.getRecommendedJobs = async (userId) => {
    const user = await User.findById(userId);
    
    if (!user) {
        throw new Error('User not found');
    }

    const jobs = await Job.find({
        experience_level: user.experience_level,
        job_type: user.preferences.job_type,
        location: { $in: user.preferences.locations },
        required_skills: { $in: user.skills }
    });

    return jobs;
};
