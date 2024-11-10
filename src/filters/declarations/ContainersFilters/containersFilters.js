import {
  number, object 
} from 'yup';
import {
  addArrayFiltersIfApplies,
  addRangeFiltersIfApplies, CheckboxFilter, RangeBoxFilter
} from '../../../utils/filtersUtil.';


export const containersFilterValidations = object({
  nivel_de_llenado: object({
    capacityMax: number()
      .nullable()
      .transform((value, originalValue) => originalValue.trim() === '' ? null : value)
      .min(0, 'Mín 0%')
      .max(100, 'Máx 100%'),
    capacityMin: number()
      .nullable()
      .transform((value, originalValue) => originalValue.trim() === '' ? null : value)
      .min(0, 'Mín 0%')
      .max(100, 'Máx 100%')
      .test('is-greater-than-capacityMax', 'La capacidad mínima no puede ser mayor que la capacidad máxima', function (value) {
        const {
          capacityMax 
        } = this.parent; 
        return value === null || capacityMax === null || value <= capacityMax; 
      }),
  }),
  nivel_de_bateria: object({
    batteryMax: number()
      .nullable()
      .transform((value, originalValue) => originalValue.trim() === '' ? null : value)
      .min(0, 'Mín 0%')
      .max(100, 'Máx 100%'),
    batteryMin: number()
      .nullable()
      .transform((value, originalValue) => originalValue.trim() === '' ? null : value)
      .min(0, 'Mín 0%')
      .max(100, 'Máx 100%')
      .test('is-greater-than-batteryMax', 'La batería mínima no puede ser mayor que la batería máxima', function (value) {
        const {
          batteryMax 
        } = this.parent; 
        return value === null || batteryMax === null || value <= batteryMax; 
      }),
  }),
});



export const ContainersFiltersDeclaration = [
  {
    key: 'nivel_de_llenado',
    name: 'Nivel de Llenado',
    maxLabel: 'Máximo %',
    minLabel: 'Mínimo %',
    maxName: 'capacityMax',
    minName: 'capacityMin',
    render: RangeBoxFilter,
    addFilter: addRangeFiltersIfApplies('capacityMin', 'capacityMax')
  },
  {
    key: 'nivel_de_bateria',
    name: 'Nivel de batería',
    maxLabel: 'Máximo %',
    minLabel: 'Mínimo %',
    maxName: 'batteryMax',
    minName: 'batteryMin',
    render: RangeBoxFilter,
    addFilter: addRangeFiltersIfApplies('batteryMin', 'batteryMax')
  },
  {
    key: 'typeOfLoad',
    name: 'Tipo de carga',
    values: [
      {
        key: 'Lateral',
        value: 'lateral'
      },
      {
        key: 'Bilateral',
        value: 'bilateral'
      }
    ],
    render: CheckboxFilter,
    addFilter: addArrayFiltersIfApplies
  },
]