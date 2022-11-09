const express = require("express");
const router = express.Router();
const user = require("../services/user");

router.get("/", async function (req, res, next) {
  try {
    const result = await user.getMultiple(req.query.page);
    res.json(result);
  } catch (err) {
    console.error("Error while getting users", err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  console.log("in server: ", req.body);
  try {
    const result = user.create(req.body);
    res.json(result);
  } catch (err) {
    console.error("Error while creating user", err.message);
    next(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const result = user.update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.error("Error while updating user", err.message);
    next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const result = user.remove(req.params.id);
    res.json(result);
  } catch (err) {
    console.log("Error while deleting user", err.message);
    next(err);
  }
});

module.exports = router;
