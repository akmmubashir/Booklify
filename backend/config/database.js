const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        const connect = await mongoose.connect(
            "mongodb+srv://mubashir:131918@cluster0.rdjsi8h.mongodb.net/?retryWrites=true&w=majority", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        console.log("Database connected");
    } catch (error) {
        console.log(`Error :${error}`);
        process.exit();
    }
};

module.exports = connectDB;