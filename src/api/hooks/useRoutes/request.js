import {
  useFetch 
} from '../../../hooks/useFetch';
import {
  baseIntegrationUri 
} from '../../config/apiClient';
import {
  HTTPMethods 
} from '../../config/HTTPMethods';

const baseIntegrationRoute = baseIntegrationUri + '/route'

export const useGetRoutes = () => {
  const {
    isLoading, commonFetch 
  } = useFetch({
    url: '/api/route',
  });

  const getRoutes = () => {
    return commonFetch({
      method: 'GET',
    });
  };

  return {
    getRoutes,
    isLoadingGetRoutes: isLoading,
  };
};

export const useSelectOptimalRoutes = () => {
  const {
    isLoading,
    commonFetch
  } = useFetch({
    baseUri: baseIntegrationRoute
  })

  const selectOptimalRoute = (optimalRouteId) => {
    return commonFetch({
      method: HTTPMethods.POST,
      body: {
        optimalRouteId
      }
    })
  }

  return {
    isLoading,
    selectOptimalRoute
  }
}