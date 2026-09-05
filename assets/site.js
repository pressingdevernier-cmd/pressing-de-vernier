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
   Les onglets affichent le tableau de retouches correspondant, et la
   planche à la craie du vêtement choisi. Tous les vêtements ne sont pas
   encore dessinés : quand la planche manque, la zone se retire et le
   tableau prend toute la largeur.
   ═══════════════════════════════════════════════════════════════════════════ */
const onglets = document.querySelectorAll('.onglet-vetement');
const zoneVetement = document.getElementById('tarifs-vetement');

if (onglets.length && zoneVetement && typeof TARIFS !== 'undefined') {

  const zoneDessin = document.getElementById('dessin-vetement');

  function afficherVetement(idSection) {
    const sec = TARIFS.find(s => s.id === idSection);
    if (!sec) return;

    // La planche d'abord. Tous les vêtements ne sont pas dessinés : quand
    // elle manque, la zone se retire au lieu de rester vide.
    const dessin = (zoneDessin && typeof dessinVetement === 'function')
      ? dessinVetement(idSection) : '';

    if (zoneDessin) {
      zoneDessin.innerHTML = dessin;
      zoneDessin.hidden = !dessin;
      if (dessin) {
        zoneDessin.classList.remove('vu');
        void zoneDessin.offsetWidth;   // force le navigateur à repartir de zéro
        zoneDessin.classList.add('vu');
      }
    }

    // Le tableau des prix. Quand la pièce est dessinée, elle porte déjà les
    // prestations les plus demandées : la liste complète passe alors derrière
    // un bouton. Sans planche, elle s'affiche directement.
    zoneVetement.innerHTML = '';
    const bloc = tableauSection(sec);
    bloc.classList.add('vu');          // pas d'attente : le choix doit être instantané

    if (dessin) {
      const depliant = document.createElement('details');
      const bouton = document.createElement('summary');
      bouton.textContent = 'Voir le prix de toutes les retouches';
      depliant.append(bouton, bloc);
      zoneVetement.append(depliant);
    } else {
      zoneVetement.append(bloc);
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
    +   '<span class="tr-vue">'
    +     '<img src="assets/illustrations/' + m.cle + '.webp" width="' + m.l + '" height="' + m.h + '"'
    +          ' alt="' + m.alt + '"' + (i < 2 ? '' : ' loading="lazy"') + ' decoding="async">'
    +   '</span>'
    +   '<h2>' + m.titre + '</h2>'
    +   '<span class="tr-filet"></span>'
    +   '<p>' + m.texte + '</p>'
    +   '<span class="tr-voir"><i></i>Voir</span>'
    + '</a>').join('');

  const zonePoints = document.getElementById('points-metiers');
  zonePoints.innerHTML = METIERS.map((m, i) =>
      '<li><button type="button" data-va="' + i + '" aria-current="' + (i === 0) + '">'
    +   '<span class="lecture-seule">' + m.titre + '</span></button></li>').join('');


  /* ───────────────────────────────────────────────────────────────────────────
     LE GLISSEMENT
     Sous 1440 px la tringle ne se coupe pas et ne se redresse pas : c'est le
     regard qui la parcourt. Pinces et cartes défilent ensemble, donc restent
     alignées.
     ─────────────────────────────────────────────────────────────────────────── */
  const piste  = document.getElementById('tringle');
  const cartes = [...zoneCartes.querySelectorAll('.tr-carte')];
  const points = [...zonePoints.querySelectorAll('button')];
  const voileG = document.querySelector('.tr-voile.gauche');
  const voileD = document.querySelector('.tr-voile.droite');

  points.forEach(b => b.addEventListener('click', () => {
    cartes[+b.dataset.va].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }));

  /* La carte la plus proche du centre de la piste est la carte courante. */
  function suivreLaTringle() {
    const p = piste.getBoundingClientRect();
    const centre = p.left + p.width / 2;
    let proche = 0, ecart = Infinity;
    cartes.forEach((c, i) => {
      const b = c.getBoundingClientRect();
      const d = Math.abs(b.left + b.width / 2 - centre);
      if (d < ecart) { ecart = d; proche = i; }
    });
    points.forEach((b, i) => b.setAttribute('aria-current', String(i === proche)));

    /* Le voile dit « il reste des cartes de ce côté ». On ne peut pas le
       déduire de scrollLeft : l'aimant recentre la première et la dernière
       carte, si bien que la piste n'atteint jamais ses extrêmes. On regarde
       donc si la première et la dernière carte sont entièrement visibles. */
    const pre = cartes[0].getBoundingClientRect();
    const der = cartes[cartes.length - 1].getBoundingClientRect();
    voileG.toggleAttribute('data-eteint', pre.left >= p.left - 2);
    voileD.toggleAttribute('data-eteint', der.right <= p.right + 2);
  }

  piste.addEventListener('scroll', suivreLaTringle, { passive: true });
  addEventListener('resize', suivreLaTringle);
  suivreLaTringle();

  /* La tringle n'est pas encore chargée au premier appel : la piste ne connaît
     donc pas sa largeur, et les deux voiles s'éteindraient à tort. */
  const rail = document.querySelector('.tr-rail');
  if (rail.complete) suivreLaTringle();
  else rail.addEventListener('load', suivreLaTringle, { once: true });

  /* La tabulation amène le focus sur une carte hors champ : le navigateur la
     fait défiler, il ne reste qu'à remettre les points d'accord. */
  cartes.forEach(c => c.addEventListener('focus', () => setTimeout(suivreLaTringle, 60)));
}

/* ═══════════════════════════════════════════════════════════════════════════
   9 · LE RÉSUMÉ DES HORAIRES, sur une ligne
   ═══════════════════════════════════════════════════════════════════════════ */
document.querySelectorAll('[data-horaires-resume]').forEach(el => {
  const semaine = plagesLisibles(HORAIRES[1]);
  const samedi  = plagesLisibles(HORAIRES[6]);
  el.textContent = 'Lu–Ve ' + semaine + ' · Sa ' + samedi;
});
