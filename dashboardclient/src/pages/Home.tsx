import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import VerticalHeader from '../components/VerticalHeader';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import './Home.css';
// import MenuItem from '../components/menuItem';
// import Greenenergyicon from '../assets/Greenenergyicon.png';
import SelectedItem from '../components/SelectedItem';
// import Menu from '../components/Menu';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from '../components/Card';
// import FlaringGas from '../assets/flaringGas.jpeg';
import FileUpload from '../components/FIleUpload';
import PlotGraph from '../components/PlotGraph';

const Home = () => {
  // type MenuItemType = {
  //   name: string;
  //   icon: string;
  // };
  //   const [, setFirstMenuItemClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  // const [file, setFile] = useState<string | null>(null);
  const [selectedXHeadings, setSelectedXHeadings] = useState<string[]>([]);
  const [selectedYHeadings, setSelectedYHeadings] = useState<string[]>([]);
  // const [headings, setHeadings] = useState([]);
  const [, setShowModal] = useState(false);
  const xData = useSelector((state: any) => state.graphData.xData);
  const yData = useSelector((state: any) => state.graphData.yData);

  // Log xData and yData to console for debugging
  useEffect(() => {
    console.log('xData:', xData);
    console.log('yData:', yData);
  }, [xData, yData]);

  const handleItemClick = (itemName: string) => {
    console.log(itemName);
    setSelectedItem(itemName);
  };

  // const uploadExcel = () => {
  //   const [file, setFile] = useState(null);

  //   const handleFileChange = (e) => {
  //     setFile(e.target.files[0]);
  //   };
  // };

  // const handleUpload = (e: any) => {
  //   if (!file) {
  //     alert('Please select a file');
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append('file', file);
  // };

  // const handleFileChange = (e: any) => {
  //   setFile(e.target.files[0]);
  //   console.log('handle file change ');
  // };

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
  // Flatten yData
  const flattenYData = yData.map((item: any) => item[0]);
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ width: '20%', height: '100%', backgroundColor: 'white' }}>
        {/* <div>
          <Menu menuItems={menuItems} onItemClick={handleItemClick} />
        </div> */}
        <div>
          <Dropdown>
            <Dropdown.Toggle variant='success' id='dropdown-basic'>
              Wells
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleItemClick('Action 1')}>
                well 1
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemClick('Action 2')}>
                well 2
              </Dropdown.Item>
              <Dropdown.Item href='#'>well 3</Dropdown.Item>
              <Dropdown.Item href='#'>Overall view</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <FileUpload
            // headings={headings}
            onSelectX={handleSelectXData}
            onSelectY={handleSelectYData}
            onClose={handleCloseModal}
            // show={showModal}
          />

          {/* <div style={{ marginLeft: '30px', marginTop: '20px' }}>
            <div>
              <input type='file' onChange={handleFileChange} />
            </div>
          </div> */}
        </div>
      </div>
      <div style={{ width: '20%', height: '100%', backgroundColor: 'white' }}>
        <div style={{ display: 'flex' }}>
          <Card
            title='Flaring and Venting'
            // imageUrl={FlaringGas}
            description='10%'
          >
            <SelectedItem selectedItem={selectedItem} />
          </Card>
          {/* <div style={{ marginLeft: '20px' }}>
            <Card
              title='Oil Production Rate'
              imageUrl={FlaringGas}
              description='10%'
            >
              <SelectedItem selectedItem={selectedItem} />
            </Card>
          </div> */}
        </div>
        <div style={{ display: 'flex' }}>
          <Card title='Gas Oil Ratio' description='10%'>
            <SelectedItem selectedItem={selectedItem} />
          </Card>
          {/* <div style={{ marginLeft: '20px' }}>
            <Card
              title='Gas Production Rate'
              imageUrl={FlaringGas}
              description='10%'
            >
              <SelectedItem selectedItem={selectedItem} />
            </Card>
          </div> */}
        </div>
      </div>
      <div style={{ width: '60%', height: '100%', backgroundColor: 'white' }}>
        {xData &&
          flattenYData &&
          xData.length > 0 &&
          flattenYData.length > 0 && (
            <PlotGraph xData={xData} yData={flattenYData} />
          )}
      </div>
    </div>
  );
};

export default Home;
