const { parseIssueBody } = require("./index")

const issueBody = process.env.ISSUE_BODY
const newSpeaker = parseIssueBody(issueBody)

// Add the new speaker to the array
speakersData.speakers.push(newSpeaker)

// Write back to speakers.json
fs.writeFileSync("speakers.json", JSON.stringify(speakersData, null, 2))
