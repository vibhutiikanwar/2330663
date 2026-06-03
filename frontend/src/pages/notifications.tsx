import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import NotificationList from '@/components/NotificationList';
import FiltersBar from '@/components/FiltersBar';
import PaginationControls from '@/components/PaginationControls';
import { fetchNotifications } from '@/services/notificationApi';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [type, setType] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await fetchNotifications({ limit, page, notification_type: type });
        setNotifications(result.data.items || []);
        setTotalItems(result.data.totalItems || 0);
      } catch (_err) {
        setError('Unable to load notifications.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, limit, type]);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Notifications
        </Typography>
        <FiltersBar value={type} onChange={setType} />
        <NotificationList notifications={notifications} loading={loading} error={error} />
        <PaginationControls
          page={page}
          limit={limit}
          total={totalItems}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      </Box>
    </Container>
  );
};

export default NotificationsPage;
