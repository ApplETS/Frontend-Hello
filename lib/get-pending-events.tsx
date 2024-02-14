import { fetchWithSession, Method } from "@/lib/fetch-with-refresh";
  
  // Assuming 'fetchWithSession' and 'Method' are defined elsewhere in your code
  export async function getPendingEvents(): Promise<Event[]> {
    const response = await fetchWithSession(`moderator/events?PageNumber=1&PageSize=50&state=31`, Method.GET);
  
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
  
    const responseData: EventPaginatedResponse = await response.json();
  
    // Check for errors in response
    if (responseData.error) {
      throw new Error('Error in response data');
    }
  
    return responseData.data;
  }
  