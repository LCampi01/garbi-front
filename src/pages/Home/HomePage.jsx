import {
  FilterSideComponent 
} from '../../components/FilterSideComponent';
import HomeMainContent from './HomeMainContent';

export default function HomePage() {

  const colors = {
    LOW_CAPACITY: '#D32F2F',
    MEDIUM_CAPACITY: '#EF6C00',
    HIGH_CAPACITY: '#2E7D32',
  };

  const information = [
    {
      color: colors.LOW_CAPACITY,
      valor: '+75%' 
    },
    {
      color: colors.MEDIUM_CAPACITY,
      valor: '25% - 75%' 
    },
    {
      color: colors.HIGH_CAPACITY,
      valor: '-25%' 
    }
  ];  

  const settingsEnabled = true
  return <FilterSideComponent
    title={'Mapa'}
    component={() => <HomeMainContent
      information={information}
      settingsEnabled={settingsEnabled}
    />}
    renderFilters={<></>}
  />;
}
