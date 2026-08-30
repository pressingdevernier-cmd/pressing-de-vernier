# Comment modifier le site

Ce guide est écrit pour être suivi **sans rien connaître au code**.
Prenez votre temps, faites une modification à la fois, et vérifiez avant de publier.

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
| Un horaire d'ouverture | `assets/site.js` |
| Un texte d'une page | la page elle-même : `index.html`, `couture.html`… |
| Une photo | dossier `assets/` puis la page concernée |
| Le numéro de téléphone, l'adresse | toutes les pages (voir plus bas) |

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

### Ajouter une prestation

Copiez une ligne existante, collez-la juste en dessous, et modifiez les trois valeurs.
Chaque ligne se termine par une virgule, **sauf la dernière de son groupe**.

### Supprimer une prestation

Effacez la ligne entière, de l'accolade `{` jusqu'à la virgule finale incluse.

---

## 2. Changer un horaire

**Ouvrez `assets/site.js`.** Tout en haut, vous verrez :

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

### Attention : il y a un deuxième endroit

Le texte affiché dans le tableau des horaires et dans le pied de page est écrit
**en toutes lettres dans chaque page**. Cherchez `8h00 – 12h30` avec la fonction
*Rechercher* (Ctrl+F) et corrigez-le dans les **dix pages** :
les cinq à la racine, et les cinq dans le dossier `en/` (en anglais).

C'est le point le plus pénible de ce site, et je préfère vous le dire franchement.
Si vous changez souvent d'horaires, demandez qu'on centralise ça.

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

⚠️ Si vous changez un texte en français, changez aussi la version anglaise
dans le fichier correspondant du dossier `en/`.

| Page française | Page anglaise |
|---|---|
| `index.html` | `en/index.html` |
| `couture.html` | `en/sewing.html` |
| `nettoyage.html` | `en/cleaning.html` |
| `maison.html` | `en/house.html` |
| `trouver.html` | `en/find-us.html` |

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

⚠️ Dans les pages du dossier `en/`, le chemin devient `../assets/atelier-couture.jpg`
— avec les deux points au début.

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
Cliquez dans les menus, ouvrez la page des tarifs, vérifiez que vos prix apparaissent.

**Si la page des tarifs est vide**, vous avez fait une faute de frappe dans
`data/tarifs.js`. Neuf fois sur dix : une virgule manquante, un guillemet en trop,
ou une virgule à la place d'un point dans un prix.

Pour trouver l'erreur : appuyez sur **F12** dans le navigateur, onglet **Console**.
Le message rouge indique le numéro de la ligne fautive.

---

## 7. Publier la modification

Ouvrez PowerShell dans le dossier du site et tapez ces trois commandes,
**une par une** :

```powershell
git add .
```

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

**Vous n'avez pas encore publié** — pour tout annuler et revenir au dernier
état publié :

```powershell
git restore .
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
| `assets/lib/three.module.min.js` | la bibliothèque d'animation. Illisible et normal |
| `assets/polices/` | les polices de caractères |
| `favicon.svg` | l'icône de l'onglet |

Si vous avez besoin de changer quelque chose dans ces fichiers, demandez.

---

## En cas de doute

Ne publiez pas. Le site en ligne reste tel qu'il est tant que vous ne faites pas
`git push`. Vous pouvez tout annuler avec `git restore .` et repartir de zéro.
