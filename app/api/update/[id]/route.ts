import { connectDB } from "@/lib/db";
import { Products } from "@/model/Product";
import { NextResponse } from "next/server";

export async function PUT(req:Request, {params}:{params:Promise<{id:string}>}){
try{
const formData =await req.json();

const {id}= await params;
    console.log("formdata is", formData);
    await connectDB();
    await Products.findByIdAndUpdate({_id: id}, formData)

    return NextResponse.json({message:"product update sucessful"})
}catch(err){
console.log(err)
return NextResponse.json({error:"Failed toupdate"}
    , {status:500}
)
}
}