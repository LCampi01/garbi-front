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

const baseReportsUri = baseIntegrationUri + '/report'

export const useCreateReport = () => {
  const {
    commonFetch, isLoading
  } = useFetch({
    baseUri: baseReportsUri,
  });

  const createReport = ({
    userId, containerId, title, description, address, phone, email, type, image
  }) => {
    return commonFetch({
      method: HTTPMethods.POST,
      body: {
        userId,
        containerId,
        title,
        description,
        address,
        phone,
        email,
        type,
        image
      },
    });
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
    baseUri: baseReportsUri,
  });

  const fetchReports = (lastKey = null, queryParamsFilter, limit = LIMIT_DEFAULT) => {
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
    baseUri: baseReportsUri,
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
    baseUri: baseReportsUri,
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