export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const extractDate = (dateTimeString: string): string => {
    const [date] = dateTimeString.split("T");
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
};

export const extractTime = (dateTimeString: string): string => {
    if (dateTimeString === null) {
        return "NO RECORD";
    }
    const [, time] = dateTimeString.split("T");
    const [hour, minute, second] = time.split(":");
    return `${hour}:${minute}:${parseInt(second).toString().padStart(2, "0")}`;
};

export const getStatusName = (status: string): string => {
    if (status === "Vang ko phep") return "Absence without permission";
    if (status === "Dung gio") return "On-time";
    if (status === "Vang co phep") return "Absence with permission";
    return "Late";
};
