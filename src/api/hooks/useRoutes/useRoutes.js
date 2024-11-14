import {
  useFetchRoutes,
  useFetchRoute,
  useSelectOptimalRoutes,
  useFetchCollectors
} from './request';

export const useRoutes = () => {
  const {
    fetchRoutes,
    isLoading: isLoadingFetchRoutes
  } = useFetchRoutes();

  const {
    fetchRoute,
    isLoading: isLoadingFetchRoute
  } = useFetchRoute();

  const {
    isLoading: isLoadingSelectRoute,
    selectOptimalRoute
  } = useSelectOptimalRoutes()

  const {
    isLoading: isLoadingFetchCollectors,
    fetchCollectors
  } = useFetchCollectors()

  return {
    fetchRoutes: {
      fetchRoutes,
      isLoadingFetchRoutes
    },
    fetchRoute: {
      fetchRoute,
      isLoadingFetchRoute
    },
    selectOptimalRoute: {
      isLoadingSelectRoute,
      selectOptimalRoute
    },
    fetchCollectors: {
      isLoadingFetchCollectors,
      fetchCollectors
    }
  };
};
