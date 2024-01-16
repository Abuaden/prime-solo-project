import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function FlashCard({ flashcard }) {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [showArabic, setShowArabic] = useState(false);
  const flipThisCard = () => {
    const body = { flippedId: flashcard?.id, userId: user?.id };
    if (progress.includes(flashcard?.id.toString())) {
      console.log("this card has already been flipped");
      return;
    }
    dispatch({
      type: "FLIP_FLASHCARD",
      payload: body,
    });
  };
  const progress = useSelector((store) => store.progressReducer);

  
  return (
    <div
      onClick={() => {
        setShowArabic(!showArabic);
        flipThisCard();
      }}
      className={`bg-red current-flashcard flip-card ${
        showArabic ? "" : "flipped"
      }`}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">{flashcard?.arabicword}</div>
        <div className="flip-card-back">{flashcard?.englishword}</div>
      </div>
    </div>
  );
}

export default FlashCard;
