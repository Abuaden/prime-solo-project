import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

function CreateFlashCard({closeModel}) {
  const [englishWord, setEnglishWord] = useState("");
  const [arabicWord, setArabicWord] = useState("");
  const [levelId, setLevelId] = useState("");

  const create = () => {
    const body = {
      englishWord: englishWord,
      arabicWord: arabicWord,
      levelId: levelId,
    };
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <input
          type="text"
          placeholder="Enter English Word"
          value={englishWord}
          onChange={(e) => setEnglishWord(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Arabic Word"
          value={arabicWord}
          onChange={(e) => setArabicWord(e.target.value)}
        />
        <select
          name="level"
          id="level"
          value={levelId}
          onChange={(e) => setLevelId(e.target.value)}
        >
          <option value="1">level 1</option>
          <option value="2">level 2</option>
          <option value="3">level 3</option>
          <option value="4">level 4</option>
        </select>
        <button className="create">Create Flashcard</button>
        <button className="cancel" onClick={()=>closeModel()}>Cancel</button>
      </div>
    </div>
  );
}

export default CreateFlashCard;
