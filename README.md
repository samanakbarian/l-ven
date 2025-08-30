# Löven-kollen

> En snabb, enkel och mobilanpassad webbapp som ger Björklöven-supportrar den mest essentiella informationen om lagets prestationer.

Löven-kollen är en fan-skapad applikation designad för att ge snabb tillgång till resultat, tabell, spelschema och statistik för ishockeylaget IF Björklöven.

## Funktioner

- **Översikt (Dashboard):** Se snabbt resultat från senaste matchen, information om nästa match och lagets nuvarande placering i tabellen.
- **Tabell:** En komplett och aktuell serietabell för HockeyAllsvenskan.
- **Spelschema:** Bläddra bland kommande och redan spelade matcher för säsongen.
- **Spelarstatistik:** Detaljerad poängliga för alla spelare i laget (mål, assist, poäng).
- **Nyhetsflöde:** De senaste nyheterna och artiklarna relaterade till laget.
- **Historik:** En överblick över lagets slutplaceringar och slutspelsresultat från tidigare säsonger.
- **Visuell Statistik:** Interaktiva och lättförståeliga diagram som visualiserar både lagets och enskilda spelares prestationer.
- **Responsiv Design:** Optimerad för en sömlös upplevelse på både mobil och dator.

## Teknologier

Projektet är byggt med moderna webbteknologier för att säkerställa en snabb och pålitlig upplevelse.

- **React:** Ett JavaScript-bibliotek för att bygga användargränssnitt.
- **TypeScript:** Ett superset av JavaScript som lägger till statisk typning för ökad kodkvalitet.
- **Tailwind CSS:** Ett "utility-first" CSS-ramverk för att snabbt designa moderna och responsiva layouter.

## Datakälla

För närvarande används **simulerad data** för demonstrationsändamål. All information om matcher, tabeller och statistik genereras dynamiskt i klienten för att visa applikationens fulla funktionalitet.

Utbyggnad av applikationen

Detta system består av tre huvuddelar:
Databasen: Detta är hjärtat i vår applikation. All information om matcher, tabeller, spelare och statistik som vi en gång har hämtat sparas här för alltid. Bra val för detta är molndatabaser som är enkla att komma igång med, t.ex. Google Firestore eller Supabase (PostgreSQL).
En Automatiserad Datainsamlare (Worker/Cron Job): Detta är en separat, oberoende process som körs i bakgrunden på en schemalagd tid (t.ex. var 15:e minut eller en gång i timmen). Dess enda uppgift är att hålla databasen uppdaterad.
Steg 1: Hitta uppdateringar. Processen startar och kollar vilka matcher som behöver uppdateras (t.ex. matcher som spelas just nu eller matcher som nyligen avslutats).
Steg 2: Skrapa & Tolka. Den hämtar HTML-koden från HockeyAllsvenskans hemsida för de relevanta matcherna.
Steg 3: Strukturera med AI. HTML-koden skickas till Gemini API med instruktionen att extrahera all relevant information och returnera den som ett rent JSON-objekt.
Steg 4: Spara till Databasen. Den strukturerade JSON-datan sparas eller uppdateras i vår databas. En match som är "kommande" kan uppdateras till "live" och sedan till "spelad" med fullständig statistik.
Ert API (Data-servitören): Detta är den enda delen som er React-app pratar med. När en användare öppnar Löven-kollen, anropar appen ert API. API:ets enda uppgift är att blixtsnabbt hämta den senaste informationen från er egen databas och skicka den till appen. Det utför ingen skrapning eller AI-bearbetning alls.
Hur Flödet Fungerar
Flöde 1: Data-insamling (sker automatiskt i bakgrunden)
[Timer startar processen] → [Datainsamlare] → [Skrapar HockeyAllsvenskan.se] → [Analyserar med Gemini] → [Sparar i Databasen]
Flöde 2: Användaren besöker appen (sker omedelbart)
[Användare öppnar Löven-kollen] → [React-appen anropar ert API] → [API:et läser från Databasen] → [Data visas för användaren]
Varför är detta ett Bättre Sätt?
Prestanda & Användarupplevelse: Appen blir extremt snabb. Användaren behöver aldrig vänta på en långsam skrapning. Datan finns redan klar för leverans i vår databas.
Stabilitet & Pålitlighet: Om HockeyAllsvenskans webbplats skulle vara nere tillfälligt, kommer er app fortfarande att fungera perfekt. Den visar den senast sparade datan från er databas.
Historik & Nya Funktioner: Detta är den stora vinsten med ditt förslag. Nu när vi sparar all data kan vi enkelt bygga funktioner som:
Visa formkurvor över tid.
Jämföra statistik mellan säsonger.
Visa "head-to-head"-statistik mot specifika motståndare.
Skapa visuella grafer över en spelares poängutveckling.
Effektivitet: Vi undviker att skrapa samma data om och om igen. En match som är färdigspelad behöver vi aldrig hämta igen. Vi minskar också antalet anrop till både HockeyAllsvenskans server och Gemini API, vilket sparar kostnader.
Nästa Steg
Välj en databas. Min rekommendation är att börja med Firestore eftersom det är en NoSQL-databas som är väldigt enkel att arbeta med från en serverless-funktion och passar bra för den typ av data vi har.
Sätt upp datamodellerna. Definiera hur vi ska strukturera matches, teams, standings och playerStats i databasen.
Skapa den schemalagda funktionen. Använd en plattform som Google Cloud Functions eller Vercel Cron Jobs för att köra er datainsamlare.


