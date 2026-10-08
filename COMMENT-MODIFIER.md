# Comment modifier le site

Ce guide est écrit pour être suivi **sans rien connaître au code**.
Prenez votre temps, faites une modification à la fois, et vérifiez avant de publier.

---

## L'adresse du site

Le site est en ligne sur **https://pressingdevernier.ch**. Le domaine et sa
zone DNS sont chez Infomaniak : **n'y touchez pas** pour modifier le site, ce
n'est jamais là que ça se passe. Tout ce qui concerne la mise en ligne, le
domaine et la zone DNS est décrit dans `DEPLOIEMENT.md`, section 4.

Ne supprimez jamais le fichier `CNAME` du dossier : c'est lui qui relie le
site à son adresse.

---

## Avant tout : la règle de sécurité

Vous ne pouvez rien casser de définitif. Chaque modification publiée est enregistrée,
et on peut toujours revenir en arrière. Mais pour éviter de perdre du temps :

> **Ne modifiez jamais deux choses en même temps.**
> Changez un prix, vérifiez, publiez. Puis passez au suivant.

Les caractères qui comptent sont les **virgules**, les **guillemets `"`** et les
**accolades `{ }`**. Si vous en supprimez un par erreur, la page des tarifs peut
rester vide. C'est réparable, mais autant l'éviter.

---

## Où se trouve quoi

| Ce que vous voulez changer | Le fichier à ouvrir |
|---|---|
| Un prix | `data/tarifs.js` |
| Un horaire d'ouverture | `data/etablissement.js` |
| Le téléphone, l'adresse, le courriel | `data/etablissement.js` |
| La date des tarifs | `data/etablissement.js` |
| Un texte d'une page | la page elle-même : `index.html`, `couture.html`… |
| Une photo | dossier `assets/` puis la page concernée |

Les six pages du site sont, dans l'ordre du menu :

| Page | Fichier |
|---|---|
| Accueil | `index.html` |
| Nettoyage & entretien | `nettoyage.html` |
| Couture & retouches | `couture.html` |
| Professionnels | `professionnels.html` |
| Tarifs | `tarifs.html` |
| Nous trouver | `trouver.html` |

**Avec quoi ouvrir ces fichiers ?** Le Bloc-notes de Windows suffit.
Faites un clic droit sur le fichier → *Ouvrir avec* → *Bloc-notes*.

Un éditeur gratuit plus confortable existe — **Visual Studio Code** — il colore le texte
et signale les erreurs. Ce n'est pas obligatoire.

---

## 1. Changer un prix

C'est l'opération la plus fréquente, et la plus simple.

**Ouvrez `data/tarifs.js`.** Vous y trouverez des lignes comme celle-ci :

```js
{ fr: "Ourlet simple piqué machine", en: "Machine-stitched hem", prix: 18 },
```

Pour passer cet ourlet de 18 à 20 francs, **changez uniquement le nombre** :

```js
{ fr: "Ourlet simple piqué machine", en: "Machine-stitched hem", prix: 20 },
```

Ne touchez à rien d'autre. Pas à la virgule finale, pas aux guillemets.

### Les cas particuliers

**Un prix avec des centimes** s'écrit avec un point, jamais une virgule :

```js
prix: 5.50        ✅ correct
prix: 5,50        ❌ casse la page
```

**Un prix minimum** (affiché « dès 25.– ») porte la mention `des: true` :

```js
{ fr: "Manteau long", en: "Long coat", prix: 25, des: true },
```

Si le prix devient ferme, supprimez `, des: true` — en gardant la virgule qui précède.

**Les rideaux** ont deux colonnes de prix : `prix` pour les rideaux simples,
`prix2` pour les doubles.

**Une prestation sans prix fixe** s'écrit `devis: true`, *à la place* du prix.
Elle s'affiche « Sur devis » :

```js
{ fr: "Transformation d'un vêtement", en: "Reworking a garment", devis: true },
```

Notez bien : il n'y a **pas** de `prix:` sur cette ligne. Si vous décidez plus
tard d'afficher un montant, remplacez `devis: true` par `prix: 45`.

### Ajouter une prestation

Copiez une ligne existante, collez-la juste en dessous, et modifiez les trois valeurs.
Chaque ligne se termine par une virgule, **sauf la dernière de son groupe**.

### Supprimer une prestation

Effacez la ligne entière, de l'accolade `{` jusqu'à la virgule finale incluse.

---

## 2. Changer un horaire

**Ouvrez `data/etablissement.js`.** Vous y verrez :

