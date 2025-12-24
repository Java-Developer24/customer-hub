// Centralized CloudHost product data for syncing across all pages
// This ensures consistent product names, pricing, and details everywhere

export const cloudHostProducts = [
  {
    id: 'web-hosting',
    name: 'Web Hosting',
    shortName: 'Hosting',
    description: 'Fast, reliable hosting for any website',
    icon: 'Server',
    gradient: 'from-primary/20 to-emerald-500/20',
    features: ['Free SSL', '1-Click Install', '24/7 Support'],
    plans: [
      { name: 'Starter', price: { monthly: 4.99, yearly: 2.99 }, popular: false },
      { name: 'Professional', price: { monthly: 9.99, yearly: 5.99 }, popular: true },
      { name: 'Business', price: { monthly: 19.99, yearly: 12.99 }, popular: false },
    ]
  },
  {
    id: 'cloud-servers',
    name: 'Cloud Servers',
    shortName: 'Cloud',
    description: 'Scalable cloud infrastructure',
    icon: 'Cloud',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    features: ['Auto Scaling', 'SSD Storage', 'Root Access'],
    plans: [
      { name: 'Basic', price: { monthly: 10, yearly: 8 }, popular: false },
      { name: 'Standard', price: { monthly: 40, yearly: 32 }, popular: true },
      { name: 'Performance', price: { monthly: 80, yearly: 64 }, popular: false },
    ]
  },
  {
    id: 'domain-names',
    name: 'Domain Names',
    shortName: 'Domain',
    description: 'Find your perfect domain',
    icon: 'Globe',
    gradient: 'from-purple-500/20 to-pink-500/20',
    features: ['Free Privacy', 'Easy Transfer', 'DNS Management'],
    plans: [
      { name: '.com', price: { monthly: 12.99, yearly: 9.99 }, popular: true },
      { name: '.net', price: { monthly: 14.99, yearly: 11.99 }, popular: false },
      { name: '.org', price: { monthly: 13.99, yearly: 10.99 }, popular: false },
    ]
  },
  {
    id: 'email-hosting',
    name: 'Email Hosting',
    shortName: 'Email',
    description: 'Professional email solutions',
    icon: 'Mail',
    gradient: 'from-orange-500/20 to-yellow-500/20',
    features: ['Custom Domain', 'Mobile Sync', 'Spam Protection'],
    plans: [
      { name: 'Basic', price: { monthly: 2.99, yearly: 1.99 }, popular: false },
      { name: 'Business', price: { monthly: 5.99, yearly: 3.99 }, popular: true },
      { name: 'Enterprise', price: { monthly: 9.99, yearly: 7.99 }, popular: false },
    ]
  },
  {
    id: 'ssl-certificates',
    name: 'SSL Certificates',
    shortName: 'SSL',
    description: 'Secure your website',
    icon: 'Lock',
    gradient: 'from-green-500/20 to-emerald-500/20',
    features: ['Auto Renewal', 'Trust Badges', 'Quick Install'],
    plans: [
      { name: 'Domain SSL', price: { monthly: 4.99, yearly: 2.99 }, popular: false },
      { name: 'Wildcard SSL', price: { monthly: 49.99, yearly: 39.99 }, popular: true },
      { name: 'EV SSL', price: { monthly: 99.99, yearly: 79.99 }, popular: false },
    ]
  },
  {
    id: 'website-builder',
    name: 'Website Builder',
    shortName: 'Builder',
    description: 'Build without coding',
    icon: 'Palette',
    gradient: 'from-pink-500/20 to-rose-500/20',
    features: ['Drag & Drop', '200+ Templates', 'Mobile Ready'],
    plans: [
      { name: 'Personal', price: { monthly: 9.99, yearly: 7.99 }, popular: false },
      { name: 'Business', price: { monthly: 19.99, yearly: 14.99 }, popular: true },
      { name: 'Agency', price: { monthly: 49.99, yearly: 39.99 }, popular: false },
    ]
  },
  {
    id: 'seo-tools',
    name: 'SEO Tools',
    shortName: 'SEO',
    description: 'Rank higher on search',
    icon: 'Search',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    features: ['Keyword Research', 'Site Audit', 'Rank Tracking'],
    plans: [
      { name: 'Starter', price: { monthly: 29.99, yearly: 24.99 }, popular: false },
      { name: 'Professional', price: { monthly: 79.99, yearly: 59.99 }, popular: true },
      { name: 'Agency', price: { monthly: 149.99, yearly: 119.99 }, popular: false },
    ]
  },
  {
    id: 'vps-hosting',
    name: 'VPS Hosting',
    shortName: 'VPS',
    description: 'Virtual private servers',
    icon: 'Monitor',
    gradient: 'from-slate-500/20 to-zinc-500/20',
    features: ['Full Control', 'Dedicated IP', 'Managed Options'],
    plans: [
      { name: 'Basic', price: { monthly: 19.99, yearly: 15.99 }, popular: false },
      { name: 'Standard', price: { monthly: 49.99, yearly: 39.99 }, popular: true },
      { name: 'Premium', price: { monthly: 99.99, yearly: 79.99 }, popular: false },
    ]
  },
];

