"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import RoundedButton from "../../../../component/RoundedButton";

const CustomSlider = styled(Slider)({
  color: "#3A6D8C",
  "& .MuiSlider-track": {
    backgroundColor: "#3A6D8C",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "rgba(106, 154, 176, 0.3)",
  },
  "& .MuiSlider-thumb": {
    backgroundColor: "#3A6D8C", // Màu của nút kéo
  },
});

const CustomRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#6A9AB0",
    fontSize: 36,
  },
  "& .MuiRating-iconHover": {
    color: "#55879A",
    fontSize: 36,
  },
  "& .MuiRating-iconEmpty": {
    color: "#D9D9D9",
    fontSize: 36,
  },
});

export default function Survey() {
  const [isMobile, setIsMobile] = useState(false);
  const [sliderValues, setSliderValues] = useState({
    understanding: 70,
    knowledge: 50,
  });
  const [ratings, setRatings] = useState({
    teaching: 3,
    atmosphere: 3,
    document: 3,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSliderChange =
    (name: string) => (event: Event, value: number | number[]) => {
      setSliderValues((prev) => ({ ...prev, [name]: value }));
    };

  const handleRatingChange =
    (name: string) => (event: React.SyntheticEvent, value: number | null) => {
      setRatings((prev) => ({ ...prev, [name]: value || 0 }));
    };

  const handleSend = () => {
    console.log("Slider values:", sliderValues);
    console.log("Ratings:", ratings);
    alert("Survey submitted!");
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Roboto, sans-serif",
      gap: 20,
      padding: "1rem",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "20px",
    },
    contentContainer: {
      width: isMobile ? "90%" : "25%",
      border: "1px solid #ccc",
      borderRadius: 8,
      padding: "1.5rem",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "white",
    },
    question: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: "10px",
    },
    saveButtonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <Box style={styles.contentContainer}>
        <h1 style={styles.title}>SURVEY</h1>
        {/* Question 1 */}
        <div>
          <p style={styles.question}>1. Understanding level</p>
          <CustomSlider
            value={sliderValues.understanding}
            onChange={handleSliderChange("understanding")}
            aria-label="Understanding"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            defaultValue={70}
          />
        </div>

        {/* Question 2 */}
        <div>
          <p style={styles.question}>2. The value of knowledge</p>
          <CustomSlider
            value={sliderValues.knowledge}
            onChange={handleSliderChange("knowledge")}
            aria-label="Knowledge"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            defaultValue={50}
          />
        </div>

        {/* Question 3 */}
        <div>
          <p style={styles.question}>3. Evaluate teacher’s teaching method</p>
          <CustomRating
            name="teaching"
            value={ratings.teaching}
            onChange={handleRatingChange("teaching")}
            precision={1}
          />
        </div>

        {/* Question 4 */}
        <div>
          <p style={styles.question}>4. Evaluate class’s atmosphere</p>
          <CustomRating
            name="atmosphere"
            value={ratings.atmosphere}
            onChange={handleRatingChange("atmosphere")}
            precision={1}
          />
        </div>

        {/* Question 5 */}
        <div>
          <p style={styles.question}>5. Evaluate support document</p>
          <CustomRating
            name="document"
            value={ratings.document}
            onChange={handleRatingChange("document")}
            precision={1}
          />
        </div>

        <div style={styles.saveButtonContainer}>
          <RoundedButton
            title="SEND"
            onClick={handleSend}
            style={{
              backgroundColor: "#001F3F",
              padding: "auto",
              width: "100%",
            }}
            textStyle={{ color: "white", fontSize: "24px" }}
          />
        </div>
      </Box>
    </div>
  );
}
