import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { QuestionDTO } from '../interfaces/QuestionDTO';

@Schema()
export class Question implements QuestionDTO {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  correctAnswer: string;

  @Prop({ required: true })
  incorrectAnswers: string[];

  @Prop({ required: true })
  category: string;
}

export type QuestionDocument = HydratedDocument<Question>;

export const QuestionSchema: mongoose.Schema<Question> = SchemaFactory
  .createForClass(Question)
  .set('versionKey', false);
