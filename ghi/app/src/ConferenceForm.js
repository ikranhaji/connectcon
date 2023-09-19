import React, { useEffect, useState } from 'react';

function ConferenceForm() {
    const [name, setName] = useState('');
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState('');
    const [starts, setStarts] = useState('')
    const [ends, setEnds] = useState('')
    const [description, setDescription] = useState('')
    const [MaxP, setMaxP] = useState('');
    const [MaxA, setMaxA] = useState('');


    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }
    const handleStartschange = (event) => {
        const value = event.target.value;
        setStarts(value);
    }
    const handleEndsChange = (event) => {
        const value = event.target.value;
        setEnds(value);
    }
    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    }
    const handleMaxPChange = (event) => {
        const value = event.target.value;
        setMaxP(value);
    }
    const handleMaxAChange = (event) => {
        const value = event.target.value;
        setMaxA(value);
    }



    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setLocations(data.locations)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.location = location;
        data.name = name;
        data.description = description;
        data.max_presentations = MaxP;
        data.max_attendees = MaxA;
        data.starts = starts;
        data.ends = ends;
        console.log(data);

        const ConferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(ConferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            setName('');
            setLocation('');
            setStarts('');
            setEnds('');
            setDescription('');
            setMaxP('');
            setMaxA('');

        }
    }

    return (
        <div className="my-5 container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new conference</h1>
                        <form onSubmit={handleSubmit} id="create-conference-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name"
                                    className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleStartschange} value={starts} placeholder="" required type="date" name="starts" id="starts" className="form-control" />
                                <label htmlFor="starts">Starts</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleEndsChange} value={ends} placeholder="" required type="date" name="ends" id="ends" className="form-control" />
                                <label htmlFor="ends">Ends</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea onChange={handleDescriptionChange} value={description} className="form-control" name="description" id="description" rows="3"></textarea>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleMaxPChange} value={MaxP} placeholder="Maximum presentations" required type="number"
                                    name="max_presentations" id="max_presentations" className="form-control" />
                                <label htmlFor="maximum-presentation">Maximum presentation</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleMaxAChange} value={MaxA} placeholder="Maximum attendees" required type="number" name="max_attendees"
                                    id="max_attendees" className="form-control" />
                                <label htmlFor="Maximumattendees">Maximum attendees</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={handLocationChange} value={location} required id="location" name="location" className="form-select">
                                    <option value="">Choose a location</option>
                                    {locations.map(location => {
                                        return (
                                            <option key={location.id} value={location.id}>
                                                {location.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ConferenceForm
