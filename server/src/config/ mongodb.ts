// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI!, {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     //   useCreateIndex: true,
//     //   useFindAndModify: false,
//     });
//     console.log('MongoDB connected');
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error(error.message);
//     } else {
//       console.error('An unknown error occurred');
//     }
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {});
    console.log('MongoDB connected');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
};

export default connectDB;
