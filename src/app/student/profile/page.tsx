"use client";
import { Camera } from "lucide-react";
import React, { useRef, useState } from "react";

const ProfileScreen = () => {
  const [username, setUsername] = useState("Anna Maderlaise");
  const [fullName, setFullName] = useState("Anna Maderlaise");
  const [dateOfBirth, setDateOfBirth] = useState("1998-07-12");
  const [phone, setPhone] = useState("0934567823");
  const [roleCode, setRoleCode] = useState("");

  const [avatar, setAvatar] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_gaxAkYYDw8UfNleSC2Viswv3xSmOa4bIAQ&s"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(e.target.value);
  };

  const handleIconClick = () => {
    fileInputRef.current?.click(); // Kích hoạt input file khi nhấn vào icon
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string); // Hiển thị ảnh mới
      };
      reader.readAsDataURL(file);
    }
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "20px auto", // Căn giữa theo chiều ngang
      display: "flex",
      flexDirection: "column" as const,
      gap: "20px",
      backgroundColor: "#FFFFFF",
    },
    avatarContainer: {
      position: "relative" as const,
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
      position: "absolute" as const,
      top: "80%", // Đặt icon ở giữa theo chiều dọc
      left: "60%", // Đặt icon ở giữa theo chiều ngang
      transform: "translate(-50%, -50%)", // Dịch chuyển để icon nằm chính giữa
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
    label: {
      fontSize: "16px",
      fontWeight: 500,
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    row: {
      display: "flex",
      gap: "20px",
    },
    column: {
      flex: 1,
    },
    resetPassword: {
      color: "#0900ff",
      textDecoration: "underline",
      cursor: "pointer",
    },
    saveButton: {
      backgroundColor: "#3a6d8c",
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      {/* Avatar Section */}
      <div style={styles.avatarContainer}>
        <img src={avatar} alt="Avatar" style={styles.avatar} />
        <button style={styles.iconContainer} onClick={handleIconClick}>
          <Camera color="white" size={28} />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }} // Ẩn input file
          onChange={handleFileChange}
        />
      </div>

      {/* Form Fields */}
      <label style={styles.label}>User name</label>
      <input
        type="text"
        style={styles.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter user name"
      />

      <label style={styles.label}>Full name</label>
      <input
        type="text"
        style={styles.input}
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Enter full name"
      />

      <div style={styles.row}>
        <div style={styles.column}>
          <label style={styles.label}>Date of birth</label>
          <input
            type="date"
            style={styles.input}
            value={dateOfBirth}
            onChange={handleDateChange}
          />
        </div>

        <div style={styles.column}>
          <label style={styles.label}>Phone</label>
          <input
            type="tel"
            style={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <label style={styles.label}>Role code</label>
      <input
        type="text"
        style={styles.input}
        value={roleCode}
        onChange={(e) => setRoleCode(e.target.value)}
        placeholder="Enter role code"
      />

      <a href="#" style={styles.resetPassword}>
        Reset password
      </a>

      <button style={styles.saveButton}>Save</button>
    </div>
  );
};

export default ProfileScreen;
