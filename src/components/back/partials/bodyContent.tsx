import BackOffice from '../../../pages/backOffice';
import { FormEvent, useState, useEffect } from 'react';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  icons from './listIcon.json';

library.add(fab, fas, far);

function BodyContent() {
  const [iconSelected, setIconSelected]     = useState<Array<IconProp>>(["note-sticky"]);
  const [datas, setDatas]                   = useState([{icon: "note-sticky", title: "", info: ""}]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  let arrayOfBolean: Array<boolean>  = [];
  let selectIconClass: Array<String> = [];
  
  icons.map(() => {
    arrayOfBolean.push(false);
    selectIconClass.push("");
  });

  const [showDropdown, setShowDropdown]            = useState<Array<boolean>>(arrayOfBolean);
  const [showDropdownIndex, setShowDropdownIndex ] = useState(0);
  const [buttonTop, setButtonTop]                  = useState<number | string>('');
  
  const domain = "https://noela-portfolio-backend.onrender.com/bodyContent";

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const res      = await axios.get(domain);
        const services = res.data;

        if (services.length > 0) {  
          setDatas(services);
        }

      } catch (error) {
        console.log(error);
      }
    }
    
    fetchDatas();
  }, []);


  const addServices = () => {
      const iconTmp: IconProp = "note-sticky";
      const services          = [...datas];

      setDatas([...services, {icon: "note-sticky", title: "", info: "" }]);

      if (services.length > 1) {
        const allIcon  = [...iconSelected, iconTmp];
        setIconSelected(allIcon);
      }
  }


  const handleShowIconDropdown = (i: number) => {
    const oldArray = [...arrayOfBolean];
    if (showDropdownIndex == i && showDropdown[i] == true) {
      setShowDropdownIndex(i);
      setShowDropdown(oldArray);
      return false;
    }

    // Show dropdown
    oldArray[i] = !oldArray[i];
    setShowDropdownIndex(i);
    setShowDropdown(oldArray);

  }
  
  selectIconClass[showDropdownIndex] = (showDropdown[showDropdownIndex]) ? "dropdown-showed" : "";

  const handleIconSelected = (e: FormEvent, iconSelectedFromlistOfIcon: IconProp, i: number) => {
    e.preventDefault()
    // Get icon selected
    const allIcon = [...iconSelected];    
    allIcon[i] = iconSelectedFromlistOfIcon;

    setIconSelected(allIcon);    
    setInformationToData(i, 'icon', iconSelectedFromlistOfIcon as string);

    // Hide dropdown
    const oldArray = [...arrayOfBolean];
    setShowDropdownIndex(i);
    setShowDropdown(oldArray);
    setButtonDisabled(false);
  }

  const handleDelete = (i: number) => {
    // Delete all datas need to save
      const dataTmp = [...datas];
      dataTmp.splice(i, 1);
      setDatas(dataTmp);
      setButtonDisabled(false);
  }

  const handleFieldChange = (e: FormEvent , index: number) => {
    //Handle all datas need to save
    const target = e.target as HTMLInputElement;
    const name   = target.name?.split("-")[0];
    const value  = target.value;

    setInformationToData(index, name, value);
  }

  const setInformationToData = (index: number, name: string, value: string) => {
    const dataTmp: Array<any> = [...datas];
    dataTmp[index][name] = value;
    setDatas(dataTmp);
    setButtonDisabled(false);
  }


  const saveData = () => {
      const data = datas;
      
      const updateTable = async () => {
        try {
          const res = await axios.post(domain, data);
          alert(res.data);
          setButtonDisabled(true);
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
       <div  className="services-container">
          <div className="container">
            <div className="title">
                <h2>What Can I do for You?</h2>
                <hr />
                <button className='btn btn-success' onClick={saveData} disabled={buttonDisabled} style={{top: buttonTop}}>Save</button>
            </div>
            <div className="list-service-container" >
                {datas.map((value, index) => {
                    return (      
                        <div key={index} className="service" >
                          <div className="logo">                        
                            <div className="select-icon-container">
                              <div className="icon-selected-container">
                                <span className='icon-selected'>
                                  <input  name={"icon-" + index} type="hidden" value={value.icon} />
                                  <FontAwesomeIcon icon={value.icon as IconProp}/>
                                </span>
                                <span className="icon-chevron" onClick={() => handleShowIconDropdown(index)}>
                                  <FontAwesomeIcon icon="chevron-down"/>
                                </span>
                              </div>
                              <div className={'select-icon ' + selectIconClass[index]}>
                                {icons.map((icon, i) => {
                                    return (
                                      <span key={i} onClick={(e) => handleIconSelected(e, icon as IconProp, index)}><FontAwesomeIcon icon={icon as IconProp}/></span>
                                    )
                                })}
                              </div>
                            </div>  
                          </div>
                          <div className="title">
                              <input value={value.title} onChange={e => {handleFieldChange(e, index)}} name={"title-" + index}type="text"  className="form-control"  placeholder='Services title'/>
                          </div>
                          <div className="content">
                              <textarea value={value.info} onChange={e => {handleFieldChange(e, index)}} name={"info-" + index} placeholder='Information of the service'></textarea>
                          </div>
                          <div className="delete-backOffice-service-button">
                            <p  onClick={() => handleDelete(index)}><FontAwesomeIcon icon={"fas fa-minus-circle" as IconProp}/></p>
                          </div>
                        </div>
                    )
                  }
                )}
              
              <button className="add-services btn btn-warning" onClick={addServices}>
                  <FontAwesomeIcon icon="plus" />
              </button>
            </div>
          </div>
        </div>
    </BackOffice>
  )
}

export default BodyContent
