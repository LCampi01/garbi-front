
import {
  useFetch 
} from '../../../hooks/useFetch';
import {
  baseIntegrationUri 
} from '../../config/apiClient';
import {
  HTTPMethods 
} from '../../config/HTTPMethods';

const baseIntegrationOptimalRoutes = baseIntegrationUri + '/route/generate_routes'

export const useGetOptimalRoutes = () => {
  const {
    isLoading, commonFetch
  } = useFetch({
    baseUri: baseIntegrationOptimalRoutes
  })

  const getOptimalRoutes = (areaId) => {
    return commonFetch({
      method: HTTPMethods.POST,
      body: {
        areaId
      }
    })
  }

  return {
    isLoading,
    getOptimalRoutes
  }
}

