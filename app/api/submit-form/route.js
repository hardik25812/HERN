import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = 'Submissions';
const RANGE = 'A:E'; // A-E columns for timestamp, name, email, LinkedIn, Instagram

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, linkedin, instagram } = body;
    
    // Validate required fields
    if (!name || !email || !linkedin || !instagram) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // For production, we would use proper service account credentials
    // If GOOGLE_SERVICE_ACCOUNT_KEY is configured
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      try {
        // Add to Google Sheet
        await addToGoogleSheet(name, email, linkedin, instagram);
      } catch (err) {
        console.error('Google Sheets error:', err);
        // Continue with response even if Google Sheets fails
      }
    } else {
      console.log('Google Sheets integration not configured');
      // Just log the submission for development
      console.log('Form submission:', { name, email, linkedin, instagram });
    }
    
    return new Response(
      JSON.stringify({ success: true, message: 'Form submitted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function addToGoogleSheet(name, email, linkedin, instagram) {
  try {
    // For production environment, use a service account key
    const auth = new GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Format the data
    const timestamp = new Date().toISOString();
    const values = [[timestamp, name, email, linkedin, instagram]];

    // Append to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!${RANGE}`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: { values },
    });
    
    console.log('Data added to Google Sheet');
    return true;
  } catch (error) {
    console.error('Error adding to Google Sheet:', error);
    throw error;
  }
}
