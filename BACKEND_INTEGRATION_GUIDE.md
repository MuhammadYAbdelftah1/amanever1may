# Backend Integration Guide - Policy Forms

## Overview
This guide provides technical specifications for integrating the two policy forms with backend APIs.

---

## 1. Account Deletion Request API

### Endpoint
```
POST /api/account/deletion-request
```

### Request Body
```typescript
interface AccountDeletionRequest {
  email: string;           // Required - registered email
  phone: string;           // Required - registered phone
  reason?: string;         // Optional - one of predefined options
  feedback?: string;       // Optional - additional comments
  confirmation: boolean;   // Required - must be true
}
```

### Validation Rules
```typescript
{
  email: {
    required: true,
    format: "email",
    mustMatchAccount: true
  },
  phone: {
    required: true,
    format: "saudi_mobile", // 05xxxxxxxx
    mustMatchAccount: true
  },
  reason: {
    required: false,
    enum: [
      "لم أعد أستخدم الخدمة",
      "مخاوف تتعلق بالخصوصية",
      "وجدت بديلاً أفضل",
      "تجربة سيئة مع الخدمة",
      "أسباب شخصية",
      "أخرى"
    ]
  },
  feedback: {
    required: false,
    maxLength: 1000
  },
  confirmation: {
    required: true,
    mustBeTrue: true
  }
}
```

### Business Logic Checks
```typescript
// Before accepting the request, check:
1. Account exists and is active
2. No active subscriptions (or auto-cancel them)
3. No pending financial transactions
4. No ongoing legal investigations
5. No future bookings (or auto-cancel them)
```

### Response
```typescript
// Success (200)
{
  success: true,
  requestId: "DEL-2026-XXXXX",
  message: "تم استلام طلبك بنجاح. ستصلك رسالة تأكيد خلال 24 ساعة.",
  cancellationDeadline: "2026-04-27T12:00:00+03:00", // 48 hours
  processingTime: "7-14 يوم عمل"
}

// Error (400)
{
  success: false,
  error: "ACTIVE_SUBSCRIPTION",
  message: "لديك اشتراك نشط. يجب إلغاؤه أولاً.",
  details: {
    subscriptionId: "SUB-123",
    expiryDate: "2026-12-31"
  }
}

// Error (404)
{
  success: false,
  error: "ACCOUNT_NOT_FOUND",
  message: "لم نتمكن من العثور على حساب بهذا البريد الإلكتروني ورقم الهاتف."
}
```

### Email Notifications
```typescript
// 1. Confirmation Email (within 24 hours)
{
  to: user.email,
  subject: "تأكيد طلب حذف الحساب - أمان إيفر",
  template: "account-deletion-confirmation",
  data: {
    requestId: "DEL-2026-XXXXX",
    cancellationLink: "https://amanever.com/ar/cancel-deletion?token=...",
    cancellationDeadline: "27 أبريل 2026، 12:00 م"
  }
}

// 2. Processing Started (after 48 hours if not cancelled)
{
  subject: "بدأنا معالجة طلب حذف حسابك",
  estimatedCompletion: "10 مايو 2026"
}

// 3. Deletion Complete
{
  subject: "تم حذف حسابك بنجاح",
  message: "تم حذف جميع بياناتك الشخصية. شكراً لاستخدامك أمان إيفر."
}
```

