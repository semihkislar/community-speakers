/**
 * Parses a GitHub issue body and extracts speaker information into a structured object
 * @param {string} body - The raw text content of the GitHub issue body
 * @returns {Object} speaker - The parsed speaker information
 * @returns {string} speaker.name - Speaker's full name
 * @returns {string[]} speaker.expertise - List of speaker's areas of expertise
 * @returns {string} speaker.bio - Speaker's biography
 * @returns {string} speaker.image - URL to speaker's profile image
 * @returns {string} speaker.email - Speaker's email address
 * @returns {string} speaker.linkedin - Speaker's LinkedIn profile URL
 * @returns {string} speaker.twitter - Speaker's Twitter profile URL
 * @returns {string[]} speaker.pastEvents - List of speaker's past speaking events
 */
function parseIssueBody(body) {
  const lines = body.split("\n")
  let speaker = {
    name: "",
    expertise: [],
    bio: "",
    image: "",
    email: "",
    linkedin: "",
    twitter: "",
    pastEvents: [],
  }

  let currentSection = ""

  for (const line of lines) {
    if (line.includes("**Name:**")) {
      currentSection = "name"
      continue
    } else if (line.includes("**Expertise:**")) {
      currentSection = "expertise"
      continue
    } else if (line.includes("**Bio:**")) {
      currentSection = "bio"
      continue
    } else if (line.includes("**Image URL:**")) {
      currentSection = "image"
      continue
    } else if (line.includes("**Contact Information:**")) {
      currentSection = "contact"
      continue
    } else if (line.includes("**Past Events:**")) {
      currentSection = "events"
      continue
    }

    const trimmedLine = line.trim()
    if (trimmedLine && !trimmedLine.startsWith("<!--")) {
      switch (currentSection) {
        case "name":
          if (!trimmedLine.includes("**")) {
            speaker.name = trimmedLine
          }
          break
        case "expertise":
          if (trimmedLine.startsWith("-")) {
            speaker.expertise.push(trimmedLine.substring(1).trim())
          }
          break
        case "bio":
          if (!trimmedLine.includes("**")) {
            speaker.bio = trimmedLine
          }
          break
        case "image":
          if (!trimmedLine.includes("**")) {
            speaker.image = trimmedLine
          }
          break
        case "contact":
          if (trimmedLine.startsWith("- Email:")) {
            speaker.email = trimmedLine.split(":")[1].trim()
          } else if (trimmedLine.startsWith("- LinkedIn:")) {
            speaker.linkedin = trimmedLine.split(":")[1].trim()
          } else if (trimmedLine.startsWith("- Twitter:")) {
            speaker.twitter = trimmedLine.split(":")[1].trim()
          }
          break
        case "events":
          if (trimmedLine.startsWith("-")) {
            speaker.pastEvents.push(trimmedLine.substring(1).trim())
          }
          break
      }
    }
  }

  return speaker
}

/**
 * Validates speaker data against required fields and format requirements
 * @param {Object} data - The speaker data to validate
 * @param {string} data.name - Speaker's full name
 * @param {string[]} data.expertise - Array of speaker's areas of expertise
 * @param {string} data.bio - Speaker's biography
 * @param {string} data.image - HTTPS URL to speaker's profile image
 * @param {string} data.email - Speaker's email address
 * @param {string} data.linkedin - Speaker's LinkedIn profile URL
 * @param {string} data.twitter - Speaker's Twitter handle
 * @returns {string[]} Array of error messages. Empty array if validation passes
 */
function validateData(data) {
  const errors = []

  if (!data.name) {
    errors.push("Name is required")
  }

  if (
    !Array.isArray(data.expertise) ||
    data.expertise.length === 0 ||
    data.expertise.some((expertise) => !expertise.trim())
  ) {
    errors.push("Expertise must be an array with at least one non-empty string")
  }

  if (!data.bio) {
    errors.push("Bio is required")
  }

  if (!data.image || new URL(data.image).protocol !== "https:") {
    errors.push("Image URL is required")
  }

  // Check if at least one contact method is provided
  if (!data.email && !data.linkedin && !data.twitter) {
    errors.push(
      "At least one contact method (Email, LinkedIn, or Twitter) is required"
    )
  }

  // Validate email if provided
  if (data.email && !validateEmail(data.email)) {
    errors.push("Email address is invalid")
  }

  // Validate LinkedIn URL if provided
  if (data.linkedin && !isLinkedinValid(data.linkedin)) {
    errors.push("LinkedIn profile must start with 'linkedin.com/in/'")
  }

  // Validate Twitter handle if provided
  if (data.twitter && !isTwitterValid(data.twitter)) {
    errors.push("Twitter handle must start with @")
  }

  return errors
}

/**
 * Validates if the given LinkedIn URL is in the correct format.
 *
 * @param {string} linkedin - The LinkedIn URL to validate.
 * @returns {boolean} - Returns true if the LinkedIn URL is valid, otherwise false.
 */
function isLinkedinValid(linkedin) {
  if (!linkedin || typeof linkedin !== "string") {
    return false
  }

  return linkedin.startsWith("linkedin.com/in/")
}

/**
 * Validates a Twitter handle.
 *
 * This function checks if the provided Twitter handle is a non-empty string
 * and matches the pattern for a valid Twitter username. A valid Twitter
 * username starts with '@' followed by 1 to 15 alphanumeric characters or
 * underscores.
 *
 * @param {string} twitter - The Twitter handle to validate.
 * @returns {boolean} - Returns true if the Twitter handle is valid, otherwise false.
 */
function isTwitterValid(twitter) {
  if (!twitter || typeof twitter !== "string") {
    return false
  }

  const re = /^@([a-zA-Z0-9_]{1,15})$/
  return re.test(twitter)
}

/**
 * Validates if a given string is a properly formatted email address
 * @param {string} email - The email address to validate
 * @returns {boolean} - Returns true if email is valid, false otherwise
 * @example
 * validateEmail("user@example.com") // returns true
 * validateEmail("invalid.email") // returns false
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Validates an array of speaker data.
 *
 * @param {Array} data - The array of speaker data to validate.
 * @returns {Array} An array of error objects. Each error object contains the speaker's name, JSON index and error messages.
 */
function validateMutltipleSpeakers(data) {
  const errors = []
  if (!Array.isArray(data)) {
    errors.push("Data must be an array")
  } else {
    data.forEach((speaker, index) => {
      const speakerErrors = validateData(speaker)
      if (speakerErrors.length > 0) {
        errors.push({
          speaker: speaker.name,
          errors: speakerErrors,
          _index: index,
        })
      }
    })
  }
  return errors
}

module.exports = { parseIssueBody, validateData, validateMutltipleSpeakers }
