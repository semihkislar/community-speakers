const { it, describe } = require("node:test")
const assert = require("node:assert")
const { validateData } = require("../ci")

describe("Validation Unit Tests", () => {
  it("001-Valid speaker data should PASS", (t) => {
    const obj = {
      name: "Semih Kışlar",
      expertise: ["Web Development", "JavaScript", "Node.js"],
      bio: "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
      image: "https://bursa.dev/images/team/semih-kislar.jpg",
      email: "semihkislar@gmail.com",
      linkedin: "linkedin.com/in/semihkislar",
      twitter: "@semiyann",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, [])
  })

  it("002-Empty speaker name should FAIL", (t) => {
    const obj = {
      name: "",
      expertise: ["Web Development", "JavaScript", "Node.js"],
      bio: "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
      image: "https://bursa.dev/images/team/semih-kislar.jpg",
      email: "semihkislar@gmail.com",
      linkedin: "linkedin.com/in/semihkislar",
      twitter: "@semiyann",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, ["Name is required"])
  })

  it("003-Empty speaker expertise array should FAIL", (t) => {
    const obj = {
      name: "Semih Kışlar",
      expertise: [],
      bio: "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
      image: "https://bursa.dev/images/team/semih-kislar.jpg",
      email: "semihkislar@gmail.com",
      linkedin: "linkedin.com/in/semihkislar",
      twitter: "@semiyann",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, [
      "Expertise must be an array with at least one non-empty string",
    ])
  })

  it("004-Empty speaker bio should FAIL", (t) => {
    const obj = {
      name: "Semih Kışlar",
      expertise: ["Web Development", "JavaScript", "Node.js"],
      bio: "",
      image: "https://bursa.dev/images/team/semih-kislar.jpg",
      email: "semihkislar@gmail.com",
      linkedin: "linkedin.com/in/semihkislar",
      twitter: "@semiyann",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, ["Bio is required"])
  })

  it("005-Empty Image URL should FAIL", (t) => {
    const obj = {
      name: "Semih Kışlar",
      expertise: ["Web Development", "JavaScript", "Node.js"],
      bio: "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
      image: "",
      email: "semihkislar@gmail.com",
      linkedin: "linkedin.com/in/semihkislar",
      twitter: "@semiyann",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, ["Image URL is required"])
  })

  it("006-Invalid HTTPS Image URL should FAIL", (t) => {
    const obj = {
      name: "Semih Kışlar",
      expertise: ["Web Development", "JavaScript", "Node.js"],
      bio: "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
      image: "http://bursa.dev/images/team/semih-kislar.jpg",
      email: "semihkislar@gmail.com",
      linkedin: "linkedin.com/in/semihkislar",
      twitter: "@semiyann",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, ["Image URL is required"])
  })

  it("007-Invalid email format should FAIL", (t) => {
    const obj = {
      name: "Semih Kışlar",
      expertise: ["Web Development", "JavaScript", "Node.js"],
      bio: "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
      image: "https://bursa.dev/images/team/semih-kislar.jpg",
      email: "invalid-email",
      linkedin: "linkedin.com/in/semihkislar",
      twitter: "@semiyann",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, ["Email address is invalid"])
  })

  it("008-Valid email format should PASS", (t) => {
    const obj = {
      name: "Semih Kışlar",
      expertise: ["Web Development", "JavaScript", "Node.js"],
      bio: "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
      image: "https://bursa.dev/images/team/semih-kislar.jpg",
      email: "semihkislar@gmail.com",
      linkedin: "linkedin.com/in/semihkislar",
      twitter: "@semiyann",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, [])
  })

  it("009-Missing all contact methods should FAIL", (t) => {
    const obj = {
      name: "Semih Kışlar",
      expertise: ["Web Development", "JavaScript", "Node.js"],
      bio: "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
      image: "https://bursa.dev/images/team/semih-kislar.jpg",
      email: "",
      linkedin: "",
      twitter: "",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, [
      "At least one contact method (Email, LinkedIn, or Twitter) is required",
    ])
  })

  it("010-Valid Twitter handle should PASS", (t) => {
    const obj = {
      name: "Semih Kışlar",
      expertise: ["Web Development", "JavaScript", "Node.js"],
      bio: "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
      image: "https://bursa.dev/images/team/semih-kislar.jpg",
      twitter: "@semiyann",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, [])
  })

  it("011-Single valid contact method should PASS", (t) => {
    const obj = {
      name: "Semih Kışlar",
      expertise: ["Web Development", "JavaScript", "Node.js"],
      bio: "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
      image: "https://bursa.dev/images/team/semih-kislar.jpg",
      linkedin: "linkedin.com/in/semihkislar",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, [])
  })

  it("012-Valid mixed contact methods should PASS", (t) => {
    const obj = {
      name: "Semih Kışlar",
      expertise: ["Web Development", "JavaScript", "Node.js"],
      bio: "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
      image: "https://bursa.dev/images/team/semih-kislar.jpg",
      email: "semihkislar@gmail.com",
      twitter: "@semiyann",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, [])
  })

  it("013-Invalid Twitter Handle should FAIL", (t) => {
    const obj = {
      name: "Semih Kışlar",
      expertise: ["Web Development", "JavaScript", "Node.js"],
      bio: "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
      image: "https://bursa.dev/images/team/semih-kislar.jpg",
      email: "semihkislar@gmail.com",
      linkedin: "linkedin.com/in/semihkislar",
      twitter: "semiyann",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, [
      "Twitter handle must start with @",
    ])
  })
})
