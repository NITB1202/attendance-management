"use client";
import React, { useEffect, useState } from "react";
import Table from "../../../../component/Table";
import { Colors } from "../../../../constant/Colors";
import { useAuth } from "../../../../context/AuthContext";
import userApi from "../../../../api/userApi";
import RoundedButton from "../../../../component/RoundedButton";
import SuccessfulMessage from "../../../../component/SuccessfulMesage";

export default function ReportUpdate() {
  const [isMobile, setIsMobile] = useState(false);
  const {authState} = useAuth();
  const [name, setName] = useState("");
  const [opinion, setOpinion] = useState("This is a warning message. Please make sure to attend class on time from now on.");
  const [showMessage, setShowMessage] = useState(false);

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

  useEffect(() => {
    const fetchName = async () => {
      try{
        if(authState.id === null) return;
        const response = await userApi.getById(authState.id);
        setName(response.data.name);
        let storedOpinion = sessionStorage.getItem("opinion");
        if(storedOpinion === null) 
          storedOpinion = "This is a warning message. Please make sure to attend class on time from now on.";
        setOpinion(storedOpinion);
      }
      catch(error){
        console.log(error);
      }
    };

    fetchName();
  }, [authState]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOpinion(e.target.value);
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
      width: isMobile ? "95%" : "70%",
      border: "1px solid #ccc",
      borderRadius: 8,
      padding: "1.5rem",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "white",
    },
    paragraph: {
      fontSize: 16,
      lineHeight: 1.5,
      marginBottom: "20px",
    },
    highlightedText: {
      color: "#3A6D8C",
      fontWeight: 300,
    },
    tableContainer: {
      marginBottom: "20px",
    },
    textarea: {
      width: "100%",
      marginTop: "10px",
      padding: 10,
      fontSize: 14,
      border: "1px solid #ccc",
      borderRadius: 4,
      minHeight: 120,
      resize: "vertical",
    },
    footer: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: "20px",
      fontSize: 16,
    },
    saveButtonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
      width: 406,
    },
    saveButton: {
      backgroundColor: Colors.green,
      color: "white",
      border: "none",
      padding: "10px 24px",
      borderRadius: 4,
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: 16,
      width: "100%",
    },
    manager: {
      textAlign: "right",
      fontWeight: "bold",
      paddingTop: 10,
    },
  };

  const tableHeader = ["NUM", "DATE", "ARRIVAL TIME", "ATTENDANCE STATUS"];
  const tableData = [
    [" ", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ];

  const handleClick = () => {
    sessionStorage.setItem("opinion", opinion);
    setShowMessage(true);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>WARNING CONTENT</h1>
      <div style={styles.contentContainer}>
        <p style={styles.paragraph}>
          Dear{" "}
          <b>
            <span style={styles.highlightedText}>[Student name]</span>
          </b>
          , <br />
          You have been{" "}
          <b>
            <span style={styles.highlightedText}>[type]</span>
          </b>{" "}
          for class{" "}
          <b>
            <span style={styles.highlightedText}>[Class name]</span>
          </b>{" "}
          <b>
            <span style={styles.highlightedText}>[Number of violations]</span>
          </b>{" "}
          out of the{" "}
          <b>
            <span style={styles.highlightedText}>
              [Maximum number of violations]
            </span>
          </b>{" "}
          days allowed.
        </p>
        <p style={styles.paragraph}>Details:</p>

        <div style={styles.tableContainer}>
          <Table tableHeader={tableHeader} tableData={tableData} />
        </div>

        <textarea
          style={styles.textarea}
          value={opinion}
          onChange={handleChange}
        ></textarea>

        <div style={styles.footer}>
          <div>
            <p>Manager</p>
            <p style={styles.manager}>{name}</p>
          </div>
        </div>
      </div>

      <div style={styles.saveButtonContainer}>
        <RoundedButton
          title="SAVE CHANGES"
          style={styles.saveButton}
          onClick={handleClick}>
        </RoundedButton>
      </div>
      {
        showMessage &&
        <SuccessfulMessage
          title="Update successfully"
          description="Your opinion has been saved."
          setOpen={setShowMessage}>
        </SuccessfulMessage>
      }
    </div>
  );
}
