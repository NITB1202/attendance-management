"use client";
import { Camera } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import SmallInput from "../../../../component/SmallInput";
import CustomDatePicker from "../../../../component/CustomDatePicker";
import { format } from "date-fns-tz";
import RoundedButton from "../../../../component/RoundedButton";
import userApi from "../../../../api/userApi";
import { useAuth } from "../../../../context/AuthContext";
import QuestionMessage from "../../../../component/QuestionMessage";
import { useRouter, useSearchParams } from "next/navigation";

const ProfileScreen = () => {
  const {authState} = useAuth();
  const [data, setData] = useState({
    email: "",
    name: "",
    dob: "",
    phone: "",
    code: ""
  });
  
  const searchParams = useSearchParams(); 
  const id = searchParams.get('id');
  const [avatar, setAvatar] = useState("/Avatar-big.png");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await userApi.getById(id? id : authState.id);
        const email = response.data.roleCode + "@gmail.com";

        setData({
          email: email,
          name: response.data.name,
          dob: response.data.dob,
          phone: response.data.phoneNumber,
          code: response.data.roleCode
        })
      }
      catch(error){
        console.log("Error fetching user data");
      }
    };
    fetchData();
}, [authState]);

const updateValue = (key: string, value: string) =>{
  setData((prevData) => ({
      ...prevData,
      [key]: value,
  }));
}

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectDate = (date: Date | null) =>{
    if(date) return updateValue("dob", format(date, 'yyyy-MM-dd'));
  }

  const handleNavigate = ()=>{
      router.push("/auth/verify");
  }

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      maxWidth: "380px",
      margin: "20px auto",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      backgroundColor: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
    },
    avatarContainer: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
    },
    avatar: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      border: "2px solid #ccc",
    },
    iconContainer: {
      position: "absolute",
      top: "80%",
      left: "80%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#3a6d8c",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
    row: {
      display: "flex",
      gap: "20px",
    },
    resetPassword: {
      color: "#0900ff",
      textDecoration: "underline",
      cursor: "pointer",
      fontSize: 20,
    },

  };

  return (
    <div style={styles.container}>
      {/* Avatar Section */}
      <div style={styles.avatarContainer}>
        <img src={avatar} alt="Avatar" style={styles.avatar} />
        {
          id === null &&
          <button style={styles.iconContainer} onClick={handleIconClick}>
            <Camera color="white" size={28} />
          </button>
        }
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }} 
          onChange={handleFileChange}
        />
      </div>

      {/* Form Fields */}
      <SmallInput
        title="Email"
        onChangeText={(email) => updateValue("email", email)}
        defaultValue={data.email}
        style={{width: 380}}
        disable={true}>
      </SmallInput>

      <SmallInput
        title="Full name"
        onChangeText={(name)=> updateValue("name", name)}
        defaultValue={data.name}
        style={{width: 380}}
        disable={id !== null}>
      </SmallInput>

      <div style={styles.row}>
        <CustomDatePicker
          title="Date of birth"
          setSelectedDate={handleSelectDate}
          defaultValue={data.dob}
          disable={id !== null}>
        </CustomDatePicker>

        <SmallInput
          title="Phone"
          onChangeText={(phone)=> updateValue("phone", phone)}
          defaultValue={data.phone}
          disable={id !== null}>
        </SmallInput>
      </div>

      <SmallInput
        title="Role code"
        onChangeText={(code)=> updateValue("code", code)}
        style={{width: 380}}
        disable={true}
        defaultValue={data.code}>
      </SmallInput>
      
      {
        id === null &&
        <u style={styles.resetPassword} onClick={handleNavigate}>
          Reset password
        </u>
      }

      {
        id === null &&
        <RoundedButton
          title="Save"
          onClick={()=>setShowConfirm(true)}
          style={{width: 380}}>
        </RoundedButton>
      }
      {
        showConfirm &&
        <QuestionMessage
          title="Confirmation"
          description="Do you want to save changes?"
          setOpen={setShowConfirm}>
        </QuestionMessage>
      }
    </div>
  );
};

export default ProfileScreen;
