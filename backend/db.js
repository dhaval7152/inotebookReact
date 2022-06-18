const mongoose=require('mongoose');

const mongoURI="mongodb://localhost:27017/inotebook"
const connectToMongo= async()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo Succefully");
    })

}
module.exports=connectToMongo;