import { RouteConfig } from 'react-router-config';
import NotFound from '../components/NotFound';
import Accommodation from '../components/Accommodation';
import Dashboard from '../components/Dashboard';
import { Register } from '../components/templates/Register';
import { Login } from '../components/templates/Login';
import React from 'react';
import Info from '../components/templates/Info';
import InfoDetails from '../components/organisms/info/InfoDetails';
import InfoPhotos from '../components/organisms/info/InfoPhotos';
import { InfoDescription } from '../components/organisms/info/InfoDescription';
import { InfoFacilities } from '../components/organisms/info/InfoFacilities';

export interface Route extends RouteConfig {
    name: string;
    displayInNav?: boolean;
    routes?: Route[];
}

export const homeRoute: Route = {
    path: '/',
    component: Login,
    exact: true,
    name: 'Home'
};

export const someRoute: Route = {
    path: '/register',
    component: Register,
    exact: true,
    name: 'Register'
};

export const loginRoute: Route = {
    path: '/login',
    component: Login,
    exact: true,
    name: 'login'
};
export const notFound: Route = {
    name: 'NotFound',
    path: '*',
    component: NotFound,
    exact: true
};

const dummyComponent = (name: string) => <div>{name}</div>;
export const accommodationRoute: Route = {
    path: '/accommodation/:accommodationId',
    component: Accommodation,
    name: 'Accommodatie',
    routes: [
        {
            name: 'Dashboard',
            path: '/accommodation/:accommodationId',
            exact: true,
            component: Dashboard
        },
        {
            name: 'Prijzen',
            displayInNav: true,
            path: '/accommodation/:accommodationId/prices',
            exact: true,
            component: Register
        },
        {
            name: 'Beschikbaarheid',
            displayInNav: true,
            path: '/accommodation/:accommodationId/availability',
            exact: true,
            component: Info
        },
        {
            name: 'Boekingen',
            displayInNav: true,
            path: '/accommodation/:accommodationId/bookings',
            exact: true,
            component: Info
        },
        {
            name: 'Gegevens',
            displayInNav: true,
            path: '/accommodation/:accommodationId/info',
            component: Info,
            routes: [
                {
                    name: 'Gegevens',
                    path: '/accommodation/:accommodationId/info',
                    exact: true,
                    component: InfoDetails
                },
                {
                    name: 'Omschrijving',
                    path: '/accommodation/:accommodationId/info/description',
                    exact: true,
                    component: InfoDescription
                },
                {
                    name: `Foto's`,
                    path: '/accommodation/:accommodationId/info/pictures',
                    exact: true,
                    component: InfoPhotos
                },
                {
                    name: 'Faciliteiten',
                    path: '/accommodation/:accommodationId/info/facilities',
                    exact: true,
                    component: InfoFacilities
                },
                {
                    name: 'Opties',
                    path: '/accommodation/:accommodationId/info/options',
                    exact: true,
                    component: () => dummyComponent('Opties')
                },
                {
                    name: 'Toeslagen',
                    path: '/accommodation/:accommodationId/info/fee',
                    exact: true,
                    component: () => dummyComponent('Toeslagen')
                },
                {
                    name: 'Kortingen',
                    path: '/accommodation/:accommodationId/info/discounts',
                    exact: true,
                    component: () => dummyComponent('Kortingen')
                },
                {
                    name: 'Overeenkomsten',
                    path: '/accommodation/:accommodationId/info/agreements',
                    exact: true,
                    component: () => dummyComponent('Overeenkomsten')
                },
                notFound
            ]
        },
        notFound
    ]
};

const routes: Route[] = [homeRoute, accommodationRoute, someRoute, loginRoute, notFound];

export default routes;
