import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';
import {
  fetchTypes,
  createType,
  updateType,
  deleteType
} from './slices/typeSlice';

import { FaBeer } from 'react-icons/fa';
import Button from './components/UI/button';
import Input from './components/UI/input';


function App(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  return (
    <div style={{ padding: '1rem' }}>
      <Button variant='secondary'><FaBeer></FaBeer>Cliccami!!</Button>
      <Input/>
    </div>
  );
}

export default App;
