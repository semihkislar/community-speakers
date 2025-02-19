// github-actions: .github/workflows/validate-speaker.yml
const fs = require("node:fs")
const { validateMutltipleSpeakers } = require("./index")

let speakersFile
try {
  speakersFile = fs.readFileSync("speakers.json", "utf8")
} catch (error) {
  console.error("Failed to read file:", error.message)
  process.exit(1)
}

let speakersData
try {
  speakersData = JSON.parse(speakersFile)
} catch (error) {
  console.error("Failed to parse JSON:", error)
  process.exit(1)
}

// Validate the Speaker Data
const validationErrors = validateMutltipleSpeakers(speakersData.speakers)

if (validationErrors.length > 0) {
  console.error("Validation failed:", validationErrors)
  process.exit(1)
}
