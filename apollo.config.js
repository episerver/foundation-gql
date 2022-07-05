try {
  const dotenv = require("dotenv")
  dotenv.config({ path: ".env.local" })
  dotenv.config()
} catch (e) {
  console.log(e)
}

module.exports = {
  client: {
    includes: ["./gql/**/*.gql"],
    service: {
      name: "ContentGraph",
      url: process.env.NEXT_PUBLIC_OPTIQ_URL,
      headers: {
        authorization: `epi-single ${process.env.NEXT_PUBLIC_OPTIQ_AUTH}`,
      },
      skipSSLValidation: true,
    },
  },
}
