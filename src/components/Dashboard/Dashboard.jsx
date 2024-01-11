import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateFlashCard from "./CreateFlashCard";
import FlashCard from "./flashcard";
function DashboardPage() {
  const user = useSelector((store) => store.user);
  const galleryRef = useRef(null);
  const [totalSlides, setTotalSlides] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const scrollToNext = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        left: galleryRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };
  const dispatch = useDispatch();
  const scrollToPrev = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        left: -galleryRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    if (gallery) {
      setTotalSlides(gallery.children.length);
      gallery.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (gallery) {
        gallery.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScroll = () => {
    if (galleryRef.current) {
      const currentSlideIndex = Math.round(
        galleryRef.current.scrollLeft / galleryRef.current.clientWidth
      );
      setCurrentSlide(currentSlideIndex + 1);
    }
  };

  const allFlashcards = useSelector((store) => store.flashcardReducer);
  const progress = useSelector((store) => store.progressReducer);

  useEffect(() => {
    dispatch({ type: "GET_FLASHCARDS" });
  }, [dispatch]);

 

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

  const [editingFlashcard, setEditingFlashcard] = useState(null);
  return (
    <>
      <div className="boxer">
        {user?.role !== "admin" && (
          <>
            <nav className="dashboard-nav">
              <div className="headerat">
                <a href="/#/dashboard"> Flashcard</a>
                <a href="/#/quiz"> Quiz</a>
                <a href="/#/progress"> MyProgress</a>
              </div>
            </nav>
            <section className="flashcards">
              <div
                id="allFlashcards"
                className="all-flashcards no-scrollbar "
                ref={galleryRef}
                style={{
                  display: "flex",
                  overflowX: "scroll",
                  scrollSnapType: "x mandatory",
                }}
              >
                {allFlashcards?.map((flashcard, index) => (
                  <FlashCard key={index} flashcard={flashcard} />
                ))}
              </div>
              <div className="arrows">
                <svg
                  onClick={scrollToPrev}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-left-circle"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 12H8" />
                  <path d="m12 8-4 4 4 4" />
                </svg>
                <svg
                  onClick={scrollToNext}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right-circle"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8" />
                  <path d="m12 16 4-4-4-4" />
                </svg>
              </div>
              <span className="active-flashcard">
                {currentSlide}/{allFlashcards?.length}
              </span>
            </section>
          </>
        )}
        {user?.role === "admin" && (
          <section className="adminView">
            <div className="admin-navigation">
              <button
                className="create-card"
                onClick={() => setShowPopup(true)}
              >
                Create New Flashcard
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>English Word</th>
                  <th>Arabic Word</th>
                  <th>Level</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allFlashcards?.map((flashcard, index) => (
                  <tr key={index}>
                    <td>{flashcard?.englishword}</td>
                    <td>{flashcard?.arabicword}</td>
                    <td>
                      {getLevelNameFromId(flashcard?.level_id?.toString())}
                    </td>
                    <td className="tableButtons">
                      <button
                        onClick={() => {
                          // Save the flashcard to be edited on the editing flashcard state
                          setEditingFlashcard(flashcard);
                          // show the popup model
                          setShowPopup(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          const body = {
                            id: flashcard?.id,
                          };
                          dispatch({
                            type: "DELETE_FLASHCARD",
                            payload: body,
                          });
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
        {showPopup && (
          <CreateFlashCard
            closeModel={() => setShowPopup(false)}
            editingFlashcard={editingFlashcard}
          />
        )}
      </div>
    </>
  );
}
export default DashboardPage;
