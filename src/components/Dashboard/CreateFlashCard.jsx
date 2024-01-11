import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function CreateFlashCard({ closeModel, editingFlashcard }) {
  const [englishWord, setEnglishWord] = useState("");
  const [arabicWord, setArabicWord] = useState("");
  const [levelId, setLevelId] = useState("");
  const dispatch = useDispatch();
  const create = () => {
    const body = {
      englishword: englishWord,
      arabicword: arabicWord,
      // Check if level id was selected if not we default to level 1
      level_id: levelId?.length > 0 ? levelId : "1",
    };
    dispatch({
      type: "CREATE_FLASHCARD",
      payload: body,
    });
    closeModel();
  };

  const edit = () => {
    const body = {
      englishword: englishWord,
      arabicword: arabicWord,
      level_id: levelId,
      id: editingFlashcard?.id,
    };
    dispatch({
      type: "EDIT_FLASHCARD",
      payload: body,
    });
    closeModel();
  };

  // this useEffect checks if we're on edit mode then prefills englishword arabicword and level id
  useEffect(() => {
    if (editingFlashcard) {
      setEnglishWord(editingFlashcard?.englishword);
      setArabicWord(editingFlashcard?.arabicword);
      setLevelId(editingFlashcard?.level_id);
    }
  }, [editingFlashcard]);
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
        <button
          className="create"
          onClick={() => (editingFlashcard ? edit() : create())}
        >
          Create Flashcard
        </button>
        <button className="cancel" onClick={() => closeModel()}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CreateFlashCard;