// Sample user products (for dashboard display)
export const sampleUserProducts = [
  { 
    id: 1, 
    productId: 'web-hosting',
    name: 'Web Hosting - Professional', 
    description: 'Fast, reliable hosting with unlimited websites',
    price: 5.99, 
    period: 'monthly', 
    status: 'active', 
    expiresAt: '2024-03-15', 
    features: ['Unlimited Websites', '50GB SSD Storage', 'Free SSL', 'Daily Backups'] 
  },
  { 
    id: 2, 
    productId: 'cloud-servers',
    name: 'Cloud Servers - Standard', 
    description: 'High-performance cloud infrastructure',
    price: 32, 
    period: 'monthly', 
    status: 'active', 
    expiresAt: '2024-02-28', 
    features: ['4 vCPU', '8GB RAM', '200GB NVMe', 'Free Backups'] 
  },
  { 
    id: 3, 
    productId: 'ssl-certificates',
    name: 'SSL Certificates - Wildcard SSL', 
    description: 'Secure all your subdomains',
    price: 39.99, 
    period: 'yearly', 
    status: 'expiring', 
    expiresAt: '2024-01-20', 
    features: ['Unlimited Subdomains', 'Domain Validation', '256-bit Encryption'] 
  },
  { 
    id: 4, 
    productId: 'email-hosting',
    name: 'Email Hosting - Business', 
    description: 'Professional email with your domain',
    price: 3.99, 
    period: 'monthly', 
    status: 'active', 
    expiresAt: '2024-04-10', 
    features: ['25GB Storage', '10 Email Accounts', 'Calendar & Contacts'] 
  },
];

// Sample user orders
export const sampleUserOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 47.97,
    items: [
      { name: 'Web Hosting - Professional', quantity: 1, price: 5.99, image: '/placeholder.svg' },
      { name: 'SSL Certificates - Wildcard SSL', quantity: 1, price: 39.99, image: '/placeholder.svg' },
      { name: 'Domain Names - .com', quantity: 1, price: 1.99, image: '/placeholder.svg' }
    ],
    payment: { method: 'Credit Card', last4: '4242' },
    tracking: [
      { status: 'Order Placed', date: '2024-01-15 10:30', completed: true },
      { status: 'Payment Confirmed', date: '2024-01-15 10:32', completed: true },
      { status: 'Processing', date: '2024-01-15 11:00', completed: true },
      { status: 'Activated', date: '2024-01-15 11:15', completed: true },
      { status: 'Delivered', date: '2024-01-15 11:20', completed: true }
    ]
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'processing',
    total: 32,
    items: [
      { name: 'Cloud Servers - Standard', quantity: 1, price: 32, image: '/placeholder.svg' }
    ],
    payment: { method: 'PayPal', last4: null },
    tracking: [
      { status: 'Order Placed', date: '2024-01-20 14:00', completed: true },
      { status: 'Payment Confirmed', date: '2024-01-20 14:05', completed: true },
      { status: 'Configuring Server', date: '2024-01-20 14:30', completed: true },
      { status: 'Ready', date: null, completed: false }
    ]
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-22',
    status: 'pending',
    total: 3.99,
    items: [
      { name: 'Email Hosting - Business', quantity: 1, price: 3.99, image: '/placeholder.svg' }
    ],
    payment: { method: 'Credit Card', last4: '1234' },
    tracking: [
      { status: 'Order Placed', date: '2024-01-22 09:00', completed: true },
      { status: 'Awaiting Payment', date: null, completed: false },
      { status: 'Processing', date: null, completed: false },
      { status: 'Activated', date: null, completed: false }
    ]
  }
];

// Sample subscriptions
export const sampleSubscriptions = [
  { id: 1, product: 'Web Hosting - Professional', productId: 'web-hosting', nextBilling: '2024-03-15', amount: 5.99, status: 'active', autoRenew: true },
  { id: 2, product: 'Cloud Servers - Standard', productId: 'cloud-servers', nextBilling: '2024-02-28', amount: 32, status: 'active', autoRenew: true },
  { id: 3, product: 'SSL Certificates - Wildcard SSL', productId: 'ssl-certificates', nextBilling: '2024-01-20', amount: 39.99, status: 'expiring', autoRenew: false },
  { id: 4, product: 'Email Hosting - Business', productId: 'email-hosting', nextBilling: '2024-04-10', amount: 3.99, status: 'active', autoRenew: true },
];

