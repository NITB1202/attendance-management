import React, { useState } from 'react';
import { Colors } from '../constant/Colors';
import QuestionMessage from './QuestionMessage';
import questionApi from '../api/questionApi';
import ErrorMessage from './ErrorMessage';

interface CommentBoxProps {
    sessionId: number;
    parentId?: number;
    onPost: () => void;
    onCancel: () => void;
}

const ReplyBox: React.FC<CommentBoxProps> = ({ sessionId, parentId, onPost, onCancel }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [content, setContent] = useState("");
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };
    const [showError, setShowError] = useState(false);

    const handleAgree = async () => {
        if(content === ""){
            setShowError(true);
            return;
        }

        try{
           await questionApi.create(sessionId, content, parentId);
        }
        catch(error){
            console.log(error);
        }

        if(onPost)  onPost();
    }
    
    return (
        <div style={styles.container}>
           <div style={{...styles.commentContainer}}>
               <div style={{ display: 'flex'}}>
                   <img src= "/Avatar.png"
                       alt="avatar" 
                       style={styles.avatar}/>
                   <div style={{ flex: 1 }}>
                       <textarea
                           style={styles.input}
                           placeholder='Write your reply here..'
                           onChange={handleChange}>
                       </textarea>
                   </div>
               </div>
               <div style={styles.footer}>
                    <button
                        onClick={onCancel}
                        style={styles.cancelButton}>Cancel
                    </button>
                    <button
                        onClick={()=> setShowConfirm(true)}
                        style={styles.postButton}>Post
                    </button>
                </div>
           </div>
           {
                showConfirm && 
                <QuestionMessage
                    title='Confirmation'
                    description='Are you sure you want to post this question?'
                    setOpen={setShowConfirm}
                    onAgree={handleAgree}>
                </QuestionMessage>
           }
           {
                showError &&
                <ErrorMessage
                    title='Error'
                    description="Your question content is empty."
                    setOpen={setShowError}>
                </ErrorMessage> 
           }
       </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 10,
    },
    commentContainer:{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '10px',
        height: 140,
        justifyContent: "space-between",
        width: 500,
        minWidth: 250,
    },
    avatar:{
        width: '50px',
        height: '50px',
        borderRadius: '25px',
        marginRight: '10px',
    },
    cancelButton:{
        backgroundColor: Colors.gray,
        border: 'none',
        color: 'black',
        cursor: 'pointer',
        padding: '2px 10px',
        borderRadius: '5px',
        width: 80,
    },
    postButton:{
        backgroundColor: Colors.primary,
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: '2px 10px',
        borderRadius: '5px',
        width: 80,
    },
    footer:{
        display: "flex", 
        justifyContent: "flex-end", 
        alignItems: "center", 
        gap: 10
    },
    allReplyButton:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        background: 'rgba(106,154,176,0.2)',
        color: '#3A6D8C',
        padding: "5px 10px",
        borderRadius: '10px',
        fontWeight: 600,
    },
    input:{
        width: "100%",
        height: "100%",
        outline: "none",
        padding: "10px 0px",
        resize: "none",
        overflow: "auto",
    }
}

export default ReplyBox;