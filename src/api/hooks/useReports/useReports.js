import {
  useCreateReport, 
  useFetchReports,
  useReviewReport,
  useCloseReport,
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

  const {
    reviewReport, 
    isLoading: isReviewReportLoading 
  } = useReviewReport();

  const {
    closeReport, 
    isLoading: isCloseReportLoading 
  } = useCloseReport();
  
  return {
    createReport: {
      createReport,
      isCreateReportLoading,
    },
    fetchReports: {
      fetchReports,
      isLoadingFetchReports
    },
    reviewReport: {
      reviewReport,
      isReviewReportLoading,
    },
    closeReport: {
      closeReport,
      isCloseReportLoading,
    },
  };
};
  