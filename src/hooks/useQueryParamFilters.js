import {
  useCallback, useState 
} from 'react'

export const useQueryParamFilters = (filters, fetchData) => {
  const [queryParamsFilter, setQueryParamFilters] = useState([])

  const fetchDataWithFilters = useCallback((lastKey) => {
    return fetchData(lastKey, queryParamsFilter)
  }, [queryParamsFilter])

  const whenFiltersSubmit = (data) => {
    let newQueryParamsFilter = []

    for (const [key, value] of Object.entries(data)) {
      const filter = filters.find(f => f.key == key)

      filter.addFilter(key, value, newQueryParamsFilter)
    }

    setQueryParamFilters(newQueryParamsFilter)
  }

  return {
    fetchDataWithFilters,
    whenFiltersSubmit
  }
} 