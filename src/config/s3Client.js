import {
  S3Client 
} from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'TU_REGION', // Ejemplo: 'us-west-2'
  credentials: {
    accessKeyId: 'TU_ACCESS_KEY',
    secretAccessKey: 'TU_SECRET_ACCESS_KEY',
  },
});

export {
  s3Client 
};