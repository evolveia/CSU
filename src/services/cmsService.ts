import { FaqItem, NewsItem, SocialProgram } from '../types';

export const cmsService = {
  // 1 « Qu'est-ce que le CSU ? »
  getWhatIsData() {
    return {
      title: "Qu'est-ce que le CSU ?",
      badge: "Registre Unique National",
      description:
        "Le Cadastre Socio-Économique Unifié (CSU) est l’infrastructure numérique d’État qui identifie, enregistre et certifie la situation de chaque foyer en République Démocratique du Congo. Il remplace le désordre des listes dispersées par un identifiant unique infalsifiable, garantissant l’accès direct aux prestations publiques sans intermédiaires.",
      quote: "Donner un nom juridique et une protection sociale concrète à chaque citoyen congolais.",
    };
  },

  // 2 « Pourquoi le CSU compte pour le peuple congolais » (8 cards exactas)
  getBenefits() {
    return [
      {
        id: 'b1',
        title: 'Transfert de revenus direct',
        shortDesc: 'Aide financière versée directement sur votre compte mobile money, sans ponction ni intermédiaire.',
        benefit: 'Allocations familiales et filets sociaux garantis.',
      },
      {
        id: 'b2',
        title: 'Couverture sanitaire & vaccination',
        shortDesc: 'Prise en charge médicale d’urgence, soins de maternité gratuits et suivi vaccinal pédiatrique.',
        benefit: 'Accès prioritaire aux centres de santé étatiques.',
      },
      {
        id: 'b3',
        title: 'École sans frais indus',
        shortDesc: 'Validation automatique de la gratuité scolaire de l’enseignement primaire pour vos enfants.',
        benefit: 'Zéro frais dissimulés ou exclusion d’élèves.',
      },
      {
        id: 'b4',
        title: 'Sécurité de la parcelle & du terrain',
        shortDesc: 'Liaison officielle entre l’identité du chef de ménage et son adresse de résidence déclarée.',
        benefit: 'Protection contre les spoliations et litiges arbitraires.',
      },
      {
        id: 'b5',
        title: 'Paiement sécurisé Mobile Money',
        shortDesc: 'Compatibilité universelle M-Pesa, Airtel Money, Orange Money et Afrimoney sans compte bancaire.',
        benefit: 'Notifications SMS instantanées à chaque versement.',
      },
      {
        id: 'b6',
        title: 'Réponse aux désastres & déplacés',
        shortDesc: 'Assistance humanitaire prioritaire et kits de survie déclenchés sous 48h en cas de conflit ou sinistre.',
        benefit: 'Rattachement immédiat dans les camps et zones d’accueil.',
      },
      {
        id: 'b7',
        title: 'Inclusion des minorités & vulnérables',
        shortDesc: 'Dispositifs spécifiques pour les peuples autochtones pygmées, personnes avec albinisme ou handicap.',
        benefit: 'Égalité républicaine et non-discrimination absolue.',
      },
      {
        id: 'b8',
        title: 'Fin des bénéficiaires fantômes',
        shortDesc: 'Vérification biométrique infalsifiable éliminant la corruption et les détournements de fonds d’État.',
        benefit: 'Chaque franc congolais alloué parvient au foyer ciblé.',
      },
    ];
  },

  // 3 « Qui peut s'inscrire ? » (todos + prioridades)
  getWhoCanRegister() {
    return {
      universalNote:
        "Tous les Congolais sans exception ont droit à l'inscription au CSU, quels que soient leur âge, leur région ou leur niveau de revenu.",
      priorityGroups: [
        {
          group: "Enfants sans enregistrement d'état civil",
          detail: "Rattachement d'office et régularisation administrative sans pénalité financière.",
        },
        {
          group: 'Personnes déplacées internes & réfugiés',
          detail: 'Enrôlement express avec localisation GPS mobile et secours alimentaire.',
        },
        {
          group: 'Peuples autochtones & communautés isolées',
          detail: 'Unités mobiles fluviales et terrestres avec médiateurs linguistiques locaux.',
        },
        {
          group: 'Personnes en situation de handicap ou albinisme',
          detail: 'Guichet prioritaire sans attente et assistance ergonomique personnalisée.',
        },
        {
          group: 'Femmes chefs de ménage & mères isolées',
          detail: 'Ciblage automatique pour les micro-crédits et cantines scolaires des enfants.',
        },
      ],
    };
  },

  // 4 « Comment s'inscrire — 5 étapes » (timeline dourada)
  getSteps() {
    return [
      {
        step: 1,
        title: 'Station ou Unité Mobile',
        desc: 'Présentez-vous dans la Station Citoyenneté de votre commune ou auprès du kit mobile de votre quartier. L’accueil est entièrement gratuit.',
      },
      {
        step: 2,
        title: 'Document OU Déclaration',
        desc: 'Présentez une pièce d’identité disponible. Si vous n’en avez aucune, activez le Plan B : deux voisins ou le chef d’avenue attestent de votre identité.',
      },
      {
        step: 3,
        title: 'Données, Photo & GPS',
        desc: 'L’agent enregistre les membres de votre ménage, capture la photo numérique et géolocalise votre foyer pour les interventions d’urgence.',
      },
      {
        step: 4,
        title: 'Récépissé QR & Numéro CSU',
        desc: 'Vous recevez immédiatement votre récépissé sécurisé portant votre Numéro National CSU personnel et votre QR Code cryptographique scellé.',
      },
      {
        step: 5,
        title: 'Activation du Compte Gov',
        desc: 'Un SMS de confirmation valide votre entrée dans le Registre National. Vous pouvez consulter vos droits et vos aides sur mobile.',
      },
    ];
  },

  // 5 « Documents acceptés (et le plan B) »
  getDocs() {
    return {
      officialDocs: [
        { name: 'Carte Nationale d’Identité (CIN / NIN)', status: 'Recommandé' },
        { name: 'Carte d’Électeur CENI (ancienne ou récente)', status: 'Accepté' },
        { name: 'Acte ou Extrait d’Acte de Naissance officiel', status: 'Accepté' },
        { name: 'Jugement Supplétif d’état civil du Tribunal', status: 'Accepté' },
        { name: 'Passeport biométrique congolais en cours ou échu', status: 'Accepté' },
      ],
      planB: {
        title: 'Pas de document officiel ? Aucun Congolais ne sera exclu.',
        mechanism: 'Procédure dérogatoire du « Plan B » (Déclaration Communautaire)',
        requirements: [
          'Déclaration sous serment devant l’Agent d’État CSU.',
          'Présence de deux témoins reconnus (voisins ou membres de la communauté).',
          'Attestation verbale ou écrite du Chef d’avenue / Chef de village.',
        ],
        guarantee: 'Cette procédure donne plein accès au numéro CSU et aux aides sociales étatiques.',
      },
    };
  },

  // 7 « Programmes sociaux connectés »
  getPrograms(): SocialProgram[] {
    return [
      {
        id: 'p1',
        title: 'Filets Sociaux & Transferts Monétaires Directs',
        category: 'Protection Économique',
        description: 'Versement trimestriel de subsistance aux ménages les plus vulnérables des 26 provinces via Mobile Money.',
        beneficiariesCount: '2 850 000 ménages',
        partnerMinistry: 'Ministère des Affaires Sociales & Actions Humanitaires',
        status: 'Actif',
      },
      {
        id: 'p2',
        title: 'Couverture Santé Universelle (Maternité & Urgences)',
        category: 'Santé Publique',
        description: 'Gratuité totale des accouchements, des césariennes et des premiers soins d’urgence pour les mères et nouveau-nés.',
        beneficiariesCount: '1 420 000 patientes',
        partnerMinistry: 'Ministère de la Santé Publique, Hygiène & Prévention',
        status: 'Prioritaire',
      },
      {
        id: 'p3',
        title: 'Gratuité de l’Enseignement Primaire & Cantines',
        category: 'Éducation Nationale',
        description: 'Suppression des frais de scolarité et approvisionnement quotidien en repas nutritifs dans les écoles publiques ciblées.',
        beneficiariesCount: '6 100 000 écoliers',
        partnerMinistry: 'Ministère de l’EPST',
        status: 'Actif',
      },
      {
        id: 'p4',
        title: 'Appui Alimentaire & Kits Nutritionnels',
        category: 'Sécurité Alimentaire',
        description: 'Distribution ciblée de farine fortifiée, d’huile et de compléments alimentaires pour lutter contre la malnutrition infantile.',
        beneficiariesCount: '920 000 enfants',
        partnerMinistry: 'Programme National de Nutrition (PRONANUT)',
        status: 'En déploiement',
      },
      {
        id: 'p5',
        title: 'Subventions & Intrants Agricoles Familiaux',
        category: 'Développement Rural',
        description: 'Attribution de semences améliorées, d’outillage et de micro-crédits agricoles aux petits exploitants enregistrés.',
        beneficiariesCount: '780 000 paysans',
        partnerMinistry: 'Ministère de l’Agriculture & Sécurité Alimentaire',
        status: 'Actif',
      },
      {
        id: 'p6',
        title: 'Assistance d’Urgence aux Déplacés de Conflit',
        category: 'Humanitaire',
        description: 'Ravitaillement d’urgence, tentes, kits d’assainissement et cash d’urgence dans les provinces de l’Est et zones d’accueil.',
        beneficiariesCount: '1 890 000 personnes',
        partnerMinistry: 'Ministère des Affaires Humanitaires',
        status: 'Prioritaire',
      },
      {
        id: 'p7',
        title: 'Appui à l’Autonomisation des Femmes Artisanes',
        category: 'Inclusion & Genre',
        description: 'Formations professionnelles gratuites, fonds de roulement et formalisation d’activité pour femmes artisanes et commerçantes.',
        beneficiariesCount: '410 000 femmes',
        partnerMinistry: 'Ministère du Genre, Famille & Enfant',
        status: 'En déploiement',
      },
    ];
  },

  // 8 « Compte Gov RD Congo » (Niveaux d'accréditation)
  getGovAccountLevels() {
    return [
      {
        level: 'Niveau 1',
        name: 'Basique',
        badge: 'Déclaratif',
        requirements: 'Numéro de téléphone vérifié par SMS OTP.',
        perks: 'Consultation du statut d’enregistrement et des dates de passage des unités mobiles.',
      },
      {
        level: 'Niveau 2',
        name: 'Vérifié',
        badge: 'Identité Civile',
        requirements: 'Pièce d’identité officielle ou validation Plan B par témoins.',
        perks: 'Attestation numérique CSU téléchargeable et éligibilité aux cantines scolaires.',
      },
      {
        level: 'Niveau 3',
        name: 'Biométrique',
        badge: 'Haute Sécurité',
        requirements: 'Photo numérique haute définition + empreintes digitales scellées en station.',
        perks: 'Déblocage des paiements Mobile Money directs et de la Couverture Santé Gratuite.',
      },
      {
        level: 'Niveau 4',
        name: 'Certifié',
        badge: 'Sceau d’État',
        requirements: 'Croisement avec le Fichier National d’Identité et géoréférencement foncier.',
        perks: 'Protection intégrale, accès à tous les programmes sociaux et droits patrimoniaux.',
      },
    ];
  },

  // 9 « Confidentialité & protection des données »
  getPrivacyData() {
    return {
      law: 'Loi n° 09/001 du 10/01/2009',
      lawTitle: 'Loi portant protection de la vie privée et des données de télécommunication en RD Congo',
      commitments: [
        {
          title: 'Souveraineté des serveurs',
          desc: 'Toutes les données des citoyens sont hébergées physiquement sur le territoire de la RDC, sous juridiction congolaise exclusive.',
        },
        {
          title: 'Contrôle strict des consentements',
          desc: 'Aucun ministère ni partenaire tiers ne peut accéder à vos données personnelles sans votre autorisation expresse tracée.',
        },
        {
          title: 'Droit d’accès, de rectification et d’opposition',
          desc: 'Chaque citoyen peut exiger la correction gratuite de ses données auprès de n’importe quel guichet CSU communal.',
        },
        {
          title: 'Cryptage militaire de bout en bout',
          desc: 'Les empreintes et données sensibles sont scellées par des algorithmes cryptographiques AES-256 et HSM gouvernementaux.',
        },
      ],
      auditQuote:
        'L’Autorité Nationale de Régulation et les auditeurs d’État surveillent en continu la stricte conformité des traitements de données.',
    };
  },

  // 11 « Questions fréquentes » (FAQ)
  getFaqs(): FaqItem[] {
    return [
      {
        id: 'faq-1',
        category: 'Inscription',
        question: "L'inscription au CSU est-elle payante ?",
        answer:
          "Non. L'inscription au CSU est strictement et totalement gratuite pour chaque citoyen congolais. Tout agent ou intermédiaire exigeant de l'argent commet une infraction grave punie par la loi. Signalez tout abus au numéro vert 108.",
      },
      {
        id: 'faq-2',
        category: 'Documents',
        question: "Je n'ai ni carte d'électeur ni acte de naissance, puis-je quand même m'inscrire ?",
        answer:
          "Absolument oui. Grâce à la procédure du « Plan B » (Déclaration Communautaire), deux témoins majeurs de votre quartier ou l'attestation de votre chef d'avenue suffisent pour valider votre enregistrement au CSU.",
      },
      {
        id: 'faq-3',
        category: 'Paiements',
        question: 'Comment vais-je recevoir les transferts monétaires si je n’ai pas de compte en banque ?',
        answer:
          "Les paiements du CSU sont transférés directement sur votre numéro de téléphone via les réseaux Mobile Money disponibles (M-Pesa, Airtel Money, Orange Money, Afrimoney). Vous recevez un SMS et pouvez retirer vos fonds chez n’importe quel agent agréé.",
      },
      {
        id: 'faq-4',
        category: 'Protection',
        question: 'Mes données peuvent-elles être utilisées à des fins fiscales ou pénales ?',
        answer:
          'Non. Conformément à la Loi n° 09/001 du 10/01/2009, le Registre Social Unifié a pour finalité exclusive la protection sociale, la santé publique et le développement humain. Vos données ne peuvent être détournées de leur vocation sociale.',
      },
      {
        id: 'faq-5',
        category: 'Santé',
        question: 'Comment le CSU me permet-il d’accéder à la gratuité de la maternité ?',
        answer:
          'Il vous suffit de présenter votre récépissé CSU ou votre QR Code lors de votre admission dans un centre de santé public conventionné. La vérification est instantanée et les soins de maternité sont intégralement pris en charge.',
      },
      {
        id: 'faq-6',
        category: 'Mobilité',
        question: 'Je vis dans un village isolé sans couverture internet, comment me faire enrôler ?',
        answer:
          'Des unités mobiles équipées de valises biométriques solaires parcourent tous les territoires ruraux. Les données sont enregistrées hors-ligne et synchronisées de manière sécurisée dès le retour en zone connectée.',
      },
    ];
  },

  // 12 « Actualités & campagnes » (3 cards)
  getNews(): NewsItem[] {
    return [
      {
        id: 'news-1',
        title: 'Déploiement de 120 nouvelles unités mobiles solaires dans le Grand Kasaï et l’Équateur',
        summary:
          'Le Ministère des Affaires Sociales renforce la couverture des zones fluviales et forestières pour garantir l’accès de tous les ménages isolés.',
        date: '18 Mars 2026',
        readTime: '3 min de lecture',
        category: 'Déploiement Territorial',
        source: 'Secrétariat Général CSU',
      },
      {
        id: 'news-2',
        title: 'Extension de la gratuité des soins de santé maternelle à 8 nouvelles provinces',
        summary:
          'Grâce au croisement avec le Registre CSU, plus de 450 000 futures mères bénéficient désormais d’un parcours de soins complet sans avance de frais.',
        date: '12 Mars 2026',
        readTime: '4 min de lecture',
        category: 'Santé & Solidarité',
        source: 'Ministère de la Santé Publique',
      },
      {
        id: 'news-3',
        title: 'Lancement de la campagne nationale d’identification des enfants non enregistrés à l’état civil',
        summary:
          'En partenariat avec les municipalités et chefs coutumiers, l’opération permet d’obtenir un jugement supplétif gratuit et un numéro CSU immédiat.',
        date: '04 Mars 2026',
        readTime: '5 min de lecture',
        category: 'Droits de l’Enfant',
        source: 'Direction de l’État Civil',
      },
    ];
  },
};
