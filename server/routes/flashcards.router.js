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
  const queryText = `SELECT * FROM "flashcards" ORDER BY "level_id" ASC;`;
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
    .query(queryText, [req.body.flippedId, req.params.user_id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Adding flashcard error: ", err);
      res.sendStatus(500);
    });
});
router.put("/upgrade/:user_id", rejectUnauthenticated, (req, res, next) => {
  const queryText = ` UPDATE "user"
  SET "current_level" = $1
  WHERE "id" = $2;
  `;
  pool
    .query(queryText, [req.body.level_id, req.params.user_id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Adding flashcard error: ", err);
      res.sendStatus(500);
    });
});

// this endpoint is used for getting the number of flipped flashcards for a certain user
router.get("/flips", rejectUnauthenticated, (req, res, next) => {
  const queryText = `SELECT
      "id",
      "flashcards_flipped" AS "flashcards_count"
  FROM
      "user"
  WHERE
      "id" = $1;
  `;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Adding flashcard error: ", err);
      res.sendStatus(500);
    });
});
// this endpoint is used for getting the number cards in each level
router.get("/get-level-count", rejectUnauthenticated, (req, res, next) => {
  const queryText = `SELECT
  levels.id AS level_id,
  levels.name AS level_name,
  COUNT(flashcards.id) AS flashcard_count
FROM
  "levels"
LEFT JOIN
  "flashcards" ON levels.id = flashcards.level_id
GROUP BY
  levels.id, levels.name
ORDER BY
  levels.id;
  `;
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

module.exports = router;
