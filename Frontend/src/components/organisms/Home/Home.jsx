import React, { useEffect, useState } from "react";
import "./home.css";
import getInsights from "../../../utils/getInsights";
import { PacmanLoader } from "react-spinners";
import Response from "../Response/Response";

function Home() {
    const [useLink, setUseLink] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState(null);


    function handleSubmit(e) {
        e.preventDefault();
        console.log('function running')
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data)
        if (!data.agentId) return setMessage("Agent Id is required");
        if (!data.customerId) return setMessage("Customer Id is required");
        if (!data.audioLink && !data.file) return setMessage("Audio Link or File is required");
        setMessage("");
        const agentId = data.agentId;
        const customerId = data.customerId;
        const audioLink = data.audioLink;
        const file = data.file;
        e.target.reset();
        setOpenDialog(true)
        getInsights(agentId, customerId, audioLink, file)
        .then(data=>{
            if (!data.success){
                setOpenDialog(false)
                return setMessage(`${data.message}!`)
            }
            setResponse(JSON.stringify(data.data))
        })
        .catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        const holder = document.querySelector('.dialog-box')
        if (!holder) return ;
        if (!response){
            holder.style.height = '100vh'
        }else{
            holder.style.height = 'auto'
        }
    },[openDialog,response])

    return (
        <>
            {openDialog && (
                <section className="dialog-box">
                    <div className="dialog">
                        {response ? (<Response response={response} setOpenDialog={setOpenDialog}/>) : (<PacmanLoader color='#E3E3E3'/>)}
                    </div>
                </section>
            )}

            <section className="home-div">
                <h2>Call Insights Generator</h2>
                {message && <label className="message">{message}</label>}
                <form className="input-form" onSubmit={handleSubmit} >
                    <div className="input-grp">
                        <label htmlFor="agentId">Agent Id</label>
                        <input
                            type="text"
                            name="agentId"
                            placeholder="Agent Id"
                            className="text-input"
                        />
                    </div>
                    <div className="input-grp">
                        <label htmlFor="customerId">Customer Id</label>
                        <input
                            type="text"
                            name="customerId"
                            placeholder="Customer Id"
                            className="text-input"
                        />
                    </div>
                    <div className="input-grp">
                        <div className="toggle-grp">
                            <label htmlFor="agentId">Audio File </label>
                            <div className="use-link-div">
                                <label htmlFor="">Use link</label>
                                <input
                                    type="checkbox"
                                    onChange={(e) => setUseLink(e.target.checked)}
                                />
                            </div>
                        </div>
                        {useLink ? (
                            <input
                                type="text"
                                name="audioLink"
                                placeholder="Public audio link"
                                className="text-input"
                            />
                        ) : (
                            <input type="file" name="file" className="file-input" accept="audio/*" />
                        )}
                    </div>
                    <div className="input-grp">
                        <button className="submit-btn">Get Audio Insights</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Home;
