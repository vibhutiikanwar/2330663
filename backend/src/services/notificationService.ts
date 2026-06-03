import { v4 as uuidv4 } from 'uuid';

interface NotificationPayload {
  recipientId?: string;
  channels?: string[];
  notificationType?: string;
  templateId?: string;
  payload?: Record<string, any>;
  audience?: Record<string, any>;
  priority?: string;
}

interface NotificationRecord {
  id: string;
  title: string;
  message: string;
  notificationType: string;
  channels: string[];
  isRead: boolean;
  createdAt: string;
}

const notificationsStore: NotificationRecord[] = [];

export function createNotification(payload: NotificationPayload) {
  const notification = {
    id: uuidv4(),
    title: payload.payload?.title || 'New Notification',
    message: payload.payload?.message || 'You have a new notification.',
    notificationType: payload.notificationType || 'general',
    channels: payload.channels || ['in_app'],
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  notificationsStore.push(notification);
  return notification;
}

export function sendBulkNotification(payload: NotificationPayload) {
  const requestId = uuidv4();
  return {
    requestId,
    estimatedRecipients: 1000,
    status: 'processing',
  };
}

export function getNotificationById(id: string) {
  return notificationsStore.find((item) => item.id === id) || null;
}

export function getNotificationsByUser(userId: string, query: any) {
  const items = notificationsStore.slice(0, 20);
  return {
    items,
    page: Number(query.page || 1),
    limit: Number(query.limit || 20),
    totalItems: items.length,
    unreadCount: items.filter((item) => !item.isRead).length,
  };
}

export function markNotificationRead(id: string) {
  const entry = notificationsStore.find((item) => item.id === id);
  if (!entry || entry.isRead) {
    return null;
  }

  entry.isRead = true;
  return {
    notificationId: entry.id,
    isRead: true,
    readAt: new Date().toISOString(),
  };
}

export function deleteNotification(id: string) {
  const index = notificationsStore.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  }
  notificationsStore.splice(index, 1);
  return true;
}
