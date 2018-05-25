const mongoose = require('mongoose');


let Poll_Schema = new mongoose.Schema({
    _creator: {
        type: mongoose.Schema.Types.ObjectId
    },
    poll: [{
        option1: {
            type: String,
            maxlength: 20,
            minlength: 3
        },
        voteCounterOpt1: {
            type: Number,
            minlength: 1,
            maxlength: 2,
            default: 0
        },
        option2: {
            type: String,
            maxlength: 20,
            minlength: 3
        },
        voteCounterOpt2: {
            type: Number,
            minlength: 1,
            maxlength: 2,
            default: 0
        }
        
    }]
});

Poll_Schema.methods.toJSON = function () {
    let PollsObject = this.toObject();

    return PollsObject;
};

Poll_Schema.methods.AddNewPoll = function (option1, option2) {
    return this.update({
        $set: {
            poll: { option1, option2 }
        }
    });
};

const Poll_Schema_Model = mongoose.model("polls", Poll_Schema);


module.exports = { Poll_Schema_Model };
