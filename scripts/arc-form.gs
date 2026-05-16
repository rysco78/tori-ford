// Fallin' Tides — ARC Request Form Handler
// Google Apps Script web app — paste this into your Apps Script editor
//
// Setup steps:
//   1. Open your Google Sheet
//   2. Extensions > Apps Script
//   3. Paste this entire file, replacing any existing code
//   4. Click Deploy > New deployment > Web app
//      - Execute as: Me
//      - Who has access: Anyone
//   5. Click Deploy, authorize when prompted
//   6. Copy the Web app URL and paste it into arc.html
//      (replace PASTE_YOUR_APPS_SCRIPT_URL_HERE)

const SHEET_NAME = 'ARC Requests'; // Change if you want a different tab name

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create the sheet and header row if they don't exist yet
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Role',
        'Role (Other)',
        'Primary Social',
        'Venue Name',
        'Library Country',
        'Library City',
        'Library State',
        'Agreed to Terms'
      ]);
      sheet.setFrozenRows(1);

      // Bold the header row
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }

    const p = e.parameter;

    sheet.appendRow([
      new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      p.name            || '',
      p.email           || '',
      p.role            || '',
      p.role_other      || '',
      p.primary_social  || '',
      p.venue_name      || '',
      p.library_country || '',
      p.library_city    || '',
      p.library_state   || '',
      p.agree === 'true' ? 'Yes' : 'No'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// doGet is required for the deployment to be reachable
function doGet() {
  return ContentService
    .createTextOutput('ARC form endpoint is active.')
    .setMimeType(ContentService.MimeType.TEXT);
}
