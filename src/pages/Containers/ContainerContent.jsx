import {
  Box,
  Paper,
  TableCell,
  TableRow,
} from '@mui/material';
import {
  SearcherPaginated
} from '../../components/SearcherPaginated';
import {
  ModalCreateResource
} from '../../modales/ModalCreateResource';
import {
  useState
} from 'react';
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
  TableWithEditAndDeleteButtons 
} from '../../components/TableWithEditAndDeleteButtons';

const containersInitial = [
  {
    id: 1234,
    barrio: 'Villa del Parque',
    area: 2,
    direccion: 'Av. Liberatador General',
    capacidad: '100%',
    bateria: '100%',
    tipoDeCarga: 'Bilateral',
    alturaContenedor: '170 cm',
  },
  {
    id: 12345,
    barrio: 'Villa del Parque',
    area: 2,
    direccion: 'Av. Liberatador General',
    capacidad: '100%',
    bateria: '100%',
    tipoDeCarga: 'Bilateral',
    alturaContenedor: '170 cm',
  },
  {
    id: 123456,
    barrio: 'Villa del Parque',
    area: 2,
    direccion: 'Av. Liberatador General',
    capacidad: '100%',
    bateria: '100%',
    tipoDeCarga: 'Bilateral',
    alturaContenedor: '170 cm',
  },
];

const ContainerRowRender = (container) => {
  return (
    <TableRow
      key={container.id}
      sx={{
        '& .MuiTableCell-root:last-child': {
          borderRight: 0,
        },
        '& .MuiTableCell-root':{
          height: '100%',
          paddingTop: 0,
          paddingBottom: 0
        },
        height: '3rem'
      }}
    >
      <TableCell
        component='th'
        scope='row'
        align='center'
      >
        {container.id}
      </TableCell>
      <TableCell
        align='center'
      >{container.barrio}</TableCell>
      <TableCell
        align='center'
      >{container.area}</TableCell>
      <TableCell
        align='center'
      >{container.direccion}</TableCell>
      <TableCell
        align='center'
      >
        <Box
          sx={{
            borderRadius: '8px',
            backgroundColor: '#D32F2F',
            minHeight: '28px',
            width: '72px',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
          }}
        >
          {container.capacidad}
        </Box>
      </TableCell>
      <TableCell
        align='center'
      >
        <Box
          sx={{
            borderRadius: '8px',
            backgroundColor: '#D32F2F',
            minHeight: '28px',
            width: '72px',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
          }}
        >
          {container.bateria}
        </Box>
      </TableCell>
      <TableCell
        align='center'
      >{container.tipoDeCarga}</TableCell>
      <TableCell
        align='center'
        sx={{
          borderRight: '1px solid #0000001F',
        }}
      >
        {container.alturaContenedor}
      </TableCell>
    </TableRow>
  )
}


const tableHeaders = [
  {
    value: 'ID',
    minWidth: 88,
    align: 'center'
  },
  {
    value: 'Barrio',
    minWidth: 152,
    align: 'center'
  },
  {
    value: 'Área',
    minWidth: 88,
    align: 'center'
  },
  {
    value: 'Dirección',
    minWidth: 200,
    align: 'center'
  },
  {
    value: 'Capacidad',
    minWidth: 112,
    align: 'center'
  },
  {
    value: 'Batería',
    minWidth: 104,
    align: 'center'
  },
  {
    value: 'Tipo de carga',
    minWidth: 120,
    align: 'center'
  },
  {
    value: 'Altura contenedor',
    minWidth: 152,
    align: 'center',
    sx: {
      borderRight: '1px solid #0000001F',
    }
  }
];

export const ContainerContent = () => {
  const [containers, setContainers] = useState(containersInitial);
  const [openCreateContainerModal, setOpenCreateContainerModal] = useState(false);
  const [openModifyContainerModal, setOpenModifyContainerModal] = useState(false);
  const [containerToModify, setContainerToModify] = useState(false);
  const [openDeleteContainerModal, setOpenDeleteContainerModal] = useState(false);
  const [containerToDelete, setContainerToDelete] = useState(false);

  const handleOpenCreateContainerModal = () => setOpenCreateContainerModal(true);
  const handleCloseCreateContainerModal = () => setOpenCreateContainerModal(false);

  const handleOpenModifyContainerModal = (containerToModify) => {
    setContainerToModify(containerToModify)
    setOpenModifyContainerModal(true)
  };
  const handleCloseModifyContainerModal = () => {
    setOpenModifyContainerModal(false)
    setContainerToModify(null);
  };

  const handleOpenDeleteContainerModal = (containerToDelete) => {
    setContainerToDelete(containerToDelete)
    setOpenDeleteContainerModal(true)
  };
  const handleCloseDeleteContainerModal = () => {
    setOpenDeleteContainerModal(false)
    setContainerToDelete(null);
  };


  return (
    <Box
      sx={{
        padding: '32px',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <ModalCreateResource
        title={'Nuevo Contenedor'}
        description={'Complete los siguientes campos para agregar un nuevo contenedor'}
        open={openCreateContainerModal}
        handleClose={handleCloseCreateContainerModal}
        form={<CreateContainerForm
          handleClose = {handleCloseCreateContainerModal}
        />}
      />
      <ModalCreateResource
        title={'Modificar datos del contenedor'}
        open={openModifyContainerModal}
        handleClose={handleCloseModifyContainerModal}
        form={<ModifyContainerForm
          containerToModify={containerToModify}
          handleClose = {handleCloseModifyContainerModal}
        />}
      />
      <ModalCreateResource
        title={'Eliminar contenedor'}
        open={openDeleteContainerModal}
        handleClose={handleCloseDeleteContainerModal}
        form={<DeleteContainerForm
          containerToDelete={containerToDelete}
          handleClose = {handleCloseDeleteContainerModal}
        />}
      />
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <SearcherPaginated
          placeholderInput={'Buscar por ID o Dirección'}
          buttonText={'Nuevo contenedor'}
          inputWidth={'18.75rem'}
          onClick={handleOpenCreateContainerModal}
        />
        <TableWithEditAndDeleteButtons
          tableHeaders={tableHeaders}
          rows={containers}
          renderRow={ContainerRowRender}
          handleOnClickEditButton={handleOpenModifyContainerModal}
          handleOnClickDeleteButton={handleOpenDeleteContainerModal}
        />
      </Paper>
    </Box >
  );
};
