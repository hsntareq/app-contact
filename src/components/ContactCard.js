import React from "react";
import uuid from 'react-uuid';
import { Link } from "react-router-dom";
// import ProfileImage from "../images/profile.jpg";


const ContactCard = (props) => {
    const { id, name, email } = props.contact;
    return (
        <div className="item" key={uuid()}>
            <i className="user circle big middle aligned icon"></i>
            {/* <img className="user circle big middle aligned icon" style={{ width: '50px' }} src={ProfileImage} alt="ProfileImage" /> */}
            <div className="content">
                <Link to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}>
                    <h3 className="header">{name}</h3>
                    <small>{email}</small>
                </Link>
            </div>
            <i className="trash middle icon middle aligned" style={{ color: 'red' }} onClick={() => { props.clickHandller(id) }}></i>
        </div>
    );
}
export default ContactCard;