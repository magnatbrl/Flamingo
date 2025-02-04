import React from 'react';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className={styles.privacyPolicyPage}>
            <h1>Privacy Policy and Cookie Policy</h1>

            <section className="introduction">
                <p>
                    Welcome to <strong>Casa Flamingo</strong>. We value your privacy and are committed to protecting your personal data.
                    This document explains how we handle your information and use cookies on our website.
                </p>
            </section>

            <section className="privacy-policy">
                <h2>Privacy Policy</h2>
                <p>
                    We collect and process personal data to provide you with the best experience possible. This includes:
                </p>
                <ul>
                    <li>Your name and contact information (e.g., email, phone number) when you make a booking or contact us.</li>
                    <li>Payment details to process your reservations securely.</li>
                    <li>Information you provide in feedback or inquiries.</li>
                </ul>
                <p>
                    Your data is stored securely and will never be shared with third parties without your consent, except as required by law.
                </p>
            </section>

            <section className="cookies">
                <h2>Cookie Policy</h2>
                <p>
                    Our website uses cookies to enhance your browsing experience and analyze traffic. Cookies are small text files
                    stored on your device that help us:
                </p>
                <ul>
                    <li>Remember your preferences and settings.</li>
                    <li>Understand how you use our website to improve its functionality.</li>
                    <li>Provide personalized content and offers.</li>
                </ul>

                <h3>Types of Cookies We Use</h3>
                <ul>
                    <li><strong>Essential Cookies:</strong> Necessary for the website to function properly (e.g., to process bookings).</li>
                    <li><strong>Performance Cookies:</strong> Help us analyze website usage and improve user experience.</li>
                    <li><strong>Marketing Cookies:</strong> Allow us to show you tailored ads based on your interests.</li>
                </ul>

                <p>
                    By using our website, you consent to the use of cookies as described in this policy. You can disable cookies
                    in your browser settings, but some features of the site may not work properly.
                </p>
            </section>

            <section className="user-rights">
                <h2>Your Rights</h2>
                <p>As a user, you have the right to:</p>
                <ul>
                    <li>Access the personal data we hold about you.</li>
                    <li>Request correction or deletion of your personal data.</li>
                    <li>Withdraw your consent to data processing at any time.</li>
                    <li>File a complaint with your local data protection authority.</li>
                </ul>
                <p>
                    To exercise your rights or for more information, please contact us at: <strong>privacy@[hostelname].com</strong>.
                </p>
            </section>

            <section className="updates">
                <h2>Updates to This Policy</h2>
                <p>
                    We may update this Privacy Policy and Cookie Policy from time to time. Any changes will be posted on this page
                    with an updated effective date.
                </p>
            </section>

            <section className="contact">
                <h2>Contact Us</h2>
                <p>
                    If you have any questions about our Privacy Policy or Cookie Policy, feel free to reach out to us:
                </p>
                <p>
                    <strong>Casa Flamingo</strong> <br />
                    Rua Example, 123 <br />
                    3080-222 Figueira-da-Foz, Portugal <br />
                    📧 privacy@[hostelname].com
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
