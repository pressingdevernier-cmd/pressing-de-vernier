# Revue de conception — Pressing de Vernier, les six pages

Référence : `PROMPT.md` (brief validé)
Philosophie : sobre, précis, artisanal — la photographie porte le site, deux marques SVG seulement
Date : 31 août 2026
Portée : index · nettoyage · couture · tarifs · professionnels · trouver, à 375 / 768 / 1280 px

---

## Captures

| Fichier | Largeur | Ce qu'elle montre |
|---|---|---|
| `screenshots/review-accueil-desktop-1280.png` | 1280×800 | Accueil, page entière |
| `screenshots/review-accueil-mobile-375.png` | 375×812 | Accueil, page entière sur téléphone |
| `screenshots/review-accueil-mobile-375-pli.png` | 375×812 | Accueil, premier écran — position du téléphone |
| `screenshots/review-accueil-menu-mobile-375.png` | 375×812 | Menu déplié : la bande verte parasite |
| `screenshots/review-nettoyage-desktop-1280.png` | 1280×800 | Nettoyage, page entière (6 374 px) |
| `screenshots/review-nettoyage-grille-orpheline-desktop.png` | 1280×800 | La case double vide de la grille |
| `screenshots/review-couture-desktop-1280.png` | 1280×800 | Couture, page entière (5 091 px) |
| `screenshots/review-couture-onglet-chemises-desktop.png` | 1280×800 | La planche technique, onglet Chemises |
| `screenshots/review-tarifs-desktop-1280.png` | 1280×800 | Tarifs, page entière (12 936 px) |
| `screenshots/review-tarifs-haut-desktop.png` | 1280×800 | Tarifs, premier écran |
| `screenshots/review-professionnels-desktop-1280.png` | 1280×800 | Professionnels, page entière |
| `screenshots/review-trouver-desktop-1280.png` | 1280×800 | Nous trouver, page entière |

> Les blocs `.revele` ont été forcés à l'état `vu` avant capture : sans défilement, ils restent à
> `opacity:0` et la page paraîtrait vide. Ce n'est pas un défaut, c'est l'animation d'apparition.

---

## Résumé

La typographie d'affichage tient : les clamps recalculés pour la hauteur d'x de Newsreader sont
justes, la plaque du nom est mesurée puis recalée après chargement des polices, et l'italique doré
comme second membre de chaque titre donne aux six pages une signature immédiatement reconnaissable.

Le problème n'est pas la typographie — il est que **le système photographique n'a jamais été
construit**, et que rien n'a pris sa place. Le brief fait de la photographie l'élément visuel
principal et prévoit, en son absence, des emplacements dimensionnés et assumés. Il n'y a ni
`data/photos.js`, ni `assets/photos/`, ni classe `.vue`, ni la moindre `<img>` active sur les six
pages ; `.carte-service` est déclarée à deux colonnes là où le brief en prescrit trois. Les surfaces
que l'image devait tenir sont donc soit vides, soit supprimées. C'est la cause première du déséquilibre
des cartes, des rangées orphelines, des 250 px de blanc entre deux sections et de la maigreur générale
de `trouver.html`. La perte des pictogrammes a retiré ce qui masquait ce vide ; elle ne l'a pas créé.

Deuxième constat : **l'échelle typographique déclarée n'est pas celle qu'on emploie.** 19 appels aux
jetons `--t-*` contre 51 valeurs en dur, sur 23 corps distincts allant jusqu'à 8 px. Le registre
d'affichage est réglé ; le registre des petits corps n'a plus de système, et c'est là que la nouvelle
typographie ne tient pas.

---

## À corriger — bloquant

### 1. Le système photographique n'existe pas

