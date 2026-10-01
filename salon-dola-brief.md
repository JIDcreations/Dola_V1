# Salon Dola: website brief

One-pager voor Salon Dola, vrouwenkapper in Moerbeke. Gebouwd door 2X8.

## Context

- Eigenaar: **Tim**. Professioneel, strak, fashion-minded, zeer persoonlijk in zijn aanpak.
- Het salon is **bij Tim thuis**: privé, rustig, gezellig. Geen winkelstraatzaak.
- Adres: Spelonckvaart 12, 9180 Moerbeke, Oost-Vlaanderen
- Instagram: https://www.instagram.com/salondola/
- Facebook: https://www.facebook.com/p/Salon-Dola-100063543611229/
- Positionering (van zijn bord): **Kleur & haarextensionspecialist. Dameskapsalon. Op afspraak.**
- Telefoon: **09 223 25 65**
- Afspraken: momenteel enkel telefonisch. Nieuw: aanvraagformulier, Tim neemt zelf contact op.
- Werkt met **zijn eigen extensionmerk en eigen werkwijze**. Behandelt **geen extensions die elders geplaatst zijn**.

## Doel

Een site met **wow-effect** die voelt als een privé-atelier van een modehuis. Strak, chic, professioneel. De warmte zit in de sfeer, niet in humor of gimmicks.

## Toon

- Zelfzeker, sober, kort. Geen grapjes, geen uitroeptekens.
- Copy in het Nederlands, eerste persoon (Tim) waar persoonlijk, bezoeker aanspreken met "je".
- Geen em dashes, geen emoji's, geen decoratieve iconen.
- **Geen dieren als thema of sectie.** Ze mogen hooguit natuurlijk in sfeerfoto's staan.

## Branding

Het logo is puur typografisch: "SALON" dun met zeer wijde letterspatiëring, daaronder "DOLA." groot en strak. Geen beeldmerk. **De typografie is de stijl.**

Logo-bestanden (nagebouwd als vector, zie map `logo/`):
- `salon-dola-logo-wit.svg` en `salon-dola-logo-zwart.svg` (transparant)
- `salon-dola-logo-wit-op-zwart.svg` en `salon-dola-logo-zwart-op-wit.svg`
- Paths hebben id's `#salon` en `#dola`, handig voor aparte animatie.

Kleuren: zwart-wit, zoals zijn bord.

| Token | Waarde | Gebruik |
|---|---|---|
| `--ink` | #141414 | hoofdkleur, achtergrond, gebroken zwart |
| `--ink-2` | #1E1E1E | vlakken, kaarten |
| `--paper` | #FAFAFA | tekst op zwart, lichte secties |
| `--mute` | #8A8A8A | secundaire tekst, labels |
| `--line` | rgba(250,250,250,.12) | lijnen |

Geen accentkleur. Contrast komt uit zwart-wit en fotografie.

Typografie:
- **Outfit** (Google Fonts, variabel). Dit is de letter van het logo: "DOLA." is Outfit ~450, "SALON" Outfit ~300.
- Koppen: Outfit 400 à 500, heel groot, strak, licht negatieve letter-spacing (-.03em), net als "DOLA."
- Labels: Outfit 300, uppercase, letter-spacing .5em, zoals "SALON"
- Body: Outfit 300 à 400
- Eén familie, spelen met schaal en spatiëring. Geen tweede lettertype.

## Kernidee: de punt

De punt achter "DOLA." is het signatuur-element van de site. Een punt is een statement: kort, zeker, af.

- **Intro**: het logo staat groot op zwart. Bij scroll zoomt de site in op de punt, die uitgroeit tot een volledig scherm en de eerste sfeerfoto van het salon onthult. Gevoel: je stapt binnen.
- **Koppen eindigen op een punt**, kort en zelfzeker: "Tim." "Het salon." "Werk." "Extensions."
- **Foto's** verschijnen via een mask-reveal die vanuit een punt openklapt (clip-path circle 0% naar 100%).
- **Cursor** (desktop): de punt. Groeit bij hover over foto's en links, op foto's met label "Bekijk".
- **"SALON"-spatiëring** als ritme: labels en sectienummers met dezelfde wijde letterspatiëring.

## Animatie

- Traag en zacht. Luxe voelt rustig, nooit druk.
- Smooth scroll met **Lenis**, scroll-animaties met **GSAP + ScrollTrigger**.
- Koppen: regels schuiven op uit een mask (line reveal).
- Foto's: circle reveal + lichte parallax.
- Zwart-wit foto's met warme toon, kleur bij hover (desktop).
- Respecteer `prefers-reduced-motion`: dan enkel fades.

## Structuur en copy

