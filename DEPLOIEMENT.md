# Mettre le site en ligne

Toutes les commandes de ce guide se tapent dans **PowerShell**, dans le dossier du site.

**Pour ouvrir PowerShell au bon endroit :** ouvrez le dossier `site-pressing` dans
l'Explorateur Windows, cliquez dans la barre d'adresse en haut, tapez `powershell`
et appuyez sur Entrée.

Pour vérifier que vous êtes au bon endroit, tapez :

```powershell
git status
```

Vous devez voir une réponse mentionnant `main`. Si vous voyez une erreur
« not a git repository », vous n'êtes pas dans le bon dossier.

---

## Étape 1 — Créer le dépôt sur GitHub

1. Connectez-vous sur **github.com**.
2. En haut à droite, cliquez sur le **+** puis **New repository**.
3. Remplissez :
   - **Repository name** : `pressing-de-vernier`
   - **Description** : *Site du Pressing de Vernier*
   - Cochez **Public** — obligatoire pour que l'hébergement gratuit fonctionne.
   - **Ne cochez rien d'autre.** Surtout pas « Add a README file » : le dépôt
     doit rester vide, sinon la suite échouera.
4. Cliquez sur **Create repository**.

GitHub affiche alors une page avec des commandes. **Ignorez-les**, celles
ci-dessous sont adaptées à votre situation.

---

## Étape 2 — Relier votre dossier à GitHub

Remplacez `VOTRE-COMPTE` par votre nom d'utilisateur GitHub :

```powershell
git remote add origin https://github.com/VOTRE-COMPTE/pressing-de-vernier.git
```

Cette commande ne renvoie rien. C'est normal : pas de nouvelle, bonne nouvelle.

Vérifiez qu'elle a fonctionné :

```powershell
git remote -v
```

Vous devez voir deux lignes contenant votre adresse GitHub.

---

## Étape 3 — Envoyer le site

```powershell
git push -u origin main
```

Une fenêtre s'ouvre pour vous demander de vous connecter à GitHub. Suivez-la.

À la fin, vous verrez plusieurs lignes se terminant par quelque chose comme
`main -> main`. Le code est sur GitHub.

Allez sur `github.com/VOTRE-COMPTE/pressing-de-vernier` : vos fichiers y sont.

---

## Étape 4 — Activer l'hébergement

1. Sur la page de votre dépôt, cliquez sur **Settings** (en haut à droite).
2. Dans la colonne de gauche, cliquez sur **Pages**.
3. Sous **Source**, choisissez **Deploy from a branch**.
4. Sous **Branch**, choisissez **main**, laissez le dossier sur **/ (root)**.
5. Cliquez sur **Save**.

Patientez **deux à trois minutes**, puis rechargez la page. Un bandeau vert
apparaît avec l'adresse de votre site :

```
https://VOTRE-COMPTE.github.io/pressing-de-vernier/
```

Ouvrez-la. Le site est en ligne.

---

## Étape 5 — Publier une modification

Une fois les étapes 1 à 4 faites, elles ne se refont jamais. Pour publier un
changement, il suffit de trois commandes :

```powershell
git add .
```

```powershell
git commit -m "Décrivez ici ce que vous avez changé"
```

```powershell
git push
```

Le site en ligne se met à jour tout seul en **une à deux minutes**.

**Si vous ne voyez pas le changement**, ce n'est probablement pas une panne :
votre navigateur affiche l'ancienne version en mémoire. Faites **Ctrl+F5**
pour forcer le rechargement.

---

## Étape 6 — Brancher votre nom de domaine

À faire **plus tard**, quand vous aurez acheté le domaine. Le site fonctionne
parfaitement sans.

### 6.1 — Acheter le domaine

`pressingdevernier.ch` doit d'abord être vérifié comme disponible.
Les domaines suisses en `.ch` se réservent chez un bureau d'enregistrement
accrédité — **Infomaniak** et **Hostpoint** sont les deux principaux en Suisse.
Comptez **une quinzaine de francs par an**.

Vous n'avez besoin **que du domaine**. Ne prenez ni hébergement, ni boîte mail,
ni « pack site web » : GitHub héberge déjà gratuitement.

### 6.2 — Configurer les adresses techniques

Dans l'interface de votre bureau d'enregistrement, cherchez **Zone DNS**
ou **Gestion des enregistrements**. Créez ceci :

**Quatre enregistrements de type A**, tous avec le nom `@` :

| Type | Nom | Valeur |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**Un enregistrement de type CNAME** :

| Type | Nom | Valeur |
|---|---|---|
| CNAME | www | VOTRE-COMPTE.github.io |

Les quatre adresses A sont celles de GitHub et ne changent pas.
La propagation prend **de quelques minutes à 24 heures**.

### 6.3 — Déclarer le domaine à GitHub

Retournez dans **Settings → Pages**. Dans le champ **Custom domain**,
tapez `pressingdevernier.ch` et cliquez sur **Save**.

Attendez que GitHub affiche une coche verte, puis cochez **Enforce HTTPS**.
Cette case peut rester grisée pendant une heure : c'est normal, GitHub fabrique
le certificat de sécurité. **Ne sautez pas cette étape** : sans elle, les
navigateurs afficheront « Site non sécurisé ».

### 6.4 — Après le branchement

GitHub crée automatiquement un fichier `CNAME` dans votre dépôt.
**Ne le supprimez pas.** Récupérez-le dans votre dossier local :

```powershell
git pull
```

---

## Résoudre les problèmes courants

| Symptôme | Cause probable | Solution |
|---|---|---|
| `git push` refusé | quelqu'un a modifié le dépôt en ligne | tapez `git pull`, puis refaites `git push` |
| Page blanche en ligne | fichier `index.html` absent ou mal nommé | vérifiez qu'il est bien à la racine, en minuscules |
| Le site n'a pas de mise en forme | mauvais chemin vers le style | vérifiez que le dossier `assets/` est bien en ligne |
| Les tarifs n'apparaissent pas | erreur dans `data/tarifs.js` | voir *Comment modifier*, point 6 |
| Modification invisible | mémoire du navigateur | **Ctrl+F5** |
| « Site non sécurisé » | HTTPS pas encore activé | Settings → Pages → cochez *Enforce HTTPS* |

---

## Ce que vous devez garder

Trois choses, notées quelque part de sûr :

1. **Vos identifiants GitHub** — sans eux, plus de publication possible.
2. **Le dossier `site-pressing`** — il est aussi sur GitHub, donc en double.
   C'est votre sauvegarde.
3. **Vos identifiants chez le bureau d'enregistrement** du domaine, le jour
   où vous en aurez un.

---

## Ce que ce site ne coûte pas

- **Hébergement** : zéro. GitHub Pages est gratuit pour un dépôt public.
- **Certificat de sécurité** : zéro, fourni par GitHub.
- **Polices de caractères** : zéro, elles sont dans votre dépôt.
- **Nom de domaine** : environ 15 francs par an, et c'est la seule dépense.

Aucun service extérieur ne stocke votre contenu. Le site entier tient dans
le dossier `site-pressing` : vous pouvez le copier sur une clé USB et le
remettre en ligne ailleurs à tout moment.
