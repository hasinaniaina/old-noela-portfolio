import axios from 'axios';
import { motion, useScroll} from 'framer-motion';
import {useEffect, useRef, useState} from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab, fas, far);

function Services() {
    const ref                 = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['-1 1', '1 1']
    });

    
    const [datas, setDatas] = useState([{icon: "note-sticky", title: "", info: ""}]);
    const domain            = "https://noela-portfolio-backend.onrender.com/bodyContent";


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

    return (
        <>
            <div  className="services-container">
                <div className="container">
                    <div className="title">
                        <h2>What Can I do for You?</h2>
                        <hr />
                    </div>
                    <motion.div ref={ref} className="list-service-container"  style={{scale: scrollYProgress, opacity: scrollYProgress}}>
                    {datas.map((value, index) => {
                        return (
                                <div key={index} className="service">
                                    <div className="logo">
                                        <FontAwesomeIcon icon={value.icon as IconProp}/>
                                    </div>
                                    <div className="title">
                                        <p>{value.title}</p>
                                    </div>
                                    <div className="content">
                                        <p>{value.info}</p>
                                    </div>
                                </div>
                        );
                    })}
                    </motion.div>
                </div>
            </div>
        </>
    );
}

export default Services;