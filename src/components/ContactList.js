import React from "react";
import ContactCard from "./ContactCard";

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
        <div className="ui celled list">
            {renderContactList}
        </div>
    );
}
export default ContactList;