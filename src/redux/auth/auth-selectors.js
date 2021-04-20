const isAutorizedUser = state => state.auth.isAutorized;

const getToken = state => state.auth.token;

const getErrorValue = state => state.auth.error;

export { isAutorizedUser, getToken, getErrorValue };
