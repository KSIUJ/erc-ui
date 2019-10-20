import Vue from 'vue';
import Router from 'vue-router';
import Members from '@/views/Members.vue';
import Periods from '@/views/Periods.vue';
import Roles from '@/views/Roles.vue';
import Clients from '@/views/Clients.vue';
import AuthEvents from '@/views/AuthEvents.vue';
import Dashboard from '@/views/Dashboard.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
            meta: {
            },
        },
        {
            path: '/members/',
            name: 'members',
            component: Members,
            meta: {
                title: 'Members',
            },
        },
        {
            path: '/periods/',
            name: 'periods',
            component: Periods,
            meta: {
                title: 'Periods',
            },
        },
        {
            path: '/roles/',
            name: 'roles',
            component: Roles,
            meta: {
                title: 'Roles',
            },
        },
        {
            path: '/clients/',
            name: 'clients',
            component: Clients,
            meta: {
                title: 'Clients',
            },
        },
        {
            path: '/authevents/',
            name: 'authevents',
            component: AuthEvents,
            meta: {
                title: 'Auth events',
            },
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});
