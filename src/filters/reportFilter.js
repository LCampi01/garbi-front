import {
  addArrayFiltersIfApplies, CheckboxFilter 
} from '../utils/filtersUtil.';

export const reportsFiltersDeclaration = [
  {
    key: 'state',
    name: 'Estado',
    values: [
      {
        key: 'Nuevo',
        value: 'nuevo'
      },
      {
        key: 'En revisión',
        value: 'en_revision'
      },
      {
        key: 'Rechazado',
        value: 'rechazado'
      },
      {
        key: 'Resuelto',
        value: 'resuelto'
      }
    ],
    render: CheckboxFilter,
    addFilter: addArrayFiltersIfApplies
  },
  {
    key: 'typeOfProblem',
    name: 'Tipo de problema',
    values: [
      {
        key: 'Basura en la calle',
        value: 'basura_en_la_calle'
      },
      {
        key: 'Contenedor en mal estado',
        value: 'contenedor_en_mal_estado'
      },
      {
        key: 'Contenedor faltante',
        value: 'contenedor_faltante'
      },
      {
        key: 'Contenedor sucio',
        value: 'contenedor_sucio'
      },
      {
        key: 'Otro',
        value: 'otro'
      }
    ],
    render: CheckboxFilter,
    addFilter: addArrayFiltersIfApplies
  },
  {
    key: 'creador',
    name: 'Creador',
    values: [
      {
        key: 'Ciudadano',
        value: 'ciudadano'
      },
      {
        key: 'Recolector',
        value: 'recolector'
      }
    ],
    render: CheckboxFilter,
    addFilter: addArrayFiltersIfApplies
  }
]