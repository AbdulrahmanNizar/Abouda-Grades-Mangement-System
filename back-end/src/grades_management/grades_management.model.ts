import * as mongoose from 'mongoose';

export const usersGradesManagementSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userGradesYear: { type: String, required: true },
    userGradesTrim: { type: String, required: true },
    userGradesTable: { type: Object, required: true },
    userGradesAverage: { type: Number, required: true },
  },
  { timestamps: true },
);

export interface UsersGrades {
  userId: string;
  userGradesYear: string;
  userGradesTrim: string;
  userGradesTable: object[];
  userGradesAverage: number;
}
