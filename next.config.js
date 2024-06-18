const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    NEXTAUTH_URL: "http://localhost:3000/api/auth",
    NEXTAUTH_SECRET: "c76761388aead7cc3af3fca7678d7783",
  },
};
