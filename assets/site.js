/* ============================================================================
   PRESSING DE VERNIER — comportements communs à toutes les pages
   ----------------------------------------------------------------------------
   Ce fichier fait sept choses :
     1. ouvrir et fermer le menu sur téléphone
     2. faire apparaître les blocs quand on descend dans la page
     3. écrire partout les coordonnées et les horaires
     4. afficher « Ouvert » ou « Fermé » selon l'heure qu'il est
     5. construire les tableaux de prix
     6. faire fonctionner le choix du vêtement, sur la page Couture
     7. donner à Google l'adresse et les horaires du magasin

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
  burger.addEventListener('click', () => {
    const ouvert = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!ouvert));
    menu.hidden = ouvert;
    document.body.style.overflow = ouvert ? '' : 'hidden';
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    document.body.style.overflow = '';
  }));
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) burger.click();
  });
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

function tableauSection(sec) {
  const doubles = Boolean(sec.colonnes);
  const bloc = document.createElement('section');
  bloc.className = 'tarif-bloc revele';
  bloc.id = sec.id;

  const titre = document.createElement('h3');
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
    tr.innerHTML = '<th scope="col"></th>' +
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
  if (typeof TARIFS === 'undefined') return;
  const demande = conteneur.dataset.tarifs;
  const sections = demande === 'tout'
    ? TARIFS
    : TARIFS.filter(s => demande.split(/\s*,\s*/).includes(s.id));
  sections.forEach(s => conteneur.append(tableauSection(s)));
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


/* ═══════════════════════════════════════════════════════════════════════════
   6 · LE CHOIX DU VÊTEMENT — page Couture
   Les onglets affichent le tableau de retouches correspondant, et le
   dessin technique se retrace pour le vêtement choisi.
   ═══════════════════════════════════════════════════════════════════════════ */
const onglets = document.querySelectorAll('.onglet-vetement');
const zoneVetement = document.getElementById('tarifs-vetement');

if (onglets.length && zoneVetement && typeof TARIFS !== 'undefined') {

  const zoneDessin = document.getElementById('dessin-vetement');

  function afficherVetement(idSection) {
    const sec = TARIFS.find(s => s.id === idSection);
    zoneVetement.innerHTML = '';
    if (!sec) return;
    const bloc = tableauSection(sec);
    bloc.classList.add('vu');          // pas d'attente : le choix doit être instantané
    zoneVetement.append(bloc);

    // Le dessin technique suit le vêtement choisi, et se retrace à chaque fois
    if (zoneDessin && typeof dessinVetement === 'function') {
      zoneDessin.classList.remove('vu');
      zoneDessin.innerHTML = dessinVetement(idSection, 'Longueur');
      void zoneDessin.offsetWidth;     // force le navigateur à repartir de zéro
      zoneDessin.classList.add('vu');
    }
  }

  onglets.forEach(o => {
    o.addEventListener('click', () => {
      onglets.forEach(x => x.setAttribute('aria-pressed', 'false'));
      o.setAttribute('aria-pressed', 'true');
      afficherVetement(o.dataset.section);
    });
  });

  afficherVetement(onglets[0].dataset.section);
}

