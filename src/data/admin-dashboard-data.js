// Extended admin data for dashboard analytics and customer management

// Revenue data for charts
export const monthlyRevenueData = [
  { month: 'Jan', revenue: 42500, orders: 312, customers: 156 },
  { month: 'Feb', revenue: 48200, orders: 341, customers: 178 },
  { month: 'Mar', revenue: 55100, orders: 389, customers: 201 },
  { month: 'Apr', revenue: 51800, orders: 367, customers: 189 },
  { month: 'May', revenue: 63400, orders: 423, customers: 234 },
  { month: 'Jun', revenue: 71200, orders: 478, customers: 267 },
  { month: 'Jul', revenue: 68900, orders: 456, customers: 251 },
  { month: 'Aug', revenue: 75600, orders: 498, customers: 289 },
  { month: 'Sep', revenue: 82300, orders: 534, customers: 312 },
  { month: 'Oct', revenue: 79800, orders: 512, customers: 298 },
  { month: 'Nov', revenue: 84232, orders: 548, customers: 324 },
  { month: 'Dec', revenue: 91500, orders: 589, customers: 356 }
];

// Region distribution data
export const regionDistributionData = [
  { name: 'North America', value: 1245, fill: 'hsl(var(--primary))' },
  { name: 'Europe', value: 892, fill: 'hsl(var(--accent))' },
  { name: 'Asia Pacific', value: 567, fill: 'hsl(var(--warning))' },
  { name: 'Latin America', value: 143, fill: 'hsl(var(--success))' }
];

// Product subscription counts
export const productSubscriptionData = [
  { product: 'Web Hosting', count: 735, revenue: 4398 },
  { product: 'Cloud Servers', count: 412, revenue: 13184 },
  { product: 'Domain Names', count: 567, revenue: 5664 },
  { product: 'Email Hosting', count: 312, revenue: 1244 },
  { product: 'SSL Certificates', count: 245, revenue: 9798 },
  { product: 'Website Builder', count: 178, revenue: 2666 },
  { product: 'SEO Tools', count: 98, revenue: 5879 },
  { product: 'VPS Hosting', count: 134, revenue: 5359 }
];

// Top performing products
export const topProducts = [
  { name: 'Web Hosting - Professional', revenue: 3594, growth: 12.5, subscribers: 600 },
  { name: 'Cloud Servers - Standard', revenue: 13184, growth: 18.3, subscribers: 412 },
  { name: 'SSL Certificates - Wildcard SSL', revenue: 9798, growth: 8.7, subscribers: 245 },
  { name: 'VPS Hosting - Standard', revenue: 5359, growth: 15.2, subscribers: 134 },
  { name: 'SEO Tools - Professional', revenue: 5879, growth: 22.1, subscribers: 98 }
];

// Expiring subscriptions (next 7 days)
export const expiringSubscriptions = [
  { id: 1, customerName: 'John Smith', email: 'john@example.com', product: 'SSL Certificates - Wildcard SSL', expiryDate: '2024-01-27', daysLeft: 2 },
  { id: 2, customerName: 'Sarah Johnson', email: 'sarah@example.com', product: 'Web Hosting - Professional', expiryDate: '2024-01-28', daysLeft: 3 },
  { id: 3, customerName: 'Mike Wilson', email: 'mike@example.com', product: 'Cloud Servers - Basic', expiryDate: '2024-01-29', daysLeft: 4 },
  { id: 4, customerName: 'Emily Brown', email: 'emily@example.com', product: 'Domain Names - .com', expiryDate: '2024-01-30', daysLeft: 5 },
  { id: 5, customerName: 'David Lee', email: 'david@example.com', product: 'Email Hosting - Business', expiryDate: '2024-01-31', daysLeft: 6 }
];

// Recent orders (last 10)
export const recentAdminOrders = [
  { id: 'ORD-240008', customer: 'John Smith', email: 'john@example.com', total: 64.00, status: 'completed', date: '2024-01-25T10:00:00', gateway: 'stripe' },
  { id: 'ORD-240007', customer: 'James Taylor', email: 'james@example.com', total: 49.97, status: 'completed', date: '2024-01-24T13:20:00', gateway: 'razorpay' },
  { id: 'ORD-240006', customer: 'Lisa Chen', email: 'lisa@example.com', total: 24.98, status: 'processing', date: '2024-01-23T08:00:00', gateway: 'stripe' },
  { id: 'ORD-240005', customer: 'David Lee', email: 'david@example.com', total: 39.99, status: 'refunded', date: '2024-01-22T11:30:00', gateway: 'paypal' },
  { id: 'ORD-240004', customer: 'Emily Brown', email: 'emily@example.com', total: 149.99, status: 'failed', date: '2024-01-21T16:45:00', gateway: 'stripe' },
  { id: 'ORD-240003', customer: 'Mike Wilson', email: 'mike@example.com', total: 19.99, status: 'pending', date: '2024-01-20T09:15:00', gateway: 'razorpay' },
  { id: 'ORD-240002', customer: 'Sarah Johnson', email: 'sarah@example.com', total: 32.00, status: 'completed', date: '2024-01-18T14:20:00', gateway: 'paypal' },
  { id: 'ORD-240001', customer: 'John Smith', email: 'john@example.com', total: 47.97, status: 'completed', date: '2024-01-15T10:30:00', gateway: 'stripe' },
  { id: 'ORD-231245', customer: 'Anna White', email: 'anna@example.com', total: 89.97, status: 'completed', date: '2024-01-14T15:45:00', gateway: 'stripe' },
  { id: 'ORD-231244', customer: 'Robert Chen', email: 'robert@example.com', total: 159.98, status: 'completed', date: '2024-01-13T09:30:00', gateway: 'paypal' }
];

