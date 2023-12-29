const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// this endpoint is used for getting ALL the flashcards
router.get("/", rejectUnauthenticated, (req, res, next) => {
  const queryText = `SELECT * FROM "flashcards"`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Adding flashcard error: ", err);
      res.sendStatus(500);
    });
});

// this endpoint is used for tracking a flipped flashcard
router.put("/flips/:user_id", rejectUnauthenticated, (req, res, next) => {
  const queryText = ` UPDATE "user"
  SET "flashcards_flipped" = ARRAY_APPEND("flashcards_flipped", $1)
  WHERE "id" = $2;
  `;
  pool
    .query(queryText,[req.body.flippedId, req.params.user_id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Adding flashcard error: ", err);
      res.sendStatus(500);
    });
});

// this endpoint is used for getting the number of flipped flashcards for a certain user
router.get("/flips/:user_id", rejectUnauthenticated, (req, res, next) => {
  const queryText = `SELECT
      "id",
      ARRAY_LENGTH("flashcards_flipped", 1) AS "flashcards_count"
  FROM
      "user"
  WHERE
      "id" = $1;
  `;
  pool
    .query(queryText,[req.params.user_id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Adding flashcard error: ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
