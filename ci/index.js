// Parse the markdown content
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

// Validate the speaker data
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

  if (!data.email || !validateEmail(data.email)) {
    errors.push("A valid email is required")
  }

  if (!data.linkedin) {
    errors.push("LinkedIn profile is required")
  }

  if (!data.twitter) {
    errors.push("Twitter handle is required")
  }

  if (
    !Array.isArray(data.pastEvents) ||
    data.pastEvents.some((event) => !event)
  ) {
    errors.push(
      "Past events must be an array with at least one non-empty string"
    )
  }

  return errors
}

// Validate email address using RegEx
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

module.exports = { parseIssueBody, validateData }
