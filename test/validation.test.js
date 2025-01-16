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

  it("007-Missing email should FAIL", (t) => {
    const obj = {
      name: "Semih Kışlar",
      expertise: ["Web Development", "JavaScript", "Node.js"],
      bio: "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
      image: "https://bursa.dev/images/team/semih-kislar.jpg",
      email: "",
      linkedin: "linkedin.com/in/semihkislar",
      twitter: "@semiyann",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, ["A valid email is required"])
  })

  it("008-Invalid email format should FAIL", (t) => {
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

    assert.deepStrictEqual(validationErrors, ["A valid email is required"])
  })

  it("009-Valid email format should PASS", (t) => {
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

  it("010-Missing LinkedIn should FAIL", (t) => {
    const obj = {
      name: "Semih Kışlar",
      expertise: ["Web Development", "JavaScript", "Node.js"],
      bio: "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
      image: "https://bursa.dev/images/team/semih-kislar.jpg",
      email: "semihkislar@gmail.com",
      linkedin: "",
      twitter: "@semiyann",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, ["LinkedIn profile is required"])
  })

  it("011-Missing Twitter handle should FAIL", (t) => {
    const obj = {
      name: "Semih Kışlar",
      expertise: ["Web Development", "JavaScript", "Node.js"],
      bio: "Community Manager @Teknasyon, Founder @Bursa Bilişim Topluluğu",
      image: "https://bursa.dev/images/team/semih-kislar.jpg",
      email: "semihkislar@gmail.com",
      linkedin: "linkedin.com/in/semihkislar",
      twitter: "",
      pastEvents: ["DevFest Tashkent"],
    }

    const validationErrors = validateData(obj)

    assert.deepStrictEqual(validationErrors, ["Twitter handle is required"])
  })
})
