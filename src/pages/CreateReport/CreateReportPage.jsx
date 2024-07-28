import {
  Box,
  Divider,
  Typography,
} from '@mui/material';

import {
  CreateReportForm
} from '../../forms/CreateReport/CreateReportForm';

import {
  GetObjectCommand, 
} from '@aws-sdk/client-s3';

import {
  s3Client 
} from '../../config/s3Client'
import {
  getSignedUrl 
} from '@aws-sdk/s3-request-presigner';
import {
  useEffect, useState 
} from 'react';

export const CreateReportPage = () => {
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const command = new GetObjectCommand({
          Bucket: 'garbi-app',
          Key: 'reports/1722123756444.jpg', // El nombre de la imagen en S3
        });

        // Obtener la URL firmada
        const url = await getSignedUrl(s3Client, command, {
          expiresIn: 3600 
        }); // URL válida por 1 hora
        setImageUrl(url);
      } catch (err) {
        console.error('Error al obtener la imagen:', err);
      }
    };

    fetchImage();
  }, []);

  return (
    <Box
      sx={{
        // width: 1,
        // maxWidth: '1020px',
        // margin: 'auto'
        width: '100%',
        maxWidth: '1400px',
        margin: 'auto',
        padding: '0 16px',
      }}
    >
      <div>
        <h1>Imagen desde S3</h1>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt='Imagen desde S3'
          />
        ) : (
          <p>Cargando imagen...</p>
        )}
      </div>
      <Box
        sx={{
          padding: '16px 0 13px',
        }}
      >
        <Typography
          sx={{
            fontSize: '34px',
            fontWeight: 400,
            lineHeight: '42px',
            letterSpacing: '0.25px',
          }}
        >
          Crea un reporte
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}

      >
        <CreateReportForm />

      </Box>

    </Box>
  );
};
