const mongoose = require('mongoose');
const validator = require('validator');

const messageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            validate: {
                validator: (v) => validator.isEmail(v),
                message: 'Please provide a valid email address',
            },
        },
        subject: {
            type: String,
            trim: true,
            maxlength: [200, 'Subject cannot exceed 200 characters'],
            default: 'No Subject',
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
            minlength: [10, 'Message must be at least 10 characters'],
            maxlength: [2000, 'Message cannot exceed 2000 characters'],
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        ipAddress: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true, // adds createdAt & updatedAt automatically
    }
);

module.exports = mongoose.model('Message', messageSchema);
