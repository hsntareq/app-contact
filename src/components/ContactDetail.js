import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import api from "../api/contacts";
import ProfileImage from "../images/profile.jpg";

const ContactDetail = (props) => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);

    const retriveContactsApi = async () => {
        const response = await api.get('/contacts');
        return response.data;
    }

    useEffect(() => {
        (async function () {
            const allContacts = await retriveContactsApi();
            let contentDetail = allContacts.filter((item) => item.id === id);
            setContact(contentDetail[0] && contentDetail[0]);
        })();
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