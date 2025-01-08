"use client";
import React, { useEffect, useState } from "react";
import { Edit3, Send } from "lucide-react";
import RoundedButton from "../../../../component/RoundedButton";
import Table from "../../../../component/Table";
import CustomSelect from "../../../../component/CustomSelect";
import { Colors } from "../../../../constant/Colors";
import classApi from "../../../../api/classApi";
import { useRouter } from "next/navigation";
import { title } from "process";
import QuestionMessage from "../../../../component/QuestionMessage";
import ErrorMessage from "../../../../component/ErrorMessage";
import attendanceApi from "../../../../api/attendanceApi";
import SuccessfulMessage from "../../../../component/SuccessfulMesage";

export default function Report() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[][]>([]);
  const [classData, setClassData] = useState<{
    id: number,
    name: string,
    maxLate: number,
    maxAb: number,
  }[]>([]);
  const [students, setStudents] = useState<any[][]>([]);
  const [selectedClassId, setSelectedClassId] = useState(1);
  const [selectedType, setSelectedType] = useState(0);
  const [maxNum, setMaxNum] = useState(0);
  const tableHeaders = ["STUDENT NAME", "STUDENT CODE", "NUMBER OF VIOLATIONS"];
  const router = useRouter();
  const [showMessage,setShowMessage] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    title: "",
    description:""
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

  useEffect(() => {
    const fetchData = async () => {
      const classResponse = await classApi.getAll();
      const formattedClassData = classResponse.data.map((item: any)=>({
        id: item.id,
        name: item.name,
        maxLate: item.allowedLateTime,
        maxAb: item.allowedAbsent !== null? item.allowedAbsent : 3,
      }));

      setClassData(formattedClassData);
      setSelectedClassId(formattedClassData.at(0).id);
      setMaxNum(formattedClassData.at(0).maxLate);
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchStudents = async () => {
      const response = await classApi.getViolation(selectedClassId);
      const formattedData = response.data.map((item: any)=>[
          item.name,
          item.studentCode,
          item.late,
          item.absentWithoutPermission + item.absentWithPermission
      ]);
      
      setStudents(formattedData);
    };

    fetchStudents();
  }, [selectedClassId]);

  const handleSelectedRowsChange = (rows: any[][]) => {
    setSelectedRows(rows);
  };

  const handleSendWarning = () => {
    setShowMessage(true);
    setMessage({
      type: "question",
      title: "Confirmation",
      description: "Do you want to send a warning message email to all the selected?"
    })
    
  };

  const handleUpdateWarning = () => {
    router.push("/manager/update-report");
  };

  const handleSelectClass = (index: number)=>{
    const selectedClass = classData.at(index);
    if(selectedClass){
      setSelectedClassId(selectedClass?.id);
      if(selectedType === 0)
        setMaxNum(selectedClass.maxLate);
      else
        setMaxNum(selectedClass.maxAb);
    }
  }

  const handleSelectType = (index: number) =>{
    setSelectedType(index);
    const selectedClass = classData.find(item => item.id === selectedClassId);
    if(selectedClass){
      if(index === 0)
        setMaxNum(selectedClass.maxLate);
      else
        setMaxNum(selectedClass.maxAb);
    }
  }

  const handleAgree =async ()=>{
    if(selectedRows.length === 0)
    {
      setShowMessage(true);
      setMessage({
        type: "error",
        title: "Error",
        description: "You haven't selected any row yet."
      });
      return;
    }

    let studentList = [];
    
    for(let i = 0; i< selectedRows.length; i++){
      const info ={
        typeViolation: selectedType === 0? "late": "absent" ,
        "studentCode": selectedRows.at(i)?.at(1),
        "numberViolations": selectedRows.at(i)?.at(2),
        "maximumViolationAllowed": maxNum
      };

      studentList.push(info);
    }

    let opinion = sessionStorage.getItem("opinion")
    if(opinion === null)
    opinion = "This is a warning message. Please make sure to attend class on time from now on.";
    sessionStorage.removeItem("opinion");

    try{
      await attendanceApi.sendMessage(selectedClassId, opinion, studentList);
      setShowMessage(true);
      setMessage({
        type: "success",
        title: "Send successfully",
        description: "The warning message has been sent to the students."
      })
    }
    catch(error){
      console.log(error);
    }
  }

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "1rem",
      fontFamily: "Roboto, sans-serif",
      gap: 20,
      marginLeft: 40,
      marginRight: 20,
    },
    dropdown: {
      width: isMobile ? "50%" : "50%",
      display: "flex",
      flexDirection: "row",
      gap: 20,
    },
    maxViolationsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 13,
    },
    label: {
      fontWeight: 600,
      fontSize: "16px",
    },
    buttonRow: {
      display: "flex",
      flexDirection: "row",
      gap: "20px",
    },
    tableContainer: {
      display: "flex",
      width: "100%",
    },
     title:{
        fontFamily: "Roboto, sans-serif",
        fontSize: 20,
        fontWeight: 600,
    },
    inputContainer: {
        borderRadius: "5px",
        borderWidth: "1px",
        borderColor: Colors.gray,
        height: 44,
        background: Colors.disable,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "10px",
    },
    inputText:{
        fontFamily: "Roboto, sans-serif",
        fontSize: "16px",
    },
    titleInputContainer:{
        display: "flex",
        flexDirection: "column",
        gap: 10
    }
  };

  return (
    <div style={styles.container}>
      {/* Dropdown */}
      <div style={styles.dropdown}>
        <CustomSelect
          title="Class name"
          options={classData.map(item => item.name)}
          onSelect={handleSelectClass}>
        </CustomSelect>
        <CustomSelect
          title="Type"
          options={['Late',"Absent"]}
          onSelect={handleSelectType}>
        </CustomSelect>
        <div style={styles.titleInputContainer}>
          <label style={styles.title}>Maximum number of violations</label>
          <div style={styles.inputContainer}>
            <h1 style={styles.inputText}>{maxNum}</h1>
          </div>
        </div>
      </div>

      <div style={styles.buttonRow}>
        <RoundedButton
          title="Send warning to all selected"
          onClick={handleSendWarning}
          icon={<Send size={24} color="white" />}
          style={{
            backgroundColor: "#D32F2F",
            padding: "10px 30px",
          }}
          textStyle={{
            fontSize: "20px",
            fontWeight: "bold", 
          }}
        />
        <RoundedButton
          title="Update warning content"
          onClick={handleUpdateWarning}
          icon={<Edit3 size={24} color="white" />}
          style={{
            backgroundColor: "#3A6D8C",
            padding: "10px 30px",
          }}
          textStyle={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        />
      </div>

      <div style={styles.tableContainer}>
        <Table
          tableHeader={tableHeaders}
          tableData={selectedType === 0? removeColumn(students, 3) : removeColumn(students,2)}
          itemsPerPage={5}
          showHeaderCheckbox={true}
          onSelectedRowsChange={handleSelectedRowsChange}
        />
      </div>
      {
        showMessage && message.type === "question" &&
        <QuestionMessage
          title={message.title}
          description={message.description}
          setOpen={setShowMessage}
          onAgree={handleAgree}>
        </QuestionMessage>
      }
      {
        showMessage && message.type === "error" &&
        <ErrorMessage
          title={message.title}
          description={message.description}
          setOpen={setShowMessage}>
        </ErrorMessage>
      }
      {
        showMessage && message.type === "success" &&
        <SuccessfulMessage
          title={message.title}
          description={message.description}
          setOpen={setShowMessage}>
        </SuccessfulMessage>
      }
    </div>
  );
}

function removeColumn(matrix: any[][], columnIndex: number) {
  return matrix.map(row => row.filter((_, colIndex) => colIndex !== columnIndex));
}

