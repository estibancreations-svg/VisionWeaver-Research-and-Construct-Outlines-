Original name: Change the website name to Estibancreations and t...
Drive ID: 1Ji4O76kp5xDaNcQQN7FSRPQmevOidA70pl0lZg-DSBE
Parent folder: My Drive/MAF/Other/
Modified: 2025-09-29T00:22:46.786Z

# E-Commerce Architecture & Instruction Guide (V1.0)
This document outlines the modular file structure for the Series Hub E-Commerce platform, prioritizing scalability, security, and maintainability.
## 1. Modular File Path Structure (src/ Directory)
This structure groups all files related to a specific business function (feature) together, ensuring high isolation and ease of development, which is critical for complex e-commerce flows (Cart, Checkout, Account).
| Path | Section Type | Purpose & Instruction |
| src/ | Source Code Root | Contains all application logic (React components, utilities, etc.). |
| src/pages/ | Top-Level Views | Holds the main page components corresponding to the primary navigation routes (e.g., /store, /account). |
| src/components/ | Reusable UI | Stores small, generic interface elements used globally (e.g., Button, Modal, Input). Instruction: These components should contain no business logic. |
| src/features/ | Core Business Logic | Groups all components, hooks, and logic necessary for complex flows (Product Management, Cart, Checkout). Instruction: Isolate all feature-specific logic here. |
| src/api/ | API Services & Security | Dedicated folder for all network communication logic (fetching data, posting orders, key management). Instruction: All API keys and secure token handling must reside here. |
| src/utils/ | Helper Functions | Simple, non-UI related JavaScript functions (e.g., formatPrice, calculateDiscount). |
| src/styles/ | Global Styling | Global CSS files or Tailwind configuration settings. |
| public/images/ | Static Assets | General public assets like logos, banners, and icons. |
| public/products/ | Product Assets | Instruction: Use this dedicated path for all product images to improve Content Delivery Network (CDN) caching and organization. |

## 2. Instruction Breakdown: Critical E-Commerce Features (src/features/)
The isolation within the features/ folder is key to managing a large product catalog and complex user roles (Admin, Manager).
### A. features/products/
| Responsibility | Example Logic to Include |
| Product Display | ProductCard.jsx, ProductGrid.jsx, FilteringLogic.js |
| Instruction | Manages how the 75 books and 225+ videos are displayed, including inventory checks, price calculation (before discounts), and content sorting. |

### B. features/cart/
| Responsibility | Example Logic to Include |
| Cart State Management | CartItem.jsx, CartSummary.jsx, CartContext.js |
| Instruction | Handles adding, removing, and updating product quantities. Centralizes all subtotal, tax, and shipping calculations. |

### C. features/checkout/
| Responsibility | Example Logic to Include |
| Purchase Funnel | ShippingForm.jsx, PaymentStep.jsx, DiscountCodeValidation.js |
| Instruction | Manages the multi-step checkout process, validates shipping/billing information, and securely interacts with the payment gateway service. |

### D. features/account/
| Responsibility | Example Logic to Include |
| User Dashboard | OrderHistory.jsx, ProfileSettings.jsx, SubscriptionStatus.jsx |
| Instruction | Displays personalized user data, including submission tracking and managing membership/subscription statuses. This area requires verification against the auth-service for role (Member, Manager, Admin) verification. |

### E. api/ Layer (Security Focus)
This is the designated layer for handling the robust API Key Management.
- Instruction: All logic for retrieving and utilizing per-user and per-manager API keys must be confined to the src/api/ services (product-service.js, order-service.js, etc.). These keys must never be stored client-side in plain text or exposed outside of the API calling functions.
- Security: This layer ensures that only authorized roles (Admin/Manager) can access the sensitive media key data needed to manage the 75 books and 225+ videos.
