const mongoose=require("mongoose")

const paymentSchema=new mongoose.Schema(
    {
        orderId:{
            type:mongoose.Schema.ObjectId,
            ref:"Order"
        },
        status:{
            type:String,
            enum:['success','field'],
            required:true
         },
         totalPrice:Number
    }
    ,{timestamps:true}
)

module.exports=mongoose.model('Payment',paymentSchema)