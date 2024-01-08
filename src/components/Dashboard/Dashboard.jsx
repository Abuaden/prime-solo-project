import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

function DashboardPage() {
  const user = useSelector((store) => store.user);
  const galleryRef = useRef(null);
  const [totalSlides, setTotalSlides] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToNext = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        left: galleryRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

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

  return (
    <div className="boxer">
      <nav className="dashboard-nav">
        <div className="headerat">
          <a href="/#/dashboard" > Flashcard</a>
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
          <div className="bg-red current-flashcard">يلعب</div>
          <div className="bg-blue current-flashcard">بقرة</div>
          <div className="bg-green current-flashcard">لسان</div>
          <div className="bg-yellow current-flashcard">حصان</div>
          <div className="bg-black current-flashcard">بطانية</div>
          <div></div>
          
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
          {currentSlide}/{totalSlides}
        </span>
      </section>
    </div>
  );
}

export default DashboardPage;
