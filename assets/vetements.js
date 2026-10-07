/* ============================================================================
   LES PLANCHES DE VÊTEMENTS — dessin à la craie
   ----------------------------------------------------------------------------
   Chaque vêtement est dessiné à main levée : le contour est fait de gestes
   ouverts qui se dépassent aux angles, et chaque arête est repassée une
   seconde fois — la main revient dessus sans recouvrir son premier passage.

   Trois familles de traits, à la craie :
     .trait    le contour, premier passage
     .repasse  le second passage, décalé
     .detail   ce qui fait reconnaître la pièce : revers, col de chemise,
               rabats de poche, ceinture et passants, pliure du pantalon
     .detail.fin  les hachures qui suggèrent le tissu

   Une seule chose du vêtement a droit à l'or : les lignes de coupe. Elles ne
   sont pas dessinées mais CALCULÉES, comme un décalage du tracé de la pièce
   à cet endroit — elles en épousent donc exactement la courbe. L'écart suit
   les proportions réelles de la retouche : sur un pantalon d'environ 345
   unités de dessin pour 105 cm, 1 cm vaut 3,3 unités, donc un ourlet de 3 cm
   se pose à 10 unités du bord.

   ATTENTION — CE FICHIER N'EST PAS À MODIFIER POUR CHANGER UN PRIX.
   Les prix vivent dans data/tarifs.js. Ici, il n'y a que du dessin.
   ============================================================================ */

