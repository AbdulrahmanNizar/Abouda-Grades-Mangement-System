export class UpdateUserGradesTableDto {
  readonly tableId: string;
  readonly userId: string;
  readonly newGradesTableYear: string;
  readonly newGradesTableTrimester: string;
  readonly newGradesTable: userGradesTableInterface[];
}

interface userGradesTableInterface {
  subject: string;
  grade: number;
}
