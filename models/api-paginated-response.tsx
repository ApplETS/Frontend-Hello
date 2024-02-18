import { HelloEvent } from "./hello-event";

export interface ApiPaginatedResponse {
	pageNumber: number;
	pageSize: number;
	totalPages: number;
	totalRecords: number;
	data: HelloEvent[];
	error: any; // Replace 'any' with a more specific error type if possible
}
