import { Prop, Schema } from '@nestjs/mongoose';
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