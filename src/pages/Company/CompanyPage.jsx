import {
  useCallback 
} from 'react';
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

  const getCompaniesCallback = useCallback((lastKey) => {
    return getCompanies(lastKey)
  }, [])

  return (
    <CommonTableList
      table={CompanyTable}
      fetchData={getCompaniesCallback}
      isLoadingFetchData={isLoadingGetCompanies}
      mapper={mapper}
      datePicker={false}
    />
  );
};
