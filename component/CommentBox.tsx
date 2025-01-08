import React, { useState } from 'react';
import { Colors } from '../constant/Colors';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import ReplyBox from './ReplyBox';
import { extractDate } from '../util/util';

interface CommentBoxProps {
    sessionId: number;
    id: number;
    user: string;
    content: string;
    timestamp: string;
    replies: any[];
    onCancel?: () => void;
    avatarNumber?: number;
    setUpdate: () => void;
    disableReply?: boolean;
}

const CommentBox: React.FC<CommentBoxProps> = ({ sessionId, id, user, content, timestamp, replies, onCancel, avatarNumber = 1, setUpdate, disableReply = false}: CommentBoxProps) => {
    const [clickReply, setClickReply] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const avatarLink = "/reply_avatar/reply_" + avatarNumber + ".jpg";

    const handleCancel = () =>{
        setClickReply(false);
        if(onCancel) onCancel();
    }

    const handlePost = () =>{
        setClickReply(false);
        setUpdate();
    }

    return (
        <div style={styles.container}>
        <div style={{...styles.commentContainer}}>
            <div style={{ display: 'flex'}}>
                <img src= {avatarLink}
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
                {   !disableReply && 
                    <button
                        onClick={()=> setClickReply(!clickReply)}
                        style={styles.replyButton}>
                        Reply
                    </button>
                }
            </div>
        </div>
        {
            clickReply &&
           <ReplyBox
                parentId={id}
                sessionId={sessionId}
                onCancel={handleCancel}
                onPost={handlePost}>
           </ReplyBox> 
        }
        {
            replies.length > 0 && !showAll &&
            <button
                style={styles.allReplyButton}
                onClick={()=>setShowAll(true)}>
                <FaAngleDown color='#3A6D8C'/>
                {replies.length} replies
            </button>
        }
        {
            replies.length > 0 && showAll &&
            (
                <div style={styles.repliesContainer}>
                {
                    replies.map((item)=>(
                    <CommentBox
                        key={item.id}
                        id= {item.id}
                        sessionId={sessionId}
                        user={item.user}
                        content={item.content}
                        timestamp={extractDate(item.askedTime)}
                        replies={item.replies}
                        avatarNumber={avatarNumber+1}
                        disableReply={disableReply}
                        setUpdate={setUpdate}>
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