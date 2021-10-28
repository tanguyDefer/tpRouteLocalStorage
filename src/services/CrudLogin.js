import axios from 'axios';

import {Config} from '../config/config';

export default class CrudLogin {

    selectOne(login, cb) {
        axios.get(`${Config.login}/${login.id}`).then(
            (response) => cb(response.data)
        ).catch(error => console.log(error))
    }

    findById(id) {
        axios.get(`${Config.login}/${id}`).then(
            (response) => {
                console.log(response)
                id(response.data)
            }
        ).catch(error => console.log(error))
    }

    selectAll(cb) {
        axios.get(`${Config.login}`).then(
            (response) => {
                console.log(response)
                cb(response.data)
            }
    ).catch(error => console.log(error))
    }

    add(login) {
        return axios.post(`${Config.login}`, login)
    }

    /*
       * Dans le PUT (REST) on met de façon protocolaire derrière l'url / l'id de l'entit"
       * à modifier avec en complement l'entité login
       * return d'une Promise : axios.delete(`${Config.login}/${login.id}`, login)
       * le return si je n'appelle pas la methode then lors du retour de la methode update(login)
       * RIEN NE SE FAIT
       */
    update(login) {
        return axios.put(`${Config.login}/${login.id}`, login)
    }

    /*
    * Dans le delete (REST) on met de façon protocolaire derrière l'url / l'id de l'entit"
    * à supprimer
    * return d'une Promise : axios.delete(`${Config.login}/${login.id}`)
    * le return si je n'appelle pas la methode then lors du retour de la methode delete(login)
    * RIEN NE SE FAIT
    */
    delete(login) {
        return axios.delete(`${Config.login}/${login.id}`)


    }

}