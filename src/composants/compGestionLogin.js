import React, {Component} from "react";
import CrudLogin from "../services/CrudLogin";
import Login from "../classes/login";

class CompGestionLogin extends Component {
    state = {
        liste: [],
        userName: undefined,
        userPassword: undefined,
        isAnonymous: undefined
    }

    constructor(props) {
        super(props)
        this.service = new CrudLogin()
        this.userName = React.createRef()
        this.userPassword = React.createRef()
        this.isAnonymous = React.createRef()
    }

    componentDidMount() {
        this.listeAll()
        //le state est mis à jour 1 fois au niveau de la liste
        //on peut faire un bouton pour rafraichir la liste en appelant
        //listeAll()
    }

    listeAll = () => {
        this.service.selectAll(
            (data) => this.setState({liste: data}))
    }

    delete = (event) => {
        let user = new Login();
        user.id = event.target.id
        this.service.delete(user).then(
            () => this.listeAll()
        ).catch(error => console.error(error))
    }

    addUser = () => {
        let user = new Login();
        user.userName = this.userName.current.value
        user.userMDP = this.userPassword.current.value
        user.isAnonymous = this.isAnonymous.current.value
        this.service.add(user).then(
            () => this.listeAll()
        ).catch(error => console.error(error))
    }

    render() {
        /*Attention this.listeAll() declenche setState qui declenche la methode render()
        ce qui va créer une boucle infini d'affichage
        * this.listeAll()
        */
        return (
            <div>
                <ul>
                    {this.state.liste.map(item =>
                        <li key={item.id}>
                            {item.userName}
                            {item.userMDP}
                            {item.isAnonymous}
                            <button value={item.id} key={item.id} id={item.id} onClick={this.delete}>supprimer</button>
                        </li>)}
                </ul>
                <button onClick={this.listeAll}>Refresh</button>
                <hr/>
                <h3>Add user</h3>
                <div className="form">
                    <label>nom</label>
                    <input type="text" ref={this.userName} required/>
                    <label>mot de passe</label>
                    <input type="password" ref={this.userPassword}/>
                    <label>est valide</label>
                    <input type="text" ref={this.isAnonymous}/>
                    <button onClick={this.addUser}>Ajouter</button>
                </div>
                <hr/>
            </div>
        );
    }
}

export default CompGestionLogin;