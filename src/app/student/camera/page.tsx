"use client"

import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import userApi from "../../../../api/userApi";
import QRScanner from "../../../../component/QRScanner";
import attendanceApi from "../../../../api/attendanceApi";
import RoundedButton from "../../../../component/RoundedButton";
import { Colors } from "../../../../constant/Colors";
import SuccessfulMessage from "../../../../component/SuccessfulMesage";
import ErrorMessage from "../../../../component/ErrorMessage";
import QuestionMessage from "../../../../component/QuestionMessage";

export default function OpenCamera() {
  const { authState } = useAuth();
  const [user, setUser] = useState<{ name: string; code: string }>({
    name: '',
    code: '',
  });
  const [data, setData] = useState('');
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [jsonData, setJsonData] = useState<{ id: number; className: string; session: number }>({
    id: 0,
    className: '',
    session: 0,
  });
  const [message, setMessage] = useState<{ type: string; title: string; description: string }>({
    type: '',
    title: '',
    description: '',
  });
  const [showMessage, setShowMessage] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [loadingPermission, setLoadingPermission] = useState(true);

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        const status = await navigator.permissions.query({ name: 'camera' as PermissionName });
        setCameraPermission(status.state);
        setLoadingPermission(false);

        status.onchange = () => {
          setCameraPermission(status.state);
        };
      } catch (error) {
        console.error('Error checking camera permission', error);
        setLoadingPermission(false);
      }
    };

    checkCameraPermission();
  }, []);

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setCameraPermission('granted');
    } catch (error) {
      setCameraPermission('denied');
    }
  };

  useEffect(() => {
    if (cameraPermission === 'granted' && isScanning) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setCameraStream(stream);
        } catch (error) {
          setShowMessage(true);
          setMessage({
            type: "error",
            title: "Error",
            description: "Can't open camera"
          });
        }
      };

      startCamera();
    }

    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
        setCameraStream(null);
      }
    };
  }, [isScanning, cameraPermission]);

  useEffect(() => {
    const getUser = async () => {
      if (authState.id) {
        try {
          const response = await userApi.getById(authState.id);
          setUser({
            name: response.data.name,
            code: response.data.roleCode,
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    getUser();
  }, [authState.id]);

  useEffect(() => {
    const decodeData = async () => {
      if (data !== '') {
        setIsScanning(false);
        setShowConfirm(true);
        try {
          const parsedData = JSON.parse(data);
          setJsonData({
            id: parsedData.id,
            className: parsedData.className,
            session: parsedData.session,
          });
          setData('');
        } catch (error) {
          setShowMessage(true);
          setMessage({
            type: 'error',
            title: 'Error',
            description: 'Invalid QR Code.',
          });
        }
      }
    };
    decodeData();
  }, [data]);

  const handleCloseModal = () => {
    setShowConfirm(false);
    setIsScanning(true);
  };

  const denyAccess = () =>{
    setCameraPermission('denied');
  }

  const handleConfirm = async () => {
    try {
      await attendanceApi.create(jsonData.id);
      setShowMessage(true);
      setMessage({
        type: 'success',
        title: 'Roll call successfully',
        description: 'Your attendance has been recorded.',
      });
      handleCloseModal();
    } catch (error) {
      setShowMessage(true);
      setMessage({
        type: 'error',
        title: 'Invalid attendance',
        description: 'The classroom is over.',
      });
      handleCloseModal();
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      {!loadingPermission && cameraPermission === 'prompt' && (
        <QuestionMessage
          title="Access permission"
          description="You need to allow camera access to scan QR codes."
          setOpen={setShowMessage}
          onAgree={requestCameraAccess}
          onDeny={denyAccess}
        />
      )}
      {cameraPermission === 'granted' && (
        <QRScanner
          style={styles.camera}
          setData={setData}
          isScanning={isScanning}
        />
      )}
      {cameraPermission === 'denied' && (
        <p style={styles.deniedMessage}>Camera access denied. Please allow permission in your browser settings.</p>
      )}
      {showConfirm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button onClick={handleCloseModal}>
              <img src="/icon/close.png" alt="Close" />
            </button>
            <h2 style={styles.title}>Attendance confirmation</h2>
            <div style={styles.body}>
              <div>
                <p>Class name:</p>
                <p>Session no:</p>
                <p>Date:</p>
                <p>Student name:</p>
                <p>Student code:</p>
                <p>Arrival time:</p>
              </div>
              <div>
                <p>{jsonData.className}</p>
                <p>{jsonData.session}</p>
                <p>{new Date().toLocaleDateString()}</p>
                <p>{user.name}</p>
                <p>{user.code}</p>
                <p>{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
            <RoundedButton
              title="CONFIRM"
              style={styles.button}
              textStyle={styles.buttonText}
              onClick={handleConfirm}
            />
          </div>
        </div>
      )}
      {showMessage && message.type === 'success' && (
        <SuccessfulMessage
          title={message.title}
          description={message.description}
          setOpen={setShowMessage}
        />
      )}
      {showMessage && message.type === 'error' && (
        <ErrorMessage
          title={message.title}
          description={message.description}
          setOpen={setShowMessage}
        />
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
    camera:{
        marginTop: 200,
        width: "100%",
        height: "100%",
    },
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: '100vw',
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)"
      },
      modalContent:{
        zIndex: 10,
        width: 300,
        backgroundColor: "white",
        borderRadius: 10,
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
        padding: 10,
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
      },
      button:{
        width: "100%",
        height: 40,
        padding: "5px 0px",
        backgroundColor: Colors.green,
      },
      buttonText:{
        fontSize: 17
      },
      title:{
        fontSize: 20,
        fontWeight: 600,
        textAlign: "left",
        width: "100%",
      },
      body:{
        display: "flex",
        flexDirection: "row",
        gap: 60,
        margin: "10px 0px",
        width: "100%",
      },
      deniedMessage:{
        fontSize: 20,
        color: "red"
      }
}