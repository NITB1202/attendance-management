import React from 'react';
import { Colors } from '../constant/Colors';

interface CommentBoxProps {
    onPost: () => void;
    onCancel: () => void;
}

const ReplyBox: React.FC<CommentBoxProps> = ({ onPost, onCancel }) => {

    return (
           <div style={styles.container}>
           <div style={{...styles.commentContainer}}>
               <div style={{ display: 'flex'}}>
                   <img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq91WKSjpZovs5tFF-Q5fs5GBB4RIvoaKGug&s"
                       alt="avatar" 
                       style={styles.avatar}/>
                   <div style={{ flex: 1 }}>
                       <textarea
                           style={styles.input}
                           placeholder='Write your reply here..'>
                       </textarea>
                   </div>
               </div>
               <div style={styles.footer}>
                    <button
                        onClick={onCancel}
                        style={styles.cancelButton}>Cancel
                    </button>
                    <button
                        style={styles.postButton}>Post
                    </button>
                </div>
           </div>
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