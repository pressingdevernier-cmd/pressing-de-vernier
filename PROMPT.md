# Site web — Pressing de Vernier

Tu vas concevoir et écrire le site d'un pressing genevois. Tout ce qui suit
est établi et validé : la marque, la palette, la typographie, les contenus
et les tarifs. Tu es libre de la mise en page, de l'architecture des pages
et de la composition — les éléments graphiques ci-dessous sont un patrimoine
à employer là où tu les juges justes.

---

## 1 · L'établissement

| | |
|---|---|
| Nom commercial | **Pressing de Vernier** |
| Raison sociale | MDCA Sàrl |
| Adresse | 201 route de Vernier, 1214 Vernier |
| Canton | Genève, Suisse |
| Téléphone | 022 341 68 18 — format international `+41223416818` |
| Courriel | pressingdevernier@gmail.com |
| Établi à Vernier depuis | 2006 |
| Coordonnées | latitude 46.2118, longitude 6.0855 |

Une seule adresse, une seule équipe. L'accueil se fait sans rendez-vous.

### Horaires

| Jour | Ouverture |
|---|---|
| Lundi à vendredi | 8h00 – 12h30 · 13h30 – 18h30 |
| Samedi | 8h00 – 12h00 |
| Dimanche | Fermé |

---

## 2 · L'objectif du site

Le site n'a que deux fins. Le visiteur doit **appeler le 022 341 68 18**, ou
**se déplacer au 201 route de Vernier**. Il n'y a ni panier, ni formulaire de
devis, ni prise de rendez-vous : le dépôt se fait au comptoir, et le prix
d'une pièce particulière se convient de vive voix.

Toute la mise en page sert ces deux actions.

- **Le téléphone est atteignable depuis n'importe quelle page sans faire
  défiler.** C'est une contrainte de mise en page, pas une préférence : il
  doit être visible et actionnable dès le premier écran, sur mobile comme sur
  ordinateur, sur les six pages.
- Le numéro est toujours un lien `tel:+41223416818`, jamais un texte inerte.
- L'adresse est toujours accompagnée d'un accès à l'itinéraire, et les
  horaires disent si la maison est ouverte à l'instant où l'on regarde.
- Tout le reste — tarifs, prestations, identité — existe pour donner au
  visiteur assez de confiance pour faire l'un ou l'autre. Rien ne doit
  s'interposer entre lui et ces deux gestes.

---

## 3 · L'architecture du site

Le site s'organise autour de ce que cherche le client, pas de ce que nous
facturons. Quelqu'un arrive avec une veste tachée, un sac de linge ou une robe
à reprendre : il doit trouver sa page en un clic, pas déplier un accordéon de
tarifs.

### Les six métiers

L'accueil présente six métiers. Chaque carte mène à sa propre page — un clic,
une page. Pas de dépliant, pas de sous-menu.

| Métier | Ce qu'on y trouve |
|---|---|
| Nettoyage à sec | vêtements de ville, tenues habillées, manteaux, doudounes, soie |
| Blanchisserie | linge au kilo, literie, linge de maison, rideaux |
| Repassage | sur cintre ou plié, linge déjà lavé accepté |
| Retouches et couture | ourlets, fermetures, ajustements, doublures, sur-mesure |
| Cuir, daim, tapis et sacs | pris en charge au magasin, confiés à des spécialistes |
| Professionnels | travaux en série, volumes réguliers, collecte et livraison |

### Le modèle d'une page de métier

Une page de métier répond à deux questions, dans cet ordre, et s'arrête là :

1. **Qu'est-ce que vous faites ?** Un encadré des prestations principales,
   chacune avec une explication d'une ou deux phrases.
2. **Combien ça coûte ?** La liste des prix, juste en dessous, suivie d'un
   accès bien visible à la grille complète.

**Et c'est tout.** Pas de mise en scène, pas de transition, rien qui raconte
ou justifie. C'est un pressing de quartier, pas une maison de luxe : le
visiteur veut savoir ce qu'on fait et ce que ça coûte, pas lire une page.

**Une page doit tenir en deux écrans d'ordinateur**, en comptant l'en-tête et
le pied. Ces pages ont été construites une première fois autrement — avec une
pesée animée sur Blanchisserie, trois finitions comparées sur Repassage, un
parcours en quatre étapes sur Cuir. Les idées étaient justes, la mise en scène
faisait trop : elles ont été ramenées à deux phrases dans l'encadré, et le
reste a été retiré. Ce qui subsiste de ces idées se lit dans une case du
tableau, pas dans une section.

**La liste des prix est un extrait.** Elle ne montre que les premières lignes
de chaque rubrique — celles de `data/tarifs.js`, dans l'ordre où elles y sont
écrites, donc les plus courantes — et annonce combien d'articles restent, avec
le lien qui y mène. La literie compte dix-sept lignes : les afficher toutes
ferait mille pixels et ferait de la page un doublon de la page Tarifs.

### La page Tarifs

Elle devient une **annexe**, pas la porte d'entrée. On l'ouvre en sachant déjà
ce qu'on cherche — un prix précis, une ligne particulière. Elle n'a plus à
porter la découverte du site : les pages de métier s'en chargent.

Réorganisée le 6 septembre 2026. Elle faisait **15 402 px de haut** pour
**17 sections** précédées d'un sommaire de 17 ancres, sans un palier. Les
dix-sept ancres sont devenues **quatre familles**, une recherche traverse les
139 prestations, et une barre collante annonce en permanence la famille qu'on
lit. Le fonctionnement est décrit en section 8, « La page Tarifs se range
toute seule ».

### La page Retouches et couture

**Deux planches à la craie**, côte à côte : la **jupe** et le **manteau**.
Elles ne sont pas choisies au hasard — l'ourlet de jupe à 22.– est le geste le
plus demandé de l'atelier, et la fermeture ou la doublure de manteau, de 55 à
170.–, en est le travail le plus technique. Les deux extrémités du panier, sans
qu'aucune ligne se répète d'une planche à l'autre.

Les trois autres dessins — chemise, robe, complet — restent dans
`assets/vetements.js`. La page choisit ses pièces dans son attribut
`data-planches` : les remettre tient en un mot, sans toucher au code.

Chaque planche porte les prestations les plus demandées, à l'endroit qu'elles
concernent, avec la mention discrète **« prix indicatifs »**. Un bouton très
visible mène à la grille complète. Sur cette page, les planches TIENNENT LIEU
de liste de prix : un tableau en plus aurait répété les mêmes montants.

### Le sur-mesure et les transformations

Une section entière, pas trois lignes en bas de page. **Aucun concurrent
genevois ne propose cela** — c'est ce qui distingue le plus la maison, et le
site doit lui donner la place correspondante.

- Une chemise ou une robe réalisée dans le tissu du client.
- La broderie, la pose de patchs.
- La transformation complète d'un vêtement : reprendre une pièce pour lui
  donner une autre forme, une autre longueur, un autre usage.