```js
const HORAIRES = {
  1: [[480, 750], [810, 1110]],   // lundi     8h00–12h30 · 13h30–18h30
  ...
  6: [[480, 720]],                // samedi    8h00–12h00
  0: []                           // dimanche  fermé
};
```

Les heures sont écrites **en minutes depuis minuit**. Pour convertir :

> **heure × 60 + minutes**
> 8h00 → 8 × 60 = **480**
> 12h30 → 12 × 60 + 30 = **750**
> 18h30 → 18 × 60 + 30 = **1110**

Chaque `[début, fin]` est une plage d'ouverture. Deux plages = une pause à midi.

**Exemple : fermer le samedi.** Remplacez `6: [[480, 720]],` par `6: [],`

**Exemple : ouvrir le samedi jusqu'à 16h.** 16h = 16 × 60 = 960.
Écrivez `6: [[480, 960]],`

### C'est le seul endroit à changer

Le bandeau vert en haut des pages, le tableau des horaires et le pied de page
se remplissent tout seuls à partir de ce fichier. Vous corrigez une fois, les
six pages suivent.

Le bandeau vert n'affiche d'ailleurs pas les horaires : il affiche
« Ouvert · jusqu'à 18h30 » ou « Fermé · ouvre à 13h30 », calculé à l'heure
qu'il est. La pause de midi est prise en compte automatiquement.

---

## 2 bis. Changer le téléphone, l'adresse ou le courriel

Même fichier, `data/etablissement.js`, tout en haut :

```js
telephone:      "022 341 68 18",
telephoneLien:  "+41223416818",
emailNom:       "pressingdevernier",
emailDomaine:   "gmail.com",
```

Si vous changez le numéro, changez **les deux lignes** : la première est le
numéro affiché, la seconde celui que le téléphone compose quand on clique.
Elle s'écrit sans espace ni zéro initial, précédée de `+41`.

**Le courriel est coupé en deux** : ce qui est avant l'arobase (`emailNom`),
puis ce qui est après (`emailDomaine`). Le site les rassemble à l'affichage,
pour que les robots qui ramassent les adresses ne la trouvent pas. Si vous
changez d'adresse, changez les deux morceaux, **et** le texte de secours
« pressingdevernier — arobase — gmail.com » écrit dans les pages (il ne
s'affiche que si le navigateur n'exécute pas le JavaScript). Pour le trouver
dans toutes les pages d'un coup, demandez de l'aide.

---

## 3. Changer un texte

Ouvrez la page concernée et cherchez le texte avec Ctrl+F.

Vous verrez le texte entouré de balises, par exemple :

```html
<p class="chapo">Ourlets, doublures, fermetures, reprises et transformations.</p>
```

**Modifiez uniquement ce qui est entre `>` et `<`.** Ne touchez pas aux balises.

```html
<p class="chapo">Votre nouveau texte ici.</p>
```

Le site est en français uniquement : un texte ne se change qu'à un seul endroit.

⚠️ Deux exceptions, tout en haut de chaque page, qu'il faut penser à corriger
si vous modifiez un titre : la balise `<title>` (le nom de l'onglet, qui
s'affiche aussi dans Google) et la ligne `<meta name="description">` (le
résumé sous le lien dans Google).

---

## 4. Ajouter une photo

**Étape 1.** Préparez l'image. Elle doit faire **au maximum 1600 pixels de large**
et peser **moins de 300 ko**. Une photo sortie du téléphone fait 4 Mo : elle
ralentirait le site. Redimensionnez-la avec Paint (Windows) ou un site comme
squoosh.app.

**Étape 2.** Donnez-lui un nom sans espace ni accent : `atelier-couture.jpg`,
pas `Photo de l'atelier.jpg`.

**Étape 3.** Déposez le fichier dans le dossier `assets/`.

**Étape 4.** Dans la page, trouvez l'emplacement réservé. Ils ressemblent à ceci :

```html
<figure class="plan revele" style="aspect-ratio:3/4">
  <figcaption class="epingle"><b>La devanture</b><span>Photo à fournir</span></figcaption>
</figure>
```

Remplacez tout le bloc par :

```html
<figure class="revele">
  <img src="assets/atelier-couture.jpg" alt="L'atelier de couture du Pressing de Vernier">
</figure>
```

Le texte après `alt=` décrit l'image pour les personnes malvoyantes et pour Google.
Décrivez ce qu'on voit, en une phrase.

### La galerie des réalisations

