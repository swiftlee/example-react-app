import React, {useState} from 'react';
import axios from 'axios';
// This is the component which displays all of the created profile cards
const CardList = (props) => {
    return (
        <div>
            {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
        </div>
    );
};

// This is the component that acts as a template and returns a profile card given certain props
const Card = (props) => {
    return (
        <div className="github-profile">
            <img src={props.avatar_url}/>
            <div className="info">
                <div className="name">{props.name}</div>
                <div className="company">{props.company}</div>
            </div>
        </div>
    );
};

// This returns the search bar, takes the input and sets the username state to it, then gets the requested username from github using axios.get
const Form = (props) => {
    const [username, setUsername] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.get(`https://api.github.com/users/${username}`);
        if (res.status === 200) {
            console.log(res);
            props.onSubmit(res.data);
        } else {
            props.onSubmit({data: "Invalid user, try again"});
        }
        setUsername('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                   placeholder="Github Username..."
                   value={username}
                   onChange={event => setUsername(event.target.value)}
                   required/>
            <button>Add Card</button>
        </form>
    );
};

// This creates a profile array state and sets it in addNewProfile, then this returns the prop title, Form component, and CardList component
const App = () => {
    const [profiles, setProfiles] = useState([]);

    const addNewProfile = (profileData) => {
        setProfiles([...profiles, profileData])
    };

    return (
        <div>
            <div className="header">This is a title.</div>
            <Form onSubmit={addNewProfile}/>
            <CardList profiles={profiles}/>
        </div>
    );
};

export default App;
