import {
  FilterSideComponent
} from '../../components/FilterSideComponent';
import {
  RecommendationsTable
} from '../../tables/recommendationsTable';


import {
  useQueryParamFilters
} from '../../hooks/useQueryParamFilters';
import {
  useEffect,
  useState
} from 'react';
import {
  reportsFiltersDeclaration
} from '../../filters/declarations/ReportFilters/reportFilter';
import {
  useForm
} from 'react-hook-form';
import {
  CommonTableList
} from '../../components/CommonTableList/CommonTableList';
import {
  CommonFilters
} from '../../filters/CommonFilters';
import {
  recommendationsFiltersDeclaration
} from '../../filters/declarations/RecommendationsFilters/recomendationsFilters';
import {
  useAddAreaFilter
} from '../../hooks/useAddAreaFilter';
import {
  useNotifications 
} from '../../api/hooks/useNotifications/useNotifications';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  HEIGHT_FULL_SCREEN 
} from '../../config';
import UpdateIcon from '@mui/icons-material/Update';

const mapper = (data) => {
  
  return data.map(rec => {
    return {
      id: rec.id,
      title: rec.title,
      subtitle: rec.description,
      read: 'READ' === rec.status,
      Icon: rec.type === 'lowBattery' ?  DeleteIcon : UpdateIcon
    }
  })
}

export default function RecommendationsPage() {
  const [reportsFilters, setReportFilters] = useState(reportsFiltersDeclaration)
  const [recommendationsFilters, setRecommendationsFilters] = useState(recommendationsFiltersDeclaration)
  const [isLoadingFilters, setIsLoadingFilters] = useState(true)
  const [isLoadingData, setIsLoadingData] = useState(true)

  const {
    getNotifications: {
      getNotifications,
      isLoadingGetNotifications
    }
  } = useNotifications();

  const {
    control,
    handleSubmit
  } = useForm();

  const {
    fetchDataWithFilters: fetchNotificationsWithFilters,
    whenFiltersSubmit,
    addQueryParamFilter,
    removeQueryParamFilter
  } = useQueryParamFilters(recommendationsFilters, getNotifications)

  const handleChangeOrder = (value) => {
    addQueryParamFilter({
      key: 'order',
      value
    })
  }

  const isLoadingGetAreas = useAddAreaFilter(recommendationsFilters, setRecommendationsFilters, {
    first: true
  })

  useEffect(() => {
    if (!isLoadingGetAreas) setIsLoadingFilters(false)
  }, [isLoadingGetAreas])

  useEffect(() => {
    if (!isLoadingGetNotifications) setIsLoadingData(false)
  }, [isLoadingGetNotifications])

  return (
    <FilterSideComponent
      title={'Recomendaciones'}
      height={HEIGHT_FULL_SCREEN}
      renderFilters={
        () => <CommonFilters
          control={control}
          filters={recommendationsFilters}
        />
      }
      handleSubmit={handleSubmit(whenFiltersSubmit)}
      isLoading={isLoadingGetAreas || isLoadingFilters}
      component={
        () =>
          <CommonTableList
            table={RecommendationsTable}
            isLoadingFetchData={isLoadingGetNotifications || isLoadingData}
            mapper={mapper}
            placeHolderInput={'Buscar por ID o Contenedor'}
            fetchData={fetchNotificationsWithFilters}
          />
      }
    />
  );
}
