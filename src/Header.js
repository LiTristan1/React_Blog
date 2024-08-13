import React from 'react';
import { FaLaptop, FaTabletAlt, FaMobileAlt} from 'react-icons/fa';
import './index.css';
import {useContext} from 'react';
import DataContext from './context/DataContext';
import useWindowSize from './hooks/useWindowSize';
const Header = ({title}) => {
  const{width} = useWindowSize();
  
  return (
    <div className = 'header'>
        <h1>{title}</h1>
        {width < 768 ? <FaMobileAlt/>: width < 992 ? <FaTabletAlt/>:<FaLaptop/>}
    </div>
  )
}

export default Header;
