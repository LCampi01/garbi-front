import {
  DateRangePicker
} from '../../components/DateRangePicker/DateRangePicker';
import {
  useEffect, useState
} from 'react';
import {
  useForm
} from 'react-hook-form';
import {
  useAreas
} from '../../api/hooks/useAreas/useAreas';
import {
  useReports
} from '../../api/hooks/useReports/useReports';
import {
  CommonTableList
} from '../../components/CommonTableList/CommonTableList';
import {
  FilterSideComponent
} from '../../components/FilterSideComponent';
import {
  HEIGHT_FULL_SCREEN
} from '../../config';
import {
  CommonFilters
} from '../../filters/CommonFilters';
import {
  useQueryParamFilters
} from '../../hooks/useQueryParamFilters';
import {
  ReportTable
} from '../../tables/ReportTable/ReportTable';
import {
  addSelectFilterIfApplies, SelectBoxFilter
} from '../../utils/filtersUtil.';
import {
  TimestampUtil
} from '../../utils/timestampUtil';
import {
  subDays
} from 'date-fns'
import {
  useSearchQueryParam
} from '../../hooks/useSearchQueryParam';
import {
  getInitialQueryParams, handleDateRangeChange
} from '../../hooks/useDateRangePicker';
import {
  reportsFiltersDeclaration
} from '../../filters/declarations/ReportFilters/reportFilter';

const mapper = (reports) => {

  return reports.map(
    r => {
      const {
        date, time
      } = TimestampUtil.convertToDateAndHour(r.timestamp)

      const creator = r.userId ? 'Recolector' : 'Ciudadano'

      return {
        id: r.id,
        date: date,
        time: time,
        state: r.currentStatus,
        typeOfUser: creator,
        description: r.title,
        reportType: r.type === 'CONTENEDOR_ROTO' 
          ? 'CONTENEDOR EN MAL ESTADO' 
          : r.type.replace(/_/g, ' '),
        area: r.area.name,
        assignedManagerName: r.managerName,
        assignedManagerPhoto: r.managerImage
      }
    }
  )
}


export const ReportPage = () => {

  const [reportsFilters, setReportFilters] = useState(reportsFiltersDeclaration)
  const [isLoadingFilters, setIsLoadingFilters] = useState(true)
  const [isLoadingData, setIsLoadingData] = useState(true)

  const {
    fetchReports: {
      fetchReports,
      isLoadingFetchReports
    }
  } = useReports();

  const {
    getAreas: {
      getAreas,
      isLoadingGetAreas
    }
  } = useAreas()


  // this useEffect is to retrieve areas from BE and complete filters
  useEffect(() => {
    const getAreasAndCompleteFilters = async () => {
      const {
        result: areas
      } = await getAreas()

      const areasOptions = areas.map(area => ({
        value: area.id,
        label: area.name
      }))

      const completedReportFilters = [...reportsFilters]

      completedReportFilters.push({
        key: 'area',
        name: 'Área',
        values: areasOptions,
        render: SelectBoxFilter,
        addFilter: addSelectFilterIfApplies
      })

      setReportFilters(completedReportFilters)
      setIsLoadingFilters(false)
    }

    getAreasAndCompleteFilters()
  }, [])

  const {
    control,
    handleSubmit
  } = useForm();

  const fromDate = subDays(new Date(), 6)
  const toDate = new Date()
  const initialQueryParams = getInitialQueryParams(fromDate, toDate)

  const {
    fetchDataWithFilters: fetchReportsWithFilters,
    whenFiltersSubmit,
    addQueryParamFilter,
    addMultipleQueryParamFilter,
    removeQueryParamFilter
  } = useQueryParamFilters(reportsFilters, fetchReports, initialQueryParams)

  const onSearcherSubmit = useSearchQueryParam(addQueryParamFilter, removeQueryParamFilter)

  const onDateRangeChange = handleDateRangeChange(addMultipleQueryParamFilter);

  useEffect(() => {
    if (!isLoadingFetchReports) setIsLoadingData(false)
  }, [isLoadingFetchReports])

  return <FilterSideComponent
    title={'Reportes'}
    height={HEIGHT_FULL_SCREEN}
    renderFilters={
      () => <CommonFilters
        control={control}
        filters={reportsFilters}
      />
    }
    handleSubmit={handleSubmit(whenFiltersSubmit)}
    isLoading={isLoadingGetAreas || isLoadingFilters}
    component={
      () =>
        <CommonTableList
          table={ReportTable}
          fetchData={fetchReportsWithFilters}
          isLoadingFetchData={isLoadingFetchReports || isLoadingData}
          mapper={mapper}
          placeHolderInput={'Buscar por ID o Contenedor'}
          componentToRender={
            <DateRangePicker
              onDateChange={onDateRangeChange}
            />
          }
          onSearcherSubmit={onSearcherSubmit}
        />
    }
  />;
};
