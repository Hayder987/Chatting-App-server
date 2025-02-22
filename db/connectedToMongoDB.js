
import mongoose from "mongoose";

const connectedToMongoDb = async()=>{
    try{
     await mongoose.connect(process.env.MONGO_DB_URI)
     console.log('connected to mongodb')
    }
    catch(err){
        console.log(err)
    }
}

export default connectedToMongoDb