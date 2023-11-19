const dotenv = require("dotenv");
const app = require("./app");
dotenv.config();

const PORT = process.env.PORT || 5650;

app.listen(PORT, () => {
  console.log(`server is running on PORT : http://localhost:${PORT}`);
});
