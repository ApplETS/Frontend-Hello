export interface ApiPaginatedResponse<T> {
	pageNumber: number;
	pageSize: number;
	totalPages: number;
	totalRecords: number;
	data: T[];
	error: any;
}
