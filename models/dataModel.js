const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
    {
        state: {
            type: String,
        },      
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

module.exports = mongoose.model("Data", dataSchema);

