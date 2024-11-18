import {
  addArrayFiltersIfApplies, CheckboxFilter 
} from '../../../utils/filtersUtil.';


export const reportsFiltersDeclaration = [
  {
    key: 'currentStatus',
    name: 'Estado',
    values: [
      {
        key: 'Nuevo',
        value: 'nuevo'
      },
      {
        key: 'En revisión',
        value: 'en revisión'
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
        value: 'contenedor_roto'
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
        key: 'Otros',
        value: 'otros'
      }
    ],
    render: CheckboxFilter,
    addFilter: addArrayFiltersIfApplies
  },
  {
    key: 'creator',
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