Le prix se convient de vive voix, après examen de la pièce. La section n'a
donc pas de grille : elle montre ce qui est possible et amène à l'appel.

---

## 4 · Le positionnement

**Un pressing complet, avec une expertise textile et un véritable atelier de
couture sur place.**

Cette phrase est le cœur du message. Les deux moitiés comptent à parts égales :
c'est un pressing à part entière — nettoyage à sec, blanchisserie, repassage —
et il dispose en plus d'un atelier de couture tenu sur place, capable de
retouches, de transformations et de créations sur mesure.

Ce qui distingue la maison :

- **Vingt ans au même endroit.** Établi à Vernier depuis 2006, à la même adresse.
- **L'atelier sur place.** Les retouches ne partent pas chez un sous-traitant.
- **Le conseil avant l'acte.** Chaque textile reçoit le traitement qui lui
  convient ; le client est conseillé au dépôt, et le prix d'une pièce
  particulière est convenu avec lui avant que le travail commence.
- **Les professionnels.** Restaurants, hôtels, cabinets, institutions :
  travaux en série et volumes réguliers sont pris en charge.

### Le ton

Sobre, précis, artisanal. On tutoie le métier, pas le client. Des phrases
courtes, des faits vérifiables, aucune emphase commerciale. Le vocabulaire est
celui d'un atelier : la pièce, le textile, le dépôt, la reprise, l'ourlet,
la doublure. Le français est celui de Suisse romande.

---

## 5 · Les prestations

**Nettoyage à sec** — vêtements de ville, tenues habillées, manteaux,
doudounes, pièces en soie, accessoires.

**Blanchisserie** — linge au kilo, literie, linge de maison, rideaux,
linge marqué pour les professionnels.

**Repassage** — sur cintre ou plié ; le linge apporté déjà lavé est accepté.

**Retouches et couture** — ourlets, fermetures éclair, ajustements de taille,
doublures, reprises, sur toutes les catégories de vêtements.

**Transformations et créations sur mesure** — reprise complète d'un vêtement,
chemise ou robe réalisée dans le tissu du client, broderie, pose de patchs.

**Entretien spécialisé** — tapis, cuir, daim, sacs : la pièce est prise en
charge au magasin puis confiée à des spécialistes.

**Services aux professionnels** — travaux en série, volumes réguliers.

### Les délais et la livraison

**Le dépannage rapide.** Une pièce pour demain matin, c'est souvent possible :
cela dépend du vêtement et de la charge de l'atelier. Le site doit le
présenter comme une invitation à appeler, jamais comme une réserve — « appelez
avant de renoncer », et non « sous réserve de disponibilité ».

**La collecte et la livraison.** Proposée aux entreprises, étudiée au cas par
cas. Pour les particuliers, selon la demande : le site l'annonce sans la
promettre, et invite à en parler.

---

## 6 · Les tarifs

Tous les prix sont en francs suisses, **TTC, TVA 8,1 % comprise**.
Mise à jour : 30 août 2026.

Trois mentions accompagnent les tableaux :

- « Prix en francs suisses, TTC, TVA 8,1 % comprise. »
- « **Dès** indique un prix minimum : la matière, la complexité ou les
  dimensions font varier le tarif. »
- « **Sur devis** : nous examinons la pièce avec vous et vous remettons un
  prix avant de commencer. »

### Nettoyage — Vêtements

| Pièce | Prix |
|---|---|
| Complet | 24.– |
| Tailleur | 24.– |
| Veston | 13.– |
| Pantalon | 11.– |
| Pantalon en soie | 13.– |
| Chemise sur cintre | 5.50 |
| Chemise pliée | 6.– |
| Chemise en soie | 12.– |
| Robe courte simple | dès 14.– |
| Robe en soie | dès 15.– |
| Robe plissée | dès 18.– |
| Jupe simple | dès 11.– |
| Jupe en soie | dès 12.– |
| Jupe plissée | dès 15.– |
| Pull-over / Sweat-shirt | 8.– |
| Pull en laine / Jaquette | 10.– |
| Gilet | 9.– |
| Chemisier / Top | 7.50 |
| Chemisier en soie | dès 12.– |
| Jeans | 7.– |
| Short | 7.50 |
| T-shirt | 4.50 |
| Polo | 5.50 |
| Camisole / Débardeur | 2.50 |
| Sous-vêtements | 2.– |
| Blouse | dès 11.– |

### Nettoyage — Manteaux

| Pièce | Prix |
|---|---|
| Manteau court | dès 20.– |
| Manteau long | dès 25.– |
| Imperméable | dès 22.– |
| Anorak / Veste de ski | dès 22.– |
| Doudoune plumes simple | dès 25.– |
| Doudoune délicate | dès 30.– |

### Nettoyage — Accessoires

| Pièce | Prix |
|---|---|
| Écharpe coton / synthétique | 10.– |
| Écharpe cachemire / pashmina | 14.– |
| Écharpe délicate / foulard soie | 16.– |
| Cravate soie / laine | 10.– |
| Cravate synthétique | 7.– |

### Entretien spécialisé

*Nous prenons la pièce en charge et vous remettons un prix après examen.*

| Pièce | Prix |
|---|---|
| Tapis | Sur devis |
| Vêtements et articles en cuir | Sur devis |
| Daim | Sur devis |
| Sacs — nettoyage et restauration | Sur devis |

### Blanchisserie — Linge au kilo

*Deux formules, au poids. Le linge est pesé au dépôt.*

| Prestation | Prix |
|---|---|
| Lavage, séchage et pliage | 6.– le kg |
| Lavage, séchage, repassage et pliage | 12.– le kg |
| Repassage seul — linge apporté déjà lavé | Sur devis |

### Blanchisserie — Literie

| Pièce | Prix |
|---|---|
| Drap sans repassage | 8.50 |
| Drap avec repassage | 11.– |
| Housse de duvet | dès 13.– |
| Duvet synthétique petit (max 140 cm) | 40.– |
| Duvet synthétique grand (dès 160 cm) | 50.– |
| Duvet plume petit (max 140 cm) | 50.– |
| Duvet plume grand (dès 160 cm) | 60.– |
| Alèse / Molleton / Sur-matelas | dès 20.– |
| Couvre-lit | dès 25.– |
| Taie d'oreiller petite | 4.– |
| Taie d'oreiller grande | 4.50 |
| Oreiller synthétique petit (max 60 cm) | dès 12.– |
| Oreiller synthétique grand | dès 18.– |
| Oreiller plumes petit (max 60 cm) | dès 16.– |
| Oreiller plumes grand | dès 25.– |
| Traversin | 5.– |

### Blanchisserie — Linge de maison

