# Stripe Professional Subscription Setup

This project uses **Stripe Payment Links** for the $30/month Professional plan. No backend server is required.

## What you need

- A Stripe account at https://dashboard.stripe.com
- Your live/test payment link URL
- Your site URL where customers return after paying (e.g. `https://nexora-ai.com`)

## Step 1 — Create the $30 subscription product

1. Log in to your Stripe Dashboard.
2. Go to **Products → Add product**.
3. Enter:
   - **Name**: `Nexora AI Professional`
   - **Description**: `AI chatbot, workflow automation, integrations, and priority support.`
4. Under **Pricing**, choose **Recurring**.
   - **Price**: `30.00`
   - **Billing period**: `Monthly`
   - **Currency**: `USD`
5. Click **Save product**.

## Step 2 — Create a Payment Link

1. Go to **Payment Links** in the left sidebar.
2. Click **Create link**.
3. Select the `Nexora AI Professional` product you just created.
4. Set:
   - **Quantity**: `1`
   - **Collect tax**: Optional, based on your business location
   - **Collect phone number**: Optional
5. Expand **After payment** and set:
   - **Confirmation page**: `Redirect customers to your site`
   - **Redirect URL**: `https://YOUR_DOMAIN/?stripe_status=success`
   - **Cancel URL**: `https://YOUR_DOMAIN/?stripe_status=cancel`
   - Replace `YOUR_DOMAIN` with your actual domain.
6. Click **Create link**.
7. Copy the Payment Link URL (looks like `https://buy.stripe.com/xxxxx`).

## Step 3 — Configure the Customer Portal (optional)

This lets paying users manage or cancel their subscription themselves.

1. In Stripe Dashboard, go to **Settings → Customer portal**.
2. Enable:
   - **Cancel subscription**
   - **Update payment method**
   - **Update subscription**
3. Set **Default redirect link** to `https://YOUR_DOMAIN/`.
4. Click **Save changes**, then copy the **Portal link**.

## Step 4 — Add the links to your environment

1. Open `.env` in the project root.
2. Replace the placeholder values:

```env
VITE_STRIPE_PAYMENT_LINK=https://buy.stripe.com/xxxxx
VITE_STRIPE_PORTAL_LINK=https://billing.stripe.com/p/login/xxxxx
```

3. Save the file.

> `.env` is ignored by Git, so your Stripe links stay private. `README.md` and `STRIPE_SETUP.md` are safe to share.

## Step 5 — Test the flow

1. Restart the dev server:

```bash
npm run dev
```

2. Open the site and click **Pricing** in the navigation.
3. Click **Subscribe with Stripe**.
4. Use Stripe test card `4242 4242 4242 4242` with any future expiry date and CVC.
5. After payment, Stripe redirects you back to `?stripe_status=success` and a green confirmation banner appears.
6. Try cancelling to verify `?stripe_status=cancel` shows the cancellation message.

## Step 6 — Go live

1. Switch your Stripe Dashboard from **Test mode** to **Live mode**.
2. Recreate the product and Payment Link in live mode.
3. Update `.env` with the live Payment Link and Portal Link.
4. If you deploy to Vercel, Netlify, or another host, add the same two environment variables there (Vite bakes them in at build time).
5. Redeploy your site.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Button says "Stripe is not configured yet" | `.env` still contains the placeholder URL. Replace it with your real Payment Link. |
| Changes not showing | Restart `npm run dev` after editing `.env`. |
| No banner after payment | Make sure Stripe redirect URL uses `?stripe_status=success` exactly. |
| TypeScript error about `import.meta.env` | `src/vite-env.d.ts` is included; restart the TypeScript language server. |

## Need a full backend flow?

If you later want Checkout Sessions, webhooks, and database subscription tracking, you can add a backend API. This project currently uses the simplest, maintenance-free Payment Links approach.
