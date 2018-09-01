export const getUserAuthorizationFromCookie = (req) => {
    if(!req)return;
    if (!req.headers.cookie) return
    const authCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('authorization='))
    if (!authCookie) return
    const auth = authCookie.split('=')[1]
    return decodeURIComponent(auth);
}

export const getUserFromLocalStorage = () => {
    const json = window.localStorage.user
    return json ? JSON.parse(json) : undefined
}
