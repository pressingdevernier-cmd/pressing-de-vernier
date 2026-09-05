/* ============================================================================
   PRESSING DE VERNIER — comportements communs à toutes les pages
   ----------------------------------------------------------------------------
   Ce fichier fait neuf choses :
     1. ouvrir et fermer le menu sur téléphone
     2. faire apparaître les blocs quand on descend dans la page
     3. écrire partout les coordonnées et les horaires
     4. afficher « Ouvert » ou « Fermé » selon l'heure qu'il est
     5. construire les tableaux de prix
     6. faire fonctionner le choix du vêtement, sur la page Couture
     7. calculer la pesée du linge, sur la page Blanchisserie
     8. poser un prix isolé là où on le cite, hors d'un tableau
     9. donner à Google l'adresse et les horaires du magasin

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
const bandeLogo = document.querySelector('.ent-logo');
if (bandeLogo && window.ResizeObserver) {
  new ResizeObserver(([e]) => {
    document.documentElement.style.setProperty(
      '--h-bande-logo', Math.round(e.target.getBoundingClientRect().height) + 'px');
  }).observe(bandeLogo);
}


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

document.querySelectorAll('[data-email]').forEach(el => {
  el.textContent = ETABLISSEMENT.email;
  if (el.tagName === 'A') el.href = 'mailto:' + ETABLISSEMENT.email;
});

document.querySelectorAll('[data-itineraire]').forEach(el => {
  el.href = 'https://www.openstreetmap.org/directions?to='
          + ETABLISSEMENT.latitude + '%2C' + ETABLISSEMENT.longitude;
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
  el.classList.toggle('ferme', !e.ouvert);
});


/* ═══════════════════════════════════════════════════════════════════════════
   5 · LES TABLEAUX DE PRIX
   Construits à partir de data/tarifs.js. Un conteneur portant
   data-tarifs="identifiant-de-section" reçoit le tableau correspondant.
   data-tarifs="tout" affiche la liste complète.
   ═══════════════════════════════════════════════════════════════════════════ */
function formatPrix(n) {
  // 24 → « 24.– »   5.5 → « 5.50 »
  return Number.isInteger(n) ? n + '.–' : n.toFixed(2);
}

/* `niveau` : le rang du titre de famille. Sur la page Tarifs les familles
   viennent directement sous le <h1> de la page — un <h3> y sauterait un
   niveau, ce qu'un lecteur d'ecran signale comme un trou dans le plan. Sur
   la page Couture elles sont imbriquees sous un <h2>, et <h3> est juste. */
