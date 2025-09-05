import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    accountPicture: { type: String, required: false },
    logged: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export interface User {
  username: string;
  email: string;
  password: string;
  accountPicture: string;
  logged: boolean;
}
