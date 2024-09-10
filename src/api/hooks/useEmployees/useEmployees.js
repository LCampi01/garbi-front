import {
  useCreateEmployee ,
  useFetchEmployees
} from './request';

export const useEmployees = () => {

  const {
    createEmployee, 
    isLoading: isCreateEmployeeLoading 
  } = useCreateEmployee();

  const {
    fetchEmployees,
    isLoading: isLoadingFetchEmployees
  } = useFetchEmployees();

  return {
    createEmployee: {
      createEmployee,
      isCreateEmployeeLoading,
    },
    fetchEmployees: {
      fetchEmployees,
      isLoadingFetchEmployees
    }
  };
};
