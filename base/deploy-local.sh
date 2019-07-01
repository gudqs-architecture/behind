cd superpom
mvn deploy -P local,local-nexus,!mountain,!mountain-nexus

cd ../platform
mvn deploy -P local,local-nexus,!mountain,!mountain-nexus

cd ../system
mvn deploy -P local,local-nexus,!mountain,!mountain-nexus
