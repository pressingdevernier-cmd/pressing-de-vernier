# Le site en ligne : comment il marche, comment le mettre à jour

Ce guide décrit ce qui existe **vraiment** aujourd'hui (octobre 2026). Il est
écrit pour quelqu'un qui n'y connaît rien, ou qui a tout oublié.

Pour le détail de chaque modification (horaires, textes, cas particuliers des
prix), voir l'autre guide : **`COMMENT-MODIFIER.md`**, dans le même dossier.

---

## 1. En un coup d'œil

| Quoi | Où |
|---|---|
| Le site, tel que les clients le voient | **https://pressingdevernier.ch** |
| Le domaine et sa zone DNS | Infomaniak (section 4) |
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
  normalement la version publiée, est restée en arrière : c'est le dernier
  point à régler (section 5).

**Attention : le dépôt est public.** N'importe qui peut lire tous les fichiers
et tout leur historique sur github.com. Ne mettez jamais dans ce dossier un mot
de passe, un document client ou une information privée.

**L'adresse Gmail apparaît comme auteur** de nombreuses modifications dans
l'historique public du dépôt, et en clair dans les guides `.md`. C'est un
choix délibéré (octobre 2026) : c'est l'adresse commerciale, déjà publique.
Le masquage de l'adresse sur le site (section 2) n'y change rien.

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
| L'adresse sur laquelle GitHub publie | `CNAME` (une ligne : `pressingdevernier.ch`) |
| La liste des pages pour Google | `sitemap.xml` et `robots.txt` |

**Le courriel est coupé en deux** dans `data/etablissement.js` (`emailNom` et
`emailDomaine`) et rassemblé par le script à l'affichage, pour écarter les
robots qui ramassent les adresses. Sans JavaScript, les pages affichent
« pressingdevernier — arobase — gmail.com ».

**La sécurité des pages.** Chaque page commence par une « politique de
contenu » (la balise `Content-Security-Policy`) : le navigateur n'y charge que
les fichiers du site lui-même, et refuse tout script écrit dans la page. Si
un jour vous ajoutez un service extérieur (une carte intégrée, une vidéo, un
outil de statistiques), il sera bloqué tant que cette balise n'est pas
adaptée sur toutes les pages — et la page Protection des données devra le
mentionner. La protection contre l'affichage du site dans le cadre d'un
autre site est assurée par le script (`assets/site.js`, section 0) : GitHub
Pages ne permet pas de la poser autrement.

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

## 4. Le nom de domaine

Depuis le **8 octobre 2026**, le site répond sur **https://pressingdevernier.ch**.
Tout est en place ; cette section dit comment c'est réglé, pour le jour où
quelque chose cloche.

### 4.1 Qui fait quoi