| Pièce | Prix |
|---|---|
| Chemin de table | dès 10.– |
| Nappe | dès 6.50 |
| Serviette | 2.50 |
| Linge de cuisine | 2.50 |
| Coussin | dès 16.– |
| Linge de bain | 5.50 |
| Linge de toilette | 4.– |
| Lavette | 1.– |
| Jeu de tapis de bain | 20.– |
| Couverture | 20.– |
| Rideaux en nylon | 5.50 le m² |
| Rideaux en coton simple | dès 11.– le m² |
| Rideaux en coton double | dès 13.– le m² |
| Rideaux en velours | dès 13.– le m² |
| Rideaux en velours double | dès 15.– le m² |
| Plaid | Sur devis |
| Housse amovible (fauteuil, canapé) | Sur devis |

### Retouches — Chemises

| Prestation | Prix |
|---|---|
| Ajuster manches | 25.– |
| Ajuster longueur | 22.– |
| Ajuster taille | 15.– |
| Retourner col | 15.– |
| Raccourcir | 20.– |

### Retouches — Pantalons

| Prestation | Prix |
|---|---|
| Ourlet simple piqué machine | 18.– |
| Ourlet avec fente | 25.– |
| Ourlet avec revers | 25.– |
| Ourlet avec talonnette | 25.– |
| Ourlet invisible | 22.– |
| Ourlet original | 22.– |
| Fermeture éclair | 25.– |
| Ajuster taille ou hanches | 25.– |
| Changer poche | 20.– |
| Doublure genoux | 40.– |
| Changer élastique | 20.– |
| Mettre crochet ou pression | 10.– |
| Renforcer entre-jambes | 15.– |

### Retouches — Jupes

| Prestation | Prix |
|---|---|
| Ourlet jupe droite | 22.– |
| Ourlet jupe droite avec doublure | 25.– |
| Fermeture éclair invisible | 25.– |
| Fermeture éclair normale | 22.– |
| Ajuster taille | 20.– |
| Poser élastique coulissant | 15.– |
| Changer doublure | 45.– |

### Retouches — Pull / Jaquette

| Prestation | Prix |
|---|---|
| Réparer un trou | dès 7.– |
| Recoudre le col | 10.– |

### Retouches — Manteaux

| Prestation | Prix |
|---|---|
| Fermeture éclair | dès 55.– |
| Ajuster longueur | 40.– |
| Ajuster manches | 40.– |
| Doublure de poche | 20.– |
| Doublure de manches | 55.– |
| Doublure complète sans manches | 110.– |
| Doublure complète avec manches | dès 170.– |
| Réparer fond de poche | 15.– |

### Retouches — Veste / Blouson / Veston

| Prestation | Prix |
|---|---|
| Fermeture éclair | 50.– |
| Ajuster longueur | 40.– |
| Ajuster manches | dès 40.– |
| Doublure manches | 50.– |
| Doublure complète sans manches (avec fourniture) | 110.– |
| Doublure complète avec manches (avec fournitures) | 170.– |
| Réparer fond de poche | 15.– |
| Recoudre un coin de poche | 15.– |

### Retouches — Robe simple

| Prestation | Prix |
|---|---|
| Ourlet robe droite | 22.– |
| Fermeture éclair invisible | 30.– |
| Ajuster taille | 30.– |
| Poser épaulettes | 25.– |
| Doublure sans manches | 50.– |
| Doublure avec manches | 75.– |

### Retouches — Robe de soirée

| Prestation | Prix |
|---|---|
| Ourlet simple sans doublure | 40.– |
| Ourlet simple avec doublure | 60.– |
| Fermeture éclair invisible | 30.– |
| Ajuster taille | 30.– |
| Poser bonnets | 20.– |

### Retouches — Rideaux

| Prestation | Rideaux simples | Rideaux doubles |
|---|---|---|
| Raccourcir | dès 18.– | dès 34.– |
| Poser un crochet ou un galet | 3.– | 3.– |

### Couture — Transformations et créations

*Apportez la pièce ou le tissu : nous regardons ensemble et vous remettons
un prix.*

| Prestation | Prix |
|---|---|
| Transformation d'un vêtement | Sur devis |
| Chemise sur mesure, dans votre tissu | Sur devis |
| Robe ou autre pièce sur mesure | Sur devis |
| Broderie | Sur devis |
| Pose de patch, y compris en relief | Sur devis |
| Travaux en série pour les professionnels | Sur devis |

---

## 7 · L'identité visuelle validée

### La palette

Relevée sur le logo de la maison. Ce sont les valeurs exactes à employer.

| Rôle | Valeur |
|---|---|
| Ivoire — fond principal des pages | `#F6F3EC` |
| Papier — filets, bordures, fonds secondaires | `#EAE5D9` |
| Graphite — texte courant | `#232825` |
| Vert — couleur du logo, titres, boutons | `#04321E` |
| Vert nuit — fonds sombres | `#04180F` |
| Or sur fond clair | `#A8842F` |
| Or sur fond sombre | `#C9A24D` |
| Acier — filets, bordures | `#8A979B` |
| Acier de texte — légendes, liens, mentions | `#5A686C` |
| Or gravé — petit texte sur fond clair | `#82631F` |
| Blanc | `#FFFFFF` |
| Texte sur fond sombre | `#F6F3EC` |
| Texte secondaire sur fond sombre | `rgba(246,243,236,.74)` |

**Deux ors et deux gris, et ce n'est pas une coquetterie.** L'or du site
(`#A8842F`) tient 3,15:1 sur l'ivoire et l'acier 2,71:1 : justes pour un
filet, un aplat ou un grand titre, très en dessous des 4,5:1 qu'exige un mot
qu'on doit lire. Chaque fois qu'un petit texte est en jeu — une légende, un
lien, une unité dans un tableau — c'est l'or gravé ou l'acier de texte qu'il
faut, jamais les deux premiers. La règle se vérifie en une mesure ; ne pas la
rouvrir sans en refaire une.

### La typographie

```css
--logotype: "Cinzel", Georgia, "Times New Roman", serif;
--serif:    "Newsreader", Georgia, "Times New Roman", serif;
--sans:     "Archivo", -apple-system, "Segoe UI", Roboto, Helvetica, sans-serif;
```

**Cinzel ne sert qu'au nom de la maison** — le bandeau, l'en-tête et le sceau.
C'est une lapidaire romaine, dessinée d'après la pierre gravée : elle porte le
nom, elle ne porterait pas un paragraphe. Les titres de pages restent en
Newsreader.

Le serif porte les titres, le nom de la maison et les prix. Le sans-serif
porte le texte courant, la navigation et les mentions. Les deux polices sont
hébergées dans le projet, en sous-ensemble **latin-ext** — les accents du
français en dépendent.

Newsreader possède un axe de taille optique : son dessin s'épaissit de
lui-même dans les petits corps et s'affine dans les grands. Laisser
`font-optical-sizing: auto`, qui est le comportement par défaut, et ne pas le
neutraliser.

