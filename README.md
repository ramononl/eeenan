<a href="https://www.eeenan.ch" target="_blank">
    <img src="https://eeenan.ch/eeenan_icon.png" alt="eeenan Icon" title="eeenan" align="right" height="60" />
</a>

# eeenan App

![Major](https://img.shields.io/badge/bachelor-lehrprojekt-blue)
![Version](https://img.shields.io/badge/version-beta-orange)
![Plattform](https://img.shields.io/badge/plattform-web-green)

[![Netlify Status](https://api.netlify.com/api/v1/badges/6e5b8a42-1307-4ce8-a320-99a164d7d7d9/deploy-status)](https://app.netlify.com/sites/brave-goldwasser-70fc82/deploys)

«eeenan» ist ein Prototyp einer **Mobile-Learning-App**, ausgerichtet auf Themenbereiche der Webentwicklung. Die Applikation ist für das **asynchrone und selbstständige Lernen** im Rahmen von berufsorientierten Weiterbildungen konzipiert.

![Header](https://eeenan.ramon.onl/header.png)

## 📖 Inhaltsverzeichnis

- [Funktionen/Inhalte](#-funktioneninhalte)
- [Ressourcen](#-ressourcen)
- [Technischer Hintergrund](#-technischer-hintergrund)
  - [Nuxt.js](#nuxtjs)
  - [Firebase](#firebase)
- [Aufbau](#-aufbau)
  - [Grundkonfiguration](#grundkonfiguration)
  - [Komponenten](#komponenten)
  - [Layouts](#layouts)
  - [Middleware](#middleware)
  - [Mixins](#mixins)
  - [Pages](#pages)
  - [Plugins](#plugins)
  - [Store](#store)
  - [Authentifizierung](#authentifizierung)
  - [Cloud Firestore](#cloud-firestore)
  - [Deployment](#deployment)
- [Design/Styling](#-designstyling)
  - [tailwind.config.js](#tailwindconfigjs)
  - [tailwind.css](#tailwindcss)
  - [Logos](#logos)
  - [Schriftfamilie](#schriftfamilie)
- [Erweiterungsmöglichkeiten](#-erweiterungsmöglichkeiten)

## 🌟 Funktionen/Inhalte

- Authentifizierung
  - Registrierung
  - Login
  - Passwort-Vergessen
- Änderung von Nutzerdaten
  - Vorname, Nachname, Klasse
  - E-Mail-Adresse
  - Passwort
- Zurücksetzen von Nutzerdaten
  - Merkliste zurücksetzen
  - Aktivitäten zurücksetzen
- Startseite
  - Anzeige von begonnenen Lektionen mit Statusleiste (% abgeschlossen)
  - To-Dos abhängig von Klasse des Nutzers
- Gerüst für Lerninhalte unterteilt in Themen, Unterthemen und Lektionen
  - Animationen bei Navigation in Unterseiten
  - Anzeige von abgeschlossenen/noch nicht abgeschlossenen Themen, Unterthemen und Lektionen
- Lern-Stories
  - Stories in Merkliste speichern
  - Syntax-Highlighting von Code, je nach ausgewählter Sprache
  - Überprüfung von Aufgaben
  - Text-Story: Textinhalt mit optionalem Code-Beispiel
  - Quiz-Story: Single-Choice Aufgaben mit beliebig vielen Antwortmöglichkeiten
  - Sortier-Story: Code-Zeilen durch Drag & Drop in die richtige Reihenfolge bringen
- Suchfunktion
  - Suche innerhalb von Themen, Unterthemen und Lektionen
- Merkliste
  - Darstellung von gespeicherten Stories nach Thema
  - Darstellung der Story-Nummer und des Story-Typs mit Icons
  - Erklärung der Icons in Legende
  - Direktlink zur entsprechenden Story
- Aktivitäten
  - Darstellung von Nutzeraktivitäten der letzten Woche in Diagramm
  - Anzahl in dieser Woche und total angesehener Stories
  - Aktivitäten nach Themenbereich

## 🧩 Ressourcen

| Name                    | Beschreibung                           | Typ          |
| :---------------------- | :------------------------------------- | :----------- |
| **nuxt**                | Javascript-Framework (Vue.js)          | Dependency   |
| **vuex**                | State Management für Vue.js            | Dependency   |
| **vuex-persistedstate** | Vuex Persistence und Rehydration       | Dependency   |
| **firebase**            | Firebase JavaScript Library            | Dependency   |
| **js-cookie**           | JavaScript Cookie API                  | Dependency   |
| **webpack**             | Module Bundler für JavaScript          | Dependency   |
| **babel**               | JavaScript Kompatibilitäts-Compiler    | Dependency   |
| **prettier**            | Opinionated Code Formatter             | Dependency   |
| **@tailwindcss/ui**     | Default Tailwind CSS Erweiterung       | Dependency   |
| **@nuxtjs/pwa**         | Nuxt.js PWA Modul                      | Module       |
| **@nuxtjs/firebase**    | Nuxt.js Firebase Modul                 | Module       |
| **@nuxtjs/tailwindcss** | Tailwind CSS Build Modul               | Build Module |
| **@nuxtjs/date-fns**    | Nuxt.js Date Utility Library           | Build Module |
| **vue-highlightjs**     | Syntax Highlighting für Vue.js         | Plugin       |
| **vue-trend-chart**     | Trend-Diagramm für Vue.js              | Plugin       |
| **vuedraggable**        | Drag-and-Drop Komponente für Vue.js    | Plugin       |
| **eslint**              | JavaScript Linter                      | Plugin       |
| **typeface-inter**      | npm Package für Schriftfamilie «Inter» | Typeface     |
| **Heroicons**           | SVG Vektor Icons                       | Icons        |

## 💻 Technischer Hintergrund

Für die Umsetzung einer (Mobile-Learning-)App für Android/iOS stehen zum Zeitpunkt des Lehrprojekts im Wesentlichen vier Möglichkeiten zur Auswahl:

- Umsetzung als Native-App
  - Entwicklung für spezifische Plattform
  - Getrennte Entwicklung für Android und iOS
  - z.B. Java oder Swift
- Umsetzung als Cross-Compiled-App/JavaScript-Native-App
  - Entwicklung in einer für Mobile-Betriebssysteme fremden Sprache
  - Kompilierung in native Anwendungen für jeweilige Plattform
- Umsetzung als hybride App
  - Entwicklung mit Web-Technologien
  - Darstellung auf Endgerät in Native-Wrapper mit WebView
- Umsetzung als Progressive-Web-App
  - Entwicklung mit Web-Technologien
  - Darstellung auf Endgerät über Web-Browser
  - Durch Installation App-ähnliches Erlebnis

Aufgrund des begrenzten Umfangs des Lehrprojekts und eigenen Erfahrungen entschied ich mich für letztere Variante, der Entwicklung als PWA.

Für das Frontend kommt dabei das Vue.js-Framework «Nuxt.js» zum Einsatz, im Backend Firebase Authentication (Authentifizierung) und Firebase Cloud Firestore (Datenbank).

### Nuxt.js

Nuxt.js ist als Erweiterung von Vue.js für bestimmte Einsatzzwecke zu betrachten (z.B. für Server Side Rendered Pages). Im Fall des Lehrprojekts genügt die Konfiguration als Single Page Application (SPA). Dabei punktet Nuxt.js mit vielen Konfigurationsmöglichkeiten und Funktionen.

In der Entwicklung sind folgende Befehle von Bedeutung:

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost
$ npm run dev

# generate static project (Netlify)
$ npm run generate
```

---

### Firebase

Firebase wird als «App Development Platform» vermarktet und beinhaltet unterschiedlichste Tools. Für das Lehrprojekt werden «Authentication» und «Cloud Firestore» verwendet.

«Authentication» dient der User-Verwaltung für die App. Verknüpft mit der «Cloud Firestore»-Datenbank werden neben den Zugangsdaten auch weitere Nutzerdaten, wie die Aktivitäten und Lesezeichen gespeichert. «Cloud Firestore» ist eine NoSQL-Cloud-Datenbank und lässt sich sehr flexibel einsetzen. Der Zugriff auf die Daten gelingt bspw. mit der Firebase JavaScript Library.

## 🏡 Aufbau

![Nuxt.js Firebase](https://eeenan.ramon.onl/aufbau.png)

### Grundkonfiguration

#### nuxt.config.js

`eeenan/nuxt.config.js`

Im nuxt.config.js-File können Standardkonfigurationen von Nuxt.js überschrieben werden. Darin sind zusätzliche Kopfdaten erfasst (z.B. die Referenz zu den Splash-Screens), globales CSS, purgeCSS Konfigurationen, Plugins, Module, Build Module und deren Optionen. Werden Änderungen in diesem File vorgenommen, muss ein neuer Build erstellt werden.

Für das Modul `@nuxtjs/firebase` wird im config-File die Konfiguration der Verbindung zu Firebase erstellt und die Auswahl der Services getroffen. Weiter erwähnenswert ist die Konfiguration des PWA-Moduls mit Angaben zum Manifest und den Meta-Daten.

---

### Komponenten

Wie mit Vue.js üblich baut auch Nuxt.js auf dem Konzept von Komponenten auf, sodass Templates und Logik beliebig aufgeteilt werden können. Die Kommunikation zwischen Komponenten ist identisch zu Vue.js. Im Lehrprojekt kommen zur Kommunikation **Props**, **Custom Events** (`$emit`) und **Vuex** zum Einsatz.

Komponenten, welche auf unterschiedlichen Seiten verwendet werden, befinden sich im Ordner `common`. Für übergeordnete Layout-Komponenten ist der Ordner `layout` vorgesehen. Der Ordner `ui` beinhaltet Utility-Components, die jeweils nur für eine Seite oder Funktion relevant sind. Entsprechend sind sie auch in Unterordner eingeordnet.

<details><summary><b>components/common</b></summary>

#### icons

`eeenan/components/common/icons/AppIcon.vue`

Icon-Komponente für SVG-Icons mit Dynamic Component. Übergabe Icon-Name (`icon`), Button-Variante (`button`), Icon-Grösse (`size`) und Icon-Farbe (`color`) jeweils als Props. Für alle Props sind Standard-Werte definiert. Alle Icons, welche mit der `AppIcon`-Komponente integriert werden, müssen eine `viewBox` von 20x20 Pixel besitzen.

`eeenan/components/common/icons/svg`

Verzeichnis mit allen SVG-Icons als Vue.js-Komponenten. Die Templates bestehen nur aus den Inhalten der SVG-Elemente. Besteht das Icon aus mehreren Elementen, müssen diese von einem `<g></g>`-Tag umschlossen werden.

#### logos

`eeenan/components/common/logos/LogoColor.vue`

Icon-Logo des Lehrprojekts als SVG-Komponente in Farbe

`eeenan/components/common/logos/LogoGray.vue`

Icon-Logo des Lehrprojekts als SVG-Komponente in Grautönen

#### modal

`eeenan/components/common/modal/ModalContainer.vue`

Modal-Container mit Dynamic Component für unterschiedliche Inhalte. Wird für Suche und Einstellungen verwendet. Import der `ModalTitle`-Komponente. Anzeigen/Ausblenden wird über Vuex-Store-Modul `modals.js` gesteuert. Custom-Transitions für Ein- und Ausblenden und Abdunkeln des Hintergrunds.

`eeenan/components/common/modal/ModalTitle.vue`

Modal-Title-Bar für unterschiedliche Modals. Erhält Titel als Prop (`modalTitle`). Abhängig davon, ob es sich um eine Secondary-View (`secondaryView`) handelt, wird ein Zurück-Button angezeigt.

#### AppButton.vue

`eeenan/components/common/AppButton.vue`

Wiederverwendbarer Button, der entweder als `<nuxt-link>` (erhält `to`-Prop) oder `<button>` gerendert wird. Die Farbe aller Buttons ist mit `bg-orange-500` festgelegt.

#### ContentCard.vue

`eeenan/components/common/ContentCard.vue`

Die Content-Card-Komponente kommt auf der Start- und Aktivitätenseiten zum Einsatz. Es handelt sich dabei um eine Card, welche die ganze Breite des Containers füllt. Die Inhalte werden mittels `<slot />` eingefügt.

#### FormMessage.vue

`eeenan/components/common/FormMessage.vue`

Überall, wo Rückmeldungen auf Nutzereingaben in Formularen möglich sind, wird die FormMessage-Komponente verwendet, z.B. beim Login/der Registrierung oder der Anpassung von Nutzerdaten. Die Meldung wird als Fehlermeldung mit rotem Hintergrund und X-Icon angezeigt, es sei denn die Komponente erhält im `message`-Prop `success: true`. Dann erscheint die Message grün mit einem Check-Icon.

#### ListItem.vue

`eeenan/components/common/ListItem.vue`

ListItems werden im Themenverzeichnis für die Anzeige der Unterthemen/Lektionen und in der Merkliste verwendet. In der Regel handelt es sich um einfache Links zum entsprechenden Inhalt. Hat ein Nutzer eine Lektion bereits begonnen, aber noch nicht abgeschlossen, wird dem Link ein Query angehängt, damit der Nutzer zur korrekten Story gelangt. Dasselbe ist in der Merkliste der Fall, wo eine bestimmte Story verlinkt wird.

#### MissingContent.vue

`eeenan/components/common/MissingContent.vue`

Diese Komponente wird angezeigt, wenn sich auf der Seite «Merkliste» oder «Aktivitäten» noch keine Inhalte befinden oder ein Problem mit dem Abruf von Daten aus der Datenbank besteht.

#### SubmitButton.vue

`eeenan/components/common/SubmitButton.vue`

Die SubmitButton-Komponente kommt bei Formularen zum Einsatz, z.B. beim Login/der Registrierung oder der Anpassung von Nutzerdaten. Da es sich bei den Formularaktionen um asynchrone Funktionen handelt, wird dem Nutzer während dem Senden/Laden/Warten eine Animation angezeigt und der Button ist deaktiviert. Die Daten erhält die Komponente über die Props `loading` und `text`.

</details>

<details><summary><b>components/layout</b></summary>

#### ContentBox.vue

`eeenan/components/layout/ContentBox.vue`

Die Content-Box beinhaltet den eigentlichen Inhalt der App, welcher sich bei der Navigation verändert.

#### NavTabBar.vue

`eeenan/components/layout/NavTabBar.vue`

Die NavTabBar erlaubt die Navigation innerhalb der App und wird, abgesehen von den Login/Registrierungsseiten und in den Stories, immer angezeigt. Die aktive Seite wird mit `text-orange-500` hervorgehoben.

#### PageContainer.vue

`eeenan/components/layout/PageContainer.vue`

Der PageContainer umfasst die `TitleBar` und `ContentBox`. Er wird auf allen Hauptseiten verwendet und erhält die Props `title`, `backButton`, `closeButton`, und `paddingX`.

#### TitleBar.vue

`eeenan/components/layout/TitleBar.vue`

Der Inhalt der TitleBar-Komponente ist abhängig von der Router-Position des Users. Auf Seiten der ersten Ebene werden der Seitentitel und Links zur Suche und den Einstellungen angezeigt. Auf Seiten der zweiten Ebene (Unterthemen/Lektionen) wird ein Zurück-Button dargestellt. Erreicht ein User eine Unterseite über einen Direktlink, gibt es mit dem Prop `closeButton` die Möglichkeit, zur vorherigen Seite zurückzukehren.

</details>

<details><summary><b>components/ui</b></summary>

#### bookmarks

`eeenan/components/ui/bookmarks/ListItemBookmark.vue`

Die Komponente ListItemBookmark ist für die Verwendung innerhalb einer `ListItem`-Komponente vorgesehen. Sie beinhaltet die spezifischen Inhalte für Einträge in der Merkliste (Story-Nummer und Story-Typ-Icons).

#### search

`eeenan/components/ui/search/SearchModal.vue`

Template und Logik für Suchfunktion innerhalb von Modal. In der Suche werden Themen, Unterthemen und Lektionen berücksichtigt. Sucht der Nutzer nach einem Begriff, werden die Inhalte laufend gefiltert und angezeigt. Einträge in den Suchergebnissen sind direkt verlinkt und der User kann zum passenden Inhalt navigieren. Beim Öffnen des Modals wird das Input-Feld automatisch fokussiert, damit auf Geräten mit Touch-Input die Tastatur erscheint.

#### settings

`eeenan/components/ui/settings/SettingsAction.vue`

Aktionsitems in Einstellungsmodal. Löschen/Zurücksetzen der Merkliste oder der Aktivitäten des Users. Da es sich dabei um nicht rückgangig machbare Aktionen handelt, müssen sie bestätigt werden. Nach der Druchführung wird das erfolgreiche Löschen durch eine grüne Schaltfläche und ein Icon angezeigt.

`eeenan/components/ui/settings/SettingsItem.vue`

Option im Einstellungsmodal. Verlinkt auf Seite zweiter Ebene, um verschiedene Optionen anzupassen. Die Komponente erhält als Prop das `icon`. Die Verlinkung findet bei der Verwendung der Komponente statt. Dann muss dem Handler `.native` angehängt werden: `@click.native="..."`

`eeenan/components/ui/settings/SettingsModal.vue`

Template und Logik für Einstellungen innerhalb von Modal. Beinhaltet SettingsItems, SettingsActions und SettingsSecondaryViews.

`eeenan/components/ui/settings/SettingsSecondaryViews`

Templates und Logik für die drei Unterseiten `ChangeEmail`, `ChangePassword` und `ChangePersonal`. Beinhalten Formulare für Anpassung der Nutzerdaten. Bestehende Nutzerdaten werden aus dem Store abgerufen und bei Änderungen an den Store gesendet. Für die Änderung der E-Mail-Adresse und des Passworts muss sich der User erneut authentifizieren, damit Firestore die Aktion in jedem Fall durchführen kann.

#### start

`eeenan/components/ui/start/ContinueStory.vue`

UI-Komponente für die Anzeige von durch den User begonnenen Lektionen. Die Komponente erhält Details zur `lesson` und das `query` zur Verlinkung der korrekten Story. Mit dem Balken im unteren Bereich der Karte wird der Fortschritt des Users innerhalb der Lektionen dargestellt.

#### stories

`eeenan/components/ui/stories/CheckAnswer.vue`

Die CheckAnswer-Komponente wird angezeigt, wenn eine Antwort in Quiz- oder Sortier-Stories durch den Nutzer überprüft wird. Ob die Komponente als «korrekt» oder «falsch» angezeigt wird, hängt vom Prop `display` ab (`correct` oder `wrong`).

`eeenan/components/ui/stories/StoryControls.vue`

Die StoryControls erlauben die Navigation und Steuerung einer Lektion. Die Darstellung und Aktivierung der Buttons ist abhängig von der aktuellen Story, dem Story-Typ (muss überprüft werden oder nicht) und davon, ob es sich um die erste oder letzte Story in einer Lektion handelt. Eine Quiz-Story muss zuerst beantwortet werden, bevor sie überprüft werden kann. Bei Quiz- und Sortier-Stories kann erst mit der nächsten Story fortgefahren werden, wenn die aktuelle Story korrekt beantwortet wurde.

`eeenan/components/ui/stories/StoryQuiz.vue`

Beim Story-Typ «Quiz» handelt es sich um eine einfache Komponente für Single-Choice-Fragen. Details zum Inhalt erhält die Komponente mit dem Prop `story`, das auch alle Antwortmöglichkeiten (`answers`) und ein Verweis auf die korrekte Antwort (`correct`) enthält.

`eeenan/components/ui/stories/StorySort.vue`

Sortier-Stories beruhen auf der StorySort-Komponente. Das Syntax-Highlighting von Code-Zeilen wird durch die `vue-highlightjs`-Komponente gemacht. Für die Drag-and-Drop-Funktionalität kommt `vuedraggable` zum Einsatz. Die Code-Zeilen werden in der Komponente in eine zufällige Reihenfolge gebracht. Bei der Überprüfung wird die durch den User festgelegte Reihenfolge mit der korrekten Reihenfolge verglichen.

`eeenan/components/ui/stories/StoryText.vue`

Der Story-Typ «Text» ist für Erklärungen gedacht. Neben der Anzeige von Lauftext besteht die Möglichkeit, Beispiel-Code darzustellen, der mit `vue-highlightjs` formatiert wird.

`eeenan/components/ui/stories/StoryTitle.vue`

Die StoryTitle-Komponente umfasst einen Button, mit dem Stories der Merkliste hinzugefügt werden können, den Titel der aktuellen Lektion und einen Button zum Schliessen der Lektion. Zusätzlich wird eine Leiste mit dem Lektionsfortschritt angezeigt. Alle nötigen Daten erhält die Komponente durch Props von der `_lesson.vue`-Page. Beim Hinzufügen oder Entfernen einer Story zu/von der Merkliste wird ein Hinweis eingeblendet.

#### start

`eeenan/components/ui/topics/ListItemTopic.vue`

Die Komponente ListItemTopic ist für die Verwendung innerhalb einer `ListItem`-Komponente vorgesehen. Sie beinhaltet die spezifischen Inhalt für Einträge im Themen-Verzeichnis (Icon für noch nicht abgeschlossene oder abgeschlossene Unterthemen/Lektionen, Text).

`eeenan/components/ui/topics/TopicItem.vue`

Die übergeordneten Topics auf der Seite «Themen» werden mit der TopicItem-Komponente dargestellt. Die einzelnen Themen werden mit Bild und Text angezeigt und verlinken zur Ansicht der Unterthemen.

</details>

---

### Layouts

Layouts in Nuxt.js sind nützlich für Boilerplate, das auf mehreren Seiten angezeigt werden soll. Auf Seiten mit demselben Layout können zudem Page-Transitions angewendet werden. Die Auswahl des zu verwendeden Layouts ist individuell auf jeder Page möglich. Wird kein Layout angegeben, wird das `default`-Layout verwendet. ([Referenz](https://nuxtjs.org/guide/views/#layouts))

#### default.vue

`eeenan/layouts/default.vue`

Das `default`-Layout ist für die Anzeige der Standard-Pages zuständig (Startseite, Themen, Merkliste, Aktivitäten). Es umfasst die Komponenten `NavTabBar` und `ModalContainer`. Wird eine Seite mit `default`-Layout geladen, wird in der `mounted`-Lifecycle-Hook überprüft, ob sich alle nötigen Daten im Vuex-Store befinden und ruft diese, falls nötig, ab.

#### fullscreen.vue

`eeenan/layouts/fullscreen.vue`

Auf einigen Seiten wird aus praktischen Gründen oder Platzmangel auf Elemente aus dem `default`-Layout verzichtet (Login/Registrierung, Stories). In diesen Fällen kommt das Layout `fullscreen` zum Einsatz. Für Seiten, welche die gesamte Bildschirmhöhe einnehmen sollen, muss aufgrund von Einschränkungen von `height: 100vh;` in mobilen Browsern eine CSS Custom Property verwendet werden. Die tatsächlich dargestellte Höhe wird so dynamisch über JavaScript abgerufen. ([Referenz](https://css-tricks.com/the-trick-to-viewport-units-on-mobile/))

---

### Middleware

Middleware kann in Nuxt.js für sehr viele Einsatzzwecke verwendet werden. In dem im Lehrprojekt verwendeten SPA-Mode wird Middleware client-seitig beim ersten Request abgerufen, anschliessend bei der Navigation auf andere Seiten. ([Referenz](https://nuxtjs.org/guide/routing#middleware))

#### checkAuth.js

`eeenan/middleware/checkAuth.js`

Angelehnt an einen Navigation Guard überprüft `checkAuth.js` aufgrund der Daten im Vuex-Store, ob ein User berechtigt ist, eine Seite aufzurufen. Nicht angemeldete User dürfen nur die Seiten `index`, `register` und `reset-password` aufrufen. Versuchen angemeldete User eine dieser Seiten aufzurufen, werden sie auf die Startseite umgeleitet.

---

### Mixins

Mixins können in Nuxt.js für ausgewählte Komponenten oder Seiten verwendet werden, indem sie importiert werden und darauf verwiesen wird. ([Referenz](https://vuejs.org/v2/guide/mixins.html))

#### startWithStory.js

`eeenan/mixins/startWithStory.js`

Das Mixin `startWithStory` wird auf der Startseite und in der Ansicht eines Unterthemas verwendet, damit begonnene Lektionen mit der folgenden Story fortgesetzt werden. Die Methode gibt ein Query `start` mit dem Key der ersten nicht abgeschlossenen Story zurück.

#### subtopicFinished.js

`eeenan/mixins/subtopicFinished.js`

Das Mixin `subtopicFinished` wird auf der Startseite und in der Ansicht eines Themas verwendet, um zu überprüfen, ob ein Nutzer alle Lektionen eines Unterthemas abgeschlossen hat. Ist dies der Fall, werden die entsprechenden Unterthemen in den To-Dos auf der Startseite oder in der Ansicht eines Themas als erledigt angezeigt.

---

### Pages

Pages in Nuxt.js sind grundsätzlich ebenfalls Komponenten. `.vue`-Files im Pages-Folder erhalten jedoch einige zusätzliche Attribute und werden automatisch als Routen erfasst. Dynamische Routen werden mit einem Unterstrich als Prefix von Pages definiert. ([Referenz](https://nuxtjs.org/guide/views#pages))

<details><summary><b>activities.vue</b></summary>

`eeenan/pages/activities.vue`

Die Seite «Aktivitäten» gibt einen Überblick über die Aktivitäten des angemeldeten Users. In der ersten ContentCard wird ein Diagramm der in den letzten sieben Tagen angesehenen Stories angezeigt. Die Darstellung erfolgt mit `vue-trend-chart` als SVG. Die Berechnungen dazu finden in der Computed-Property `finishedStoriesWeek` statt und werden der Komponente in den Props `dataset` und `labels` übergeben. Die zweite und dritte ContentCard zeigen die Summe in dieser Woche (`finishedStoriesWeek.total`) und total (`numberOfFinishedStories`) abgeschlossener Stories. Als vierte ContentCard werden die bearbeiteten Stories nach Thema aufgeteilt dargestellt (`finishedStoriesSorted`).

</details>

<details><summary><b>bookmarks.vue</b></summary>

`eeenan/pages/bookmarks.vue`

Die Seite «Merkliste» listet durch den Nutzer gespeicherte Stories auf. Da die gemerkten Stories in der Datenbank nicht nach Thema/Unterthema/Lektion sortiert sind, wird dies im Computed-Property `bookmarksSorted` gemacht. Da sich in der Merkliste einzelne Stories befinden, muss nicht auf das Mixin `startWithStory` zurückgegriffen werden. Für das Query wird jeweils lediglich die komponenteneigene Methode `startWithStory` mit dem Parameter `story.id` aufgerufen.

</details>

<details><summary><b>index.vue</b></summary>

`eeenan/pages/index.vue`

Die `index`-Seite der App beinhaltet das Login-Formular. Die Login-Methode versucht, das Login asynchron über den Vuex-Store und die Firebase Authentication durchzuführen. Ist das Login erfolgreich, wird der User auf die Startseite weitergeleitet. Andernfalls wird eine Fehlermeldung mit entsprechendem Text angezeigt (Computed-Property `message`). Die Index-Seite beinhaltet auf mobilen Geräten mit iOS auch den Hinweis, dass die PWA über das Share Sheet installiert werden kann. Die Anzeige wird über den Vuex-Store und das `pwaBanner`-Plugin gesteuert. Auf Geräten mit Android wird ein Hinweis vom Betriebssystem angezeigt.

</details>

<details><summary><b>register.vue</b></summary>

`eeenan/pages/register.vue`

Über die Index-Seite kann die Registrieren-Page erreicht werden. Bei der Registrierung werden der Vorname, Nachname, die Klasse (als Beispiel für das Lehrprojekt), die E-Mail-Adresse und ein Passwort benötigt. Ist die Registrierung erfolgreich, wird der User angemeldet und auf die Startseite weitergeleitet. Andernfalls wird eine Fehlermeldung mit entsprechendem Text angezeigt (Computed-Property `message`).

</details>

<details><summary><b>reset-password.vue</b></summary>

`eeenan/pages/reset-password.vue`

Ebenfalls über die Index-Seite ist die Page zum Zurücksetzen des Passworts erreichbar. Der Passwort-Zurücksetzen-Prozess wird über die E-Mail-Adresse des Nutzers gestartet. Auch hier ist es möglich, dass Fehlermeldungen entstehen, welche über die `message`-Methode abgefangen werden. Wurde erfolgreich eine E-Mail zum Zurücksetzen des Passworts versendet, wird der Nutzer auf die Login-Seite (`index`) weitergeleitet und es wird eine Erfolgsmeldung angezeigt.

</details>

<details><summary><b>start.vue</b></summary>

`eeenan/pages/start.vue`

Die Seite `Start` ist die Startseite für angemeldete User. Sie soll dem Nutzer aktuelle Informationen darstellen. Im Rahmen des Lehrprojekts sind dies begonnene, noch nicht abgeschlossene Lektionen und aktuelle To-Dos, abhängig von der ausgewählten Klasse. Die To-Dos in der zweiten ContentCard werden mit Datum und Thema/Unterthema angezeigt.

</details>

<details><summary><b>topics</b></summary>

`eeenan/pages/topics/index.vue`

Abruf und Anzeige der übergeordneten Themen mit `TopicItem`-Komponente. Link zu Darstellung der Unterthemen.

`eeenan/pages/topics/_topic/index.vue`

Abruf und Anzeige der Unterthemen eines übergeordneten Themas mit `ListItem`- und `ListItemTopic`-Komponente. Link zu Darstellung der Lektionen.

`eeenan/pages/topics/_topic/_subtopic/index.vue`

Abruf und Anzeige der Lektionen eines übergeordneten Unterthemas mit `ListItem`- und `ListItemTopic`-Komponente. Link zu Darstellung der Stories einer Lektion. Einsatz des `startWithStory`-Mixins.

`eeenan/pages/topics/_topic/_subtopic/_lesson.vue`

Dynamische Seite zur Anzeige der Inhalte einer Lektion. Die Stories werden mit der Computed-Property `stories` aus dem Store abgerufen. Die dynamische Komponente lädt daraufhin alle Stories der Lektion anhand von `story.type`. Daneben werden die Komponenten `StoryTitle`, `CheckAnswer` und `StoryControls` eingebunden, welche die Props der aktuellen Story erhalten. Die Instanz der `StoryControls`-Komponente hört auf die Custom Events `prev-story`, `check-answer`, `next-story` und `finish-lesson` und ruft entsprechende Methoden auf.

</details>

---

### Plugins

Plugins können in Nuxt.js für JavaScript-Plugins, Vue-Libraries, externe Module oder eigene Plugins verwendet werden. ([Referenz](https://nuxtjs.org/guide/plugins))

#### fetchData.js

`eeenan/plugins/fetchData.js`

Über das Plugin `fetchData` werden beim Start der App Inhalte aus der Datenbank geladen bzw. die dafür vorgesehenen Actions im Store aufgerufen.

#### globalComponents.js

`eeenan/plugins/globalComponents.js`

Einige Komponenten werden in sehr vielen anderen Komponenten oder Seiten eingesetzt. Das wiederholte Importieren und Registrieren wird umgangen, indem diese Komponenten im Plugin `globalComponents` importiert und global registriert werden. Neben einigen einzelnen Komponenten werden via `ComponentContext` sämtliche Icons aus dem Ordner `~/components/common/icons/svg` für die globale Verwendung in der App definiert.

#### persistedState.js

`eeenan/plugins/persistedState.js`

Über das Plugin `persistedState` werden die Packages `vuex-persistedstate` und `js-cookie` importiert und deren Optionen definiert. Mit der Kombination dieser beiden Packages kann der Vuex-Store oder Teile des Vuex-Stores in einem Cookie gespeichert werden. Für das Lehrprojekt wurde mit `paths: ['auth.user']` festgelegt, dass lediglich die User-Identifikation im Cookie gespeichert werden soll, damit keine Probleme mit der Übereinstimmung von anderen Daten auftreten.

#### pwaBanner.js

`eeenan/plugins/pwaBanner.js`

Das Plugin `pwaBanner` überprüft, ob es sich beim User Agent um ein Gerät mit iOS handelt und ob die Applikation bereits im Standalone Mode (als PWA) läuft. Je nach Ergebnis dieser Überprüfung wird die Vuex-Mutation `showInstallMessage` aufgerufen. Die Information aus dem Store wird auf der Login-Page (`index`) verwendet um ein Banner anzuzeigen.

#### utils.js

`eeenan/plugins/utils.js`

Das Plugin `utils` ist für JavaScript-Utility-Funktionen angedacht. Im Rahmen des Lehrprojekts beinhaltet es bisher lediglich eine Helfer-Funktion für den Abruf von Daten in verschachtelten Objekten.

#### vueHighlightjs.js

`eeenan/plugins/vueHighlightjs.js`

In diesem Plugin wird das Vue-Plugin `vue-highlightjs` für Vue importiert. Es dient dem Syntax-Highlighting von Code und basiert auf `highlight.js`. Die Komponente kann global in allen anderen Komponenten eingesetzt werden. Der Komponente wird die Programmiersprache als Klasse übergeben. Das Styling für die verschiedenen Code-Blocks befindet sich im File `~/assets/css/tailwind.css`.

#### vueTrendChart.js

`eeenan/plugins/vueTrendChart.js`

In diesem Plugin wird das Vue-Plugin `vue-trend-chart` für Vue importiert. Die Komponente kommt als `TrendChart` auf der Seite «Aktivitäten» zum Einsatz. Das Plugin erstellt aus den bereitgestellten Daten ein Trend-Diagramm als SVG.

---

### Store

Die Vue.js State Management Library «Vuex» gehört zum Core von Nuxt.js. Im Lehrprojekt wird der Store mit namespaced Modulen verwendet. ([Referenz](https://nuxtjs.org/guide/vuex-store))

#### auth.js

`eeenan/plugins/auth.js`

Das Modul `auth.js` beinhaltet die Vuex Actions für alle Funktionen rund um die Authentifizierung von Usern (Registrierung, Login, Passwort zurücksetzen, Logout). Dabei kommt das `@nuxtjs/firebase`-Module zum Einsatz. Die Actions werden asynchron definiert und geben Promises zurück. Fehler werden jeweils durch die `catch`-Exception bearbeitet.

#### index.js

`eeenan/plugins/index.js`

Das Modul `index.js` bildet den Hauptstore der Applikation und beinhaltet `topics`, `subtopics`, `lessons`, `stories`, `classes`, `searchObject` und den Boolean-Wert zu `showInstallMessage`. Neben den `fetch`-Actions mit `@nuxtjs/firebase` werden in der Action `setSearchObject` die Einträge aus der Datenbank normalisiert und für die Verwendung in der Schnellsuche vorbereitet.

#### modals.js

`eeenan/plugins/modals.js`

Das Modul `modals.js` steuert die Anzeige der beiden Modals «Einstellungen» und «Schnellsuche», kann aber auch beliebig und dynamisch weitere Modale bearbeiten. Das DOM beinhaltet jeweils immer nur höchstens eine Modal-Komponente. Im State wird unter dem Key `lastModal` der Name des aktuell angezeigten bzw. zuletzt angezeigten Modals vermerkt. `modalVisible` definiert, ob das Modal aktuell angezeigt wird. Für die beiden States sind keine Actions nötig. Anpassungen werden direkt über die Mutations mit `commit` vorgenommen.

#### user.js

`eeenan/plugins/user.js`

Das Modul `user.js` kümmert sich um den State der individuellen Nutzerdaten (`finishedStories`, `bookmarks`, `immClass`, `firstClass`, `lastName`, `email`, `message`). Die Daten werden mit `@nuxtjs/firebase` aus der Datenbank abgerufen oder in die Datenbank geschrieben. Die Actions umfassen auch die Anpassung von User-Daten (`changePersonal`, `changeEmail`, `changePassword`), welche übder das Einstellungs-Modal vorgenommen werden können.

---

### Authentifizierung

Da für die App als Datenbank Firebase Cloud Firestore eingesetzt wird, ist es naheliegend, für die Authentifizierung «Firebase Authentication» zu verwenden. Als Sign-In Methode wurde für das Lehrprojekt die Kombination einer E-Mail-Adresse und eines Passwort eingerichtet. Einige Punkte, wie vorgefertigte Vorlagen für die Bestätigung der E-Mail-Adresse, Nachrichten für das Zurücksetzen des Passworts und Änderung der E-Mail-Adresse erleichtern dabei den Einstieg. Es besteht auch die Möglichkeit eine vorgefertigte UI für das Login zu verwenden. Für das Lehrprojekt wurde sich jedoch gegen eine vorgefertigte Lösung entschieden, welche sich nicht in das Design der App eingefügt hätte.

Die Authentifizierung spielt auch bei den Zugriffsregeln auf die Datenbank eine Rolle. Folgende Konfiguration wurde vorgenommen:

```bash
service cloud.firestore {
  match /databases/{database}/documents {
    match /topics/{document=**} {
      allow read;
    }
    match /subtopics/{document=**} {
      allow read;
    }
    match /lessons/{document=**} {
      allow read;
    }
    match /stories/{document=**} {
      allow read;
    }
    match /classes/{document=**} {
      allow read;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

### Cloud Firestore

Als NoSQL-Datenbank kommt «Firebase Cloud Firestore» mit etwas anderen Herausforderungen daher als SQL-Datenbanken. Für die Implementierungen können unterschiedliche Konzepte verfolgt werden. Im Lehrprojekt wurde versucht, die Strukturierung mit möglichst flachen Sammlungen und Dokumenten zu gestalten.

- users (1 Dokument pro User)
  - firstName (String), lastName (String), immClass (String), email (String)
  - bookmarks (Array), finishedStories (Map)
- classes (1 Dokument pro Klasse)
  - name (String)
  - todos (Map)
- topics (1 Dokument pro Thema)
  - ordering (Zahl)
  - title (String)
  - color (String)
- subtopics (1 Dokument pro Thema, 1 Feld pro Unterthema)
  - ordering (Zahl)
  - title (String)
- lessons (1 Dokument pro Thema, 1 Feld pro Unterthema, 1 Feld pro Lektion)
  - ordering (Zahl)
  - title (String)
- stories (1 Dokument pro Thema, 1 Feld pro Unterthema, 1 Feld pro Lektion, 1 Feld pro Story)
  - StoryText:
    - ordering (Zahl)
    - type (String)
    - content (String)
    - example (String, optional)
    - language (String, optional)
  - StoryQuiz:
    - ordering (Zahl)
    - type (String)
    - question (String)
    - answers (Array)
    - correct (Zahl)
  - StorySort:
    - ordering (Zahl)
    - type (String)
    - question (String)
    - items (Array)
    - language (String)

---

### Deployment

Die durch Nuxt.js generierte SPA wird als PWA über Netlify mit Continuous Deployment veröffentlicht.

## 🎨 Design/Styling

![Farben](https://eeenan.ramon.onl/colors.png)

Der Aufbau der App wurde für das Lehrprojekt grob mit Wireframes skizziert (Low-Fidelity). Ein Grossteil des Designs geschah anschliessend direkt durch Prototyping im Code. Dafür wurde das Low-Level CSS Framework Tailwind CSS eingesetzt. Der Workflow gestaltete sich damit sehr flüssig, das Framework gilt als wenig «opinionated» und ist an verschiedenste Bedürfnisse anpassbar. Da in der Arbeit mit Nuxt.js ohnehin der Einsatz von Komponenten vorgesehen ist, war die Nutzung der integrierten Utility-Classes eine grosse Erleichterung.

---

### tailwind.config.js

`eeenan/tailwind.config.js`

Im Konfigurations-File von Tailwind CSS wurden einige Standardeinstellungen überschrieben. Darunter die Schriftfamilie, einige Farben sowie Pseudo-Class-Varianten. Weiter wird das Plugin `@tailwindcss/ui` importiert, welches für das Styling der Form-Elemente zum Einsatz kam.

---

### tailwind.css

`eeenan/assets/css/tailwind.css`

Das CSS-File importiert die integrierten Tailwind-Klassen. Globales Custom-CSS war lediglich für die verwendeten Überschriften und das Styling des Syntax-Highlighting von `vue-highlightjs` nötig. Dabei werden Tailwind `@apply`-Deklarationen verwendet.

---

### Logos

![Logos](https://eeenan.ramon.onl/logos.png)

Das Logo der App «eeenan» besteht in unterschiedlichen Versionen für das App-Icon, den Splash-Screen, in Farbe/Grautönen und vereinfacht für die Verwendung in kleineren Grössen (z.B. im Modal «Einstellungen» unten). Das Icon repräsentiert die Schrift-/Satzzeichen am Schluss von URL-Protokollen (z.B. https<strong>://</strong> oder ftp<strong>://</strong>).

### Schriftfamilie

Die Schriftfamilie in der App und im Logo ist [Inter](https://rsms.me/inter).

## 📬 Erweiterungsmöglichkeiten

Für die Erweiterung der App wären folgende Funktionen denkbar:

### Gamification

Gamification in Lern-Apps kann die Motivation der Lernenden fördern. Einige Bildungsapps, auch aus anderen Kategorien, verwenden Gamification- und/oder Community-Elemente, wie Ranglisten, Profile oder Funktionalitäten für die Kommunikation mit anderen Nutzern.

---

### Push-Mitteilungen

Um den Microlearning-Aspekt der App zu fördern, wären für einige Nutzer möglicherweise optionale Push-Mitteilungen nützlich. Nach wie vor ist dies eine Einschränkung für Progressive Web Apps mit dem Betriebssystem iOS, welches diese Funktionalität nicht unterstützt.
