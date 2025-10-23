# Test Scenarios

## Briefing

The following test scenarios are designed to validate the speaker data. Each data should be in the [correct format](../README.md#how-to-add-your-profile).

## Validation Unit Tests

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

### Test Case-007: Invalid Email

```json
{
  "email": "invalid-email",
  ...
}
```

### Test-Case-008: Valid Email

```json
{
  "email": "semihkislar@gmail.com",
  ...
}
```

- **Expected Output:** ["A valid email is required"]

### Test Case-009: Missing All Contact Methods

```json
{
  "email": "",
  "linkedin": "",
  "twitter": ""
}
```

- **Expected Output:**: ["At least one contact method (email, LinkedIn, or Twitter) is required"]

### Test Case-010: Valid Twitter Handle

```json
{
  "twitter": "@semiyann",
  ...
}
```

- **Expected Output:** []

### Test Case-011: Single Valid Contact Method

```json
{
  "email": "",
  "linkedin": "linkedin.com/in/semihkislar",
  "twitter": ""
}
```

- **Expected Output:** []

### Test Case-012: Valid Mixed Contact Methods

```json
{
  "email": "semihkislar@gmail.com",
  "linkedin": "",
  "twitter": "@semiyann"
}
```

- **Expected Output:** []

### Test Case-013: Invalid Twitter Handle

```json
{
  "twitter": "semiyann",
}
```

- **Expected Output:** ["Twitter handle must start with @"]