Échelle de tailles. Les corps de texte gardent le rapport 1,25 ; les corps
d'affichage sont descendus d'environ 15 %, car la hauteur d'x de Newsreader
est nettement supérieure à celle de Cormorant Garamond : aux mêmes valeurs en
pixels, les titres paraîtraient une taille trop gros.

```css
/* Texte — inchangé : Archivo et Inter ont des hauteurs d'x voisines */
--t-xs: 12px;  --t-s: 14px;  --t-m: 17px;  --t-l: 21px;

/* Affichage — recalculé pour Newsreader */
--t-xl:  24px;
--t-2xl: clamp(26px, 2.9vw, 36px);
--t-3xl: clamp(33px, 4.8vw, 56px);
--t-4xl: clamp(36px, 5.6vw, 72px);
```

Seul `--t-xl` est arrondi vers le haut (22,95 → 24 px), pour garder un écart
perceptible avec `--t-l` à 21 px.

Espacements : `8 · 16 · 24 · 40 · 64 · 96 · 140` px.
Largeur maximale du contenu : `1180px`. Marge de page : `clamp(18px, 4vw, 54px)`.
Transition de référence : `260ms cubic-bezier(.22,.61,.36,1)`.

### Les photographies

**Le site est complet et fini sans aucune photographie.** Pas un cadre vide,
pas une mention « photo à fournir », rien qui laisse voir un manque. Ce qui
porte le site visuellement, ce sont les planches à la craie, le nom en lettres
d'or, le sceau et les filets.

Les photographies viendront plus tard, et à un seul endroit : **une page
Galerie**, dédiée aux avant/après de l'atelier. Une pièce qu'on croyait perdue
et qui repart pour des années — c'est là que la photographie sert, parce
qu'elle prouve quelque chose qu'aucun texte ne prouve.

Tant que cette page n'a pas de vraies photographies, **elle n'existe pas**.
Une galerie vide dessert le travail plus qu'elle ne l'annonce.

### Le bouton — la marque

Un bouton de couture vu de face : deux cercles concentriques, quatre trous,
la croix du fil. Il prend la couleur du texte qui l'entoure grâce à
`currentColor`.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none">
  <title>Pressing de Vernier</title>
  <circle cx="48" cy="48" r="37" stroke="currentColor" stroke-width="5"/>
  <circle cx="48" cy="48" r="28" stroke="currentColor" stroke-width="1.4" opacity=".45"/>
  <path d="M37.5 37.5 58.5 58.5M58.5 37.5 37.5 58.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  <circle cx="37.5" cy="37.5" r="5" fill="currentColor"/>
  <circle cx="58.5" cy="37.5" r="5" fill="currentColor"/>
  <circle cx="37.5" cy="58.5" r="5" fill="currentColor"/>
  <circle cx="58.5" cy="58.5" r="5" fill="currentColor"/>
</svg>
```

### Le sceau

Un cachet rond : deux cercles, deux filets en arc, deux losanges sur les
flancs, le nom sur deux lignes et l'ancienneté sur l'arc du bas.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" fill="none">
  <title>Pressing de Vernier — depuis 2006</title>
  <path id="sceau-arc-bas" d="M8 70A62 62 0 0 0 132 70"/>
  <circle cx="70" cy="70" r="66" stroke="currentColor" stroke-width="3.2"/>
  <path d="M16.8 60.6A54 54 0 0 1 123.2 60.6" stroke="currentColor" stroke-width="1.2" opacity=".6"/>
  <path d="M123.2 79.4A54 54 0 0 1 16.8 79.4" stroke="currentColor" stroke-width="1.2" opacity=".6"/>
  <path d="M11 70l5-5 5 5-5 5z" fill="currentColor"/>
  <path d="M119 70l5-5 5 5-5 5z" fill="currentColor"/>
  <text x="70" y="64" font-family="Cinzel, Georgia, serif" font-size="12.5"
        font-weight="600" letter-spacing="0.9" fill="currentColor" text-anchor="middle">PRESSING</text>
  <text x="70" y="84" font-family="Cinzel, Georgia, serif" font-size="12.5"
        font-weight="600" letter-spacing="0.9" fill="currentColor" text-anchor="middle">DE VERNIER</text>
  <text font-family="Archivo, sans-serif" font-size="8.4" font-weight="500" letter-spacing="2.8" fill="currentColor">
    <textPath href="#sceau-arc-bas" startOffset="50%" text-anchor="middle">DEPUIS 2006</textPath>
  </text>
</svg>
```

Le nom du sceau est composé en **Cinzel**, comme le reste du logotype — pas
en Newsreader, qui sert aux titres de pages. Mesuré : « DE VERNIER » fait
82,5 unités en corps 12,5 pour 92 disponibles entre les losanges. Cinzel
étant plus étroite que Newsreader, l'interlettrage a été porté à `0.9`, ce
qui remplit la ligne à 87 unités et laisse 2,5 unités de marge de chaque
côté — une lapidaire demande cet air.

### Le nom en lettres d'or sur fond vert

Le nom composé en très grand, en capitales espacées, dans le serif, rempli
d'un dégradé d'or, sur un aplat vert nuit profond. C'est l'élément le plus
fort de l'identité.

Le dégradé, à déclarer une fois puis à appeler par `fill="url(#orfevre)"` :

```svg
<linearGradient id="orfevre" x1="0" y1="0" x2="1" y2="0.35">
  <stop offset="0%"   stop-color="#9C7638"/>
  <stop offset="24%"  stop-color="#CBA965"/>
  <stop offset="48%"  stop-color="#F6E4B4"/>
  <stop offset="72%"  stop-color="#CBA965"/>
  <stop offset="100%" stop-color="#9C7638"/>
</linearGradient>
```

Le fond vert, avec ses deux voiles lumineux et son grain — l'aplat seul
paraîtrait plat :

```css
background: #04180F;
/* deux halos */
background-image:
  radial-gradient(115% 78% at 50% -6%, rgba(15,90,50,.42), transparent 62%),
  radial-gradient(88% 58% at 88% 106%, rgba(201,162,77,.14), transparent 60%);
/* par-dessus, un grain à 16 % d'opacité */
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
```

Le nom est composé en SVG afin qu'il occupe toujours exactement la largeur
voulue : le texte est mesuré avec `getBBox()`, puis le `viewBox` est ajusté
à ses dimensions réelles. Sur les écrans étroits, il passe sur deux lignes,
les deux mots ramenés à la même hauteur de lettre pour rester équilibrés.
Un titre `<h1>` masqué visuellement double ce nom pour les lecteurs d'écran
et pour les moteurs de recherche.

Ce traitement — l'aplat vert nuit, les deux halos et le grain — est réservé à
la plaque du nom, dans l'en-tête. Il ne se réemploie nulle part ailleurs, pas
même sur le bloc de la tringle, qui est un ivoire plat.

