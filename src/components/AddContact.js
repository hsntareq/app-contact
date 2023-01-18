import React from "react";
import { useNavigate } from "react-router-dom";

class AddContact extends React.Component {
    state = { name: '', email: '' };

    add = (e) => {
        e.preventDefault();
        if (this.state.name === '' || this.state.email === '') {
            alert('all fields should have data.');
            return;
        }
        this.props.addContactHandller(this.state);
        this.setState({ name: '', email: '' });
        this.props.navigate('/');
    }

    render() {
        return (
            <div className="ui main">
                <h2>Add Contact</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name" onChange={(e) => { this.setState({ name: e.target.value }) }} />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Email" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                    </div>
                    <button type="submit" className="ui button blue">Add</button>
                </form>

            </div>
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <AddContact {...props} navigate={navigate} />
}

export default WithNavigate;