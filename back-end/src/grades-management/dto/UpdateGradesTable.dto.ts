export class UpdateUserGradesTableDto {
  readonly tableId: string;
  readonly userId: string;
  readonly newUserGradesTableYear: string;
  readonly newuserGradesTableTrimester: string;
  readonly newUserGradesTable: number[];
}
