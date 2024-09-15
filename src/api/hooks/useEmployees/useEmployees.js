import {
  useCreateEmployee,
  useFetchEmployees,
  useModifyEmployee
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

  const {
    modifyEmployee, 
    isLoading: isModifyEmployeeLoading 
  } = useModifyEmployee();

  return {
    createEmployee: {
      createEmployee,
      isCreateEmployeeLoading,
    },
    fetchEmployees: {
      fetchEmployees,
      isLoadingFetchEmployees
    },
    modifyEmployee: {
      modifyEmployee,
      isModifyEmployeeLoading,
    },
  };
};