/* Le sommaire de la page Tarifs, construit sur les sections réellement là */
const sommaire = document.getElementById('sommaire-tarifs');
if (sommaire) {
  document.querySelectorAll('.tarif-bloc').forEach(bloc => {
    const a = document.createElement('a');
    a.href = '#' + bloc.id;
    a.textContent = bloc.querySelector('h3').textContent;
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
}

/* ═══════════════════════════════════════════════════════════════════════════
   8 · LE DÉPLIANT DES SERVICES (page d'accueil)
   Les prix ne sont pas recopiés : ils sont lus dans data/tarifs.js.
   Pour changer un prix affiché ici, modifiez-le là-bas, rien d'autre.
   ═══════════════════════════════════════════════════════════════════════════ */
const SERVICES_ACCUEIL = [
  { num: '01', titre: 'Nettoyage & entretien', page: 'nettoyage.html',
    resume: 'Vêtements, pièces délicates, tapis, cuir et sacs',
    texte: "Vêtements courants, costumes, robes, manteaux et doudounes. Soie, laine et cachemire. "
         + "Nous prenons aussi en charge les tapis, le cuir, le daim et la restauration de sacs.",
    prix: [['nettoyage-vetements', 'Chemise sur cintre'],
           ['nettoyage-vetements', 'Pantalon'],
           ['nettoyage-vetements', 'Complet'],
           ['nettoyage-manteaux',  'Manteau long']] },

  { num: '02', titre: 'Blanchisserie & repassage', page: 'nettoyage.html',
    resume: 'Chemises, linge au kilo, literie et linge de maison',
    texte: "Chemises lavées et repassées, rendues sur cintre ou pliées. Repassage seul si vous "
         + "apportez du linge déjà lavé. Literie, nappes et linge de bain.",
    prix: [['blanchisserie-kilo',    'Linge courant — selon la formule choisie'],
           ['blanchisserie-literie', 'Drap avec repassage'],
           ['blanchisserie-literie', 'Housse de duvet'],
           ['blanchisserie-maison',  'Nappe']] },

  { num: '03', titre: 'Couture & retouches', page: 'couture.html',
    resume: 'Ourlets, réparations, transformations et créations',
    texte: "Toute la couture est réalisée dans notre atelier. Ourlets et réparations, mais aussi "
         + "doublures, transformations, broderies et créations sur mesure.",
    prix: [['retouches-pantalons', 'Ourlet simple piqué machine'],
           ['retouches-pantalons', 'Fermeture éclair'],
           ['retouches-chemises',  'Retourner col'],
           ['retouches-manteaux',  'Doublure de manches']] },

  { num: '04', titre: 'Professionnels', page: 'professionnels.html',
    resume: 'Restaurants, entreprises, crèches, clubs, boutiques',
    texte: "Entretien régulier du linge, tenues de travail, retouches en série, broderies et pose "
         + "de patchs. Collecte et livraison étudiées au cas par cas.",
    prix: [] }
];

const zoneCartes = document.getElementById('cartes-services');

if (zoneCartes && typeof TARIFS !== 'undefined') {

  /* Retrouve une ligne dans la liste officielle */
  const ligneTarif = (idSection, libelle) => {
    const sec = TARIFS.find(s => s.id === idSection);
    return sec ? sec.lignes.find(l => l.fr === libelle) : null;
  };

  const montant = l => {
    if (!l) return '<b>&mdash;</b>';
    if (l.devis) return '<b>Sur devis</b>';
    return (l.des ? '<em>dès</em> ' : '') + '<b>' + formatPrix(l.prix) + '</b>'
         + (l.unite ? ' <em>' + l.unite.fr + '</em>' : '');
  };

  SERVICES_ACCUEIL.forEach(s => {
    const extrait = s.prix.length
      ? s.prix.map(([sec, lib]) => {
          const l = ligneTarif(sec, lib);
          return '<li><span>' + (l ? l.fr : lib) + '</span>' + montant(l) + '</li>';
        }).join('')
      : '<li><span>Selon le volume et la fréquence</span><b>Sur devis</b></li>';

    const carte = document.createElement('article');
    carte.className = 'carte-service revele';
    carte.innerHTML =
      '<div>' +
        '<span class="num">' + s.num + '</span>' +
        '<h2>' + s.titre + '</h2>' +
        '<p class="texte">' + s.texte + '</p>' +
        '<div class="liens">' +
          '<a class="bouton plein" href="' + s.page + '">En savoir plus</a>' +
          (s.prix.length ? '<a class="bouton vide" href="tarifs.html">Tous les tarifs</a>' : '') +
        '</div>' +
      '</div>' +
      '<ul class="extrait">' + extrait + '</ul>';
    zoneCartes.append(carte);
  });

  /* Les cartes viennent d'être créées : elles doivent elles aussi
     apparaître au défilement. */
  revelerDans(zoneCartes);
}

/* ═══════════════════════════════════════════════════════════════════════════
   9 · LE RÉSUMÉ DES HORAIRES, sur une ligne
   ═══════════════════════════════════════════════════════════════════════════ */
document.querySelectorAll('[data-horaires-resume]').forEach(el => {
  const semaine = plagesLisibles(HORAIRES[1]);
  const samedi  = plagesLisibles(HORAIRES[6]);
  el.textContent = 'Lu–Ve ' + semaine + ' · Sa ' + samedi;
});
