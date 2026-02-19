
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({

    name: {type : String, required : true, },
    image_uri : {type : String, required : true},
    products : [{type : mongoose.Schema.Types.ObjectId, ref : "Product"}],
    createdAt : {type :Date, default: Date.now},
    updatedAt : {type : Date, default: Date.now},
});

const Category = mongoose.model("Category", CategorySchema);
export default Category; 