const VETEMENTS = {

  /* Les identifiants sont ceux des sections de data/tarifs.js : la page
     Couture affiche toute piece qui a a la fois un dessin ici et une section
     de prix la-bas, et les reperes citent les lignes par leur libelle
     et des sections de data/tarifs.js. NE PAS LES RENOMMER. */

  /* ══════════════════════════════════════════════════════════════════════
     LA CHEMISE — col ouvert, patte de boutonnage, poche poitrine, poignets
     boutonnés. Posée à plat, manches le long du corps.
     ══════════════════════════════════════════════════════════════════════ */
  'retouches-chemises': {
    nom: 'Chemise',
    boite: '-150 18 640 372',
    gaucheX: -6, droiteX: 348,
    alt: "Chemise dessinée à plat : la longueur, les manches et le col sont marqués en pointillé",
    points: [
      { x:64,  y:196, cote:'gauche', ligne:'Ajuster manches — chemise',  court:'Ajuster manches' },
      { x:120, y:268, cote:'gauche', ligne:'Ajuster la taille — chemise',   court:'Ajuster taille' },
      { x:170, y:330, cote:'gauche', ligne:'Ajuster longueur — chemise', court:'Ajuster longueur' },
      { x:170, y:66,  cote:'droite', ligne:'Retourner col',    court:'Retourner col' },
      { x:250, y:186, cote:'droite', ligne:'Raccourcir — chemise',       court:'Raccourcir' }
    ],
    trace: {
      pieces: [
        'M146,52 C128,55 112,62 101,74 C97,124 93,196 91,252 C89,290 88,316 88,338',
        'M84,330 C110,342 142,345 172,344 C202,343 228,338 246,330',
        'M242,338 C242,314 243,288 244,250 C246,194 248,122 248,72 C238,60 220,53 202,50',
        'M208,52 C197,68 175,72 158,54',
        'M101,74 C86,96 72,142 63,184 C59,202 57,215 57,227 C71,233 87,231 100,224 C102,201 105,177 108,152',
        'M248,72 C263,95 276,142 284,185 C287,203 289,216 288,228 C275,235 259,233 246,226 C244,203 242,178 240,153'
      ],
      details: [
        'M146,52 C150,66 155,76 162,84',
        'M204,50 C200,64 194,75 187,84',
        'M141,44 C152,52 170,53 184,45',
        'M166,88 C165,140 164,200 164,262 C164,300 164,322 165,340',
        'M176,88 C175,140 174,200 174,262 C174,300 174,322 175,340',
        'M170,120 C173,119 176,119 179,120',
        'M170,172 C173,171 176,171 179,172',
        'M170,224 C173,223 176,223 179,224',
        'M112,120 C124,117 136,116 146,117 C146,127 145,136 144,143',
        'M59,214 C73,220 89,218 102,211',
        'M286,212 C273,219 258,217 245,210'
      ],
      detailsFins: [
        'M108,268 C112,274 116,279 120,283',
        'M106,286 C110,292 114,297 118,301',
        'M226,264 C230,270 234,275 238,279',
        'M228,282 C232,288 236,293 240,297',
        'M80,150 C84,156 88,161 92,165',
        'M266,146 C270,152 274,157 278,161'
      ],
      coupes: [
        { bord:1, de:0.04, a:0.96, ecart:-10 },
        { bord:4, de:0.60, a:0.78, ecart:-8 },
        { bord:5, de:0.60, a:0.78, ecart:8 }
      ]
    }
  },
  /* ══════════════════════════════════════════════════════════════════════
     LA JUPE — droite, posée à plat. La fermeture éclair invisible court le
     long de la couture de côté gauche ; la ceinture est montée.
     ══════════════════════════════════════════════════════════════════════ */
  'retouches-jupes': {
    nom: 'Jupe',
    boite: '-150 40 640 350',
    gaucheX: 34, droiteX: 310,
    alt: "Jupe droite dessinée à plat : l'ourlet et la ceinture sont marqués en pointillé",
    points: [
      { x:118, y:112, cote:'gauche', ligne:'Ajuster la taille — jupe',             court:'Ajuster taille' },
      { x:120, y:206, cote:'gauche', ligne:'Fermeture éclair invisible — jupe', court:'Éclair invisible' },
      { x:152, y:348, cote:'gauche', ligne:'Ourlet jupe droite',         court:'Ourlet' },
      { x:216, y:262, cote:'droite', ligne:'Changer doublure',           court:'Doublure' }
    ],
    trace: {
      pieces: [
        'M114,96 C112,140 110,196 108,244 C106,286 104,320 103,352',
        'M99,344 C124,356 156,359 186,357 C212,355 232,350 244,344',
        'M240,352 C238,318 235,272 232,228 C229,178 226,130 224,98',
        'M228,100 C200,110 158,111 116,99'
      ],
      details: [
        'M116,120 C148,131 194,131 226,119',
        'M117,133 C149,144 195,144 227,132',
        'M128,121 C128,127 128,131 127,136',
        'M170,126 C170,132 170,137 170,142',
        'M214,121 C214,127 215,131 215,136',
        'M113,152 C112,176 111,198 111,222',
        'M148,146 C146,196 144,250 143,300',
        'M196,145 C198,195 200,249 202,299'
      ],
      detailsFins: [
        'M126,262 C130,268 134,273 138,277',
        'M124,280 C128,286 132,291 136,295',
        'M210,258 C214,264 218,269 222,273',
        'M212,276 C216,282 220,287 224,291'
      ],
      coupes: [
        { bord:1, de:0.04, a:0.96, ecart:-11 },
        { d:'M116,120 C148,131 194,131 226,119', de:0.04, a:0.96, ecart:9 }
      ]
    }
  },

  'retouches-robe': {
    nom: 'Robe',
    boite: '-150 18 640 408',
    gaucheX: 22, droiteX: 328,
    alt: "Robe dessinée à plat : la ligne d'ourlet et la couture de taille sont marquées en pointillé",
    points: [
      { x:122, y:84,  cote:'gauche', ligne:'Poser épaulettes',           court:'Épaulettes' },
      { x:126, y:184, cote:'gauche', ligne:'Fermeture éclair invisible — robe simple', court:'Éclair invisible' },
      { x:150, y:390, cote:'gauche', ligne:'Ourlet robe droite',         court:'Ourlet' },
      { x:200, y:220, cote:'droite', ligne:'Ajuster la taille — robe simple',             court:'Ajuster taille' },
      { x:206, y:304, cote:'droite', ligne:'Doublure sans manches',      court:'Doublure' }
    ],
    trace: {
      pieces: [
          'M154,55 C139,56 126,60 117,68 C109,83 105,100 104,118 C115,124 129,124 140,120',
          'M137,115 C133,148 129,180 127,208 C112,264 97,330 85,394',
          'M81,384 C115,397 156,401 193,399 C225,397 252,391 269,382',
          'M266,390 C253,322 236,259 223,211 C220,179 218,144 216,111',
          'M214,116 C226,123 239,121 249,113 C246,96 241,80 234,68 C225,60 211,56 199,57',
          'M204,58 C192,75 163,80 145,56'
        ],
        details: [
          'M123,212 C154,221 198,221 226,210',
          'M122,219 C154,228 199,228 227,217',
          'M130,149 C128,171 127,193 127,214',
          'M118,72 C126,82 134,88 143,89',
          'M231,70 C224,80 215,86 206,87',
          'M136,128 C143,138 150,144 156,148',
          'M213,126 C206,136 199,142 193,146',
          /* les poches et leur ouverture repassée */
          'M119,229 C123,241 128,252 133,260',
          'M124,230 C128,242 133,252 138,259',
          'M229,227 C225,239 220,250 216,258',
          'M224,228 C220,240 216,250 212,257',
          /* le boutonnage d'épaule */
          'M126,78 C130,77 134,77 137,78',
          'M222,76 C219,75 215,75 212,76'
        ],
        detailsFins: [
          'M160,244 C156,296 152,346 150,394',
          'M198,240 C202,292 206,342 210,390',
          'M136,268 C134,308 132,346 131,382',
          /* hachures du tombé de la jupe */
          'M112,300 C116,306 120,311 124,315',
          'M108,318 C112,324 116,329 120,333',
          'M104,336 C108,342 112,347 116,351',
          'M232,296 C236,302 240,307 244,311',
          'M236,314 C240,320 244,325 248,329',
          'M144,168 C148,174 152,179 156,183',
          'M190,166 C194,172 198,177 202,181'
        ],
        coupes: [
          { bord:2, de:0.04, a:0.96, ecart:-13 },
          { d:'M123,212 C154,221 198,221 226,210', de:0.04, a:0.96, ecart:8 }
        ]
    }
  },

  'retouches-manteaux': {
    nom: 'Manteau',
    boite: '-150 18 640 408',
    gaucheX: -4, droiteX: 350,
    alt: "Manteau à fermeture éclair dessiné à plat : l'ourlet et les poignets sont marqués en pointillé",
    points: [
      { x:171, y:150, cote:'gauche', ligne:'Fermeture éclair — manteau',                 court:'Fermeture éclair' },
      { x:70,  y:218, cote:'gauche', ligne:'Ajuster manches — manteau',                  court:'Ajuster manches' },
      { x:160, y:392, cote:'gauche', ligne:'Ajuster longueur — manteau',                 court:'Ajuster longueur' },
      { x:272, y:184, cote:'droite', ligne:'Doublure de manches',              court:'Doublure manches' },
      { x:218, y:304, cote:'droite', ligne:'Doublure complète avec manches',   court:'Doublure complète' }
    ],
    trace: {
      pieces: [
          'M158,52 C137,55 121,65 109,80 C104,152 98,244 94,304 C91,344 90,372 89,396',
          'M84,388 C112,401 146,403 174,401 C203,399 228,393 246,384',
          'M240,394 C241,343 243,284 245,229 C247,171 249,108 249,69 C238,57 216,49 190,49',
          'M197,51 C186,69 162,74 146,55',
          'M109,80 C90,105 71,156 60,201 C55,221 53,235 53,248 C68,254 86,252 100,244 C103,219 107,192 111,164',
          'M249,69 C267,94 283,147 292,195 C295,213 297,227 296,239 C283,247 265,246 253,239 C249,213 246,186 244,159'
        ],
        details: [
          'M158,52 C162,71 167,89 173,102',
          'M190,49 C188,69 184,88 178,102',
          'M173,102 C176,105 178,105 180,102',
          'M162,56 C166,74 171,90 176,102',
          /* poches à rabat, ouverture repassée */
          'M109,241 C124,235 141,234 155,236 C155,244 154,250 153,256',
          'M112,247 C126,242 141,241 153,243',
          'M196,235 C211,234 226,236 238,240 C238,248 238,253 237,258',
          'M199,241 C212,240 225,242 236,245',
          /* pattes de poignet, boutonnées */
          'M60,229 C73,236 88,234 100,227',
          'M64,235 C76,241 89,239 100,233',
          'M295,225 C283,232 267,231 255,225',
          /* la martingale, au dos, qui dépasse sur le côté */
          'M124,262 C140,258 158,257 172,258'
        ],
        detailsFins: [
          'M118,308 C125,336 128,362 126,388',
          'M215,302 C212,330 211,356 213,382',
          'M144,320 C148,348 150,372 149,392',
          /* hachures : le tombé du manteau */
          'M104,270 C108,276 112,281 116,285',
          'M101,288 C105,294 109,299 113,303',
          'M98,306 C102,312 106,317 110,321',
          'M232,266 C236,272 240,277 244,281',
          'M230,284 C234,290 238,295 242,299',
          'M78,170 C82,176 86,181 90,185',
          'M270,166 C274,172 278,177 282,181'
        ],
        coupes: [
          { bord:1, de:0.03, a:0.97, ecart:-10 },
          { bord:4, de:0.56, a:0.77, ecart:-8  },
          { bord:5, de:0.58, a:0.77, ecart:8   }
        ],
        zip: 'M177,100 C172,169 166,249 170,319 C171,353 173,377 174,397'
    }
  }
};


