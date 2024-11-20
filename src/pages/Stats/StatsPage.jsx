import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RouteIcon from '@mui/icons-material/Route';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Backdrop,
  Box, CircularProgress, Divider, Paper, Tooltip, Typography
} from '@mui/material'
import {
  SelectForm
} from '../../components/SelectForm/SelectForm'
import {
  useForm,
  useWatch
} from 'react-hook-form'
import {
  DateRangePicker
} from '../../components/DateRangePicker'
import {
  StatsBarChart
} from '../../components/BarChart';
import {
  LineBarChart
} from '../../components/LineBarChart';
import {
  BreadcrumbsComponent
} from '../../components/BreadcrumbsComponent';
import {
  useFetchAreas 
} from '../../api/hooks/useAreas/useFetchAreas';
import {
  useEffect, useState 
} from 'react';
import {
  subDays
} from 'date-fns'
import {
  TimestampUtil 
} from '../../utils/timestampUtil';
import {
  useStats 
} from '../../api/hooks/useStats/useStats';
import {
  axisClasses
} from '@mui/x-charts/ChartsAxis';

const BandChartSetting = {
  yAxis: [
    {
      label: '% de contenedores',
    },
  ],
  xAxis: [
    {
      scaleType: 'band',
      dataKey: 'date',
      tickPlacement: 'middle',
      tickLabelPlacement: 'middle',
    },
  ],
  series: [
    {
      dataKey: 'containersOverThreshold',
      label: '% de contenedores',
      color: '#86B646CC'
    }
  ],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

const lineBarChartSetting = (xData, yData) => {
  return {
    xAxis: [
      {
        data: xData
      }
    ],
    series: [
      {
        data: yData,
        area: true,
      },
    ],
    height: 300
  }
}

function fillAndSortHours(data) {
  const completeData = [];

  // Crear un array de 24 horas, llenando con 0 en averageCapacity si falta alguna hora
  for (let i = 0; i < 24; i++) {
    const existingEntry = data.find(entry => entry.hour === i);
    if (existingEntry) {
      completeData.push(existingEntry);
    } else {
      completeData.push({
        hour: i,
        averageCapacity: 0 
      });
    }
  }

  // Ordenar el array por la propiedad 'hour'
  completeData.sort((a, b) => a.hour - b.hour);

  return completeData;
}


export const StatsPage = () => {
  const [stats, setStats] = useState(null)
  const [selectedRangeDate, setSelectedRangeDate] = useState({
    from: TimestampUtil.convertToDateForFilter(subDays(new Date(), 8)),
    to: TimestampUtil.convertToDateForFilter(subDays(new Date(), 1))
  })
  const [areas, isLoadingGetAreas] = useFetchAreas();

  const {
    getStats: {
      getStats,
      isLoadingGetStats
    }
  } = useStats()

  const {
    control,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm();

  const selectedArea = useWatch({
    control,
    name: 'area', // El nombre del campo que deseas observar
  });

  useEffect(() => {
    const retrieveStats = async () => {
      const selectedAreaToSend = selectedArea ? selectedArea : [...areas].reverse()[0].id

      const stats = await getStats(selectedAreaToSend, selectedRangeDate.from, selectedRangeDate.to)

      const containersOverThresholdPerDaySorted = stats.containersOverThresholdPerDay.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });

      const averageCapacityPerHourCompletedAndSorted = fillAndSortHours(stats.averageCapacityPerHour)

      setStats({
        ...stats,
        containersOverThresholdPerDay: containersOverThresholdPerDaySorted,
        averageCapacityPerHour: averageCapacityPerHourCompletedAndSorted
      })
    }

    if (isLoadingGetAreas || areas.length == 0) return;

    retrieveStats()
  }, [selectedArea, selectedRangeDate, areas]);


  const onDateRangeChange = (selectedDateRange) => {
    const [selectedFromDate, selectedToDate] = selectedDateRange

    setSelectedRangeDate({
      from: TimestampUtil.convertToDateForFilter(selectedFromDate),
      to: TimestampUtil.convertToDateForFilter(selectedToDate)
    })
  }

  let conditionToShowBackDrop = isLoadingGetAreas || areas.length == 0 || !stats

  const getXData = () => {
    return stats.averageCapacityPerHour.map(a => a.hour)
  }

  const getYData = () => {
    return stats.averageCapacityPerHour.map(a => a.averageCapacity.toFixed(1))
  }

  if (conditionToShowBackDrop) {
    return <Backdrop
      open={conditionToShowBackDrop}
      sx={{
        color: '#fff',
      }}
    >
      <CircularProgress
        color='inherit'
      />
    </Backdrop>
  }

  return (
    <Box
      sx={{
        width: 1
      }}
    >
      <Box
        sx={{
          width: 1,
          Height: '4.5rem',
          padding: '1rem 4rem .8125rem'
        }}
      >
        <BreadcrumbsComponent
          title={'Estadísticas'}
        />

      </Box>
      <Divider />
      <Box
        sx={{
          width: 1,
          padding: '2rem 4rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              width: '15rem'
            }}
          >
            <SelectForm
              control={control}
              name={'area'}
              label={'Área'}
              defaultValue={areas.reverse()[0].id}
              options={areas.map(area => {
                return {
                  value: area.id,
                  label: area.name
                }
              })}
            />
          </Box>
          <Box>
            <DateRangePicker
              onDateChange={onDateRangeChange}
              defaultStartDate = {subDays(new Date(), 7)}
              lastAvailableDate = {subDays(new Date(), 1)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '2rem'
          }}
        >
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2.5rem',
              height: '112px',
              flex: 1
            }}
          >
            <Box
              sx={{
                height: '3rem'
              }}
            >
              <DeleteOutlineOutlinedIcon
                sx={{
                  fontSize: '3rem',
                  color: '#9E9E9E'
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '4rem'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.5rem'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 400,
                      lineHeight: '1.5rem'
                    }}
                  >
                    Tiempo promedio de llenado
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      lineHeight: '1.5rem'
                    }}
                  >
                    {TimestampUtil.formatMinutes(stats.averageFillTime)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: '2.5rem'
                  }}
                >
                  <Tooltip
                    title={'Tiempo que tardan los contenedores en llenarse hasta el 90% o más.'}
                    arrow
                    placement='top'
                  >
                    <InfoOutlinedIcon
                      sx={{
                        fontSize: '1.25rem',
                        color: '#9E9E9E'
                      }}
                    />
                  </Tooltip>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.5rem'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 400,
                      lineHeight: '1.5rem'
                    }}
                  >
                    Cantidad total de contenedores
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      lineHeight: '1.5rem'
                    }}
                  >
                    {stats.averageContainerCount}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: '2.5rem'
                  }}
                >
                  <Tooltip
                    title={'Cantidad de contenedores que se encuentran en el área seleccionada en la fecha de finalización seleccionada'}
                    arrow
                    placement='top'
                  >
                    <InfoOutlinedIcon
                      sx={{
                        fontSize: '1.25rem',
                        color: '#9E9E9E'
                      }}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </Box>

          </Paper>
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2.5rem',
              height: '112px',
              flex: 1
            }}
          >
            <Box
              sx={{
                height: '3rem'
              }}
            >
              <RouteIcon
                sx={{
                  fontSize: '3rem',
                  color: '#9E9E9E'
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '4rem'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.5rem'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 400,
                      lineHeight: '1.5rem'
                    }}
                  >
                    Tiempo promedio por ruta
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      lineHeight: '1.5rem'
                    }}
                  >
                    {TimestampUtil.formatMinutes(stats.averageDuration)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: '2.5rem'
                  }}
                >
                  <Tooltip
                    title={'Tiempo promedio que llevó realizar las rutas de recolección dentro del área seleccionada en el rango de fechas seleccionado.'}
                    arrow
                    placement='top'
                  >
                    <InfoOutlinedIcon
                      sx={{
                        fontSize: '1.25rem',
                        color: '#9E9E9E'
                      }}
                    />
                  </Tooltip>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.5rem'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 400,
                      lineHeight: '1.5rem'
                    }}
                  >
                    Distancia recorrida promedio por ruta
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      lineHeight: '1.5rem'
                    }}
                  >
                    {(stats.averageDistance / 1000).toFixed(1)} km
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: '2.5rem'
                  }}
                >
                  <Tooltip
                    title={'Distancia promedio de las rutas de recolección dentro del área seleccionada en el rango de fechas seleccionado.'}
                    arrow
                    placement='top'
                  >
                    <InfoOutlinedIcon
                      sx={{
                        fontSize: '1.25rem',
                        color: '#9E9E9E'
                      }}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </Box>

          </Paper>
        </Box>
        <Paper
          sx={{
            padding: '1rem 1.5rem'
          }}
        >
          <Box>
            <Box
              sx={{
                display: 'flex',
                gap: '.5rem',
                alignItems: 'center'
              }}
            >
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  lineHeight: '1.5rem',
                }}
              >
                Contenedores que superaron el umbral
              </Typography>
              <Tooltip
                title={'Porcentaje de contenedores que superaron el 90% de capacidad dentro del área seleccionada en el rango de fechas seleccionado.'}
                arrow
                placement='top'
              >
                <InfoOutlinedIcon
                  sx={{
                    fontSize: '1.25rem',
                    color: '#9E9E9E'
                  }}
                />
              </Tooltip>
            </Box>
            <Box
              sx={{
                mt: '8px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography
                sx={{
                  fontSize: '.875rem',
                  fontWeight: 400,
                  lineHeight: '1.3125rem',
                }}
              >
                Promedio: {' '}
                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    lineHeight: '1.6875rem',
                  }}
                  component={'span'}
                >
                  15%
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Box>
            <StatsBarChart
              data={stats.containersOverThresholdPerDay}
              chartSetting={BandChartSetting}
            />
          </Box>
        </Paper>
        <Paper
          sx={{
            padding: '1rem 1.5rem'
          }}
        >
          <Box>
            <Box
              sx={{
                display: 'flex',
                gap: '.5rem',
                alignItems: 'center'
              }}
            >
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  lineHeight: '1.5rem',
                }}
              >
                Nivel de llenado promedio por hora
              </Typography>
              <Tooltip
                title={'Promedio de capacidad ocupada de los contenedores por hora dentro del área seleccionada en el rango de fechas seleccionado.'}
                arrow
                placement='top'
              >
                <InfoOutlinedIcon
                  sx={{
                    fontSize: '1.25rem',
                    color: '#9E9E9E'
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
          <Box>
            <LineBarChart
              chartSetting={lineBarChartSetting(getXData(), getYData())}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}
