import { FormEvent, useState, useEffect } from 'react';
import BackOffice from '../../../pages/backOffice';
import axios from 'axios';

function HeaderContent() {
  const [datas, setDatas]         = useState([{headerTitle: "", aboutTitle: "", aboutInfo: ""}]);
  const [changed, setChanged]     = useState(false);
  const [buttonTop, setButtonTop] = useState<number | string>('');
  const domain                = "https://noela-portfolio-backend.onrender.com/headerData";

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const res = await axios.get(domain);
        const alldata = res.data[0];
      
        setDatas([{
          headerTitle: alldata.title,
          aboutTitle: alldata.about_title,
          aboutInfo: alldata.about_info
        }]);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchDatas();
  }, []);

  const handleFieldChange = (e: FormEvent) => {
    //Handle all datas need to save
    const target = e.target as HTMLInputElement; 
    const name =  target.name?.split("-")[0];
    const value = target.value;
    const dataTmp: Array<any> = [...datas];
    dataTmp[0][name] = value;
    setDatas(dataTmp);
    setChanged(true);
  }

  const saveHeaderDatas = () => {
    const data = datas[0];
    console.log(data);
    const updateTable = async () => {
      try {
        const res = await axios.post(domain, data);
        console.log(res);
        setChanged(false);
      } catch (error) {
        console.log(error);
      }
    }

    updateTable();
  }

  // Animation on scroll
  window.addEventListener('scroll', () => {
    const backOfficeHeaderHeight = document.getElementById('backOffice-header')?.clientHeight;
    const scroll = window.scrollY;

    if (backOfficeHeaderHeight) {
      if (scroll >= backOfficeHeaderHeight) {
        setButtonTop(0);
      } else {
        const position = backOfficeHeaderHeight - scroll;
        setButtonTop(position)
      }
    }
  });


  return (
    <BackOffice>
          <div className="header-container">
            <div className="front-background">
                <button className='btn btn-success' onClick={saveHeaderDatas} disabled={!changed} style={{top :buttonTop }}>Save</button>
                <div className="container title-button-about-container">
                    <div className="virtual-assistant-container">
                        <form action="" className="form-group">
                          <input type="text" value={(datas[0].headerTitle) ? datas[0].headerTitle : '' } name="headerTitle" className="form-control header-title-backoffice"  placeholder="Title" onChange={(e) => {handleFieldChange(e)}}/>
                        </form>
                        <div className="button-download-cv-container">
                            <button>Download my CV</button>
                        </div>
                    </div>
                    <div 
                    className="hello-image-noela-container">
                        <div className="image">
                            <img src="../images/noela-profil.jpg" alt="noela-image" />
                        </div>
                        <div className="about-her" style={{width: '100%'}}>
                            <p>
                              <textarea name="aboutTitle" value={(datas[0].aboutTitle) ? datas[0]?.aboutTitle : ''} className="form-control about-title-backOffice"  placeholder="About Title" onChange={e => {handleFieldChange(e)}}/>
                            </p>
                            <p>  
                              <textarea name="aboutInfo" value={(datas[0].aboutInfo) ? datas[0]?.aboutInfo : ''} className="form-control about-content-backOffice"  placeholder="Content" onChange={e => {handleFieldChange(e)}}/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BackOffice>
  )
}

export default HeaderContent
