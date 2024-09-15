import {
  useFetch 
} from '../../../hooks/useFetch';
import {
  baseIntegrationUri 
} from '../../config/apiClient';

const baseContainerUri = baseIntegrationUri + '/container'

export const useGetContainers = () => {
  const {
    isLoading, commonFetch 
  } = useFetch({
    baseUri: baseContainerUri,
  });

  const getContainers = () => {
    return commonFetch({
      method: 'GET',
    });
  };

  return {
    getContainers,
    isLoadingGetContainers: isLoading,
  };
};
