"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, List } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Dropdown from "./Dropdown";
import Input from "./Input";
import RoundedButton from "./RoundedButton";

interface RollCallerModalProps {
  open: boolean;
  onClose: () => void;
  rollCallers?: { name: string; code: string }[];
  absent?: string[];
}

const RollCallerModal: React.FC<RollCallerModalProps> = ({ open, onClose }) => {
  const rollCallers = [
    { name: "Nguyen Van A", code: "A001" },
    { name: "Tran Thi B", code: "B002" },
    { name: "Le Van C", code: "C003" },
  ];

  const [rollCallerName, setRollCallerName] = useState(rollCallers[0].name); // Giá trị mặc định là tên đầu tiên
  const [studentCode, setStudentCode] = useState("");
  useEffect(() => {
    const defaultRollCaller = rollCallers.find(
      (caller) => caller.name === rollCallerName
    );
    setStudentCode(defaultRollCaller ? defaultRollCaller.code : "");
  }, [rollCallerName]);

  const handleDropdownChange = (value: React.SetStateAction<string>) => {
    setRollCallerName(value);
    const selectedRollCaller = rollCallers.find(
      (caller) => caller.name === value
    );
    setStudentCode(selectedRollCaller ? selectedRollCaller.code : "");
  };

  const absent = ["Morton Hamsey", "Jack Tarco", "Alice Smith", "John Doe"];

  const [absentList, setAbsentList] = useState<string[]>([]); // Danh sách vắng mặt
  const [filteredAbsent, setFilteredAbsent] = useState<string[]>(absent); // Lọc những người chưa thêm vào danh sách vắng mặt
  const [newAbsentee, setNewAbsentee] = useState<string>(
    filteredAbsent[0] || ""
  ); // Sử dụng phần tử đầu tiên của filteredAbsent làm giá trị mặc định

  // Cập nhật filteredAbsent khi absentList thay đổi
  useEffect(() => {
    const updatedFilteredAbsent = absent.filter(
      (name) => !absentList.includes(name)
    );
    setFilteredAbsent(updatedFilteredAbsent);

    // Nếu filteredAbsent có giá trị mới, thì set lại newAbsentee
    if (
      !updatedFilteredAbsent.includes(newAbsentee) &&
      updatedFilteredAbsent.length > 0
    ) {
      setNewAbsentee(updatedFilteredAbsent[0]);
    }
  }, [absentList]);

  const handleAddAbsentee = () => {
    if (newAbsentee && !absentList.includes(newAbsentee)) {
      setAbsentList([...absentList, newAbsentee]); // Thêm vào danh sách vắng mặt
      setFilteredAbsent(filteredAbsent.filter((name) => name !== newAbsentee)); // Loại bỏ tên khỏi dropdown
      setNewAbsentee(""); // Reset giá trị của input sau khi thêm
    }
  };

  const handleRemoveAbsentee = (name: string) => {
    setAbsentList(absentList.filter((item) => item !== name));
    setFilteredAbsent([...filteredAbsent, name]); // Thêm lại tên vào dropdown khi được loại bỏ
  };

  const handleSave = () => {
    console.log("Attendance status updated", { rollCallerName, absentList });
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={null}
      width={500}
    >
      <div style={styles.modalContent}>
        <div style={styles.label}>Roll Caller</div>
        <div style={styles.row}>
          <div style={styles.item}>
            <Dropdown
              title="Roll-caller name"
              options={rollCallers.map((caller) => caller.name)}
              style={styles.fullWidth}
              onChange={handleDropdownChange}
            />
          </div>
          <div style={styles.item}>
            <Input
              title="Student code"
              defaultValue={studentCode}
              disable={true}
              style={{ ...styles.fullWidth, fontSize: 16 }}
            />
          </div>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Absent with permission</label>
          <List
            dataSource={absentList}
            renderItem={(item) => (
              <List.Item style={styles.listItem}>
                <Button
                  type="primary"
                  danger
                  icon={<MinusCircleOutlined />}
                  onClick={() => handleRemoveAbsentee(item)}
                  style={{
                    marginRight: 10,
                    tabSize: 24,
                    fontSize: 18,
                  }}
                />
                <span>{item}</span>
              </List.Item>
            )}
          />
        </div>

        <div style={styles.row1}>
          <Dropdown
            title=""
            options={filteredAbsent}
            style={styles.fullWidthA}
            onChange={(value) => setNewAbsentee(value)} // Cập nhật newAbsentee khi người dùng chọn tên
          />
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={handleAddAbsentee}
            disabled={!newAbsentee} // Disable nút nếu không có tên được chọn
            style={{
              tabSize: 24,
              fontSize: 18,
              backgroundColor: "#00B01A",
              color: "white",
              marginTop: 8,
            }}
          />
        </div>

        <RoundedButton
          title="CONFIRM"
          style={styles.saveButton}
          onClick={handleSave}
        />
      </div>
    </Modal>
  );
};

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  modalContent: {
    padding: "20px",
  },
  label: {
    fontWeight: "bold",
    fontSize: "20px",
    marginBottom: "15px",
    display: "block",
  },
  fullWidth: {
    width: "100%",
  },
  fullWidthA: {
    width: 203,
  },
  listItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "5px 0",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "flex-start",
  },
  row1: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "space-between",
    width: 250,
  },
  section: {
    marginBottom: "20px",
  },
  flex: {
    flex: 1,
  },
  item: {
    flex: 1,
  },
  saveButton: {
    marginTop: 25,
    width: "100%",
  },
};

export default RollCallerModal;
