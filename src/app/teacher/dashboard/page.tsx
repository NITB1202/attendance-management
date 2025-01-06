"use client";
import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { TrendingUp } from "lucide-react";
import CustomSelect from "../../../../component/CustomSelect";
import { MdOutlineTextSnippet } from "react-icons/md";
import classApi from "../../../../api/classApi";
import { Colors } from "../../../../constant/Colors";
import statisticApi from "../../../../api/statisticApi";

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);
  const [classes, setClasses] = useState<{
    id: number;
    name: string;
  }[]>([]);
  const [selectId, setSelectId] = useState(-1);
  const [classData, setClassData] = useState({
    respondReceived: 0,
    efficientOfLesson: 0,
    late: 0,
    absentWithPermission: 0,
    absentWithoutPermission: 3,
    onTime: 0,
    wellUnderstand: 0,
    normalUnderstand: 0,
    notWellUnderStand: 0,
    badUnderstand: 0
  })

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
    const fetchClasses = async () => {
      try{
        const response = await classApi.getByTeacherId();
        const formattedData: any[] = response.data.map((item: any)=>
        ({
            id: item.id,
            name: item.name,
        }));
        setClasses(formattedData);
        setSelectId(formattedData.at(0).id);
      }
      catch(error){
        console.log(error);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchStatistic = async () => {
      if(selectId === -1) return;
      try{
        const response = await statisticApi.teacher(selectId);
        setClassData({
          respondReceived: response.data.respondReceived,
          efficientOfLesson: response.data.efficientOfLesson,
          late: response.data.late,
          absentWithPermission: response.data.absentWithPermission,
          absentWithoutPermission: response.data.absentWithoutPermission,
          onTime: response.data.onTime,
          wellUnderstand: response.data.wellUnderstand,
          normalUnderstand: response.data.normalUnderstand,
          notWellUnderStand: response.data.notWellUnderStand,
          badUnderstand: response.data.badUnderstand,
        })
      }
      catch(error){
        console.log(error);
      }
    };

    fetchStatistic();
  }, [selectId]);


  const classNames = classes.map((item) => item.name);
  const handleSelect = (index: number) =>{
    const id = classes.at(index)?.id;
    console.log(id);  
    if(id) setSelectId(id);
  }

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "1.5rem",
      fontFamily: "Roboto, sans-serif",
      backgroundColor: "#fff",
      maxWidth: "100%",
      gap: 30,
    },
    dropdown: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      width: "100%",
      gap: isMobile ? 20 : 50,
      paddingLeft: 20,
    },

    dropdownLabel: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 15,
    },

    report: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "20px" : "50px",
      padding: "1.5rem",
      width: "100%",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      alignItems: "center", 
    },
    label: {
      fontSize: 20,
      fontWeight: "600",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      gap: 20,
      color: "#FFFDFD",
      fontSize: 64,
      fontWeight: 600,
    },

    box_respond: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: isMobile ? "100%" : "auto",
      backgroundColor: "#6A9AB0",
      borderRadius: 10,
      padding: 20,
      gap: 5,
    },
    box_efficacy: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: isMobile ? "100%" : "auto",
      backgroundColor: "rgba(0, 176, 26, 0.7)",
      borderRadius: 10,
      padding: 20,
      gap: 5,
    },

    pieChartContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "80px",
      flexWrap: "wrap",
      backgroundColor: "#F5F5F5",
      borderRadius: 10,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      margin: isMobile ? "0 auto" : "0",
      justifyContent: "center",
      alignItems: "center"
    },
    pieChart: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 50,
      padding: 20,
    },
  };

  return (
    <div style={styles.container}>
      {/* Dropdown */}
      <div style={styles.dropdown}>
        {/* Dropdown */}
        <CustomSelect
          title="Class"
          options={classNames}
          onSelect={handleSelect}>
        </CustomSelect>
      </div>

      {/* Report */}
      <div style={styles.report}>
        <div style={styles.box_respond}>
          <div style={styles.label}>Respond received</div>
          <div style={styles.row}>
            <MdOutlineTextSnippet color="#FFFFFF" size={82} />
            <div style={styles.value}>{classData.respondReceived}</div>
          </div>
        </div>
        <div style={styles.box_efficacy}>
          <div style={styles.label}> The efficacy of the lesson</div>
          <div style={styles.row}>
            <TrendingUp color="#FFFFFF" size={82} />
            <div style={styles.value}>{Number(classData.efficientOfLesson)? classData.efficientOfLesson: "100"}%</div>
          </div>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div style={styles.pieChartContainer}>
        <div style={styles.pieChart}>
          <label style={styles.dropdownLabel}>
            Students’ understanding level
          </label>
          <PieChart
            colors={[Colors.green, Colors.primary, Colors.yellow, Colors.red]}
            series={[
              {
                data: [
                  { id: 0, value: classData.wellUnderstand || 0.1, label: "Well" },
                  { id: 1, value: classData.normalUnderstand || 0.1, label: "Normal" },
                  { id: 2, value: classData.notWellUnderStand || 0.1, label: "Not well" },
                  { id: 3, value: classData.badUnderstand || 0.1, label: "Bad" },
                ],
              },
            ]}
            width={isMobile ? 350 : 500}
            height={isMobile ? 200 : 300}
          />
        </div>
        <div style={styles.pieChart}>
          <label style={styles.dropdownLabel}>Presence rate</label>
          <PieChart
            colors={[Colors.green, Colors.yellow, Colors.red]}
            series={[
              {
                data: [
                  { id: 0, value: classData.onTime, label: "On-time" },
                  { id: 1, value: classData.late, label: "Late" },
                  { id: 2, value: classData.absentWithoutPermission+ classData.absentWithPermission, label: "Absence" },
                ],
              },
            ]}
            width={isMobile ? 350 : 500}
            height={isMobile ? 200 : 300}
          />
        </div>
      </div>
    </div>
  );
}
