const isAutorizedUser = state => state.auth.isAutorized;

const getToken = state => state.auth.token;

const getErrorValue = state => state.auth.error;

const getUserName = state => state.auth.user.name;

export { isAutorizedUser, getToken, getErrorValue, getUserName };
