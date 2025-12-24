// Mock data for orders, payments, and notification logs

// Sample admin orders (all orders across all customers)
export const sampleAdminOrders = [
  {
    id: 'ORD-240001',
    userId: '1',
    shopperId: 'SHP-001',
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    date: '2024-01-15T10:30:00',
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    paymentGateway: 'stripe',
    transactionId: 'txn_1234567890',
    total: 47.97,
    currency: 'USD',
    region: 'North America',
    items: [
      { productId: 'web-hosting', productName: 'Web Hosting - Professional', quantity: 1, price: 5.99, billingCycle: 'monthly' },
      { productId: 'ssl-certificates', productName: 'SSL Certificates - Wildcard SSL', quantity: 1, price: 39.99, billingCycle: 'yearly' },
      { productId: 'domain-names', productName: 'Domain Names - .com', quantity: 1, price: 1.99, billingCycle: 'yearly' }
    ]
  },
  {
    id: 'ORD-240002',
    userId: '2',
    shopperId: 'SHP-002',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    date: '2024-01-18T14:20:00',
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'paypal',
    paymentGateway: 'paypal',
    transactionId: 'PAY-1234567890',
    total: 32.00,
    currency: 'USD',
    region: 'Europe',
    items: [
      { productId: 'cloud-servers', productName: 'Cloud Servers - Standard', quantity: 1, price: 32, billingCycle: 'monthly' }
    ]
  },
  {
    id: 'ORD-240003',
    userId: '3',
    shopperId: 'SHP-003',
    customerName: 'Mike Wilson',
    customerEmail: 'mike@example.com',
    date: '2024-01-20T09:15:00',
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'card',
    paymentGateway: 'razorpay',
    transactionId: null,
    total: 19.99,
    currency: 'USD',
    region: 'Asia Pacific',
    items: [
      { productId: 'vps-hosting', productName: 'VPS Hosting - Basic', quantity: 1, price: 19.99, billingCycle: 'monthly' }
    ]
  },
  {
    id: 'ORD-240004',
    userId: '4',
    shopperId: 'SHP-004',
    customerName: 'Emily Brown',
    customerEmail: 'emily@example.com',
    date: '2024-01-21T16:45:00',
    status: 'failed',
    paymentStatus: 'failed',
    paymentMethod: 'card',
    paymentGateway: 'stripe',
    transactionId: null,
    total: 149.99,
    currency: 'USD',
    region: 'North America',
    items: [
      { productId: 'seo-tools', productName: 'SEO Tools - Professional', quantity: 1, price: 79.99, billingCycle: 'monthly' },
      { productId: 'cloud-servers', productName: 'Cloud Servers - Performance', quantity: 1, price: 64, billingCycle: 'monthly' }
    ]
  },
  {
    id: 'ORD-240005',
    userId: '5',
    shopperId: 'SHP-005',
    customerName: 'David Lee',
    customerEmail: 'david@example.com',
    date: '2024-01-22T11:30:00',
    status: 'refunded',
    paymentStatus: 'refunded',
    paymentMethod: 'paypal',
    paymentGateway: 'paypal',
    transactionId: 'PAY-9876543210',
    total: 39.99,
    currency: 'USD',
    region: 'Europe',
    items: [
      { productId: 'vps-hosting', productName: 'VPS Hosting - Standard', quantity: 1, price: 39.99, billingCycle: 'monthly' }
    ]
  },
  {
    id: 'ORD-240006',
    userId: '6',
    shopperId: 'SHP-006',
    customerName: 'Lisa Chen',
    customerEmail: 'lisa@example.com',
    date: '2024-01-23T08:00:00',
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    paymentGateway: 'stripe',
    transactionId: 'txn_0987654321',
    total: 24.98,
    currency: 'USD',
    region: 'Asia Pacific',
    items: [
      { productId: 'website-builder', productName: 'Website Builder - Business', quantity: 1, price: 14.99, billingCycle: 'monthly' },
      { productId: 'domain-names', productName: 'Domain Names - .com', quantity: 1, price: 9.99, billingCycle: 'yearly' }
    ]
  },
  {
    id: 'ORD-240007',
    userId: '7',
    shopperId: 'SHP-007',
    customerName: 'James Taylor',
    customerEmail: 'james@example.com',
    date: '2024-01-24T13:20:00',
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'upi',
    paymentGateway: 'razorpay',
    transactionId: 'pay_ABCDEFGHIJ',
    total: 49.97,
    currency: 'USD',
    region: 'North America',
    items: [
      { productId: 'web-hosting', productName: 'Web Hosting - Professional', quantity: 1, price: 5.99, billingCycle: 'monthly' },
      { productId: 'email-hosting', productName: 'Email Hosting - Business', quantity: 1, price: 3.99, billingCycle: 'monthly' },
      { productId: 'ssl-certificates', productName: 'SSL Certificates - Wildcard SSL', quantity: 1, price: 39.99, billingCycle: 'yearly' }
    ]
  },
  {
    id: 'ORD-240008',
    userId: '1',
    shopperId: 'SHP-001',
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    date: '2024-01-25T10:00:00',
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    paymentGateway: 'stripe',
    transactionId: 'txn_QWERTYUIOP',
    total: 64.00,
    currency: 'USD',
    region: 'North America',
    items: [
      { productId: 'cloud-servers', productName: 'Cloud Servers - Performance', quantity: 1, price: 64, billingCycle: 'monthly' }
    ]
  }
];

