import {
  useGetNotifications, useUpdateNotification, 
} from './request'

export const useNotifications = () => {

  const {
    getNotifications,
    isLoading: isLoadingGetNotifications
  } = useGetNotifications();

  const {
    updateNotification,
    isLoading: isLoadingUpdateNotifications
  } = useUpdateNotification();
  

  return {
    getNotifications: {
      
      getNotifications,
      isLoadingGetNotifications
    },
    updateNotification: {
      updateNotification,
      isLoadingUpdateNotifications
    }
  }
}