// Dashboard quick stats
export const dashboardQuickStats = {
  activeCustomers: 2456,
  suspendedAccounts: 48,
  totalOrders: 8934,
  pendingPayments: 23,
  openTickets: 15,
  newCustomersThisMonth: 324,
  totalRevenue: 843200,
  monthlyRevenue: 84232,
  yearlyRevenue: 764892,
  activeSubscriptions: 2681
};

// Extended customer data for detailed views
export const extendedCustomerData = [
  {
    id: 1,
    shopperId: 'SHP-001',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Suite 100',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    country: 'USA',
    status: 'active',
    region: 'North America',
    joined: '2023-06-15',
    lastLogin: '2024-01-25T10:30:00',
    totalSpent: 289.45,
    subscriptions: [
      { id: 'SUB-001', product: 'Web Hosting - Professional', status: 'active', startDate: '2023-06-15', nextBilling: '2024-02-15', amount: 5.99, autoRenew: true },
      { id: 'SUB-002', product: 'SSL Certificates - Wildcard SSL', status: 'active', startDate: '2023-12-01', nextBilling: '2024-12-01', amount: 39.99, autoRenew: true }
    ],
    orders: [
      { id: 'ORD-240001', date: '2024-01-15', items: ['Web Hosting - Professional', 'SSL Certificates - Wildcard SSL'], total: 47.97, status: 'completed', gateway: 'stripe' },
      { id: 'ORD-231156', date: '2023-12-01', items: ['SSL Certificates - Wildcard SSL'], total: 39.99, status: 'completed', gateway: 'stripe' },
      { id: 'ORD-230892', date: '2023-06-15', items: ['Web Hosting - Professional'], total: 5.99, status: 'completed', gateway: 'paypal' }
    ],
    emailLogs: [
      { id: 'EMAIL-101', type: 'order_confirmation', subject: 'Order Confirmation - ORD-240001', status: 'delivered', sentAt: '2024-01-15T10:35:00' },
      { id: 'EMAIL-102', type: 'subscription_activation', subject: 'Your Subscription is Now Active', status: 'delivered', sentAt: '2024-01-15T10:37:00' },
      { id: 'EMAIL-103', type: 'payment_success', subject: 'Payment Received - $47.97', status: 'delivered', sentAt: '2024-01-15T10:36:00' }
    ],
    smsLogs: [
      { id: 'SMS-101', type: '2fa_otp', message: 'Your CloudHost OTP is 123456', status: 'delivered', sentAt: '2024-01-15T10:28:00' }
    ],
    tickets: [
      { id: 'TKT-1234', subject: 'SSL installation help', status: 'resolved', priority: 'medium', createdAt: '2024-01-10', resolvedAt: '2024-01-11' },
      { id: 'TKT-1180', subject: 'Email configuration', status: 'resolved', priority: 'low', createdAt: '2023-12-15', resolvedAt: '2023-12-16' }
    ],
    notes: [
      { id: 'NOTE-001', content: 'VIP customer, always prioritize support requests', addedBy: 'Admin User', addedAt: '2023-07-01T09:00:00' },
      { id: 'NOTE-002', content: 'Interested in upgrading to Business plan next quarter', addedBy: 'Support Team', addedAt: '2024-01-10T14:30:00' }
    ],
    activity: [
      { id: 1, action: 'Logged in', type: 'login', time: '2024-01-25T10:30:00' },
      { id: 2, action: 'Updated payment method', type: 'payment', time: '2024-01-24T11:00:00' },
      { id: 3, action: 'Renewed Web Hosting subscription', type: 'subscription', time: '2024-01-22T09:15:00' },
      { id: 4, action: 'Created support ticket #1234', type: 'ticket', time: '2024-01-10T15:00:00' }
    ]
  },
  {
    id: 2,
    shopperId: 'SHP-002',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 234-5678',
    address: '456 Tech Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA',
    status: 'active',
    region: 'Europe',
    joined: '2023-08-22',
    lastLogin: '2024-01-24T15:45:00',
    totalSpent: 456.00,
    subscriptions: [
      { id: 'SUB-003', product: 'Cloud Servers - Standard', status: 'active', startDate: '2023-08-22', nextBilling: '2024-02-22', amount: 32.00, autoRenew: true },
      { id: 'SUB-004', product: 'Domain Names - .com', status: 'active', startDate: '2023-08-22', nextBilling: '2024-08-22', amount: 9.99, autoRenew: true }
    ],
    orders: [
      { id: 'ORD-240002', date: '2024-01-18', items: ['Cloud Servers - Standard'], total: 32.00, status: 'completed', gateway: 'paypal' }
    ],
    emailLogs: [
      { id: 'EMAIL-201', type: 'order_confirmation', subject: 'Order Confirmation - ORD-240002', status: 'delivered', sentAt: '2024-01-18T14:25:00' }
    ],
    smsLogs: [],
    tickets: [],
    notes: [],
    activity: [
      { id: 1, action: 'Logged in', type: 'login', time: '2024-01-24T15:45:00' }
    ]
  },
  {
    id: 3,
    shopperId: 'SHP-003',
    name: 'Mike Wilson',
    email: 'mike@example.com',
    phone: '+1 (555) 345-6789',
    address: '789 Cloud Way',
    city: 'Singapore',
    state: '',
    zip: '238801',
    country: 'Singapore',
    status: 'suspended',
    region: 'Asia Pacific',
    joined: '2023-09-10',
    lastLogin: '2024-01-15T08:20:00',
    totalSpent: 48.00,
    subscriptions: [
      { id: 'SUB-005', product: 'Email Hosting - Business', status: 'suspended', startDate: '2023-09-10', nextBilling: '2024-02-10', amount: 3.99, autoRenew: false }
    ],
    orders: [],
    emailLogs: [
      { id: 'EMAIL-301', type: 'suspension_notice', subject: 'Account Suspended', status: 'delivered', sentAt: '2024-01-22T10:00:00' }
    ],
    smsLogs: [
      { id: 'SMS-301', type: 'suspension_alert', message: 'Your CloudHost account has been suspended', status: 'delivered', sentAt: '2024-01-22T10:01:00' }
    ],
    tickets: [],
    notes: [
      { id: 'NOTE-003', content: 'Account suspended due to payment failure. Customer notified.', addedBy: 'System', addedAt: '2024-01-22T10:00:00' }
    ],
    activity: []
  }
];

