"use client";
import React, { useEffect, useState } from "react";
import Table from "../../../../component/Table";
import SearchBar from "../../../../component/SearchBar";
import TabSwitcher from "../../../../component/Tabs";
import RoundedButton from "../../../../component/RoundedButton";
import { FileUp, X } from "lucide-react";
import CustomSelect from "../../../../component/CustomSelect";
import { FiPlusCircle } from "react-icons/fi";
import { Colors } from "../../../../constant/Colors";
import userApi from "../../../../api/userApi";
import { formatDate, validateDateOfBirth, validateEmail, validatePhoneNumber } from "../../../../util/util";
import SmallInput from "../../../../component/SmallInput";
import CustomDatePicker from "../../../../component/CustomDatePicker";
import { IoMdClose } from "react-icons/io";
import { format } from "date-fns-tz";
import ErrorMessage from "../../../../component/ErrorMessage";

export default function Account() {
  const [teachers, setTeachers] = useState<any[][]>([]);
  const [students, setStudents] = useState<any[][]>([]);
  const [all, setAll] = useState<any[][]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [createRequest, setCreateRequest] = useState({
    email: "",
    roleName: "Student",
    name: "",
    phoneNumber: "",
    roleCode: "",
    date: "",
  })

  const tableHeader = [
    "ID",
    "ROLE",
    "USERNAME",
    "EMAIL",
    "FULL NAME",
    "PHONE",
    "DATE OF BIRTH",
    "ROLE CODE",
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({
    type:"",
    title: "",
    description: "",
  });
  const [update,setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const studentResponse = await userApi.getStudents();
        const teacherResponse = await userApi.getTeachers();
        const formattedStudents: any[][] = studentResponse.data.map((item: any)=>
          [
            item.id,
            "STUDENT",
            item.studentCode,
            item.email,
            item.name,
            item.phoneNumber,
            formatDate(item.date),
            item.studentCode,
          ]
        );
        
        const formattedTeachers: any[][] = teacherResponse.data.map((item: any)=>[
            item.id,
            "TEACHER",
            item.teacherCode,
            item.email,
            item.name,
            item.phoneNumber,
            formatDate(item.date),
            item.teacherCode,
          ]
        );

        const combinedData = [...formattedStudents, ...formattedTeachers];

        setStudents(formattedStudents);
        setTeachers(formattedTeachers);
        setAll(combinedData);
      }
      catch(error){
        console.log(error);
      }
    };

    fetchData();
  }, [update]);
 
  const handleClick = () => {
    console.log("Button clicked!");
  };

  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleRowClick = (rowData: (string | React.ReactNode)[]) => {
    const convertedData: Record<string, string> = tableHeader.reduce(
      (acc, header, index) => {
        acc[header] =
          typeof rowData[index] === "string"
            ? (rowData[index] as string)
            : String(rowData[index]);
        return acc;
      },
      {} as Record<string, string>
    );

    setFormData(convertedData);
    setIsModalVisible1(true);
  };

  const closeCreateModal = () => {
    setIsModalVisible(!isModalVisible);
    setCreateRequest({
      email: "",
      roleName: "Student",
      name: "",
      phoneNumber: "",
      roleCode: "",
      date: "",
    });
  };

  const closeModal = () => {
    setIsModalVisible1(false);
    setFormData({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Updated Data:", formData);
    closeModal();
  };

  const updateCreateFormField = (field: string, value: any) => {
    setCreateRequest(prevState => ({
        ...prevState,
        [field]: value
    }));
  };

  const selectData = activeTab === "All"? all : (activeTab === "Student"? students: teachers);


  const handleSubmitCreateRequest = async (event: React.FormEvent<HTMLFormElement>)=> {
    if(Object.values(createRequest).some(value => value === "")){
      setShowMessage(true);
      setMessage({
        type: "error",
        title: "Error",
        description: "All fields must be filled."
      });
      event.preventDefault();
      return;
    }

    if(!validateEmail(createRequest.email)){
      setShowMessage(true);
      setMessage({
        type: "error",
        title: "Error",
        description: "Invalid email format."
      });
      event.preventDefault();
      return;
    }

    if(!validatePhoneNumber(createRequest.phoneNumber)){
      setShowMessage(true);
      setMessage({
        type: "error",
        title: "Error",
        description: "Invalid phone number."
      });
      event.preventDefault();
      return;
    }

    if(!validateDateOfBirth(createRequest.date)){
      setShowMessage(true);
      setMessage({
        type: "error",
        title: "Error",
        description: "Invalid date of birth."
      });
      event.preventDefault();
      return;
    }

   try{
    setUpdate(true);
    await userApi.create(createRequest);
    closeCreateModal();
   }
   catch(error){
    console.log(error);
    setShowMessage(true);
    setMessage({
      type: "error",
      title: "Error",
      description: "This user already exists.",
    })
    event.preventDefault();
   }
   finally{
    setUpdate(false);
   }
  }

  return (
    <div style={styles.container}>
      <div style={styles.top}>
        <div style={styles.searchContainer}>
          <SearchBar
            placeholder="Search by..."
            onSearch={setSearchTerm}
            style={{ width: 415 }}
          />
           <CustomSelect
              options={["Name", "Role code", "Email", "Phone"]}
              onSelect={setSelectedIndex}>
            </CustomSelect>
        </div>
      
      </div>
      <div style={styles.mid}>
        <TabSwitcher 
          tabs={["All", "Student", "Teacher"]} 
          onTabChange={setActiveTab}
        />
        <div style={styles.upload}>
          <RoundedButton
            title="Upload excel file"
            onClick={handleClick}
            icon={<FileUp size={24} color="white" />}
            style={{ backgroundColor: "#999999", padding: "10px 30px" }}
            textStyle={{ fontSize: "20px", color: "white" }}
          />
          <RoundedButton
            title="Add new"
            onClick={()=> setIsModalVisible(true)}
            icon={<FiPlusCircle size={24} color="white" />}
            style={{ backgroundColor: Colors.green, padding: "10px 30px" }}
            textStyle={{ fontSize: "20px", color: "white" }}
          />
        </div>
      </div>

      {/* Table Section */}
      <div style={styles.tableContainer}>
        <Table
          tableHeader={tableHeader}
          tableData={selectData
            .filter((item: any)=>{
              if(searchTerm === "")
                return true;
              
              const formatSearch = searchTerm.toLocaleLowerCase().trim();
              let checkData = "";
              
              if(selectedIndex === 0)
                checkData = item.at(4).toLocaleLowerCase();

              if(selectedIndex === 1)
                checkData = item.at(7).toLocaleLowerCase();

              if(selectedIndex === 2)
                checkData = item.at(3).toLocaleLowerCase();

              if(selectedIndex === 3)
                checkData = item.at(5).toLocaleLowerCase();

              return checkData.indexOf(formatSearch) !== -1;
            })}
          onRowClick={handleRowClick}
        />
      </div>

      {/* Modal */}
      {isModalVisible1 && (
        <div style={styles.modalOverlay}>
          <div style={styles.form}>
            <button 
              style={styles.closeButton}
              onClick={closeModal}
            >
              <IoMdClose size={35} />  
            </button>
            <label style={styles.formHeader}>
              Update account
            </label>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
              onSubmit={handleSubmit}>
              <div style={{ display: "flex", gap: "16px" }}>
                <SmallInput
                  title="Email"
                  defaultValue={formData.EMAIL || ""}
                  style={{width: 345}}
                  onChangeText={(text) => handleInputChange("EMAIL", text)}>
                </SmallInput>
                 <CustomSelect
                  title="Role"
                  options={formData.ROLE === "STUDENT"? ["Student", "Teacher"]: ["Teacher","Student"]}
                  onSelect={(index)=>{
                    if(index === 0)
                      handleInputChange("ROLE", "STUDENT");
                    else
                      handleInputChange("ROLE", "TEACHER");
                  }}>
                </CustomSelect>
              </div>
              <SmallInput
                title="Full name"
                placeHolder="Enter user's name"
                style={{ width: 460}}
                defaultValue={formData["FULL NAME"]}
                onChangeText={(text)=> handleInputChange("FULL NAME", text)}>  
              </SmallInput>
              <div style={{ display: "flex", gap: "16px" }}>
                <CustomDatePicker
                  title="Date of birth"
                  defaultValue={convertDate(formData["DATE OF BIRTH"])}
                  setSelectedDate={(date)=>{
                    if(date) handleInputChange("DATE OF BIRTH",format(date,"yyyy-MM-dd"));
                  }}>
                </CustomDatePicker>
                <SmallInput
                  title="Phone"
                  placeHolder="Enter phone number"
                  defaultValue={formData.PHONE}
                  onChangeText={(text)=> handleInputChange("PHONE", text)}>
                </SmallInput>
              </div>
              <SmallInput
                title="Role code"
                placeHolder="Enter the role code"
                style={{ width: 460}}
                defaultValue={formData["ROLE CODE"]}
                onChangeText={(text)=> handleInputChange("ROLE CODE", text)}>
              </SmallInput>
              <RoundedButton
                title="CONFIRM"
                style={{ marginTop: 20}}
                onClick={()=> {}}>
             </RoundedButton>
            </form>
          </div>
        </div>
      )}

      {/* Modal Section create */}
      {isModalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.form}>
            <button 
              style={styles.closeButton}
              onClick={closeCreateModal}
            >
              <IoMdClose size={35} />
            </button>
            <label style={styles.formHeader}>
              Create a new account
            </label>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
              onSubmit={handleSubmitCreateRequest}
            >
              <div style={{ display: "flex", gap: "15px" }}>
                <SmallInput
                  title="Email"
                  placeHolder="Enter email"
                  style={{width: 345}}
                  onChangeText={(text)=> updateCreateFormField("email", text)}>
                </SmallInput>
                <CustomSelect
                  title="Role"
                  options={["Student", "Teacher"]}
                  onSelect={(index)=>{
                    if(index === 0)
                      updateCreateFormField("roleName", "Student");
                    else
                      updateCreateFormField("roleName", "Teacher");
                  }}>
                </CustomSelect>
              </div>
              <SmallInput
                title="Full name"
                placeHolder="Enter user's name"
                style={{ width: 460}}
                onChangeText={(text)=> updateCreateFormField("name",text)}>  
              </SmallInput>
              <div style={{ display: "flex", gap: "15px" }}>
                <CustomDatePicker
                  title="Date of birth"
                  setSelectedDate={(date)=>{
                    if(date) updateCreateFormField("date",format(date,"yyyy-MM-dd"));
                  }}>
                </CustomDatePicker>
                <SmallInput
                  title="Phone"
                  placeHolder="Enter phone number"
                  onChangeText={(text)=> updateCreateFormField("phoneNumber", text)}>
                </SmallInput>
              </div>
              <SmallInput
                title="Role code"
                placeHolder="Enter the role code"
                style={{ width: 460}}
                onChangeText={(text)=> updateCreateFormField("roleCode",text)}>
              </SmallInput>
             <RoundedButton
                title="CONFIRM"
                style={{ marginTop: 20}}
                onClick={()=> {}}>
             </RoundedButton>
            </form>
          </div>
        </div>
      )}
      {
        showMessage && message.type === "error" &&
        <ErrorMessage
          title={message.title}
          description={message.description}
          setOpen={setShowMessage}>
        </ErrorMessage>
      }
    </div>
  );
}

const convertDate = (dateString: string) => {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    gap: "20px",
    width: "100%",
    margin: "0 auto",
  },
  mid: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
    width: "auto",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    width: "100%",
  },
  searchContainer: {
    display: "flex",
    gap: 20,
    marginTop: 10,
  },
  tab: {
    width: "25%",
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
    borderRadius: "5px",
  },
  upload: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 20,
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  tableTitle: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: "600",
  },
  modalOverlay:{
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  form:{
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
  },
  closeButton:{
    alignSelf: "flex-end",
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
  formHeader:{
    fontSize: "30px",
    fontWeight: "700",
    marginBottom: "20px",
  }
};
