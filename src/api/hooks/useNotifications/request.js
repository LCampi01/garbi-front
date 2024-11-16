
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
import {
  LIMIT_DEFAULT 
} from '../../../config'

const baseNotificationsUri = baseIntegrationUri + '/notifications'

export const useGetNotifications = () => {
  const {
    commonFetch, isLoading
  } = useFetch({
    baseUri: baseNotificationsUri
  })

  const getNotifications = (lastKey = null, queryParamsFilter, limit = LIMIT_DEFAULT) => {
    const queryBuilder = new QueryBuilder()

    queryBuilder
      .addParam('lastKey', lastKey)
      .addParam('limit', limit)

    queryParamsFilter.forEach(element => {
      queryBuilder.addParam(element.key, element.value)
    });

    const uri = queryBuilder.build();

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

export const useGetNewestNotifications = () => {
  const {
    commonFetch, isLoading
  } = useFetch({
    baseUri: baseNotificationsUri
  })

  const getNewestNotifications = () => {
    const queryBuilder = new QueryBuilder()

    queryBuilder
      .addParam('newNotifications', true)

    const uri = queryBuilder.build();

    return commonFetch({
      uri,
      method: HTTPMethods.GET
    })
  }

  return {
    isLoading,
    getNewestNotifications
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

export const useUpdateNotifications = () => {
  const {
    commonFetch, isLoading
  } = useFetch({
    baseUri: baseNotificationsUri
  })

  const updateNotifications = (notificationsId, wasRead) => {

    return commonFetch({
      body: {
        read: wasRead,
        ids: [notificationsId]
      },
      methd: HTTPMethods.PUT
    })
  }

  return {
    isLoading,
    updateNotifications
  }
}