### Database Schema
```sql
CREATE TABLE account_deletion_requests (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  request_id VARCHAR(50) UNIQUE NOT NULL,
  user_id BIGINT NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  reason VARCHAR(100),
  feedback TEXT,
  status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cancellation_deadline TIMESTAMP,
  processed_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  cancelled_at TIMESTAMP NULL,
  cancellation_reason TEXT,
  processed_by BIGINT NULL, -- admin user ID
  
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_requested_at (requested_at),
  
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Data Retention After Deletion
```typescript
// Keep for legal compliance (anonymized)
{
  financial_records: "10 years", // Tax authority requirement
  medical_records: "10 years",   // MOH requirement
  security_logs: "12 months",    // Security investigations
  
  // Anonymization process:
  // - Replace name with "Deleted User [ID]"
  // - Remove email, phone, address
  // - Keep transaction amounts and dates
  // - Keep medical records with anonymized patient ID
}
```

---

## 2. Refund Request API

### Endpoint
```
POST /api/refunds/request
```

### Request Body
```typescript
interface RefundRequest {
  email: string;              // Required
  phone: string;              // Required
  transactionId: string;      // Required - INV-2026-XXXXX
  serviceType: string;        // Required - enum
  refundReason: string;       // Required - enum
  refundDetails: string;      // Required - detailed explanation
  transactionDate: string;    // Required - ISO date
  amount: number;             // Required - positive number
  paymentMethod: string;      // Required - enum
  attachments?: File[];       // Optional - max 5 files, 10MB each
  bankIban?: string;          // Optional - for bank transfer fallback
  consent: boolean;           // Required - must be true
}
```

### Validation Rules
```typescript
{
  email: {
    required: true,
    format: "email",
    mustMatchAccount: true
  },
  phone: {
    required: true,
    format: "saudi_mobile",
    mustMatchAccount: true
  },
  transactionId: {
    required: true,
    pattern: /^INV-\d{4}-[A-Z0-9]+$/,
    mustExist: true
  },
  serviceType: {
    required: true,
    enum: [
      "اشتراك بطاقة عضوية",
      "استشارة طبية",
      "خدمة رعاية منزلية",
      "حجز مستشفى أو مركز طبي",
      "نقاط مشتراة",
      "أخرى"
    ]
  },
  refundReason: {
    required: true,
    enum: [
      "لم أستخدم الخدمة بعد",
      "الخدمة لم تُقدم كما وُعد",
      "مشكلة تقنية منعتني من الاستخدام",
      "الطبيب لم يحضر للاستشارة",
      "إلغاء الحجز قبل الموعد",
      "خطأ في الدفع (دفعت مرتين)",
      "خصم لم يُطبق",
      "أسباب صحية طارئة",
      "أخرى"
    ]
  },
  refundDetails: {
    required: true,
    minLength: 20,
    maxLength: 2000
  },
  transactionDate: {
    required: true,
    format: "date",
    maxAge: "12 months" // Can't refund transactions older than 1 year
  },
  amount: {
    required: true,
    type: "number",
    min: 0.01,
    mustMatchTransaction: true
  },
  paymentMethod: {
    required: true,
    enum: ["مدى", "Visa", "Mastercard", "Apple Pay", "تابي", "تمارا", "تحويل بنكي"]
  },
  attachments: {
    required: false,
    maxFiles: 5,
    maxSizePerFile: 10 * 1024 * 1024, // 10MB
    allowedTypes: ["image/jpeg", "image/png", "image/gif", "application/pdf"]
  },
  bankIban: {
    required: false,
    pattern: /^SA\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
    requiredIf: "paymentMethod === 'تحويل بنكي' || originalPaymentMethodUnavailable"
  },
  consent: {
    required: true,
    mustBeTrue: true
  }
}
```

### Business Logic Checks
```typescript
// Eligibility checks based on service type and refund policy

// 1. Subscription
if (serviceType === "اشتراك بطاقة عضوية") {
  const daysSincePurchase = calculateDays(transactionDate, now);
  const servicesUsed = getServicesUsed(transactionId);
  const discountsReceived = getDiscountsReceived(transactionId);
  
  if (daysSincePurchase <= 14 && servicesUsed === 0 && discountsReceived === 0) {
    return { eligible: true, refundAmount: amount, refundPercentage: 100 };
  } else if (daysSincePurchase > 14) {
    const usedValue = calculateUsedValue(daysSincePurchase, servicesUsed, discountsReceived);
    const refundAmount = amount - usedValue;
    const refundPercentage = (refundAmount / amount) * 100;
    
    if (refundPercentage < 25) {
      return { eligible: false, reason: "قيمة الاسترداد أقل من 25%" };
    }
    return { eligible: true, refundAmount, refundPercentage };
  }
}