La page Couture contient une galerie avant/après déjà préparée, mais **mise en
commentaire** : elle ne s'affiche pas tant que vous n'avez pas de photos.

Quand vous en aurez, ouvrez `couture.html`, cherchez `GALERIE DES RÉALISATIONS`,
et supprimez les deux lignes qui encadrent le bloc : celle qui commence par
`<!--` juste avant, et celle qui finit par `-->` juste après. Préparez les
images comme expliqué ci-dessus.

N'affichez jamais une galerie vide ou des emplacements en attente : mieux vaut
pas de galerie du tout.

---

## 5. Le plan d'accès

L'emplacement du plan attend une image. **N'utilisez pas une capture d'écran de
Google Maps** : c'est interdit sur un site commercial sans licence.

Utilisez OpenStreetMap, qui est libre :

1. Allez sur **openstreetmap.org**, cherchez « 201 route de Vernier ».
2. Cadrez comme vous le souhaitez.
3. Bouton **Partager** à droite → onglet **Image** → téléchargez.
4. Renommez `plan.png`, déposez dans `assets/`, et remplacez le bloc `.plan`
   comme pour une photo.
5. **Obligatoire** : ajoutez dessous la mention `© OpenStreetMap`.

Le bouton « Itinéraire » fonctionne déjà et n'a pas besoin d'image.

---

## 6. Vérifier avant de publier

**Toujours.** Double-cliquez sur `index.html` : la page s'ouvre dans votre navigateur.
Cliquez dans les menus, ouvrez la page des tarifs, vérifiez que vos prix
apparaissent — et que les horaires s'affichent bien en bas de page.

**Si la page des tarifs est vide**, ou si les horaires ne s'affichent pas,
vous avez fait une faute de frappe dans `data/tarifs.js` ou dans
`data/etablissement.js`. Neuf fois sur dix : une virgule manquante, un guillemet en trop,
ou une virgule à la place d'un point dans un prix.

Pour trouver l'erreur : appuyez sur **F12** dans le navigateur, onglet **Console**.
Le message rouge indique le numéro de la ligne fautive.

---

## 7. Publier la modification

Ouvrez PowerShell dans le dossier du site et tapez ces commandes,
**une par une**. Le détail, avec ce que vous devez voir à l'écran à chaque
étape, est dans `DEPLOIEMENT.md`, section 3.3.

D'abord, regardez ce qui a changé :

```powershell
git status
```

Seuls les fichiers que vous avez modifiés doivent apparaître en rouge, après
`modified:`. Puis ajoutez **ces fichiers-là, un par un, par leur nom** :

```powershell
git add data/tarifs.js
```

**N'utilisez jamais `git add .`** (avec un point) : cette commande embarque
tout le dossier, y compris des dossiers de travail comme `.design/`, et les
publierait dans le dépôt public, lisible par tout le monde.

```powershell
git commit -m "Nouveau prix pour l'ourlet simple"
```

Remplacez le texte entre guillemets par ce que vous avez fait. Ça vous servira
plus tard pour retrouver quand un changement a eu lieu.

```powershell
git push
```

Comptez **une à deux minutes** avant que le site en ligne soit à jour.

---

## 8. Revenir en arrière

**Vous n'avez pas encore publié** — pour annuler votre modification d'un
fichier et revenir au dernier état publié :

```powershell
git restore data/tarifs.js
```

**Vous avez déjà publié** — pour voir l'historique :

```powershell
git log --oneline
```

Notez le code à gauche de la ligne qui vous intéresse (par exemple `d24ce48`),
puis restaurez un fichier tel qu'il était à ce moment-là :

```powershell
git checkout d24ce48 -- data/tarifs.js
```

Puis publiez comme au point 7.

---

## Ce qu'il ne faut pas toucher

| Fichier | Pourquoi |
|---|---|
| `assets/style.css` | l'apparence de tout le site. Une erreur ici casse toutes les pages |
| `assets/polices/` | les polices de caractères |
| `assets/vetements.js` | les neuf dessins techniques de la page Couture |
| `assets/site.js` | ce qui fait fonctionner le site |
| `favicon.svg` | l'icône de l'onglet |

Si vous avez besoin de changer quelque chose dans ces fichiers, demandez.

---

## En cas de doute

Ne publiez pas. Le site en ligne reste tel qu'il est tant que vous ne faites pas
`git push`. Vous pouvez annuler la modification d'un fichier avec
`git restore` suivi du nom du fichier (voir le point 8), et repartir de zéro.
