import {
  FilterSideComponent 
} from '../../components/FilterSideComponent';
import HomeMainContent from './HomeMainContent';
import {
  useForm 
} from 'react-hook-form';

export default function HomePage() {
  const {
    control 
  } = useForm({
    defaultValues: {
      test: ''
    }
  });

  return (
    <FilterSideComponent
      title='Mapa'
      control={control}
      component={() => <HomeMainContent />}
      renderFilters={<></>}
    />
  );
}
