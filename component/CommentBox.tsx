import React from 'react';

interface CommentBoxProps {
    avatar: string;
    name: string;
    content: string;
    timestamp: string;
    onReply: () => void;
}

const CommentBox: React.FC<CommentBoxProps> = ({ avatar, name, content, timestamp, onReply }) => {
    return (
        <div style={styles.commentBox}>
            <img src={avatar} alt="avatar" style={styles.avatar} />
            <div style={styles.commentContent}>
                <div style={styles.header}>
                    <span style={styles.commentName}>{name}</span>
                    <span style={styles.timestamp}>{timestamp}</span>
                </div>
                <p style={styles.commentText}>{content}</p>
                <button style={styles.replyButton} onClick={onReply}>
                    Reply
                </button>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    commentBox: {
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '10px',
        width: '40%',
        alignSelf: 'flex-start',
    },
    avatar: {
        width: '50px',
        height: '50px',
        borderRadius: '25px',
        marginRight: '10px',
    },
    commentContent: {
        flex: 1,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '5px',
    },
    commentName: {
        fontWeight: 'bold',
    },
    timestamp: {
        color: '#888',
        fontSize: '12px',
    },
    commentText: {
        marginBottom: '10px',
    },
    replyButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#007BFF',
        cursor: 'pointer',
        padding: '0',
    },
};

export default CommentBox;