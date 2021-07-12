const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
    {      
        budget: {
            type: Array,
        },          
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

module.exports = mongoose.model("Budget", budgetSchema);