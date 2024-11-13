import {
  useEmployees
} from '../../api/hooks/useEmployees/useEmployees';
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
  EmployeesTable
} from '../../tables/EmployeesTable/EmployeesTable';
import {
  useEffect,
  useState
} from 'react';
import {
  ModalCreateResource
} from '../../modales/ModalCreateResource';
import {
  CreateEmployeeForm
} from '../../forms/CreateEmployee/CreateEmployeeForm';
import {
  ModifyEmployeeForm
} from '../../forms/ModifyEmployee/ModifyEmployeeForm';
import {
  DeleteEmployeeForm
} from '../../forms/DeleteEmployee/DeleteEmployeeForm';
import {
  TableButtons
} from '../../components/TableButtons/TableButtons';
import {
  CommonFilters 
} from '../../filters/CommonFilters/CommonFilters';
import {
  useForm 
} from 'react-hook-form';
import {
  useQueryParamFilters 
} from '../../hooks/useQueryParamFilters';
import {
  employeesFiltersDeclaration 
} from '../../filters/declarations/EmployeesFilters/employeesFilters';
import {
  useSearchQueryParam 
} from '../../hooks/useSearchQueryParam';



const mapper = (data) => data

export const EmployeePage = () => {

  const [employeesFilters, setEmployeesFilters] = useState(employeesFiltersDeclaration)
  const [openCreateEmployeeModal, setOpenCreateEmployeeModal] = useState(false);
  const [openDeleteEmployeeModal, setOpenDeleteEmployeeModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(false);
  const [openModifyEmployeeModal, setOpenModifyEmployeeModal] = useState(false);
  const [employeeToModify, setEmployeeToModify] = useState(false);
  const [reloadTable, setReloadTable] = useState(0);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const refreshList = () => {
    setReloadTable(prev => prev + 1);
  };

  const handleOpenCreateEmployeeModal = () => setOpenCreateEmployeeModal(true);
  const handleCloseCreateEmployeeModal = () => setOpenCreateEmployeeModal(false);

  const handleOpenModifyEmployeeModal = (employeeToModify) => {
    setEmployeeToModify(employeeToModify)
    setOpenModifyEmployeeModal(true)
  };
  const handleCloseModifyEmployeeModal = () => {
    setOpenModifyEmployeeModal(false)
    setEmployeeToModify(null);
  };



  const handleOpenDeleteEmployeeModal = (employeeToDelete) => {
    setEmployeeToDelete(employeeToDelete)
    setOpenDeleteEmployeeModal(true)
  };

  const handleCloseDeleteEmployeeModal = () => {
    setOpenDeleteEmployeeModal(false)
    setEmployeeToDelete(null);
  };

  const {
    fetchEmployees: {
      fetchEmployees,
      isLoadingFetchEmployees
    }
  } = useEmployees();

  const handleRowClick = (element) => {
    setSelectedElement(element);
  };

  const {
    fetchDataWithFilters: fetchEmployeesWithFilters,
    whenFiltersSubmit,
    addQueryParamFilter,
    removeQueryParamFilter
  } = useQueryParamFilters(employeesFilters, fetchEmployees)

  const {
    control,
    handleSubmit
  } = useForm();

  const onSearcherSubmit = useSearchQueryParam(addQueryParamFilter, removeQueryParamFilter)

  useEffect(() => {
    if (!isLoadingFetchEmployees) setIsLoadingData(false)
  }, [isLoadingFetchEmployees])

  return (
    <FilterSideComponent
      prefix={'Gestión'}
      title={'Empleados'}
      height={HEIGHT_FULL_SCREEN}
      renderFilters={
        () => <CommonFilters
          control={control}
          filters={employeesFilters}
        />
      }
      handleSubmit={handleSubmit(whenFiltersSubmit)}
      component={
        () =>
          <>
            <ModalCreateResource
              title={'Nuevo Empleado'}
              description={'Complete los siguientes campos para agregar un nuevo empleado a la empresa'}
              open={openCreateEmployeeModal}
              handleClose={handleCloseCreateEmployeeModal}
              form={<CreateEmployeeForm
                handleClose={handleCloseCreateEmployeeModal}
                onSuccess={refreshList}
              />}
            />
            <ModalCreateResource
              title={'Modificar datos del empleado'}
              open={openModifyEmployeeModal}
              handleClose={handleCloseModifyEmployeeModal}
              form={<ModifyEmployeeForm
                employeeToModify={employeeToModify}
                handleClose={handleCloseModifyEmployeeModal}
                onSuccess={refreshList}
              />}
            />
            <ModalCreateResource
              title={'Eliminar empleado'}
              open={openDeleteEmployeeModal}
              handleClose={handleCloseDeleteEmployeeModal}
              form={<DeleteEmployeeForm
                employeeToDelete={employeeToDelete}
                handleClose={handleCloseDeleteEmployeeModal}
                onSuccess={refreshList}
              />}
            />

            <CommonTableList
              table={EmployeesTable}
              fetchData={fetchEmployeesWithFilters}
              isLoadingFetchData={isLoadingFetchEmployees || isLoadingData}
              mapper={mapper}
              reloadTable={reloadTable}
              placeHolderInput={'Buscar por Nombre o Apellido'}
              inputWidth={'288px'}
              handleRowClick={handleRowClick}
              onSearcherSubmit={onSearcherSubmit}
              componentToRender={
                <TableButtons
                  selectedElement={selectedElement}
                  handleOpenDeleteElementModal={handleOpenDeleteEmployeeModal}
                  handleOpenModifyElementModal={handleOpenModifyEmployeeModal}
                  handleOpenCreateElementModal={handleOpenCreateEmployeeModal}
                  mainButtonText={'Nuevo empleado'}
                />
              }
            />
          </>
      }
    />
  );
};
