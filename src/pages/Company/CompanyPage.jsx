import {
  useCompanies 
} from '../../api/hooks/useCompanies/useCompanies';
import {
  CommonTableList 
} from '../../components/CommonTableList/CommonTableList';
import CompanyTable from './CompanyTable';

const mapper = (data) => data

export const CompanyPage = () => {
  const {
    getCompanies: {
      getCompanies,
      isLoadingGetCompanies,
    },
  } = useCompanies();

  return (
    <CommonTableList
      table={CompanyTable}
      fetchData={getCompanies} 
      isLoadingFetchData={isLoadingGetCompanies} 
      mapper={mapper}
      datePicker={false}
    />
  );
};
