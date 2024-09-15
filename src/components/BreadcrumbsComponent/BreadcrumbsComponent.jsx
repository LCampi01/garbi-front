import {
  Breadcrumbs, Link, Typography
} from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const breadcrumbsTypographyStyles = {
  fontSize: '24px',
  fontWeight: 400,
  letterSpacing: '0.25px',
  color: '#212121'
};

export const BreadcrumbsComponent = ({
  prefix, title, subtitle, titleLink, detail = null
}) => {
  return (
    <Breadcrumbs
      separator={
        <NavigateNextIcon
          fontSize='large'
          sx={{
            color: '#757575'
          }}
        />
      }
      aria-label='breadcrumb'
    >
      {prefix && (
        <Typography
          sx={breadcrumbsTypographyStyles}
        >
          {prefix}
        </Typography>
      )}
      {subtitle ? (
        <Link
          underline='hover'
          href={titleLink}
          sx={breadcrumbsTypographyStyles}
        >
          {title}
        </Link>
      ) : (
        <Typography
          sx={breadcrumbsTypographyStyles}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography
          sx={breadcrumbsTypographyStyles}
        >
          {subtitle}
        </Typography>
      )}
      {detail && (
        <Typography
          sx={breadcrumbsTypographyStyles}
        >
          {detail}
        </Typography>
      )}
    </Breadcrumbs>
  )
}
