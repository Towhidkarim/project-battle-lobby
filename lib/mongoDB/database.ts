import { connect } from 'mongoose';

export const connectMongoDB = async () => {
  const URI = process.env.MONGO_URI;
  try {
    await connect(URI);
  } catch (error) {
    console.log(error);
  }
};
export default connectMongoDB;
