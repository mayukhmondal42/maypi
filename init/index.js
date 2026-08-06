const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const { init } = require("../models/user.js");

const MONGO_URL = "mongodb://localhost:27017/wonderlust";

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
  
async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data.map((obj) => ({ ...obj, owner: "6a70584634795700be3ec805"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();