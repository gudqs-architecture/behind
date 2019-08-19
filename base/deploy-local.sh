cd superpom
mvn deploy -P local,local-deploy,!server,!remote-delopy

cd ../platform
mvn deploy -P local,local-deploy,!server,!remote-delopy

cd ../system
mvn deploy -P local,local-deploy,!server,!remote-delopy
