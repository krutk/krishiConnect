import mongoose from "mongoose";
const dbConnect = () => {
    if(mongoose.connections[0].readyState){
        console.log("already connected");
        return
    }
  mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser:true
  })
  mongoose.connection.on('connected',()=>{
      console.log("connected to mongodb");
  })
  mongoose.connection.on('error',(err)=>{
    console.log("not able to connect to mongodb",err);
})
}
export default dbConnect
//tB6iN0mMm874GRCJ