Le nom vit dans l'en-tête et y reste sur les neuf pages. Il est un `h1` sur
l'accueil, où il est le titre de la page, et un `p` ailleurs, où la page a
déjà le sien : une bannière répétée neuf fois ne doit pas occuper le premier
niveau de titre de chaque page.

### L'en-tête, identique sur les neuf pages

L'en-tête est du **mobilier** : le même balisage, le même ordre, les mêmes
places sur les neuf pages. Ce qui varie, c'est ce qui vient après lui.

Trois bandes :

| | Bande | Fond | Ce qu'elle porte |
|---|---|---|---|
| 1 | La bande du logo | ivoire | le bouton et le nom composé à gauche, l'ancienneté et l'état d'ouverture au centre, le téléphone à droite |
| 2 | La plaque du nom | vert nuit | le nom en or et son filet à losange |
| 3 | La navigation | ivoire | les huit entrées, centrées |

**Deux choses seulement changent d'une page à l'autre**, et elles le doivent :
l'entrée de menu marquée `aria-current`, et la balise du nom — `h1` sur
l'accueil, où le nom EST le titre de la page, `p` ailleurs, où la page a déjà
le sien. Tout le reste est identique au caractère près.

Tout est calé sur le conteneur de **1180 px**, comme le pied de page et comme
la tringle. Mesuré à 1280 px : le logo commence à 94, le téléphone finit à
1171, et l'état d'ouverture tombe sur l'axe de la page.

**Ce qui est collant, et pourquoi seulement ça.** La bande 3, et rien
d'autre : 52 px. À l'arrivée l'en-tête dit qui nous sommes ; en cours de
lecture il ne doit plus que mener quelque part. Coller les trois bandes, ce
serait garder 231 px à l'écran en permanence — un quart d'un portable.

La navigation est donc écrite **hors du `<header>`** : une bande collante
enfermée dans un conteneur court se décolle avec lui dès qu'il sort de
l'écran. Un `<nav>` est un repère de navigation à part entière.

**Sur téléphone**, la navigation se replie derrière le bouton du menu. C'est
alors la plaque qui reste collée en haut, sinon le menu cesserait d'être
atteignable une fois la page défilée. En dessous de 620 px le logo sort de la
bande : mesuré à 375 px, le bouton, l'état dans sa formulation la plus longue
et le numéro font exactement la largeur disponible. C'est le logo qui cède —
le nom est écrit soixante pixels plus bas, en or, dix fois plus gros.

```css
/* la bande du logo */
.ent-logo{ background:#F6F3EC; border-bottom:1px solid #EAE5D9; }
.ent-logo .zone{ display:grid; grid-template-columns:1fr auto 1fr;
                 align-items:center; min-height:60px; }
/* la navigation, seule collante */
.ent-nav{ position:sticky; top:0; z-index:60; background:#F6F3EC; }
```

### La répartition du vert et de l'ivoire

**Le vert n'apparaît que deux fois dans la page, et les deux fois il porte de
l'or** : la plaque du nom, et les six cartes de métier. C'est le même objet à
deux échelles. Rien d'autre n'est vert — donc le vert veut dire quelque chose.

Tout le reste est ivoire : la bande du logo, la navigation, le fond du bloc de
la tringle, et tout ce qui vient dessous.

Le traitement du vert — l'aplat de nuit, les deux halos, le grain — est
**réservé à la plaque du nom**. Le bloc de la tringle est un ivoire plat :
halos et grain n'existaient que pour empêcher un aplat sombre de paraître
mort, et un ivoire n'a pas ce défaut.

Trois mesures ont décidé de cette répartition, et il ne faut pas les refaire :

- **le trait des six dessins est un or clair** (`#BB8419` à `#D1A553`, relevé
  pixel par pixel dans les fichiers). Sur le papier ivoire des anciennes
  cartes il tenait 1,43:1 de moyenne ; sur la plaque verte il tient 2,33:1.
  Les dessins gagnent × 1,62 — le papier les a toujours mal servis.
- **la carte sur son fond** passe de 1,04:1 (vert sur vert) à 14,45:1 (vert
  sur ivoire).
- **la tringle de laiton ne perd rien sur l'ivoire.** Contrairement aux
  dessins qui sont un lavis, elle est pleine à 80 % : contraste médian 3,19:1
  sur ivoire contre 2,90 sur vert. Ce qu'elle perd, ce sont ses reflets —
  17 % du laiton, qui tombent à 1,21:1 et deviennent invisibles. Elle passe de
  laiton poli à laiton satiné, et c'est un gain : sur le vert elle brillait
  plus fort que les cartes qu'elle porte.

  **Ne pas l'assombrir en CSS.** `brightness(.86)` monte bien le contraste
  moyen de 4,33 à 5,33:1, mais les reflets ne remontent qu'à 1,65:1, toujours
  sous le seuil du visible : on paie la couleur de la barre entière sans rien
  récupérer.

### La tringle et les six cartes

Sur l'accueil, les six métiers sont **six cartes suspendues aux pinces d'une
tringle de laiton**. La tringle est une image ; les cartes sont construites
par `assets/site.js` et se calent sur les pinces mesurées dans le fichier.
Aucun texte de métier n'est écrit dans le HTML.

Les six pinces ont été relevées dans `assets/illustrations/tringle.webp`, sur
la boîte du contenu (2109 × 76) :

```
pince      1       2       3       4       5       6
mesuré  11,356  26,837  42,248  57,658  73,044  88,573 %
```

La grille des cartes reprend ces valeurs mesurées, jamais des valeurs idéales.
Changer ces six nombres suffirait si l'image était régénérée.

**Le point d'accroche** est dicté par la platine murale, pas par la mâchoire.
La platine descend jusqu'à la ligne 67 sur 76 ; un haut de carte plus haut
ferait passer la première et la dernière carte sous la fixation.

**La carte est une plaque verte**, pas du papier : dégradé `#0C2C21` vers
`#051C13` — un dégradé et non un aplat, pour que le bord haut reçoive la
lumière —, filet d'or intérieur à 3 % de retrait, ombre portée teintée de vert
de nuit à 32 %. Sur un fond clair, une ombre noire appuyée fait une salissure.

Le contenu suit la convention du site pour une surface sombre : ivoire pour le
titre (14,45:1), ivoire adouci pour la description (8,48:1), or clair pour le
« voir » (6,68:1).

### Les six métiers sur téléphone

**La tringle disparaît sous 1200 px, et chaque carte porte alors sa propre
pince.** Le seuil n'est pas un chiffre rond : la tringle mesure 1180 px — la
largeur du conteneur — et ne peut pas rétrécir, ses six pinces étant à des
positions fixes de l'image. En dessous elle ne tient plus dans l'écran.
Il est écrit `max-width:1199.98px` : un écran mesuré 1199,5 px ne serait
attrapé ni par `1199px` ni par `min-width:1200px`, et la tringle
réapparaîtrait pour un demi-pixel.

