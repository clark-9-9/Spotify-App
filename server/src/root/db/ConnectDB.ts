import mongoose from "mongoose";

function ConnectDB(url: string) {
    mongoose.connect(url)
        .then(() => {
            console.log("Connected to MongoDB");
        }).catch((err) => {
            // console.log("Error connecting to MongoDB");
            console.log(err);
        })  
}
 
export default ConnectDB; 