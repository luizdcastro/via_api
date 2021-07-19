const mongoose = require("mongoose");

const sicroSchema = new mongoose.Schema(
    {      
        code: {
            type: String,
        },    
        name: {
            type: String,
        },    
        unit: {
            type: String,
        },    
        price: {
            type: String,
        },   
        state: {
            type: String,
        },
        CCR: {
            type: String,
            default: ""
        },
        arteris: {
            type: String,
            default: ""
        }       
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

module.exports = mongoose.model("Sicro", sicroSchema);
