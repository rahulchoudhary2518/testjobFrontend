import React from 'react';
function MultipleEmail(props) {
    console.log(props, "props")
    return (
        <form onSubmit={props.handleSubmitMultiple}>
            <div className="centerAlign">
                <h4>Email address</h4>
                <label htmlFor="selectList" className="multipleMail">
                    {props.multipleEmail && props.multipleEmail.map((item, idx) => (
                        <div className="tag-item" key={idx}>
                            {item.email}
                            <button
                                type="button"
                                className="button"
                                onClick={props.handleRemove(idx)}
                            >
                                &times;
                        </button>
                        </div>
                    ))}
                    <input
                        value={props.value}
                        onKeyDown={props.handleKeyDown}
                        onChange={props.handleChange}
                        id="selectList"
                    />
                </label>
                {props.error && <p className="error">Invalid email address</p>}
                <div className="btnAddchange">
                    <button
                        type="button"
                        onClick={props.previousPage}
                        className="small"
                    >
                        back
                    </button>
                </div>
                <button type="submit">Send Invites</button>
            </div>
        </form>
    )
}
export default MultipleEmail;