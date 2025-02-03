
import React from 'react';
import './CookieConsentModal.css';

interface CookieConsentModalProps {
    onAccept: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Типизация onAccept
}
const CookieConsentModal: React.FC<CookieConsentModalProps> = ({ onAccept }) => {
    return (
        <div className="cookie-consent-modal">
            <div className="modal-content">
                <ul className="no-bullets">
                <li>Consent to the use of Cookies</li>

                    <li> Our website uses cookies to improve the user experience and analyze traffic.</li>
                    <li>By clicking "Accept", you agree to our  privacy policy . </li>
                    {/* <li><a href="/privacy-policy"> privacy policy  </a>.</li> */}


                    <div className="button-container">
                        <button className='button1' onClick={onAccept}>Accept</button>
                        <button className='button2' onClick={onAccept}>Reject</button>

                    </div>
                </ul>
            </div>
        </div>
    );
};



export default CookieConsentModal;
