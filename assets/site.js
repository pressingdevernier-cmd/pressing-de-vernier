/* ============================================================================
   PRESSING DE VERNIER — comportements communs à toutes les pages
   ----------------------------------------------------------------------------
   Ce fichier fait quatre choses :
     1. ouvrir et fermer le menu sur téléphone
     2. faire apparaître les blocs quand on descend dans la page
     3. afficher « Ouvert » ou « Fermé » selon l'heure qu'il est
     4. construire les tableaux de prix à partir de data/tarifs.js

   Vous n'avez normalement jamais besoin d'y toucher.
   Pour changer un prix : data/tarifs.js
   Pour changer un horaire : la constante HORAIRES juste en dessous.
   ============================================================================ */

/* ---------------------------------------------------------------------------
   LES HORAIRES
   Les heures sont en minutes depuis minuit : 8h00 = 480, 12h30 = 750.
   Pour calculer : heure × 60 + minutes.   Exemple : 18h30 → 18×60+30 = 1110.
   0 = dimanche, 1 = lundi, … 6 = samedi.  Un jour vide [] signifie fermé.
   --------------------------------------------------------------------------- */
const HORAIRES = {
  1: [[480, 750], [810, 1110]],   // lundi     8h00–12h30 · 13h30–18h30
  2: [[480, 750], [810, 1110]],   // mardi
  3: [[480, 750], [810, 1110]],   // mercredi
  4: [[480, 750], [810, 1110]],   // jeudi
  5: [[480, 750], [810, 1110]],   // vendredi
  6: [[480, 720]],                // samedi    8h00–12h00
  0: []                           // dimanche  fermé
};

const LANGUE = document.documentElement.lang === 'en' ? 'en' : 'fr';

