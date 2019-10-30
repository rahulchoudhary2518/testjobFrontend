import React from 'react';
import AddEmailFields from './addEmailField';
import MultipleEmail from './multipleEmail';
import axios from 'axios';
let url = 'http://localhost:4001';

class Home extends React.Component {
    state = {
        emailList: [{ email: "" }, { email: "" }, { email: "" }],
        multipleEmail: [],
        value: "",
        page: 0,
        error: null,
        errors: {}
    }
    handleEmailChange = idx => evt => {
        const newemailList = this.state.emailList.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, email: evt.target.value };
        });
        this.setState({ emailList: newemailList });
    };
    handleKeyDown = evt => {
        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();
            var value = this.state.value.trim();
            if (value && this.isEmail(value)) {
                this.setState({
                    multipleEmail: [{ email: this.state.value }, ...this.state.multipleEmail],
                    value: ""
                });
            } else {
                this.setState({
                    error: true,
                })
            }
        }
    };
    handleSubmit = evt => {
        evt.preventDefault();
        const { emailList } = this.state;
        let errors = {}
        var emailValid = this.state.emailList.map((shareholder, sidx) => {
            if(!this.isEmail(shareholder.email)) {
                errors = {
                    ...errors,
                    [sidx]: true
                }
            }
            return shareholder
        })
        this.setState({ emailList: emailValid, errors });
        if (Object.keys(errors).length === 0) {
            console.log(emailValid, "emailValid")
            axios.post(url+'/users/usersemail', {
                email: emailValid,
            })
                .then(res => console.log(res.data, "res"));
        }
    };
    handleSubmitMultiple = (e) => {
        e.preventDefault();
        const {error,multipleEmail} = this.state
        if (!error) {
            axios.post(url+'/users/usersemail', {
                email: multipleEmail,
            })
                .then(res => console.log(res.data, "res"));
        }
    }
    handleAddEmailField = () => {
        if (this.state.emailList.length <= 5) {
            this.setState({
                emailList: this.state.emailList.concat([{ email: "", error: null }])
            });
        }else{}
    };

    handleRemove = idx => () => {
        this.setState({
            emailList: this.state.emailList.filter((s, sidx) => idx !== sidx),
            multipleEmail: this.state.multipleEmail.filter((s, sidx) => idx !== sidx)
        });
    };
    isEmail(email) {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }
    nextPage = () => {
        this.setState({ page: this.state.page + 1 })
    }
    previousPage = () => {
        this.setState({ page: this.state.page - 1 })
    }
    handleChange = evt => {
        this.setState({
            value: evt.target.value,
            error: null
        });
    };
    render() {
        const { emailList, page, multipleEmail, errors } = this.state
        console.log(emailList, "multipleEmail")
        return (
            <>
                {page === 0 && <AddEmailFields errors={errors} emailList={emailList} handleEmailChange={this.handleEmailChange} handleSubmit={this.handleSubmit} handleAddEmailField={this.handleAddEmailField} handleRemove={this.handleRemove} nextPage={this.nextPage} />}
                {page === 1 && <MultipleEmail {...this.state} handleSubmitMultiple={this.handleSubmitMultiple} handleKeyDown={this.handleKeyDown} handleChange={this.handleChange} multipleEmail={multipleEmail} handleRemove={this.handleRemove} previousPage={this.previousPage} />}
            </>
        )
    }
}
export default Home;