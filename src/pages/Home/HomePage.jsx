import {
  useForm 
} from 'react-hook-form';
import {
  FilterSideComponent 
} from '../../components/FilterSideComponent';
import HomeMainContent from './HomeMainContent';
import {
  HomeFilters 
} from '../../pages/Home/HomeFilters';
import SelectAreaBox from '../../pages/Home/SideBar/Utils/SelectAreaBox'; // Asegúrate de que esta importación es correcta

const titles = ['Nivel de llenado', 'Nivel de batería'];

export default function HomePage() {
  const {
    control 
  } = useForm({
    defaultValues: {
      minimo: '',
      maximo: '',
    },
  });

  const renderFilters = (
    <>
      <SelectAreaBox />
      {titles.map((title, index) => (
        <HomeFilters
          key={index}
          title={title}
          control={control}
        />
      ))}
    </>
  );

  return (
    <FilterSideComponent
      title='Mapa'
      component={() => <HomeMainContent />}
      renderFilters={renderFilters}
    />
  );
}
