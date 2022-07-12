import React, {Component} from 'react'
import {history} from "../history";
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {loginFilter} from '../redux/sampleReducer';

class Login extends Component {

    state = {
        email: '',
        password: '',
        pathName: '',
        buttonState: true,
        errorType: '',
    }

    componentDidMount() {
        console.log(this.props)
    }

    userInputHandler = async (e) => {
        let name = e.target.name;
        let value = e.target.value;
        await this.setState({[name]: value});
        if (this.state.email.trim() !== '' && this.state.password.trim() !== '') {
            await this.setState({buttonState: false})
            return;
        }
    }
    userData = async () => {
        await this.props.dispatch(loginFilter({data: this.state}))
        console.log(this.props.userReducer,"userReducer")

        if (this.props.userReducer.sampleReducer.isValidUser) {
            console.log(this.props.userReducer.sampleReducer.login[0].data.name)
            let userDetails = this.props.userReducer.sampleReducer.login[0].data.name
            localStorage.setItem("LoginDetails", userDetails);
            this.forceUpdate()
            this.props.reload()
            this.setState({pathName: '/home'})
        }else{
            console.log("invalid details")
            console.log(this.props.userReducer.sampleReducer)
            // if(this.props.userReducer.sampleReducer.login === null){
            //     alert("User not found")
            //     return;
            // }
            if(this.props.userReducer.sampleReducer.invalidEmail){
                this.setState({errorType: "INVALID_EMAIL"})
                alert("invalid email")
                return
            }else{
                this.setState({errorType: "INVALID_PASSWORD"})
                alert("invalid password")
                return
            }

        }
    }

    render() {
        return (
            <div className="container" style={{padding:"8rem"}}>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6"><form>
                        <h3>Login</h3>
                        <div className="mb-3">
                            <label style={{textAlign:"left",width: "100%"}}>Email address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.userInputHandler}
                            />
                        </div>
                        <div className="mb-3">
                            <label style={{textAlign:"left",width: "100%"}}>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={this.state.password}
                                onChange={this.userInputHandler}
                            />
                        </div>
                        <div className="d-grid">
                            <Link to={this.state.pathName}>
                                <button style={{width: "50%"}} disabled={this.state.buttonState} type="button" className="btn btn-primary" onClick={() => this.userData()}>
                                    Login
                                </button>
                            </Link>
                        </div>
                    </form></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    login: state.login,
    userReducer : state
})

export default connect(mapStateToProps) (Login)