import {
  Box, Button, Paper 
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';



export const RightSidePanel = ({
  componentToRender, handleClose, disablePadding = false
}) => {
  return (
    <Paper
      elevation={4}
      sx={{
        width: '20rem',
        height: 'calc(100% - 1.75rem)',
        backgroundColor: 'white',
        position: 'absolute',
        top: '26px',
        right: '34px',
      }}
    >
      <Box
        position='relative'
        sx={{
          padding: disablePadding ? '0' : '1.5rem 2.5rem',
          height: '100%'
        }}
      >
        <Button
          sx={{
            padding: 0,
            minWidth: 0,
            borderRadius: '50%',
            position: 'absolute',
            right: '8px',
            top: '8px',
          }}
          onClick={handleClose}
        >
          <CloseIcon
            sx={{
              color: 'black',
            }}
          />
        </Button>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {componentToRender}
        </Box>
      </Box>
    </Paper>
  )
}
