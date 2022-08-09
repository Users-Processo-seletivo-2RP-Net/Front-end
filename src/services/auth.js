export const usuarioAutenticado = () => localStorage.getItem("usuario-login") !== null;

export const parseJwt = () => {
    if (localStorage.getItem('login-usuario-users') !== null) {
        let base64 = localStorage.getItem('login-usuario-users').split(".")[1];
        return JSON.parse(window.atob(base64));
    } else {
        return null
    }


};

export const idEmpresa = () => {
    let idEmpresa = localStorage.getItem('idEmpresa');
    return idEmpresa
};