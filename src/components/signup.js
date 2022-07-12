import React, {Component} from 'react'
import {connect} from "react-redux";
import {handleFilter} from '../redux/sampleReducer';
import {Link} from "react-router-dom";

class SignUp extends Component {

    state = {
        name: '',
        mobileNumber: '',
        email: '',
        password: '',
        errorType: '',
        pathName: '',
    }

    handleUserInput = async (e) => {
        let name = e.target.name;
        let value = e.target.value;
        await this.setState({[name]: value});
    }

    testPassword = (pw) => {
        // let len = pw.length;
        // if (pw.replace(/[a-z]/, '').length > len - 2) return false;
        // if (pw.replace(/[A-Z]/, '').length > len - 2) return false;
        // if (pw.replace(/[0-9]/, '').length > len - 2) return false;
        // return true;
        let passw=  /^^(?=.{6,})(?=.*?\d)(?=.*[\s!\"#$\%&'\(\)\*\+\,\-\.\/\:;<=>?@\[\\\]\^\_\`\{\|\}\~])(?=[a-zA-Z0-6].*?[a-zA-Z0-6].*?[a-zA-Z0-6].*?).*$/;
        if(pw.match(passw))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    validateField = async () => {

        let passwordCheck = this.testPassword(this.state.password)

        if (this.state.name.trim() === '') {
            this.setState({errorType: "NULL_NAME"})
            return;
        } else if (this.state.mobileNumber.trim() === '') {
            this.setState({errorType: "NULL_MOBILE"})
            return;

        } else if (this.state.mobileNumber.length < 10) {
            this.setState({errorType: "LESS_NUMBERS"})
            return;
        }
            // } else if (!(/^(?:7|0|(?:\+94))[0-9]{9,10}$/.test(this.state.mobileNumber))) {
            //
            //     this.setState({errorType: "INVALID_NUMBER"})
            //     return;
        // }

        else if (this.state.email.trim() === '') {
            this.setState({errorType: "NULL_EMAIL"})
            return;

        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))) {
            this.setState({errorType: "INVALID_EMAIL"})
            return;
        } else if (this.state.password.trim() === '') {
            this.setState({errorType: "NULL_PASSWORD"})

        } else if (!passwordCheck) {
            this.setState({errorType: "INVALID_TYPE"})
            return;
        }




         else {
            await this.props.dispatch(handleFilter({data: this.state}))
            console.log(this.props.userReducer.sampleReducer.existingEmail)
            if(this.props.userReducer.sampleReducer.existingEmail === true) {
                console.log(this.props.userReducer.sampleReducer.existingEmail, "sampleReducer")
                this.setState({errorType: "EXISTING_EMAIL"})
                alert("email already exists")
                return;
            }
            this.setState({errorType: '',name: '',
                mobileNumber: '',
                email: '',
                password: '',})
            alert("User successfully added")
        }
    }

    render() {
        return (
            <div className="container" style={{padding:"8rem"}}>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form>
                            <h3>Sign Up</h3>
                            <div className="mb-3">
                                <label style={{textAlign:"left",width: "100%"}}>First Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="First name"
                                    value={this.state.name}
                                    onChange={this.handleUserInput}
                                />
                                {
                                    this.state.errorType === "NULL_NAME" ? <small style={{color:"red"}}>Name can not be null</small> :
                                        null
                                }
                            </div>
                            <div className="mb-3">
                                <label style={{textAlign:"left",width: "100%"}}>Mobile Number</label>
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    className="form-control"
                                    placeholder="Mobile Number"
                                    value={this.state.mobileNumber}
                                    onChange={this.handleUserInput}
                                />
                                {
                                    this.state.errorType === "NULL_MOBILE" ? <small style={{color:"red"}}>number can not be null</small> :
                                        this.state.errorType === "LESS_NUMBERS" ? <small style={{color:"red"}}>number must have at 10 characters</small> :
                                            this.state.errorType === "INVALID_NUMBER" ? <small style={{color:"red"}}>invalid number</small> :
                                                null
                                }
                            </div>
                            <div className="mb-3">
                                <label style={{textAlign:"left",width: "100%"}}>Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.handleUserInput}
                                />
                                {
                                    this.state.errorType === "NULL_EMAIL" ? <small style={{color:"red"}}>email can not be null</small> :
                                        this.state.errorType === "INVALID_EMAIL" ? <small style={{color:"red"}}>Invalid email</small> :
                                            null
                                }
                            </div>
                            <div className="mb-3">
                                <label style={{textAlign:"left",width: "100%"}}>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.handleUserInput}
                                />
                                {
                                    this.state.errorType === "NULL_PASSWORD" ? <small style={{color:"red"}}>password can not be null</small> :
                                        this.state.errorType === "LESS_CHARS" ? <small style={{color:"red"}}>Password must have at least 6 characters</small> :
                                            this.state.errorType === "INVALID_TYPE" ? <small style={{color:"red"}}>7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter.</small> :
                                                null
                                }
                            </div>
                            <div className="d-grid">
                                <button type="button" className="btn btn-primary" onClick={() => this.validateField()}>
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    signup: state.signup,
    userReducer: state
})

export default connect(mapStateToProps) (SignUp)