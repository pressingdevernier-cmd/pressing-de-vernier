/* ============================================================================
   PRESSING DE VERNIER — comportements communs à toutes les pages
   ----------------------------------------------------------------------------
   Il est decoupe en douze sections numerotees, dans cet ordre :
     1. ouvrir et fermer le menu sur téléphone
     2. faire apparaître les blocs quand on descend dans la page
     3. écrire partout les coordonnées et les horaires
     4. afficher « Ouvert » ou « Fermé » selon l'heure qu'il est
     5. construire les tableaux de prix
     6. afficher les planches à la craie (aucune page ne les emploie aujourd'hui)
     7. ranger, chercher et situer, sur la page Tarifs
     8. donner à Google l'adresse et les horaires du magasin
     9. mesurer le nom de l'enseigne et caler son cadre
    10. dresser les six métiers, sur la page d'accueil
    11. citer quelques prix choisis, hors d'un tableau
    12. résumer les horaires sur une ligne

   Vous n'avez normalement jamais besoin d'y toucher.
     Pour changer un prix    : data/tarifs.js
     Pour changer un horaire : data/etablissement.js
     Pour changer l'adresse
     ou le téléphone         : data/etablissement.js
   ============================================================================ */


/* ═══════════════════════════════════════════════════════════════════════════
   1 · MENU SUR TÉLÉPHONE
   ═══════════════════════════════════════════════════════════════════════════ */
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu-mobile');

if (burger && menu) {

  /* Une seule fonction ouvre et ferme. Trois choses doivent bouger ensemble —
     l'état annoncé du bouton, la visibilité du panneau et le verrou de
     défilement de la page — et les faire bouger à trois endroits différents,
     c'est se garantir qu'un jour l'une des trois restera en arrière. */
  /* `rendreLeFocus` : vrai quand c'est le visiteur qui ferme, faux quand
     c'est la fenêtre qui s'élargit. Dans ce second cas le bouton vient de
     passer en `display:none` avec la navigation qui reparaît — lui rendre le
     focus le perdrait dans le vide. */
  function basculerMenu(ouvrir, rendreLeFocus = true) {
    if (ouvrir === (burger.getAttribute('aria-expanded') === 'true')) return;
    burger.setAttribute('aria-expanded', String(ouvrir));
    menu.hidden = !ouvrir;
    document.body.style.overflow = ouvrir ? 'hidden' : '';

    /* Le reste de la page passe en `inert` : sans ça, la tabulation continue
       DERRIÈRE le panneau, sur des liens que le panneau recouvre entièrement.
       On ne peut pas le voir, on peut l'atteindre. */
    [...document.body.children].forEach(el => {
      if (el !== menu && el !== burger.closest('.entete')) el.inert = ouvrir;
    });

    if (ouvrir) menu.querySelector('a').focus();
    else if (rendreLeFocus) burger.focus();   /* le focus revient d'où il vient */
  }

  burger.addEventListener('click', () => {
    basculerMenu(burger.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => basculerMenu(false)));

  addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) basculerMenu(false);
  });

  /* Le menu n'existe qu'en dessous de 861 px. Au-dessus, la feuille de style
     masque le panneau ET le bouton : sans ce garde-fou, faire pivoter le
     téléphone ou élargir la fenêtre menu ouvert laisserait la page
     définitivement verrouillée, sans plus rien pour la déverrouiller. */
  const etroit = matchMedia('(max-width:860px)');
  const surveiller = () => { if (!etroit.matches) basculerMenu(false, false); };
  etroit.addEventListener ? etroit.addEventListener('change', surveiller)
                          : etroit.addListener(surveiller);
}


/* ═══════════════════════════════════════════════════════════════════════════
   1 bis · LA HAUTEUR DE LA BANDE DU LOGO
   ----------------------------------------------------------------------------
   Sur téléphone, l'en-tête est collant et remonté de la hauteur exacte de sa
   première bande : celle-ci sort de l'écran, la plaque du nom reste. Cette
   hauteur vaut 60 px plus un filet, mais c'est un `min-height` — un visiteur
   qui a forcé une taille de texte minimale dans son navigateur ferait grandir
   la bande, et le décalage figé laisserait une tranche visible au-dessus de
   la plaque. On mesure donc, et la feuille de style lit la mesure.
   ═══════════════════════════════════════════════════════════════════════════ */
function mesurerEnHauteur(selecteur, jeton) {
  const el = document.querySelector(selecteur);
  if (!el || !window.ResizeObserver) return;
  new ResizeObserver(([e]) => {
    document.documentElement.style.setProperty(
      jeton, Math.round(e.target.getBoundingClientRect().height) + 'px');
  }).observe(el);
}
mesurerEnHauteur('.ent-logo',   '--h-bande-logo');
/* La plaque du nom : sur téléphone c'est elle qui reste collée en haut, et
   la barre des tarifs doit se poser juste dessous. Sa hauteur change avec le
   nom, sur une ou deux lignes. */
mesurerEnHauteur('.ent-plaque', '--h-plaque');


/* ═══════════════════════════════════════════════════════════════════════════
   2 · APPARITION DES BLOCS AU DÉFILEMENT
   ═══════════════════════════════════════════════════════════════════════════ */
