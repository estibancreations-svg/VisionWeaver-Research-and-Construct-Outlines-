# Provider facts behind Version 2.0 design choices (checked October 14, 2026)

| Topic | Fact | What we built |
|---|---|---|
| Tap to Pay | Needs a mobile app built with Stripe's Terminal iOS/Android SDK (about two weeks of work after the Terminal integration), an Apple entitlement on iPhone, an NFC phone; iPads aren't supported. The Stripe Dashboard app is a no-build alternative (Stripe, n.d.-b). | Listed as a method; use Stripe's app until a native app exists |
| Apple Pay / Google Pay | Domains must be registered with Stripe to show these wallets (and Link) in Elements or embedded Checkout (Stripe, n.d.-a). | Stripe-hosted checkout from the `payments` function; "domain registered" flag in settings |
| FaceTime | Links are created on iPhone/iPad (iOS 15+) or Mac (macOS Monterey+); Android and Windows guests join in Chrome or Edge (Apple, n.d.). No public API for outside apps was found. | Paste-a-link appointments |
| Zoom | Meetings are created with `POST /users/{userId}/meetings` using the `meeting:write:meeting` scopes; the response has `join_url` and `start_url` (Zoom, n.d.). | Zoom appointments on Pro; meeting creation in the next build |
| Skype | Was named by mistake; Sire meant Zoom. | Not built |

## Sources

- Apple. (n.d.). *Join a FaceTime call from an Android or Windows device*. https://support.apple.com/en-gb/109364
- Stripe. (n.d.-a). *Register domains for payment methods*. https://docs.stripe.com/payments/payment-methods/pmd-registration
- Stripe. (n.d.-b). *Tap to Pay on iPhone or Android and Stripe Terminal*. https://support.stripe.com/questions/tap-to-pay-on-iphone-or-android-and-stripe-terminal
- Zoom. (n.d.). *Create a meeting*. https://developers.zoom.us/docs/isv/workflows/create-meeting/
