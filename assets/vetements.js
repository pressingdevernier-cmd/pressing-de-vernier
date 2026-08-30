/* ============================================================================
   LES DESSINS TECHNIQUES — un par famille de vêtement
   ----------------------------------------------------------------------------
   Chaque dessin est une planche de tailleur à plat, sur le même cadre
   de 340 × 420, pour que les vêtements gardent des tailles comparables
   quand on passe de l'un à l'autre.

   Trois niveaux de trait :
     .piece   le contour du vêtement, trait plein
     .detail  les coutures et surpiqûres intérieures, trait fin
     .piqure  les points de couture en pointillé doré
     .cote    les lignes de mesure

   RÈGLE ABSOLUE : tout élément .detail doit rester à l'intérieur du
   contour .piece. Un contrôle automatique le vérifie (voir plus bas).
   ============================================================================ */

const VETEMENTS = {

  /* ── PANTALON ─────────────────────────────────────────────────────────── */
  'retouches-pantalons': `
    <path class="piece trace" style="--len:1400;--dur:3s;--del:.3s"
          d="M112,62 L106,382 L154,382 L166,198 L174,198 L186,382 L234,382 L228,62 Z"/>
    <path class="detail trace" style="--len:130;--del:1.6s" d="M112,92 H228"/>
    <path class="detail trace" style="--len:70;--del:1.8s" d="M170,92 C164,116 162,134 164,150"/>
    <path class="detail trace" style="--len:90;--del:2.0s" d="M118,92 C128,104 140,110 152,110"/>
    <path class="detail trace" style="--len:90;--del:2.0s" d="M222,92 C212,104 200,110 188,110"/>
    <path class="detail trace" style="--len:300;--del:2.2s" d="M132,112 V376"/>
    <path class="detail trace" style="--len:300;--del:2.2s" d="M208,112 V376"/>
    <path class="piqure trace" style="--len:52;--del:2.6s" d="M108,368 H152"/>
    <path class="piqure trace" style="--len:52;--del:2.7s" d="M188,368 H232"/>
    <path class="piqure trace" style="--len:120;--del:2.8s" d="M112,78 H228"/>
    <path class="cote trace" style="--len:340;--del:3.1s" d="M256,62 V382 M250,62 H262 M250,382 H262"/>
    <text x="272" y="222" transform="rotate(90 272 222)">__LONGUEUR__</text>`,

  /* ── CHEMISE ──────────────────────────────────────────────────────────── */
  'retouches-chemises': `
    <path class="piece trace" style="--len:1500;--dur:3.2s;--del:.3s"
          d="M150,52 L104,66 L62,180 L98,198 L130,150 L126,344 L214,344 L210,150 L242,198 L278,180 L236,66 L190,52"/>
    <path class="piece trace" style="--len:120;--del:1.5s" d="M150,52 C158,44 182,44 190,52"/>
    <path class="piece trace" style="--len:150;--del:1.7s" d="M150,52 L170,80 L190,52"/>
    <path class="detail trace" style="--len:190;--del:1.9s" d="M104,66 C130,94 210,94 236,66"/>
    <path class="detail trace" style="--len:530;--del:2.0s" d="M164,80 V344 M176,80 V344"/>
    <circle class="detail trace" style="--len:22;--del:2.2s" cx="170" cy="126" r="3.2"/>
    <circle class="detail trace" style="--len:22;--del:2.28s" cx="170" cy="176" r="3.2"/>
    <circle class="detail trace" style="--len:22;--del:2.36s" cx="170" cy="226" r="3.2"/>
    <circle class="detail trace" style="--len:22;--del:2.44s" cx="170" cy="276" r="3.2"/>
    <path class="detail trace" style="--len:200;--del:2.4s" d="M138,158 H172 V196 L164,204 H146 L138,196 Z"/>
    <path class="piqure trace" style="--len:36;--del:2.7s" d="M138,168 H172"/>
    <path class="detail trace" style="--len:80;--del:2.5s" d="M70,168 L104,186"/>
    <path class="detail trace" style="--len:80;--del:2.5s" d="M270,168 L236,186"/>
    <path class="piqure trace" style="--len:92;--del:2.9s" d="M126,334 H214"/>
    <path class="cote trace" style="--len:300;--del:3.1s" d="M300,80 V344 M294,80 H306 M294,344 H306"/>
    <text x="316" y="216" transform="rotate(90 316 216)">__LONGUEUR__</text>`,

  /* ── JUPE ─────────────────────────────────────────────────────────────── */
  'retouches-jupes': `
    <path class="piece trace" style="--len:900;--dur:2.6s;--del:.3s"
          d="M134,96 L114,332 L226,332 L206,96 Z"/>
    <path class="detail trace" style="--len:80;--del:1.5s" d="M134,124 H206"/>
    <path class="detail trace" style="--len:210;--del:1.8s" d="M170,124 V326" stroke-dasharray="0"/>
    <path class="piqure trace" style="--len:60;--del:2.1s" d="M170,128 V196"/>
    <path class="detail trace" style="--len:120;--del:2.2s" d="M148,150 C146,220 142,280 138,322"/>
    <path class="detail trace" style="--len:120;--del:2.3s" d="M192,150 C194,220 198,280 202,322"/>
    <path class="piqure trace" style="--len:116;--del:2.6s" d="M116,322 H224"/>
    <path class="piqure trace" style="--len:76;--del:2.7s" d="M134,102 H206"/>
    <path class="cote trace" style="--len:260;--del:3s" d="M252,96 V332 M246,96 H258 M246,332 H258"/>
    <text x="268" y="214" transform="rotate(90 268 214)">__LONGUEUR__</text>`,

  /* ── ROBE ─────────────────────────────────────────────────────────────── */
  'retouches-robe': `
    <path class="piece trace" style="--len:1200;--dur:3s;--del:.3s"
          d="M150,64 L124,80 L136,168 L112,336 L228,336 L204,168 L216,80 L190,64"/>
    <path class="piece trace" style="--len:120;--del:1.5s" d="M150,64 C158,54 182,54 190,64"/>
    <path class="detail trace" style="--len:90;--del:1.8s" d="M136,168 H204"/>
    <path class="detail trace" style="--len:170;--del:2.0s" d="M170,80 V330"/>
    <path class="piqure trace" style="--len:70;--del:2.3s" d="M170,84 V158"/>
    <path class="detail trace" style="--len:100;--del:2.2s" d="M150,178 C146,240 142,300 138,330"/>
    <path class="detail trace" style="--len:100;--del:2.3s" d="M190,178 C194,240 198,300 202,330"/>
    <path class="piqure trace" style="--len:112;--del:2.6s" d="M114,326 H226"/>
    <path class="detail trace" style="--len:60;--del:2.4s" d="M124,80 C140,96 200,96 216,80"/>
    <path class="cote trace" style="--len:300;--del:3s" d="M254,64 V336 M248,64 H260 M248,336 H260"/>
    <text x="270" y="216" transform="rotate(90 270 216)">__LONGUEUR__</text>`,

  /* ── ROBE DE SOIRÉE ───────────────────────────────────────────────────── */
  'retouches-soiree': `
    <path class="piece trace" style="--len:1300;--dur:3.2s;--del:.3s"
          d="M148,62 L126,84 L138,178 L118,384 L222,384 L202,178 L214,84 L192,62"/>
    <path class="piece trace" style="--len:130;--del:1.5s" d="M148,62 C156,50 184,50 192,62"/>
    <path class="detail trace" style="--len:70;--del:1.8s" d="M138,178 H202"/>
    <path class="detail trace" style="--len:210;--del:2.0s" d="M170,84 V378"/>
    <path class="piqure trace" style="--len:90;--del:2.3s" d="M170,88 V168"/>
    <path class="detail trace" style="--len:130;--del:2.2s" d="M152,190 C148,260 142,330 138,378"/>
    <path class="detail trace" style="--len:130;--del:2.3s" d="M188,190 C192,260 198,330 202,378"/>
    <path class="piqure trace" style="--len:104;--del:2.6s" d="M120,374 H220"/>
    <path class="detail trace" style="--len:64;--del:2.4s" d="M126,84 C142,102 198,102 214,84"/>
    <path class="cote trace" style="--len:340;--del:3s" d="M250,62 V384 M244,62 H256 M244,384 H256"/>
    <text x="266" y="224" transform="rotate(90 266 224)">__LONGUEUR__</text>`,

  /* ── VESTE ────────────────────────────────────────────────────────────── */
  'retouches-vestes': `
    <path class="piece trace" style="--len:1500;--dur:3.2s;--del:.3s"
          d="M148,56 L102,72 L64,186 L100,204 L132,158 L128,320 L212,320 L208,158 L240,204 L276,186 L238,72 L192,56"/>
    <path class="piece trace" style="--len:230;--del:1.6s" d="M148,56 L170,112 L192,56"/>
    <path class="detail trace" style="--len:150;--del:1.9s" d="M148,56 L146,104 L170,112"/>
    <path class="detail trace" style="--len:150;--del:1.9s" d="M192,56 L194,104 L170,112"/>
    <path class="detail trace" style="--len:220;--del:2.1s" d="M170,112 V318"/>
    <circle class="detail trace" style="--len:22;--del:2.3s" cx="170" cy="176" r="3.4"/>
    <circle class="detail trace" style="--len:22;--del:2.38s" cx="170" cy="216" r="3.4"/>
    <path class="detail trace" style="--len:120;--del:2.4s" d="M138,222 H164 M176,222 H202"/>
    <path class="piqure trace" style="--len:26;--del:2.7s" d="M138,222 H164"/>
    <path class="piqure trace" style="--len:26;--del:2.75s" d="M176,222 H202"/>
    <path class="detail trace" style="--len:80;--del:2.5s" d="M72,174 L104,192"/>
    <path class="detail trace" style="--len:80;--del:2.5s" d="M268,174 L236,192"/>
    <path class="piqure trace" style="--len:88;--del:2.9s" d="M128,310 H212"/>
    <path class="cote trace" style="--len:280;--del:3.1s" d="M298,72 V320 M292,72 H304 M292,320 H304"/>
    <text x="314" y="206" transform="rotate(90 314 206)">__LONGUEUR__</text>`,

  /* ── MANTEAU ──────────────────────────────────────────────────────────── */
  'retouches-manteaux': `
    <path class="piece trace" style="--len:1700;--dur:3.4s;--del:.3s"
          d="M146,52 L98,70 L60,196 L98,214 L130,166 L124,378 L216,378 L210,166 L242,214 L280,196 L242,70 L194,52"/>
    <path class="piece trace" style="--len:240;--del:1.6s" d="M146,52 L170,116 L194,52"/>
    <path class="detail trace" style="--len:160;--del:1.9s" d="M146,52 L142,108 L170,116"/>
    <path class="detail trace" style="--len:160;--del:1.9s" d="M194,52 L198,108 L170,116"/>
    <path class="detail trace" style="--len:270;--del:2.1s" d="M170,116 V374"/>
    <circle class="detail trace" style="--len:22;--del:2.3s" cx="170" cy="178" r="3.6"/>
    <circle class="detail trace" style="--len:22;--del:2.38s" cx="170" cy="228" r="3.6"/>
    <circle class="detail trace" style="--len:22;--del:2.46s" cx="170" cy="278" r="3.6"/>
    <path class="detail trace" style="--len:120;--del:2.5s" d="M136,244 H162 M178,244 H204"/>
    <path class="piqure trace" style="--len:26;--del:2.7s" d="M136,244 H162"/>
    <path class="piqure trace" style="--len:26;--del:2.75s" d="M178,244 H204"/>
    <path class="detail trace" style="--len:80;--del:2.55s" d="M70,184 L102,202"/>
    <path class="detail trace" style="--len:80;--del:2.55s" d="M270,184 L238,202"/>
    <path class="detail trace" style="--len:90;--del:2.6s" d="M126,300 H214"/>
    <path class="piqure trace" style="--len:92;--del:2.9s" d="M124,368 H216"/>
    <path class="cote trace" style="--len:360;--del:3.2s" d="M302,70 V378 M296,70 H308 M296,378 H308"/>
    <text x="318" y="234" transform="rotate(90 318 234)">__LONGUEUR__</text>`,

  /* ── PULL ─────────────────────────────────────────────────────────────── */
  'retouches-pulls': `
    <path class="piece trace" style="--len:1450;--dur:3.2s;--del:.3s"
          d="M148,64 L104,78 L66,178 L102,198 L132,154 L128,318 L212,318 L208,154 L238,198 L274,178 L236,78 L192,64"/>
    <path class="piece trace" style="--len:130;--del:1.6s" d="M148,64 C158,84 182,84 192,64"/>
    <path class="detail trace" style="--len:130;--del:1.9s" d="M144,74 C156,96 184,96 196,74"/>
    <path class="detail trace" style="--len:90;--del:2.1s" d="M128,300 H212"/>
    <path class="detail trace" style="--len:44;--del:2.2s" d="M132,300 V318 M148,300 V318 M164,300 V318 M176,300 V318 M192,300 V318 M208,300 V318"/>
    <path class="detail trace" style="--len:60;--del:2.4s" d="M74,168 L106,186"/>
    <path class="detail trace" style="--len:60;--del:2.4s" d="M266,168 L234,186"/>
    <path class="piqure trace" style="--len:88;--del:2.8s" d="M128,306 H212"/>
    <path class="cote trace" style="--len:280;--del:3.1s" d="M296,78 V318 M290,78 H302 M290,318 H302"/>
    <text x="312" y="204" transform="rotate(90 312 204)">__LONGUEUR__</text>`,

  /* ── RIDEAUX ──────────────────────────────────────────────────────────── */
  'retouches-rideaux': `
    <path class="piece trace" style="--len:200;--del:.3s" d="M70,64 H270"/>
    <circle class="piece trace" style="--len:26;--del:.6s" cx="70" cy="64" r="6"/>
    <circle class="piece trace" style="--len:26;--del:.6s" cx="270" cy="64" r="6"/>
    <circle class="ferrure trace" style="--len:20;--del:.9s" cx="100" cy="64" r="4"/>
    <circle class="ferrure trace" style="--len:20;--del:.95s" cx="132" cy="64" r="4"/>
    <circle class="ferrure trace" style="--len:20;--del:1.0s" cx="164" cy="64" r="4"/>
    <circle class="ferrure trace" style="--len:20;--del:1.05s" cx="196" cy="64" r="4"/>
    <circle class="detail trace" style="--len:20;--del:1.1s" cx="228" cy="64" r="4"/>
    <path class="piece trace" style="--len:800;--dur:2.8s;--del:1.2s"
          d="M88,70 L82,350 L166,350 L166,70 Z"/>
    <path class="piece trace" style="--len:800;--dur:2.8s;--del:1.4s"
          d="M174,70 L174,350 L258,350 L252,70 Z"/>
    <path class="detail trace" style="--len:280;--del:2.2s" d="M110,72 C106,180 104,280 102,346"/>
    <path class="detail trace" style="--len:280;--del:2.3s" d="M138,72 C136,180 134,280 132,346"/>
    <path class="detail trace" style="--len:280;--del:2.4s" d="M202,72 C204,180 206,280 208,346"/>
    <path class="detail trace" style="--len:280;--del:2.5s" d="M230,72 C232,180 234,280 236,346"/>
    <path class="piqure trace" style="--len:88;--del:2.9s" d="M84,342 H166"/>
    <path class="piqure trace" style="--len:88;--del:2.95s" d="M174,342 H256"/>
    <path class="cote trace" style="--len:300;--del:3.2s" d="M282,64 V350 M276,64 H288 M276,350 H288"/>
    <text x="298" y="214" transform="rotate(90 298 214)">__LONGUEUR__</text>`,
};

/* Le libellé de la cote change selon la langue de la page */
function dessinVetement(idSection, motLongueur) {
  const brut = VETEMENTS[idSection];
  if (!brut) return '';
  return '<svg viewBox="0 0 340 420" role="img" aria-label="' + motLongueur + '">'
       + brut.replaceAll('__LONGUEUR__', motLongueur)
       + '</svg>';
}
