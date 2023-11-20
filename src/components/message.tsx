import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import AnimateAlertMessage from '../interfaces/animateAlertMessage';
library.add(fab, fas, far);


const Message = (property: AnimateAlertMessage) => {
  return (
    <AnimatePresence>
      <motion.div className={'message-icon-container ' + property.type}
        variants={{
          hidden: {opacity: 0, x: 100, position: 'absolute'},
          visible: {opacity: 1, x: 0,  position: 'absolute'}
        }}
        initial="hidden"
        animate={property.isVisible}
        transition={{type:"spring" ,duration:1, delay: 0.15}}
        exit="hidden"
      >
        <div className="icon-container">
          <FontAwesomeIcon icon={property.icon as IconProp}/>
        </div>
        <div className="message-container">  
          <p>{property.type}</p>
          <p>{property.message}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
};

export default Message;