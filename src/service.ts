import mongoose = require("mongoose");

const uri: string = process.env.MONGODB_URL || "mongodb://localhost/noobjs_dev";

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully Connected!");
  }
});

export default mongoose;
