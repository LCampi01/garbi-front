import {
  useFetch
} from '../../../hooks/useFetch';
import {
  baseIntegrationUri
} from '../../config/apiClient';
import QueryBuilder from '../../queryBuilder/QueryBuilder';

import {
  LIMIT_DEFAULT
} from '../../../config';

import {
  HTTPMethods 
} from '../../config/HTTPMethods';

const baseCompaniesUri = baseIntegrationUri + '/company'



export const useGetCompanies = () => {
  const {
    commonFetch, isLoading
  } = useFetch({
    baseUri: baseCompaniesUri,
  });

  const getCompanies = (lastKey = null, limit = LIMIT_DEFAULT) => {
    const queryBuilder = new QueryBuilder()

    const uri = queryBuilder
      .addParam('lastKey', lastKey)
      .addParam('limit', limit)
      .build()

    return commonFetch({
      uri,
      method: HTTPMethods.GET
    })
  }


  return {
    getCompanies,
    isLoadingGetCompanies: isLoading,
  };
};
