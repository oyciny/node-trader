const { program, Option, Argument } = require('commander')
const config = new (require('conf'))
const Auth = new (require('./utils/Auth'))
const version = require('../package.json').version

program.version(version)

program
    .addOption(new Option('-d, --dollars', 'use dollars rather than shares as the quantity'))
    .addOption(new Option('-s, --service <service>', 'choose the service to use').choices(['robinhood', 'webull']))
    .addOption(new Option('-r, --remove', 'removes a services credentials'))
    .addOption(new Option('-l, --link', 'link to service'))

program
    .command('service')
    .addArgument(new Argument('<service>', 'the service you wish to interact with').choices(['robinhood', 'webull']))
    .description('link or delete the selected serivce')
    .action((service) => {
        if (program.opts().link) {
            if (service == 'robinhood') {
                Auth.defineRobinhoodCredentials()
            }
            if (service == 'webull') {
                Auth.defineWebullCredentials()
            }
        } else if (program.opts().remove) {
            Auth.removeCredentials(service)
                .then(() => {
                    console.log('Credentials removed')
                }).catch(err => {
                    console.log(err)
                })
        } else {
            Auth.showCredentials(service)
        }
    })

program
    .command('buy')
    .addArgument(new Argument('<symbol>', 'the stock ticker you wish to purchase'))
    .addArgument(new Argument('[quantity]', 'the number of shares you wish to purchase').default(1, 'one share/dollar'))
    .action((symbol, quantity) => {
        const options = program.opts()
        quantity = parseFloat(quantity)

        if (options.dollars) {

            if (options.service == 'robinhood') {
                console.log(options.service, symbol, quantity)
            }

            if (options.service == 'webull') {
                console.log(options.service, symbol, quantity)
            }

        } else {

            if (options.service == 'robinhood') {
                console.log(options.service, symbol, quantity)
            }

            if (options.service == 'webull') {
                console.log(options.service, symbol, quantity)
            }

        }
    })



program.parse()