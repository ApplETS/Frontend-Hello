interface EventPaginatedResponse {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    data: Event[];
    error: any; // Replace 'any' with a more specific error type if possible
  }