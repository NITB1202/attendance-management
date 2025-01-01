"use client";

import { useState } from "react";
import { Colors } from "../constant/Colors";
import { FaHouse, FaUser, FaUserGroup, FaUserCheck,  FaExpand, FaRegFileLines, FaArrowRightFromBracket, FaAlignJustify } from "react-icons/fa6";
import { MdOutlineGridView, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Role } from "../enum/RoleEnum";

interface MenuItemProps{
    label: string;
    icon: React.ReactNode;
    path: string;
    active?: boolean;
    index?: number;
    setSelectedIndex?: (index:number) => void;
}

const MenuItem = ({label, icon, path, index = -1, active = false, setSelectedIndex}: MenuItemProps) => {
    const handleClick = () =>{
        if(setSelectedIndex)
            setSelectedIndex(index);

    }

    const itemStyle = active 
        ? { ...styles.item, backgroundColor: Colors.primary }
        : styles.item;

    return(
        <button
            style={itemStyle} 
            onClick={handleClick}>
            {icon}
            <p style={styles.label}>{label}</p>
        </button>
    );
}

const data: MenuItemProps[] = [
    {
        label: "Dashboard",
        icon: <FaHouse size={24} width={2}  color="white"/>,
        path: "/dashboard",
    },
    {
        label: "Account",
        icon: <FaUser size={24} width={2}  color="white"/>,
        path: "/account",
    },
    {
        label: "Course",
        icon: <MdOutlineGridView size={24} width={2}  color="white"/>,
        path: "/course",
    },
    {
        label: "Class",
        icon: <FaUserGroup size={24} width={2}  color="white"/>,
        path: "/class",
    },
    {
        label: "Attendance",
        icon: <FaUserCheck size={24} width={2}  color="white"/>,
        path: "/attendance",
    },
    {
        label: "Report",
        icon: <FaRegFileLines size={24} width={2}  color="white"/>,
        path: "/report",
    },
    {
        label: "Roll call",
        icon: <FaExpand size={24} width={2}  color="white"/>,
        path: "rollcall",
    }
];

interface NavBarProps{
    role?: Role;
}

export default function NavBar({role}: NavBarProps){
    const [show, setShow] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const studentHiddenPath = ["Account","Course","Report"];
    const managerHiddenPath = ["Roll call"];
    const teacherHiddenPath = ["Account", "Course", "Report", "Roll call"];

    return (
        <div style={styles.container}>
        {show ? 
            (
            <div 
                style={styles.overlay}
                onClick={()=> setShow(false)}>
                <div 
                    style={styles.bar}
                    onClick={(e) => e.stopPropagation()}>
                    <img src="/LogoHeader.png" alt="logo header"></img>
                    <button
                        onClick={()=>{setShow(false)}}
                        style={styles.hideButton}>
                        <MdOutlineKeyboardArrowLeft size={26} width={2} color="white"/>
                    </button>
                    <hr style={styles.divider}/>
                    <div style={styles.itemContainer}>
                    {
                        data
                            .filter((item) =>{
                                if(role && role === Role.STUDENT && studentHiddenPath.includes(item.label))
                                    return false;
                                if(role && role === Role.MANAGER && managerHiddenPath.includes(item.label))
                                    return false;
                                if(role && role === Role.TEACHER && teacherHiddenPath.includes(item.label))
                                    return false;

                                return true;
                            })
                            .map((item,index) =>{
                            return(
                                <MenuItem
                                    key={"item-"+index}
                                    index={index}
                                    label={item.label}
                                    icon={item.icon}
                                    path={item.path}
                                    active={selectedIndex === index}
                                    setSelectedIndex={setSelectedIndex}>
                                </MenuItem>
                            );
                        })
                    }
                    </div>
                    <hr style={styles.divider}/>
                    <MenuItem
                        label="Logout"
                        icon={<FaArrowRightFromBracket size={24} width={2}  color="white"/>}
                        path="/auth/login">
                    </MenuItem>
                </div>
            </div>)
            :
            (
                <button
                    style={styles.openButton}
                    onClick={()=>setShow(true)}>
                    <FaAlignJustify size={20} color="white"/>
                </button>
            )
            }
        </div>
    );
}


const styles: { [key: string]: React.CSSProperties } = {
    container:{
        position: "absolute",
        top: 0,
        left: 0,
        width: '100vw',
        height: "100vh",
    },
    overlay:{
        position: "absolute",
        top: 0,
        left: 0,
        width: '100vw',
        height: "100vh",
        display: "flex",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: 5,
    },
    bar:{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "fit-content",
        backgroundColor: Colors.darkBlue,
        padding: "30px 15px",
        gap: 30,
        transition: "transform 0.3s ease-in-out",
        zIndex: 10,
    },
    itemContainer:{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 10,
    },
    item:{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        gap: 10,
        padding: 10,
        borderRadius: 5,
        transition: "transform 0.3s ease-in-out",
    },
    label:{
        fontFamily: "Poppins, sans-serif",
        fontSize: 16,
        fontWeight: 600,
        color: "white",
    },
    divider:{
        height: 2,
        backgroundColor: "white",
    },
    hideButton:{
        position: "absolute",
        top: "62px",
        left: "220px",
        backgroundColor: Colors.darkBlue,
        border: "1px solid white",
        borderRadius: 5,
        width: 28,
        height: 28,
    },
    openButton:{
        backgroundColor: Colors.darkBlue,
        borderRadius: 5,
        padding: 10,
        position: "absolute",
        top: 15,
        left: 10,
    }
}