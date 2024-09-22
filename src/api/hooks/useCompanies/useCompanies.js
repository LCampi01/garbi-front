import {
  useGetCompanies 
} from './request';
  
export const useCompanies = () => {
  const {
    getCompanies,
    isLoading: isLoadingGetCompanies
  } = useGetCompanies();
  
  return {
    getCompanies: {
      getCompanies,
      isLoadingGetCompanies
    },
  };
};
  