import { useState } from 'react';
import VerticalHeader from '../components/VerticalHeader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css';
import MenuItem from '../components/menuItem';
import Greenenergyicon from '../assets/Greenenergyicon.png';
import SelectedItem from '../components/SelectedItem';
import Menu from '../components/Menu';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from '../components/Card';
import FlaringGas from '../assets/flaringGas.jpeg';
import FileUpload from '../components/FIleUpload';

const Home = (props: any) => {
  type MenuItemType = {
    name: string;
    icon: string;
  };
  //   const [, setFirstMenuItemClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [file, setFile] = useState<string | null>(null);

  const menuItems: MenuItemType[] = [
    { name: 'Well1', icon: Greenenergyicon },
    { name: 'Well2', icon: Greenenergyicon },
    { name: 'Well3', icon: Greenenergyicon },
    { name: 'Well4', icon: Greenenergyicon },
    { name: 'Well5', icon: Greenenergyicon },
    { name: 'Well6', icon: Greenenergyicon },
    { name: 'Well7', icon: Greenenergyicon },
    { name: 'Well8', icon: Greenenergyicon },
    { name: 'Well9', icon: Greenenergyicon },
    { name: 'Well10', icon: Greenenergyicon },
    { name: 'Well11', icon: Greenenergyicon },
    { name: 'Well12', icon: Greenenergyicon },
    { name: 'Well13', icon: Greenenergyicon },
    { name: 'Well14', icon: Greenenergyicon },
    { name: 'Well15', icon: Greenenergyicon },
    { name: 'Well16', icon: Greenenergyicon },
    { name: 'Well17', icon: Greenenergyicon },
    { name: 'Well18', icon: Greenenergyicon },
    { name: 'Well19', icon: Greenenergyicon },
  ];

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

  const handleUpload = (e: any) => {
    if (!file) {
      alert('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    console.log('handle file change ');
  };

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
          <FileUpload />

          {/* <div style={{ marginLeft: '30px', marginTop: '20px' }}>
            <div>
              <input type='file' onChange={handleFileChange} />
            </div>
          </div> */}
        </div>
      </div>
      <div style={{ width: '80%', height: '100%', backgroundColor: 'white' }}>
        <div style={{ display: 'flex' }}>
          <Card
            title='Flaring and Venting'
            imageUrl={FlaringGas}
            description='10%'
          >
            <SelectedItem selectedItem={selectedItem} />
          </Card>
          <div style={{ marginLeft: '20px' }}>
            <Card
              title='Oil Production Rate'
              imageUrl={FlaringGas}
              description='10%'
            >
              <SelectedItem selectedItem={selectedItem} />
            </Card>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <Card title='Gas Oil Ratio' imageUrl={FlaringGas} description='10%'>
            <SelectedItem selectedItem={selectedItem} />
          </Card>
          <div style={{ marginLeft: '20px' }}>
            <Card
              title='Gas Production Rate'
              imageUrl={FlaringGas}
              description='10%'
            >
              <SelectedItem selectedItem={selectedItem} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
