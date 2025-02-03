import React from 'react';
import styles from './Aboutus.module.css';

const Aboutus: React.FC = () => {
    return (
        <div className={styles.aboutPage}>
            <h1>About Us</h1>
            <section className="about-intro">
                <p>
                    Welcome to <strong>Casa Flamingo</strong>, your home away from home in the beautiful coastal town of Figueira-da-Foz, Portugal.
                    Nestled between golden beaches and vibrant city life, our hostel offers a perfect blend of comfort, adventure, and affordability.
                </p>
            </section>

            <section className="our-mission">
                <h2>Our Mission</h2>
                <p>
                    At <strong>Casa Flamingo</strong>, our mission is to provide a warm and welcoming space for travelers from all over the world.
                    We believe in creating meaningful connections, fostering community, and ensuring your stay is as comfortable as possible.
                </p>
            </section>

            <section className="why-choose-us">
                <h2>Why Choose Us?</h2>
                <ul>
                    <li>🏖️ Prime location just steps away from Figueira-da-Foz’s stunning beaches.</li>
                    <li>🛏️ Cozy and modern accommodations tailored to all traveler needs.</li>
                    <li>🍳 Complimentary breakfast to start your day right.</li>
                    <li>🌍 A vibrant, multicultural atmosphere where friendships are born.</li>
                    <li>🎶 Regular events and activities to make your stay unforgettable.</li>
                </ul>
            </section>

            <section className="our-story">
                <h2>Our Story</h2>
                <p>
                    Founded in [Year], <strong>Casa Flamingo</strong> started as a dream to create a haven for travelers exploring Portugal's beautiful coast.
                    Over the years, we’ve hosted thousands of guests, shared countless stories, and built a reputation as one of the friendliest hostels in Figueira-da-Foz.
                </p>
            </section>

            <section className="meet-the-team">
                <h2>Meet the Team</h2>
                <p>
                    Our team is made up of passionate locals and seasoned travelers who understand the art of hospitality. From the moment you arrive, we’re here to make your stay seamless and enjoyable.
                </p>
            </section>

            <section className="explore">
                <h2>Explore Figueira-da-Foz</h2>
                <p>
                    Whether you're here for the sun, the surf, or the vibrant nightlife, Figueira-da-Foz has something for everyone. Don’t miss the scenic views at Cabo Mondego or the charming streets of this coastal gem.
                </p>
            </section>

            <section className={styles.cta}>
                <p>We can’t wait to welcome you to <strong>Casa Flamingo</strong>. Book your stay with us today and start your unforgettable journey in Portugal!</p>
            </section>
        </div>
    );
};

export default Aboutus;

