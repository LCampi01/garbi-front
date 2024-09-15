import {
  Avatar, Box, Typography 
} from '@mui/material';

export const AvatarFullNameInline = ({
  avatar, fullName
}) => {
  
  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        minWidth: '10.5625rem'
      }}
    >
      <Avatar
        src={avatar}
        {...stringAvatar(fullName)}
      />
      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: '1.5rem',
        }}
      >
        {fullName}
      </Typography>
    </Box>
  )
}