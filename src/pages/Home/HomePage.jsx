import {
  FilterSideComponent
} from '../../components/FilterSideComponent';
import {
  HomeFilters
} from '../../filters/HomeFilters/HomeFilters';
import HomeMainContent from './HomeMainContent';
import {
  useForm
} from 'react-hook-form';
import {
  yupResolver
} from '@hookform/resolvers/yup';
import {
  number,
  object
} from 'yup';
import {
  useAreas
} from '../../api/hooks/useAreas/useAreas';
import {
  useEffect, useState
} from 'react';
import {
  useContainers
} from '../../api/hooks/useContainers/useContainers';
import {
  formatContainers
} from '../../api/hooks/useReports/mappers';

export const homeFilterValidations = object({
  minLlenado: number()
    .nullable()
    .transform((value, originalValue) => originalValue.trim() === '' ? null : value)
    .min(0, 'Mín 0%')
    .max(100, 'Máx 100%')
    .test('is-less-than-maxLlenado', 'El llenado mínimo no puede ser mayor que el llenado máximo', function (value) {
      const {
        maxLlenado
      } = this.parent; // Accede a maxLlenado en el contexto del esquema
      return value === null || maxLlenado === null || value <= maxLlenado; // Verifica la condición
    }),

  maxLlenado: number()
    .nullable()
    .transform((value, originalValue) => originalValue.trim() === '' ? null : value)
    .min(0, 'Mín 0%')
    .max(100, 'Máx 100%'),

  minBateria: number()
    .nullable()
    .transform((value, originalValue) => originalValue.trim() === '' ? null : value)
    .min(0, 'Mín 0%')
    .max(100, 'Máx 100%')
    .test('is-less-than-maxBateria', 'La batería mínima no puede ser mayor que la batería máxima', function (value) {
      const {
        maxBateria
      } = this.parent; // Accede a maxBateria en el contexto del esquema
      return value === null || maxBateria === null || value <= maxBateria; // Verifica la condición
    }),

  maxBateria: number()
    .nullable()
    .transform((value, originalValue) => originalValue.trim() === '' ? null : value)
    .min(0, 'Mín 0%')
    .max(100, 'Máx 100%'),
});

