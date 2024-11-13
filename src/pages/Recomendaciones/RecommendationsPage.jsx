import {
  FilterSideComponent
} from '../../components/FilterSideComponent';
import {
  RecommendationsTable 
} from '../../tables/recommendationsTable';
import {
  useReports 
} from '../../api/hooks/useReports/useReports';
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

const mapper = (data) => data

export default function RecommendationsPage() {
  const [reportsFilters, setReportFilters] = useState(reportsFiltersDeclaration)
  const [recommendationsFilters, setRecommendationsFilters] = useState(recommendationsFiltersDeclaration)
  const [isLoadingFilters, setIsLoadingFilters] = useState(true)
  const [isLoadingData, setIsLoadingData] = useState(true)

  const {
    fetchReports: {
      fetchReports,
      isLoadingFetchReports
    } 
  } = useReports();

  const {
    control,
    handleSubmit
  } = useForm();

  const {
    fetchDataWithFilters: fetchReportsWithFilters,
    whenFiltersSubmit,
    addQueryParamFilter,
    removeQueryParamFilter
  } = useQueryParamFilters(recommendationsFilters, fetchReports)

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
    if (!isLoadingFetchReports) setIsLoadingData(false)
  }, [isLoadingFetchReports])

  return (
    <FilterSideComponent
      title={'Recomendaciones'}
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
            isLoadingFetchData={isLoadingFetchReports || isLoadingData}
            mapper={mapper}
            placeHolderInput={'Buscar por ID o Contenedor'}
            handleChangeOrder={handleChangeOrder}
            fetchData={fetchReportsWithFilters}
          />
      }
    />
  );
}
