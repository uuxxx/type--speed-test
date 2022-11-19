export function signUpPasswordsValid(password, repeatedPassword) {
    return password === repeatedPassword
}

export function signInPasswordValid(password) {
    return password.length > 5  // 6 is a minimum length of password accepted by firebase
}

export function accountCreationDate(seconds) {
    const date = new Date(seconds)
    const RUDate = new Intl.DateTimeFormat('ru', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
    return RUDate.format(date)
}


export function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
