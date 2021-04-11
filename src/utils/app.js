import cookie from "cookie_js";

const adminToken = "admin_token";
const usernameKey = "username";

export function getToken() {
    return cookie.get(adminToken);
}

export function setToken(token) {
    return cookie.set(adminToken, token);
}

export function removeToKen() {
    return cookie.remove(adminToKen);
}

export function getUserName() {
    return cookie.get(usernameKey);
}

export function setUserName(username) {
    return cookie.set(usernameKey, username);
}

export function removeUserName() {
    return cookie.remove(usernameKey);
}