function revelerDans(racine) {
  const cibles = racine.querySelectorAll('.revele:not(.vu)');
  if (!cibles.length) return;
  const observateur = new IntersectionObserver(entrees => {
    entrees.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('vu'); observateur.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
  cibles.forEach(el => observateur.observe(el));
}


/* ═══════════════════════════════════════════════════════════════════════════
   3 · LES COORDONNÉES ET LES HORAIRES, ÉCRITS PARTOUT
   Tout vient de data/etablissement.js. Une seule correction là-bas met
   à jour les six pages, le bandeau vert et le pied de page.
   ═══════════════════════════════════════════════════════════════════════════ */

/* 480 → « 8h00 »   750 → « 12h30 » */
function heureLisible(minutes) {
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return h + 'h' + String(m).padStart(2, '0');
}

/* [[480,750],[810,1110]] → « 8h00 – 12h30 · 13h30 – 18h30 »   [] → « Fermé » */
function plagesLisibles(plages) {
  if (!plages.length) return 'Fermé';
  return plages.map(([a, b]) => heureLisible(a) + ' – ' + heureLisible(b)).join(' · ');
}

/* La semaine commence au lundi, pas au dimanche. */
const SEMAINE = [1, 2, 3, 4, 5, 6, 0];

const adresseCourte = ETABLISSEMENT.rue + ', ' + ETABLISSEMENT.codePostal + ' ' + ETABLISSEMENT.ville;

/* Le tableau des horaires — page d'accueil et blocs « Nous trouver » */
document.querySelectorAll('[data-horaires]').forEach(dl => {
  dl.innerHTML = '';
  SEMAINE.forEach(jour => {
    const ligne = document.createElement('div');
    ligne.dataset.jour = jour;
    const dt = document.createElement('dt');
    dt.textContent = JOURS[jour];
    const dd = document.createElement('dd');
    dd.textContent = plagesLisibles(HORAIRES[jour] || []);
    ligne.append(dt, dd);
    dl.append(ligne);
  });
});

/* Les horaires du pied de page */
document.querySelectorAll('[data-horaires-pied]').forEach(ul => {
  ul.innerHTML = '';
  SEMAINE.forEach(jour => {
    const li = document.createElement('li');
    const nom = document.createElement('span');
    nom.textContent = JOURS[jour];
    const heures = document.createElement('span');
    heures.textContent = plagesLisibles(HORAIRES[jour] || []);
    li.append(nom, ' ', heures);
    ul.append(li);
  });
});

/* LES HORAIRES GROUPÉS — trois lignes au lieu de sept
   Sept lignes dont cinq identiques, c'est un tableau, pas une information.
   Les jours qui se suivent et qui ont les mêmes plages sont réunis sur une
   ligne : « Lundi – Vendredi », « Samedi », « Dimanche ».

   Le groupement est CALCULÉ, jamais écrit en dur : fermer le mercredi dans
   data/etablissement.js coupe le groupe en deux tout seul, et le pied de page
   dit la vérité sans qu'on y touche. */
function semaineGroupee() {
  const groupes = [];
  SEMAINE.forEach(jour => {
    const heures = plagesLisibles(HORAIRES[jour] || []);
    const dernier = groupes[groupes.length - 1];
    if (dernier && dernier.heures === heures) dernier.fin = jour;
    else groupes.push({ debut: jour, fin: jour, heures: heures });
  });
  return groupes;
}

document.querySelectorAll('[data-horaires-groupes]').forEach(ul => {
  ul.innerHTML = '';
  semaineGroupee().forEach(g => {
    const li = document.createElement('li');
    const jours = document.createElement('span');
    jours.textContent = g.debut === g.fin
      ? JOURS[g.debut]
      : JOURS[g.debut] + ' – ' + JOURS[g.fin];
    const heures = document.createElement('span');
    heures.textContent = g.heures;
    li.append(jours, heures);
    ul.append(li);
  });
});

/* Le jour en cours est mis en valeur */
document.querySelectorAll('[data-jour]').forEach(el => {
  if (Number(el.dataset.jour) === new Date().getDay()) el.classList.add('aujourdhui');
});

/* Le téléphone : le texte affiché et le lien qui compose l'appel */
document.querySelectorAll('[data-tel]').forEach(el => {
  el.textContent = ETABLISSEMENT.telephone;
  if (el.tagName === 'A') el.href = 'tel:' + ETABLISSEMENT.telephoneLien;
});

/* L'adresse sur une ligne, puis sur trois lignes pour le pied de page */
document.querySelectorAll('[data-adresse]').forEach(el => { el.textContent = adresseCourte; });

document.querySelectorAll('[data-adresse-lignes]').forEach(el => {
  el.innerHTML = '';
  el.append(
    ETABLISSEMENT.rue, document.createElement('br'),
    ETABLISSEMENT.codePostal + ' ' + ETABLISSEMENT.ville, document.createElement('br'),
    ETABLISSEMENT.canton + ', ' + ETABLISSEMENT.pays
  );
});

/* L'adresse du pied : la rue, puis le code postal et la ville. Le canton et le
   pays sont dans les mentions légales trois lignes plus bas — les répéter ici
   ferait une ligne de plus sans rien apprendre à personne. */
document.querySelectorAll('[data-adresse-2l]').forEach(el => {
  el.innerHTML = '';
  el.append(
    ETABLISSEMENT.rue, document.createElement('br'),
    ETABLISSEMENT.codePostal + ' ' + ETABLISSEMENT.ville
  );
});

document.querySelectorAll('[data-email]').forEach(el => {
  el.textContent = ETABLISSEMENT.email;
  if (el.tagName === 'A') el.href = 'mailto:' + ETABLISSEMENT.email;
});

/* L'ITINÉRAIRE S'OUVRE DANS L'APPLICATION DE CARTES DU TÉLÉPHONE.
   Sur iPhone et iPad, un lien maps.apple.com ouvre Plans directement. Partout
   ailleurs, le lien d'itinéraire de Google Maps : Android le confie à
   l'application Google Maps, un ordinateur l'ouvre dans le navigateur.
   L'iPad récent se présente comme un Mac : c'est l'écran tactile qui le
   trahit. Sur téléphone le lien s'ouvre dans le même onglet — l'application
   prend la main, et un nouvel onglet resterait vide derrière elle. */
const appareilIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const appareilMobile = appareilIOS || /Android/i.test(navigator.userAgent);
const destination = ETABLISSEMENT.latitude + ',' + ETABLISSEMENT.longitude;
const lienItineraire = appareilIOS
  ? 'https://maps.apple.com/?daddr=' + destination + '&q=' + encodeURIComponent(ETABLISSEMENT.nom)
  : 'https://www.google.com/maps/dir/?api=1&destination=' + destination;

document.querySelectorAll('[data-itineraire]').forEach(el => {
  el.href = lienItineraire;
  if (appareilMobile) el.removeAttribute('target');
});

document.querySelectorAll('[data-mentions-legales]').forEach(el => {
  el.textContent = ETABLISSEMENT.raisonSociale + ' · ' + ETABLISSEMENT.nom + ' · ' + adresseCourte;
});

document.querySelectorAll('[data-depuis]').forEach(el => {
  el.textContent = 'Depuis ' + ETABLISSEMENT.depuis + ' à ' + ETABLISSEMENT.ville;
});


/* ═══════════════════════════════════════════════════════════════════════════
   4 · OUVERT OU FERMÉ, MAINTENANT
   La pause de midi est prise en compte : c'est tout l'intérêt de calculer
   cet état plutôt que de l'écrire à la main.
   ═══════════════════════════════════════════════════════════════════════════ */
function etatOuverture() {
  const d = new Date();
  const jour = d.getDay();
  const minutes = d.getHours() * 60 + d.getMinutes();
  const plages = HORAIRES[jour] || [];

  const enCours = plages.find(([a, b]) => minutes >= a && minutes < b);
  if (enCours) return { ouvert: true, texte: 'Ouvert · jusqu’à ' + heureLisible(enCours[1]) };

  const suivante = plages.find(([a]) => minutes < a);
  if (suivante) return { ouvert: false, texte: 'Fermé · ouvre à ' + heureLisible(suivante[0]) };

  /* Plus rien aujourd'hui : on cherche le prochain jour ouvré. */
  for (let i = 1; i <= 7; i++) {
    const j = (jour + i) % 7;
    if ((HORAIRES[j] || []).length) {
      const nom = JOURS[j].toLowerCase();
      return { ouvert: false, texte: 'Fermé · ouvre ' + nom + ' à ' + heureLisible(HORAIRES[j][0][0]) };
    }
  }
  return { ouvert: false, texte: 'Fermé aujourd’hui' };
}

document.querySelectorAll('[data-etat-ouverture]').forEach(el => {
  const e = etatOuverture();
  el.textContent = e.texte;
  /* Dans le bandeau, l'état est un lien vers les horaires complets : son
     texte seul ne dit pas où il mène. */
  if (el.tagName === 'A') el.setAttribute('aria-label', e.texte + ' — voir les horaires');
  el.classList.toggle('ferme', !e.ouvert);
});


/* ═══════════════════════════════════════════════════════════════════════════
   5 · LES TABLEAUX DE PRIX
   Construits à partir de data/tarifs.js. Un conteneur portant
   data-tarifs="identifiant-de-section" reçoit le tableau correspondant.
   data-tarifs="tout" affiche la liste complète.
   data-lignes="6" n'affiche que les six premières lignes de chaque section,
   et renvoie le reste à la page Tarifs.
   ═══════════════════════════════════════════════════════════════════════════ */
function formatPrix(n) {
  // 24 → « 24.– »   5.5 → « 5.50 »
  // Un montant absent rend un tiret. Sans ce garde-fou, `undefined.toFixed()`
  // lève une exception qui interrompt le script ENTIER : une seule ligne mal
  // saisie dans data/tarifs.js viderait la moitié de la page.
  if (!Number.isFinite(n)) return '—';
  return Number.isInteger(n) ? n + '.–' : n.toFixed(2);
}

/* `niveau` : le rang du titre de famille. Sur la page Tarifs les familles
   viennent directement sous le <h1> de la page — un <h3> y sauterait un
   niveau, ce qu'un lecteur d'ecran signale comme un trou dans le plan. Sur
   la page Couture elles sont imbriquees sous un <h2>, et <h3> est juste. */
/* « le kg », « le m² » : posé dans le montant, un cran plus petit. */
function uniteDePrix(unite) {
  const u = document.createElement('span');
  u.className = 'unite';
  u.textContent = unite.fr;
  return u;
}

function tableauSection(sec, niveau, maximum) {
  const doubles = Boolean(sec.colonnes);
  /* UN EXTRAIT, PAS LA SECTION ENTIÈRE. Une page de métier répond à
     « combien ça coûte », pas « quel est le prix de chaque article » : la
     literie compte dix-sept lignes, qui font à elles seules mille pixels.
     On en montre les premières — celles de data/tarifs.js, dans l'ordre où
     elles y sont écrites, donc les plus courantes — et le reste est à un
     bouton de distance. La source reste unique : rien n'est recopié. */
  const lignes = (maximum && sec.lignes.length > maximum)
    ? sec.lignes.slice(0, maximum) : sec.lignes;
  const coupees = sec.lignes.length - lignes.length;
  const bloc = document.createElement('section');
  bloc.className = 'tarif-bloc revele';
  bloc.id = sec.id;

  const titre = document.createElement(niveau || 'h3');
  titre.textContent = sec.fr;
  bloc.append(titre);

  if (sec.note) {
    const note = document.createElement('p');
    note.className = 'note-tarif';
    note.textContent = sec.note.fr;
    bloc.append(note);
  }

  const table = document.createElement('table');
  table.className = 'tarif-table' + (doubles ? ' deux-colonnes' : '');

  if (doubles) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    /* La cellule d'angle n'est pas vide : elle nomme la colonne des
       prestations. Le mot est masque a l'oeil, pas au lecteur d'ecran, qui
       annoncerait sinon une colonne sans nom. */
    tr.innerHTML = '<th scope="col"><span class="lecture-seule">Prestation</span></th>' +
      sec.colonnes.fr.map(c => '<th scope="col">' + c + '</th>').join('');
    thead.append(tr); table.append(thead);
  }

  /* L'UNITÉ EST COLLÉE AU MONTANT, pas au libellé. « Linge au kilo » puis
     « 6.– » se lisait comme le prix du service ; « 6.– le kg » ne laisse
     aucun doute. */
  const cellule = (montant, minimum, devis, unite) => {
    const td = document.createElement('td');
    if (devis) {
      const d = document.createElement('em');
      d.className = 'devis';
      d.textContent = 'Sur devis';
      td.append(d);
      return td;
    }
    if (minimum) {
      const d = document.createElement('em');
      d.textContent = 'dès';
      td.append(d, ' ');
    }
    const b = document.createElement('b');
    b.textContent = formatPrix(montant);
    if (unite) b.append(' ', uniteDePrix(unite));
    td.append(b);
    return td;
  };

  const tbody = document.createElement('tbody');
  for (const ligne of lignes) {
    const tr = document.createElement('tr');

    const th = document.createElement('th');
    th.scope = 'row';
    th.textContent = ligne.fr;
    if (ligne.precision) {
      const p = document.createElement('span');
      p.className = 'precision';
      p.textContent = ligne.precision.fr;
      th.append(p);
    }
    tr.append(th);

    tr.append(cellule(ligne.prix, ligne.des, ligne.devis, ligne.unite));
    if (doubles) tr.append(cellule(ligne.prix2, ligne.des2, ligne.devis, ligne.unite));

    tbody.append(tr);
  }
  table.append(tbody);
  bloc.append(table);

  if (coupees > 0) {
    const suite = document.createElement('p');
    suite.className = 'note-tarif';
    suite.innerHTML = coupees + (coupees > 1 ? ' autres articles' : ' autre article')
      + ' dans cette rubrique : <a class="lien" href="tarifs.html#' + sec.id
      + '">voir la liste complète</a>.';
    bloc.append(suite);
  }

  return bloc;
}

document.querySelectorAll('[data-tarifs]').forEach(conteneur => {
  /* Sans data/tarifs.js, le conteneur resterait vide sous un titre qui
     annonce des prix. Mieux vaut le dire que laisser un trou. */
  if (typeof TARIFS === 'undefined') {
    conteneur.innerHTML = '<p class="note-tarif">Les prix sont momentanément '
      + 'indisponibles. Appelez-nous, nous vous les donnons de vive voix.</p>';
    return;
  }
  const demande = conteneur.dataset.tarifs;
  const sections = demande === 'tout'
    ? TARIFS
    : TARIFS.filter(s => demande.split(/\s*,\s*/).includes(s.id));
  const maximum = parseInt(conteneur.dataset.lignes, 10) || 0;
  sections.forEach(s => conteneur.append(
    tableauSection(s, conteneur.dataset.niveau, maximum)));
  revelerDans(conteneur);
});

/* Les mentions sous les tableaux */
document.querySelectorAll('[data-mentions]').forEach(el => {
  if (typeof TARIFS_MENTIONS === 'undefined') return;
  el.innerHTML = '';
  [
    TARIFS_MENTIONS.tva,
    TARIFS_MENTIONS.des,
    TARIFS_MENTIONS.devis,
    TARIFS_MENTIONS.indicatif,
    'Tarifs au ' + ETABLISSEMENT.tarifsMaj + '.'
  ].forEach(t => {
    const p = document.createElement('p');
    p.textContent = t;
    el.append(p);
  });
});


/* ═════════════════════════════════════════════════════════════════════════════
   6 · LES PLANCHES À LA CRAIE — page Retouches et couture
   ----------------------------------------------------------------------------
   Les pièces sont toutes affichées d'emblée, côte à côte. Il y avait des
   onglets : on ne voyait qu'un vêtement à la fois, et il fallait deviner que
   les autres existaient derrière un bouton.

   LA PAGE CHOISIT SES PIÈCES, la liste est écrite dans son attribut
   `data-planches` : « retouches-jupes,retouches-manteaux » n'en affiche que
   deux. Les autres dessins restent dans assets/vetements.js, prêts à être
   remis d'un mot, sans qu'on retouche au code.

   L'attribut laissé vide affiche TOUTES les pièces dessinées. Dans les deux
   cas, une pièce n'apparaît que si elle a à la fois un dessin dans
   assets/vetements.js ET une section de prix dans data/tarifs.js : une
   planche sans prix n'aurait aucun repère à porter. Un identifiant mal
   orthographié dans l'attribut est signalé en console plutôt qu'ignoré en
   silence — sinon la planche disparaît sans que personne comprenne pourquoi.
   ═════════════════════════════════════════════════════════════════════════════ */
const grillePlanches = document.querySelector('[data-planches]');

if (grillePlanches && typeof VETEMENTS !== 'undefined'
    && typeof dessinVetement === 'function' && typeof TARIFS !== 'undefined') {

  const demandees = (grillePlanches.dataset.planches || '')
    .split(',').map(t => t.trim()).filter(Boolean);

  demandees.forEach(id => {
    if (!VETEMENTS[id]) {
      console.warn('[planches] « ' + id + ' » : aucun dessin de ce nom dans '
                 + 'assets/vetements.js. La planche ne sera pas affichée.');
    }
  });

  const dessinees = (demandees.length ? demandees : Object.keys(VETEMENTS))
    .filter(id => VETEMENTS[id] && TARIFS.some(s => s.id === id));

  if (!dessinees.length) {
    grillePlanches.closest('section').remove();
  } else {
    /* LES MÊMES PRIX, EN TEXTE. Sous 760 px, un repère posé sur le dessin
       tombe à quatre pixels : la planche fait 640 unités de large, et à
       325 px d'affichage le facteur vaut 0,5. Les repères sont donc masqués
       et remplacés par cette liste, qui lit EXACTEMENT les mêmes points et
       les mêmes lignes de tarif. Une seule source, deux présentations. */
    function prestationsEnTexte(id) {
      const sec = TARIFS.find(s => s.id === id);
      const points = VETEMENTS[id].points || [];
      const items = points.map(p => {
        const ligne = sec.lignes.find(l => l.fr === p.ligne);
        if (!ligne) return '';
        const montant = ligne.devis ? 'Sur devis'
          : (ligne.des ? '<i>dès </i>' : '') + formatPrix(ligne.prix)
            + (ligne.unite ? '<i> ' + ligne.unite.fr + '</i>' : '');
        return '<li><span>' + p.court + '</span><b>' + montant + '</b></li>';
      }).join('');
      return items ? '<ul class="prestations">' + items + '</ul>' : '';
    }

    grillePlanches.innerHTML = dessinees.map(id => {
      const nom = VETEMENTS[id].nom;
      /* La planche porte déjà son `aria-label` : la légende visible n'a pas à
         être relue une seconde fois par un lecteur d'écran. */
      return '<figure><div class="planche">' + dessinVetement(id) + '</div>'
           + '<figcaption aria-hidden="true">' + nom + '</figcaption>'
           + prestationsEnTexte(id) + '</figure>';
    }).join('');
    revelerDans(grillePlanches);
  }
}

/* ═════════════════════════════════════════════════════════════════════════════
   7 · LA PAGE TARIFS — quatre familles, une recherche, un repère
   ----------------------------------------------------------------------------
   La page faisait plus de douze mille pixels d'un seul tenant, précédés d'un
   sommaire de dix-sept ancres. Elle n'est plus la porte d'entrée du site : on
   l'ouvre en sachant ce qu'on cherche. Trois choses la rendent praticable.

   LES QUATRE FAMILLES. Les dix-sept sections se rangent sous quatre titres,
   ceux des métiers. Le regroupement se déduit du PRÉFIXE de l'identifiant,
   pas d'une liste écrite ici : ajouter une section à data/tarifs.js la range
   toute seule. Et une section dont le préfixe n'est prévu nulle part n'est
   jamais perdue — elle atterrit dans une dernière famille.

   LA RECHERCHE. C'est elle qui remplace vraiment le sommaire : on tape
   « jupe », on a les six lignes qui parlent de jupes, dans toutes les
   familles à la fois. Les accents et la casse sont ignorés.

   LE REPÈRE. Une barre colle sous la navigation et dit dans quelle famille
   on se trouve. Sur douze mille pixels, savoir où l'on est n'est pas un luxe.
   ═════════════════════════════════════════════════════════════════════════════ */
const FAMILLES_TARIFS = [
  { id: 'famille-nettoyage',     fr: 'Nettoyage',            prefixes: ['nettoyage'] },
  { id: 'famille-blanchisserie', fr: 'Blanchisserie',        prefixes: ['blanchisserie'] },
  { id: 'famille-retouches',     fr: 'Retouches et couture', prefixes: ['retouches', 'couture'] },
  { id: 'famille-entretien',     fr: 'Entretien spécialisé',  prefixes: ['entretien'] }
];

/* « RÉSERVE » reçoit toute section dont le préfixe n'est prévu nulle part :
   mieux vaut une famille mal nommée qu'un prix disparu de la page. */
const RESERVE_TARIFS = { id: 'famille-autres', fr: 'Autres prestations', prefixes: [] };

/* « Taie d'oreiller » → « taie d oreiller » : la recherche ignore la casse,
   les accents, les ligatures, la forme de l'apostrophe et l'exposant du m².
   Chacun de ces cas vient des données réelles — `Taie d'oreiller` s'écrit
   avec une apostrophe typographique, un clavier de téléphone en produit une
   autre, et personne ne tape « m² » à la main. */
function normaliser(texte) {
  return texte
    .toLowerCase()
    .replace(/œ/g, 'oe').replace(/æ/g, 'ae')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/²/g, '2').replace(/³/g, '3')
    .replace(/[’'`´]/g, ' ')
    .replace(/[-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const groupes = document.querySelector('[data-tarifs-groupes]');

/* Sans données, la page afficherait quatre ancres vides, une liste vide et un
   champ de recherche inerte. Elle le dit, et retire ce qui ne sert plus. */
if (groupes && (typeof TARIFS === 'undefined' || !TARIFS.length)) {
  groupes.innerHTML = '<p class="note-tarif">Les prix sont momentanément '
    + 'indisponibles. Appelez-nous, nous vous les donnons de vive voix.</p>';
  const barreVide = document.querySelector('.barre-tarifs');
  if (barreVide) barreVide.remove();
  const navVide = document.querySelector('[data-familles]');
  if (navVide) navVide.closest('section').remove();
}

if (groupes && typeof TARIFS !== 'undefined' && TARIFS.length) {

  /* ---- 1 · le rangement -------------------------------------------------- */
  const rangees = FAMILLES_TARIFS.map(f => ({ ...f, sections: [] }));
  const reserve = { ...RESERVE_TARIFS, sections: [] };

  TARIFS.forEach(sec => {
    const prefixe = sec.id.split('-')[0];
    const famille = rangees.find(f => f.prefixes.includes(prefixe)) || reserve;
    famille.sections.push(sec);
  });
  if (reserve.sections.length) rangees.push(reserve);

  const presentes = rangees.filter(f => f.sections.length);

  presentes.forEach(f => {
    const bloc = document.createElement('section');
    bloc.className = 'famille-tarifs';
    bloc.id = f.id;

    const titre = document.createElement('h2');
    titre.textContent = f.fr;
    bloc.append(titre);

    f.sections.forEach(sec => bloc.append(tableauSection(sec, 'h3')));
    groupes.append(bloc);
  });
  revelerDans(groupes);

  /* ---- 2 · les quatre ancres, en tête ------------------------------------- */
  const nav = document.querySelector('[data-familles]');
  if (nav) {
    presentes.forEach(f => {
      const a = document.createElement('a');
      a.href = '#' + f.id;
      a.textContent = f.fr;
      a.dataset.pourFamille = f.id;
      nav.append(a);
    });
  }

  /* ---- 3 · la recherche --------------------------------------------------- */
  /* Déclarée ici pour que `filtrer()` puisse l'appeler : le repère est
     construit plus bas, et une recherche déplace des milliers de pixels. */
  let situerPlusTard = () => {};

  const champ  = document.getElementById('chercher-tarif');
  const compte = document.querySelector('[data-compte-tarifs]');
  const blocs  = [...groupes.querySelectorAll('.tarif-bloc')];
  const totalLignes = groupes.querySelectorAll('tbody tr').length;

  function filtrer() {
    const q = normaliser(champ.value.trim());
    let vues = 0;

    blocs.forEach(bloc => {
      /* LE TITRE DE SECTION COMPTE AUTANT QUE LA LIGNE. Chercher « chemise »
         ne trouvait aucune des cinq lignes de « Retouches — Chemises », qui
         s'appellent « Ajuster manches » ou « Retourner col » : le visiteur en
         concluait que la prestation n'existe pas. Quand le titre correspond,
         toute la section est gardée. */
      const titre = normaliser(bloc.querySelector('h2,h3,h4').textContent);
      const sectionEntiere = q && titre.includes(q);
      let n = 0;
      bloc.querySelectorAll('tbody tr').forEach(tr => {
        const libelle = normaliser(tr.querySelector('th').textContent);
        const garde = !q || sectionEntiere || libelle.includes(q);
        tr.hidden = !garde;
        if (garde) n++;
      });
      bloc.hidden = (n === 0);
      vues += n;
    });

    /* Une famille dont toutes les sections sont masquées disparaît aussi —
       son titre seul n'apprendrait rien — et son ancre avec elle. */
    presentes.forEach(f => {
      const fam = document.getElementById(f.id);
      const reste = [...fam.querySelectorAll('.tarif-bloc')].some(b => !b.hidden);
      fam.hidden = !reste;
      const ancre = nav && nav.querySelector('[data-pour-famille="' + f.id + '"]');
      if (ancre) ancre.hidden = !reste;
    });

    /* Le repere doit suivre : une recherche masque des milliers de pixels
       sans qu'aucun defilement ne se produise. */
    situerPlusTard();

    /* « prestations » et non « articles » : la moitié des lignes sont des
       travaux — retourner un col, poser une doublure — pas des objets. */
    if (!q)          compte.textContent = totalLignes + ' prestations';
    else if (!vues)  compte.textContent = 'Aucune prestation ne correspond';
    else             compte.textContent = vues + (vues > 1 ? ' prestations trouvées' : ' prestation trouvée')
                                        + ' sur ' + totalLignes;
  }

  if (champ && compte) {
    champ.addEventListener('input', filtrer);
    champ.addEventListener('keydown', e => {
      if (e.key === 'Escape') { champ.value = ''; filtrer(); }
    });
    filtrer();
  }

  /* ---- 4 · le repère : dans quelle famille suis-je ? ---------------------- */
  const ou = document.querySelector('[data-famille-courante]');
  if (ou) {
    /* PAS D'IntersectionObserver ICI, et c'est délibéré. Les quatre familles
       font plusieurs milliers de pixels : deux d'entre elles peuvent croiser
       en même temps une bande de détection, et l'ordre des entrées ne dit
       pas laquelle est la bonne. Sur quatre éléments, chercher directement
       le dernier titre passé sous le mobilier est à la fois moins de code et
       toujours juste.

       `requestAnimationFrame` suffit à ne calculer qu'une fois par image :
       le défilement peut émettre des dizaines d'événements entre deux. */
    const titres = presentes.map(f => document.getElementById(f.id));
    const barre = document.querySelector('.barre-tarifs');
    let enAttente = false;

    situerPlusTard = function () {
      if (!enAttente) { enAttente = true; requestAnimationFrame(situer); }
    };

    function situer() {
      enAttente = false;

      /* LE SEUIL EST LA POSITION COLLANTE DE LA BARRE, pas sa position
         actuelle. Tant que la page n'a pas defile, la barre est encore dans
         le flux, mille pixels plus bas : `getBoundingClientRect().bottom`
         y vaut 1200 et le seuil ne veut plus rien dire — toutes les familles
         passent au-dessus, et le repere annonce la derniere. On lit donc son
         `top` CSS resolu (52 px sur ordinateur, la hauteur de la plaque sur
         telephone) et sa hauteur propre, deux valeurs stables.

         Les 30 px de tolerance ne sont pas decoratifs : une ancre depose sa
         cible 18 px SOUS la barre, et sans eux le repere annoncerait encore
         la famille d'ou l'on vient juste apres le saut. */
      const seuil = barre
        ? parseFloat(getComputedStyle(barre).top) + barre.offsetHeight + 30
        : 140;

      const visibles = titres.filter(t => !t.hidden);
      if (!visibles.length) { ou.textContent = '—'; return; }

      /* La première famille VISIBLE, et non la première tout court : après une
         recherche, la première peut avoir disparu. */
      let courante = visibles[0];
      visibles.forEach(t => {
        if (t.getBoundingClientRect().top <= seuil) courante = t;
      });
      const nom = courante.querySelector('h2').textContent;
      if (ou.textContent !== nom) ou.textContent = nom;
    }

    /* Trois déclencheurs, pas un seul. Le défilement, bien sûr ; mais aussi
       le redimensionnement, qui change la hauteur du mobilier ; et le retour
       arrière du navigateur, qui restaure une position sans défiler. Une
       recherche appelle le même recalcul depuis `filtrer()` : elle masque des
       milliers de pixels sans qu'aucun de ces trois événements se produise. */
    addEventListener('scroll',   situerPlusTard, { passive: true });
    addEventListener('resize',   situerPlusTard);
    addEventListener('pageshow', situerPlusTard);
    /* UN SAUT D'ANCRE EST UN CAS A PART. Le navigateur emet `hashchange`
       AVANT d'avoir applique le nouveau defilement, et l'animation douce
       (`scroll-behavior:smooth`) etale ensuite le trajet sur plusieurs
       centaines de millisecondes. Recalculer sur la frame suivante ne suffit
       donc pas : le repere annoncerait la famille d'ou l'on vient.
       `scrollend` se declenche quand le defilement s'est reellement arrete,
       animation comprise. Les navigateurs qui ne le connaissent pas encore
       gardent le repli : un recalcul deux frames plus tard, puis les
       evenements de defilement ordinaires finissent le travail. */
    addEventListener('scrollend', situer);
    addEventListener('hashchange', function () {
      requestAnimationFrame(() => requestAnimationFrame(situer));
    });
    situer();
  }
}



/* ═══════════════════════════════════════════════════════════════════════════
   8 · LA FICHE POUR GOOGLE
   Adresse, téléphone et horaires, dans le format que Google attend pour
   afficher un commerce directement dans ses résultats. Construite à partir
   de data/etablissement.js : elle ne peut pas se désynchroniser du site.
   ═══════════════════════════════════════════════════════════════════════════ */
if (document.querySelector('[data-fiche-google]')) {
  const JOURS_GOOGLE = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hhmm = m => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');

  const ouvertures = [];
  SEMAINE.forEach(jour => {
    (HORAIRES[jour] || []).forEach(([a, b]) => {
      ouvertures.push({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: JOURS_GOOGLE[jour],
        opens: hhmm(a),
        closes: hhmm(b)
      });
    });
  });

  const fiche = {
    '@context': 'https://schema.org',
    '@type': 'DryCleaningOrLaundry',
    name: ETABLISSEMENT.nom,
    legalName: ETABLISSEMENT.raisonSociale,
    foundingDate: String(ETABLISSEMENT.depuis),
    telephone: ETABLISSEMENT.telephoneLien,
    email: ETABLISSEMENT.email,

    address: {
      '@type': 'PostalAddress',
      streetAddress: ETABLISSEMENT.rue,
      postalCode: ETABLISSEMENT.codePostal,
      addressLocality: ETABLISSEMENT.ville,
      addressRegion: ETABLISSEMENT.canton,
      addressCountry: 'CH'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ETABLISSEMENT.latitude,
      longitude: ETABLISSEMENT.longitude
    },
    openingHoursSpecification: ouvertures,
    currenciesAccepted: 'CHF',
    areaServed: ETABLISSEMENT.ville
  };

  /* L'adresse du site n'est ajoutee que si la page est servie par un vrai
     serveur. Ouverte en double-clic, `location.origin` vaut « null » : la
     fiche annoncerait « null/ » a Google. Mieux vaut pas d'adresse du tout
     qu'une fausse. */
  if (location.protocol === 'http:' || location.protocol === 'https:') {
    fiche.url = location.origin + location.pathname.replace(/[^/]*$/, '');
  }

  const balise = document.createElement('script');
  balise.type = 'application/ld+json';
  balise.textContent = JSON.stringify(fiche);
  document.head.append(balise);
}


/* Enfin, on révèle tout ce qui était déjà dans la page. */
revelerDans(document);

/* ═══════════════════════════════════════════════════════════════════════════
   9 · LE NOM DE L'ENSEIGNE
   Le nom est dessiné en SVG, puis MESURÉ, puis son cadre est calé sur la
   mesure. Sans cette étape, un nom trop long pour un cadre fixe se ferait
   rogner — c'est exactement ce qui arrivait avant.
   ═══════════════════════════════════════════════════════════════════════════ */
function calerLeNom() {
  const mesures = [];
  document.querySelectorAll('.plaque svg').forEach(svg => {
    const t = svg.querySelector('text');
    if (!t) return;
    t.setAttribute('x', 0);
    t.setAttribute('y', 100);
    const b = t.getBBox();
    if (!b.width) return;
    const m = 4;                       // un souffle autour des jambages
    svg.setAttribute('viewBox',
      (b.x - m) + ' ' + (b.y - m) + ' ' + (b.width + m * 2) + ' ' + (b.height + m * 2));
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    mesures.push({ svg, largeur: b.width + m * 2, groupe: svg.dataset.groupe });
  });

  /* Deux mots empilés doivent avoir la MÊME hauteur de lettre. Sans ce
     calage, le mot le plus court serait dessiné plus gros, puisque tous
     deux rempliraient la largeur : « PRESSING » écraserait « DE VERNIER ». */
  const plusLarge = {};
  mesures.filter(x => x.groupe).forEach(x => {
    plusLarge[x.groupe] = Math.max(plusLarge[x.groupe] || 0, x.largeur);
  });
  mesures.filter(x => x.groupe).forEach(x => {
    x.svg.style.width = (x.largeur / plusLarge[x.groupe] * 100) + '%';
  });
}
if (document.querySelector('.plaque')) {
  calerLeNom();                                   // tout de suite, avec la police de secours
  if (document.fonts) document.fonts.ready.then(calerLeNom);   // puis avec la vraie police

  /* Le nom passe d'une à deux lignes selon la largeur. La version cachée ne
     peut pas être mesurée — getBBox() renvoie zéro — elle n'est donc calée
     qu'une fois devenue visible. Sans ce recalage, un téléphone qu'on fait
     pivoter affiche un nom rogné. */
  let recalage;
  addEventListener('resize', () => {
    clearTimeout(recalage);
    recalage = setTimeout(calerLeNom, 150);
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   10 · LES SIX MÉTIERS (page d'accueil)
   ----------------------------------------------------------------------------
   Six cartes de papier suspendues aux pinces d'une tringle de laiton. Une
   carte par métier, une page par carte.

   `vue`  : hauteur d'affichage de l'illustration, en fraction de la largeur
            utile de la carte. Ce n'est pas une valeur arbitraire : elle vient
            d'un calage sur la surface perçue. Les proportions des six dessins
            vont de 0,42 à 1,06 — à largeur égale, le costume paraîtrait deux
            fois plus petit que le fer. Les deux pièces hautes et étroites
            montent donc plus haut que les carrées.
   `l`,`h`: les dimensions réelles du fichier, pour que le navigateur réserve
            la place avant de l'avoir chargé.

   Les textes sont écrits ici et nulle part ailleurs.
   ════════════════════════════════════════════════════════════════════════════ */
const METIERS = [
  { cle: 'nettoyage', page: 'nettoyage.html', vue: 1.176, l: 124, h: 296,
    titre: 'Nettoyage à sec',
    alt: "Un costume sur cintre, dessiné au trait doré",
    texte: "Costumes, robes, manteaux, doudounes et textiles délicats : un nettoyage en profondeur tout en douceur." },

  { cle: 'blanchisserie', page: 'blanchisserie.html', vue: 1.017, l: 196, h: 256,
    titre: 'Blanchisserie',
    alt: "Une machine à laver, dessinée au trait doré",
    texte: "Linge de maison, draps, serviettes et pièces du quotidien : propreté impeccable et finitions soignées." },

  { cle: 'repassage', page: 'repassage.html', vue: .890, l: 235, h: 224,
    titre: 'Repassage',
    alt: "Un fer à repasser posé sur une chemise pliée, dessiné au trait doré",
    texte: "Chemises, linge de maison, pièces du quotidien : rendus prêts à porter, pliés ou sur cintre." },

  { cle: 'couture', page: 'couture.html', vue: 1.193, l: 128, h: 300,
    titre: 'Retouches et couture',
    alt: "Un buste de couturière et une bobine de fil, dessinés au trait doré",
    texte: "Ajustements, transformations et réparations pour des vêtements qui vous vont à la perfection." },

  { cle: 'cuir', page: 'cuir.html', vue: .874, l: 232, h: 220,
    titre: 'Cuir, daim, tapis et sacs',
    alt: "Un tapis roulé et un sac en cuir, dessinés au trait doré",
    texte: "Nettoyage, soin et rénovation de vos articles en cuir, daim, tapis et sacs d'exception." },

  { cle: 'professionnels', page: 'professionnels.html', vue: .922, l: 246, h: 232,
    titre: 'Professionnels',
    alt: "Une blouse et une veste de cuisinier avec sa toque, dessinées au trait doré",
    texte: "Solutions sur mesure pour entreprises, hôtels, restaurants et professions exigeantes." }
];

/* LA CARTE, ÉCRITE UNE SEULE FOIS POUR SES DEUX EMPLOIS.
   Elle sert à deux endroits : accrochée à la tringle sur l'accueil, et seule
   en tête de sa propre page de métier. C'est le MÊME objet, pas deux objets
   qui se ressemblent — c'est tout l'intérêt : on doit reconnaître la carte
   qu'on vient de cliquer.

   Trois choses seulement changent entre les deux emplois, et chacune a sa
   raison :

     · L'ENVELOPPE. Sur l'accueil c'est un `<a>` : la carte mène quelque part.
       Sur sa propre page c'est un `<div>` — un lien vers la page où l'on se
       trouve déjà n'est pas un lien, c'est une impasse.

     · LE TITRE. `<h2>` sur l'accueil, où les six cartes sont les six entrées
       d'une section et forment un vrai plan. `<p class="tr-nom">` sur la page
       de métier, où la carte n'introduit aucune section : elle rappelle. Un
       titre de plus dans le plan y enverrait un lecteur d'écran vers un
       intitulé qui ne mène nulle part.

     · « VOIR ». Il disparaît sur la page de métier, pour la même raison que
       le lien.

   Tout le reste — le vert et son dégradé, le liseré, la pince, le cadrage de
   l'illustration, les textes — vient d'un seul endroit. */
function carteMetier(m, o) {
  const balise = o.lien ? 'a' : 'div';
  return '<' + balise + ' class="tr-carte' + (o.lien ? '' : ' tr-carte-seule') + '"'
       +   (o.lien ? ' href="' + m.page + '"' : '')
       +   ' style="--vue:' + m.vue + '">'
       +   '<span class="tr-pince" aria-hidden="true"></span>'
       +   '<span class="tr-vue">'
       +     '<img src="' + (o.racine || '') + 'assets/illustrations/' + m.cle + '.webp"'
       +          ' width="' + m.l + '" height="' + m.h + '"'
       +          ' alt="' + m.alt + '"' + (o.differe ? ' loading="lazy"' : '') + ' decoding="async">'
       +   '</span>'
       +   (o.lien ? '<h2>' + m.titre + '</h2>'
                   : '<p class="tr-nom">' + m.titre + '</p>')
       +   '<span class="tr-filet"></span>'
       +   '<p>' + m.texte + '</p>'
       +   (o.lien ? '<span class="tr-voir"><i></i>Voir</span>' : '')
       + '</' + balise + '>';
}

/* LES SIX CARTES DE L'ACCUEIL, à la tringle.
   Les deux premières sont visibles d'emblée : elles se chargent tout de
   suite. Les quatre autres attendent d'approcher de l'écran. */
const zoneCartes = document.getElementById('cartes-metiers');

if (zoneCartes) {
  zoneCartes.innerHTML = METIERS
    .map((m, i) => carteMetier(m, { lien: true, differe: i >= 2 }))
    .join('');
}

/* LA CARTE SEULE, en tête de sa page de métier.
   La page dit de quel métier il s'agit par `data-carte-metier="couture"` ; le
   texte, l'illustration et les proportions viennent de METIERS, comme sur
   l'accueil. Aucune page de métier n'écrit son propre texte de carte. */
document.querySelectorAll('[data-carte-metier]').forEach(hote => {
  const m = METIERS.find(x => x.cle === hote.dataset.carteMetier);
  if (!m) return;
  hote.innerHTML = carteMetier(m, { lien: false, differe: false });
});

/* ═══════════════════════════════════════════════════════════════════════════
   11 · UN PRIX, LU DANS data/tarifs.js PAR SON LIBELLÉ
   ----------------------------------------------------------------------------
   Une page de métier montre parfois quelques prix qui ne forment pas une
   section : ni les quatre premiers d'une rubrique, ni tous de la même. La
   page Couture en est l'exemple — trois lignes de « Retouches — Pantalons »
   et une de « Retouches — Robe simple », parce que ce sont celles-là qu'on
   demande, et pas parce qu'elles se suivent dans le fichier.

   ELLES SONT CITÉES PAR LEUR LIBELLÉ, jamais recopiées. Le montant ET le
   libellé affichés viennent de data/tarifs.js : corriger « Ourlet simple
   piqué machine » là-bas le corrige ici, et un prix se change à un seul
   endroit. C'est la mécanique des repères des planches à la craie, appliquée
   à une liste.

   Si le libellé change là-bas sans être changé ici, la ligne disparaît et la
   page le dit dans la console — plutôt qu'afficher un intitulé sans montant,
   ou pire, un montant faux.
   ═══════════════════════════════════════════════════════════════════════════ */
function ligneDeTarif(idSection, libelle) {
  if (typeof TARIFS === 'undefined') return null;
  const sec = TARIFS.find(s => s.id === idSection);
  const ligne = sec && sec.lignes.find(l => l.fr === libelle);
  if (!ligne) {
    console.warn('Aucune ligne de tarif « ' + libelle + ' » dans la section « '
                 + idSection + ' ». Vérifiez data/tarifs.js.');
    return null;
  }
  return ligne;
}

/* Un `<li>` qui porte `data-section` et `data-ligne` reçoit le libellé et le
   montant de cette ligne. Un `<li>` qui n'en porte pas est laissé tel quel :
   c'est ainsi que la page Couture ajoute « Pièces uniques ou complexes : sur
   devis » au bas de sa liste, qui n'est pas un article de la liste de prix. */
document.querySelectorAll('[data-prix-choisis] [data-ligne]').forEach(li => {
  const ligne = ligneDeTarif(li.dataset.section, li.dataset.ligne);
  if (!ligne) { li.remove(); return; }

  const nom = document.createElement('span');
  nom.textContent = ligne.fr;
  if (ligne.precision) {
    const p = document.createElement('small');
    p.className = 'precision';
    p.textContent = ligne.precision.fr;
    nom.append(p);
  }

  const montant = document.createElement('b');
  if (ligne.devis) {
    montant.className = 'devis';
    montant.textContent = 'Sur devis';
  } else {
    if (ligne.des) {
      const des = document.createElement('i');
      des.textContent = 'dès';
      montant.append(des, ' ');
    }
    montant.append(formatPrix(ligne.prix));
    if (ligne.unite) montant.append(' ', uniteDePrix(ligne.unite));
  }

  li.append(nom, montant);
});



/* ═══════════════════════════════════════════════════════════════════════════
   12 · LE RÉSUMÉ DES HORAIRES, sur une ligne
   ═══════════════════════════════════════════════════════════════════════════ */
document.querySelectorAll('[data-horaires-resume]').forEach(el => {
  const semaine = plagesLisibles(HORAIRES[1]);
  const samedi  = plagesLisibles(HORAIRES[6]);
  el.textContent = 'Lu–Ve ' + semaine + ' · Sa ' + samedi;
});
