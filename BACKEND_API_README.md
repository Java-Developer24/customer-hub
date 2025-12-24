# SaaS Platform - Backend API Documentation

## Overview
This document outlines all backend API endpoints required to power the SaaS platform frontend.

---

## 🔐 Authentication Routes

### POST `/api/auth/register`
Register a new user account.
- **Body**: `{ name, email, password }`
- **Response**: `{ success, user, message }`

### POST `/api/auth/login`
Authenticate user and create session.
- **Body**: `{ email, password }`
- **Response**: `{ success, user, token, requiresOTP }`

### POST `/api/auth/verify-otp`
Verify OTP for two-step authentication.
- **Body**: `{ email, otp }`
- **Response**: `{ success, token }`

### POST `/api/auth/forgot-password`
Request password reset email.
- **Body**: `{ email }`

### POST `/api/auth/reset-password`
Reset password with token.
- **Body**: `{ token, newPassword }`

---

## 👤 User Routes

### GET `/api/user/profile`
Get current user profile.
- **Auth**: Required
- **Response**: `{ user, subscriptions, products }`

### PUT `/api/user/profile`
Update user profile.
- **Auth**: Required
- **Body**: `{ name, email, avatar }`

### GET `/api/user/dashboard`
Get user dashboard data.
- **Auth**: Required
- **Response**: `{ stats, recentProducts, notifications }`

---

## 📦 Product Routes

### GET `/api/products`
List all available products.
- **Query**: `?region=NA&status=active`
- **Response**: `{ products[] }`

### GET `/api/products/:id`
Get single product details.
- **Response**: `{ product, features, pricing }`

### POST `/api/products/purchase`
Purchase a product.
- **Auth**: Required
- **Body**: `{ productId, paymentMethod }`

### GET `/api/user/products`
Get user's purchased products.
- **Auth**: Required

---

## 💳 Subscription Routes

### GET `/api/subscriptions`
Get user's subscriptions.
- **Auth**: Required

### POST `/api/subscription/renew`
Renew a subscription.
- **Auth**: Required
- **Body**: `{ subscriptionId }`

### POST `/api/subscription/cancel`
Cancel a subscription.
- **Auth**: Required
- **Body**: `{ subscriptionId }`

### PUT `/api/subscription/toggle-auto-renew`
Toggle auto-renewal.
- **Auth**: Required
- **Body**: `{ subscriptionId, autoRenew }`

---

## 🎫 Support Ticket Routes

### GET `/api/tickets`
Get user's support tickets.
- **Auth**: Required

### POST `/api/tickets`
Create new support ticket.
- **Auth**: Required
- **Body**: `{ subject, priority, description }`

### GET `/api/tickets/:id`
Get ticket details with messages.
- **Auth**: Required

### POST `/api/tickets/:id/message`
Add message to ticket.
- **Auth**: Required
- **Body**: `{ message, attachments[] }`

### PUT `/api/tickets/:id/status`
Update ticket status (Admin).
- **Auth**: Admin Required
- **Body**: `{ status }`

---

## 🔔 Notification Routes

### GET `/api/notifications`
Get user notifications.
- **Auth**: Required

### PUT `/api/notifications/read`
Mark notifications as read.
- **Auth**: Required
- **Body**: `{ notificationIds[] }`

---

## 👨‍💼 Admin Routes

### GET `/api/admin/dashboard`
Get admin dashboard stats.
- **Auth**: Admin Required

### GET `/api/admin/customers`
List all customers.
- **Auth**: Admin Required
- **Query**: `?search=&status=&region=`

### GET `/api/admin/customers/:id`
Get customer details.
- **Auth**: Admin Required

### PUT `/api/admin/customers/:id/suspend`
Suspend customer account.
- **Auth**: Admin Required

### PUT `/api/admin/customers/:id/activate`
Activate customer account.
- **Auth**: Admin Required

### POST `/api/admin/impersonate/:customerId`
Impersonate customer (view-only).
- **Auth**: Admin Required
- **Response**: `{ sessionToken, restrictions }`

---

## 📦 Admin Product Management

### POST `/api/admin/products`
Create new product.
- **Auth**: Admin Required
- **Body**: `{ name, description, price, period, regions[], status }`

### PUT `/api/admin/products/:id`
Update product.
- **Auth**: Admin Required

### DELETE `/api/admin/products/:id`
Delete product.
- **Auth**: Admin Required

---

## 🌍 Region Management

### GET `/api/admin/regions`
List all regions.
- **Auth**: Admin Required

### POST `/api/admin/regions`
Create region.
- **Auth**: Admin Required
- **Body**: `{ name, code, countries[], active }`

### PUT `/api/admin/regions/:id`
Update region.
- **Auth**: Admin Required

### DELETE `/api/admin/regions/:id`
Delete region.
- **Auth**: Admin Required

---

## 📧 Email Routes

### GET `/api/admin/emails`
Get email logs.
- **Auth**: Admin Required
- **Query**: `?type=&status=`

### POST `/api/admin/emails/send`
Send email.
- **Auth**: Admin Required
- **Body**: `{ recipients, subject, message }`

### POST `/api/admin/emails/retry/:id`
Retry failed email.
- **Auth**: Admin Required

---

## 🤖 Chatbot Routes

### POST `/api/chatbot/query`
Send message to chatbot.
- **Auth**: Optional
- **Body**: `{ message, conversationId }`
- **Response**: `{ response, escalate }`

### POST `/api/chatbot/escalate`
Escalate to human agent.
- **Auth**: Required
- **Body**: `{ conversationId, message }`

---

## 📊 WebSocket Endpoints

### `/ws/chat`
Real-time chat connection.
- Customer <-> Admin live chat

### `/ws/notifications`
Real-time notifications.

---

## ⚠️ Missing/TODO Items

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email service integration (SendGrid/SES)
- [ ] File upload service for attachments
- [ ] Analytics tracking endpoints
- [ ] Rate limiting middleware
- [ ] Audit logging for admin actions
- [ ] Two-factor authentication setup
- [ ] Password strength validation
- [ ] Session management
- [ ] API key management for external integrations

---

## Database Models Needed

1. **Users** - id, name, email, password, role, status, createdAt
2. **Products** - id, name, description, price, period, status, regions[]
3. **Subscriptions** - id, userId, productId, status, autoRenew, expiresAt
4. **Tickets** - id, userId, subject, priority, status, createdAt
5. **TicketMessages** - id, ticketId, senderId, content, createdAt
6. **Notifications** - id, userId, type, title, message, read, createdAt
7. **Regions** - id, name, code, countries[], active
8. **EmailLogs** - id, recipient, subject, type, status, sentAt, openedAt
9. **AuditLogs** - id, adminId, action, targetId, details, createdAt
