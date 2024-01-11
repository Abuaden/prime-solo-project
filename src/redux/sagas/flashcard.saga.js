import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* createFlashcard(action) {
  try {
    // clear any existing error on the flashcard page
    yield put({ type: "CREATE_FLASHCARD_ERROR" });

    // passes the username and password from the payload to the server
    yield axios.post("/api/admin/create-flashcard", action.payload);
    yield put({ type: "GET_FLASHCARDS" });

  } catch (error) {
    console.log("Error with creating flashcard:", error);
    yield put({ type: "FLASHCARD_FAILED" });
  }
}

function* fetchAllFlashcards() {
  try {
    // Get the flashcards:
    const flashcardsResponse = yield axios.get("/api/flashcards");
    // Set the value of the flashcards reducer:
    yield put({
      type: "SET_FLASHCARDS",
      payload: flashcardsResponse.data,
    });
  } catch (error) {
    console.log("fetchAllFlashcards error:", error);
  }
}
function* editFlashcard(action) {
  try {
    // clear any existing error on the flashcard page
    yield put({ type: "EDIT_FLASHCARD_ERROR" });

    // passes the username and password from the payload to the server
    yield axios.put("/api/admin/" + action.payload.id, action.payload);
    yield put({ type: "GET_FLASHCARDS" });
  } catch (error) {
    console.log("Error with creating flashcard:", error);
    yield put({ type: "FLASHCARD_FAILED" });
  }
}
function* deleteFlashcard(action) {
  try {
    // clear any existing error on the flashcard page
    yield put({ type: "DELETE_FLASHCARD_ERROR" });

    // passes the username and password from the payload to the server
    yield axios.delete("/api/admin/" + action.payload.id);
    yield put({ type: "GET_FLASHCARDS" });
  } catch (error) {
    console.log("Error with creating flashcard:", error);
    yield put({ type: "FLASHCARD_FAILED" });
  }
}

function* flashcardSaga() {
  yield takeLatest("CREATE_FLASHCARD", createFlashcard);
  yield takeLatest("GET_FLASHCARDS", fetchAllFlashcards);
  yield takeLatest("EDIT_FLASHCARD", editFlashcard);
  yield takeLatest("DELETE_FLASHCARD", deleteFlashcard);

}

export default flashcardSaga;
