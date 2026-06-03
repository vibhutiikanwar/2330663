import NotificationList from './NotificationList';
import { useMemo } from 'react';

interface Props {
  notifications: any[];
  loading: boolean;
  error: string;
}

const PRIORITY_ORDER: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const PriorityInbox = ({ notifications, loading, error }: Props) => {
  const sorted = useMemo(() => {
    return notifications
      .filter((item) => !item.isRead)
      .sort((a, b) => {
        const scoreA = PRIORITY_ORDER[a.notificationType] || 0;
        const scoreB = PRIORITY_ORDER[b.notificationType] || 0;
        if (scoreA !== scoreB) return scoreB - scoreA;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, 10);
  }, [notifications]);

  return <NotificationList notifications={sorted} loading={loading} error={error} />;
};

export default PriorityInbox;
