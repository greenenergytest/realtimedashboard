import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import './FileUpload.css';
import { useDispatch, useSelector } from 'react-redux';
//import { RootState } from '../store';
//.import {uploadFile} from '../features/'
import Button from 'react-bootstrap/Button';
import { uploadFile, resetUploadState } from '../features/upload/uploadSlice';
//import { fetchGraphDataFromBackend } from '../features/graphData/graphDataSlice';
// const [selectedHeadings, setSelectedHeadings] = useState([]);
import { Form, FormGroup, Modal } from 'react-bootstrap';

interface FileUploadModalProps {
  // headings: string[];
  onSelectX: (selectedHeadings: string[]) => void;
  onSelectY: (selectedHeadings: string[]) => void;
  onClose: () => void;
  //show: boolean;
}

const FileUpload: React.FC<FileUploadModalProps> = ({
  //headings = [],
  //onSelectX,
  onSelectY,
  onClose,
}: // show,
FileUploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploading, uploadSuccess, errorMessage, headers } = useSelector(
    (state: any) => state.fileUpload
  );
  // useEffect(()=> {
  //   console.log('component mounted or updated');
  // })
  //   const { selectXColumns, selectYColumns } = useSelector(
  //     (state: any) => state.graphData
  //   );
  //const [selectedXHeadings, setSelectedXHeadings]: any = useState([]);
  const [selectedYHeadings, setSelectedYHeadings] = useState<string[]>([]);

  // const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showYModal, setShowYModal] = useState(false);

  const dispatch = useDispatch();

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(uploadFile(selectedFile) as any);
      setShowModal(true);
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

  // const handleCheckboxChange = (event: any) => {
  //   const { value, checked } = event.target;
  //   if (checked) {
  //     setSelectedXHeadings([...selectedXHeadings, value]);
  //   } else {
  //     setSelectedXHeadings(
  //       selectedXHeadings.filter((heading: any) => heading !== value)
  //     );
  //   }
  // };

  // const handleSelectData = () => {
  //   // Handle Select Data
  //   // console.log('Selected headings:', selectedXHeadings);
  //   onSelectX(selectedXHeadings);
  //   setShowModal(false);
  //   setShowYModal(true);
  // };

  const handleCloseModal = () => {
    if (uploadSuccess) {
      // dispatch(
      //   fetchGraphDataFromBackend(
      //     selectedXHeadings,
      //     selectedYHeadings,
      //     fileName
      //   ) as any
      // );
    }
    setShowModal(false);
  };

  const handleCloseYModal = () => {
    // console.log(fileName);
    // dispatch(
    //   fetchGraphDataFromBackend(
    //     selectedXHeadings,
    //     selectedYHeadings,
    //     fileName,
    //     sheetName
    //   ) as any
    // );
    setShowYModal(false);
    onClose();
  };

  const handleSelectYData = () => {
    onSelectY(selectedYHeadings);
    handleCloseYModal();
  };

  return (
    <div className='fileClassName'>
      <input type='file' onChange={handleFileChange} />
      <div className='fileButtons'>
        <Button
          variant='success'
          onClick={handleUpload}
          disabled={uploading || !selectedFile}
          className='uploadButton'
        >
          {uploading ? 'Uploading...' : uploadSuccess ? 'Uploaded' : 'Upload'}
        </Button>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            {/* <Modal.Title>Select X-Axis Data</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            {uploadSuccess ? (
              <div>
                <p>File uploaded successfully</p>
                {/* <p>Select variables for x axis</p>
                <FormGroup>
                  {headers.map((heading: any, index: any) => (
                    <Form.Check
                      key={index}
                      type='checkbox'
                      id={heading}
                      label={heading}
                      value={heading}
                      checked={selectedXHeadings.includes(heading)}
                      onChange={handleCheckboxChange}
                    />
                  ))}
                </FormGroup> */}
              </div>
            ) : errorMessage ? (
              <p>Error uploading file: {errorMessage.message}</p>
            ) : (
              <p>Uploading file...</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            {/* <Button
              variant='secondary'
              onClick={handleSelectData}
              disabled={selectedXHeadings.length === 0}
            >
              Select
            </Button> */}
            <Button variant='secondary' onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showYModal} onHide={handleCloseYModal}>
          <Modal.Header closeButton>
            <Modal.Title>Select Y-Axis Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              {headers.map((heading: any, index: any) => (
                <Form.Check
                  key={index}
                  type='checkbox'
                  id={heading}
                  label={heading}
                  value={heading}
                  checked={selectedYHeadings.includes(heading)}
                  onChange={(event) => {
                    const { value, checked } = event.target;
                    if (checked) {
                      setSelectedYHeadings([...selectedYHeadings, value]);
                    } else {
                      setSelectedYHeadings(
                        selectedYHeadings.filter((heading) => heading !== value)
                      );
                    }
                  }}
                />
              ))}
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={handleSelectYData}
              disabled={selectedYHeadings.length === 0}
            >
              Select
            </Button>
            <Button variant='secondary' onClick={handleCloseYModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {errorMessage && <p>{errorMessage}</p>}
        <Button variant='success' onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
