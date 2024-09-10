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

const baseReportUri = baseIntegrationUri + '/report'

export const useCreateReport = () => {
  const {
    commonFetch, isLoading
  } = useFetch({
    url: baseReportUri,
  });

  const createReport = (report) => {
    return commonFetch({
      uri: '/report',
      method: 'POST',
      body: report,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    
    );
  };

  return {
    createReport,
    isLoading,
  };
};

export const useFetchReports = () => {
  const {
    commonFetch, isLoading
  } = useFetch({
    baseUri: baseReportUri,
  });

  const fetchReports = (lastKey = null) => {
    const queryBuilder = new QueryBuilder()

    const uri = queryBuilder
      .addParam('lastKey', lastKey)
      .build()

    return commonFetch({
      uri,
      method: HTTPMethods.GET
    })
  }

  return {
    fetchReports,
    isLoading
  }
}