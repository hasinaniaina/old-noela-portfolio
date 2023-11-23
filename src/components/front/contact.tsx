
import emailjs from '@emailjs/browser';
import {FormEvent, MutableRefObject, useRef, useState} from 'react';
import Message from "../message";

function Contact() {
    let form         = useRef() as MutableRefObject<HTMLFormElement>;
    let name         = useRef() as MutableRefObject<HTMLInputElement>;
    let email        = useRef() as MutableRefObject<HTMLInputElement>;
    let message      = useRef() as MutableRefObject<HTMLTextAreaElement>;

    let [nameValue, setNameValue]       = useState('');
    let [emailValue, setEmailValue]     = useState('');
    let [messageValue, setMessageValue] = useState('');

    let [property, setProperty] = useState({
        isVisible: 'hidden',
        type     : 'Success',
        icon     : 'fa-solid fa-square-check',
        message  : 'Message Send'
    });

    const sendEmail = (e: FormEvent) => {
        e.preventDefault();

        let nameInputValue    = name.current.value;
        let emailInpuValue    = email.current.value;
        let messageInputValue = message.current.value;

        if (nameInputValue == '' || emailInpuValue  == '' || messageInputValue == '') {
            handleShowMessage('visible','Error', 'fa-solid fa-square-xmark', 'Fields should not be empty...');
        } else {
            emailjs.sendForm('service_qqgfh1f', 'template_zqvuqya', form.current, 'td7np1gIZ_aw6absi')
              .then((result) => {
                    console.log(result.text);
                    handleShowMessage('visible', 'Success', 'fa-solid fa-square-check', 'Message send...');
                    setNameValue('');
                    setEmailValue('');
                    setMessageValue('');
              }, (error) => {
                    handleShowMessage('visible','Error', 'fa-solid fa-square-xmark', error.text)
                    console.log(error.text);
              });
        }
          
        
    };

    const handleShowMessage = (visible: string, type: string, icon: string, message:string) => {      
        setProperty({
            isVisible: visible,
            type: type,
            icon:icon,
            message: message
        });

        setTimeout(function() {
            setProperty({
                isVisible:'hidden',
                type: type,
                icon:icon,
                message: message
            });
        }, 3000);
    }

    return (
        <div className='section'>
            <div className="contact-container">
                <div className="front-background-contact">  
                    <div className="container">
                        <div className="big-title-container">
                            <h2>Send me a message</h2>
                            <hr />
                        </div>
                        <div className="content-contact-container">
                            <div className="left-content">
                                <h4>Get in touch is easy!</h4>
                                <ul>
                                    <li>- Lot II B 47 Ampandrana Ouest, Antananrivo, Madagascar</li>
                                    <li>- +261 34 28 210 75</li>
                                    <li>- noelarakotonindrina@gmail.com</li>
                                    <li>
                                        <a href=""><img src="../icons/linkedin.png" alt="linkedin" /></a>
                                        <a href=""><img src="./icons/facebook.png" alt="facebook" /></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="right-content">
                                <Message isVisible={property.isVisible} type={property.type} icon={property.icon} message={property.message}></Message>
                                <form ref={form} onSubmit={(e) => sendEmail(e)}>
                                    <ul>
                                        <li>
                                            <input ref={name} value={nameValue} onChange={(e) => setNameValue(e.target.value)} type="text" name="user_name" id="name" placeholder="Name" className="form-control"/>
                                        </li>
                                        <li>
                                            <input ref={email} value={emailValue} onChange={(e) => setEmailValue(e.target.value)}  type="email" name="user_email" id="email" placeholder="email" className="form-control"/>
                                        </li>
                                        <li>
                                            <textarea ref={message} value={messageValue} onChange={(e) => setMessageValue(e.target.value)} name="message" id="message" placeholder="Write a message" className="form-control"></textarea>
                                        </li>
                                        <li>
                                            <button type='submit'>Send Message</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;