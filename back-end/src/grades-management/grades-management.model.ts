import * as mongoose from 'mongoose';

export const gradesTablesManagementSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userSubjects: { type: Object, required: true },
    userGradesYear: { type: String, required: true },
    userGradesTrim: { type: String, required: true },
    userGradesTable: { type: Object, required: true },
    userGradesAverage: { type: Number, required: true },
  },
  { timestamps: true },
);

export interface gradesTables {
  userId: string;
  userSubjects: object[];
  userGradesYear: string;
  userGradesTrim: string;
  userGradesTable: object[];
  userGradesAverage: number;
}
