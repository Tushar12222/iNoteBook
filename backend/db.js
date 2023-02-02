const mongoose = require("mongoose");

const server="127.0.0.1:27017";
const database = "iNotebook";
const connectToMongo=async()=>{
    try {
        await mongoose.connect(`mongodb://${server}/${database}`);
        console.log("Connected to mongo successfully");
    } catch (error) {
        console.log('Failed to connect', error);
    }
   
        
    
};

module.exports = connectToMongo