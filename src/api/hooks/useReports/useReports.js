import {
  useCreateReport, 
  useFetchReports
} from './request';

export const useReports = () => {
   
  const {
    createReport, 
    isLoading: isCreateReportLoading 
  } = useCreateReport();

  const {
    fetchReports,
    isLoading: isLoadingFetchReports
  } = useFetchReports();
  
  return {
    createReport: {
      createReport,
      isCreateReportLoading,
    },
    fetchReports: {
      fetchReports,
      isLoadingFetchReports
    }
  };
};
  