Le brief (§ 6, « Les photographies — l'élément visuel principal ») : elles « occupent les grandes
surfaces, et la mise en page est construite autour d'elles » ; en attendant, « prévoir des emplacements
dimensionnés et visibles — un cadre au bon format, fond `#EAE5D9`, un filet d'or, et la mention de ce
que la photographie montrera ».

Constaté :

- `data/photos.js` : absent. `assets/photos/` : absent.
- Classes `.vue` et `.vue.attente` : absentes de `assets/style.css`.
- Aucune `<img>` active sur les six pages.
- `assets/style.css:729` — `.carte-service{ grid-template-columns:1fr 1fr }`, là où le brief prescrit
  `minmax(0,1fr) minmax(0,1.15fr) minmax(0,.85fr)`, la première colonne étant la photographie.
- `couture.html:174-177` inscrit la décision inverse du brief, en commentaire :
  « N'affichez rien tant que vous n'avez pas de vraies photos : un emplacement vide dessert le travail. »

C'est un arbitrage qui a été pris, pas un oubli — mais il est l'exact contraire de celui du brief, et
il explique la moitié des points qui suivent. Voir `screenshots/review-accueil-desktop-1280.png` : la
carte 04 est une carte à trois colonnes dont deux sont vides.

### 2. Le bouton d'appel de l'accueil ne se lit pas comme un bouton

`assets/style.css:775` — `.bande-appel` ne porte pas la classe `.sombre`. `.bouton.plein` conserve donc
son fond `--vert` `#04321E` posé sur `--vert-nuit` `#04180F` : **1,30:1**. Le texte ivoire se lit, la
forme du bouton non.

Sur `professionnels.html`, le même appel passe par `.section.sombre` et sort en or plein, parfaitement
visible. C'est l'action principale de tout le site, sur la page la plus consultée, et c'est la seule des
deux qui échoue. Voir `screenshots/review-accueil-desktop-1280.png` et
`review-professionnels-desktop-1280.png` côte à côte.

### 3. Le téléphone n'est pas au-dessus du pli sur l'accueil

Le brief pose la contrainte pour les six pages, « sur mobile comme sur ordinateur ». Mesuré :

| Page | 375×667 | 768×1024 |
|---|---|---|
| **index** | premier `tel:` à **681 px** — sous le pli | 669 px — juste au-dessus |
| nettoyage · couture · tarifs · professionnels · trouver | 50 px | 50 px |

Cause : `index.html` est la seule page sans `.bandeau-haut`, la bande verte qui porte le numéro en or
tout en haut des cinq autres. 375×667 reste une taille d'écran courante (iPhone SE, 8).

### 4. Bande verte parasite dans le menu mobile de l'accueil

`assets/style.css:315` — `.menu-mobile{ inset:118px 0 0 }`, avec le commentaire « 42px de bandeau +
76px d'en-tête ». L'accueil n'ayant pas de bandeau, son en-tête finit à 77 px : **41 px d'enseigne verte
apparaissent** entre le burger et le premier lien du menu. Voir
`screenshots/review-accueil-menu-mobile-375.png`.

### 5. Contraste : `--acier` et `--or` en petit corps, sur tout le site

Le brief (§ 8) n'avait signalé que l'or. L'acier est plus bas, et bien plus répandu.

| Couleur | Sur ivoire | Emplois relevés (page tarifs seule) |
|---|---|---|
| `--acier` `#8A979B` | **2,71:1** (AA : 4,5) | 34 mentions « dès » · les 17 puces d'ancrage du sommaire, qui sont des liens de navigation · les horaires · `.note-tarif` · `.mentions-tarifs` · les sur-titres · les en-têtes de colonnes |
| `--or` `#A8842F` | **3,15:1** | 13 « Sur devis » · les intitulés du bandeau d'infos (10 px) · le sous-titre de la marque, à **8 px** |

Le sommaire de `tarifs.html` est le cas le plus net : c'est la table des matières d'une page de
12 936 px, composée en 11 px à 2,71:1.

---

## À corriger — équilibre, rythme, cohérence

### 6. Carte 04 « Professionnels » : la moitié droite est vide

`assets/site.js:504` — `prix: []`. La carte reçoit une seule ligne « Sur devis » face à quatre lignes
pour les trois autres, et un seul bouton au lieu de deux. Elle occupe 341 px de haut pour environ 180 px
de contenu, tout tassé à gauche.

### 7. `nettoyage.html` : une case double vide en fin de grille

7 articles dans `repeat(auto-fit,minmax(285px,1fr))` → 3 colonnes → la dernière rangée est une cellule
blanche suivie de **deux cellules de fond `--papier`**. Cela se lit comme un oubli, pas comme un choix.
Voir `screenshots/review-nettoyage-grille-orpheline-desktop.png`.

### 8. `couture.html` est la seule page dont l'en-tête est en pleine largeur

| Page | Classe de l'en-tête | Bord gauche du h1 |
|---|---|---|
| nettoyage · tarifs · professionnels · trouver | `section serree millimetre` | 334 – 354 px |
| **couture** | `section millimetre` | **94 px** |

250 px d'écart sur le même élément, entre deux pages voisines de la navigation.

### 9. Deux composants distincts pour les trois mêmes informations

L'accueil emploie `.pratique` — fond sombre, à l'intérieur de l'enseigne. Les cinq autres pages
emploient `.bandeau-infos` — fond blanc, filets papier, hauteur 116 px. Contenus identiques
(aujourd'hui · adresse · téléphone), dessins différents. Le visiteur qui passe de l'accueil à une autre
page ne reconnaît pas le bloc.

### 10. `trouver.html` énonce son titre deux fois

`h1` « 201 route de Vernier », puis 400 px plus bas `h2` « 201 route de Vernier » — même composition
serif + italique doré. La page n'a qu'un bloc de contenu, et elle le répète.

### 11. Les coordonnées sont données deux fois en bas de chaque page

Le bloc « 201 route de Vernier » (927 px, identique) est reconduit sur cinq pages, immédiatement suivi
d'un pied de page qui redonne horaires, adresse et contact. Toutes les pages se terminent donc sur
environ 1 400 px de coordonnées répétées. Sur `trouver.html`, ce bloc *est* la page.

### 12. Le rythme entre blocs n'a que deux valeurs

`.section` = 140 px, `.section.serree` = 96 px, et rien entre les deux. Conséquences visibles :
environ 250 px de vide entre l'encart « Une urgence ? » et la section suivante sur couture et nettoyage,
250 px entre le courriel et l'encart sur trouver — alors que la plupart des autres transitions sont à
0 px, les sections étant collées bord à bord. Le rythme n'alterne pas serré et large : il alterne rien
et beaucoup.

### 13. `tarifs.html` : 12 936 px, dix-huit tableaux de poids identique

4,8 × la page suivante. Aucun palier visuel entre les trois familles (nettoyage / blanchisserie /
retouches) ; tous les `h3` de section ont le même corps, la même graisse et le même filet doré. La seule
hiérarchie de navigation est le sommaire en puces — voir le point 5 sur sa lisibilité.

### 14. Le sceau apparaît deux fois sur `professionnels.html`

Une fois dans la bande sombre (`.sceau-grand`, jusqu'à 180 px), une fois dans le pied (120 px), or sur
vert nuit les deux fois, à 400 px d'intervalle. Une marque qui se répète à cette distance cesse d'être
un sceau.

### 15. Les planches de vêtements ne couvrent que 4 onglets sur 9

`couture.html` propose neuf onglets ; `assets/vetements.js` n'en dessine plus que quatre —
`retouches-chemises`, `-jupes`, `-robe`, `-manteaux`. Cliquer « Pantalons », « Robes de soirée »,
« Vestes », « Pulls » ou « Rideaux » fait **disparaître un bloc de 648 px**. C'est le plus grand saut de
mise en page du site, et le contenu le plus remarquable n'est visible qu'une fois sur deux. L'onglet
ouvert par défaut, « Pantalons », est justement l'un de ceux qui n'ont plus de planche.

### 16. Ces planches contredisent le brief — et ce sont les plus beaux objets du site

Le brief, § 6 « Le vocabulaire graphique » : « Aucun autre pictogramme, icône ou motif géométrique en
SVG […] pas d'illustrations construites, pas de planches géométriques en remplacement d'une image. » Et
sur le fond vert nuit à halos : « Ce traitement est réservé au bandeau du nom. Il ne se réemploie pas
ailleurs comme fond décoratif. » `.planche` est exactement cela, et occupe la boîte prévue pour la
photographie de l'atelier.

Cela dit : voir `screenshots/review-couture-onglet-chemises-desktop.png`. Le trait de craie repassé
deux fois, les lignes de coupe calculées comme un décalage du tracé, les prix posés au bout d'un fil
d'or — c'est le seul endroit du site qui a une vraie présence. **C'est une décision à trancher, pas un
détail à corriger.** Voir la note en fin de rapport.

### 17. Le papier millimétré est un motif de fond

`.millimetre` (style.css:352) est appliqué aux cinq en-têtes de page. Discret — des filets à 5 % d'opacité,
le tout à `opacity:.5` — mais c'est le seul aplat texturé hors enseigne, et il relève de la même
interdiction que le point 16.

### 18. Le plan est un cadre blanc vide et non libellé

`.plan` sur quatre pages : un rectangle blanc au format 4/3 portant le nom et l'adresse au centre. Ni
filet d'or, ni mention de ce qu'il montrera, contrairement à la convention d'attente du brief. Le bouton
« Itinéraire » se retrouve orphelin sous le cadre, désaligné de la colonne des horaires.

---

## Typographie

### 19. L'échelle déclarée n'est pas celle qu'on emploie

`assets/style.css` compte **19 appels aux jetons `--t-*` contre 51 valeurs en dur**, réparties sur
23 corps distincts :

```
8 · 8,4 · 9 · 9,5 · 10 · 10,5 · 11 · 11,5 · 12 · 12,5 · 13 · 13,5 · 14 · 15 · 15,5 · 16 · 18 · 21 · 22 · 26 px
```

Trois d'entre elles — 12, 14 et 21 px — redoublent exactement `--t-xs`, `--t-s` et `--t-l`, qui existent
et ne sont pas appelés. `--t-xl` (24 px) n'est employé que deux fois, `--t-2xl` une seule.

Le registre d'affichage tient parfaitement : les clamps recalculés à −15 % pour la hauteur d'x de
Newsreader sont justes, les titres sont à la bonne taille à toutes les largeurs. **C'est en dessous de
17 px que le système s'arrête.** Voilà la réponse précise à « est-ce que la nouvelle typographie tient
partout » : elle tient en grand, elle improvise en petit.

### 20. Le plancher de l'échelle est à 12 px, le site descend à 8

`.marque .mots span` — le « NETTOYAGE · BLANCHISSERIE · COUTURE » sous le logo, présent dans l'en-tête
des six pages : **8 px**, or, interlettrage `.24em`, contraste 3,15:1. Voisins immédiats :
`.etiquette` 9 px, `.gamme b` / `.pratique dt` / `.tarif-table thead th` 9,5 px, `.planche text.nom`
8,4 px.

### 21. `line-height:1.06` est calibré pour un titre d'une seule ligne

Sur les `h3` à deux lignes de `.grille-services` — « Chemises, blanchisserie et repassage » — les deux
lignes se touchent presque. La hauteur d'x plus généreuse de Newsreader, qui est un gain sur les grands
titres, se paie ici. Visible sur `screenshots/review-nettoyage-grille-orpheline-desktop.png`.

### 22. Archivo 300 en texte courant

`body{ font-weight:300 }`, plus `rgba(35,40,37,.72)` sur les textes de carte et `rgba(35,40,37,.68)` sur
`.grille-services p`. Archivo Light est sensiblement plus maigre qu'Inter Light au même corps ; le
contraste reste conforme (≈ 7:1) mais la page paraît délavée à côté des titres Newsreader en 500 et 600.
L'écart de présence entre les deux polices s'est creusé avec le changement.

---

## Améliorations possibles

- **Impression.** `.enseigne`, `.bande-appel` et `.planche` ne portent pas la classe `.sombre` ; la règle
  `@media print{ .sombre{ background:#fff } }` ne les atteint donc pas et ils sortiraient en aplats verts
  pleine page.
- **Donnée morte.** `resume` est déclaré pour les quatre services (`site.js:477-504`) et n'est jamais rendu.
- **Ordre des titres.** h1 → h2 → h4 (pied de page) sur les six pages : le niveau h3 est sauté.
- **Anciennes polices.** Neuf fichiers `.woff2` Cormorant Garamond et Inter subsistent dans
  `assets/polices/`, non déclarés — `polices.css` le note déjà en commentaire.

---

## Ce qui fonctionne

- **La plaque du nom.** Mesure par `getBBox()`, recalage du `viewBox` sur les dimensions réelles, puis
  seconde passe sur `document.fonts.ready`, et calage des deux mots à la même hauteur de lettre. C'est du
  travail juste, et cela se voit : le nom occupe exactement sa largeur, à tous les écrans.
- **Les clamps d'affichage recalculés pour Newsreader.** Descendre de 15 % était le bon geste, et
  l'exception faite pour `--t-xl` (22,95 → 24) est justifiée.
- **L'italique doré en second membre de titre.** Motif fort, tenu sur les six pages, immédiatement
  identifiable. C'est ce qui donne au site son unité malgré tout le reste.
- **Aucun débordement horizontal** aux six pages × trois largeurs. Rien à signaler.
- **Le socle fonctionnel est complet et correct** : état d'ouverture calculé avec la pause de midi,
  pastille qui bat, repli lisible du courriel sans JavaScript, cibles tactiles à 44 px, anneau de focus
  visible, lien d'évitement, `prefers-reduced-motion` respecté.
- **Les planches à la craie**, pour ce qu'elles sont. Voir le point 16.

---

## La décision à prendre d'abord

Tout ce qui précède se range derrière une seule question, et il n'est pas rentable de corriger
l'équilibre des blocs avant de l'avoir tranchée :

**Que met-on dans les grandes surfaces ?**

- **Voie A — tenir le brief.** Construire `data/photos.js`, la classe `.vue` et son état `attente`, poser
  les emplacements aux formats prévus, remettre `.carte-service` à trois colonnes. Les pages retrouvent
  leur structure le jour même ; les images arrivent plus tard sans que rien ne bouge. Les planches
  disparaissent, ou attendent les photographies dans un rôle secondaire.
- **Voie B — assumer les planches.** Les compléter aux neuf vêtements, les étendre aux autres pages
  comme vocabulaire de la maison, et amender le brief en conséquence. C'est un site plus singulier, et
  un travail de dessin considérable.

Ce qu'il faut éviter est l'état actuel, qui est ni l'un ni l'autre : des surfaces vides là où la
photographie devait être, et un seul objet magnifique sur une seule page, visible une fois sur deux.
