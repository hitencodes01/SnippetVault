import mongoose from 'mongoose'

const resourceSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true
    },
    link : {type : String , required : true},
    category : {
        type : String,
        reuired : true,
        enum : ["Frontend" , "Backend" , "DevOps" , "Database"]
    },
    tags : String,
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    votes : [{type : mongoose.Schema.Types.ObjectId, ref : 'User'}]
},{timestamps : true})

const resourceModel = mongoose.model('Resource',resourceSchema)

export default resourceModel