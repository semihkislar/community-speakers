const fs = require("node:fs")
const { parseIssueBody, validateData } = require("./index")

const issueBody = process.env.ISSUE_BODY
const newSpeaker = parseIssueBody(issueBody)

// Validate the Speaker Data
const validationErrors = validateData(newSpeaker)

if (validationErrors.length > 0) {
  console.error("Validation failed:", validationErrors)
  process.exit(1)
}

// Add the new speaker to the array
speakersData.speakers.push(newSpeaker)

// Write back to speakers.json
fs.writeFileSync("speakers.json", JSON.stringify(speakersData, null, 2))
