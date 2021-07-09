const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
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
        via_paulista: {
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

module.exports = mongoose.model("Table", tableSchema);
