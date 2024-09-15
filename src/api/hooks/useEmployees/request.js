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

const baseEmployeesUri = baseIntegrationUri + '/user'

export const useCreateEmployee = () => {
  const {
    commonFetch, isLoading
  } = useFetch({
    baseUri: baseEmployeesUri,
  });

  const createEmployee = ({
    companyId, name, surname, personalPhone, personalEmail, companyPhone, companyEmail, workingShift, role 
  }) => {
    return commonFetch({
      method: HTTPMethods.POST,
      body: {
        companyId,
        name, 
        surname, 
        personalPhone, 
        personalEmail, 
        companyPhone,
        companyEmail,
        workingShift,
        role
      },
    });
  };

  return {
    createEmployee,
    isLoading,
  };
};

export const useFetchEmployees = () => {
  const {
    commonFetch, isLoading 
  } = useFetch({
    baseUri: baseEmployeesUri,
  });

  const fetchEmployees = (lastKey = null) => {
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
    fetchEmployees,
    isLoading
  }
}

export const useModifyEmployee = () => {
  const {
    commonFetch, isLoading
  } = useFetch({
    baseUri: baseEmployeesUri,
  });

  const modifyEmployee = ({
    userId, companyId, name, surname, personalPhone, personalEmail, companyPhone, companyEmail, workingShift, role, termsAndConditions
  }) => {
    return commonFetch({
      uri: '/' + userId,
      method: HTTPMethods.PUT,
      body: {
        companyId,
        name, 
        surname, 
        personalPhone, 
        personalEmail, 
        companyPhone,
        companyEmail,
        workingShift,
        role,
        termsAndConditions
      },
    });
  };

  return {
    modifyEmployee,
    isLoading,
  };
};