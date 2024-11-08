import mongoose from "mongoose"

const connectDb = async () => {
    
    await mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://ritikdb:qwertyuiop24@ritikdb.5tut5.mongodb.net/' ).then(() => {
        console.log("Database Connected");
    }).catch(error => {
        console.log(error);
    })
}
export default connectDb;
