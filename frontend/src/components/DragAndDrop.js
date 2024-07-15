import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../css/draganddrop.css';

const DragAndDrop = ({ onDrop, file, onRemove }) => {
    const onDropHandler = useCallback((acceptedFiles) => {
        onDrop(acceptedFiles[0]);
    }, [onDrop]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDropHandler,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.heic'],
            'video/*': ['.mp4', '.mov', '.avi']
        },
        multiple: false,
        disabled: !!file
    });

    return (
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            {file ? (
                <>
                    {file.type.startsWith('image/') ? (
                        <img src={URL.createObjectURL(file)} alt="Dropped" className="dropped-file" />
                    ) : (
                        <video src={URL.createObjectURL(file)} controls className="dropped-file" alt="dropped" />
                    )}
                    <button className="remove-file" onClick={onRemove}>X</button>
                </>
            ) : isDragActive ? (
                <p>Drop the files here...</p>
            ) : (
                <p>Drag 'n' drop an image or video here, or click to select a file</p>
            )}
        </div>
);
};

export default DragAndDrop;
