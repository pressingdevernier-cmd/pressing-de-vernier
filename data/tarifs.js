/* ============================================================================
   LISTE DE PRIX — Pressing de Vernier
   ============================================================================

   C'EST LE SEUL FICHIER À MODIFIER POUR CHANGER UN PRIX.
   Les versions française et anglaise du site lisent toutes les deux ce fichier.

   Une ligne ressemble à ceci :

       { fr: "Ourlet simple piqué machine", en: "Machine-stitched hem", prix: 18 },

       fr    le libellé en français
       en    le libellé en anglais
       prix  le montant en francs, TTC
       des   à ajouter (des: true) quand le prix est un minimum → affiche « dès 18.– »
       unite à ajouter pour préciser une unité → { unite: "le m²" }

   POUR CHANGER UN PRIX : modifiez le nombre après « prix: », rien d'autre.
   Ne touchez pas aux virgules, aux accolades ni aux guillemets.

   Tous les prix sont TTC, TVA 8,1 % comprise.
   Dernière mise à jour : 30 août 2026
   ============================================================================ */

const TARIFS = [

  /* ------------------------------------------------------------------ */
  {
    id: "nettoyage-vetements",
    fr: "Nettoyage — Vêtements",
    en: "Dry cleaning — Clothing",
    lignes: [
      { fr: "Complet",                  en: "Suit",                     prix: 24 },
      { fr: "Tailleur",                 en: "Women's suit",             prix: 24 },
      { fr: "Veston",                   en: "Jacket",                   prix: 13 },
      { fr: "Pantalon",                 en: "Trousers",                 prix: 11 },
      { fr: "Pantalon en soie",         en: "Silk trousers",            prix: 13 },
      { fr: "Chemise sur cintre",       en: "Shirt on hanger",          prix: 5.50 },
      { fr: "Chemise pliée",            en: "Folded shirt",             prix: 6 },
      { fr: "Chemise en soie",          en: "Silk shirt",               prix: 12 },
      { fr: "Robe courte simple",       en: "Short plain dress",        prix: 14, des: true },
      { fr: "Robe en soie",             en: "Silk dress",               prix: 15, des: true },
      { fr: "Robe plissée",             en: "Pleated dress",            prix: 18, des: true },
      { fr: "Jupe simple",              en: "Plain skirt",              prix: 11, des: true },
      { fr: "Jupe en soie",             en: "Silk skirt",               prix: 12, des: true },
      { fr: "Jupe plissée",             en: "Pleated skirt",            prix: 15, des: true },
      { fr: "Pull-over / Sweat-shirt",  en: "Pullover / Sweatshirt",    prix: 8 },
      { fr: "Pull en laine / Jaquette", en: "Wool jumper / Cardigan",   prix: 10 },
      { fr: "Gilet",                    en: "Waistcoat",                prix: 9 },
      { fr: "Chemisier / Top",          en: "Blouse / Top",             prix: 7.50 },
      { fr: "Chemisier en soie",        en: "Silk blouse",              prix: 12, des: true },
      { fr: "Jeans",                    en: "Jeans",                    prix: 7 },
      { fr: "Short",                    en: "Shorts",                   prix: 7.50 },
      { fr: "T-shirt",                  en: "T-shirt",                  prix: 4.50 },
      { fr: "Polo",                     en: "Polo shirt",               prix: 5.50 },
      { fr: "Camisole / Débardeur",     en: "Camisole / Vest top",      prix: 2.50 },
      { fr: "Sous-vêtements",           en: "Underwear",                prix: 2 },
      { fr: "Blouse",                   en: "Smock",                    prix: 11, des: true }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "nettoyage-manteaux",
    fr: "Nettoyage — Manteaux",
    en: "Dry cleaning — Coats",
    lignes: [
      { fr: "Manteau court",            en: "Short coat",               prix: 20, des: true },
      { fr: "Manteau long",             en: "Long coat",                prix: 25, des: true },
      { fr: "Imperméable",              en: "Raincoat",                 prix: 22, des: true },
      { fr: "Anorak / Veste de ski",    en: "Anorak / Ski jacket",      prix: 22, des: true },
      { fr: "Doudoune plumes simple",   en: "Plain down jacket",        prix: 25, des: true },
      { fr: "Doudoune délicate",        en: "Delicate down jacket",     prix: 30, des: true }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "nettoyage-accessoires",
    fr: "Nettoyage — Accessoires",
    en: "Dry cleaning — Accessories",
    lignes: [
      { fr: "Écharpe coton / synthétique",      en: "Cotton / synthetic scarf",   prix: 10 },
      { fr: "Écharpe cachemire / pashmina",     en: "Cashmere scarf / pashmina",  prix: 14 },
      { fr: "Écharpe délicate / foulard soie",  en: "Delicate or silk scarf",     prix: 16 },
      { fr: "Cravate soie / laine",             en: "Silk or wool tie",           prix: 10 },
      { fr: "Cravate synthétique",              en: "Synthetic tie",              prix: 7 }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "blanchisserie-literie",
    fr: "Blanchisserie — Literie",
    en: "Laundry — Bedding",
    lignes: [
      { fr: "Drap sans repassage",                   en: "Sheet, not ironed",              prix: 8.50 },
      { fr: "Drap avec repassage",                   en: "Sheet, ironed",                  prix: 11 },
      { fr: "Housse de duvet",                       en: "Duvet cover",                    prix: 13, des: true },
      { fr: "Duvet synthétique petit (max 140 cm)",  en: "Small synthetic duvet (max 140 cm)", prix: 40 },
      { fr: "Duvet synthétique grand (dès 160 cm)",  en: "Large synthetic duvet (160 cm +)",   prix: 50 },
      { fr: "Duvet plume petit (max 140 cm)",        en: "Small down duvet (max 140 cm)",  prix: 50 },
      { fr: "Duvet plume grand (dès 160 cm)",        en: "Large down duvet (160 cm +)",    prix: 60 },
      { fr: "Alèse / Molleton / Sur-matelas",        en: "Mattress protector / topper",    prix: 20, des: true },
      { fr: "Couvre-lit",                            en: "Bedspread",                      prix: 25, des: true },
      { fr: "Taie d'oreiller petite",                en: "Small pillowcase",               prix: 4 },
      { fr: "Taie d'oreiller grande",                en: "Large pillowcase",               prix: 4.50 },
      { fr: "Oreiller synthétique petit (max 60 cm)", en: "Small synthetic pillow (max 60 cm)", prix: 12, des: true },
      { fr: "Oreiller synthétique grand",            en: "Large synthetic pillow",         prix: 18, des: true },
      { fr: "Oreiller plumes petit (max 60 cm)",     en: "Small down pillow (max 60 cm)",  prix: 16, des: true },
      { fr: "Oreiller plumes grand",                 en: "Large down pillow",              prix: 25, des: true },
      { fr: "Traversin",                             en: "Bolster",                        prix: 5 }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "blanchisserie-maison",
    fr: "Blanchisserie — Linge de maison",
    en: "Laundry — Household linen",
    lignes: [
      { fr: "Chemin de table",        en: "Table runner",           prix: 10, des: true },
      { fr: "Nappe",                  en: "Tablecloth",             prix: 6.50, des: true },
      { fr: "Serviette",              en: "Napkin",                 prix: 2.50 },
      { fr: "Linge de cuisine",       en: "Kitchen cloth",          prix: 2.50 },
      { fr: "Coussin",                en: "Cushion",                prix: 16, des: true },
      { fr: "Linge de bain",          en: "Bath towel",             prix: 5.50 },
      { fr: "Linge de toilette",      en: "Hand towel",             prix: 4 },
      { fr: "Lavette",                en: "Face cloth",             prix: 1 },
      { fr: "Jeu de tapis de bain",   en: "Bath mat set",           prix: 20 },
      { fr: "Couverture",             en: "Blanket",                prix: 20 },
      { fr: "Rideaux en nylon",           en: "Nylon curtains",           prix: 5.50, unite: { fr: "le m²", en: "per m²" } },
      { fr: "Rideaux en coton simple",    en: "Single cotton curtains",   prix: 11, des: true, unite: { fr: "le m²", en: "per m²" } },
      { fr: "Rideaux en coton double",    en: "Lined cotton curtains",    prix: 13, des: true, unite: { fr: "le m²", en: "per m²" } },
      { fr: "Rideaux en velours",         en: "Velvet curtains",          prix: 13, des: true, unite: { fr: "le m²", en: "per m²" } },
      { fr: "Rideaux en velours double",  en: "Lined velvet curtains",    prix: 15, des: true, unite: { fr: "le m²", en: "per m²" } }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "retouches-chemises",
    fr: "Retouches — Chemises",
    en: "Alterations — Shirts",
    lignes: [
      { fr: "Ajuster manches",   en: "Take in sleeves",   prix: 25 },
      { fr: "Ajuster longueur",  en: "Adjust length",     prix: 22 },
      { fr: "Ajuster taille",    en: "Take in waist",     prix: 15 },
      { fr: "Retourner col",     en: "Turn collar",       prix: 15 },
      { fr: "Raccourcir",        en: "Shorten",           prix: 20 }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "retouches-pantalons",
    fr: "Retouches — Pantalons",
    en: "Alterations — Trousers",
    lignes: [
      { fr: "Ourlet simple piqué machine",  en: "Machine-stitched hem",     prix: 18 },
      { fr: "Ourlet avec fente",            en: "Hem with slit",            prix: 25 },
      { fr: "Ourlet avec revers",           en: "Hem with turn-up",         prix: 25 },
      { fr: "Ourlet avec talonnette",       en: "Hem with heel guard",      prix: 25 },
      { fr: "Ourlet invisible",             en: "Blind hem",                prix: 22 },
      { fr: "Ourlet original",              en: "Original hem",             prix: 22 },
      { fr: "Fermeture éclair",             en: "Zip replacement",          prix: 25 },
      { fr: "Ajuster taille ou hanches",    en: "Take in waist or hips",    prix: 25 },
      { fr: "Changer poche",                en: "Replace pocket",           prix: 20 },
      { fr: "Doublure genoux",              en: "Knee lining",              prix: 40 },
      { fr: "Changer élastique",            en: "Replace elastic",          prix: 20 },
      { fr: "Mettre crochet ou pression",   en: "Add hook or snap",         prix: 10 },
      { fr: "Renforcer entre-jambes",       en: "Reinforce crotch",         prix: 15 }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "retouches-jupes",
    fr: "Retouches — Jupes",
    en: "Alterations — Skirts",
    lignes: [
      { fr: "Ourlet jupe droite",               en: "Straight skirt hem",         prix: 22 },
      { fr: "Ourlet jupe droite avec doublure", en: "Lined straight skirt hem",   prix: 25 },
      { fr: "Fermeture éclair invisible",       en: "Invisible zip",              prix: 25 },
      { fr: "Fermeture éclair normale",         en: "Standard zip",               prix: 22 },
      { fr: "Ajuster taille",                   en: "Take in waist",              prix: 20 },
      { fr: "Poser élastique coulissant",       en: "Fit drawstring elastic",     prix: 15 },
      { fr: "Changer doublure",                 en: "Replace lining",             prix: 45 }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "retouches-pulls",
    fr: "Retouches — Pull / Jaquette",
    en: "Alterations — Jumper / Cardigan",
    lignes: [
      { fr: "Réparer un trou", en: "Mend a hole",     prix: 7, des: true },
      { fr: "Recoudre le col", en: "Restitch collar", prix: 10 }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "retouches-manteaux",
    fr: "Retouches — Manteaux",
    en: "Alterations — Coats",
    lignes: [
      { fr: "Fermeture éclair",                 en: "Zip replacement",          prix: 55, des: true },
      { fr: "Ajuster longueur",                 en: "Adjust length",            prix: 40 },
      { fr: "Ajuster manches",                  en: "Adjust sleeves",           prix: 40 },
      { fr: "Doublure de poche",                en: "Pocket lining",            prix: 20 },
      { fr: "Doublure de manches",              en: "Sleeve lining",            prix: 55 },
      { fr: "Doublure complète sans manches",   en: "Full lining, no sleeves",  prix: 110 },
      { fr: "Doublure complète avec manches",   en: "Full lining with sleeves", prix: 170, des: true },
      { fr: "Réparer fond de poche",            en: "Repair pocket bag",        prix: 15 }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "retouches-vestes",
    fr: "Retouches — Veste / Blouson / Veston",
    en: "Alterations — Jackets",
    lignes: [
      { fr: "Fermeture éclair",                                  en: "Zip replacement",                     prix: 50 },
      { fr: "Ajuster longueur",                                  en: "Adjust length",                       prix: 40 },
      { fr: "Ajuster manches",                                   en: "Adjust sleeves",                      prix: 40, des: true },
      { fr: "Doublure manches",                                  en: "Sleeve lining",                       prix: 50 },
      { fr: "Doublure complète sans manches (avec fourniture)",  en: "Full lining, no sleeves (materials included)",   prix: 110 },
      { fr: "Doublure complète avec manches (avec fournitures)", en: "Full lining with sleeves (materials included)",  prix: 170 },
      { fr: "Réparer fond de poche",                             en: "Repair pocket bag",                   prix: 15 },
      { fr: "Recoudre un coin de poche",                         en: "Restitch pocket corner",              prix: 15 }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "retouches-robe",
    fr: "Retouches — Robe simple",
    en: "Alterations — Plain dress",
    lignes: [
      { fr: "Ourlet robe droite",         en: "Straight dress hem",   prix: 22 },
      { fr: "Fermeture éclair invisible", en: "Invisible zip",        prix: 30 },
      { fr: "Ajuster taille",             en: "Take in waist",        prix: 30 },
      { fr: "Poser épaulettes",           en: "Fit shoulder pads",    prix: 25 },
      { fr: "Doublure sans manches",      en: "Lining, no sleeves",   prix: 50 },
      { fr: "Doublure avec manches",      en: "Lining with sleeves",  prix: 75 }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "retouches-soiree",
    fr: "Retouches — Robe de soirée",
    en: "Alterations — Evening dress",
    lignes: [
      { fr: "Ourlet simple sans doublure", en: "Plain hem, unlined",  prix: 40 },
      { fr: "Ourlet simple avec doublure", en: "Plain hem, lined",    prix: 60 },
      { fr: "Fermeture éclair invisible",  en: "Invisible zip",       prix: 30 },
      { fr: "Ajuster taille",              en: "Take in waist",       prix: 30 },
      { fr: "Poser bonnets",               en: "Fit bra cups",        prix: 20 }
    ]
  },

  /* ------------------------------------------------------------------
     Les rideaux ont deux colonnes de prix : simples et doubles.
     La deuxième colonne s'écrit avec « prix2 ».
     ------------------------------------------------------------------ */
  {
    id: "retouches-rideaux",
    fr: "Retouches — Rideaux",
    en: "Alterations — Curtains",
    colonnes: {
      fr: ["Rideaux simples", "Rideaux doubles"],
      en: ["Single curtains", "Lined curtains"]
    },
    lignes: [
      { fr: "Raccourcir",                  en: "Shorten",              prix: 18, des: true, prix2: 34, des2: true },
      { fr: "Poser un crochet ou un galet", en: "Fit a hook or glider", prix: 3,             prix2: 3 }
    ]
  }
];

/* ============================================================================
   MENTIONS AFFICHÉES SOUS LES TABLEAUX — modifiables ici aussi
   ============================================================================ */
const TARIFS_MENTIONS = {
  fr: {
    tva: "Prix en francs suisses, TTC, TVA 8,1 % comprise.",
    des: "« Dès » signifie prix minimum : nous regardons la pièce avec vous.",
    maj: "Tarifs au 30 août 2026."
  },
  en: {
    tva: "Prices in Swiss francs, VAT 8.1% included.",
    des: "“From” means minimum price: we look at the item with you.",
    maj: "Prices as of 30 August 2026."
  }
};
