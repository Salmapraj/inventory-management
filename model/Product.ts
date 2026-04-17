import mongoose from 'mongoose'

const ProductSchema= new mongoose.Schema({
      name:{
        type:String,
        required:true
      },
      price:{
        type: Number,
        required:true
      },
      productId:{
        type:String,
        required:true
      },
      quantity:{
        type:Number,
        default:0
      },
      lowStock:{
        type:Number
      },
      category: {
  type: String,
  required: true
},

image:{
  type:String,
  default:null
},

      userId:{
type :String,
required:true
      }
      
    },
    { timestamps: true },


)

ProductSchema.index({userId:1, name:1})
ProductSchema.index({createdAt:1})
export const Products  =mongoose.models.Products|| mongoose.model("Products",ProductSchema)