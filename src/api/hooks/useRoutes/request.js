import {
  LIMIT_DEFAULT 
} from '../../../config';
import {
  useFetch 
} from '../../../hooks/useFetch';
import {
  baseIntegrationUri 
} from '../../config/apiClient';
import {
  HTTPMethods 
} from '../../config/HTTPMethods';
import QueryBuilder from '../../queryBuilder/QueryBuilder';

const baseIntegrationRoute = baseIntegrationUri + '/route'

export const useFetchRoutes = () => {
  const {
    commonFetch, isLoading 
  } = useFetch({
    baseUri: baseIntegrationRoute,
  });

  const fetchRoutes = (lastKey = null, queryParamsFilter, limit = LIMIT_DEFAULT) => {
    const queryBuilder = new QueryBuilder()

    queryBuilder
      .addParam('lastKey', lastKey)
      .addParam('limit', limit)

    queryParamsFilter.forEach(element => {
      queryBuilder.addParam(element.key, element.value)
    });

    const uri = queryBuilder.build();

    console.log('🚀 ~ fetchReports ~ uri:', uri)

    return commonFetch({
      uri,
      method: HTTPMethods.GET,
      timeout: 10000
    })
  }

  return {
    fetchRoutes,
    isLoading
  }
}

export const useFetchRoute = () => {
  const {
    commonFetch, isLoading 
  } = useFetch({
    baseUri: baseIntegrationRoute,
  });

  const fetchRoute = (routeId) => {
    return commonFetch({
      uri: '/' + routeId,
      method: HTTPMethods.GET,
    })
  }

  return {
    fetchRoute,
    isLoading
  }
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

export const useFetchCollectors = () => {
  const {
    isLoading,
    commonFetch
  } = useFetch({
    baseUri: baseIntegrationRoute
  })

  const fetchCollectors = () => {
    return commonFetch({
      uri: '/collectors',
      method: HTTPMethods.GET,
    })
  }

  return {
    isLoading,
    fetchCollectors
  }
}