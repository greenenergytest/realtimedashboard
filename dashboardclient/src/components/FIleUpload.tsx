import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import './FileUpload.css';
import { useDispatch, useSelector } from 'react-redux';
//import { RootState } from '../store';
//.import {uploadFile} from '../features/'
import Button from 'react-bootstrap/Button';
import { uploadFile, resetUploadState } from '../features/upload/uploadSlice';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploading, uploadSuccess, errorMessage } = useSelector(
    (state: any) => state.fileUpload
  );

  const dispatch = useDispatch();

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(uploadFile(selectedFile) as any);
    }
  };

  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    dispatch(resetUploadState());
  };
  return (
    <div className='fileClassName'>
      <input type='file' onChange={handleFileChange} />
      <div className='fileButtons'>
        <Button
          variant='secondary'
          onClick={handleUpload}
          disabled={uploading || !selectedFile}
          className='uploadButton'
        >
          {uploading ? 'Uploading...' : uploadSuccess ? 'Uploaded' : 'Upload'}
        </Button>
        {uploadSuccess && <p> File uploaded successfully</p>}
        {errorMessage && <p>{errorMessage}</p>}
        <Button variant='secondary' onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
