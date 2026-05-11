# 🔐 Admin Panel Guide - Growzix Natural

## Admin Access

**Login URL:** http://localhost:3000/admin/login

**Default Credentials:**
- Email: `admin@growzix.com`
- Password: `Admin@1234`

## Admin Features

### 📊 Overview Dashboard
- **Total Orders** - View all orders count
- **Pending Orders** - Orders waiting for confirmation
- **Total Customers** - Registered customers count
- **Total Products** - Product inventory count
- **Recent Orders** - Latest 5 orders with quick view

### 📦 Orders Management
**Features:**
- View all customer orders with complete details
- Order information includes:
  - Order ID and timestamp
  - Customer name, phone, email
  - Delivery address
  - Payment method
  - Order items with quantities and prices
  - Order total
  - Current status

**Actions:**
- ✅ **Confirm Order** - Mark order as confirmed
- 🚚 **Ship Order** - Mark order as shipping
- 🗑️ **Delete Order** - Remove order from system

**Order Status:**
- 🟠 Pending - New order, awaiting confirmation
- 🔵 Confirmed - Order confirmed by admin
- 🟣 Shipping - Order is being shipped
- 🟢 Delivered - Order delivered to customer
- 🔴 Cancelled - Order cancelled

### 📦 Products Management
**Features:**
- View all products with details:
  - Product image
  - Title and category
  - Price
  - Stock quantity
  - Rating and reviews count

**Note:** Product editing can be done by modifying `lib/products.ts` file

### 👥 Customers Management
**Features:**
- View all registered customers
- Customer information:
  - Name
  - Email address
  - Registration date

### 🎁 Offers Management
**Create New Offers:**
1. Enter offer title (e.g., "Summer Sale")
2. Write description
3. Add discount details (e.g., "30% OFF")
4. Click "Create Offer"

**Send Offers:**
- Click "Send to Customers" button
- Opens email client with all customer emails in BCC
- Offer details pre-filled in email body

**Manage Offers:**
- View all created offers
- See how many customers received each offer
- Delete offers when expired

### ⚙️ Settings Management
**Configure:**
- **WhatsApp Number** - For receiving orders (format: 923001234567)
- **Contact Phone** - Display on website
- **Contact Email** - Display on website
- **Contact Address** - Display on website
- **Social Media Links:**
  - Facebook URL
  - Twitter URL
  - Instagram URL

**Save Settings** - Click to save all changes

## Admin Panel Navigation

```
Admin Panel
├── Overview        - Dashboard with stats and recent orders
├── Orders (N)      - All orders with pending count badge
├── Products        - Product inventory listing
├── Customers       - Registered customers list
├── Offers          - Create and manage promotional offers
└── Settings        - Site configuration
```

## Security Features

- ✅ Protected routes - Redirects to login if not authenticated
- ✅ Admin-only access - Separate from customer accounts
- ✅ Logout functionality - Secure session management
- ✅ Password hidden by default with toggle visibility

## Order Workflow

1. **Customer places order** → Status: Pending
2. **Admin confirms order** → Status: Confirmed
3. **Admin ships order** → Status: Shipping
4. **Order delivered** → Status: Delivered

## WhatsApp Integration

When customer places order:
1. Order details automatically sent to admin's WhatsApp
2. Includes customer info, items, total, payment method
3. Admin can contact customer directly via WhatsApp

## Tips for Admins

1. **Check pending orders daily** - Badge shows count on Orders tab
2. **Confirm orders quickly** - Improves customer satisfaction
3. **Update order status** - Keep customers informed
4. **Create regular offers** - Boost sales with promotions
5. **Keep settings updated** - Ensure contact info is current

## Keyboard Shortcuts

- `Tab` - Navigate between tabs
- `Enter` - Submit forms
- `Esc` - Close modals/dialogs

## Mobile Access

Admin panel is fully responsive and works on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers

## Support

For admin panel issues or questions:
- Email: admin@growzix.com
- Check browser console for errors
- Ensure JavaScript is enabled

---

**Admin Panel Version:** 1.0.0  
**Last Updated:** May 2026
