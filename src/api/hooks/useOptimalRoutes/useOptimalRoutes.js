import {
  useGetOptimalRoutes
} from './request'

export const useOptimalRoutes = () => {
  const {
    isLoading: isLoadingGetOptimalRoutes,
    getOptimalRoutes
  } = useGetOptimalRoutes()

  return {
    getOptimalRoutes: {
      isLoadingGetOptimalRoutes,
      getOptimalRoutes
    }
  }
}