const isAutorizedUser = state => state.auth.isAutorized;

const getToken = state => state.auth.token;

export { isAutorizedUser, getToken };
