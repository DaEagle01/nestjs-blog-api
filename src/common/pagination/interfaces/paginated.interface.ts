export interface Paginated<T> {
  meta: {
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    last: string;
    current: string;
    prev: string;
    next: string;
  };
  data: T[];
}
