import React from "react";
import { Link } from "react-router-dom";
// import ProfileImage from "../images/profile.jpg";


const ContactCard = (props) => {
    const { id, name, email } = props.contact;
    return (
        <div className="item">
            <i className="user circle big middle aligned icon"></i>
            {/* <img className="user circle big middle aligned icon" style={{ width: '50px' }} src={ProfileImage} alt="ProfileImage" /> */}
            <div className="content">
                <Link to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}>
                    <h3 className="header">{name}</h3>
                    <small>{email}</small>
                </Link>
            </div>
            <div className="ui tiny image">
                <div className="ui icon buttons">
                    <button className="ui button basic" onClick={() => { props.clickHandller(id) }}><i className="trash icon red"></i></button>
                    <Link className="ui button basic" to={{ pathname: `/edit/${id}`, state: { contact: props.contact } }}><i className="edit icon blue"></i></Link>
                </div>
            </div>
        </div>
    );
}
export default ContactCard;