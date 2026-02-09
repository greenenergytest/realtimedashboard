import { useState } from 'react';
import { useSelector } from 'react-redux';
import './Home.css';
import FileUpload from '../components/FIleUpload';
import LoginPage from '../pages/login';

interface authState {
  [key: string]: string;
}

interface authRootState {
  auth: authState;
}

const Home = () => {
  const [prevSelectedXHeadings, setSelectedXHeadings] = useState<string[]>([]);
  const [prevSelectedYHeadings, setSelectedYHeadings] = useState<string[]>([]);
  const [, setShowModal] = useState(false);
  const { user } = useSelector((state: authRootState) => state.auth);

  const handleSelectXData = (selectedHeadings: string[]) => {
    setSelectedXHeadings((prevSelectedXHeadings) => [
      ...prevSelectedXHeadings,
      ...selectedHeadings,
    ]);
  };

  const handleSelectYData = (selectedHeadings: string[]) => {
    setSelectedYHeadings((prevSelectedYHeadings) => [
      ...prevSelectedYHeadings,
      ...selectedHeadings,
    ]);
    //setSelectedYHeadings([...selectedYHeadings, selectedHeadings]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedXHeadings([]);
    setSelectedYHeadings([]);
  };

  // useEffect(() => {
  //   // steps to making retrieving data with key
  //   // Make an api call to the cloud server'
  //   // Retrieve the data from the backend

  //   const url = 'https://myproject.sharepoint.com/personal/name';
  //   const username = 'username@microsoft.com';
  //   const password = '';

  //   // app.get('/', (req,res)=> {
  //   //   console.log("")
  //   // });
  // }, []);

  return (
    <>
      {user && Object.keys(user).length > 0 ? (
        <div className='fileUploadContainer'>
          <FileUpload
            // headings={headings}
            onSelectX={handleSelectXData}
            onSelectY={handleSelectYData}
            onClose={handleCloseModal}
            // show={showModal}
          />
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default Home;
