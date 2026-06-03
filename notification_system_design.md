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