// Admin products (all available services)
export const adminProducts = [
  { id: 1, name: 'Web Hosting - Starter', productId: 'web-hosting', description: 'Basic hosting for single websites', price: 2.99, period: 'monthly', status: 'active', regions: ['Global'], customers: 412 },
  { id: 2, name: 'Web Hosting - Professional', productId: 'web-hosting', description: 'Unlimited websites with more storage', price: 5.99, period: 'monthly', status: 'active', regions: ['Global'], customers: 234 },
  { id: 3, name: 'Web Hosting - Business', productId: 'web-hosting', description: 'Enterprise hosting with dedicated support', price: 12.99, period: 'monthly', status: 'active', regions: ['Global'], customers: 89 },
  { id: 4, name: 'Cloud Servers - Basic', productId: 'cloud-servers', description: 'Entry-level cloud server', price: 8, period: 'monthly', status: 'active', regions: ['North America', 'Europe'], customers: 156 },
  { id: 5, name: 'Cloud Servers - Standard', productId: 'cloud-servers', description: 'Most popular cloud server', price: 32, period: 'monthly', status: 'active', regions: ['Global'], customers: 189 },
  { id: 6, name: 'Cloud Servers - Performance', productId: 'cloud-servers', description: 'High-performance cloud infrastructure', price: 64, period: 'monthly', status: 'active', regions: ['Global'], customers: 67 },
  { id: 7, name: 'Domain Names - .com', productId: 'domain-names', description: 'Most popular domain extension', price: 9.99, period: 'yearly', status: 'active', regions: ['Global'], customers: 567 },
  { id: 8, name: 'Email Hosting - Business', productId: 'email-hosting', description: 'Professional email solution', price: 3.99, period: 'monthly', status: 'active', regions: ['Global'], customers: 312 },
  { id: 9, name: 'SSL Certificates - Wildcard SSL', productId: 'ssl-certificates', description: 'Secure all subdomains', price: 39.99, period: 'yearly', status: 'active', regions: ['Global'], customers: 245 },
  { id: 10, name: 'Website Builder - Business', productId: 'website-builder', description: 'Drag & drop website builder', price: 14.99, period: 'monthly', status: 'active', regions: ['Global'], customers: 178 },
  { id: 11, name: 'SEO Tools - Professional', productId: 'seo-tools', description: 'Complete SEO toolkit', price: 59.99, period: 'monthly', status: 'active', regions: ['Global'], customers: 98 },
  { id: 12, name: 'VPS Hosting - Standard', productId: 'vps-hosting', description: 'Virtual private server', price: 39.99, period: 'monthly', status: 'active', regions: ['North America', 'Europe', 'Asia Pacific'], customers: 134 },
];

// Admin customers with CloudHost products
export const adminCustomers = [
  { id: 1, name: 'John Smith', email: 'john@example.com', status: 'active', products: ['Web Hosting - Professional', 'SSL Certificates - Wildcard SSL'], spent: '$289', joined: '2023-06-15', region: 'North America' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'active', products: ['Cloud Servers - Standard', 'Domain Names - .com'], spent: '$456', joined: '2023-08-22', region: 'Europe' },
  { id: 3, name: 'Mike Wilson', email: 'mike@example.com', status: 'suspended', products: ['Email Hosting - Business'], spent: '$48', joined: '2023-09-10', region: 'Asia Pacific' },
  { id: 4, name: 'Emily Brown', email: 'emily@example.com', status: 'active', products: ['Web Hosting - Business', 'Cloud Servers - Performance', 'SEO Tools - Professional'], spent: '$1,599', joined: '2023-04-05', region: 'North America' },
  { id: 5, name: 'David Lee', email: 'david@example.com', status: 'pending', products: ['VPS Hosting - Standard'], spent: '$40', joined: '2024-01-02', region: 'Europe' },
  { id: 6, name: 'Lisa Chen', email: 'lisa@example.com', status: 'active', products: ['Website Builder - Business', 'Domain Names - .com'], spent: '$189', joined: '2023-11-18', region: 'Asia Pacific' },
  { id: 7, name: 'James Taylor', email: 'james@example.com', status: 'active', products: ['Web Hosting - Professional', 'Email Hosting - Business', 'SSL Certificates - Wildcard SSL'], spent: '$599', joined: '2023-07-30', region: 'North America' },
  { id: 8, name: 'Anna White', email: 'anna@example.com', status: 'suspended', products: [], spent: '$0', joined: '2024-01-10', region: 'Europe' },
];

export default cloudHostProducts;
