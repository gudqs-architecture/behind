cd superpom
mvn deploy -P local,local-deploy,!server,!remote-deploy

cd ../platform
mvn deploy -P local,local-deploy,!server,!remote-deploy

cd ../system
mvn deploy -P local,local-deploy,!server,!remote-deploy
