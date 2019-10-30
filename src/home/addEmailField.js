import React from 'react';
function AddEmailFields(props) {
    return (
        <>
            <form className="centerAlign" onSubmit={props.handleSubmit}>
                <h4>Email address</h4>
                {props.emailList.map((email, idx) => (
                    <div key={idx}>
                        <input
                            className="inputField"
                            type="email"
                            value={email.email}
                            onChange={props.handleEmailChange(idx)}
                        />
                        <button
                            type="button"
                            onClick={props.handleRemove(idx)}
                            className="small"
                        >
                            x
                        </button>
                        {props.errors[idx] && <p className="error">Invalid email address</p>}
                    </div>
                ))}
                <div className="btnAddchange">
                    <button
                        type="button"
                        onClick={props.handleAddEmailField}
                        className="small"
                    >
                        Add another
                    </button>
                    or
                    <button
                        type="button"
                        onClick={props.nextPage}
                        className="small"
                    >
                        Add many at once
                    </button>
                </div>
                <button type="submit">Send Invites</button>
            </form>
        </>
    )
}

export default AddEmailFields;