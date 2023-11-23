const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: ObjectId
    },
    name: {
        type: String
    },
    email: {
        type: String,unique:true,require:true
    },
    password: {
        type: String, require : true
    },
    role:{
        type:Number,default:1,
    },
        //1:user, 100: admin, 1000:system
});
module.exports = mongoose.models.user || mongoose.model('user', schema);
// category -----> categories