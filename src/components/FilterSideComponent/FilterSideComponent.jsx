import {
  Box, Button, Divider, Typography
} from '@mui/material';
import {
  BreadcrumbsComponent
} from '../../components/BreadcrumbsComponent';
import {
  HEIGHT_FULL_SCREEN,
  HEIGHT_HEADER 
} from '../../config';


const DefaultEmpty = () => <></>


export const FilterSideComponent = ({
  title, 
  component, 
  prefix, 
  subtitle, 
  titleLink, 
  renderFilters: Filters = DefaultEmpty, 
  height = HEIGHT_FULL_SCREEN,
  handleSubmit =  () => {}, 
  whenFiltersSubmit
}) => {
  
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        height: height,
      }}
    >
      <Box
        sx={{
          width: '16rem',
          boxShadow: '0px 3px 1px -2px #00000033',
          backgroundColor: '#F5F5F5',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: `calc(100vh - ${HEIGHT_HEADER})`,
          position: 'fixed'
        }}
        component={'form'}
        onSubmit={handleSubmit(whenFiltersSubmit)}
      >
        <Box
          sx = {{
            flex: 1,
          }}
        >
          <Typography
            height='3rem'
            fontFamily='Roboto'
            fontSize='20px'
            fontWeight='300'
            sx={{
              color: 'var(--text-secondary, #00000099)',
            }}
          >
            Filtros
          </Typography>
          {<Filters />}
        </Box>
        <Button
          variant='contained'
          color='primary'
          size='large'
          fullWidth
          type='submit'
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
          ml: '16rem'
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
