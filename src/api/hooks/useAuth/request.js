import {
  useFetch 
} from '../../../hooks/useFetch';
import {
  baseIntegrationUri 
} from '../../config/apiClient';

const baseAuthUri = baseIntegrationUri + '/user'

export const useLogin = () => {
  const {
    commonFetch, isLoading 
  } = useFetch({
    baseUri: baseAuthUri,
  });

  const login = ({
    personalEmail, password 
  }) => {
    return commonFetch({
      uri: '/authenticate',
      method: 'POST',
      body: {
        personalEmail,
        password,
      },
    });
  };

  return {
    login,
    isLoading,
  };
};


export const useChangePassword = () => {
  const {
    commonFetch, isLoading
  } = useFetch({
    baseUri: baseAuthUri,
  });

  const changePassword = ({
    email, password, newPassword 
  }) => {
    return commonFetch({
      uri: '/change_password',
      method: 'PUT',
      body: {
        email,
        newPassword,
        password,
      },
    });
  };

  return {
    changePassword,
    isLoading,
  };
};
