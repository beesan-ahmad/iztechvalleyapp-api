import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Task {
    @Prop({ unique: true })
    id: number;

    @Prop({ length: 40 })
    title: string;

    @Prop({ length: 80 })
    description: string;

    @Prop({ length: 20 })
    status: string;
}
export const TaskSchema = SchemaFactory.createForClass(Task);