/* ============================================================================
   LE COMPLET — dessiné et validé, mais pas encore employé : data/tarifs.js
   n'a pas de section « complet », et une planche sans prix n'aurait aucun
   repère à porter. Le jour où cette section existe, il suffit de déplacer ce
   dessin dans VETEMENTS sous la clé correspondante : la page Couture
   l'affichera sans qu'on y touche.
   ============================================================================ */
const VETEMENT_COMPLET = {
    nom: 'Complet',
    boite: '20 26 316 398',
    alt: "Complet dessiné à plat, veste et pantalon plié",
    trace: {
      pieces: [
          'M102,50 C86,55 71,63 62,75 C57,120 53,176 52,217 C51,241 50,260 51,276',
          'M46,268 C73,279 107,282 140,281 C163,280 180,275 189,270',
          'M185,277 C185,248 186,212 187,171 C188,124 188,87 187,68 C177,58 161,50 143,48',
          'M149,50 C140,65 110,68 96,49',
          'M62,75 C49,99 40,143 37,187 C35,213 34,238 35,258 C48,266 63,265 75,257 C76,233 77,204 79,175',
          'M187,68 C199,92 208,136 212,181 C214,207 215,232 214,251 C201,259 187,258 176,251 C174,228 173,200 171,171',
          'M240,54 C230,60 225,68 224,78 C226,140 230,217 236,289 C240,334 244,370 248,400',
          'M243,392 C259,401 279,402 296,398 C299,360 303,312 307,261 C312,194 315,120 317,72 C310,61 299,54 287,51 C269,47 249,49 236,56'
        ],
        details: [
          'M102,50 C91,62 84,78 82,98 C90,106 99,113 107,121',
          'M102,50 C109,83 116,116 123,150',
          'M147,48 C157,62 163,78 164,97 C155,104 146,112 138,120',
          'M147,48 C140,81 133,114 126,149',
          /* col de chemise : les deux pointes, la bande, et le pli du col —
             c'est le trace le plus detaille, il a droit au quatrieme trait */
          'M111,49 C114,58 118,64 124,70',
          'M139,47 C136,55 131,63 125,70',
          'M110,46 C118,51 132,51 140,45',
          /* boutonnage, bouton et boutonnière */
          'M124,154 C124,194 124,234 123,276',
          'M116,151 C120,150 124,150 128,151',
          'M117,178 C121,177 125,177 129,178',
          /* poche poitrine passepoilée */
          'M70,120 C79,118 88,117 97,118',
          'M70,120 C70,124 70,127 71,130',
          /* poches à rabat, avec le pli du rabat */
          'M62,203 C74,200 87,199 99,200 C99,207 98,213 97,218',
          'M64,209 C75,207 87,206 97,207',
          'M148,199 C159,199 171,200 181,203 C181,210 181,215 180,219',
          'M150,206 C160,205 170,206 179,208',
          /* ceinture, passants, pliure, poche cavalière */
          'M224,80 C253,88 286,88 317,77',
          'M225,93 C254,101 287,101 316,90',
          'M235,81 C235,87 235,91 234,95',
          'M270,85 C270,91 270,95 270,99',
          'M304,81 C304,87 305,91 305,95',
          'M268,97 C265,180 261,272 265,356 C266,382 267,394 268,402',
          'M231,105 C237,113 243,119 249,123'
        ],
        detailsFins: [
          /* les hachures : le tissu suggéré par le trait, pas par la ligne */
          'M66,140 C70,145 74,149 78,152',
          'M64,152 C68,157 72,161 76,164',
          'M62,164 C66,169 70,173 74,176',
          'M160,150 C164,155 168,159 172,162',
          'M162,162 C166,167 170,171 174,174',
          'M96,240 C100,246 104,251 108,255',
          'M92,252 C96,258 100,263 104,267',
          'M244,180 C248,186 252,191 256,195',
          'M242,196 C246,202 250,207 254,211',
          'M286,300 C290,306 294,311 298,315',
          'M284,316 C288,322 292,327 296,331',
          'M79,133 C82,176 84,218 83,258'
        ],
        coupes: [
          { bord:1, de:0,    a:1,     ecart:-8  },
          { bord:7, de:0,    a:0.115, ecart:-10 },
          { bord:4, de:0.59, a:0.76,  ecart:-8  },
          { bord:5, de:0.59, a:0.76,  ecart:8   },
          { d:'M224,80 C253,88 286,88 317,77', de:0.04, a:0.96, ecart:8 }
        ]
    }
  };


