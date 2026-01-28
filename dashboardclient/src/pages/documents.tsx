import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getAllDocuments,
  deleteDocument,
} from '../features/documents/documentsSlice';
import { ListGroup, Badge, Button, Spinner } from 'react-bootstrap';
import { Download, Trash } from 'react-bootstrap-icons';
import config from '../config';

const DocumentFieldView = () => {
  const dispatch = useDispatch<any>();

  const [documents, setDocuments] = useState<{
    payload: { files: Record<string, string> };
  }>({
    payload: { files: {} },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDocuments = async () => {
      setLoading(true);
      const docs = await dispatch(getAllDocuments());
      setDocuments(docs);
      setLoading(false);
    };

    loadDocuments();
  }, [dispatch]);

  const downloadDocument = (fileName: string) => {
    const link = document.createElement('a');
    link.href = `${config.apiBaseUrl}/download/${fileName}`;
    link.click();
  };

  const handleDelete = async (fileName: string) => {
    setLoading(true);
    await dispatch(deleteDocument(fileName));
    const docs = await dispatch(getAllDocuments());
    setDocuments(docs);
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        <ListGroup>
          {Object.entries(documents.payload.files).map(([key, value]) => (
            <ListGroup.Item
              key={key}
              className='d-flex justify-content-between align-items-center'
              style={{ backgroundColor: '#214035', color: 'white' }}
            >
              <Button
                variant='light'
                className='rounded-circle'
                onClick={() => handleDelete(value)}
              >
                <Trash size={16} />
              </Button>

              <span>{value.substring(value.lastIndexOf('-') + 1)}</span>

              <Badge bg='light'>
                <Button
                  variant='light'
                  size='sm'
                  onClick={() => downloadDocument(value)}
                >
                  <Download size={14} />
                </Button>
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default DocumentFieldView;
