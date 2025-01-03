import React, { useState } from "react";

interface TabProps {
  tabs: string[];
  onTabChange?: (selectTab: string) => void;
}

const TabSwitcher: React.FC<TabProps> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if(onTabChange) onTabChange(tab);
  };

  return (
    <div style={styles.container}>
      {tabs.map((tab, index) => (
        <div
          key={index}
          style={{
            ...styles.tab,
            backgroundColor: activeTab === tab ? "#00B01A" : "#001F3F",
            color: activeTab === tab ? "#FFFFFF" : "#FFFFFF",
          }}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    padding: "10px",
    backgroundColor: "#001F3F",
    borderRadius: "10px",
  },
  tab: {
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "18px",
    textAlign: "center",
    userSelect: "none",
    fontFamily: "Roboto, sans-serif",
  },
};

export default TabSwitcher;
