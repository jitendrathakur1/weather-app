
/**
 * Custom request options that extend the standard RequestInit.
 */
export type RequestCustom = RequestInit & {
  url: string
  headers?: Headers
}

/**
 * Executes a custom HTTP request with enhanced options.
 * @param options - Custom request options.
 * @returns A Promise containing the response data or an error.
 */
export async function executeRequest<T>({
  url,
  method = 'GET',
  headers = new Headers(),
  body = null,
}: RequestCustom): Promise<T | string | undefined> {
  // Perform the fetch operation with the provided options
  const response = await fetch(url, {
    method,
    body,
    headers
  })

  // Check if the response indicates an error (non-2xx status code)
  if (!response.ok) {
    throw response
  }

  try {
    // Check for a 'No Content' response (status code 204)
    if (response.status === 204) {
        return
      }

      // Extract the 'Content-Type' header from the response
      const contentType = response.headers.get('Content-Type')

      // Check if the response is in JSON format
      if (contentType && contentType.includes('application/json')) {
        return response.json()
      }

      // If not JSON, return the response as text
      return response.text()
  } catch (error) {
    // If an error occurs during processing, propagate the error
    throw error;
  }
}
