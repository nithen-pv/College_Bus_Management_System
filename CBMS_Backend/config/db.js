require("dotenv").config();
const mongoose = require('mongoose');
const url = `mongodb+srv://admin:${process.env.MONGO_KEY}@collegebuscluster.ugxm6.mongodb.net/CollegeBus?retryWrites=true&w=majority`

const connectDB = async () => {

    try {

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false
        });


        console.log('Mongoose DB connected');


    } catch (error) {

        console.log(error.message);

    }
}

module.exports = connectDB;
