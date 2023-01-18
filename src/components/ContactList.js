import React from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
    const deleteContactHandller = (id) => {
        props.getContactId(id);
    }

    const renderContactList = props.contacts.map(contact => {
        return (
            <ContactCard contact={contact} clickHandller={deleteContactHandller} key={contact.id}></ContactCard>
        );
    })
    return (
        <div className="main">

            <div className="ui grid">
                <div className="left floated six wide column">
                    <h2>Contact List</h2>
                </div>

                <div className="right floated six right aligned" style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to='/add'>
                        <button className="ui button blue">Add Contact</button>
                    </Link>
                </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui relaxed divided celled list big">
                {renderContactList}
            </div>

        </div>
    );
}
export default ContactList;