// 2. Consultation
if (serviceType === "استشارة طبية") {
  const consultationStatus = getConsultationStatus(transactionId);
  
  if (consultationStatus === "not_started") {
    return { eligible: true, refundAmount: amount, refundPercentage: 100 };
  } else if (consultationStatus === "started" && consultationDuration < 5) {
    // Check if doctor didn't show up
    if (doctorNoShow) {
      return { eligible: true, refundAmount: amount, refundPercentage: 100 };
    }
  }
  return { eligible: false, reason: "الاستشارة مكتملة" };
}

// 3. Home Care
if (serviceType === "خدمة رعاية منزلية") {
  const hoursUntilAppointment = calculateHours(appointmentTime, now);
  
  if (hoursUntilAppointment >= 24) {
    return { eligible: true, refundAmount: amount, refundPercentage: 100 };
  } else if (hoursUntilAppointment >= 4) {
    return { eligible: true, refundAmount: amount * 0.75, refundPercentage: 75 };
  }
  return { eligible: false, reason: "إلغاء متأخر (أقل من 4 ساعات)" };
}

// 4. Points
if (serviceType === "نقاط مشتراة") {
  const daysSincePurchase = calculateDays(transactionDate, now);
  const pointsUsed = getPointsUsed(transactionId);
  
  if (daysSincePurchase <= 7 && pointsUsed === 0) {
    return { eligible: true, refundAmount: amount, refundPercentage: 100 };
  }
  return { eligible: false, reason: "النقاط غير قابلة للاسترداد بعد 7 أيام أو عند الاستخدام" };
}
```

### Response
```typescript
// Success (200)
{
  success: true,
  requestId: "REF-2026-XXXXX",
  message: "تم استلام طلبك بنجاح. سيتم مراجعته خلال 24-48 ساعة.",
  eligibility: {
    eligible: true,
    refundAmount: 750.00,
    refundPercentage: 75,
    processingTime: "7-14 يوم عمل",
    refundMethod: "مدى"
  },
  nextSteps: [
    "سنراجع طلبك خلال 24-48 ساعة",
    "ستصلك رسالة بالقرار (قبول/رفض)",
    "إذا تم القبول، سيُعالج الاسترداد خلال 7-14 يوم عمل"
  ]
}

// Partial Eligibility (200)
{
  success: true,
  requestId: "REF-2026-XXXXX",
  message: "طلبك مؤهل لاسترداد جزئي",
  eligibility: {
    eligible: true,
    refundAmount: 300.00,
    refundPercentage: 25,
    reason: "تم استخدام 75% من قيمة الاشتراك",
    breakdown: {
      originalAmount: 1200.00,
      daysUsed: 90,
      daysValue: 300.00,
      discountsReceived: 600.00,
      refundableAmount: 300.00
    }
  }
}

// Not Eligible (200)
{
  success: true,
  requestId: "REF-2026-XXXXX",
  message: "طلبك غير مؤهل للاسترداد",
  eligibility: {
    eligible: false,
    reason: "تم استخدام الخدمة بالكامل",
    details: "قيمة الخدمات المستخدمة (1,500 ريال) تتجاوز قيمة الاشتراك (1,200 ريال)"
  },
  alternatives: [
    "يمكنك تقديم شكوى إذا كنت غير راضٍ عن الخدمة",
    "تواصل مع خدمة العملاء للمساعدة"
  ]
}

// Error (400)
{
  success: false,
  error: "TRANSACTION_NOT_FOUND",
  message: "لم نتمكن من العثور على عملية بهذا الرقم."
}

// Error (400)
{
  success: false,
  error: "AMOUNT_MISMATCH",
  message: "المبلغ المدخل (500 ريال) لا يطابق قيمة العملية (750 ريال)."
}
```

### File Upload Handling
```typescript
// Storage structure
const uploadPath = `/uploads/refund-requests/${requestId}/`;

