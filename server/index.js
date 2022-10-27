const express = require("express");
const cors = require("cors");

const app = express();
const port = 3500;

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`Mysql server is running on port ${port}`);
});
