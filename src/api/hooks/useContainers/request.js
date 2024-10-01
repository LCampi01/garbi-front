import {
  LIMIT_DEFAULT
} from '../../../config';
import {
  useFetch
} from '../../../hooks/useFetch';
import {
  baseIntegrationUri
} from '../../config/apiClient';
import QueryBuilder from '../../queryBuilder/QueryBuilder';

const baseContainerUri = baseIntegrationUri + '/container'

export const useGetContainers = () => {
  const {
    isLoading, commonFetch
  } = useFetch({
    baseUri: baseContainerUri,
  });

  const getContainers = (lastKey = null, queryParamsFilter, limit = LIMIT_DEFAULT) => {
    const queryBuilder = new QueryBuilder()

    queryBuilder
      .addParam('lastKey', lastKey)
      .addParam('limit', limit)

    queryParamsFilter.forEach(element => {
      queryBuilder.addParam(element.key, element.value)
    });

    const uri = queryBuilder.build();

    return commonFetch({
      uri,
      method: 'GET',
    });
  };

  return {
    getContainers,
    isLoadingGetContainers: isLoading,
  };
};

export const useGetAllContainers = () => {
  const {
    isLoading, commonFetch
  } = useFetch({
    baseUri: baseContainerUri,
  });

  const getAllContainers = () => {

    return commonFetch({
      uri: '/all',
      method: 'GET',
    });
  };

  return {
    getAllContainers,
    isLoadingGetAllContainers: isLoading,
  };
};
