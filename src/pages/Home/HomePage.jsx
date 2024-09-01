import {
  useForm 
} from 'react-hook-form';
import {
  FilterSideComponent 
} from '../../components/FilterSideComponent';
import HomeMainContent from './HomeMainContent';

export default function HomePage() {
  const {
    control 
  } = useForm({
    defaultValues: {
      minimo: '',
      maximo: '',
    },
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
