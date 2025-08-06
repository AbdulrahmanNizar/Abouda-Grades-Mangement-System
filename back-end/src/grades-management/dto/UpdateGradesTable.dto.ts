export class UpdateUserGradesTableDto {
  readonly tableId: string;
  readonly userId: string;
  readonly newUserGradesTableYear: string;
  readonly newUserGradesTableTrim: string;
  readonly newUserGradesTable: number[];
}
