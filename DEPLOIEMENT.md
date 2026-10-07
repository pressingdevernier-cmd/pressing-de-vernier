# Le site en ligne : comment il marche, comment le mettre à jour

Ce guide décrit ce qui existe **vraiment** aujourd'hui (octobre 2026). Il est
écrit pour quelqu'un qui n'y connaît rien, ou qui a tout oublié.

Pour le détail de chaque modification (horaires, textes, cas particuliers des
prix), voir l'autre guide : **`COMMENT-MODIFIER.md`**, dans le même dossier.

---

## 1. En un coup d'œil

| Quoi | Où |
|---|---|
| Le site, tel que les clients le voient | https://pressingdevernier-cmd.github.io/pressing-de-vernier/ |
| La copie de travail, sur cet ordinateur | `C:\Users\carre\OneDrive\Desktop\Pressing\APPLICATIONS\site-pressing` |
| La sauvegarde en ligne (le « dépôt ») | https://github.com/pressingdevernier-cmd/pressing-de-vernier |
| Le compte GitHub | `pressingdevernier-cmd` |
| La version publiée | la branche **`pages-metier-et-tarifs`** |

**Comment ça marche, en trois phrases.** Le site est un dossier de fichiers
sur cet ordinateur. Quand on « pousse » (envoie) ce dossier sur GitHub, GitHub
le garde en sauvegarde **et** le publie sur l'adresse ci-dessus, tout seul, en
une à deux minutes. Il n'y a rien d'autre : pas de serveur à louer, pas de base
de données, pas d'abonnement.

**Deux mots à connaître.**

- **Git** : le logiciel qui garde l'historique de chaque modification. On peut
  toujours revenir en arrière.
- **Une branche** : une version parallèle du site. Aujourd'hui, la version
  publiée s'appelle `pages-metier-et-tarifs`. La branche `main`, qui est
  normalement la version publiée, est restée en arrière : c'est le point à
  régler le jour de la mise en ligne officielle (section 4).

**Attention : le dépôt est public.** N'importe qui peut lire tous les fichiers
et tout leur historique sur github.com. Ne mettez jamais dans ce dossier un mot
de passe, un document client ou une information privée.

---

## 2. Où se trouve quoi

| Ce que vous cherchez | Où |
|---|---|
| Les prix | `data/tarifs.js` |
| Horaires, téléphone, adresse, courriel, numéro IDE, date des tarifs | `data/etablissement.js` |
| Les pages | les fichiers `.html` à la racine du dossier (`index.html` est l'accueil) |
| Mentions légales, protection des données | `mentions-legales.html`, `confidentialite.html` |
| La mise en forme (couleurs, tailles) | `assets/style.css` |
| Le comportement des pages (tableaux de prix, horaires, recherche) | `assets/site.js` |
| Les illustrations des six métiers | `assets/illustrations/` |
| Les polices de caractères | `assets/polices/` |
| Le plan de la page Nous trouver | écrit dans `trouver.html` ; son dessin d'origine est dans `..\imprimes\flyer\` |
| La liste de ce qui n'est **pas** publié | `_config.yml` |

**Ce qui est sauvegardé mais pas publié** (listé dans `_config.yml`) : les
guides (`COMMENT-MODIFIER.md`, ce fichier, `PROMPT.md` qui est le cahier des
charges du site), le dossier `test/` et le dossier `.design/` (captures de
travail). Ils sont visibles sur github.com, mais pas sur l'adresse du site.

**Ce qui n'est ni sauvegardé ni publié** : le dossier `maquette/` (essais de
conception), exclu par le fichier `.gitignore`.

---

## 3. Changer un prix et le publier

Exemple : l'ourlet simple passe de 18 à 20 francs.

### 3.1 Modifier le prix

1. Ouvrez le dossier `site-pressing`, puis le dossier `data`.
2. Clic droit sur `tarifs.js` → **Ouvrir avec** → **Bloc-notes**.
3. Cherchez la ligne avec **Ctrl+F** (tapez `Ourlet simple`). Elle ressemble à :

   ```
   { fr: "Ourlet simple piqué machine", en: "Machine-stitched hem", prix: 18 },
   ```

4. Remplacez **seulement le nombre** après `prix:` : `18` devient `20`.
   Ne touchez ni aux virgules, ni aux guillemets, ni aux accolades.
   Pour un prix avec centimes, utilisez un **point** : `5.50`, jamais `5,50`.
