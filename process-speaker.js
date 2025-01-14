const fs = require('fs');

// Read the current speakers.json
const speakersFile = fs.readFileSync('speakers.json', 'utf8');
const speakersData = JSON.parse(speakersFile);

// Get issue body from environment variable
const issueBody = process.env.ISSUE_BODY;

// Parse the markdown content
function parseIssueBody(body) {
  const lines = body.split('\n');
  let speaker = {
    name: '',
    expertise: [],
    bio: '',
    image: '',
    email: '',
    linkedin: '',
    twitter: '',
    pastEvents: []
  };
  
  let currentSection = '';
  
  for (const line of lines) {
    if (line.includes('**Name:**')) {
      currentSection = 'name';
      continue;
    } else if (line.includes('**Expertise:**')) {
      currentSection = 'expertise';
      continue;
    } else if (line.includes('**Bio:**')) {
      currentSection = 'bio';
      continue;
    } else if (line.includes('**Image URL:**')) {
      currentSection = 'image';
      continue;
    } else if (line.includes('**Contact Information:**')) {
      currentSection = 'contact';
      continue;
    } else if (line.includes('**Past Events:**')) {
      currentSection = 'events';
      continue;
    }
    
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('<!--')) {
      switch(currentSection) {
        case 'name':
          if (!trimmedLine.includes('**')) {
            speaker.name = trimmedLine;
          }
          break;
        case 'expertise':
          if (trimmedLine.startsWith('-')) {
            speaker.expertise.push(trimmedLine.substring(1).trim());
          }
          break;
        case 'bio':
          if (!trimmedLine.includes('**')) {
            speaker.bio = trimmedLine;
          }
          break;
        case 'image':
          if (!trimmedLine.includes('**')) {
            speaker.image = trimmedLine;
          }
          break;
        case 'contact':
          if (trimmedLine.startsWith('- Email:')) {
            speaker.email = trimmedLine.split(':')[1].trim();
          } else if (trimmedLine.startsWith('- LinkedIn:')) {
            speaker.linkedin = trimmedLine.split(':')[1].trim();
          } else if (trimmedLine.startsWith('- Twitter:')) {
            speaker.twitter = trimmedLine.split(':')[1].trim();
          }
          break;
        case 'events':
          if (trimmedLine.startsWith('-')) {
            speaker.pastEvents.push(trimmedLine.substring(1).trim());
          }
          break;
      }
    }
  }
  
  return speaker;
}

// Parse the issue and create speaker object
const newSpeaker = parseIssueBody(issueBody);

// Add the new speaker to the array
speakersData.speakers.push(newSpeaker);

// Write back to speakers.json
fs.writeFileSync('speakers.json', JSON.stringify(speakersData, null, 2));
