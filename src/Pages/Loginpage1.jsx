import React, { useEffect } from 'react'
import Loginform from '../components/Loginform';

const Loginpage1 = () => {
  useEffect(() => {
    console.log("Loginform Loaded");
  }, []);

  return (
    <div>
      <Loginform />
    </div>
  );
};

export default Loginpage1;
