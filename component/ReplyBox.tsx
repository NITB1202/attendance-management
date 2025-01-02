import React from 'react';

interface CommentBoxProps {
    avatar: string;
    name: string;
    content: string;
    timestamp: string;
    onPost: () => void;
    onCancel: () => void;
}

const ReplyBox: React.FC<CommentBoxProps> = ({ avatar, name, content, timestamp, onPost, onCancel }) => {
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
                    onClick={onCancel}
                    style={{
                        marginRight: '10px',
                        backgroundColor: '#999999',
                        border: 'none',
                        color: 'black',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '5px',
                    }}
                >
                    Cancel
                </button>
                <button
                    onClick={onPost}
                    style={{
                        backgroundColor: '#3a6d8c',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '5px',
                    }}
                >
                    Post
                </button>
            </div>
        </div>
    );
};

export default ReplyBox;