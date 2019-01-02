
- Student: Chris Neven
- Studentnummer: 500674423
- Docent: Tim Visser
- Klas: SE201
- Datum: 14 december 2018

![alt text](https://i.imgur.com/viop6Tc.png)

Voor practicum 3 is het doel om kennis en vaardigheden van unittesten te verbreden en te verdiepen. Als usecase heb ik het project gebruikt waaraan ik heb gewerkt tijdens het software architectuur project. Voor dit project hebben mijn team en ik een applicatie gemaakt die bestaat uit microservices in de backend en een Angular website in de frontend. De applicatie is een soort banksysteem, zie de bovenstaande afbeelding voor een abstract overzicht van het systeem. Tijdens het project heb ik mij vooral bezig gehouden met de Account en Transfer microservices om ervoor te zorgen dat een gebruiker van het ene account naar het andere account een geldbedrag kan overmaken. Voor de Account microservice zijn nog geen unit tests. De plek waar mij het beste leek om unit tests uit te voeren is in een business logic class. Dat is in dit geval de AccountService.java.

## Prerequisites
- IntelliJ met Emma plugin
- Mvn installed

## Get started with IntelliJ and run tests with code coverage
1. Open accountms in IntelliJ
2. De tests voor de AccountService.java bevinden zich in src/test/java
3. Klik met rechter muisknop op de java map en klik “Run All tests” en “Run All tests with coverage”
4. Indien je met coverage de tests runt zie je dat je als je naar element AccountService navigeert 83% van de lines is gecovered. 

## Tests met commandline
1. Open terminal
2. cd in de root van dit project
3. Voer het volgende command uit: `mvn test` 
4. Als het goed is worden alle unit tests uitgevoerd en zijn er geen errors.