/* ============================================================================
   LES LIGNES DE COUPE
   On échantillonne l'arête concernée, on décale chaque point le long de sa
   normale, et on relie le tout. Le résultat est parallèle au trait de craie
   quelle que soit sa courbe.
   ============================================================================ */
function coupeParallele(d, de, a, ecart) {
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', d);
  const L = p.getTotalLength();
  const N = 26;
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const s = L * (de + (a - de) * i / N);
    const m = p.getPointAtLength(s);
    const av = p.getPointAtLength(Math.max(0, s - 1.2));
    const ap = p.getPointAtLength(Math.min(L, s + 1.2));
    const dx = ap.x - av.x, dy = ap.y - av.y;
    const n = Math.hypot(dx, dy) || 1;
    pts.push((m.x - dy / n * ecart).toFixed(1) + ',' + (m.y + dx / n * ecart).toFixed(1));
  }
  return 'M' + pts.join(' L');
}


/* ============================================================================
   LA FERMETURE ÉCLAIR
   Les dents sont posées le long du ruban, perpendiculaires à sa tangente :
   elles suivent sa courbe au lieu d'être empilées à la verticale.
   ============================================================================ */
function fermetureEclair(d) {
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', d);
  const L = p.getTotalLength();

  let dents = '';
  for (let s = 14; s < L - 5; s += 9.5) {
    const a = p.getPointAtLength(s - 1.4);
    const b = p.getPointAtLength(s + 1.4);
    const dx = b.x - a.x, dy = b.y - a.y;
    const n = Math.hypot(dx, dy) || 1;
    const nx = -dy / n * 3.2, ny = dx / n * 3.2;
    const m = p.getPointAtLength(s);
    dents += '<line class="dent" x1="' + (m.x - nx).toFixed(1) + '" y1="' + (m.y - ny).toFixed(1)
           + '" x2="' + (m.x + nx).toFixed(1) + '" y2="' + (m.y + ny).toFixed(1) + '"/>';
  }

  const h = p.getPointAtLength(2), x = h.x, y = h.y;
  const curseur =
      '<path class="curseur" d="M' + (x - 4).toFixed(1) + ',' + (y + 0.5).toFixed(1)
    + ' L' + (x + 4).toFixed(1) + ',' + (y + 0.5).toFixed(1)
    + ' L' + (x + 2.9).toFixed(1) + ',' + (y + 11).toFixed(1)
    + ' L' + (x - 2.9).toFixed(1) + ',' + (y + 11).toFixed(1) + ' Z"/>'
    + '<path class="curseur" d="M' + x.toFixed(1) + ',' + (y + 11).toFixed(1)
    + ' C' + (x + 4.5).toFixed(1) + ',' + (y + 16).toFixed(1)
    + ' ' + (x + 2).toFixed(1) + ',' + (y + 24).toFixed(1)
    + ' ' + (x - 2.5).toFixed(1) + ',' + (y + 25).toFixed(1) + '"/>';

  return '<g class="zip"><path class="zip-ruban" d="' + d + '"/>' + dents + curseur + '</g>';
}


