import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear all data from DB
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(users);

    // Get admin user
    const adminUser = createdUsers[0]._id;

    // Insert products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // Exit with failure
  }
}

const destroyData = async () => {
  try {
    // Clear all data from DB
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // Exit with failure
  }
}

// Check if we are importing or destroying data
// NOTE: process.argv[2] is the 3rd argument in the command line SEE NOTES BELOW
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

// //Get the command line arguments
// console.log(process.argv); // run this file with all other code commented out

// //Response
// $ node backend/seeder.js -d -hi
// [
//   '/home/.../.nvm/versions/node/v20.5.0/bin/node',
//   '/home/.../ugadgetz-ecommerce/backend/seeder.js',
//   '-d',
//   '-hi'
// ]

// //To target a specific argument above
// console.log(process.argv[3]); // run this file with all other code commented out

// //response
// $ node backend/seeder.js -d -hi
// -hi


