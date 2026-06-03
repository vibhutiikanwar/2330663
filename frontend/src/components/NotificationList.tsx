import NotificationCard from './NotificationCard';
import { CircularProgress, Typography, Box } from '@mui/material';

interface Props {
  notifications: any[];
  loading: boolean;
  error: string;
}

const NotificationList = ({ notifications, loading, error }: Props) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (notifications.length === 0) {
    return <Typography>No notifications found.</Typography>;
  }

  return (
    <Box>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.notificationId || notification.id}
          title={notification.title}
          message={notification.snippet || notification.message}
          type={notification.notificationType || notification.category || 'General'}
          isRead={notification.isRead}
          createdAt={notification.createdAt}
        />
      ))}
    </Box>
  );
};

export default NotificationList;
