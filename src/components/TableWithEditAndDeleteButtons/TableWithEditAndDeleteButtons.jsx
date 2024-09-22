import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';



export const TableWithEditAndDeleteButtons = ({
  tableHeaders, rows=[], handleOnClickEditButton, handleOnClickDeleteButton, renderRow 
}) => {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          paddingRight: '7.0625rem'
        }}
      >
        <TableContainer>
          <Table
            aria-label='simple table'
          >
            <TableHead>
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableCell
                    key={index}
                    align={header.align || 'center'}
                    sx={{
                      minWidth: header.minWidth
                    }}
                  >
                    {header.value}
                  </TableCell>
                ))}

              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                renderRow(row)
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    align='center'
                    sx={{
                      width: 113,
                      borderLeft: '.0625rem solid #0000001F'
                    }}
                  >Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => <TableRow
                  key={row.id + '-action'}
                  sx={{
                    height: '3rem'
                  }}
                >
                  <TableCell
                    align='center'
                    sx={{
                      height: '100%',
                      padding: 0,
                      borderLeft: '.0625rem solid #0000001F'
                    }}
                  >
                    <Button
                      sx={{
                        width: 'fit-content',
                        minWidth: 'unset',
                        borderRadius: '50%'
                      }}
                      onClick={() => handleOnClickEditButton(row)}
                    >
                      <EditIcon
                        sx={{
                          color: '#0000008F',
                        }}
                      />

                    </Button>
                    <Button
                      sx={{
                        width: 'fit-content',
                        minWidth: 'unset',
                        borderRadius: '50%'
                      }}
                      onClick={() => handleOnClickDeleteButton(row)}
                    >
                      <DeleteIcon
                        sx={{
                          color: '#0000008F',
                        }}
                      />

                    </Button>
                  </TableCell>
                </TableRow>)}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  )
}