import { connect } from "mongoose";

const dbConnect = async () =>
  await connect(process.env.MONGO_URI!)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

export default dbConnect;
