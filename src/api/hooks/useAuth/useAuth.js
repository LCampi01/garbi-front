import {
  useChangePassword, useLogin
} from './request';

export const useAuth = () => {
  const {
    login, isLoading: isLoginLoading
  } = useLogin();

  const {
    changePassword, isLoading: isChangePasswordLoading
  } = useChangePassword();

  return {
    login: {
      login,
      isLoginLoading,
    },
    changePassword: {
      changePassword,
      isChangePasswordLoading,
    }
  };
};
