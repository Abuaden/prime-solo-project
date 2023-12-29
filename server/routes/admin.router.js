const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// this endpoint is used by the admin to create new flashcards
router.post("/create-flashcard", rejectUnauthenticated, (req, res, next) => {
  const queryText = `INSERT INTO "flashcards" (arabicword, englishword, level_id)
  VALUES ($1,$2,$3) RETURNING id `;
  pool
    .query(queryText, [
      req.body.arabicword,
      req.body.englishword,
      req.body.level_id,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Adding flashcard error: ", err);
      res.sendStatus(500);
    });
});

// this endpoint is used by the admin to delete flashcards
router.delete("/:id", rejectUnauthenticated, (req, res, next) => {
  const queryText = `DELETE FROM "flashcards" WHERE id = $1`;
  pool
    .query(queryText, [req.params.id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Deleting flashcard error: ", err);
      res.sendStatus(500);
    });
});

// this endpoint is used by the admin to edit flashcards
router.put("/:id", rejectUnauthenticated, (req, res, next) => {
  const queryText = `UPDATE "flashcards" SET
      "arabicword" = $1,
      "englishword" = $2,
      "level_id" = $3
  WHERE "id" = $4;
    `;
  pool
    .query(queryText, [
      req.body.arabicword,
      req.body.englishword,
      req.body.level_id,
      req.params.id
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Editing flashcard error: ", err);
      res.sendStatus(500);
    });
});
module.exports = router;
