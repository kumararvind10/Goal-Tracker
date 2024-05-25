const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    goal: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
    title: { type: String, required: true },
    quantity: { type: String, required: true },
    frequency: {
        type: String,
        enum: ['once a day', 'twice a day', 'no of days', 'days of week', 'once a week'],
        required: true

    },
    daysOfWeek: [{ type: String }],
    reminders: [{ type: Date }],
    autoReminders: [{ type: Boolean, default: false }],

})


module.exports = mongoose.model('Task', taskSchema)