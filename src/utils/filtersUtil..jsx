
import {
  CheckboxList 
} from '../components/CheckboxList/CheckboxList'
import {
  SelectForm 
} from '../components/SelectForm/SelectForm'

// todo: sacar a un componente ? 
export const CheckboxFilter = ({
  filter, control 
}) => (
  <CheckboxList
    key={filter.key}
    prefix={filter.key}
    control={control}
    name={filter.name}
    values={filter.values}
  />
)

// todo: sacar a un componente ? 
export const SelectBoxFilter = ({
  filter, control 
}) => (
  <SelectForm
    key={filter.key}
    control={control}
    name={filter.key}
    required={false}
    label={'Áreas'}
    options={filter.values}
  />
)


export const addArrayFiltersIfApplies = (key, values, newQueryParamsFilter) => {
  let filtersToApply = getFiltersToApply(values)

  if (filtersToApply.length > 0) {
    newQueryParamsFilter.push({
      key,
      value: convertArrayToString(filtersToApply)
    })
  }
}

export const addSelectFilterIfApplies = (key, value, newQueryParamsFilter) => {
  if (value != '') {
    newQueryParamsFilter.push({
      key,
      value
    })
  }
}


const getFiltersToApply = (filters) => {
  const filtersToApply = []

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      filtersToApply.push(key)
    }
  }

  return filtersToApply;
}

const convertArrayToString = (array) => `[${array.join(',')}]`