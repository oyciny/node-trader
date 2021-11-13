const inquirer = require('inquirer')
const config = new (require('conf'))
const Robinhood = require('robinhood')
const chalk = require('chalk')
const ch = require('cipherhash')

class Auth {

    // Define Credentials for Webull
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

    // Define Credentials for Robinhood
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

    // Delete Credentails for the selected service
    removeCredentials(service) {
        return new Promise((resolve, reject) => {
            config.delete(service)
            if (!config.get(service)) {
                resolve()
            } else {
                reject(chalk.red('Error: credentials not removed'))
            }
        })
    }

    // Show Credentails for the selected service *Password Protected
    showCredentials(service) {
        if (!config.get(service)) {
            console.log(chalk.redBright('No credentials saved for ' + service))
        } else {
            inquirer.prompt([
                { type: 'password', message: 'Please enter your security passphrase: ', name: 'passphrase' }
            ]).then(a => {
                const credentials = JSON.parse(ch.unCipherHash(config.get(service).credentials, a.passphrase))
                console.log(`${chalk.green('Username: ')}${chalk.italic(credentials.username)}\n${chalk.green('Password: ')}${chalk.italic(credentials.password)}`)
            })
        }
    }
}

module.exports = Auth