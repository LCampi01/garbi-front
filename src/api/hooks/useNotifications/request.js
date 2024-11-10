
import {
  baseIntegrationUri 
} from '../../config/apiClient'
import {
  useFetch 
} from '../../../hooks/useFetch'
import QueryBuilder from '../../queryBuilder/QueryBuilder'
import {
  HTTPMethods 
} from '../../config/HTTPMethods'

const baseNotificationsUri = baseIntegrationUri + '/notifications'

export const useGetNotifications = () => {
  const {
    commonFetch, isLoading
  } = useFetch({
    baseUri: baseNotificationsUri
  })

  const getNotifications = (limit = 10, newNotificationsParam = true) => {
    const queryBuilder = new QueryBuilder()

    const uri = queryBuilder
      .addParam('limit', limit)
      .addParam('newNotifications', newNotificationsParam)
      .build();

    return commonFetch({
      uri,
      method: HTTPMethods.GET
    })
  }

  return {
    isLoading,
    getNotifications
  }
}

export const useUpdateNotification = () => {
  const {
    commonFetch, isLoading
  } = useFetch({
    baseUri: baseNotificationsUri
  })

  const updateNotification = (notificationId, wasRead) => {

    return commonFetch({
      body: {
        read: wasRead,
        ids: [notificationId]
      },
      methd: HTTPMethods.PUT
    })
  }

  return {
    isLoading,
    updateNotification
  }
}