/* ============================================================================
   LA FABRICATION DE LA PLANCHE
   Renvoie une chaîne vide si le vêtement n'est pas encore dessiné : la page
   masque alors la zone de dessin au lieu d'afficher un cadre vide.
   ============================================================================ */
/* Met un montant en forme, exactement comme le tableau des tarifs.
   Le « dès » vient de data/tarifs.js : c'est lui qui dit si la prestation
   est variable. Rien n'est décidé ici. */
function montantLisible(ligne) {
  if (!ligne) return '';
  if (ligne.devis) return 'Sur devis';
  const nombre = Number.isInteger(ligne.prix) ? ligne.prix + '.–' : ligne.prix.toFixed(2);
  return (ligne.des ? '<tspan class="mention">dès </tspan>' : '') + nombre
       + (ligne.unite ? '<tspan class="mention"> ' + ligne.unite.fr + '</tspan>' : '');
}

/* Les repères de prix posés sur la pièce.
   AUCUN MONTANT N'EST ÉCRIT ICI : chaque point cite une ligne de
   data/tarifs.js par son libellé, et le montant est lu à l'affichage.
   Un prix se change donc à un seul endroit, dans data/tarifs.js. */
function reperesDePrix(v, idSection) {
  if (typeof TARIFS === 'undefined') return '';
  const sec = TARIFS.find(s => s.id === idSection);
  if (!sec) return '';

  return (v.points || []).map(function (p) {
    const ligne = sec.lignes.find(l => l.fr === p.ligne);
    if (!ligne) {
      console.warn('Planche « ' + v.nom + ' » : aucune ligne de tarif nommée « '
                   + p.ligne +' ». Le repère est ignoré.');
      return '';
    }
    const aG    = p.cote === 'gauche';
    const xFin  = aG ? v.gaucheX + 10 : v.droiteX - 10;
    const xT    = aG ? v.gaucheX : v.droiteX;
    const ancre = aG ? 'end' : 'start';
    return '<g class="repere">'
      + '<line class="fil-fond" x1="' + p.x + '" y1="' + p.y + '" x2="' + xFin + '" y2="' + p.y + '"/>'
      + '<line class="fil" x1="' + p.x + '" y1="' + p.y + '" x2="' + xFin + '" y2="' + p.y + '"/>'
      + '<line class="coche" x1="' + xFin + '" y1="' + (p.y - 4.5) + '" x2="' + xFin + '" y2="' + (p.y + 4.5) + '"/>'
      + '<circle class="halo" cx="' + p.x + '" cy="' + p.y + '" r="5.5"/>'
      + '<circle class="point" cx="' + p.x + '" cy="' + p.y + '" r="2.4"/>'
      + '<text class="nom" x="' + xT + '" y="' + (p.y - 6) + '" text-anchor="' + ancre + '">' + p.court + '</text>'
      + '<text class="prix" x="' + xT + '" y="' + (p.y + 13) + '" text-anchor="' + ancre + '">'
      + montantLisible(ligne) + '</text>'
      + '</g>';
  }).join('');
}


