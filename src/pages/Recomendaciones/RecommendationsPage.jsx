// Asegúrate de que React está importado
import RecommendationMainContent from './MainContent/RecommendationMainContent';
import {
  FilterSideComponent 
} from '../../components/FilterSideComponent';
import {
  useForm 
} from 'react-hook-form';

export default function RecommendationsPage() {
  const {
    control 
  } = useForm({
    defaultValues: {
    },
  });

  return (
    <FilterSideComponent
      title='Recomendaciones'
      control={control}
      component={() => <RecommendationMainContent />}
      renderFilters={<></>}

    />
  );
}