export default function HomePage() {
  const [areas, setAreas] = useState([])
  const [areasToRender, setAreasToRender] = useState([])
  const [containers, setContainers] = useState([]);
  const [containersToRender, setContainersToRender] = useState([])
  const [containerSelected, setContainerSelected] = useState(null);
  const [optimalRouteSelected, setOptimalRouteSelected] = useState(null)

  const {
    control, handleSubmit, setValue, formState: {
      errors
    },
    reset,
    getValues
  } = useForm({
    defaultValues: {
      areaId: '',
      minLlenado: '',
      maxLlenado: '',
      minBateria: '',
      maxBateria: ''
    },
    resolver: yupResolver(homeFilterValidations),
  });

  const {
    getAreas: {
      getAreas,
      isLoadingGetAreas
    }
  } = useAreas()

  const {
    getAllContainers: {
      getAllContainers
    }
  } = useContainers();


  useEffect(() => {
    const fetchAreas = async () => {
      const areasRetrieved = await getAreas()
      setAreas(areasRetrieved.result)
      setAreasToRender(areasRetrieved.result)
    }

    fetchAreas()
  }, [])

  // se podria mejorar para no duplicar codigo ? 
  useEffect(() => {
    const retrieveContainers = async () => {
      const containersUnformated = await getAllContainers();
      const containersFormated = formatContainers(containersUnformated.result);

      setContainers(containersFormated);
      setContainersToRender(containersFormated);
    };

    try {
      retrieveContainers();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const retrieveContainers = async () => {
    try {
      const containersUnformated = await getAllContainers();
      const containersFormated = formatContainers(containersUnformated.result);

      const realContainer = containersFormated.find(c => c.id === '298731')

      if (realContainer) {
        console.log('🚀 ~ retrieveContainers ~ realContainer:', realContainer)
      }

      setContainers(containersFormated);
      // Aplica filtros después de obtener los contenedores
      const filters = getFormValues();
      whenFiltersSubmitWithContainers({
        ...filters,
        areas,
        containers: containersFormated,
        containerSelected 
      });
    } catch (e) {
      console.log(e);
    }
  };

  // Función para obtener los valores actuales del formulario
  const getFormValues = () => {
    const {
      areaId, minLlenado, maxLlenado, minBateria, maxBateria
    } = getValues();
    const formatValues = getValues();

    if (minLlenado === '') {
      formatValues.minLlenado = null
    }
    if (maxLlenado === '') {
      formatValues.maxLlenado = null
    }
    if (minBateria === '') {
      formatValues.minBateria = null
    }
    if (maxBateria === '') {
      formatValues.maxBateria = null
    }

    return formatValues;
  };

  useEffect(() => {

    // Configurar el intervalo de 30 segundos para recargar el mapa
    const intervalId = setInterval(() => {
      retrieveContainers();
    }, 10000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [areas, containers, optimalRouteSelected, containerSelected]);

  const whenFiltersSubmitWithContainers = ({
    areaId, minLlenado, areas, maxLlenado, minBateria, maxBateria, containers, containerSelected
  }) => {
    const containersCondition = []
    const areasCondition = []

    const areaIdSelected = areaId !== '' ? areaId : null;
    const minLlenadoValue = minLlenado !== null ? Number(minLlenado) : 0;
    const maxLlenadoValue = maxLlenado !== null ? Number(maxLlenado) : 100;
    const minBateriaValue = minBateria !== null ? Number(minBateria) : 0;
    const maxBateriaValue = maxBateria !== null ? Number(maxBateria) : 100;

    if (areaId) {
      containersCondition.push(container => container.areaId == areaId)
      areasCondition.push(area => area.id == areaId)
    }

    containersCondition.push(container => container.capacity >= minLlenadoValue && container.capacity <= maxLlenadoValue);
    containersCondition.push(container => container.battery >= minBateriaValue && container.battery <= maxBateriaValue);

    const filteredContainers = containers.filter(container =>
      containersCondition.every(condition => condition(container))
    );

    const filteredAreas = areas.filter(area =>
      areasCondition.every(condition => condition(area))
    )
    setAreasToRender(filteredAreas)
    setContainersToRender(filteredContainers)

    if(containerSelected) {
      setContainerSelected(containers.find(c => c.id === containerSelected.id))
    }
  }

  const whenFiltersSubmit = ({
    areaId, minLlenado, maxLlenado, minBateria, maxBateria
  }) => {
    const containersCondition = []
    const areasCondition = []

    const areaIdSelected = areaId !== '' ? areaId : null;
    const minLlenadoValue = minLlenado !== null ? Number(minLlenado) : 0;
    const maxLlenadoValue = maxLlenado !== null ? Number(maxLlenado) : 100;
    const minBateriaValue = minBateria !== null ? Number(minBateria) : 0;
    const maxBateriaValue = maxBateria !== null ? Number(maxBateria) : 100;

    if (areaId) {
      containersCondition.push(container => container.areaId == areaId)
      areasCondition.push(area => area.id == areaId)
    }

    containersCondition.push(container => container.capacity >= minLlenadoValue && container.capacity <= maxLlenadoValue);
    containersCondition.push(container => container.battery >= minBateriaValue && container.battery <= maxBateriaValue);

    const filteredContainers = containers.filter(container =>
      containersCondition.every(condition => condition(container))
    );

    const filteredAreas = areas.filter(area =>
      areasCondition.every(condition => condition(area))
    )
    console.log('actualizando el estado')
    setAreasToRender(filteredAreas)
    setContainersToRender(filteredContainers)
  }

  const cleanFilters = () => {
    reset({
      areaId: '',
      minLlenado: '',
      maxLlenado: '',
      minBateria: '',
      maxBateria: ''
    });
    setAreasToRender(areas);
    setContainersToRender(containers);
  };


  return <FilterSideComponent
    title={'Mapa'}
    handleClean={cleanFilters}
    component={
      () =>
        <HomeMainContent
          areas={areasToRender}
          containers={containersToRender}
          setContainerSelected={setContainerSelected}
          containerSelected={containerSelected}
          cleanFilters={cleanFilters}
          setContainersToRender={setContainersToRender}
          optimalRouteSelected = {optimalRouteSelected}
          setOptimalRouteSelected={setOptimalRouteSelected}
        />
    }
    renderFilters={() => <HomeFilters
      control={control}
      areas={areas}
      errors={errors}
    />}
    handleSubmit={handleSubmit(whenFiltersSubmit)}
  />;
}

