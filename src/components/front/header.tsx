import { motion, useInView, useAnimation } from 'framer-motion';
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';

function Header() {   
    const [datas, setDatas] = useState({headerTitle: "", aboutTitle: "", aboutInfo: ""});
    const domain            = "https://noela-portfolio-backend.onrender.com/headerData";

    const ref          = useRef(null);
    const isInView     = useInView(ref, { once:true });
    const mainControls = useAnimation();

    useEffect(() => {
      if (isInView) {
        mainControls.start("visible");
      }

      const fetchDatas = async () => {
        try {
          const res = await axios.get(domain);
          const alldata = res.data[0];
          console.log(alldata)
          setDatas({
            headerTitle: alldata.title,
            aboutTitle: alldata.about_title,
            aboutInfo: alldata.about_info
          });
          
        } catch (error) {
          console.log(error);
        }
      }

      fetchDatas();
    }, [isInView]);


    return <>
        <div className="header-container">
            <div className="front-background">
                <div className="noela-logo-container">
                    <img src="../../../images/logo-noela.png" alt="noela logo" />
                </div>
                <div className="container title-button-about-container">
                    <motion.div ref={ref}
                     variants={{
                        hidden: {opacity: 0, y:-75},
                        visible: {opacity: 1, y: 0}
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{duration:1, delay: 0.15}}
                    className="virtual-assistant-container">
                        <h1>{datas.headerTitle}</h1>
                        <div className="button-download-cv-container">
                            <button>Download my CV</button>
                        </div>
                    </motion.div>
                    <motion.div 
                    ref={ref}
                    variants={{
                       hidden: {opacity: 0, y:-75},
                       visible: {opacity: 1, y: 0}
                   }}
                   initial="hidden"
                   animate={mainControls}
                   transition={{duration:2, delay: 0.15}}
                    className="hello-image-noela-container">
                        <div className="image">
                            <img src="../images/noela-profil.jpg" alt="noela-image" />
                        </div>
                        <div className="about-her">
                            <p className="intro">
                                {datas.aboutTitle}
                            </p>
                            <p>
                                {datas.aboutInfo}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    </>
}

export default Header;