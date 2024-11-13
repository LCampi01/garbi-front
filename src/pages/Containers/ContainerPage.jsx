import {
  useContainers
} from '../../api/hooks/useContainers/useContainers';
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
  ContainerTable
} from '../../tables/ContainerTable/ContainerTable';
import {
  useEffect,
  useState
} from 'react';
import {
  ModalCreateResource
} from '../../modales/ModalCreateResource';
import {
  CreateContainerForm
} from '../../forms/CreateContainer';
import {
  ModifyContainerForm
} from '../../forms/ModifyContainer/ModifyContainerForm';
import {
  DeleteContainerForm
} from '../../forms/DeleteContainer/DeleteContainerForm';
import {
  TableButtons
} from '../../components/TableButtons/TableButtons';
import {
  ContainersFiltersDeclaration,
  containersFilterValidations
} from '../../filters/declarations/ContainersFilters/containersFilters';
import {
  useForm
} from 'react-hook-form';
import {
  useQueryParamFilters
} from '../../hooks/useQueryParamFilters';
import {
  useSearchQueryParam
} from '../../hooks/useSearchQueryParam';
import {
  CommonFilters
} from '../../filters/CommonFilters';
import {
  useAreas
} from '../../api/hooks/useAreas/useAreas';
import {
  addSelectFilterIfApplies, SelectBoxFilter
} from '../../utils/filtersUtil.';
import {
  yupResolver 
} from '@hookform/resolvers/yup';

const mapper = (data) => data

export const ContainerPage = () => {
  const [openCreateContainerModal, setOpenCreateContainerModal] = useState(false);
  const handleOpenCreateContainerModal = () => setOpenCreateContainerModal(true);
  const handleCloseCreateContainerModal = () => setOpenCreateContainerModal(false);
  const [containersFilters, setContainersFilters] = useState(ContainersFiltersDeclaration)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isLoadingFilters, setIsLoadingFilters] = useState(true);

  const [openModifyContainerModal, setOpenModifyContainerModal] = useState(false);
  const [containerToModify, setContainerToModify] = useState(false);
  const handleOpenModifyContainerModal = (containerToModify) => {
    setContainerToModify(containerToModify)
    setOpenModifyContainerModal(true)
  };
  const handleCloseModifyContainerModal = () => {
    setOpenModifyContainerModal(false)
    setContainerToModify(null);
  };

  const [openDeleteContainerModal, setOpenDeleteContainerModal] = useState(false);
  const [containerToDelete, setContainerToDelete] = useState(false);
  const handleOpenDeleteContainerModal = (containerToDelete) => {
    setContainerToDelete(containerToDelete)
    setOpenDeleteContainerModal(true)
  };
  const handleCloseDeleteContainerModal = () => {
    setOpenDeleteContainerModal(false)
    setContainerToDelete(null);
  };

  const {
    getContainers: {
      getContainers,
      isLoadingGetContainers
    }
  } = useContainers();

  const {
    getAreas: {
      getAreas,
      isLoadingGetAreas
    }
  } = useAreas();


  const [reloadTable, setReloadTable] = useState(0);
  const refreshList = () => {
    setReloadTable(prev => prev + 1);
  };

  const {
    control,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(containersFilterValidations)
  });

  const {
    fetchDataWithFilters: fetchContainersWithFilters,
    whenFiltersSubmit,
    addQueryParamFilter,
    removeQueryParamFilter
  } = useQueryParamFilters(containersFilters, getContainers)

  const onSearcherSubmit = useSearchQueryParam(addQueryParamFilter, removeQueryParamFilter)

  const [selectedElement, setSelectedElement] = useState(null);
  const handleRowClick = (element) => {
    setSelectedElement(element);
  };

  // this useEffect is to retrieve areas from BE and complete filters
  useEffect(() => {
    const getContainersAndCompleteFilters = async () => {
      const {
        result: areas
      } = await getAreas()

      const areasOptions = areas.map(area => ({
        value: area.id,
        label: area.name
      }))

      const completedFilters = [...containersFilters]

      completedFilters.unshift({
        key: 'area',
        name: 'Área',
        values: areasOptions,
        render: SelectBoxFilter,
        addFilter: addSelectFilterIfApplies
      })

      setContainersFilters(completedFilters)
      setIsLoadingFilters(false);
    }

    getContainersAndCompleteFilters()
  }, [])

  useEffect(() => {
    if (!isLoadingGetContainers) setIsLoadingData(false)
  }, [isLoadingGetContainers])

  return (
    <FilterSideComponent
      prefix={'Gestión'}
      title={'Contenedores'}
      height={HEIGHT_FULL_SCREEN}
      renderFilters={
        () => <CommonFilters
          control={control}
          filters={containersFilters}
          errors={errors}
        />
      }
      handleSubmit={handleSubmit(whenFiltersSubmit)}
      isLoading={isLoadingFilters || isLoadingGetAreas}
      component={
        () =>
          <>
            <ModalCreateResource
              title={'Nuevo Contenedor'}
              description={'Complete los siguientes campos para agregar un nuevo contenedor'}
              open={openCreateContainerModal}
              handleClose={handleCloseCreateContainerModal}
              form={<CreateContainerForm
                handleClose={handleCloseCreateContainerModal}
                onSuccess={refreshList}
              />}
            />
            <ModalCreateResource
              title={'Modificar datos del contenedor'}
              open={openModifyContainerModal}
              handleClose={handleCloseModifyContainerModal}
              form={<ModifyContainerForm
                containerToModify={containerToModify}
                handleClose={handleCloseModifyContainerModal}
                onSuccess={refreshList}
              />}
            />
            <ModalCreateResource
              title={'Eliminar contenedor'}
              open={openDeleteContainerModal}
              handleClose={handleCloseDeleteContainerModal}
              form={<DeleteContainerForm
                containerToDelete={containerToDelete}
                handleClose={handleCloseDeleteContainerModal}
                onSuccess={refreshList}
              />}
            />
            <CommonTableList
              table={ContainerTable}
              fetchData={fetchContainersWithFilters}
              isLoadingFetchData={isLoadingGetContainers || isLoadingData}
              mapper={mapper}
              reloadTable={reloadTable}
              placeHolderInput={'Buscar por ID'}
              inputWidth={'192px'}
              handleRowClick={handleRowClick}
              onSearcherSubmit={onSearcherSubmit}
              componentToRender={
                <TableButtons
                  selectedElement={selectedElement}
                  handleOpenDeleteElementModal={handleOpenDeleteContainerModal}
                  handleOpenModifyElementModal={handleOpenModifyContainerModal}
                  handleOpenCreateElementModal={handleOpenCreateContainerModal}
                  mainButtonText={'Nuevo contenedor'}
                />
              }
            />
          </>
      }
    />
  );
};
