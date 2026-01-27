import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as fs from 'fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { useLocation } from 'react-router-dom';
import { getAllDocuments } from '../features/documents/documentsSlice';
import { deleteDocument } from '../features/documents/documentsSlice';
import { ListGroup, Badge, Button } from 'react-bootstrap';
import { Download } from 'react-bootstrap-icons';
import config from '../config';
import { Trash } from 'react-bootstrap-icons';
//read the files from the uploads and store in an array
//loop through the files
//diplay the files on the page

//const path = require('path');
//const fs = require('fs');

/*const location = useLocation();
const __filename = fileURLToPath(location.pathname);

console.log(__filename);

//console.log(__filename);

let __dirname = path.dirname(__filename);
let uploadsDir = path.join(__dirname, 'uploads');

const getDocumentLink = () => {
  fetch(`http://192.168.1.232:5000/api/${uploadsDir}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
}; */

//get the name of the doc
// and match it to that in the folder

const DocumentFieldView = () => {
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState<any>({
    payload: { files: {} },
  });

  // const list_colors = ['primary', 'secondary', 'success', 'danger'];

  useEffect(() => {
    const load_documents = async () => {
      const docs = await dispatch(getAllDocuments() as any);

      setDocuments(docs);
      // console.log(documents);
      //console.log('in load documents');
    };

    load_documents();
  }, []);

  const downloadDocuments = async (doc: any, fileName: string) => {
    // if (doc instanceof Blob) {
    //192.168.1.172:5000
    // const link = document.createElement('a');
    // link.href = `http://192.168.1.172:5000/uploads/${fileName}`;
    // link.download = fileName;
    // link.click();
    const link = document.createElement('a');
    link.href = `${config.apiBaseUrl}/download/${fileName}`;
    //link.href = ;

    link.click();
  };

  const handleDelete = async (value: unknown) => {
    console.log(value);
    // pass filename to backend service
    // delete the file
    // refresh the list in useEffect
    await dispatch(deleteDocument(String(value)) as any);
    const docs = await dispatch(getAllDocuments() as any);
    setDocuments(docs);
  };
  // getDocumentLink();
  //   fs.readdir(
  //     uploadsDir,
  //     (err: NodeJS.ErrnoException | null, files: string[] | undefined) => {
  //       if (err) {
  //         throw err;
  //       }
  //       console.log(files);
  //     }
  //   );

  return (
    <div>
      {/* <h3 style={{ color: 'black' }}> Documents </h3> */}
      <ListGroup style={{ display: 'flex', gap: '8px' }}>
        {Object.entries(documents.payload.files).map(([key, value], index) => {
          {
            console.log(value);
          }
          return (
            <ListGroup key={key}>
              <ListGroup.Item
                className='d-flex justify-content-between align-items-start'
                style={{ backgroundColor: '#214035' }}

                //  className="d-flex justify-content-between align-items-start"
              >
                <Button
                  variant='light'
                  className='rounded-circle d-flex align-items-center justify-content-center'
                  style={{ width: '36px', height: '36px' }}
                  onClick={() => handleDelete(value)}
                >
                  <Trash size={16} />
                </Button>
                <ListGroup.Item variant='success'>
                  {value
                    ? (value as string).substring(
                        (value as string).lastIndexOf('-') + 1,
                      )
                    : String(value)}
                </ListGroup.Item>
                <Badge bg='#214035' pill>
                  <Button
                    variant='light'
                    size='sm'
                    className='p-1 d-flex align-items-center'
                    onClick={() => downloadDocuments(value, String(value))}
                  >
                    <Download size={14} />
                  </Button>
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default DocumentFieldView;