const MOTS = {
  fr: {
    ouvert: "Ouvert", ferme: "Fermé", jusqua: "jusqu’à", ouvreA: "ouvre à",
    fermeAujourdhui: "Fermé aujourd’hui", ouvreLundi: "ouvre lundi à 8h00",
    des: "dès"
  },
  en: {
    ouvert: "Open", ferme: "Closed", jusqua: "until", ouvreA: "opens at",
    fermeAujourdhui: "Closed today", ouvreLundi: "opens Monday at 8am",
    des: "from"
  }
};
const M = MOTS[LANGUE];

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
const aReveler = document.querySelectorAll('.revele');
if (aReveler.length) {
  const observateur = new IntersectionObserver(entrees => {
    entrees.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('vu'); observateur.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  aReveler.forEach(el => observateur.observe(el));
}

/* ═══════════════════════════════════════════════════════════════════════════
   3 · OUVERT OU FERMÉ, MAINTENANT
   ═══════════════════════════════════════════════════════════════════════════ */
function heureLisible(minutes) {
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return LANGUE === 'en'
    ? (h > 12 ? h - 12 : h) + (m ? ':' + String(m).padStart(2, '0') : '') + (h >= 12 ? 'pm' : 'am')
    : h + 'h' + String(m).padStart(2, '0');
}

function etatOuverture() {
  const d = new Date();
  const jour = d.getDay();
  const minutes = d.getHours() * 60 + d.getMinutes();
  const plages = HORAIRES[jour] || [];
  const enCours = plages.find(([a, b]) => minutes >= a && minutes < b);
  if (enCours) return { ouvert: true, texte: M.ouvert + ' · ' + M.jusqua + ' ' + heureLisible(enCours[1]) };
  const suivante = plages.find(([a]) => minutes < a);
  if (suivante) return { ouvert: false, texte: M.ferme + ' · ' + M.ouvreA + ' ' + heureLisible(suivante[0]) };
  // Plus rien aujourd'hui : on cherche le prochain jour ouvré
  for (let i = 1; i <= 7; i++) {
    const j = (jour + i) % 7;
    if ((HORAIRES[j] || []).length) {
      const nom = new Date(d.getTime() + i * 86400000)
        .toLocaleDateString(LANGUE === 'en' ? 'en-GB' : 'fr-CH', { weekday: 'long' });
      return { ouvert: false, texte: M.ferme + ' · ' + (LANGUE === 'en' ? 'opens ' : 'ouvre ') + nom + ' ' + heureLisible(HORAIRES[j][0][0]) };
    }
  }
  return { ouvert: false, texte: M.fermeAujourdhui };
}

document.querySelectorAll('[data-etat-ouverture]').forEach(el => {
  const e = etatOuverture();
  el.textContent = e.texte;
  el.classList.toggle('ferme', !e.ouvert);
});

/* Le jour en cours est mis en valeur dans le tableau des horaires */
document.querySelectorAll('[data-jour]').forEach(el => {
  if (Number(el.dataset.jour) === new Date().getDay()) el.classList.add('aujourdhui');
});

/* ═══════════════════════════════════════════════════════════════════════════
   4 · LES TABLEAUX DE PRIX
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
  titre.textContent = sec[LANGUE];
  bloc.append(titre);

  const table = document.createElement('table');
  table.className = 'tarif-table' + (doubles ? ' deux-colonnes' : '');

  if (doubles) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    tr.innerHTML = '<th scope="col"></th>' +
      sec.colonnes[LANGUE].map(c => '<th scope="col">' + c + '</th>').join('');
    thead.append(tr); table.append(thead);
  }

  const tbody = document.createElement('tbody');
  for (const ligne of sec.lignes) {
    const tr = document.createElement('tr');

    const th = document.createElement('th');
    th.scope = 'row';
    th.textContent = ligne[LANGUE];
    if (ligne.unite) {
      const u = document.createElement('span');
      u.className = 'unite';
      u.textContent = ligne.unite[LANGUE];
      th.append(' ', u);
    }
    tr.append(th);

    const cellule = (montant, minimum) => {
      const td = document.createElement('td');
      if (minimum) {
        const d = document.createElement('em');
        d.textContent = M.des;
        td.append(d, ' ');
      }
      const b = document.createElement('b');
      b.textContent = formatPrix(montant);
      td.append(b);
      return td;
    };
    tr.append(cellule(ligne.prix, ligne.des));
    if (doubles) tr.append(cellule(ligne.prix2, ligne.des2));

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

  // Les nouveaux blocs doivent eux aussi apparaître au défilement
  if (aReveler.length || true) {
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vu'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    conteneur.querySelectorAll('.revele').forEach(el => obs.observe(el));
  }
});

/* Les mentions sous les tableaux */
document.querySelectorAll('[data-mentions]').forEach(el => {
  if (typeof TARIFS_MENTIONS === 'undefined') return;
  const m = TARIFS_MENTIONS[LANGUE];
  el.innerHTML = '';
  [m.tva, m.des, m.maj].forEach(t => {
    const p = document.createElement('p');
    p.textContent = t;
    el.append(p);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   5 · LE CHOIX DU VÊTEMENT (page Couture)
   Les onglets affichent le tableau de retouches correspondant.
   ═══════════════════════════════════════════════════════════════════════════ */
const onglets = document.querySelectorAll('.onglet-vetement');
const zoneVetement = document.getElementById('tarifs-vetement');

if (onglets.length && zoneVetement && typeof TARIFS !== 'undefined') {

  function afficherVetement(idSection) {
    const sec = TARIFS.find(s => s.id === idSection);
    zoneVetement.innerHTML = '';
    if (!sec) return;
    const bloc = tableauSection(sec);
    bloc.classList.add('vu');          // pas d'attente : le choix doit être instantané
    zoneVetement.append(bloc);
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

/* ═══════════════════════════════════════════════════════════════════════════
   6 · LE SOMMAIRE DES TARIFS (page Nettoyage)
   Construit à partir des sections réellement affichées sur la page.
   ═══════════════════════════════════════════════════════════════════════════ */
const sommaire = document.getElementById('sommaire-tarifs');
if (sommaire) {
  document.querySelectorAll('.tarif-bloc').forEach(bloc => {
    const a = document.createElement('a');
    a.href = '#' + bloc.id;
    a.textContent = bloc.querySelector('h3').textContent;
    sommaire.append(a);
  });
}