// Impersonation logs
export const impersonationLogs = [
  {
    id: 'IMP-001',
    adminId: 'admin-001',
    adminName: 'Admin User',
    adminEmail: 'admin@cloudhost.com',
    customerId: 1,
    customerShopperId: 'SHP-001',
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    reason: 'Investigating billing issue',
    startTime: '2024-01-24T14:30:00',
    endTime: '2024-01-24T14:45:00',
    duration: 15,
    pagesViewed: [
      { path: '/dashboard', timestamp: '2024-01-24T14:30:15' },
      { path: '/dashboard/orders', timestamp: '2024-01-24T14:32:00' },
      { path: '/dashboard/subscriptions', timestamp: '2024-01-24T14:35:00' },
      { path: '/dashboard/payments', timestamp: '2024-01-24T14:40:00' }
    ],
    actionsPerformed: [
      { action: 'viewed_order', details: 'ORD-240001', timestamp: '2024-01-24T14:33:00' },
      { action: 'added_note', details: 'Billing clarified with customer', timestamp: '2024-01-24T14:42:00' }
    ],
    ipAddress: '192.168.1.100'
  },
  {
    id: 'IMP-002',
    adminId: 'admin-002',
    adminName: 'Support Agent',
    adminEmail: 'support@cloudhost.com',
    customerId: 2,
    customerShopperId: 'SHP-002',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    reason: 'Helping with server configuration',
    startTime: '2024-01-23T11:00:00',
    endTime: '2024-01-23T11:20:00',
    duration: 20,
    pagesViewed: [
      { path: '/dashboard', timestamp: '2024-01-23T11:00:30' },
      { path: '/dashboard/products', timestamp: '2024-01-23T11:05:00' }
    ],
    actionsPerformed: [],
    ipAddress: '192.168.1.101'
  }
];

// Admin action logs
export const adminActionLogs = [
  { id: 'ACT-001', adminId: 'admin-001', adminName: 'Admin User', actionType: 'impersonate', targetCustomerId: 1, targetShopperId: 'SHP-001', description: 'Started impersonation session', timestamp: '2024-01-24T14:30:00' },
  { id: 'ACT-002', adminId: 'admin-001', adminName: 'Admin User', actionType: 'end_impersonation', targetCustomerId: 1, targetShopperId: 'SHP-001', description: 'Ended impersonation session', timestamp: '2024-01-24T14:45:00' },
  { id: 'ACT-003', adminId: 'admin-001', adminName: 'Admin User', actionType: 'suspend', targetCustomerId: 3, targetShopperId: 'SHP-003', description: 'Suspended customer account - Payment failure', timestamp: '2024-01-22T10:00:00' },
  { id: 'ACT-004', adminId: 'admin-002', adminName: 'Support Agent', actionType: 'add_note', targetCustomerId: 1, targetShopperId: 'SHP-001', description: 'Added internal note', timestamp: '2024-01-20T16:00:00' },
  { id: 'ACT-005', adminId: 'admin-001', adminName: 'Admin User', actionType: 'refund', targetCustomerId: 5, targetShopperId: 'SHP-005', description: 'Processed refund for ORD-240005', timestamp: '2024-01-23T12:00:00' }
];
