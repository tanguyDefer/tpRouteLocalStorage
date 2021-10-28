import React, {Component} from "react";
import CrudLogin from "../services/CrudLogin";
import {Config} from "../config/config";
import Login from "../classes/login";

class CompGetUSer extends Component {

    state = {
        searchById : undefined
    }
    constructor(props) {
        super(props)
        this.service = new CrudLogin()
        this.userIdInput = React.createRef();
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        let user = new Login();
        user.id =this.userIdInput.current.value
        this.service.selectOne(user,
            (data) => this.setState({searchById: data}),
            (error)=>{
            this.setState({searchById: undefined})
                console.error(error)
            })
    }

    refresh = () => {
    };

    render() {
        return (
            <div>
                <label>user id :<input type='number' ref={this.userIdInput} /></label>
                <button onClick={this.getUser}>Get info</button>
                {this.state.searchById &&
                <h4>{this.state.searchById.userName}</h4>
                }
            </div>
        );
    }
}

export default CompGetUSer;