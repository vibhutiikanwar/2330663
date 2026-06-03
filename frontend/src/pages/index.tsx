import Link from 'next/link';
import { Container, Typography, Box, Button, Stack } from '@mui/material';

const HomePage = () => (
  <Container maxWidth="md">
    <Box my={8} textAlign="center">
      <Typography variant="h3" component="h1" gutterBottom>
        College Placement Notification Portal
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        This demo frontend implements the notification feed and priority inbox using Next.js and Material UI.
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
        <Button variant="contained" component={Link} href="/notifications">
          Notifications
        </Button>
        <Button variant="outlined" component={Link} href="/priority-inbox">
          Priority Inbox
        </Button>
      </Stack>
    </Box>
  </Container>
);

export default HomePage;