// Sample payment transactions
export const samplePaymentTransactions = [
  {
    id: 'PAY-001',
    orderId: 'ORD-240001',
    userId: '1',
    shopperId: 'SHP-001',
    customerName: 'John Smith',
    amount: 47.97,
    currency: 'USD',
    paymentMethod: 'card',
    gateway: 'stripe',
    transactionId: 'txn_1234567890',
    status: 'succeeded',
    cardBrand: 'visa',
    cardLast4: '4242',
    metadata: { receiptUrl: 'https://pay.stripe.com/receipt/1234' },
    createdAt: '2024-01-15T10:32:00'
  },
  {
    id: 'PAY-002',
    orderId: 'ORD-240002',
    userId: '2',
    shopperId: 'SHP-002',
    customerName: 'Sarah Johnson',
    amount: 32.00,
    currency: 'USD',
    paymentMethod: 'paypal',
    gateway: 'paypal',
    transactionId: 'PAY-1234567890',
    status: 'succeeded',
    cardBrand: null,
    cardLast4: null,
    metadata: { payerEmail: 'sarah@paypal.com' },
    createdAt: '2024-01-18T14:22:00'
  },
  {
    id: 'PAY-003',
    orderId: 'ORD-240004',
    userId: '4',
    shopperId: 'SHP-004',
    customerName: 'Emily Brown',
    amount: 149.99,
    currency: 'USD',
    paymentMethod: 'card',
    gateway: 'stripe',
    transactionId: 'txn_failed_123',
    status: 'failed',
    cardBrand: 'mastercard',
    cardLast4: '5555',
    metadata: { failureReason: 'Card declined' },
    createdAt: '2024-01-21T16:47:00'
  },
  {
    id: 'PAY-004',
    orderId: 'ORD-240005',
    userId: '5',
    shopperId: 'SHP-005',
    customerName: 'David Lee',
    amount: 39.99,
    currency: 'USD',
    paymentMethod: 'paypal',
    gateway: 'paypal',
    transactionId: 'PAY-9876543210',
    status: 'refunded',
    cardBrand: null,
    cardLast4: null,
    metadata: { refundReason: 'Customer request', refundedAt: '2024-01-23T12:00:00' },
    createdAt: '2024-01-22T11:32:00'
  },
  {
    id: 'PAY-005',
    orderId: 'ORD-240006',
    userId: '6',
    shopperId: 'SHP-006',
    customerName: 'Lisa Chen',
    amount: 24.98,
    currency: 'USD',
    paymentMethod: 'card',
    gateway: 'stripe',
    transactionId: 'txn_0987654321',
    status: 'succeeded',
    cardBrand: 'visa',
    cardLast4: '1234',
    metadata: {},
    createdAt: '2024-01-23T08:02:00'
  },
  {
    id: 'PAY-006',
    orderId: 'ORD-240007',
    userId: '7',
    shopperId: 'SHP-007',
    customerName: 'James Taylor',
    amount: 49.97,
    currency: 'USD',
    paymentMethod: 'upi',
    gateway: 'razorpay',
    transactionId: 'pay_ABCDEFGHIJ',
    status: 'succeeded',
    cardBrand: null,
    cardLast4: null,
    metadata: { upiId: 'james@upi' },
    createdAt: '2024-01-24T13:22:00'
  },
  {
    id: 'PAY-007',
    orderId: 'ORD-240008',
    userId: '1',
    shopperId: 'SHP-001',
    customerName: 'John Smith',
    amount: 64.00,
    currency: 'USD',
    paymentMethod: 'card',
    gateway: 'stripe',
    transactionId: 'txn_QWERTYUIOP',
    status: 'succeeded',
    cardBrand: 'amex',
    cardLast4: '0001',
    metadata: {},
    createdAt: '2024-01-25T10:02:00'
  }
];

