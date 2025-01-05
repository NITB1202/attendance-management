import React, { useState } from 'react';
import { Colors } from '../constant/Colors';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import ReplyBox from './ReplyBox';

interface CommentBoxProps {
    user: string;
    content: string;
    timestamp: string;
    replies?: any[];
    onCanCel?: () => void;
}

const CommentBox: React.FC<CommentBoxProps> = ({ user, content, timestamp, replies, onCanCel}: CommentBoxProps) => {
    const [clickReply, setClickReply] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const handleCancel = () =>{
        setClickReply(false);
        if(onCanCel) onCanCel();
    }

    return (
        <div style={styles.container}>
        <div style={{...styles.commentContainer}}>
            <div style={{ display: 'flex'}}>
                <img src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq91WKSjpZovs5tFF-Q5fs5GBB4RIvoaKGug&s"
                    alt="avatar" 
                    style={styles.avatar}/>
                <div>
                    <div style={styles.headerContainer}>
                        <span style={styles.username}>{user}</span>
                        <span style={styles.timestamp}>{timestamp}</span>
                    </div>
                    <div style={styles.contentContainer}>
                        {content}
                    </div>
                </div>
            </div>
            <div style={styles.buttonContainer}>
                <button
                    onClick={()=> setClickReply(!clickReply)}
                    style={styles.replyButton}>
                    Reply
                </button>
            </div>
        </div>
        {
            clickReply &&
           <ReplyBox
                onCancel={handleCancel}
                onPost={()=>{}}>
           </ReplyBox> 
        }
        {
            replies && !showAll &&
            <button
                style={styles.allReplyButton}
                onClick={()=>setShowAll(true)}>
                <FaAngleDown color='#3A6D8C'/>
                {replies.length} replies
            </button>
        }
        {
            replies && showAll &&
            (
                <div style={styles.repliesContainer}>
                {
                    replies.map((item, index)=>(
                    <CommentBox
                        key={"m" + index}
                        user={item.user}
                        content={item.content}
                        timestamp={item.askedTime}
                        replies={item.replies}>
                    </CommentBox>
                    ))
                }
                    <button
                        style={styles.allReplyButton}
                        onClick={()=>setShowAll(false)}>
                        <FaAngleUp color='#3A6D8C'/>
                        Hide all
                    </button>
                </div>
            )
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
    headerContainer:{
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 20
    },
    username:{
        fontWeight: 'bold'
    },
    timestamp:{
        color: '#888',
    },
    repliesContainer:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 10,
        marginLeft: 20,
    },
    buttonContainer:{
        display: 'flex', 
        justifyContent: 'flex-end'
    },
    replyButton:{
        backgroundColor: Colors.secondary,
        border: 'none',
        color: 'black',
        cursor: 'pointer',
        padding: '2px 10px',
        borderRadius: '5px',
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
    }
}

export default CommentBox;