// https://www.apollographql.com/docs/react/data/fragments/#generating-possibletypes-automatically

const fs = require("fs")

const fetch = require("cross-fetch")
const dotenv = require("dotenv")

dotenv.config({ path: ".env.local" })
dotenv.config()

const { NEXT_PUBLIC_OPTIQ_URL, NEXT_PUBLIC_OPTIQ_AUTH } = process.env

fetch(NEXT_PUBLIC_OPTIQ_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `epi-single ${NEXT_PUBLIC_OPTIQ_AUTH}`,
  },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    const possibleTypes = {}

    result.data.__schema.types.forEach((supertype) => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name)
      }
    })

    fs.writeFile("./possibleTypes.json", JSON.stringify(possibleTypes), (err) => {
      if (err) {
        console.error("Error writing possibleTypes.json", err)
      } else {
        console.log("Fragment types successfully extracted!")
      }
    })
  })
