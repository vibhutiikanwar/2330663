Stage 1: Notification System API Design
1. Core Actions (Use Cases)
-Fetch Notifications: Student fetches their list of updates (Placements, Events, Results).
-Mark as Read: Student marks a specific notification as read.
-Send Notification (Admin): Admin pushes a new update (optional depending on scope).
-Real-time Update: Notification delivery without refreshing.

2. REST API Design
A. Fetch Notifications
Endpoint: GET /api/v1/notifications
Headers: Authorization: Bearer <token>
Response (JSON):
          {
  "status": "success",
  "data": [
    {
      "id": "notif_001",
      "type": "PLACEMENT",
      "message": "Company X is hiring for SDE role.",
      "isRead": false,
      "timestamp": "2026-06-03T10:00:00Z"
    }
  ]
          }
B. Mark Notification as Read
Endpoint: PATCH /api/v1/notifications/:id
Request Body: {"isRead": true}
Response: 200 OK

3. Real-Time Notification Mechanism
-To achieve "real-time" updates without the user manually refreshing:
-Choice: WebSockets (Socket.io).
-Why: Unlike standard HTTP, WebSockets provide a full-duplex communication channel. When the Admin sends a new placement update, the server pushes it instantly to the connected student's browser.

Implementation Flow:
-Client connects to the WebSocket server upon logging in.
-Server stores the socket_id mapped to the student_id.
-When a new record is added to the DB, the server emits a new_notification event.
-The client listens for this event and updates the UI dynamically.


Stage 2: Database Schema and Scalability
1. Database Choice: PostgreSQL
I suggest using PostgreSQL.

Reasoning: Notifications, user roles, and event metadata have strong, predefined relationships (e.g., a notification belongs to a specific user). PostgreSQL’s ACID compliance ensures data integrity, and its support for JSONB allows us to store flexible notification metadata without needing a separate NoSQL database.

2. Database Schema
We need at least two primary tables: users and notifications.
-- Table: users
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'STUDENT'
);

-- Table: notifications
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    type VARCHAR(20), -- e.g., 'PLACEMENT', 'EVENT'
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

3. Scalability Challenges and Solutions
As the student body grows, the notifications table will become a bottleneck.

Problems:

High Read/Write Latency: Millions of rows will slow down SELECT queries for students.

Table Bloat: Old notifications accumulate, making indices inefficient.

Solutions:

Indexing: Create a composite index on (user_id, created_at) to speed up the "fetch my latest notifications" query.

Partitioning: Partition the notifications table by created_at (e.g., monthly partitions) so queries only scan recent data.

Caching: Use Redis to cache the "latest 10 notifications" for active users, drastically reducing database load.

4. Sample Queries
- Fetch latest 10 notifications for a user:
{
    SELECT * FROM notifications 
WHERE user_id = 123 
ORDER BY created_at DESC 
LIMIT 10;
}
- Mark notification as read:

SQL

UPDATE notifications 
SET is_read = TRUE 
WHERE notification_id = 456;