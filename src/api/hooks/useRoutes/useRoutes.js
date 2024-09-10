import {
  useGetRoutes,
  useSelectOptimalRoutes
} from './request';

export const useRoutes = () => {
  const {
    getRoutes, isLoadingGetRoutes
  } = useGetRoutes();

  const {
    isLoading: isLoadingSelectRoute,
    selectOptimalRoute
  } = useSelectOptimalRoutes()

  return {
    getRoutes: {
      getRoutes,
      isLoadingGetRoutes,
    },
    selectOptimalRoute: {
      isLoadingSelectRoute,
      selectOptimalRoute
    }
  };
};