function dessinVetement(idSection) {
  const v = VETEMENTS[idSection];
  if (!v) return '';
  const t = v.trace;

  const contour = t.pieces.map(function (d) {
    return '<path class="trait" d="' + d + '"/>'
         + '<path class="repasse" d="' + d + '" transform="translate(2.6,1.9)"/>';
  }).join('');

  const struct = t.details.map(function (d) {
    return '<path class="detail" d="' + d + '"/>';
  }).join('');

  const plis = t.detailsFins.map(function (d) {
    return '<path class="detail fin" d="' + d + '"/>';
  }).join('');

  const coupes = (t.coupes || []).map(function (c) {
    const ref = (c.bord !== undefined) ? t.pieces[c.bord] : c.d;
    return '<path class="coupe" d="' + coupeParallele(ref, c.de, c.a, c.ecart) + '"/>';
  }).join('');

  const zip = t.zip ? fermetureEclair(t.zip) : '';

  /* Le filtre de grain est déclaré dans le dessin lui-même : la planche reste
     autonome, où qu'on la place dans la page. Son identifiant porte celui du
     vêtement — quatre planches affichées ensemble déclaraient sinon quatre
     fois le même `id`, ce qui rend le document invalide et les références
     `url(#…)` ambiguës. */
  const grain = 'grain-craie-' + idSection;
  return '<svg viewBox="' + v.boite + '" role="img" aria-label="' + v.alt + '"'
       + ' style="--grain:url(#' + grain + ')">'
       + '<defs><filter id="' + grain + '" x="-5%" y="-5%" width="110%" height="110%">'
       + '<feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="3" seed="7" result="b"/>'
       + '<feDisplacementMap in="SourceGraphic" in2="b" scale="1.7"'
       + ' xChannelSelector="R" yChannelSelector="G"/></filter></defs>'
       + '<g class="vetement">' + contour + struct + plis + coupes + zip + '</g>'
       + '<g class="reperes">' + reperesDePrix(v, idSection) + '</g>'
       + '</svg>';
}
