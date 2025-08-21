import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    logged: { type: Boolean, required: true },
    userSubjects: { type: Object, required: true },
    userAccountPicture: { type: String, required: false },
  },
  { timestamps: true },
);

export interface User {
  username: string;
  email: string;
  password: string;
  logged: boolean;
  userSubjects: string[];
  userAccountPicture: string;
}
