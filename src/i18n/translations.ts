import { SupportedLang } from '../types';

export const LANGUAGES = [
  { code: 'FR', label: 'Français', native: 'Français' },
  { code: 'LN', label: 'Lingála', native: 'Lingála' },
  { code: 'SW', label: 'Kiswahili', native: 'Kiswahili' },
  { code: 'KG', label: 'Kikongo', native: 'Kikongo' },
  { code: 'TSH', label: 'Tshiluba', native: 'Tshiluba' },
] as const;

export const translations: Record<SupportedLang, {
  topBarOfficial: string;
  accessibility: string;
  nav: {
    home: string;
    whatIs: string;
    benefits: string;
    stations: string;
    govAccount: string;
    help: string;
    enter: string;
  };
  hero: {
    slide1: {
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    slide2: {
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    slide3: {
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };
  common: {
    loading: string;
    retry: string;
    back: string;
    officialService: string;
    dataSovereignty: string;
    lawCitation: string;
  };
}> = {
  FR: {
    topBarOfficial: "Gouvernement de la RDC — Service officiel",
    accessibility: "Accessibilité & Contrastes",
    nav: {
      home: "Accueil",
      whatIs: "Le CSU",
      benefits: "Avantages",
      stations: "Stations Citoyenneté",
      govAccount: "Compte Gov",
      help: "Aide",
      enter: "Entrer",
    },
    hero: {
      slide1: {
        title: "Le recensement qui donne un nom et des droits à chaque Congolais",
        subtitle: "Avec le CSU, vous existez pour l'État : avantages sociaux, santé, école et protection arrivent à ceux qui en ont vraiment besoin — même sans document préalable.",
        ctaPrimary: "Je m'inscris",
        ctaSecondary: "Voir comment ça marche",
      },
      slide2: {
        title: "Près de vous : Stations Citoyenneté et unités mobiles dans les 26 provinces",
        subtitle: "Accueil de proximité, gratuit et humain. Pas d'internet ? Aucun problème : recensement hors-ligne avec géolocalisation et synchronisation sécurisée.",
        ctaPrimary: "Trouver la station la plus proche",
        ctaSecondary: "Voir les itinéraires des unités mobiles",
      },
      slide3: {
        title: "Votre Compte Gov : vos données et vos avantages dans votre poche",
        subtitle: "Consultez votre numéro CSU, suivez vos paiements mobile money et autorisez l'usage de vos données en toute transparence.",
        ctaPrimary: "Entrer dans mon Compte Gov",
        ctaSecondary: "Activer mon inscription",
      },
    },
    common: {
      loading: "Chargement en cours...",
      retry: "Réessayer",
      back: "Retour",
      officialService: "République Démocratique du Congo · Registre Social Unifié",
      dataSovereignty: "Données hébergées en RDC — souveraineté numérique",
      lawCitation: "Conformément à la Loi n° 09/001 du 10/01/2009 portant protection des données et de l'identité citoyenne.",
    }
  },
  LN: {
    topBarOfficial: "Leta ya RDC — Mosala ya Leta ya Solo",
    accessibility: "Bokengi mpe Bomoni",
    nav: {
      home: "Ebandeli",
      whatIs: "CSU nini",
      benefits: "Matomba",
      stations: "Bisika ya kokomisa",
      govAccount: "Konte Gov",
      help: "Lisungi",
      enter: "Kɔtá",
    },
    hero: {
      slide1: {
        title: "Kokomisa bato oyo epesi kombo mpe makoki na mwana mboka nyonso ya Kongo",
        subtitle: "Na CSU, ozali moto na miso ya Leta : lisungi ya bomoi, bokolongonu, kelasi mpe libateli ekozwa baoyo basengeli mpenza — ata kozanga mikanda liboso.",
        ctaPrimary: "Nakomisa kombo",
        ctaSecondary: "Tala ndenge esalaka",
      },
      slide2: {
        title: "Pene na yo : Ba stations mpe bituluku ya kotambola na bituka nyonso 26",
        subtitle: "Boyambi ya ofele, ya kimia mpe ya bato. Internet ezali te ? Likambo te : kokomisa kozanga internet na bokengi mobimba.",
        ctaPrimary: "Luka esika ezali pene",
        ctaSecondary: "Tala banzela ya bituluku",
      },
      slide3: {
        title: "Konte Gov na yo : bansango mpe matomba na yo na loboko",
        subtitle: "Tala nimero na yo ya CSU, landa mbongo na mobile money mpe pesa ndingisa ya bansango na yo na bosolo nyonso.",
        ctaPrimary: "Kɔtá na Konte Gov",
        ctaSecondary: "Fungola kokoma na ngai",
      },
    },
    common: {
      loading: "Ezali kokota...",
      retry: "Meka lisusu",
      back: "Zonga sima",
      officialService: "Republíki ya Kongó Demokratíki · CSU",
      dataSovereignty: "Bansango ebombami na RDC — bokonzi ya numériki",
      lawCitation: "Kolanda Mibeko n° 09/001 ya mokolo 10/01/2009 mpo na libateli ya moto mpe bansango.",
    }
  },
  SW: {
    topBarOfficial: "Serikali ya RDC — Huduma Rasmi",
    accessibility: "Upatikanaji na Tofauti",
    nav: {
      home: "Mwanzo",
      whatIs: "CSU ni nini",
      benefits: "Manufaa",
      stations: "Vituo vya Uraia",
      govAccount: "Akaunti Gov",
      help: "Msaada",
      enter: "Ingia",
    },
    hero: {
      slide1: {
        title: "Sensa inayotoa jina na haki kwa kila Mkongo",
        subtitle: "Kupitia CSU, unatambulika na Serikali : misaada ya kijamii, afya, shule na ulinzi vinawafikia wanaohitaji kweli — hata bila nyaraka za awali.",
        ctaPrimary: "Najisajili sasa",
        ctaSecondary: "Ona jinsi inavyofanya kazi",
      },
      slide2: {
        title: "Karibu nawe : Vituo vya Uraia na timu zinazotembea katika majimbo yote 26",
        subtitle: "Mapokezi ya bure na ya heshima. Hakuna mtandao ? Hakuna wasiwasi : usajili unafanyika hata bila intaneti kwa usalama kamili.",
        ctaPrimary: "Tafuta kituo cha karibu",
        ctaSecondary: "Tazama njia za timu",
      },
      slide3: {
        title: "Akaunti yako ya Gov : taarifa na faida zako mfukoni",
        subtitle: "Angalia nambari yako ya CSU, fuatilia malipo ya fedha kwa njia ya simu na ruhusu matumizi ya data zako kwa uwazi.",
        ctaPrimary: "Ingia katika Akaunti Gov",
        ctaSecondary: "Amilisha usajili wangu",
      },
    },
    common: {
      loading: "Inapakia...",
      retry: "Jaribu tena",
      back: "Rudi nyuma",
      officialService: "Jamhuri ya Kidemokrasia ya Kongo · Sajili ya Kijamii",
      dataSovereignty: "Takwimu zinahifadhiwa RDC — mamlaka ya kidijitali",
      lawCitation: "Kwa mujibu wa Sheria n° 09/001 ya tarehe 10/01/2009 kuhusu ulinzi wa data za kibinafsi.",
    }
  },
  KG: {
    topBarOfficial: "Luyalu ya RDC — Kisalu ya Kieleka",
    accessibility: "Kutanga mpe Mbote",
    nav: {
      home: "Luyantiku",
      whatIs: "CSU nki",
      benefits: "Mambote",
      stations: "Bisika ya Kusonika",
      govAccount: "Konte Gov",
      help: "Lusadisu",
      enter: "Kota",
    },
    hero: {
      slide1: {
        title: "Kusonikama yina kepesaka zina mpe banswa na konso mwana Kongo",
        subtitle: "Na CSU, nge kele na meso ya Luyalu : lusadisu, mavimpi, nzo-nkanda mpe lutaninu kekwisa na bantu yina kele na nzala ya kieleka.",
        ctaPrimary: "Munu kesonika",
        ctaSecondary: "Tala mutindu kesalaka",
      },
      slide2: {
        title: "Pene-pene na nge : Bisika ya Luyalu na bituka nyonso 26",
        subtitle: "Kuyamba ya ofele mpe ya luzitu. Internet kele ve ? Mbote : kusonika ata internet kele ve na lutaninu nyonso.",
        ctaPrimary: "Sosa kisika ya pene",
        ctaSecondary: "Tala banzila ya bisalu",
      },
      slide3: {
        title: "Konte Gov na nge : bansangu mpe mambote na posho na nge",
        subtitle: "Tala nimero na nge ya CSU, landa mbongo na telefone mpe pesa nswa ya bansangu na nge na kieleka.",
        ctaPrimary: "Kota na Konte Gov",
        ctaSecondary: "Sadisa kusonika na munu",
      },
    },
    common: {
      loading: "Ketambula...",
      retry: "Meka diaka",
      back: "Vutuka sima",
      officialService: "Repubilika ya Kôngo ya Dimokalasi · CSU",
      dataSovereignty: "Bansangu kele na kati ya RDC — kiyeka ya kidijitali",
      lawCitation: "Kulandila Nsiku n° 09/001 ya 10/01/2009 ya kutanina luzingu ya bantu.",
    }
  },
  TSH: {
    topBarOfficial: "Mbulamatadi wa RDC — Mudimu wa Bushuwa",
    accessibility: "Diumvwa ne Dibala",
    nav: {
      home: "Tshibangidilu",
      whatIs: "CSU ntshinyi",
      benefits: "Masanka",
      stations: "Bianza bia Difunda",
      govAccount: "Konte Gov",
      help: "Diambuluisha",
      enter: "Buela",
    },
    hero: {
      slide1: {
        title: "Difunda didi dipesha dîna ne makokeshi kudi muena Kongo yonso",
        subtitle: "Ne CSU, udi ne mushinga kumpala kua Mbulamatadi : makuta, luhandu, kalasa ne bukubi bidi bifika kudi badi nabi dijinga dilelela.",
        ctaPrimary: "Ndi ndifundisha",
        ctaSecondary: "Mona mushindu udibi bienzeka",
      },
      slide2: {
        title: "Pabuipi nebe : Bianza bia buena-mboka mu ma provense onso 26",
        subtitle: "Diakidila dia tshianana ne luse. Kakuyi Enternete ? Tshiakunyungisha tshitupu : difunda didi dienzeka ne bukubi buonso.",
        ctaPrimary: "Keba muaba udi pabuipi",
        ctaSecondary: "Tala njila ya bianza",
      },
      slide3: {
        title: "Konte Gov webe : mikanda ne masanka ebe mu tshibutshilu",
        subtitle: "Tala nimero webe wa CSU, kulonda difutu ku telefone ne kupesha dianyisha bua bualu buebe.",
        ctaPrimary: "Buela mu Konte Gov",
        ctaSecondary: "Jula difunda dianyi",
      },
    },
    common: {
      loading: "Didi dibuela...",
      retry: "Teta kabidi",
      back: "Pingana tshianyima",
      officialService: "Ditunga dia Kongu wa Munginda · CSU",
      dataSovereignty: "Malu masokoka mu RDC — bukalenga bua tekinoloji",
      lawCitation: "Bilondeshile Mukenji n° 09/001 wa dituku 10/01/2009 bua bukubi bua bantu.",
    }
  }
};
