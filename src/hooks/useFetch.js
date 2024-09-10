import {
  useState 
} from 'react';
import apiClient from '../api/config/apiClient';

const defaultHeaders = {
  'Content-Type': 'application/json',
}

export function useFetch({
  baseUri 
}) {
  const [isLoading, setIsLoading] = useState(false);

  const commonFetch = async ({
    uri = '', 
    body,
    method,
    headers = defaultHeaders
  }) => {
    setIsLoading(true);

    try {
      const response = await apiClient.request({
        url: baseUri + uri,
        data: body,
        method,
        headers,
      });

      return response.data;
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    commonFetch,
  };
}
