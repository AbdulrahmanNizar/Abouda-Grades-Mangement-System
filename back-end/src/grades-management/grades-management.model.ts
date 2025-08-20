import * as mongoose from 'mongoose';

export const gradesTablesManagementSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userGradesTableYear: { type: String, required: true },
    userGradesTableTrimester: { type: String, required: true },
    userGradesTable: { type: Object, required: true },
    userGradesAverage: { type: Number, required: true },
  },
  { timestamps: true },
);

export interface gradesTables {
  userId: string;
  userGradesTableYear: string;
  userGradesTableTrimester: string;
  userGradesTable: number[];
  userGradesAverage: number;
}
