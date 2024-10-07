const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    experience_level: {
        type: String,
        enum: ['Intermediate', 'Senior', 'Junior'],
        required: true
    },
    preferences: {
        desired_roles: {
            type: [String],
            required: true
        },
        locations: {
            type: [String],
            required: true
        },
        job_type: {
            type: String,
            required: true
        }
    }
});

const UserJobProfile = mongoose.model('UserProfile', UserProfileSchema);
module.exports = UserJobProfile;
