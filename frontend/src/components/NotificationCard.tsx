import { Card, CardContent, Typography, Chip, Box } from '@mui/material';

interface Props {
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

const NotificationCard = ({ title, message, type, isRead, createdAt }: Props) => (
  <Card variant="outlined" sx={{ mb: 2, opacity: isRead ? 0.75 : 1 }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{title}</Typography>
        <Chip label={type} size="small" />
      </Box>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        {message}
      </Typography>
      <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
        {new Date(createdAt).toLocaleString()}
      </Typography>
    </CardContent>
  </Card>
);

export default NotificationCard;
