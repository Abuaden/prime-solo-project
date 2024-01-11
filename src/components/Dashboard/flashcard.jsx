import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function FlashCard({ flashcard }) {
  const dispatch = useDispatch();
  const [showArabic, setShowArabic] = useState(true);
  return (
    <div
      onClick={() => setShowArabic(!showArabic)}
      className={`bg-red current-flashcard flip-card ${showArabic ? "" : "flipped"}`}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">{flashcard?.arabicword}</div>
        <div className="flip-card-back">{flashcard?.englishword}</div>
      </div>
    </div>
  );
}

export default FlashCard;
