const mongoose = require('mongoose')


const goalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    minTimeLine: { type: String, required: true },
    maxTimeLine: { type: String, required: true },
    userTimeLine: { type: String, required: true },
    task: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]

})

module.exports = mongoose.model('Goal', goalSchema)