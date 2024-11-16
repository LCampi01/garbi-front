import {
  useGetNewestNotifications,
  useGetNotifications, useUpdateNotification,
  useUpdateNotifications, 
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

  const {
    getNewestNotifications,
    isLoading: isLoadingGetNewestNotifications
  } = useGetNewestNotifications();
  
  const {
    updateNotifications,
    isLoading: isLoadingUpdateNotis
  } = useUpdateNotifications();

  return {
    getNotifications: {
      getNotifications,
      isLoadingGetNotifications
    },
    updateNotification: {
      updateNotification,
      isLoadingUpdateNotifications
    },
    getNewestNotifications: {
      getNewestNotifications,
      isLoadingGetNewestNotifications
    },
    updateNotifications: {
      updateNotifications,
      isLoadingUpdateNotis
    }
  }
}