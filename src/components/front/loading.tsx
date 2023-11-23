import { useEffect, useState } from "react";
import axios from 'axios';


export default function Loading() {
  const domain  = "https://noela-portfolio-backend.onrender.com/headerData";
  const [display, setDisplay]  = useState('show-loading');

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const res = await axios.get(domain);        
        return res;
      } catch (error) {
        console.log(error);
      }
    }

    fetchDatas().then((result) => {
      if (result) {
        setDisplay('hide-loading');
      }
    })
  }, []);

  return (
    <div className={'loading-container-' + display}>
      <img className="rotate" src="../../../images/logo-noela.png" alt="noela logo" />
    </div>
  )
}
