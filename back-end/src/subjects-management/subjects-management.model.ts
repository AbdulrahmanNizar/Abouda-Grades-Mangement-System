import * as mongoose from 'mongoose';

export const subjectsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    subjects: { type: Object, required: true },
  },
  { timestamps: true },
);

export interface Subjects {
  userId: string;
  subjects: string[];
}
