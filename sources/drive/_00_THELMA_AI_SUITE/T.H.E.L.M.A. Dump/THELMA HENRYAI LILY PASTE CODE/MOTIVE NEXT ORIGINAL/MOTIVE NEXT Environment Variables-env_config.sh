Original name: MOTIVE NEXT Environment Variables-env_config.sh
Drive ID: 10gIjzQstNsxNXqfrvhQkakPZ9qCmu-D4
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-05T23:58:36.000Z

# MOTIVE NEXT Environment Variables
# Copy to .env and fill in your actual values

# === Netlify Configuration ===
SITE_ID=ef2f49e7-241e-45b5-8321-e08f3b36fe9a
URL=https://motivenext.online

# === Database (Supabase) ===
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# === Payment Processing (Stripe) ===
STRIPE_SECRET_KEY=[secret value withheld]
STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRICE_BASIC=price_basic_plan_id
STRIPE_PRICE_PROFESSIONAL=price_professional_plan_id
STRIPE_PRICE_ENTERPRISE=price_enterprise_plan_id

# === Insurance APIs ===
# Allstate Telematics API
ALLSTATE_API_KEY=your_allstate_api_key
ALLSTATE_API_SECRET=your_allstate_secret
ALLSTATE_CLIENT_ID=your_allstate_client_id

# Progressive Snapshot API
PROGRESSIVE_API_KEY=your_progressive_api_key
PROGRESSIVE_API_SECRET=your_progressive_secret
PROGRESSIVE_CLIENT_ID=your_progressive_client_id

# === Communication Services ===
# Twilio (PTT Voice/SMS)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+18005551234
DISPATCH_PHONE=+18005551235
FLEET_MANAGER_PHONE=+18005551236

# SendGrid (Email Notifications)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@motivenext.online

# === Vehicle APIs ===
# NHTSA is free, no key needed
# Carfax Vehicle History
CARFAX_API_KEY=your_carfax_api_key
CARFAX_API_SECRET=your_carfax_secret

# === Weather & Route APIs ===
OPENWEATHER_API_KEY=your_openweather_key
GOOGLE_MAPS_API_KEY=your_google_maps_key

# === Computer Vision / AI APIs ===
# Google Cloud Vision (VIN recognition, component detection)
GOOGLE_CLOUD_VISION_KEY=your_google_vision_key
GOOGLE_CLOUD_PROJECT_ID=your_project_id

# AWS Rekognition (alternative for video/image analysis)
AWS_REKOGNITION_KEY=your_aws_rekognition_key

# === DOT Integration ===
DOT_API_KEY=your_fmcsa_api_key
DOT_REPORTING_ENDPOINT=https://api.fmcsa.dot.gov/v1/inspections
INSURANCE_WEBHOOK_URL=your_insurance_webhook_url

# === Load Boards (For Trucking) ===
DAT_API_KEY=your_dat_loadboard_key
TRUCKSTOP_API_KEY=your_truckstop_key

# === Security & Authentication ===
JWT_SECRET=your_super_secret_jwt_key_change_this
ENCRYPTION_KEY=your_32_character_encryption_key

# === Monitoring & Analytics ===
SENTRY_DSN=https://your-sentry-dsn
LOGTAIL_TOKEN=your_logtail_token

# === Storage (AWS S3 or Cloudinary) ===
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=motive-next-uploads
AWS_REGION=us-east-1

# OR use Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret