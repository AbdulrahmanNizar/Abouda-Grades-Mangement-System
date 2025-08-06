import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    logged: { type: Boolean, required: true },
    userSubjects: { type: Object, required: true },
  },
  { timestamps: true },
);

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  logged: boolean;
  userSubjects: string[];
}
