# Deployment Guide for HERNetworking Hub

This guide will help you deploy your HERNetworking Hub website to your domain (hernetworkinghub.space) and set up Google Sheets integration for form submissions.

## Google Sheets Setup

1. **Create a Google Sheet**:
   - Go to [Google Sheets](https://sheets.google.com/) and create a new spreadsheet
   - Name the first sheet "Submissions"
   - Add the following headers in the first row:
     - A1: Timestamp
     - B1: Name
     - C1: Email
     - D1: LinkedIn
     - E1: Instagram

2. **Set up Google Service Account**:
   - Visit the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project (or select an existing one)
   - Enable the Google Sheets API for your project
   - Create a service account under "IAM & Admin" > "Service Accounts"
   - Create a new key for this service account (JSON format)
   - Download the key file (keep this secure and never commit to git)
   - Share your Google Sheet with the service account email (it looks like: service-account-name@project-id.iam.gserviceaccount.com)

## Vercel Deployment

1. **Prepare for deployment**:
   - Make sure you have a [Vercel](https://vercel.com/) account
   - Install Vercel CLI (optional): `npm install -g vercel`

2. **Set up environment variables**:
   - You'll need to add these environment variables in Vercel:
     - `GOOGLE_SHEET_ID`: Your Google Sheet ID (found in the URL of your sheet)
     - `GOOGLE_SERVICE_ACCOUNT_KEY`: The entire JSON content of your service account key

3. **Deploy to Vercel**:
   
   **Option 1: Using Vercel Dashboard**
   - Push your code to a Git provider (GitHub, GitLab, BitBucket)
   - Import your repository in the Vercel dashboard
   - Configure project:
     - Set the framework preset to "Next.js"
     - Add the environment variables
     - Set your custom domain: hernetworkinghub.space
   
   **Option 2: Using Vercel CLI**
   - Run `vercel` in your project directory
   - Follow the prompts to link to your Vercel account
   - Run `vercel --prod` to deploy to production

4. **Connect Your Domain**:
   - In the Vercel dashboard, go to your project settings
   - Navigate to "Domains"
   - Add your domain: hernetworkinghub.space
   - Follow Vercel's instructions to update your DNS settings

## Testing Your Deployment

1. Visit your domain: https://hernetworkinghub.space
2. Fill out the form with test data
3. Check your Google Sheet to verify that the submission was recorded

## Troubleshooting

- **Form submissions not appearing in Google Sheets?**
  - Verify that the service account has edit access to your sheet
  - Check Vercel logs for any errors
  - Ensure your environment variables are set correctly
  
- **Domain not working?**
  - DNS changes can take up to 48 hours to propagate
  - Verify your DNS settings match Vercel's requirements

## Local Development

To run the website locally with Google Sheets integration:

1. Create a `.env.local` file in the project root with:
   ```
   GOOGLE_SHEET_ID=your-sheet-id
   GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser
