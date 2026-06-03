import { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import PriorityInbox from '@/components/PriorityInbox';
import { fetchNotifications } from '@/services/notificationApi';

const PriorityInboxPage = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await fetchNotifications({ limit: 50, page: 1 });
        setNotifications(result.data.items || []);
      } catch {
        setError('Unable to load priority notifications.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Priority Inbox
        </Typography>
        <PriorityInbox notifications={notifications} loading={loading} error={error} />
      </Box>
    </Container>
  );
};

export default PriorityInboxPage;
