# Simple Password Manager

A Secure Password Manager is an essential tool for protecting your digital identity, ensuring that all your sensitive login credentials are encrypted and safely stored. Our password manager is built with security at its core, using bcrypt, a trusted and robust hashing algorithm designed to protect passwords from unauthorized access.

With bcrypt, every password you store is hashed using a unique salt, making it extremely difficult for attackers to reverse-engineer the original password even if they gain access to the database. Bcrypt also automatically adapts over time, allowing for stronger security as hardware processing power increases, without needing major updates to the system.

Our password manager ensures that your data remains safe with industry-standard encryption, giving you peace of mind whether you’re managing personal accounts, business logins, or financial credentials.

Project is deployed with Render.com

You can see deployed project here: https://password-manager-xbwv.onrender.com

## Install

- clone the project
- install `nvm` https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating
- install `yarn` https://classic.yarnpkg.com/lang/en/docs/install
- run `nvm use`
- run `yarn`

To run the project locally run `yarn dev`

## Useful links

Here is the list of web pages that were used while working on the project

https://en.wikipedia.org/wiki/Bcrypt

https://codahale.com/how-to-safely-store-a-password/

https://www.npmjs.com/package/connect-sqlite3
https://github.com/expressjs/session?tab=readme-ov-file#compatible-session-stores
https://developer.okta.com/blog/2021/06/07/session-mgmt-node
https://dev.to/saint_vandora/how-to-implement-session-management-in-nodejs-applications-5emm

### CSRF

https://www.npmjs.com/package/tiny-csrf
https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
https://www.stackhawk.com/blog/node-js-csrf-protection-guide-examples-and-how-to-enable-it/

### Hosting and deployment

https://render.com/

### TLS Certificate

https://docs.render.com/tls