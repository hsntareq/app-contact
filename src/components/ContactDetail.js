import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import ProfileImage from "../images/profile.jpg";

const ContactDetail = (props) => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        let contentDetail = JSON.parse(localStorage.getItem('contacts')).filter((item) => item.id === id);
        setContact(contentDetail[0] && contentDetail[0]);
    }, [id]);

    return (
        <div className="main">
            {contact &&
                <>

                    <div className="ui card centered">
                        <Link to='/'>
                            <button className="fluid ui button blue">Back</button>
                        </Link>
                        <div className="image">
                            <img src={ProfileImage} alt="ProfileImage" />
                        </div>
                        <div className="content">
                            <div className="header">{contact.name}</div>
                            <div className="description">{contact.email}</div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
export default ContactDetail;