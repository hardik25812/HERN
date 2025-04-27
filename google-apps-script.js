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
  const SPREADSHEET_ID = "1vxX1hpksPNmJUg4ojIjCTaObgv3gSYROkPY5fm2vQJE";
  
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
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Data successfully recorded"
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