5. Enregistrez avec **Ctrl+S** et fermez le Bloc-notes.
6. Si les prix changent pour de bon, mettez aussi à jour la date affichée sous
   les tableaux : dans `data/etablissement.js`, la ligne `tarifsMaj:`.

### 3.2 Vérifier avant de publier

1. Double-cliquez sur `tarifs.html` : la page s'ouvre dans votre navigateur.
2. Tapez « ourlet » dans le champ de recherche de la page.
3. **Vous devez voir** le nouveau prix, 20.–.

Si la page des tarifs est vide, il y a une faute de frappe (souvent une virgule
effacée). Rouvrez le fichier et comparez la ligne avec ses voisines.

### 3.3 Publier

1. Ouvrez PowerShell **dans le dossier du site** : dans l'Explorateur Windows,
   ouvrez `site-pressing`, cliquez dans la barre d'adresse en haut, tapez
   `powershell` et appuyez sur Entrée.

2. Regardez ce qui a changé :

   ```powershell
   git status
   ```

   **Vous devez voir** `On branch pages-metier-et-tarifs`, puis en rouge
   `modified: data/tarifs.js`. Si un autre fichier apparaît que vous n'avez pas
   voulu changer, arrêtez-vous et demandez de l'aide.

3. Préparez l'envoi du fichier modifié, **et de lui seul** :

   ```powershell
   git add data/tarifs.js
   ```

   (Ajoutez `data/etablissement.js` de la même façon si vous avez changé la
   date.) N'utilisez pas `git add .` : cette commande embarque tout le dossier,
   y compris des fichiers de travail qui n'ont rien à faire en ligne.

   Cette commande n'affiche rien. C'est normal.

4. Enregistrez la modification avec une phrase qui dit ce que vous avez fait :

   ```powershell
   git commit -m "Ourlet simple a 20 francs"
   ```

   **Vous devez voir** une ligne qui contient `1 file changed`.

5. Envoyez :

   ```powershell
   git push
   ```

   **Vous devez voir**, à la fin, une ligne qui se termine par
   `pages-metier-et-tarifs -> pages-metier-et-tarifs`.

6. Attendez **deux minutes**, ouvrez l'adresse du site et faites **Ctrl+F5**
   (rechargement complet, sinon le navigateur montre l'ancienne version
   gardée en mémoire). Le nouveau prix est en ligne.

### 3.4 Revenir en arrière

**Pas encore publié** — annuler votre modification d'un fichier :

```powershell
git restore data/tarifs.js
```

**Déjà publié** — voir l'historique, une ligne par modification :

```powershell
git log --oneline -10
```

Notez le code de 7 caractères au début de la ligne d'**avant** l'erreur (par
exemple `8a03919`), puis :

```powershell
git checkout 8a03919 -- data/tarifs.js
```

Vérifiez (3.2), puis publiez (3.3).

---

## 4. Basculer vers la mise en ligne officielle

Aujourd'hui, le site est publié depuis la branche de travail
`pages-metier-et-tarifs`, sur une adresse en `github.io`. La mise en ligne
officielle, c'est trois choses : remettre la publication sur la branche
`main`, brancher le nom de domaine, et vérifier.

**Avant de commencer** : relisez les deux pages légales, et faites-les relire
par quelqu'un de compétent si un doute subsiste.

### 4.1 Remettre la publication sur `main`

La branche `main` contient une version ancienne du site. Toute la suite est
sur `pages-metier-et-tarifs`, qui part de `main` : on peut donc avancer `main`
jusqu'au même point sans rien perdre ni rien fusionner à la main.

Dans PowerShell, dans le dossier du site :

1. ```powershell
   git switch main
   ```
   **Vous devez voir** `Switched to branch 'main'`.

2. ```powershell
   git merge --ff-only pages-metier-et-tarifs
   ```
   **Vous devez voir** `Fast-forward`. Si vous voyez `fatal: Not possible to
   fast-forward`, arrêtez-vous : quelqu'un a modifié `main` entre-temps, et il
   faut de l'aide.

3. ```powershell
   git push origin main
   ```
   **Vous devez voir** une ligne qui se termine par `main -> main`.

4. Sur github.com, dans le dépôt :
   - **Settings → Pages** : sous **Branch**, choisissez `main`, dossier
     `/ (root)`, puis **Save**.
   - **Settings → General** : sous **Default branch**, choisissez `main`.

5. Attendez deux minutes et vérifiez que le site s'affiche toujours.

