# Test Scenarios

## Validation tests

### Test Case-001: Valid Speaker Data

```json
{
  "name": "Semih Kışlar",
  "expertise": ["Web Development", "JavaScript", "Node.js"],
  "bio": "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
  "image": "https://bursa.dev/images/team/semih-kislar.jpg",
  "email": "semihkislar@gmail.com",
  "linkedin": "linkedin.com/in/semihkislar",
  "twitter": "@semiyann",
  "pastEvents": ["DevFest Tashkent"]
}
```

- **Expected Output:** []

### Test Case-002: Empty Name

```json
{
  "name": "",
  ...
}
```

- **Expected Output:** ["Name is required"]

### Test Case-003: Empty Expertise

```json
{
  "expertise": [],
  ...
}
```

- **Expected Output:** ["Expertise must be an array with at least one non-empty string"]

### Test Case-004: Empty Bio

```json
{
  "bio": "",
  ...
}
```

- **Expected Output:** ["Bio is required"]

### Test Case-005: Empty Image URL

```json
{
  "image": "",
  ...
}
```

- **Expected Output:** ["Image URL is required"]

### Test Case-006: Invalid HTTPS Image URL

```json
{
  "image": "http://bursa.dev/images/team/semih-kislar.jpg",
  ...
}
```

- **Expected Output:** ["Image URL is required"]

<!--

TODO:

-->

### Test Case: Missing Email

- **Expected Output:** ["A valid email is required"]

### Test Case: Invalid Email

- **Expected Output:** ["A valid email is required"]

### Test Case: Missing LinkedIn

- **Expected Output:** ["LinkedIn profile is required"]

### Test Case: Missing Twitter

- **Expected Output:** ["Twitter handle is required"]

### Test Case: Empty Past Events

- **Expected Output:** ["Past events must be an array with at least one non-empty string"]
