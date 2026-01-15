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
    link : {type : string , required : true},
    category : {
        type : string,
        reuired : true,
        enum : ["Frontend" , "Backend" , "DevOps" , "Database"]
    },
    tags : string,
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    votes : [{types : mongoose.Schema.Types.ObjectId, ref : 'User'}]
},{timestamps : true})

const resourceModel = mongoose.model('Resource',resourceSchema)

export default resourceModel