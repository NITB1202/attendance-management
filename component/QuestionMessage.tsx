import React from "react";
import RoundedButton from "./RoundedButton";

interface QuestionMessageProps {
  title: string;
  description: string;
  setOpen: (open: boolean) => void;
  onAgree?: () => void;
  onDeny?: () => void;
}

const QuestionMessage: React.FC<QuestionMessageProps> = ({ title, description, setOpen, onAgree, onDeny }) => {
  return (
    <div style={styles.shadow}>
      <div style={styles.messageContainer}>
        <button 
            style={styles.closeButton} 
            onClick={() => 
                    {
                        if (onDeny) onDeny();
                        setOpen(false);
                    }
                }
            >
          <img src="/icon/close.png" alt="Close" />
        </button>
        <div style={styles.titleContainer}>
          <img src="/icon/question-icon.png" alt="Question icon" />
          <span style={styles.title}>{title}</span>
        </div>
        <p style={styles.description}>{description}</p>
        <div style={styles.buttonContainer}>
            <RoundedButton
                title="OK"
                style={styles.okButton}
                textStyle={styles.okText}
                onClick={() => 
                    {
                        if(onAgree) onAgree();
                        setOpen(false);
                    }
                }
            />
            <RoundedButton
                title="Cancel"
                style={styles.cancelButton}
                textStyle={styles.cancelText}
                focusColor="#ADACAC"
                onClick={() => 
                    {
                      if (onDeny) onDeny();
                      setOpen(false);
                    }
                }
            />
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    shadow: {
      position: "fixed",
      top: 0,
      left: 0,
      width: '100vw',
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    messageContainer: {
      zIndex: 10,
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
      padding: "10px",
      width: "375px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "flex-end",
    },
    titleContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      gap: "10px",
      width: "100%",
    },
    title: {
      fontFamily: "Roboto, sans-serif",
      fontWeight: 700,
      fontSize: "20px",
    },
    description: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "14px",
      textAlign: "left",
      width: "100%",
      paddingBottom: "10px",
    },
    closeButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    buttonContainer:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
    },
    okButton:{
        width: 100,
        height: 35,
    },
    cancelButton:{
        width: 100,
        height: 35,
        backgroundColor: "#CCCCCC",
    },
    okText:{
        fontSize: 20,
        fontWeight: 600,
    },
    cancelText:{
        fontSize: 20,
        fontWeight: 500,
        color: "black",
    }
};

export default QuestionMessage;