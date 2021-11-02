export class PaginatedResourceResultDto<T> {
  data: T[];
  page: number;
  limit: number;
  totalCount: number;
}
