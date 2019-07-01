cd superpom
mvn deploy -P mountain,mountain-nexus,!local,!local-nexus

cd ../platform
mvn deploy -P mountain,mountain-nexus,!local,!local-nexus

cd ../system
mvn deploy -P mountain,mountain-nexus,!local,!local-nexus