**À partir de là, on travaille sur `main`.** Dans la section 3, `git status`
doit afficher `On branch main`, et `git push` se termine par `main -> main`.

### 4.2 Brancher le nom de domaine

1. **Acheter le domaine** (par exemple `pressingdevernier.ch`, si disponible)
   chez un bureau d'enregistrement suisse — **Infomaniak** ou **Hostpoint**.
   Environ quinze francs par an. Prenez **seulement le domaine** : ni
   hébergement, ni « pack site web ».

2. **Faire vérifier le domaine par GitHub, avant tout le reste.** Sur
   github.com : photo de profil → **Settings → Pages → Add a domain**. GitHub
   donne un code à recopier dans la zone DNS (voir l'étape 4). Cette
   vérification empêche quelqu'un d'autre d'utiliser votre domaine.

3. **Déclarer le domaine au site** : dans le dépôt, **Settings → Pages →
   Custom domain**, tapez le domaine, **Save**. GitHub ajoute alors un fichier
   `CNAME` au dépôt. **Ne le supprimez jamais.**

4. **Configurer la zone DNS** chez le bureau d'enregistrement (menu « Zone
   DNS » ou « Enregistrements DNS »). C'est l'annuaire qui dit aux navigateurs
   où trouver le site. Créez :

   | Type | Nom | Valeur |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | AAAA | @ | 2606:50c0:8000::153 |
   | AAAA | @ | 2606:50c0:8001::153 |
   | AAAA | @ | 2606:50c0:8002::153 |
   | AAAA | @ | 2606:50c0:8003::153 |
   | CNAME | www | pressingdevernier-cmd.github.io |

   Ce sont les adresses officielles de GitHub Pages (vérifiées en octobre
   2026 sur docs.github.com). La prise en compte prend de quelques minutes à
   24 heures.

5. **Activer HTTPS** : dans **Settings → Pages**, cochez **Enforce HTTPS**
   dès que la case n'est plus grisée (jusqu'à une heure). Sans elle, les
   navigateurs affichent « Site non sécurisé ».

6. **Récupérer le fichier `CNAME`** sur cet ordinateur :

   ```powershell
   git pull
   ```

### 4.3 Vérifier

- L'adresse avec et sans `www` ouvre le site, avec le cadenas.
- Les onze pages, la recherche des tarifs, le bouton Itinéraire, le lien
  téléphone sur un portable.
- L'ancienne adresse en `github.io` renvoie vers la nouvelle (GitHub le fait
  tout seul).

---

## 5. Problèmes courants

| Ce que vous voyez | Ce qui se passe | Que faire |
|---|---|---|
| `git push` refusé (`rejected`) | le dépôt en ligne a reçu une modification d'ailleurs | `git pull`, puis à nouveau `git push` |
| La modification n'apparaît pas en ligne | le navigateur montre l'ancienne version | attendre deux minutes, puis **Ctrl+F5** |
| La page des tarifs est vide | faute de frappe dans `data/tarifs.js` | **F12** dans le navigateur, onglet **Console** : le message rouge donne le numéro de ligne |
| `git status` montre des fichiers inconnus | des fichiers de travail traînent dans le dossier | ne les ajoutez pas ; n'envoyez que vos fichiers modifiés |
| `not a git repository` | PowerShell n'est pas dans le bon dossier | rouvrez-le depuis le dossier `site-pressing` (3.3, point 1) |
| « Site non sécurisé » | HTTPS pas encore activé | 4.2, point 5 |

---

## 6. Ce qu'il faut garder précieusement

1. **L'accès au compte GitHub `pressingdevernier-cmd`** (adresse, mot de passe,
   et codes de secours de la double authentification). Sans lui, plus aucune
   publication n'est possible. Notez-les ailleurs que sur cet ordinateur.
2. **L'accès au bureau d'enregistrement** du domaine, le jour où il existe.
   Un domaine non renouvelé est perdu, et le site avec.
3. **Le dossier `site-pressing`** : il est aussi sur GitHub, donc en double.

---

## 7. Ce que ça coûte

- Hébergement : rien (GitHub Pages est gratuit pour un dépôt public).
- Certificat HTTPS : rien, fourni par GitHub.
- Polices : rien, elles sont dans le dossier.
- Nom de domaine : environ quinze francs par an. C'est la seule dépense.

Le site entier tient dans le dossier `site-pressing`. On peut le copier sur
une clé USB et le republier ailleurs à tout moment.
