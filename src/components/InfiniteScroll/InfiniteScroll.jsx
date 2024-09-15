
import {
  Box, CircularProgress
} from '@mui/material'
import {
  useEffect
} from 'react'

export const InfiniteScroll = ({
  children, onReload, isLoading, containerRef, hasMore
}) => {

  const handleScroll = () => {
    const container = containerRef.current;
    if (container && container.scrollTop + container.clientHeight >= container.scrollHeight - 100) {
      if (!isLoading) {
        onReload();
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoading]);


  return (
    <Box
      sx={{
        height: 1
      }}
    >
      <Box
        sx={{
          width: 1,
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          width: 1,
          height: '64px',
          display: 'flex',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <CircularProgress />
      </Box>
    </Box>
  )
}
