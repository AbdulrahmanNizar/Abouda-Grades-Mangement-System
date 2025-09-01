import * as mongoose from 'mongoose';

export const changePasswordLinkSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    link: { type: String, required: true },
    valid: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export interface changePasswordLinks {
  link: string;
  valid: boolean;
}
