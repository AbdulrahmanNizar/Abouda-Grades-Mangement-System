import * as mongoose from 'mongoose';

export const gradesTablesManagementSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userSubjects: { type: Object, required: true },
    userGradesTableYear: { type: String, required: true },
    userGradesTableTrim: { type: String, required: true },
    userGradesTable: { type: Object, required: true },
    userGradesAverage: { type: Number, required: true },
  },
  { timestamps: true },
);

export interface gradesTables {
  userId: string;
  userSubjects: string[];
  userGradesTableYear: string;
  userGradesTableTrim: string;
  userGradesTable: number[];
  userGradesAverage: number;
}