function tableauSection(sec, niveau) {
  const doubles = Boolean(sec.colonnes);
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

  const cellule = (montant, minimum, devis) => {
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
    td.append(b);
    return td;
  };

  const tbody = document.createElement('tbody');
  for (const ligne of sec.lignes) {
    const tr = document.createElement('tr');

    const th = document.createElement('th');
    th.scope = 'row';
    th.textContent = ligne.fr;
    if (ligne.unite) {
      const u = document.createElement('span');
      u.className = 'unite';
      u.textContent = ligne.unite.fr;
      th.append(' ', u);
    }
    tr.append(th);

    tr.append(cellule(ligne.prix, ligne.des, ligne.devis));
    if (doubles) tr.append(cellule(ligne.prix2, ligne.des2, ligne.devis));

    tbody.append(tr);
  }
  table.append(tbody);
  bloc.append(table);
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
  sections.forEach(s => conteneur.append(tableauSection(s, conteneur.dataset.niveau)));
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

   LA PAGE NE DÉCIDE PAS DE LA LISTE. Elle affiche toute pièce qui a à la fois
   un dessin dans assets/vetements.js ET une section de prix dans
   data/tarifs.js — une planche sans prix n'aurait aucun repère à porter. Le
   jour où le complet reçoit sa section de tarifs, il apparaît ici sans qu'on
   touche à cette page.
   ═════════════════════════════════════════════════════════════════════════════ */
const grillePlanches = document.querySelector('[data-planches]');

if (grillePlanches && typeof VETEMENTS !== 'undefined'
    && typeof dessinVetement === 'function' && typeof TARIFS !== 'undefined') {

  const dessinees = Object.keys(VETEMENTS)
    .filter(id => TARIFS.some(s => s.id === id));

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

/* Le sommaire de la page Tarifs, construit sur les sections réellement là */
const sommaire = document.getElementById('sommaire-tarifs');
if (sommaire) {
  document.querySelectorAll('.tarif-bloc').forEach(bloc => {
    const a = document.createElement('a');
    a.href = '#' + bloc.id;
    a.textContent = bloc.querySelector('h2,h3,h4').textContent;
    sommaire.append(a);
  });
}


/* ═══════════════════════════════════════════════════════════════════════════
   7 · LA FICHE POUR GOOGLE
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
    url: location.origin + location.pathname.replace(/[^/]*$/, ''),
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

  const balise = document.createElement('script');
  balise.type = 'application/ld+json';
  balise.textContent = JSON.stringify(fiche);
  document.head.append(balise);
}


/* Enfin, on révèle tout ce qui était déjà dans la page. */
revelerDans(document);

/* ═══════════════════════════════════════════════════════════════════════════
   7 · LE NOM DE L'ENSEIGNE
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
   8 · LES SIX MÉTIERS (page d'accueil)
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

const zoneCartes = document.getElementById('cartes-metiers');

if (zoneCartes) {

  /* Les deux premières cartes sont visibles d'emblée : elles se chargent tout
     de suite. Les quatre autres attendent d'approcher de l'écran. */
  zoneCartes.innerHTML = METIERS.map((m, i) =>
      '<a class="tr-carte" href="' + m.page + '" style="--vue:' + m.vue + '">'
    +   '<span class="tr-pince" aria-hidden="true"></span>'
    +   '<span class="tr-vue">'
    +     '<img src="assets/illustrations/' + m.cle + '.webp" width="' + m.l + '" height="' + m.h + '"'
    +          ' alt="' + m.alt + '"' + (i < 2 ? '' : ' loading="lazy"') + ' decoding="async">'
    +   '</span>'
    +   '<h2>' + m.titre + '</h2>'
    +   '<span class="tr-filet"></span>'
    +   '<p>' + m.texte + '</p>'
    +   '<span class="tr-voir"><i></i>Voir</span>'
    + '</a>').join('');

}

/* ═══════════════════════════════════════════════════════════════════════════
   9 · UN PRIX, LU DANS data/tarifs.js PAR SON LIBELLÉ
   ----------------------------------------------------------------------------
   Deux pages affichent un montant hors d'un tableau : la pesée de la page
   Blanchisserie et les deux finitions de la page Repassage. Aucune des deux
   n'écrit de chiffre — elles citent une ligne par son libellé exact, comme
   le font les repères des planches à la craie. Un prix se change à un seul
   endroit, dans data/tarifs.js.

   Si le libellé change là-bas sans être changé ici, la page le dit dans la
   console plutôt que d'afficher un montant faux ou un blanc.
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



/* ═══════════════════════════════════════════════════════════════════════════
   9 bis · LA PESÉE — page Blanchisserie
   ----------------------------------------------------------------------------
   Le linge courant est le seul poste facturé au poids. Un tableau n'y répond
   pas : personne ne sait ce que pèse son sac. La réglette donne l'ordre de
   grandeur, les deux formules côte à côte.
   ═══════════════════════════════════════════════════════════════════════════ */
const pesee = document.querySelector('[data-pesee]');
if (pesee) {
  const SANS = ligneDeTarif('blanchisserie-kilo', 'Lavage, séchage et pliage');
  const AVEC = ligneDeTarif('blanchisserie-kilo', 'Lavage, séchage, repassage et pliage');

  if (!SANS || !AVEC) {
    /* On retire la SECTION entière, pas la seule réglette : son introduction
       invite à faire glisser un curseur, et une invitation à manipuler ce qui
       n'existe plus est pire qu'un manque. */
    (pesee.closest('[data-pesee-section]') || pesee).remove();
  } else {
    const curseur = pesee.querySelector('input[type="range"]');
    const poids   = pesee.querySelector('[data-poids-lu]');
    const sans    = pesee.querySelector('[data-sans-repassage]');
    const avec    = pesee.querySelector('[data-avec-repassage]');

    /* Les trois valeurs sont des <output> : c'est l'élément prévu pour le
       RÉSULTAT d'un calcul, et son rôle implicite `status` fait annoncer la
       nouvelle valeur par un lecteur d'écran. Sans ça, seul le poids serait
       annoncé — et le poids n'est pas ce qu'on est venu chercher. */
    function peser() {
      const kg = Number(curseur.value);
      poids.textContent = kg + ' kg';
      sans.textContent  = formatPrix(kg * SANS.prix);
      avec.textContent  = formatPrix(kg * AVEC.prix);
    }
    curseur.addEventListener('input', peser);
    peser();
  }
}


/* ═══════════════════════════════════════════════════════════════════════════
   9 ter · LES DEUX FINITIONS — page Repassage
   ----------------------------------------------------------------------------
   Sur cintre ou pliée : c'est la question de la page, et les deux prix
   viennent de la section « Nettoyage — Vêtements », où ils sont écrits.
   ═══════════════════════════════════════════════════════════════════════════ */
document.querySelectorAll('[data-prix-de]').forEach(el => {
  const [section, libelle] = el.dataset.prixDe.split('|');
  const ligne = ligneDeTarif(section, libelle);
  if (!ligne) { el.textContent = '—'; return; }
  el.textContent = (ligne.des ? 'dès ' : '') + formatPrix(ligne.prix);
});


/* ═══════════════════════════════════════════════════════════════════════════
   10 · LE RÉSUMÉ DES HORAIRES, sur une ligne
   ═══════════════════════════════════════════════════════════════════════════ */
document.querySelectorAll('[data-horaires-resume]').forEach(el => {
  const semaine = plagesLisibles(HORAIRES[1]);
  const samedi  = plagesLisibles(HORAIRES[6]);
  el.textContent = 'Lu–Ve ' + semaine + ' · Sa ' + samedi;
});
