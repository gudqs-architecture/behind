cd superpom
mvn deploy -P server,remote-deploy,!local,!local-deploy

cd ../platform
mvn deploy -P server,remote-deploy,!local,!local-deploy

cd ../system
mvn deploy -P server,remote-deploy,!local,!local-deploy
