/* ============================================================================
   L'ÉTABLISSEMENT — coordonnées, horaires et dates
   ============================================================================

   C'EST LE SEUL FICHIER À MODIFIER POUR CHANGER UN HORAIRE,
   LE TÉLÉPHONE, L'ADRESSE OU LA DATE DES TARIFS.

   Toutes les pages du site lisent ce fichier. Vous ne corrigez qu'ici,
   et les six pages se mettent à jour ensemble — y compris le bandeau vert
   en haut, le tableau des horaires et le pied de page.

   Ne touchez pas aux virgules, aux accolades ni aux guillemets.
   ============================================================================ */

const ETABLISSEMENT = {

  nom:            "Pressing de Vernier",
  raisonSociale:  "MDCA Sàrl",
  depuis:         2006,

  rue:            "201 route de Vernier",
  codePostal:     "1214",
  ville:          "Vernier",
  canton:         "Genève",
  pays:           "Suisse",

  /* Le numéro tel qu'il s'affiche, et le même au format international
     pour que le clic depuis un téléphone fonctionne partout.           */
  telephone:      "022 341 68 18",
  telephoneLien:  "+41223416818",

  email:          "pressingdevernier@gmail.com",

  /* Position du magasin, pour le bouton « Itinéraire ».                */
  latitude:       46.2118,
  longitude:      6.0855,

  /* Date affichée sous les tableaux de prix.                           */
  tarifsMaj:      "30 août 2026"
};


/* ============================================================================
   LES HORAIRES D'OUVERTURE
   ============================================================================

   Les heures s'écrivent en minutes depuis minuit. Pour convertir :

       heure × 60 + minutes

       8h00  → 8 × 60          = 480
       12h30 → 12 × 60 + 30    = 750
       13h30 → 13 × 60 + 30    = 810
       18h30 → 18 × 60 + 30    = 1110

   Chaque [début, fin] est une plage d'ouverture.
   Deux plages dans la même journée = une fermeture à midi.
   Un jour vide [] signifie fermé.

   0 = dimanche, 1 = lundi, 2 = mardi … 6 = samedi.

   EXEMPLES
     Fermer le samedi              →  6: []
     Ouvrir le samedi jusqu'à 16h  →  6: [[480, 960]]
     Supprimer la pause de midi    →  1: [[480, 1110]]
   ============================================================================ */

const HORAIRES = {
  1: [[480, 750], [810, 1110]],   // lundi     8h00–12h30 · 13h30–18h30
  2: [[480, 750], [810, 1110]],   // mardi     8h00–12h30 · 13h30–18h30
  3: [[480, 750], [810, 1110]],   // mercredi  8h00–12h30 · 13h30–18h30
  4: [[480, 750], [810, 1110]],   // jeudi     8h00–12h30 · 13h30–18h30
  5: [[480, 750], [810, 1110]],   // vendredi  8h00–12h30 · 13h30–18h30
  6: [[480, 720]],                // samedi    8h00–12h00
  0: []                           // dimanche  fermé
};

/* Les noms des jours, dans l'ordre où le navigateur les numérote. */
const JOURS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
