import React, {useState} from 'react';
import './App.css';
import {messages} from "./messages";
import {slack} from "./slack";

function App() {

    const [form, setForm] = useState({})

    function submitForm(event) {
        const formValues= JSON.stringify(form)
        event.preventDefault();
        fetch(slack, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ text: formValues}),
        })
            .then(() => {
                alert("Thanks for your Message!");
            })
            .then(() => setForm({}))
            .catch((err) => console.log('err', err))
    }

  return (
    <div>
        <h1>THANK YOU, TECH HUB SOUTH FLORIDA!</h1>
        <div className="container">
            <form onSubmit={submitForm} className="form-container">
                <label>Name&nbsp;&nbsp;</label>
                <input type="text" name="name" className="field" value={form?.name} onChange={(e) => setForm({...form, name: e.target.value})}/>
                <br/><br/>
                <label>Company&nbsp;&nbsp;</label>
                <input type="text" name="company" className="field" value={form?.company} onChange={(e) => setForm({...form, company: e.target.value})}/>
                <br/><br/>
                <label>Message&nbsp;&nbsp;</label>
                <textarea name="note" value={form?.note} onChange={(e) => setForm({...form, note: e.target.value})}/>
                <br/><br/>
                <button type="submit">Submit</button>
            </form>
        </div>
        <div className="container">
        {
            messages.map((message) => {
                return (
                    <div className="card">
                        <div className="quote">"{message.note}"</div>
                        <div className="name">{message.name}</div>
                        <div className="companyName">{message.company}</div>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default App;
