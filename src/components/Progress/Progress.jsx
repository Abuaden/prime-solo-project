import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function Progress() {
  const user = useSelector((store) => store.user);
  const progress = useSelector((store) => store.progressReducer);
  console.log(user);
  console.log(progress);

  const getLevelNameFromId = (level_id) => {
    if (level_id === "1") {
      return "Novice";
    } else if (level_id === "2") {
      return "Advanced Beginner";
    } else if (level_id === "3") {
      return "Proficient";
    } else if (level_id === "4") {
      return "Master";
    }
  };
  return (
    <div className="progress">
      <h1 className="flipped-count current-level">
        You are now {getLevelNameFromId(user?.current_level?.toString())}!
      </h1>
      <h2 className="flipped-count">
        You have now flipped {user?.flashcards_flipped?.length} flashcards!!{" "}
      </h2>
    </div>
  );
}

export default Progress;
