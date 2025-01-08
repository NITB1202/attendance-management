"use client";

import RoundedButton from "../../../../component/RoundedButton";
import { LuCirclePlus } from "react-icons/lu";
import { IoCameraOutline } from "react-icons/io5";

import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import classApi from "../../../../api/classApi";
import { useRouter } from "next/navigation";
import { Colors } from "../../../../constant/Colors";
import { toZonedTime } from 'date-fns-tz';


export default function RollcallStudent() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [QRContent, setQRContent] = useState({
    id: 0,
    className: "",
    session: 0,
  });
  const [classes, setClasses] = useState<{id: number, className: string; session: number, startTime: string, allowedLateTime: number}[]>([]);
  const [screenWidth, setScreenWidth] = useState(700);
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const getClassess = async () => {
      try {
        const response = await classApi.getRollCallClasses();
        setClasses(response.data.map((item: any) => ({
          id: item.session.id,
          className: item.name,
          session: item.session.no,
          startTime: item.session.startTime,
          allowedLateTime: item.allowedLateTime,
        })))
      } catch (error) {
        console.error(error);
      }
    };

    getClassess();
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
      let interval: NodeJS.Timeout | null = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setShowQR(false);
            if (interval) clearInterval(interval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
  
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [timer]);

  const handleGenerateQRCode = () => {
    setSelectedIndex(0);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIndex(Number(event.target.value));
  };

  const handleConfirm = () => {
    console.log(selectedIndex);
    const selectClass = classes.at(selectedIndex);
    if(selectClass){
        setQRContent({
            id: selectClass.id,
            className: selectClass.className,
            session: selectClass.session,
        })

        const secondLeft = handleTime(selectClass.startTime);
        if(secondLeft <= 0)
            setTimer(120);
        else
            setTimer(secondLeft);
    }
    setModalVisible(false);
    setShowQR(true);
  };

  const handleScanQRCode = () => {
    router.push("/student/camera");
  };

  const flexDirection = screenWidth > 600? "row": "column";

  return (
    <div style={styles.container}>
      <div style={{...styles.buttonContainer, flexDirection }}>
        <RoundedButton
            title="Generate QR Code"
            style={styles.generateButton}
            textStyle={styles.buttonText}
            icon={<LuCirclePlus color="white" width={4} size={26}/>}
            onClick={handleGenerateQRCode}>
        </RoundedButton>
        <RoundedButton
            title="Scan QR Code"
            style={styles.scanButton}
            textStyle={styles.buttonText}
            icon={<IoCameraOutline color="white" width={4} size={30}/>}
            onClick={handleScanQRCode}>
        </RoundedButton>
      </div>

      <div style={styles.qrContainer}>
        {showQR && <QRCodeCanvas value={JSON.stringify(QRContent)} size={300} />}
      </div>

      {showQR && <div style={styles.timer}>{formatTime(timer)}</div>}

      {isModalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button onClick={handleCloseModal}>
                <img src="/icon/close.png" alt="Close" />
            </button>
            <h2 style={styles.modalTitle}>Take a roll call</h2>
            <p style={styles.modalText}>
              Select the class for which you would like to take a roll call
            </p>
            <select style={styles.select} onChange={handleSelectChange} defaultValue="">
                {classes.map((classroom, index) => (
                  <option
                    key={classroom.id}
                    style={styles.option}
                    value={index}>
                    {classroom.className}
                  </option>
                ))}
            </select>

            <RoundedButton
                title="CONFIRM"
                style={styles.confirmButton}
                textStyle={styles.buttonText}
                onClick={handleConfirm}>
            </RoundedButton>
          </div>
        </div>
      )}
    </div>
  );
};

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const handleTime = (timeString: string) =>{
    const date = new Date(timeString);
    date.setMinutes(date.getMinutes());
    const currentTime= toZonedTime(new Date(), 'Asia/Ho_Chi_Minh');
    const duration = date.getTime() - currentTime.getTime();
    const seconds = duration/1000;
    return Math.round(seconds);
}   


const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    marginTop: 100,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  generateButton: {
    backgroundColor: Colors.green,
    width: 250,
  },
  scanButton:{
    width: 250,
  },
  buttonText:{
    fontSize: 20,
  },
  qrContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 350,
    borderColor: Colors.darkBlue,
    borderRadius: 10,
    borderWidth: 20,
  },
  timer: {
    fontSize: "30px",
    fontWeight: 600,
    marginTop: "20px",
    color: "red",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "10px",
    width: "380px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    width: "100%"
  },
  modalText: {
    marginBottom: "10px",
  },
  confirmButton: {
    backgroundColor: Colors.green,
    width: "100%",
    padding: "5px 0px"
  },
  select:{
    width: "100%",
    border: "1px solid #ccc",
    borderRadius:5,
    marginBottom: 20,
    padding: "5px 10px",
    backgroundColor: "white",
  },
  option:{
    backgroundColor: "white",
    fontFamily: "Roboto, sans-serif",
    fontSize: 16,
    color: "black",
    width: "100%",
  }
};
