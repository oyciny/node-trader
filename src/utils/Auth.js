const inquirer = require('inquirer')
const config = new (require('conf'))
const Robinhood = require('robinhood')
const ch = require('cipherhash')

class Auth {

    link(callback) {
        inquirer.prompt([
            {type: 'list', message: 'Choose Service:', name: 'service', choices: ['Robinhood', 'Webull'] }
        ]).then(a => {
            if (a.service === 'Robinhood') {
                if (!config.get('robinhood')) {
                    this.defineRobinhoodCredentials(() => {
                        console.log(config.get('robinhood'))
                    })
                }
                if (config.get('robinhood')) {
                    // Handle Login
                }
            }
            if (a.service === 'Webull') {
                if (!config.get('webull')) {
                    this.defineWebullCredentials(() => {
                        // Handle Login
                        console.log(config.get('webull'))
                    })
                }
                if (config.get('webull')) {
                    // Handle Login
                }
            }
        }).then(callback)
    }

    defineWebullCredentials(callback) {
        inquirer.prompt([
            { type: 'input', message: 'Webull Username: ', name: 'username' },
            { type: 'password', message: 'Webull Password: ', name: 'password' },
            { type: 'password', message: 'Passphrase to secure credentials with: ', name: 'passphrase' }
        ]).then(a => {
            let credentials = {
                username: a.username,
                password: a.password
            }
            config.set('webull', { credentials: ch.cipherHash(JSON.stringify(credentials), a.passphrase) })
        }).then(callback)
    }

    defineRobinhoodCredentials(callback) {
        inquirer.prompt([
            { type: 'input', message: 'Robinhood Username: ', name: 'username' },
            { type: 'password', message: 'Robinhood Password: ', name: 'password' },
            { type: 'password', message: 'Passphrase to secure credentials with: ', name: 'passphrase' }
        ]).then(a => {
            let credentials = {
                username: a.username,
                password: a.password
            }
            config.set('robinhood', { credentials: ch.cipherHash(JSON.stringify(credentials), a.passphrase) })
        }).then(callback)
    }

    removeCredentials(service) {
        return new Promise((resolve, reject) => {
            config.delete(service)
            if (!config.get(service)) {
                resolve()
            } else {
                reject('Error: credentials not removed')
            }
        })
    }

    showCredentials(service) {
        if (!config.get(service)) {
            console.log('No credentials saved for ' + service)
        } else {
            inquirer.prompt([
                { type: 'password', message: 'Please enter your security passphrase: ', name: 'passphrase' }
            ]).then(a => {
                const credentials = config.get(service).credentials
                console.log(ch.unCipherHash(credentials, a.passphrase))
            })
        }
    }

/*
    login() {
        // check if auth has been set
        if (!config.get('auth')) {
            // Auth is undefined so define it
            inquirer.prompt([
                { type: 'input', message: 'Username: ', name: 'username' },
                { type: 'password', message: 'Password: ', name: 'password' }
            ]).then(a => {
                this.cipher = c.cipherHash(a.password, a.password + a.username + '-chipher')
                this.username = a.username
                this.password = c.cipherHash(a.password, this.cipher)
            }).then(() => {
                config.set('auth', { username: this.username, password: this.password })
            }).then(() => {
                // Handle Login
                return this.session()
            }).catch(err => {
                console.log(err)
            })
        }
        if (config.get('auth')) {
            // Handle Login
            return this.session()
        }
    }

    logout() {
        if (!config.get('auth')) {
            console.error('Fail: No Auth Object has been set')
        }
        if (config.get('auth')) {
            config.delete('auth')
            console.log('Logout Successfull')
        }
    }

    session() {
        if (!config.get('auth')) {
            this.login()
        }
        if (config.get('auth')) {
            const auth = config.get('auth')
            return Robinhood({ username: auth.username, password: c.unCipherHash(auth.password, auth.password + auth.username + "-cipher")})
        }
    }
    */
}

module.exports = Auth