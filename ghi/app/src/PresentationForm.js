import React, { useEffect, useState } from 'react';

function PresentationForm() {

    const [name, setName] = useState('');
    const [conference, setConference] = useState('');
    const [email, setEmail] = useState('');
    const [CompanyName, setCompanyName] = useState('')
    const [title, setTitle] = useState('')
    const [synopsis, setSynopsis] = useState('')



    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handConferenceChange = (event) => {
        const value = event.target.value;
        setConference(value);
    }
    const handleEmailchange = (event) => {
        const value = event.target.value;
        setEmail(value);
    }
    const handleCompanyNameChange = (event) => {
        const value = event.target.value;
        setCompanyName(value);
    }
    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    }
    const handleSynopsisChange = (event) => {
        const value = event.target.value;
        setSynopsis(value);
    }


    const [conferences, setConferences] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setConferences(data.conferences)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();




        const data = {};

        data.presenter_name = name;
        data.presenter_email = email;
        data.company_name = CompanyName;
        data.title = title;
        data.synopsis = synopsis;
        data.conference = conference;

        console.log(data);

        const PresentationUrl = `http://localhost:8000/api/conferences/${conference}/presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },

        }
        const response = await fetch(PresentationUrl, fetchConfig);


        if (response.ok) {
            const newPresentation = await response.json();
            console.log(newPresentation);

            setName('');
            setConference('');
            setEmail('');
            setCompanyName('');
            setTitle('');
            setSynopsis('');




        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new presentation</h1>
                        <form onSubmit={handleSubmit} id="create-presentation-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleNameChange} value={name} placeholder="presenter name" required type="text" name="presenter_name"
                                    id="presenter_name" className="form-control" />
                                <label htmlFor="name">Presenter name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleEmailchange} value={email} placeholder="presenter email" required type="text" name="presenter_email"
                                    id="presenter_email" className="form-control" />
                                <label htmlFor="name">Presenter email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleCompanyNameChange} value={CompanyName} placeholder="company name" required type="text" name="company_name" id="company_name"
                                    className="form-control" />
                                <label htmlFor="starts">Company name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleTitleChange} value={title} placeholder="title" required type="text" name="title" id="title"
                                    className="form-control" />
                                <label htmlFor="ends">Title</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="synopsis" className="form-label">Synopsis</label>
                                <textarea onChange={handleSynopsisChange} value={synopsis} required className="form-control" name="synopsis" id="synopsis" rows="3"></textarea>
                            </div>
                            <div className="mb-3">
                                <select onChange={handConferenceChange} value={conference} required id="conference" name="conference" className="form-select">
                                    <option value="">Choose a conference</option>
                                    {conferences.map(conference => {
                                        return (
                                            <option key={conference.href} value={conference.id}>
                                                {conference.name}
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
    );
}

export default PresentationForm