// Process each file
for (const file of attachments) {
  // 1. Validate
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("حجم الملف يتجاوز 10MB");
  }
  
  if (!["image/jpeg", "image/png", "image/gif", "application/pdf"].includes(file.type)) {
    throw new Error("نوع الملف غير مدعوم");
  }
  
  // 2. Scan for viruses (optional but recommended)
  await scanForViruses(file);
  
  // 3. Generate unique filename
  const filename = `${Date.now()}-${sanitize(file.originalname)}`;
  
  // 4. Upload to storage (S3, local, etc.)
  const url = await uploadFile(file, `${uploadPath}${filename}`);
  
  // 5. Save to database
  await saveAttachment({
    refundRequestId: requestId,
    filename: filename,
    originalName: file.originalname,
    mimeType: file.type,
    size: file.size,
    url: url
  });
}
```

### Email Notifications
```typescript
// 1. Confirmation Email (within 24 hours)
{
  to: user.email,
  subject: "تأكيد استلام طلب الاسترداد - أمان إيفر",
  template: "refund-request-confirmation",
  data: {
    requestId: "REF-2026-XXXXX",
    transactionId: "INV-2026-12345",
    amount: 750.00,
    serviceType: "اشتراك بطاقة عضوية",
    estimatedReviewTime: "24-48 ساعة"
  }
}

// 2. Approval Email
{
  subject: "تمت الموافقة على طلب الاسترداد",
  data: {
    refundAmount: 750.00,
    refundMethod: "مدى",
    estimatedArrival: "7-14 يوم عمل",
    trackingUrl: "https://amanever.com/ar/refunds/track?id=REF-2026-XXXXX"
  }
}

// 3. Rejection Email
{
  subject: "تم رفض طلب الاسترداد",
  data: {
    reason: "تم استخدام الخدمة بالكامل",
    details: "...",
    appealUrl: "https://amanever.com/ar/refunds/appeal?id=REF-2026-XXXXX"
  }
}

// 4. Refund Processed Email
{
  subject: "تم معالجة الاسترداد بنجاح",
  data: {
    refundAmount: 750.00,
    refundMethod: "مدى",
    processedDate: "2026-05-10",
    arrivalDate: "2026-05-15"
  }
}
```

### Database Schema
```sql
CREATE TABLE refund_requests (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  request_id VARCHAR(50) UNIQUE NOT NULL,
  user_id BIGINT NOT NULL,
  transaction_id VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  refund_reason VARCHAR(100) NOT NULL,
  refund_details TEXT NOT NULL,
  transaction_date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  bank_iban VARCHAR(50),
  
  -- Eligibility
  eligible BOOLEAN,
  refund_amount DECIMAL(10,2),
  refund_percentage DECIMAL(5,2),
  eligibility_reason TEXT,
  
  -- Status
  status ENUM('pending', 'under_review', 'approved', 'rejected', 'processed', 'completed') DEFAULT 'pending',
  
  -- Timestamps
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP NULL,
  approved_at TIMESTAMP NULL,
  rejected_at TIMESTAMP NULL,
  processed_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  
  -- Admin
  reviewed_by BIGINT NULL,
  rejection_reason TEXT,
  admin_notes TEXT,
  
  INDEX idx_user_id (user_id),
  INDEX idx_transaction_id (transaction_id),
  INDEX idx_status (status),
  INDEX idx_requested_at (requested_at),
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);

CREATE TABLE refund_attachments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  refund_request_id BIGINT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size BIGINT NOT NULL,
  url TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_refund_request_id (refund_request_id),
  
  FOREIGN KEY (refund_request_id) REFERENCES refund_requests(id) ON DELETE CASCADE
);
```

### Payment Gateway Integration
```typescript
// Process refund based on payment method
async function processRefund(refundRequest: RefundRequest) {
  const { paymentMethod, refundAmount, transactionId } = refundRequest;
  
  switch (paymentMethod) {
    case "مدى":
    case "Visa":
    case "Mastercard":
      // Use payment gateway API (e.g., Moyasar, Tap, HyperPay)
      return await paymentGateway.refund({
        originalTransactionId: transactionId,
        amount: refundAmount,
        currency: "SAR"
      });
      
    case "Apple Pay":
      // Apple Pay refunds through payment gateway
      return await paymentGateway.refund({
        originalTransactionId: transactionId,
        amount: refundAmount,
        currency: "SAR"
      });
      
    case "تابي":
    case "تمارا":
      // BNPL providers have their own refund APIs
      return await bnplProvider.refund({
        orderId: transactionId,
        amount: refundAmount
      });
      
    case "تحويل بنكي":
      // Manual bank transfer
      return await createBankTransferTask({
        iban: refundRequest.bankIban,
        amount: refundAmount,
        reference: refundRequest.requestId
      });
  }
}
```

---

## 3. Admin Dashboard Requirements

### Refund Requests Management
```typescript
// List view
GET /admin/refunds?status=pending&page=1&limit=20

