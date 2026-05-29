/* eslint-disable prettier/prettier */
import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User extends Document{
    @Prop({ required: true })
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({default: 'student', enum: ['student','project_lead','faculty_guide']})
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save',async function (next){
    const user = this;
    if(!user.isModified('password')){
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password,salt);

    user.password = hash;


});