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
  ReportTable 
} from '../../tables/ReportTable/ReportTable';
import {
  TimestampUtil 
} from '../../utils/timestampUtil';

const mapper = (reports) => {

  return reports.map(
    r => {
      const {
        date, time
      } = TimestampUtil.convertToDateAndHour(r.timestamp)
      const state = r.status[r.status.length - 1]

      return {
        id: r.id,
        date: date,
        time: time,
        state: state.status,
        // recolector o ciudadano,
        description: r.description,
        reportType: r.type.replace('_', ' '),
        // falta lugar
        // falta area,
        // falta nombre del que report,
        // falta foto
      }
    }
  )
}


export const ReportPage = () => {

  const {
    fetchReports: {
      fetchReports,
      isLoadingFetchReports
    }
  } = useReports();


  return <FilterSideComponent
    title={'Reportes'}
    height={HEIGHT_FULL_SCREEN}
    component={
      () =>
        <CommonTableList
          table={ReportTable}
          fetchData={fetchReports}
          isLoadingFetchData={isLoadingFetchReports}
          mapper={mapper}
          placeHolderInput={'Buscar por ID, Título o Contenedor'}
        />
    }
  />;
};
