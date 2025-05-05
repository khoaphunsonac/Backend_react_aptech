import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    collection: 'product',
    versionKey: false
})
export class Product extends Document {

    @Prop({
        type: String,
        unique: true
    })
    name: string;

    @Prop({
        type: Number
    })
    price: number;

    @Prop({
        type: Number
    })
    quantity: number;

    @Prop({
        type: Boolean
    })
    status: boolean;

}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        ret.id = ret._id; // Copy `_id` to `id`
        delete ret._id;   // Remove `_id`
        delete ret.__v;   // Remove `__v`
    },
});

ProductSchema.set('toObject', {
    virtuals: true,
    transform: (doc, ret) => {
        ret._id = ret.id; 
    },
});