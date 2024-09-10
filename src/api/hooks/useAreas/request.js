import {
  useFetch 
} from '../../../hooks/useFetch';
import {
  baseIntegrationUri 
} from '../../config/apiClient';
import {
  HTTPMethods 
} from '../../config/HTTPMethods';

const baseAreaUri = baseIntegrationUri + '/area'

export const useGetAreas = () => {

  const {
    commonFetch,
    isLoading
  } = useFetch({
    baseUri: baseAreaUri
  })


  const getAreas = () => {
    return commonFetch({
      method: HTTPMethods.GET,
    })
  }

  return {
    getAreas,
    isLoading
  }
}
