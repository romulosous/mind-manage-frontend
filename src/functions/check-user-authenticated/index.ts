export const checkUserAuthenticated = () => {
    const accessToken = localStorage.getItem('auth')
    return !!accessToken
}