**Le concept de la tringle ne se transpose pas, la pince oui.** Une tringle
veut dire des pièces accrochées côte à côte le long d'une barre : tout son
sens est dans l'étendue latérale, et un téléphone n'en a pas. La pince, elle,
dit « ceci a été accroché » et n'a besoin d'aucune largeur. Elle n'est pas une
image nouvelle : c'est la pince n°2 de la tringle, découpée en CSS —
`background-position` sur `x 517 → 616, y 16 → 76`, avec un masque qui estompe
les deux bouts de barre.

Les six cartes s'empilent : une colonne sur téléphone, deux sur tablette,
trois jusqu'au seuil — la grille `auto-fit` que le site emploie déjà pour ses
listes d'éléments de même poids.

**Le rythme est tenu par la pince, pas par l'écart.** Elle déborde de 38 px
au-dessus de sa carte ; l'écart entre deux cartes vaut 62 px, dont 24 d'air
au-dessus d'elle. Ces 24 px sont la seule valeur qui compte : c'est le blanc
qui sépare une pince du bas de la carte précédente, et il décide si la colonne
se lit comme six objets suspendus ou comme un ruban continu.

**Ce qui a été écarté**, mesuré sur maquette avant de trancher :

| Mise en page | Bloc | Écrans | Dessin | Métiers vus |
|---|---|---|---|---|
| Glissement latéral (l'ancien) | 662 px | 0,9 | 249 px | **1 sur 6** |
| Deux colonnes avec description | 1 205 px | 1,6 | 152 px | 6 sur 6 |
| Deux colonnes sans description | 982 px | 1,3 | 168 px | 6 sur 6 |
| **La pile pleine largeur** (retenu) | 3 084 px | 4,0 | 184 px | 6 sur 6 |

Le glissement latéral est écarté : il cachait cinq métiers sur six derrière un
geste que rien n'annonçait, et « Retouches et couture » — ce qui distingue la
maison d'un pressing ordinaire — demandait quatre glissements.

### L'état d'ouverture, calculé

Une pastille qui bat doucement et une phrase calculée à l'heure réelle à
partir des horaires, en tenant compte de la pause de midi :

- pendant une plage d'ouverture → « Ouvert · jusqu'à 12h30 »
- avant la plage suivante du jour → « Fermé · ouvre à 13h30 »
- après la dernière plage → « Fermé · ouvre lundi à 8h00 »

### Le vocabulaire graphique

**Deux éléments SVG seulement, et ce sont des marques :** le bouton de
couture et le sceau. Ils identifient la maison ; ils ne forment pas un
système décoratif et ne se déclinent pas.

**Six dessins, un par métier**, plus la tringle : des illustrations au trait
doré, dessinées, en fichiers `.webp` à fond transparent. Ce ne sont pas des
icônes — ce sont des objets du métier, montrés. Elles vivent dans les cartes
de l'accueil et nulle part ailleurs.

**Aucun autre pictogramme, icône ou motif géométrique en SVG.** Pas d'icônes
pour les services, pas de motifs de fond, pas de planches géométriques en
remplacement d'une image. Un service se nomme, se décrit et se montre ; il ne
se symbolise pas.

Le filet d'or, les losanges et les capitales espacées restent, mais comme
**détails de mise en page** : séparateurs, bandeau de service, sceau. Ce sont
des signes de ponctuation, pas un vocabulaire de remplacement des images.

Les animations restent discrètes : une apparition au défilement, un léger
soulèvement au survol, un filet qui se trace. Elles se désactivent avec
`prefers-reduced-motion`.

---

## 8 · La fabrication

**Site statique** en HTML, CSS et JavaScript natifs, sans étape de
construction ni gestionnaire de paquets. Le site s'ouvre en double-cliquant
un fichier, et se publie tel quel.

**Hébergement** sur GitHub Pages.

**Deux fichiers de données** concentrent tout ce qui change avec le temps,
chacun copieusement commenté en français pour qu'un non-développeur puisse
les modifier seul, deux ans plus tard, sans rien réinstaller :

- `data/etablissement.js` — adresse, téléphone, courriel, coordonnées
  géographiques, horaires, date de mise à jour des tarifs
- `data/tarifs.js` — la totalité des prix, en sections

Les prix affichés sur les planches à la craie sont **lus depuis
`data/tarifs.js`**, jamais recopiés dans le dessin : chaque repère cite une
ligne par son libellé, et le montant est résolu à l'affichage. Un prix se
change donc à un seul endroit.

Les pages lisent ces fichiers et se remplissent d'elles-mêmes. Les horaires
s'écrivent en minutes depuis minuit (`8h00 → 480`), chaque journée étant une
liste de plages, ce qui permet de représenter la pause de midi et de calculer
l'état d'ouverture.

### La page Tarifs se range toute seule

Cette page porte les 139 prestations. Elle n'est pas la porte d'entrée du
site : on l'ouvre en sachant à peu près ce qu'on cherche. Trois dispositifs
la rendent parcourable.

**Quatre familles au lieu de dix-sept ancres.** Les sections de
`data/tarifs.js` se rangent sous les quatre métiers d'après le **préfixe de
leur identifiant** : `nettoyage-…` va sous Nettoyage, `retouches-…` et
`couture-…` sous Retouches et couture, et ainsi de suite. Rien n'est écrit à
la main. Conséquence pratique pour le propriétaire : **ajouter une section
dans `data/tarifs.js` la range automatiquement**, à condition de respecter le
préfixe. Une section dont le préfixe n'est prévu nulle part n'est jamais
perdue — elle atterrit dans une famille « Autres prestations », visible et
corrigeable, plutôt que de disparaître de la page.

**Une recherche.** C'est elle qui remplace vraiment le sommaire. Elle ignore
les accents, la casse, les ligatures, la forme de l'apostrophe et l'exposant
du m² — tous rencontrés dans les données réelles. Elle indexe aussi **le titre
de la section**, pas seulement les lignes : sans cela, chercher « chemise » ne
trouvait aucune des cinq retouches de chemise, qui s'appellent « Retourner
col » ou « Ajuster manches », et le visiteur en concluait que la prestation
n'existe pas.

**Un repère.** Une barre reste collée sous la navigation et annonce la famille
qu'on est en train de lire, avec le nombre de prestations affichées.

Si `data/tarifs.js` venait à manquer ou à être vidé, la page ne montre ni
ancres vides ni champ inerte : elle dit que les prix sont momentanément
indisponibles et invite à appeler.

**Comment ces fichiers sont chargés.** Par des balises `<script src="…">`
classiques, placées avant `assets/site.js`, qui posent des variables globales
(`ETABLISSEMENT`, `HORAIRES`, `JOURS`, `TARIFS`). Jamais par `import`, jamais
avec `type="module"` : les modules ES sont soumis à la politique d'origine, et
un fichier ouvert en `file://` par double-clic les refuse. C'est cette
contrainte qui permet au propriétaire de vérifier une modification en
double-cliquant `index.html`, sans serveur ni installation.

**L'adresse de courriel.** Elle est affichée et cliquable, mais elle n'est
jamais écrite en clair dans le HTML : un court script la reconstitue au
chargement, à partir de la partie locale et du domaine tenus séparés dans
`data/etablissement.js`. Cela ne rend rien inviolable — cela écarte les
aspirateurs d'adresses les plus sommaires.

Un repli lisible est obligatoire si le JavaScript est désactivé : le HTML
livré contient une mention en clair telle que « pressingdevernier — arobase —
gmail.com », que le script remplace par le lien `mailto:` dès qu'il s'exécute.
La page ne doit jamais afficher un emplacement vide ni un lien mort.

**Autonomie complète.** Toutes les ressources — polices comprises — sont
hébergées dans le dépôt. Le site fonctionne sans aucun appel à un service
extérieur, et l'intégralité du contenu reste récupérable à tout moment.

**Les photographies de la future page Galerie.** Rien de tout ce qui suit ne
s'applique au site tel qu'il est aujourd'hui : il ne porte aucune image. Ces
règles attendent la Galerie.

Format WebP, sans exception.

| Emploi | Largeur maximale | Poids visé |
|---|---|---|
| Avant/après en pleine largeur | 1600 px | moins de 200 ko |
| Vignette de galerie | 900 px | moins de 100 ko |
| Portrait, détail d'une pièce | 600 px | moins de 60 ko |

Seuls les fichiers WebP servis au site vivent dans `assets/photos/`. Les
originaux du photographe restent hors du dépôt : ils sont lourds et ne servent
qu'à refabriquer les WebP si un cadrage change.

Chaque `<img>` porte ses attributs `width` et `height` — les dimensions réelles
du fichier — pour que le navigateur réserve la place avant le chargement et que
la page ne saute pas. Toute photographie située hors du premier écran porte
`loading="lazy"` ; celles du premier écran ne le portent jamais, sous peine de
retarder l'affichage.

**Quand les photographies arrivent du photographe.** Lui demander les
originaux en JPEG de bonne qualité, sans redimensionnement de sa part. Puis,
pour chaque image :

1. Ouvrir <https://squoosh.app> dans le navigateur. Rien à installer.
2. Glisser la photographie dans la page.
3. Dans le panneau de droite, sous « Compress », choisir **WebP**.
4. Régler « Quality » sur **80**.
5. Cocher **Resize** et saisir la largeur du tableau ci-dessus — 1600, 900
   ou 600 selon l'emploi prévu.
6. Lire le poids annoncé en bas du panneau. S'il dépasse la cible, redescendre
   « Quality » à 72 et regarder à nouveau. Ne pas descendre sous 65 : les
   aplats de tissu se mettent à faire des taches.
7. Cliquer sur la flèche de téléchargement, en bas à droite.
8. Renommer le fichier en minuscules, sans accent ni espace, en décrivant ce
   qu'il montre : `devanture.webp`, `atelier-couture.webp`,
   `repassage-chemise.webp`.
9. Déposer le fichier dans `assets/photos/`.

Chaque image porte un texte alternatif qui décrit ce qu'on voit — « une veste
dont la doublure a été refaite », pas « notre savoir-faire ». Sans lui, la
photographie n'existe pas pour un visiteur aveugle.

**Accessibilité** : un seul `<h1>` par page, cibles tactiles d'au moins
44 px, contraste suffisant, focus visible, lien d'évitement vers le contenu,
et texte de remplacement pour les éléments graphiques porteurs de sens.

**Impression** : les pages de tarifs s'impriment proprement, l'en-tête et
le pied de page s'effaçant à l'impression.

**Le propriétaire est débutant.** Chaque manipulation à effectuer soi-même
est donnée en étapes numérotées, avec les commandes exactes à copier et ce
qui doit s'afficher à l'écran quand cela a fonctionné. L'environnement est
Windows avec PowerShell 5.1.

---

## 9 · Les défauts à traiter

Rien n'attend plus de décision du propriétaire : tous les points en suspens
ont été tranchés. Ce qui suit est du travail à faire.

### Ce qui reste

- **Il manque la cinquième planche.** La page affiche désormais ses planches
  côte à côte, sans onglets — mais elles sont **quatre** : chemises, jupes,
  robes, manteaux. Le complet est dessiné dans `assets/vetements.js`
  (`VETEMENT_COMPLET`) et n'est affiché nulle part, faute de section
  « complet » dans `data/tarifs.js` : une planche sans prix n'aurait rien à
  montrer, et inventer les prix est exclu. Deux issues, au choix du
  propriétaire : ajouter la section de tarifs, ou renoncer à cette planche.
  Les cinq dessins doivent de toute façon être refaits en images ; la
  structure de la page, elle, ne bougera pas.

  Neuf familles de retouches sur dix ont une ligne de tarifs mais pas de
  planche — pantalons, pulls, vestes, robes de soirée, rideaux. C'est voulu :
  les planches sont un échantillon parlant, pas un catalogue. La grille
  complète est à un bouton de distance.

- **Le linge blanc a disparu des dessins.** Depuis que les cartes sont vertes,
  le costume, la chemise sous le fer et la veste de cuisinier sont des pièces
  SOMBRES cernées d'or : c'était le papier qu'on voyait à travers le trait qui
  les faisait claires. Un pressing vend du linge propre. Pour le récupérer, il
  faut ajouter un aplat clair à l'intérieur des pièces textiles dans les six
  dessins : c'est un travail de dessin, pas de CSS.

- **La pince des cartes sur petit écran est un découpage, pas une image.**
  Elle est prise dans `tringle.webp` et affichée à 1,15 fois sa résolution :
  légèrement molle sur un écran à forte densité. Une image dédiée serait plus
  nette. Ce qu'il faudrait : la pince seule, de trois quarts face, **anneau
  fermé et vide** — on doit voir le fond à travers —, mâchoire vue de face et
  bien horizontale, fond transparent, **240 × 300 px**, laiton de la tringle
  (encre moyenne `#A7803E`), éclairage venant du haut, sans marge. Ce n'est pas
  urgent : le rendu actuel tient.

- **L'accueil sur téléphone fait environ quatre écrans pour ses seules six
  cartes.** C'est le prix assumé de cartes grandes et de dessins qui respirent.
  Si cela paraît trop à l'usage, le réglage tient en une ligne :
  `.tr-vue{ height:66cqw }` dans la media query des petits écrans.

- **L'échelle de tailles n'est pas tenue.** `assets/style.css` compte
  **58 tailles écrites en dur** contre **25 appels aux jetons `--t-*`**. Les
  nombres ont monté avec les quatre pages construites en septembre, mais la
  proportion n'a pas bougé : 71 % en dur le 1ᵉʳ septembre 2026, 70 % le 6.
  Le ménage a commencé, il n'est pas fini.

  Vingt et une déclarations descendent sous le plancher déclaré de 12 px. La
  moitié sont des **petites capitales espacées** — `.sur-titre`, `.bouton`,
  `.navigation a`, l'en-tête des tableaux de prix, le repère de la page
  Tarifs — où 10 px en capitales avec un interlettrage de 0,1 em se lisent
  comme 13 px en bas de casse : le plancher a été écrit pour du texte courant
  et ne s'applique pas tel quel à ces libellés. Restent quelques vrais cas à
  regarder, au premier rang desquels `.marque .mots span`, à **8 px**.

- **Le partage et le référencement attendent une adresse.** Le site n'a pas
  encore de domaine : pas de `CNAME` dans le dépôt, pas de dépôt distant. Trois
  choses en dépendent et ne peuvent pas être écrites avant, sous peine
  d'inventer une adresse fausse — ce qui serait pire que rien :

  1. Les **balises de partage** (Open Graph). Sans elles, un lien envoyé par
     WhatsApp ou publié sur Facebook s'affiche sans vignette. Elles réclament
     `og:url` et `og:image`, deux adresses complètes.
  2. Une **image de partage**, 1200 × 630 px, à fabriquer à partir de la
     plaque du nom — elle n'existe pas encore.
  3. Un **`sitemap.xml`** et l'adresse **canonique** de chaque page, qui
     listent les neuf pages par leur adresse complète.

  Quand le domaine sera choisi, dans cet ordre : créer un fichier nommé
  `CNAME` à la racine du dépôt, contenant le domaine seul et rien d'autre
  (par exemple `pressingdevernier.ch`) ; l'annoncer chez le bureau
  d'enregistrement ; puis revenir écrire ces trois points.

  **La fiche pour Google, elle, ne dépend pas du domaine et fonctionne
  déjà** : nom, raison sociale, adresse postale, coordonnées géographiques,
  téléphone, courriel et les onze plages horaires de la semaine sont fournis
  au format que Google attend, sur l'accueil et sur la page Nous trouver. Ils
  sont construits à partir de `data/etablissement.js` : un horaire modifié
  là-bas met la fiche à jour du même geste. C'est ce qui permet à Google
  d'afficher le magasin, ses horaires et son itinéraire directement dans ses
  résultats.

- **Cinzel et la broderie.** Le logotype est arrêté, mais Cinzel est la police
  la moins brodable des huit comparées : mesuré sur `test/logotype.html`, son
  trait le plus fin descend à **0,17 mm** pour un nom de 90 mm sur deux lignes,
  contre 1,04 mm pour une réglette. À l'écran et sur une enseigne, aucune
  conséquence. Au fil, il faudra soit broder plus grand, soit accepter que le
  brodeur redessine les empattements. À trancher avec lui avant de commander.

- **Fournir les photographies de la page Galerie.** Avant/après de l'atelier,
  et l'illustration du plan d'accès. Tant qu'elles n'existent pas, la Galerie
  n'est pas publiée : le reste du site est complet sans elles.

### Ce qui est réglé

Gardé ici pour que personne ne rouvre un dossier clos, et pour que les mesures
ne soient pas à refaire.

- **Trois pages étaient vides : Blanchisserie, Repassage, Cuir.** Elles
  portent maintenant un encadré des prestations et une liste de prix, selon le
  modèle décrit en section 3. Aucun montant n'y est écrit ; tous sont lus dans
  `data/tarifs.js` par libellé, et un libellé renommé dans les données émet un
  avertissement en console au lieu de disparaître sans bruit.

- **Ces quatre pages étaient trop longues.** Sept à neuf écrans chacune, le
  6 septembre 2026, pour un pressing de quartier. Elles ont été ramenées à
  deux ou trois : de 7 410 à 2 924 px pour Blanchisserie, 5 443 à 2 443 pour
  Repassage, 5 728 à 2 567 pour Cuir, 7 078 à 3 118 pour Couture — de 54 à
  61 % de moins, et près de la moitié du texte en moins. Ce qui est parti :
  la pesée animée, les finitions comparées, le parcours en quatre étapes, les
  rappels « Nous trouver » en bas de page, et trois des cinq planches.

- **La page Tarifs faisait plus de douze mille pixels d'un seul tenant**,
  précédés d'un sommaire de dix-sept ancres. Trois dispositifs la rendent
  parcourable, décrits en section 8 : quatre familles déduites du préfixe des
  identifiants, une recherche sur les 139 prestations, et une barre collante
  qui annonce la famille courante. Les dix-sept ancres sont devenues quatre.

- **Le bouton d'appel de l'accueil était invisible** — `#04321E` sur `#04180F`,
  **1,30:1**. Il est en or clair sur le vert de nuit : **7,66:1**.

- **Le téléphone était sous le pli sur mobile, à l'accueil.** Il finit
  maintenant à **40 px** du haut, sur les neuf pages, grâce à l'en-tête
  unifié.

- **Deux couleurs de texte étaient sous le seuil.** Deux jetons de TEXTE ont
  été ajoutés — `--or-grave` et `--acier-texte` — sans toucher à la palette,
  qui garde ses valeurs pour les filets et les aplats. Les neuf pages passent
  désormais l'audit d'accessibilité sans une seule violation, contre 28 sur la
  seule page Tarifs.

- **Le contraste des illustrations dans les cartes.** C'était le défaut le plus
  documenté du dossier, et le changement de fond l'a effacé : le trait `#C08C2D`
  passe de **2,62:1** sur le papier ivoire à **5,36:1** sur la plaque verte,
  bien au-dessus du seuil de 3:1. Quatre traitements avaient été mesurés puis
  écartés le 3 septembre 2026 — assombrir le trait, aviver le papier, un
  cartouche clair, un or franc — parce qu'aucun ne valait la perte d'éclat des
  dessins. Aucun n'était nécessaire : il fallait changer le fond, pas le trait.

- **Les six métiers étaient invisibles sur téléphone.** Le bloc glissait
  latéralement et montrait **1,7 carte sur six** à 375 px. Voir « Les six
  métiers sur téléphone », en section 7.

- **L'en-tête différait entre l'accueil et les huit autres pages**, sur onze
  points. Voir « L'en-tête, identique sur les neuf pages », en section 7.

- **Les coordonnées étaient répétées deux fois en bas de chaque page.** Il
  n'en reste qu'une occurrence par page dans le pied ; le second bloc, sur la
  page Nous trouver, est un rappel d'action assumé et non un doublon.
