
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(256) NOT NULL UNIQUE,
	"email" varchar(256) NOT NULL UNIQUE,
	"password" varchar(256) NOT NULL,
	"firstname" varchar(256) NOT NULL,
	"lastname" varchar(256) NOT NULL,
	"current_level" integer NOT NULL,
	"role" varchar(256) NOT NULL DEFAULT 'user',
	"flashcards_flipped" TEXT [],
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
);



CREATE TABLE "flashcards" (
	"id" serial NOT NULL,
	"arabicword" varchar(256) NOT NULL,
	"englishword" varchar(256) NOT NULL,
	"level_id" integer NOT NULL,
	CONSTRAINT "flashcards_pk" PRIMARY KEY ("id")
);



CREATE TABLE "levels" (
	"id" serial NOT NULL,
	"name" varchar(256) NOT NULL,
	CONSTRAINT "levels_pk" PRIMARY KEY ("id")
);


ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("current_level") REFERENCES "levels"("id");

ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_fk0" FOREIGN KEY ("level_id") REFERENCES "levels"("id");





