/**
 * HireOS demo-request intake.
 * Bound to spreadsheet 16AdKN0IGzFsLMD4YzMWzgrHV2VQd4cCZxXcRNdCaQbQ
 * via SpreadsheetApp.openById. Deployed as a web app: execute as me, anyone can POST.
 */
const SPREADSHEET_ID = "16AdKN0IGzFsLMD4YzMWzgrHV2VQd4cCZxXcRNdCaQbQ";
const SHEET_NAME = "Demo requests";
const HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Company",
  "Role",
  "ATS",
  "Hires per year",
  "Notes",
  "Page URL",
];

function getSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  const existing = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  if (existing.join("") === "") {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, HEADERS.length);
  }
  return sheet;
}

function parseBody(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      return e.parameter || {};
    }
  }
  return (e && e.parameter) || {};
}

function doPost(e) {
  const data = parseBody(e);
  const sheet = getSheet();
  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.company || "",
    data.role || "",
    data.ats || "",
    data.volume || "",
    data.notes || "",
    data.pageUrl || "",
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: "HireOS demo requests" }),
  ).setMimeType(ContentService.MimeType.JSON);
}
