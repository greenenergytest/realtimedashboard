import FieldCard from '../components/FieldCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFieldDetails } from '../features/FieldData/FieldDataSlice';

const FieldView = () => {
  const FieldCardItems = ['Cumm', 'WC', 'GOR', 'Rate'];
  const dispatch = useDispatch();
  const { cummData, waterCutData, gorData, rateData } = useSelector(
    (state: any) => state.fieldData
  );
  const sheetNames = useSelector((state: any) => state.fileUpload.sheetNames);
  console.log('logging out sheetNames');
  console.log(sheetNames);

  const valueOfItems: string[] = [];
  cummData ? valueOfItems.push(cummData) : valueOfItems.push('-');
  waterCutData ? valueOfItems.push(waterCutData) : valueOfItems.push('-');
  gorData ? valueOfItems.push(gorData) : valueOfItems.push('-');
  rateData ? valueOfItems.push(rateData) : valueOfItems.push('-');

  useEffect(() => {
    // in this useeffect, once the component mounts i want to make a call to request data for
    // the current cumm, WC, GOR, Rate by passing the sheetName
    dispatch(fetchFieldDetails('Summary') as any);
    //Also continue to get api for problem wells field data
  }, []);

  return (
    <div>
      <FieldCard items={FieldCardItems} valueOfItems={valueOfItems} />
    </div>
  );
};
export default FieldView;
