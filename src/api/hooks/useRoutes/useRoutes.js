import {
  useFetchRoutes,
  useSelectOptimalRoutes
} from './request';

export const useRoutes = () => {
  const {
    fetchRoutes,
    isLoading: isLoadingFetchRoutes
  } = useFetchRoutes();

  const {
    isLoading: isLoadingSelectRoute,
    selectOptimalRoute
  } = useSelectOptimalRoutes()

  return {
    fetchRoutes: {
      fetchRoutes,
      isLoadingFetchRoutes
    },
    selectOptimalRoute: {
      isLoadingSelectRoute,
      selectOptimalRoute
    }
  };
};
