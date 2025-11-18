import React, { useState } from 'react';
import './FileUpload.css';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { uploadFile, resetUploadState } from '../features/upload/uploadSlice';
import { Form, FormGroup, Modal } from 'react-bootstrap';
import { RootState } from '../store';
import { AppDispatch } from '../store';

interface FileUploadModalProps {
  onSelectX: (selectedHeadings: string[]) => void;
  onSelectY: (selectedHeadings: string[]) => void;
  onClose: () => void;
}

const FileUpload: React.FC<FileUploadModalProps> = ({
  onSelectY,
  onClose,
}: FileUploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploading, uploadSuccess, errorMessage, headers } = useSelector(
    (state: RootState) => state.fileUpload
  );
  const [selectedYHeadings, setSelectedYHeadings] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showYModal, setShowYModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(uploadFile(selectedFile));
      setShowModal(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    dispatch(resetUploadState());
  };

  const handleCloseModal = () => {
    if (uploadSuccess) {
    }
    setShowModal(false);
  };

  const handleCloseYModal = () => {
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
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            {uploadSuccess ? (
              <div>
                <p>File uploaded successfully</p>
              </div>
            ) : errorMessage ? (
              <p>Error uploading file: {errorMessage.message}</p>
            ) : (
              <p>Uploading file...</p>
            )}
          </Modal.Body>
          <Modal.Footer>
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
              {headers.map((heading: string, index: number) => (
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
        {errorMessage && <p>{errorMessage.message}</p>}
        <Button variant='success' onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
