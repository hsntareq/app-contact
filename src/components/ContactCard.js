import React from "react";
import uuid from 'react-uuid';

const ContactCard = (props) => {
    const { id, name, email } = props.contact;
    return (
        <div className="item" key={uuid()}>
            <i className="user outline icon" style={{ fontSize: '20px' }}></i>
            <div className="content">
                <div className="header">{name}</div>
                <div>{email}</div>
            </div>
            <i className="trash alternate outline icon" style={{ color: 'red', marginTop: '10px' }} onClick={() => { props.clickHandller(id)}}></i>
        </div>
    );
}
export default ContactCard;