# Membership Modal Component

## Overview
Modal component for membership subscription with integrated checkout flow.

## Features

### 1. Package Selection
- 3 main packages: أمان (Basic), أمان بلس (Plus), أمان VIP (VIP)
- Clear pricing and features comparison
- Recommended package highlighting
- Responsive grid layout

### 2. Checkout Flow
- Two-step process: Package Selection → Payment Method
- Selected package summary
- Multiple payment options:
  - Credit/Debit Cards (Visa, Mastercard, Mada)
  - Tabby (4 installments)
  - Tamara (3 installments)

### 3. Payment Methods Integration
- **Credit Card**: Direct payment with Visa/Mastercard/Mada
- **Tabby**: Split into 4 payments (every 2 weeks) with no interest
- **Tamara**: Split into 3 payments (monthly) with no interest

### 4. UX Best Practices
- Smooth animations with Framer Motion
- Clear visual hierarchy
- Mobile-responsive design
- Accessible with ARIA labels
- Back navigation support
- Disabled state for incomplete selections

## Usage

```tsx
import { MembershipModal } from '@/components/membership';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Membership
      </button>
      
      <MembershipModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}
```

## Integration with Floating Buttons

The membership modal is integrated into the floating action buttons:
- **Top**: Membership button (amber/orange gradient)
- **Middle**: Omniya chatbot
- **Bottom**: WhatsApp contact

## Payment Icons

The component uses the following payment icons:
- `/Tabby-01.png` - Tabby logo
- `/Tamara.png` - Tamara logo
- `/images/badges/visa.png` - Visa logo (placeholder)
- `/images/badges/mastercard.png` - Mastercard logo (placeholder)

## TODO

- [ ] Implement actual payment gateway integration
- [ ] Add form validation for user details
- [ ] Connect to backend API for order processing
- [ ] Add success/error states
- [ ] Implement analytics tracking
- [ ] Add loading states during checkout
- [ ] Store selected package in user session

## Customization

### Modify Packages
Edit the `packages` array in `MembershipModal.tsx`:

```tsx
const packages: Package[] = [
  {
    id: 'basic',
    name: 'أمان',
    price: 199,
    // ... other properties
  },
  // Add more packages
];
```

### Styling
The component uses Tailwind CSS classes. Key color schemes:
- Primary: `emerald-600` (green)
- Membership button: `amber-500` to `orange-600` gradient
- Recommended package: `emerald-50` background

## Accessibility

- Keyboard navigation support
- ARIA labels for screen readers
- Focus management
- Escape key to close modal
- Click outside to close
