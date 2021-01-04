import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('DB Online');
  } catch (err) {
    console.log(err);
    throw new Error('Error al iniciar la base de datos');
  }
}

export default dbConnection;