// Detail view
GET /admin/refunds/:requestId

// Approve
POST /admin/refunds/:requestId/approve
Body: {
  refundAmount: number,
  adminNotes?: string
}

// Reject
POST /admin/refunds/:requestId/reject
Body: {
  rejectionReason: string,
  adminNotes?: string
}

// Process (trigger payment)
POST /admin/refunds/:requestId/process
```

### Account Deletion Requests Management
```typescript
// List view
GET /admin/account-deletions?status=pending&page=1&limit=20

// Detail view
GET /admin/account-deletions/:requestId

// Approve and process
POST /admin/account-deletions/:requestId/approve
Body: {
  adminNotes?: string
}

// Reject
POST /admin/account-deletions/:requestId/reject
Body: {
  rejectionReason: string,
  adminNotes?: string
}
```

---

## 4. Testing Checklist

### Account Deletion
- [ ] Valid request with all required fields
- [ ] Request with active subscription (should fail)
- [ ] Request with pending transactions (should fail)
- [ ] Request with future bookings (should fail)
- [ ] Cancellation within 48 hours
- [ ] Cancellation after 48 hours (should fail)
- [ ] Email/phone mismatch (should fail)
- [ ] Data retention compliance (10 years for medical/financial)

### Refund Request
- [ ] Subscription refund within 14 days (100%)
- [ ] Subscription refund after 14 days (partial)
- [ ] Consultation refund before start (100%)
- [ ] Consultation refund after completion (0%)
- [ ] Home care cancellation >24h (100%)
- [ ] Home care cancellation 4-24h (75%)
- [ ] Home care cancellation <4h (0%)
- [ ] Points refund within 7 days (100%)
- [ ] Points refund after 7 days (0%)
- [ ] File upload (multiple files, size validation)
- [ ] Invalid transaction ID (should fail)
- [ ] Amount mismatch (should fail)

---

## 5. Security Considerations

### Rate Limiting
```typescript
// Prevent abuse
{
  accountDeletion: "1 request per user per 24 hours",
  refundRequest: "3 requests per user per 24 hours"
}
```

### Authentication
```typescript
// Both endpoints require authenticated user
middleware: [authenticate, rateLimit]
```

### Data Sanitization
```typescript
// Sanitize all user inputs
{
  email: sanitizeEmail,
  phone: sanitizePhone,
  refundDetails: sanitizeHtml,
  feedback: sanitizeHtml
}
```

### File Upload Security
```typescript
{
  virusScan: true,
  allowedTypes: ["image/jpeg", "image/png", "image/gif", "application/pdf"],
  maxSize: 10 * 1024 * 1024,
  maxFiles: 5,
  storageIsolation: true // Separate storage per user
}
```

---

## 6. Monitoring & Logging

### Metrics to Track
```typescript
{
  accountDeletionRequests: {
    total: number,
    pending: number,
    completed: number,
    cancelled: number,
    averageProcessingTime: duration
  },
  refundRequests: {
    total: number,
    pending: number,
    approved: number,
    rejected: number,
    processed: number,
    totalRefundAmount: money,
    averageRefundAmount: money,
    averageProcessingTime: duration,
    approvalRate: percentage
  }
}
```

### Alerts
```typescript
{
  highRefundRate: "Alert if refund requests > 10% of transactions",
  slowProcessing: "Alert if average processing time > 48 hours",
  highRejectionRate: "Alert if rejection rate > 50%"
}
```

---

**Last Updated**: 2026-04-25  
**Status**: Ready for Backend Implementation
