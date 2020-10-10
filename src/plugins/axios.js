'use strict';

import Vue from 'vue';
import axios from 'axios';
import {api} from '../common/api';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    timeout: 15 * 1000, // Timeout
    withCredentials: true, // Check cross-site Access-Control
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFTOKEN',
};

const _axios = axios.create(config);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 403) {
            window.location.replace(api.login);
            return Promise.reject(error);
        }
        alert(error + (error.response ? '\n' + JSON.stringify(error.response.data) : ''));
        window.location.reload(false);
        // Do something with response error
        return Promise.reject(error);
    },
);

Plugin.install = function (Vue, options) {
    Vue.axios = _axios;
    Vue.axiosDefault = axios.create(config);
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            },
        },
        $axios: {
            get() {
                return _axios;
            },
        },
    });
};

Vue.use(Plugin);

export default Plugin;
