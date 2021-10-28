import React from "react";
import {Route, NavLink, Switch} from "react-router-dom";
import Home from '../composants/Home';
import CompLogin from '../composants/compLogin';
import CompGestionLogin from '../composants/compGestionLogin'
import gestionlocalstorage from "../services/gestionslocalstorage";
import CompGetUser from '../composants/compGetUser'

/**
 TP Route + LocalStorage + Axios
 Objectif : Garder la connexion d'un utilisateur : sur la table Login : lorsqu'on fait F5 ou qu'on quitte le naviagateur
 Recharger : Les informations liées à notre utilisateur dans tous les cas.
 Charger le Routes suivant.
 Prévoir une méthode logout() au niveau des composants Home et Login ou de prévoir un composant Header
 */

/**
 * Simulation de la gestion des login....
 */
export function GestionLogin() {
    return <div>Gestion des login</div>
}

/**
 * Simulation de la gestion des Clients....
 */
export function GestionCustomers() {
    return <div>Gestion des Clients</div>
}

/**
 * on récupére les routes (const route en cours...) et les props des routes
 * @param {*} param0
 */
export function Listes({routes, ...props}) {
    /**
     * On vérifie si on est "logué" sinon on est redirigé vers le path : '/login'
     */
    if (gestionlocalstorage.getlogin() == null) {
        props.history.push('/login');
    }
    return (
        <div>
            <ul>
                {/*On affiche tous les liens du route en cours */}
                {routes.map((route, i) => (
                    <AfficheLesLiens key={i} {...route} />
                ))}
            </ul>
            {/** on crée la balise route avec le composant et les passages de paramètres dont les props */}
            {routes.map((route, i) => (
                <GestionSousRoutes key={i} {...route} />
            ))}
        </div>);
}

/**
 * JSON de ma gestion des routes
 * J'ai ajouté de façon personnelle menu et exact
 */
const routes = [
    {
        path: "/",
        menu: 'Accueil',
        component: Home,
        exact: true
    },
    {
        path: "/infos",
        menu: "info by id",
        component: CompGetUser
    },
    {
        path: "/CrudLogin",
        menu: "Mon Crud Login",
        component: CompGestionLogin
    },
    {
        path: "/login",
        menu: 'Identification',
        component: CompLogin
    },
    {
        path: "/listes",
        menu: 'Listes',
        component: Listes,
        routes: [
            {
                path: "/listes/gestionlogin",
                menu: 'Gestion des users',
                component: GestionLogin
            },
            {
                path: "/listes/gestionclient",
                menu: 'Gestion des Cliens',
                component: GestionCustomers
            }
        ]
    }
];

//Affiche les Link de la routes

export function AfficheLesLiens(route) {
    return (
        <li>
            {/*On affiche tous les liens du route en cours par NavLink */}
            {route.exact === undefined &&
            <NavLink to={route.path}> {route.menu} </NavLink>
            }
            {/*Je positionne mon lien actif par défaut configurer dans le const route*/}
            {route.exact === true &&
            <NavLink to={route.path} activeClassName="selected"> {route.menu} </NavLink>
            }
        </li>
    );
}

/**
 * Gestion des sous routes
 * @param {*} route
 */
export function GestionSousRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
                <route.component {...props} routes={route.routes}/>
            )}
        />
    );
}

/**
 * Gestion principale de mes routes à partir de const route
 */
export default function MapRoute() {
    return (
        <div>
            <ul>
                {routes.map((route, i) => (
                    <AfficheLesLiens key={i} {...route} />
                ))}
            </ul>
            {/* Gestion de mes routes sélectionnés grâce à la balise Switch  */}
            <Switch>
                {routes.map((route, i) => (
                    <GestionSousRoutes key={i} {...route} />
                ))}
            </Switch>
        </div>
    );
}