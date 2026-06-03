import { Router } from 'express';
import { createNotification, getNotificationById, getNotificationsByUser, markNotificationRead, deleteNotification, sendBulkNotification } from '../services/notificationService';

const router = Router();

router.post('/send', (req, res) => {
  const payload = req.body;
  const result = createNotification(payload);
  return res.status(201).json({ success: true, message: 'Notification queued for delivery.', data: result });
});

router.post('/bulk-send', (req, res) => {
  const payload = req.body;
  const result = sendBulkNotification(payload);
  return res.status(202).json({ success: true, message: 'Bulk notification request accepted.', data: result });
});

router.get('/user/:userId', (req, res) => {
  const notifications = getNotificationsByUser(req.params.userId, req.query);
  return res.json({ success: true, message: 'User notifications fetched.', data: notifications });
});

router.get('/:id', (req, res) => {
  const notification = getNotificationById(req.params.id);
  if (!notification) {
    return res.status(404).json({ success: false, message: 'Notification not found.', error: { code: 'NOT_FOUND' } });
  }
  return res.json({ success: true, message: 'Notification retrieved.', data: notification });
});

router.patch('/:id/read', (req, res) => {
  const result = markNotificationRead(req.params.id);
  if (!result) {
    return res.status(404).json({ success: false, message: 'Notification not found or already read.', error: { code: 'NOT_FOUND' } });
  }
  return res.json({ success: true, message: 'Notification marked as read.', data: result });
});

router.delete('/:id', (req, res) => {
  const deleted = deleteNotification(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Notification not found.', error: { code: 'NOT_FOUND' } });
  }
  return res.json({ success: true, message: 'Notification deleted successfully.', data: null });
});

export default router;
