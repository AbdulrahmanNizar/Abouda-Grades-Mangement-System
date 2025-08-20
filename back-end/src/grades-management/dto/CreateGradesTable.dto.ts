export class CreateGradesTableDto {
  readonly userId: string;
  readonly userGradesTableYear: string;
  readonly userGradesTableTrimester: string;
  readonly userGradesTable: userGradesTableInterface[];
}

interface userGradesTableInterface {
  subject: string;
  grade: number;
}
