import React, { useState, useEffect } from 'react'
import AddOffs from '../AddOffs/AddOffs';
import OffsTable from '../OffsTable/OffsTable';

export default function Offs() {


  const [allOffs, setAllOffs] = useState([]);

  useEffect(() => {
    getAllOffs();
  }, []);

  const getAllOffs = () => {
    fetch("http://localhost:8000/api/offs/")
      .then((res) => res.json())
      .then((offs) => setAllOffs(offs));
  };

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const time = today.getHours()
        + ':' + today.getMinutes()
        + ":" + today.getSeconds();

    return `${time} ${date}/${month}/${year}`;
}


  return (
    <div>
      <AddOffs getAllOffs={getAllOffs} getDate={getDate} />
      <OffsTable allOffs={allOffs} getAllOffs={getAllOffs} getDate={getDate} />

    </div>
  )
}
