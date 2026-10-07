/* ============================================================================
   LISTE DE PRIX — Pressing de Vernier
   ============================================================================

   C'EST LE SEUL FICHIER À MODIFIER POUR CHANGER UN PRIX.
   Les versions française et anglaise du site lisent toutes les deux ce fichier.

   Une ligne ressemble à ceci :

       { fr: "Ourlet simple piqué machine", en: "Machine-stitched hem", prix: 18 },

       fr    le libellé en français
       en    le libellé en anglais (pas affiché pour l'instant — le site est
             en français seulement. Conservé pour ne pas refaire ce travail
             le jour où une version anglaise sera demandée.)
       prix  le montant en francs, TTC
       des   à ajouter (des: true) quand le prix est un minimum → affiche « dès 18.– »
       unite à ajouter pour préciser une unité → { unite: { fr: "le m²", en: "per m²" } }
       devis à ajouter (devis: true) À LA PLACE du prix, quand le montant
             dépend de la pièce → affiche « Sur devis ». Pas de « prix: » alors.

   Un groupe peut aussi porter une « note » : une phrase affichée sous son
   titre, pour expliquer une particularité au client.

   POUR CHANGER UN PRIX : modifiez le nombre après « prix: », rien d'autre.
   Ne touchez pas aux virgules, aux accolades ni aux guillemets.

   Tous les prix sont TTC, TVA 8,1 % comprise.
   La date de mise à jour se change dans data/etablissement.js.
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
      { fr: "Jeans",                    en: "Jeans",                    prix: 11 },
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

  /* ------------------------------------------------------------------
     ENTRETIEN SPÉCIALISÉ
     Ces pièces sont prises en charge au magasin puis confiées à des
     spécialistes. Le prix dépend de la pièce : seuls les tapis ont un
     prix de départ, au mètre carré.
     ------------------------------------------------------------------ */
  {
    id: "entretien-specialise",
    fr: "Entretien spécialisé",
    en: "Specialist care",
    note: {
      fr: "Nous prenons la pièce en charge et vous remettons un prix après examen.",
      en: "We take the item in and give you a price once we have examined it."
    },
    lignes: [
      { fr: "Tapis",                              en: "Rugs",                          prix: 30, des: true, unite: { fr: "le m²", en: "per m²" } },
      { fr: "Vêtements et articles en cuir",      en: "Leather clothing and goods",    devis: true },
      { fr: "Daim",                               en: "Suede",                         devis: true },
      { fr: "Sacs — nettoyage et restauration",   en: "Bags — cleaning and restoring",  devis: true }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "blanchisserie-kilo",
    fr: "Blanchisserie — Linge au kilo",
    en: "Laundry — By the kilo",
    note: {
      fr: "Deux formules, au poids. Le linge est pesé au dépôt.",
      en: "Two options, charged by weight. The laundry is weighed when you drop it off."
    },
    lignes: [
      { fr: "Lavage, séchage et pliage",              en: "Washing, drying and folding",            prix: 6,  unite: { fr: "le kg", en: "per kg" } },
      { fr: "Lavage, séchage, repassage et pliage",   en: "Washing, drying, ironing and folding",   prix: 12, unite: { fr: "le kg", en: "per kg" } },
      { fr: "Repassage seul — linge apporté déjà lavé",    en: "Ironing only — laundry brought in already washed", devis: true }
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
      { fr: "Rideaux en velours double",  en: "Lined velvet curtains",    prix: 15, des: true, unite: { fr: "le m²", en: "per m²" } },
      { fr: "Plaid",                          en: "Throw",                          devis: true },
      { fr: "Housse amovible (fauteuil, canapé)", en: "Removable cover (armchair, sofa)", devis: true }
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
      { fr: "Ourlet original",              en: "Original hem",             prix: 25 },
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
      { fr: "Fermeture éclair normale",         en: "Standard zip",               prix: 25 },
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
  },

  /* ------------------------------------------------------------------
     TRANSFORMATIONS ET CRÉATIONS
     Le prix dépend entièrement de la pièce, du tissu et du travail
     demandé. Rien n'est chiffré à l'avance.
     ------------------------------------------------------------------ */
  {
    id: "couture-creations",
    fr: "Couture — Transformations et créations",
    en: "Sewing — Alterations and made-to-measure",
    note: {
      fr: "Apportez la pièce ou le tissu : nous regardons ensemble et vous remettons un prix.",
      en: "Bring the item or the fabric: we look at it together and give you a price."
    },
    lignes: [
      { fr: "Transformation d'un vêtement",             en: "Reworking a garment",                    devis: true },
      { fr: "Chemise sur mesure, dans votre tissu",     en: "Made-to-measure shirt, in your fabric",  devis: true },
      { fr: "Robe ou autre pièce sur mesure",           en: "Made-to-measure dress or other piece",   devis: true },
      { fr: "Broderie",                                 en: "Embroidery",                             devis: true },
      { fr: "Pose de patch, y compris en relief",       en: "Patches, including raised",              devis: true },
      { fr: "Travaux en série pour les professionnels", en: "Batch work for businesses",              devis: true }
    ]
  }
];

/* ============================================================================
   MENTIONS AFFICHÉES SOUS LES TABLEAUX — modifiables ici aussi

   La date de mise à jour n'est pas écrite ici : elle vient de
   data/etablissement.js, pour n'exister qu'à un seul endroit.
   ============================================================================ */
const TARIFS_MENTIONS = {
  tva:   "Prix en francs suisses, TTC, TVA 8,1 % comprise.",
  des:   "« Dès » indique un prix minimum : la matière, la complexité ou les dimensions font varier le tarif.",
  devis: "« Sur devis » : nous examinons la pièce avec vous et vous remettons un prix avant de commencer."
};
