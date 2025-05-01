// Google Apps Script to handle form submissions and save to Google Sheets
// Copy and paste this code into your Google Apps Script editor

function doPost(e) {
  try {
    // Check if e and e.postData exist
    if (!e || !e.postData) {
      // For testing purposes, create mock data
      Logger.log("No postData found, using test data");
      processFormData({
        name: "Test User",
        email: "test@example.com",
        phone: "1234567890",
        profession: "Test Profession",
        linkedin: "https://linkedin.com/in/testuser",
        instagram: "@testuser"
      });
      
      return ContentService.createTextOutput(JSON.stringify({
        result: "success",
        message: "Test data successfully recorded"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    
    // Log the received data for debugging
    Logger.log("Received data: " + JSON.stringify(data));
    
    return processFormData(data);
    
  } catch (error) {
    // Log the error
    Logger.log("Error processing request: " + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to process form data and save to sheet
function processFormData(data) {
  // Get the spreadsheet by ID - REPLACE THIS WITH YOUR ACTUAL SPREADSHEET ID
  // To get your spreadsheet ID, look at the URL of your sheet:
  // https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
  const SPREADSHEET_ID = "1J6gr7yjmmzGekNofxHeON64E-n34uPEog8y355kCv54";
  
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheets()[0];
  
    // Get the current timestamp
    const timestamp = new Date();
    
    // Prepare the row data with all form fields
    const rowData = [
      timestamp,
      data.name || "",
      data.email || "",
      data.phone || "",
      data.profession || "", // Include the profession field
      data.linkedin || "",
      data.instagram || ""
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Send confirmation email to the user
    if (data.email) {
      sendConfirmationEmail(data);
    }
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Data successfully recorded and confirmation email sent"
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("Error in processFormData: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// This function handles GET requests and can be used for testing
function doGet() {
  // For testing, add a test row to the sheet
  try {
    // Call doPost with null to trigger the test data path
    doPost(null);
    return HtmlService.createHtmlOutput(
      "<h2>Test Successful!</h2>" +
      "<p>A test row has been added to your spreadsheet.</p>" +
      "<p>Check your Google Sheet to verify the data was recorded correctly.</p>"
    );
  } catch (error) {
    return HtmlService.createHtmlOutput(
      "<h2>Test Failed</h2>" +
      "<p>Error: " + error.toString() + "</p>"
    );
  }
}

// Function to send confirmation email to the user
function sendConfirmationEmail(data) {
  try {
    const userEmail = data.email;
    const userName = data.name || "there";
    
    // Email subject
    const subject = "Welcome to HER Networking Hub Waitlist!";
    
    // Email body in HTML format
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #e83e8c;">HER Networking Hub</h1>
        </div>
        
        <p style="font-size: 16px; line-height: 1.5; color: #333;">Hi ${userName},</p>
        
        <p style="font-size: 16px; line-height: 1.5; color: #333;">Thank you for joining the HER Networking Hub waitlist! We're thrilled to have you as part of our growing community of ambitious women.</p>
        
        <p style="font-size: 16px; line-height: 1.5; color: #333;">Your application has been received and is currently being reviewed. We'll be in touch soon with more information about our upcoming events and opportunities.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="font-size: 14px; color: #666; margin: 0;">Here's a summary of the information you provided:</p>
          <ul style="font-size: 14px; color: #666;">
            <li><strong>Name:</strong> ${data.name || "Not provided"}</li>
            <li><strong>Email:</strong> ${data.email || "Not provided"}</li>
            <li><strong>Phone:</strong> ${data.phone || "Not provided"}</li>
            <li><strong>Profession:</strong> ${data.profession || "Not provided"}</li>
          </ul>
        </div>
        
        <p style="font-size: 16px; line-height: 1.5; color: #333;">In the meantime, feel free to connect with us on social media to stay updated on our latest news and events.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="display: inline-block; background-color: #e83e8c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Follow Us on Instagram</a>
        </div>
        
        <p style="font-size: 16px; line-height: 1.5; color: #333;">We look forward to connecting with you soon!</p>
        
        <p style="font-size: 16px; line-height: 1.5; color: #333;">Warm regards,<br>The HER Networking Hub Team</p>
        
        <div style="border-top: 1px solid #f0f0f0; margin-top: 20px; padding-top: 20px; font-size: 12px; color: #999; text-align: center;">
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    `;
    
    // Send the email
    GmailApp.sendEmail(
      userEmail,
      subject,
      "Thank you for joining HER Networking Hub Waitlist! We're excited to have you as part of our community.", // Plain text fallback
      {htmlBody: htmlBody}
    );
    
    Logger.log("Confirmation email sent to: " + userEmail);
    return true;
  } catch (error) {
    Logger.log("Error sending confirmation email: " + error.toString());
    return false;
  }
}
