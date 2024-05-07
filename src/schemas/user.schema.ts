import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop({unique: true})
    id : number;

    @Prop({ unique: true })
    identification_number: number;

    @Prop({ length: 6 })
    gender: string;

    @Prop({ length: 50 })
    email: string;

    @Prop({ length: 20 })
    first_name: string;

    @Prop({ length: 20 })
    last_name: string

    @Prop({ length: 255 })
    profile_picture: string;

}

export const UserSchema = SchemaFactory.createForClass(User);