Copy is een eerste voorstel, kort houden.

### 00 Intro / cover
- Logo groot, gecentreerd op zwart. "SALON" en "DOLA." komen apart binnen (eerst de spatiëring van SALON die openschuift, dan DOLA. met de punt als laatste).
- Eronder klein: `KLEUR & HAAREXTENSIONSPECIALIST · DAMESKAPSALON`
- Scroll-hint: `SCROLL`
- Vaste kleine nav rechtsboven: `Afspraak` (knop) + menu

### 01 Tim
- Label: `01 · DE KAPPER`
- Kop: *Tim.*
- Subkop: Elk kapsel begint bij jou.
- Tekst: "Ik ben Tim. Ik werk niet aan de lopende band, ik werk voor jou. Met oog voor mode, voor detail en voor wat bij je past. Elke afspraak krijgt mijn volle aandacht."
- Portret van Tim, groot, editorial uitsnede

### 02 Het salon
- Label: `02 · HET SALON`
- Kop: *Geen zaak. Een thuis.*
- Tekst: "Salon Dola is bij mij thuis, in het groen van Moerbeke. Een rustige, warme plek waar je even helemaal tot rust komt. Geen drukte, geen wachtrij. Alleen jij."
- 2 à 3 sfeerfoto's van het salon in asymmetrische editorial layout

### 03 Werk
- Label: `03 · WERK`
- Kop: *Werk.*
- Horizontale scroll-galerij (gepind) op desktop, swipe op mobiel
- Zwart-wit, kleur bij hover
- Afsluiten met link: `Meer op Instagram`

### 04 Extensions
- Label: `04 · EXTENSIONS`
- Kop: *Eigen merk. Eigen werkwijze.*
- Tekst: "Ik werk met mijn eigen extensions en mijn eigen techniek, van plaatsing tot onderhoud. Zo kan ik de kwaliteit garanderen."
- Huisregel, visueel apart, groot in een dun lijnkader: "**Extensions die elders geplaatst zijn, behandel ik niet.**"
- Merknaam en eventueel productfoto: placeholder

### 05 Afspraak
- Label: `05 · AFSPRAAK`
- Kop: *Op afspraak.*
- Twee kolommen:
  - **Bel**: `09 223 25 65`, heel groot, klikbaar (`tel:+3292232565`). "Liefst tijdens de openingsuren."
  - **Aanvraag**: formulier. "Laat je gegevens achter, ik neem zelf contact met je op."
- Formuliervelden:
  - Naam (verplicht)
  - Telefoon (verplicht)
  - E-mail
  - Behandeling: knippen, kleuren, brushing, extensions, anders (pills, meerdere keuzes)
  - Voorkeur dag/moment: vrij tekstveld of dag-pills
  - Bericht
  - Checkbox bij extensions: "Ik heb geen extensions die elders geplaatst zijn." (enkel tonen als extensions gekozen is)
- Na verzenden: rustige bevestiging, de punt pulseert zacht: "Bedankt. Ik neem snel contact met je op."
- Verzending via Formspree of Web3Forms (geen backend nodig), naar mailadres van Tim (placeholder)

### 06 Praktisch / footer
- Adres + link naar Google Maps (route)
- Openingsuren: placeholder
- Telefoon, e-mail, Instagram, Facebook
- Groot logo of "DOLA." als afsluiter, onderaan klein: `© Salon Dola · Website door 2X8`

## Techniek

- Statische site: **Astro** of plain HTML/CSS/JS met Vite. Geen zwaar framework nodig.
- GSAP + ScrollTrigger, Lenis
- Afbeeldingen: AVIF/WebP, responsive `srcset`, lazy loading
- Mobile first. Punt-intro moet ook op mobiel vlot werken, geen custom cursor op touch.
- Toegankelijkheid: voldoende contrast, focus states, labels op formuliervelden, alt-teksten
- Lighthouse 90+ op alle onderdelen

## SEO

- Title: `Salon Dola · Kapper in Moerbeke`
- Description: "Dameskapsalon van Tim in Moerbeke. Kleur en haarextensionspecialist, met extensions van eigen merk. Op afspraak."
- LocalBusiness / HairSalon structured data (JSON-LD) met adres, telefoon, uren, Instagram
- Open Graph-beeld: logo wit op zwart

## Nog aan te leveren door Tim

- Portret van Tim, foto's van het salon, foto's van werk (hoge resolutie)
- Mailadres (voor het formulier)
- Openingsuren
- Naam van zijn extensionmerk
- Prijzen tonen of niet

Tot dan: nette placeholders in dezelfde stijl (zwarte vlakken met de punt), niets dat er "onaf" uitziet.