| Quoi | Où | Qui s'en occupe |
|---|---|---|
| Le domaine `pressingdevernier.ch` (achat, renouvellement chaque année) | Infomaniak, compte du pressing | vous : **ne le laissez jamais expirer** |
| La zone DNS (l'annuaire qui dit où se trouve le site) | Infomaniak → Domaines → pressingdevernier.ch → Zone DNS | personne : elle ne bouge plus |
| La protection DNSSEC | Infomaniak → Domaines → pressingdevernier.ch → DNSSEC | Infomaniak, automatiquement |
| Le site, le certificat HTTPS | GitHub, dépôt `pressing-de-vernier` → Settings → Pages | GitHub, automatiquement (certificat renouvelé tout seul) |
| Le fichier `CNAME` du dépôt | à la racine du dossier `site-pressing` | personne : **ne le supprimez jamais** |

Le fichier `CNAME` contient une seule ligne, `pressingdevernier.ch`. C'est lui
qui dit à GitHub sur quelle adresse publier. Supprimé, le site retombe sur
l'ancienne adresse en `github.io`.

### 4.2 La zone DNS : ne pas y toucher sans raison

**La zone DNS se trouve chez Infomaniak** : Manager → **Domaines** →
**pressingdevernier.ch** → **Zone DNS**. Une erreur dans cette zone rend le
site introuvable pour tout le monde, parfois pendant des heures. Ne la
modifiez que pour une raison précise (par exemple créer une adresse de
courriel en `@pressingdevernier.ch`), et notez avant ce qu'il y avait.

Voici ce qu'elle doit contenir (vérifié le 8 octobre 2026). Les lignes NS et
SOA, créées par Infomaniak, n'apparaissent pas ici.

| Type | Source | Valeur | Rôle |
|---|---|---|---|
| A | *(vide)* | 185.199.108.153 | le site, adresse 1 |
| A | *(vide)* | 185.199.109.153 | le site, adresse 2 |
| A | *(vide)* | 185.199.110.153 | le site, adresse 3 |
| A | *(vide)* | 185.199.111.153 | le site, adresse 4 |
| AAAA | *(vide)* | 2606:50c0:8000::153 | le site, adresse moderne 1 |
| AAAA | *(vide)* | 2606:50c0:8001::153 | le site, adresse moderne 2 |
| AAAA | *(vide)* | 2606:50c0:8002::153 | le site, adresse moderne 3 |
| AAAA | *(vide)* | 2606:50c0:8003::153 | le site, adresse moderne 4 |
| CNAME | www | pressingdevernier-cmd.github.io | `www.pressingdevernier.ch` |
| TXT | _github-pages-challenge-pressingdevernier-cmd | *(code donné par GitHub)* | prouve à GitHub que le domaine est à vous |
| TXT | *(vide)* | v=spf1 -all | dit qu'aucun courriel ne part de `@pressingdevernier.ch` |

- **Ne supprimez pas le TXT `_github-pages-challenge…`** : sans lui, GitHub
  ne considère plus le domaine comme protégé, et quelqu'un d'autre pourrait
  tenter de l'utiliser.
- **Le TXT `v=spf1 -all`** empêche des fraudeurs d'envoyer de faux courriels
  au nom de `@pressingdevernier.ch`. Le jour où vous créez une adresse de
  courriel sur ce domaine, il faudra le remplacer — demandez de l'aide.
- **DNSSEC** signe la zone pour qu'on ne puisse pas la falsifier. Le 8 octobre
  2026, il était activé mais cassé (le site aurait été introuvable pour la
  plupart des visiteurs) ; Infomaniak l'a réparé. S'il faut un jour le
  désactiver, faites-le **dans Infomaniak**, jamais en supprimant des lignes
  à la main.

### 4.3 Les adresses qui mènent au site

Toutes aboutissent à **https://pressingdevernier.ch/**, avec le cadenas :

- `http://pressingdevernier.ch` → redirigée vers `https://` ;
- `www.pressingdevernier.ch` → redirigée vers `pressingdevernier.ch` ;
- l'ancienne adresse `pressingdevernier-cmd.github.io/pressing-de-vernier/`
  → redirigée vers la nouvelle, page par page.

### 4.4 Ce qui porte l'adresse dans le site

Si l'adresse changeait un jour, ou si vous ajoutez une page, ces endroits sont
à mettre à jour :

- dans chaque page `.html`, en tête : la ligne `<link rel="canonical" …>`
  (l'adresse de référence pour Google) et les lignes `og:…` (ce qu'affichent
  WhatsApp, Facebook et les messageries quand on partage un lien) ;
- `sitemap.xml` : la liste des pages, pour Google ;
- `robots.txt` : il indique à Google où trouver `sitemap.xml`.
- `assets/partage.png` : l'image (1200 × 630) qui accompagne un lien partagé.
  Elle porte le nom et l'adresse en dur : à refaire si l'adresse change.

Les données pour Google (horaires, adresse, téléphone) sont fabriquées par
`assets/site.js` et prennent l'adresse toutes seules.

---

## 5. Reste à faire : remettre la publication sur `main`

Le site est encore publié depuis la branche de travail `pages-metier-et-tarifs`.
Ce n'est pas un problème pour les visiteurs, mais la branche `main`, qui est
normalement la version publiée, est restée en arrière. Toute la suite est sur
`pages-metier-et-tarifs`, qui part de `main` : on peut avancer `main` jusqu'au
même point sans rien perdre.

Dans PowerShell, dans le dossier du site :

1. ```powershell
   git switch main
   ```
   **Vous devez voir** `Switched to branch 'main'`.

2. ```powershell
   git merge --ff-only pages-metier-et-tarifs
   ```
   **Vous devez voir** `Fast-forward`. Si vous voyez `fatal: Not possible to
   fast-forward`, arrêtez-vous : il faut de l'aide.

3. ```powershell
   git push origin main
   ```
   **Vous devez voir** une ligne qui se termine par `main -> main`.

4. Sur github.com, dans le dépôt :
   - **Settings → Pages** : sous **Branch**, choisissez `main`, dossier
     `/ (root)`, puis **Save**. Vérifiez que **Custom domain** affiche
     toujours `pressingdevernier.ch` et que **Enforce HTTPS** reste coché.
   - **Settings → General** : sous **Default branch**, choisissez `main`.

5. Attendez deux minutes et vérifiez que https://pressingdevernier.ch
   s'affiche toujours.

**À partir de là, on travaille sur `main`.** Dans la section 3, `git status`
doit afficher `On branch main`, et `git push` se termine par `main -> main`.

---

## 5. Problèmes courants

| Ce que vous voyez | Ce qui se passe | Que faire |
|---|---|---|
| `git push` refusé (`rejected`) | le dépôt en ligne a reçu une modification d'ailleurs (GitHub en fait parfois une lui-même, par exemple sur le fichier `CNAME`) | `git pull`, puis à nouveau `git push` |
| La modification n'apparaît pas en ligne | le navigateur montre l'ancienne version | attendre deux minutes, puis **Ctrl+F5** |
| La page des tarifs est vide | faute de frappe dans `data/tarifs.js` | **F12** dans le navigateur, onglet **Console** : le message rouge donne le numéro de ligne |
| `git status` montre des fichiers inconnus | des fichiers de travail traînent dans le dossier | ne les ajoutez pas ; n'envoyez que vos fichiers modifiés |
| `not a git repository` | PowerShell n'est pas dans le bon dossier | rouvrez-le depuis le dossier `site-pressing` (3.3, point 1) |
| « Site non sécurisé » ou site introuvable | certificat ou zone DNS en défaut | comparer la zone DNS avec le tableau de la section 4.2 ; dans GitHub, Settings → Pages doit afficher `pressingdevernier.ch` et **Enforce HTTPS** coché |

---

## 6. Ce qu'il faut garder précieusement

1. **L'accès au compte GitHub `pressingdevernier-cmd`** (adresse, mot de passe,
   et codes de secours de la double authentification). Sans lui, plus aucune
   publication n'est possible. Notez-les ailleurs que sur cet ordinateur.
2. **L'accès au compte Infomaniak** qui détient le domaine. Vérifiez que le
   renouvellement automatique est actif : un domaine non renouvelé est perdu,
   et le site avec.
3. **Le dossier `site-pressing`** : il est aussi sur GitHub, donc en double.

---

## 7. Ce que ça coûte

- Hébergement : rien (GitHub Pages est gratuit pour un dépôt public).
- Certificat HTTPS : rien, fourni par GitHub.
- Polices : rien, elles sont dans le dossier.
- Nom de domaine : environ quinze francs par an. C'est la seule dépense.

Le site entier tient dans le dossier `site-pressing`. On peut le copier sur
une clé USB et le republier ailleurs à tout moment.
