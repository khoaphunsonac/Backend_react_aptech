import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    collection: 'account',
    versionKey: false
})
export class Account extends Document {

    @Prop({
        type: String,
        unique: true
    })
    username: string;

    @Prop({
        type: String
    })
    password: string;

    @Prop({
        type: String
    })
    fullName: string;

}

export const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        ret.id = ret._id; // Copy `_id` to `id`
        delete ret._id;   // Remove `_id`
        delete ret.__v;   // Remove `__v`
    },
});

AccountSchema.set('toObject', {
    virtuals: true,
    transform: (doc, ret) => {
        ret._id = ret.id;
    },
});