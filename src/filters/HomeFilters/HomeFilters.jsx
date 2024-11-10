import {
  Box
} from '@mui/material';
import {
  RangeForm 
} from '../../components/RangeForm/RangeForm';
import {
  SelectForm
} from '../../components/SelectForm/SelectForm';


export const HomeFilters = ({
  control, areas, errors
}) => {

  return (
    <Box>
      <Box>
        <SelectForm
          name={'areaId'}
          label={'Área'}
          control={control}
          options={areas.map(area => ({
            value: area.id,
            label: area.name
          }))}
        />
      </Box>
      <Box
        sx={{
          mt: '2rem'
        }}
      >
        <Box>
          <RangeForm
            control={control}
            title={'Nivel de llenado'}
            minLabel={'Mínimo %'}
            minName={'minLlenado'}
            maxLabel={'Máximo %'}
            maxName={'maxLlenado'}
            errors={errors}
          />
        </Box>
      </Box>
      <Box
        sx={{
          mt: '1rem'
        }}
      >
        <Box>
          <RangeForm
            control={control}
            title={'Nivel de batería'}
            minLabel={'Mínimo %'}
            minName={'minBateria'}
            maxLabel={'Máximo %'}
            maxName={'maxBateria'}
            errors={errors}
          />
        </Box>
      </Box>
    </Box >
  )
}
