// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// //import VerticalHeader from '../components/VerticalHeader';
// // import Container from 'react-bootstrap/Container';
// // import Row from 'react-bootstrap/Row';
// // import Col from 'react-bootstrap/Col';
// import './Home.css';
// // import MenuItem from '../components/menuItem';
// // import Greenenergyicon from '../assets/Greenenergyicon.png';
// //import SelectedItem from '../components/SelectedItem';
// // import Menu from '../components/Menu';

// // import FlaringGas from '../assets/flaringGas.jpeg';
// import FileUpload from '../components/FIleUpload';
// //import PlotGraph from '../components/PlotGraph';
// import LoginPage from '../pages/login';
// import axios from 'axios';

// const Home = () => {
//   // type MenuItemType = {
//   //   name: string;
//   //   icon: string;
//   // };
//   //   const [, setFirstMenuItemClicked] = useState(false);
//   //const [selectedItem, setSelectedItem] = useState<string | null>(null);
//   // const [file, setFile] = useState<string | null>(null);
//   const [selectedXHeadings, setSelectedXHeadings] = useState<string[]>([]);
//   const [selectedYHeadings, setSelectedYHeadings] = useState<string[]>([]);
//   // const [headings, setHeadings] = useState([]);
//   const [, setShowModal] = useState(false);
//   // const xData = useSelector((state: any) => state.graphData.xData);
//   // const yData = useSelector((state: any) => state.graphData.yData);
//   // const sheetNames = useSelector((state: any) => state.graphData.sheetNames);
//   const { user } = useSelector((state: any) => state.auth);
//   const handleSelectXData = (selectedHeadings: any) => {
//     setSelectedXHeadings([...selectedXHeadings, selectedHeadings]);
//   };

//   const handleSelectYData = (selectedHeadings: any) => {
//     setSelectedYHeadings([...selectedYHeadings, selectedHeadings]);
//   };

//   const [fileContent, setFileContent] = useState('');

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedXHeadings([]);
//     setSelectedYHeadings([]);
//   };

//   useEffect(() => {
//     const fetchFileContent = async () => {
//       try {
//         await axios.get('http://localhost:3000/signin');
//         const response = await fetch('http://localhost:3000/files/read');
//         console.log(response);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         console.log(response);
//         const data = await response.text();
//         //console.log(data);
//         setFileContent(data);
//       } catch (error) {
//         console.error('Error fetching file content:', error);
//         console.log(error);
//       }
//     };
//     fetchFileContent();
//   });

//   return (
//     <>
//       {user && Object.keys(user).length > 0 ? (
//         <div className='fileUploadContainer'>
//           <div>
//             <FileUpload
//               // headings={headings}
//               onSelectX={handleSelectXData}
//               onSelectY={handleSelectYData}
//               onClose={handleCloseModal}
//               // show={showModal}
//             />
//           </div>
//           {/* <div>
//             <h3>File Content</h3>
//             <pre></pre>
//           </div> */}
//         </div>
//       ) : (
//         <LoginPage />
//       )}
//     </>
//   );
// };

// export default Home;
import { useState } from 'react';
import { useSelector } from 'react-redux';
//import VerticalHeader from '../components/VerticalHeader';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import './Home.css';
// import MenuItem from '../components/menuItem';
// import Greenenergyicon from '../assets/Greenenergyicon.png';
//import SelectedItem from '../components/SelectedItem';
// import Menu from '../components/Menu';

// import FlaringGas from '../assets/flaringGas.jpeg';
import FileUpload from '../components/FIleUpload';
//import PlotGraph from '../components/PlotGraph';
import LoginPage from '../pages/login';

const Home = () => {
  // type MenuItemType = {
  //   name: string;
  //   icon: string;
  // };
  //   const [, setFirstMenuItemClicked] = useState(false);
  //const [selectedItem, setSelectedItem] = useState<string | null>(null);
  // const [file, setFile] = useState<string | null>(null);
  const [selectedXHeadings, setSelectedXHeadings] = useState<string[]>([]);
  const [selectedYHeadings, setSelectedYHeadings] = useState<string[]>([]);
  // const [headings, setHeadings] = useState([]);
  const [, setShowModal] = useState(false);
  // const xData = useSelector((state: any) => state.graphData.xData);
  // const yData = useSelector((state: any) => state.graphData.yData);
  // const sheetNames = useSelector((state: any) => state.graphData.sheetNames);
  const { user } = useSelector((state: any) => state.auth);
  const handleSelectXData = (selectedHeadings: any) => {
    setSelectedXHeadings([...selectedXHeadings, selectedHeadings]);
  };

  const handleSelectYData = (selectedHeadings: any) => {
    setSelectedYHeadings([...selectedYHeadings, selectedHeadings]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedXHeadings([]);
    setSelectedYHeadings([]);
  };

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
