import {
  Box, Button, Typography, Divider 
} from '@mui/material';
import {
  BreadcrumbsComponent 
} from '../../components/BreadcrumbsComponent';
import {
  HomeFilters 
} from '../../pages/Home/HomeFilters';
import SelectAreaBox from '../../pages/Home/SideBar/Utils/SelectAreaBox';

const titles = ['Capacidad', 'Nivel de batería'];

export const FilterSideComponent = ({
  title,
  control,
  component,
  prefix,
  subtitle,
  titleLink,
  renderFilters,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: '256px',
          boxShadow: '0px 3px 1px -2px #00000033',
          backgroundColor: '#F5F5F5',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            flex: 1 
          }}
        >
          <Typography
            height='48px'
            fontFamily='Roboto'
            fontSize='20px'
            fontWeight='300'
            sx={{
              color: 'var(--text-secondary, #00000099)',
            }}
          >
            {renderFilters}
            Filtros
          </Typography>
          <SelectAreaBox />

          {titles.map((t, index) => (
            <HomeFilters
              key={index}
              title={t}
              control={control} // Pasar control a HomeFilters
            />
          ))}
        </Box>
        <Button
          variant='contained'
          color='primary'
          size='large'
          fullWidth
          sx={{
            backgroundColor: '#12422C',
          }}
        >
          Aplicar
        </Button>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '100%',
            padding: '16px 32px',
          }}
        >
          <BreadcrumbsComponent
            prefix={prefix}
            title={title}
            subtitle={subtitle}
            titleLink={titleLink}
          />
        </Box>
        <Divider />
        {component()}
      </Box>
    </Box>
  );
};
