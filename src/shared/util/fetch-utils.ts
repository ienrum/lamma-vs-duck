export const customFetch = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error(`FetchError: ${error}`);
    throw error;
  }
};

/**
 * JSON 데이터를 가져오는 유틸리티
 * 응답을 자동으로 JSON으로 파싱합니다.
 */
export const customFetchJson = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await customFetch(url, options);
  return await response.json() as T;
}; 