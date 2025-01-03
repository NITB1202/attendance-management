import React from 'react';

interface CommentBoxProps {
    className: string;
    avatar: string;
    name: string;
    content: string;
    timestamp: string;
    onReply: () => void;
}

const CommentBox: React.FC<CommentBoxProps> = ({ avatar, name, content, timestamp, onReply }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            marginBottom: '10px',
            width: '40%',
        }}>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                <img src={avatar} alt="avatar" style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '25px',
                    marginRight: '10px',
                }} />
                <div style={{ flex: 1 }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '5px',
                    }}>
                        <span style={{ fontWeight: 'bold' }}>{name}</span>
                        <span style={{ color: '#888', fontSize: '12px' }}>{timestamp}</span>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        {content}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={onReply}
                    style={{
                        backgroundColor: '#6a9ab0',
                        border: 'none',
                        color: 'black',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '5px',
                    }}
                >
                    Reply
                </button>
            </div>
        </div>
    );
};

export default CommentBox;