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

  const fetchReports = (lastKey = null, limit = LIMIT_DEFAULT) => {
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
    fetchReports,
    isLoading
  }
};

export const useReviewReport = () => {
  const {
    commonFetch, isLoading
  } = useFetch({
    baseUri: baseReportUri,
  });

  const reviewReport = (reportId, reviewReportBody) => {
    return commonFetch({
      uri: '/review/' + reportId,
      method: HTTPMethods.PUT,
      body: reviewReportBody
    })
  }

  return {
    reviewReport,
    isLoading
  }
};

export const useCloseReport = () => {
  const {
    commonFetch, isLoading
  } = useFetch({
    baseUri: baseReportUri,
  });

  const closeReport = (reportId, closeReportBody) => {
    return commonFetch({
      uri: '/close/' + reportId,
      method: HTTPMethods.PUT,
      body: closeReportBody
    })
  }

  return {
    closeReport,
    isLoading
  }
};