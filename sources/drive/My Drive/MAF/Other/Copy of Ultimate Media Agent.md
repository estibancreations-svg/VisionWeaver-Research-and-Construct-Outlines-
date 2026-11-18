Original name: Copy of Ultimate Media Agent
Drive ID: 1Nol9cJflRrprsUKypJSHTAa9bcoyKWjlEZCqZkXxvz4
Parent folder: My Drive/MAF/Other/
Modified: 2025-08-16T02:42:36.087Z

# Ultimate Media Agent Army
Author: Nate Herk

## Part 1: Cost Breakdown
### 1. Chat Models: GPT-5 Mini vs. GPT-4.1 Mini
- GPT‑5 Mini:
  - Input: $0.25 per million tokens
  - Output: $2.00 per million tokens
- GPT‑4.1 Mini:
  - Input: $0.40 per million tokens
  - Output: $1.60 per million tokens
Comparison Highlights:
- GPT‑5 Mini is more cost-efficient on input tokens (~38% cheaper), but has slightly higher output cost.
- Total cost will depend on your typical input/output token ratio—GPT‑5 Mini generally yields lower overall cost given leaner input pricing.

- I use OpenRouter for my chat models. It lets you connect to multiple models through one account, meaning you can track all of your usage and billing in one spot. So I'm a big fan of OpenRouter.
### 2. Image & Video Generation (GPT-1 & Veo3 Fast)
- GPT‑Image‑1 (OpenAI):
  - Input tokens: $10.00 per million tokens
  - Output tokens: $40.00 per million tokens
  - Equivalent per image (square):
    - Low quality: ~$0.01
    - Medium: ~$0.04
    - High: ~$0.17
- Veo 3 Fast::
  - Text to Video
    - For every second of video you generated, you will be charged $0.25 (audio off) or $0.40 (audio on). For example, a 5s video with audio on will cost $2.00.
  - Image to Video
    - Experimental pricing, subject to change: For every second of video you generated, you will be charged $0.27(audio off) or $0.4 (audio on). For example, a 5s video with audio on will cost $2.

- We are accessing GPT's image generation model through OpenAI's API, and we're accessing VO3Fast through FAL AI. You will need to create API keys for each of these APIs, as well as billing information.
- Also using a service called IMGBB in the image-to-video step because we need to get a public URL for our file. You can get started on a free plan.

### 3. Bloatato Subscription (if used for posting)
- Estimated Pricing (based on available info):
  - Free trial for the first 7 days.
  - Then $29/month standard plan
- Promo Code: Use NATE30 for 30% off for six months.
  - That brings monthly cost down to $20.30/month for those six months.

### 4. Apify Scrapers
- Apify Pricing:
  - Free tier: limited ($5 in usage credits/month)
  - Starter: $39/month (plus $39 in store credit)
  - Scale: $199/month
  - Business: $999/month
- Promo Code: Use 30NATEHHERK for 30% off your first 3 months.
  - Example: Starter plan effective rate becomes ~$27.30/month.

### 5. Other APIs (Perplexity, Tavily, OpenWeatherMap, etc.)
- Perplexity API:
  - To use the Perplexity API most effectively, a Pro subscription is recommended: ~$20/month per seat with $5 credit.
  - Token-level costs vary by chosen model—ranging between $1–$15 per million tokens input/output, with additional request or citation tokens fees specific to model tier .
- Tavily:
  - Free Tier:
    - 1,000 credits per month, with no credit card required
- OpenWeatherMap:
  - Free Tier:
    - 1,000 API calls per day included at no cost

## Part 2: Setup Instructions
### JSON Workflows to Download (9 Files)
- Creative Agent (4 workflows):
  - Edit Image
  - Create an Image
  - Image to Video
  - Create Video
- Posting Agent (3 workflows):
  - X Post
  - TikTok Post
  - Instagram Post
- Ultimate Media Agent: (2 workflows):
  - Ultimate Agent
  - Create Doc Tool
The rest should integrate seamlessly as subflows, so you don't need to fetch a bunch of extra files.

### Google Environment Setup
- Folders in Google Drive:
  - Create folder: “Media Analysis” — This will hold documents.
  - Create folder: “Media” — This will hold all media files.
- Google Drive Agent Connections:
  - Search Docs tool: pointed to the Media Analysis folder.
  - Search Media tool: pointed to the Media folder.
- Google Sheets Integration:
  - Copy the provided template Google Sheet.
  - Link it in the two Google Sheet nodes on the right-hand side of the Ultimate Media Agent workflow.
- Credential Configuration:
  - Connect your necessary credentials for:
    - Telegram
    - OpenRouter
    - Fal
    - OpenAI
    - Gmail
    - Airtable
    - Calendar (Google Calendar, assumed)
    - Other tool agents as needed.
Once all folders, sheet links, and credentials are set, everything should be ready to go with minimal additional setup.


Want to connect with others building and monetizing AI automation?Become an AIS Plus Member
