https://itnext.io/building-restful-api-with-node-js-express-js-and-postgresql-the-right-way-b2e718ad1c66

role "root" does not exist: https://www.revsys.com/writings/postgresql/errors.html

--fix: permission denied, open '/Users/milinka/.babel.json'
:) Get the same error and fixed it with below command
sudo chmod 777 /Users/{{-username-}}/.babel.json
or open new terminal hit below commnd
ls -al
check that file
if you got then hit
sudo chmod 777 .babel.json

https://viblo.asia/p/jwt-authentication-authorization-in-nodejs-rest-api-WAyK8PXnKxX

https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/

https://viblo.asia/p/dependency-injection-la-gi-va-khi-nao-thi-nen-su-dung-no-LzD5d0d05jY

kill port wind:
- netstat -ano | findstr :<PORT>
- tasklist /O
- taskkill (/F) /pid PID
- https://stackoverflow.com/questions/4075287/node-express-eaddrinuse-address-already-in-use-kill-server

killport Mac: sudo lsof -i -P | grep LISTEN
sudo lsof -nP -i:$PORT | grep LISTEN --> lay pid o vi tri thu 2
sudo kill -9 PID

https://stackoverflow.com/questions/4421633/who-is-listening-on-a-given-tcp-port-on-mac-os-x

- Web scraping
https://www.scrapingbee.com/blog/web-scraping-javascript/

deploy
https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
postgres: https://phoenixnap.com/kb/how-to-install-postgresql-on-ubuntu

use screen: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-screen-on-an-ubuntu-cloud-server


deploy full video: https://www.learnwithjason.dev/blog/deploy-nodejs-ssl-digitalocean/