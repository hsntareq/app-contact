import React, { useState, useEffect } from "react";
import api from "../api/contacts";

import { useNavigate, useParams } from 'react-router-dom';

const EditContactFunctional = (props) => {

    let navigate = useNavigate();
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

    if (contact)
        return <EditContact {...props} navigate={navigate} contact={contact} />
}

export default EditContactFunctional;

class EditContact extends React.Component {


    constructor(props) {
        super(props);
        const { id, name, email } = props.contact;
        this.state = { id, name, email };
    }

    update = (e) => {
        e.preventDefault();
        if (this.state.name === '' || this.state.email === '') {
            alert('all fields should have data.');
            return;
        }

        this.props.updateContactHandller(this.state);
        this.setState({ name: '', email: '' });
        this.props.navigate('/');
    }

    render() {
        return (
            <div className="ui main">
                <h2>Edit Contact</h2>
                <form className="ui form" onSubmit={this.update}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name"
                            value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                    </div>
                    <button type="submit" className="ui button blue">Update</button>
                </form>

            </div>
        );
    }
}
