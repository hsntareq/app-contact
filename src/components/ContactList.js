import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
    const inputEl = useRef('');
    const deleteContactHandller = (id) => {
        props.getContactId(id);
    }

    const renderContactList = props.contacts.map(contact => {
        return (
            <ContactCard contact={contact} clickHandller={deleteContactHandller} key={contact.id}></ContactCard>
        );
    })
    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    }

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
            <div className="ui search">
                <div className="ui fluid big icon input">
                    <input ref={inputEl} type="text" placeholder="Search a very wide input.." value={props.term} onChange={getSearchTerm} />
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui relaxed divided celled list big">
                {renderContactList.length > 0 ? renderContactList : 'No contacts available'}
            </div>

        </div>
    );
}
export default ContactList;