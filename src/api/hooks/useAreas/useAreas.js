import {
  useGetAreas 
} from './request'


export const useAreas = () => {
  const {
    getAreas,
    isLoading: isLoadingGetAreas
  } = useGetAreas()

  return {
    getAreas: {
      getAreas,
      isLoadingGetAreas
    }
  }
}
