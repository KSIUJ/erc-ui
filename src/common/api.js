const baseUrl = '/';
const apiUrl = baseUrl + 'api/';

const api = {
    login: baseUrl + 'accounts/login',
    logout: baseUrl + 'accounts/logout',
    last_scanned_id: apiUrl + 'authevents/last_scanned_card/',
    memberships: apiUrl + 'memberships/',
    members: apiUrl + 'members/',
    authevents: apiUrl + 'authevents/',
    clients: apiUrl + 'clients/',
    roles: apiUrl + 'roles/',
    periods: apiUrl + 'periods/',
    enroll: apiUrl + 'members/enroll_with_membership/',
    self_service_tokens: apiUrl + 'selfservicetokens/',
    self_service: apiUrl + 'selfservice/'
};

export {api}
