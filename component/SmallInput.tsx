import Input from "./Input";

interface SmallInputProps{
    title?: string;
    placeHolder?: string;
    onChangeText?: (text: string) => void;
    style?: React.CSSProperties;
    defaultValue?: string;
    disable?: boolean;
}

export default function SmallInput({title, placeHolder, onChangeText, style, defaultValue, disable = false}: SmallInputProps){
    return(
        <div style={styles.container}>
            <h1 style={styles.title}>{title}</h1>
            <Input
                style={{...styles.inputContainer,...style}}
                textStyle={styles.inputText}
                placeHolder={placeHolder}
                onChangeText={onChangeText}
                defaultValue={defaultValue}
                disable={disable}>
            </Input>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    container:{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    title:{
        fontFamily: "Roboto, sans-serif",
        fontSize: 20,
        fontWeight: 600,
    },
    inputContainer: {
        border: '1px solid rgb(149, 149, 149)',
        height: 44,
    },
    inputText:{
        fontSize: 16,
    }
}