// Sample email logs
export const sampleEmailLogs = [
  {
    id: 'EMAIL-001',
    userId: '1',
    shopperId: 'SHP-001',
    recipient: 'john@example.com',
    emailType: 'order_confirmation',
    subject: 'Order Confirmation - ORD-240001',
    status: 'delivered',
    sentAt: '2024-01-15T10:35:00',
    error: null
  },
  {
    id: 'EMAIL-002',
    userId: '1',
    shopperId: 'SHP-001',
    recipient: 'john@example.com',
    emailType: 'payment_success',
    subject: 'Payment Received - $47.97',
    status: 'delivered',
    sentAt: '2024-01-15T10:36:00',
    error: null
  },
  {
    id: 'EMAIL-003',
    userId: '1',
    shopperId: 'SHP-001',
    recipient: 'john@example.com',
    emailType: 'subscription_activation',
    subject: 'Your Subscription is Now Active',
    status: 'delivered',
    sentAt: '2024-01-15T10:37:00',
    error: null
  },
  {
    id: 'EMAIL-004',
    userId: '2',
    shopperId: 'SHP-002',
    recipient: 'sarah@example.com',
    emailType: 'order_confirmation',
    subject: 'Order Confirmation - ORD-240002',
    status: 'delivered',
    sentAt: '2024-01-18T14:25:00',
    error: null
  },
  {
    id: 'EMAIL-005',
    userId: '4',
    shopperId: 'SHP-004',
    recipient: 'emily@example.com',
    emailType: 'payment_failure',
    subject: 'Payment Failed - Action Required',
    status: 'delivered',
    sentAt: '2024-01-21T16:50:00',
    error: null
  },
  {
    id: 'EMAIL-006',
    userId: '5',
    shopperId: 'SHP-005',
    recipient: 'david@example.com',
    emailType: 'refund_confirmation',
    subject: 'Refund Processed - $39.99',
    status: 'delivered',
    sentAt: '2024-01-23T12:05:00',
    error: null
  },
  {
    id: 'EMAIL-007',
    userId: '3',
    shopperId: 'SHP-003',
    recipient: 'mike@example.com',
    emailType: 'subscription_expiry_reminder',
    subject: 'Your Subscription Expires in 7 Days',
    status: 'delivered',
    sentAt: '2024-01-20T09:00:00',
    error: null
  },
  {
    id: 'EMAIL-008',
    userId: '3',
    shopperId: 'SHP-003',
    recipient: 'mike@example.com',
    emailType: 'suspension_notice',
    subject: 'Account Suspended',
    status: 'delivered',
    sentAt: '2024-01-22T10:00:00',
    error: null
  },
  {
    id: 'EMAIL-009',
    userId: '6',
    shopperId: 'SHP-006',
    recipient: 'lisa@example.com',
    emailType: 'welcome',
    subject: 'Welcome to CloudHost!',
    status: 'failed',
    sentAt: '2024-01-23T07:55:00',
    error: 'SMTP connection timeout'
  },
  {
    id: 'EMAIL-010',
    userId: '7',
    shopperId: 'SHP-007',
    recipient: 'james@example.com',
    emailType: 'password_reset',
    subject: 'Reset Your Password',
    status: 'delivered',
    sentAt: '2024-01-24T12:00:00',
    error: null
  }
];

