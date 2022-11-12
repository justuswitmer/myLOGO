import mongoose from 'mongoose';

export default async () => {
  const mongoDB = process.env.MONGO_DB;
  const user = process.env.MONGO_USER;
  const pass = process.env.MONGO_PASS;
  const uri = `mongodb+srv://${user}:${pass}@${mongoDB}`;

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
    () => {
      console.log("MONGODB is connected!!");
    });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Mongodb connection error:'));
};