Som er tekniska arkitekt kommer här en komplett, steg-för-steg-plan för hur vi bygger hela systemet med Google Cloud-tjänster. Vi designar det för att vara kostnadseffektivt, högpresterande och underhållsfritt genom att använda "serverless"-komponenter.
Arkitekturöversikt: "Löven-kollen" V2.0
Vårt nya system kommer att bestå av tre frikopplade delar som arbetar i harmoni:
Databas (Sanningens Källa): All vår data bor här.
Tjänst: Cloud Firestore
Datainsamlare (Den Hårt Arbetande Roboten): En automatiserad process som hämtar, tolkar och sparar ny data.
Tjänster: Cloud Scheduler + Cloud Functions + Gemini API
API (Den Snabba Servitören): En blixtsnabb slutpunkt som servar vår färdiga data till appen.
Tjänst: Cloud Functions
Visuellt flöde:
code
Code
[Användare] <--> [React App] <--> [API Cloud Function] <--> [Firestore Databas]
                                                                  ^
                                                                  | (Uppdateras av...)
                                         [Scheduler] -> [Data Collector Cloud Function] -> [Gemini API]
                                                                  |
                                                                  v
                                                        [HockeyAllsvenskan.se]
Steg-för-steg Byggplan
Här är vår roadmap, uppdelad i hanterbara faser.
Fas 0: Grundläggning - Google Cloud Projekt-setup
Innan vi skriver en enda rad kod sätter vi upp vår arbetsyta.
Skapa ett Google Cloud Project: Gå till Google Cloud Console och skapa ett nytt projekt, t.ex. "loven-kollen-prod".
Aktivera Nödvändiga API:er: I ditt nya projekt, gå till "APIs & Services" > "Library" och aktivera följande:
Cloud Firestore API
Cloud Functions API
Cloud Scheduler API
Cloud Build API (ofta aktiverat som standard)
Vertex AI API (för Gemini)
Secret Manager API
Säkra din Gemini API-nyckel: Hårdkoda aldrig nycklar. Vi använder Secret Manager.
Gå till "Security" > "Secret Manager".
Skapa en ny "Secret" med namnet GEMINI_API_KEY.
Klistra in din faktiska API-nyckel som värde. Våra Cloud Functions kommer sedan att få behörighet att läsa denna hemlighet på ett säkert sätt.
Fas 1: Databasen - Definiera Vårt Datahem
Här skapar och strukturerar vi vår databas.
Skapa Firestore Databas:
Gå till "Firestore" i menyn.
Välj "Native mode" och en plats (t.ex. europe-north1 för Finland, nära Sverige).
Definiera Datastrukturen (Collections): I Firestore organiserar vi data i "collections". Vi börjar med dessa:
teams: Innehåller en lista över alla lag med ID, namn och logotyp-URL. Detta fyller vi på en gång manuellt.
matches: Varje dokument här är en match. Dokumentets ID kan vara HockeyAllsvenskans match-ID. Innehåller info som hemmalag, bortalag, resultat, datum och status (upcoming, live, finished).
standings: Ett enda dokument i denna collection, t.ex. med ID current_season, som innehåller hela serietabellen som en lista med objekt.
player_stats: Ett dokument per spelare i Björklöven, som innehåller all deras statistik.
Fas 2: Datainsamlaren - Skapa Vår Intelligenta Robot
Detta är den mest komplexa men också roligaste delen. Vi skapar en Cloud Function som gör grovjobbet.
Skapa en Cloud Function (data-ingestor):
Trigger: Välj "Cloud Pub/Sub" som trigger. Vi kommer koppla Schemaläggaren till detta senare.
Runtime: Välj Node.js (t.ex. 20).
Skriv Koden för Funktionen:
a. Hämta HTML: Använd ett bibliotek som axios för att ladda ner HTML-koden från en specifik match-URL på hockeyallsvenskan.se.
b. Hämta API-nyckel: Importera Googles Secret Manager-klient för att säkert hämta vår GEMINI_API_KEY.
c. Bygg en Gemini Prompt: Detta är magin. Skapa en detaljerad prompt som inkluderar den nedladdade HTML-koden. Viktigast av allt, använd responseSchema för att tvinga Gemini att svara i exakt det JSON-format vi vill ha, som matchar vår Firestore-struktur för en match.
d. Anropa Gemini: Skicka din prompt till gemini-2.5-flash-modellen.
e. Spara till Firestore: När du får tillbaka den rena, strukturerade JSON-datan från Gemini, anslut till Firestore med Googles klientbibliotek och skriv datan till matches-collectionen. Om matchen redan finns, uppdatera den.
Fas 3: Schemaläggaren - Väck Roboten Regelbundet
Nu ser vi till att vår datainsamlare körs automatiskt.
Skapa ett Cloud Scheduler Job:
Frekvens: Ange en cron-sträng. */15 * * * * betyder "var 15:e minut".
Mål (Target): Välj "Pub/Sub".
Topic: Skapa ett nytt Pub/Sub-topic, t.ex. run-data-ingestion.
Vår data-ingestor-funktion från Fas 2 prenumererar redan på detta topic och kommer att starta varje gång schemaläggaren skickar ett meddelande.
Fas 4: API:et - Bygg En Expressleverans-tjänst
Nu bygger vi den andra Cloud Functionen, den som vår React-app kommer att prata med. Denna ska vara extremt enkel och snabb.
Skapa en ny Cloud Function (get-league-data):
Trigger: Välj HTTP.
Autentisering: Välj "Allow unauthenticated invocations" så att vår webbapp kan anropa den.
Runtime: Välj Node.js 20.
Skriv Koden för Funktionen:
a. Implementera CORS: Det första du gör i koden är att sätta headers för CORS (Access-Control-Allow-Origin: *) så att webbläsaren inte blockerar anropet.
b. Läs från Firestore: Anslut till Firestore.
c. Hämta Data: Gör de nödvändiga anropen för att hämta de senaste matcherna, tabellen (standings/current_season), spelarstatistik etc.
d. Formatera & Returnera: Strukturera om datan till det exakta LeagueData-format som vår frontend förväntar sig och returnera det som ett JSON-svar. Denna funktion utför ingen skrapning eller AI-anrop. Den bara läser från databasen.
Fas 5: Frontend-integration - Koppla in Strömmen
Sista steget är att peka om vår React-app.
Hitta din API URL: När get-league-data-funktionen är deployad får den en publik URL.
Uppdatera hockeyService.ts:
Radera hela den nuvarande fetchLeagueData-funktionen med all simulerad data och setTimeout.
Ersätt den med en ny, enkel async-funktion:
code
TypeScript
import type { LeagueData } from '../types';

const API_URL = 'DIN_CLOUD_FUNCTION_URL_HÄR';

export const fetchLeagueData = async (): Promise<LeagueData> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Kunde inte hämta data från servern.');
  }
  const data = await response.json();
  return data as LeagueData;
};
Uppdatera fotnoten: I App.tsx, ändra texten i <footer /> från att data är simulerad till något i stil med "Data hämtad från HockeyAllsvenskan".
Genom att följa denna plan bygger vi ett system som inte bara löser dagens problem utan är redo att växa med nya funktioner i framtiden, precis som du föreslog. Vi får ett snabbt, pålitligt och datadrivet "Löven-kollen". Nu kör vi
Bygg om API-endpointen. Uppdatera den befintliga API-koden så att den enbart läser från den nya databasen.