// Sample SMS logs
export const sampleSMSLogs = [
  {
    id: 'SMS-001',
    userId: '1',
    shopperId: 'SHP-001',
    phoneNumber: '+1234567890',
    message: 'Your CloudHost OTP is 123456. Valid for 10 minutes.',
    type: '2fa_otp',
    status: 'delivered',
    sentAt: '2024-01-15T10:28:00',
    error: null
  },
  {
    id: 'SMS-002',
    userId: '4',
    shopperId: 'SHP-004',
    phoneNumber: '+1987654321',
    message: 'ALERT: Payment failed for Order ORD-240004. Please update payment method.',
    type: 'payment_failure',
    status: 'delivered',
    sentAt: '2024-01-21T16:48:00',
    error: null
  },
  {
    id: 'SMS-003',
    userId: '3',
    shopperId: 'SHP-003',
    phoneNumber: '+1555555555',
    message: 'URGENT: Your CloudHost account has been suspended. Contact support.',
    type: 'suspension_alert',
    status: 'delivered',
    sentAt: '2024-01-22T10:01:00',
    error: null
  },
  {
    id: 'SMS-004',
    userId: '2',
    shopperId: 'SHP-002',
    phoneNumber: '+1444444444',
    message: 'Your CloudHost OTP is 789012. Valid for 10 minutes.',
    type: '2fa_otp',
    status: 'failed',
    sentAt: '2024-01-18T14:18:00',
    error: 'Invalid phone number format'
  },
  {
    id: 'SMS-005',
    userId: '5',
    shopperId: 'SHP-005',
    phoneNumber: '+1666666666',
    message: 'Refund of $39.99 processed for Order ORD-240005. Check your account.',
    type: 'refund_alert',
    status: 'delivered',
    sentAt: '2024-01-23T12:06:00',
    error: null
  }
];

// Email types configuration
export const emailTypes = [
  { value: 'welcome', label: 'Welcome Email' },
  { value: 'email_verification', label: 'Email Verification' },
  { value: '2fa_otp', label: '2FA OTP' },
  { value: 'password_reset', label: 'Password Reset' },
  { value: 'order_confirmation', label: 'Order Confirmation' },
  { value: 'payment_success', label: 'Payment Success' },
  { value: 'payment_failure', label: 'Payment Failure' },
  { value: 'subscription_activation', label: 'Subscription Activation' },
  { value: 'subscription_expiry_reminder', label: 'Expiry Reminder' },
  { value: 'suspension_notice', label: 'Suspension Notice' },
  { value: 'renewal_confirmation', label: 'Renewal Confirmation' },
  { value: 'cancellation_confirmation', label: 'Cancellation' },
  { value: 'refund_confirmation', label: 'Refund Confirmation' },
  { value: 'profile_update', label: 'Profile Update' }
];

// Payment gateways configuration
export const paymentGateways = [
  { 
    id: 'stripe', 
    name: 'Stripe', 
    icon: 'CreditCard',
    description: 'Pay with credit/debit card',
    methods: ['card'],
    supportedCards: ['visa', 'mastercard', 'amex', 'discover']
  },
  { 
    id: 'paypal', 
    name: 'PayPal', 
    icon: 'Wallet',
    description: 'Pay with your PayPal account',
    methods: ['paypal']
  },
  { 
    id: 'razorpay', 
    name: 'Razorpay', 
    icon: 'Smartphone',
    description: 'UPI, Cards, Net Banking & more',
    methods: ['card', 'upi', 'netbanking', 'wallet']
  }
];

// Order status configuration
export const orderStatuses = [
  { value: 'pending', label: 'Pending', color: 'bg-warning/20 text-warning' },
  { value: 'processing', label: 'Processing', color: 'bg-primary/20 text-primary' },
  { value: 'completed', label: 'Completed', color: 'bg-success/20 text-success' },
  { value: 'failed', label: 'Failed', color: 'bg-destructive/20 text-destructive' },
  { value: 'refunded', label: 'Refunded', color: 'bg-muted text-muted-foreground' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-destructive/20 text-destructive' }
];

// Payment status configuration
export const paymentStatuses = [
  { value: 'pending', label: 'Pending', color: 'bg-warning/20 text-warning' },
  { value: 'paid', label: 'Paid', color: 'bg-success/20 text-success' },
  { value: 'failed', label: 'Failed', color: 'bg-destructive/20 text-destructive' },
  { value: 'refunded', label: 'Refunded', color: 'bg-muted text-muted-foreground' }
];
