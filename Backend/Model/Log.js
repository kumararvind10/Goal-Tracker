const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    goal: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    // status: { type: String, enum: ['Completed', 'missed'], required: true }

})


module.exports = mongoose.model('Log', logSchema)