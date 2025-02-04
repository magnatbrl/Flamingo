
import React from 'react';
import styles from './Contacts.module.css';

const Contacts: React.FC = () => {
    return (
        
        <div className={styles.contactPage}>
            <h1>Welcome to Casa Flamingo</h1>
            <p>Your cozy retreat in the heart of Figueira-da-Foz, Portugal. We’re here to make your stay unforgettable!</p>

            <section className={styles.contactInfo}>
                <h2>Contact Us</h2>
                <p>Have questions or need assistance? Feel free to reach out to us. Our friendly team is always ready to help you.</p>

                <h3>Address</h3>
                <p>
                    Hostel Casa Flamingo <br />
                    Rua Example, 123 <br />
                    3080-222 Figueira-da-Foz <br />
                    Portugal
                </p>

                <h3>Phone</h3>
                <p>📞 +351 123 456 789</p>

                <h3>Email</h3>
                <p>📧 contact@[hostelname].com</p>

                <h3>Social Media</h3>
                <p>
                    Follow us for updates, tips, and special offers: <br />
                    - Instagram: <a href="https://instagram.com/hostelname" target="_blank" rel="noopener noreferrer">@hostelname</a> <br />
                    - Facebook: <a href="https://facebook.com/hostelname" target="_blank" rel="noopener noreferrer">@hostelname</a>
                </p>
            </section>

            <section className={styles.location}>
                <h2>How to Find Us</h2>
                <p>
                    Our hostel is conveniently located in the vibrant center of Figueira-da-Foz:
                </p>
                <ul>
                    <li><strong>By Train:</strong> Figueira-da-Foz train station is a 15-minute walk.</li>
                    <li><strong>By Bus:</strong> The main bus terminal is just 10 minutes away.</li>
                    <li><strong>By Car:</strong> Parking is available nearby. Contact us for details.</li>
                </ul>
            </section>

            <section className="hours">
                <h2>Business Hours</h2>
                <p>Reception is open: <br /> 🕒 <strong>Monday - Sunday:</strong> 8:00 AM - 10:00 PM</p>
                <p>For late check-ins, please inform us in advance.</p>
            </section>
        </div>
    );
};

export default Contacts;

