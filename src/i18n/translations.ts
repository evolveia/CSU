import { SupportedLang } from '../types';

export const LANGUAGES = [
  { code: 'FR', label: 'Français', native: 'Français', flag: '🇫🇷' },
  { code: 'LN', label: 'Lingála', native: 'Lingála', flag: '🇨🇩' },
  { code: 'SW', label: 'Kiswahili', native: 'Kiswahili', flag: '🇹🇿' },
  { code: 'KG', label: 'Kikongo', native: 'Kikongo', flag: '🇨🇩' },
  { code: 'TSH', label: 'Tshiluba', native: 'Tshiluba', flag: '🇨🇩' },
  { code: 'EN', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'ES', label: 'Español', native: 'Español', flag: '🇪🇸' },
  { code: 'PT', label: 'Português', native: 'Português', flag: '🇵🇹' },
  { code: 'ZH', label: '中文 (Chinois)', native: '中文', flag: '🇨🇳' },
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
    csuFullName: string;
    footerMission: string;
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
        title: "Le cadastre qui donne un nom et des droits à chaque Congolais",
        subtitle: "Avec le CSU, vous existez pour l'État : avantages sociaux, santé, école et protection arrivent à ceux qui en ont vraiment besoin — même sans document préalable.",
        ctaPrimary: "Je m'inscris",
        ctaSecondary: "Voir comment ça marche",
      },
      slide2: {
        title: "Près de vous : Stations Citoyenneté et unités mobiles dans les 26 provinces",
        subtitle: "Accueil de proximité, gratuit et humain. Pas d'internet ? Aucun problème : cadastre et enrôlement hors-ligne avec géolocalisation et synchronisation sécurisée.",
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
      officialService: "République Démocratique du Congo · Cadastre Socio-Économique Unifié",
      dataSovereignty: "Données hébergées en RDC — souveraineté numérique",
      lawCitation: "Conformément à la Loi n° 09/001 du 10/01/2009 portant protection des données et de l'identité citoyenne.",
      csuFullName: "Cadastre Socio-Économique Unifié",
      footerMission: "Le Cadastre Socio-Économique Unifié (CSU) constitue le socle numérique de l'État congolais pour la justice sociale, l'identification universelle et l'attribution directe des aides publiques aux citoyens de la RDC.",
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
        title: "Cadastre oyo epesi kombo mpe makoki na mwana mboka nyonso ya Kongo",
        subtitle: "Na CSU, ozali moto na miso ya Leta : lisungi ya bomoi, bokolongonu, kelasi mpe libateli ekozwa baoyo basengeli mpenza — ata kozanga mikanda liboso.",
        ctaPrimary: "Nakomisa kombo",
        ctaSecondary: "Tala ndenge esalaka",
      },
      slide2: {
        title: "Pene na yo : Ba stations mpe bituluku ya kotambola na bituka nyonso 26",
        subtitle: "Boyambi ya ofele, ya kimia mpe ya bato. Internet ezali te ? Likambo te : kokomisa na cadastre kozanga internet na bokengi mobimba.",
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
      officialService: "Republíki ya Kongó Demokratíki · Cadastre Socio-Économique Unifié (CSU)",
      dataSovereignty: "Bansango ebombami na RDC — bokonzi ya numériki",
      lawCitation: "Kolanda Mibeko n° 09/001 ya mokolo 10/01/2009 mpo na libateli ya moto mpe bansango.",
      csuFullName: "Cadastre Socio-Économique Unifié",
      footerMission: "Cadastre Socio-Économique Unifié (CSU) ezali moboko ya numériki ya Leta ya Kongo mpo na bosembo ya bato, koyeba moto nyonso mpe kopesa lisungi ya Leta mbala moko na bana mboka ya RDC.",
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
        title: "Daftari la cadastre linalotoa jina na haki kwa kila Mkongo",
        subtitle: "Kupitia CSU, unatambulika na Serikali : misaada ya kijamii, afya, shule na ulinzi vinawafikia wanaohitaji kweli — hata bila nyaraka za awali.",
        ctaPrimary: "Najisajili sasa",
        ctaSecondary: "Ona jinsi inavyofanya kazi",
      },
      slide2: {
        title: "Karibu nawe : Vituo vya Uraia na timu zinazotembea katika majimbo yote 26",
        subtitle: "Mapokezi ya bure na ya heshima. Hakuna mtandao ? Hakuna wasiwasi : cadastre na usajili unafanyika hata bila intaneti kwa usalama kamili.",
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
      officialService: "Jamhuri ya Kidemokrasia ya Kongo · Cadastre Socio-Économique Unifié (CSU)",
      dataSovereignty: "Takwimu zinahifadhiwa RDC — mamlaka ya kidijitali",
      lawCitation: "Kwa mujibu wa Sheria n° 09/001 ya tarehe 10/01/2009 kuhusu ulinzi wa data za kibinafsi.",
      csuFullName: "Cadastre Socio-Économique Unifié (Daftari la Kijamii)",
      footerMission: "Cadastre Socio-Économique Unifié (CSU) ni msingi wa kidijitali wa Serikali ya Kongo kwa ajili ya haki ya kijamii, utambulisho wa wote na ugawaji wa moja kwa moja wa misaada ya umma kwa raia wa RDC.",
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
        title: "Kusonikama na cadastre yina kepesaka zina mpe banswa na konso mwana Kongo",
        subtitle: "Na CSU, nge kele na meso ya Luyalu : lusadisu, mavimpi, nzo-nkanda mpe lutaninu kekwisa na bantu yina kele na nzala ya kieleka.",
        ctaPrimary: "Munu kesonika",
        ctaSecondary: "Tala mutindu kesalaka",
      },
      slide2: {
        title: "Pene-pene na nge : Bisika ya Luyalu na bituka nyonso 26",
        subtitle: "Kuyamba ya ofele mpe ya luzitu. Internet kele ve ? Mbote : kusonika na cadastre ata internet kele ve na lutaninu nyonso.",
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
      officialService: "Repubilika ya Kôngo ya Dimokalasi · Cadastre Socio-Économique Unifié (CSU)",
      dataSovereignty: "Bansangu kele na kati ya RDC — kiyeka ya kidijitali",
      lawCitation: "Kulandila Nsiku n° 09/001 ya 10/01/2009 ya kutanina luzingu ya bantu.",
      csuFullName: "Cadastre Socio-Économique Unifié",
      footerMission: "Cadastre Socio-Économique Unifié (CSU) kele fondasio ya kidijitali ya Luyalu ya Kongo mpo na lunungu ya bantu, kuzaba konso muntu mpe kupesa lusadisu ya Luyalu na bana-insi ya RDC.",
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
        title: "Difunda dia cadastre didi dipesha dîna ne makokeshi kudi muena Kongo yonso",
        subtitle: "Ne CSU, udi ne mushinga kumpala kua Mbulamatadi : makuta, luhandu, kalasa ne bukubi bidi bifika kudi badi nabi dijinga dilelela.",
        ctaPrimary: "Ndi ndifundisha",
        ctaSecondary: "Mona mushindu udibi bienzeka",
      },
      slide2: {
        title: "Pabuipi nebe : Bianza bia buena-mboka mu ma provense onso 26",
        subtitle: "Diakidila dia tshianana ne luse. Kakuyi Enternete ? Tshiakunyungisha tshitupu : difunda dia cadastre didi dienzeka ne bukubi buonso.",
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
      officialService: "Ditunga dia Kongu wa Munginda · Cadastre Socio-Économique Unifié (CSU)",
      dataSovereignty: "Malu masokoka mu RDC — bukalenga bua tekinoloji",
      lawCitation: "Bilondeshile Mukenji n° 09/001 wa dituku 10/01/2009 bua bukubi bua bantu.",
      csuFullName: "Cadastre Socio-Économique Unifié",
      footerMission: "Cadastre Socio-Économique Unifié (CSU) udi tshishimikilu tshia bukalenga bua tekinoloji bua Mbulamatadi wa Kongo bua buakane, dimanya dia muntu yonso ne difuta dia diambuluisha kudi bena Kongo.",
    }
  },
  EN: {
    topBarOfficial: "Government of the DRC — Official Public Service",
    accessibility: "Accessibility & Contrasts",
    nav: {
      home: "Home",
      whatIs: "The CSU",
      benefits: "Benefits",
      stations: "Citizenship Stations",
      govAccount: "Gov Account",
      help: "Help & FAQ",
      enter: "Sign In",
    },
    hero: {
      slide1: {
        title: "The cadastre giving an official identity and sovereign rights to every Congolese",
        subtitle: "With the CSU, you count for the State: healthcare, education, social protection and direct aid reach those truly in need — even without prior identity documents.",
        ctaPrimary: "Register now",
        ctaSecondary: "Learn how it works",
      },
      slide2: {
        title: "Close to you: Citizenship Stations and mobile units across all 26 provinces",
        subtitle: "Free, dignified, and local civic reception. No internet connection? No issue: offline biometric cadastre enrollment with GPS geolocation and cryptographic sync.",
        ctaPrimary: "Find the nearest station",
        ctaSecondary: "Check mobile team routes",
      },
      slide3: {
        title: "Your Gov Account: your data and social benefits in your pocket",
        subtitle: "Check your national CSU number, track mobile money disbursements and authorize data usage with total transparency.",
        ctaPrimary: "Access my Gov Account",
        ctaSecondary: "Activate my registration",
      },
    },
    common: {
      loading: "Loading...",
      retry: "Try again",
      back: "Go back",
      officialService: "Democratic Republic of the Congo · Unified Socio-Economic Cadastre (CSU)",
      dataSovereignty: "Data sovereignly hosted in the DRC — Digital Sovereignty",
      lawCitation: "In accordance with Law No. 09/001 of 10/01/2009 on personal data and citizen identity protection.",
      csuFullName: "Unified Socio-Economic Cadastre",
      footerMission: "The Unified Socio-Economic Cadastre (CSU) constitutes the sovereign digital foundation of the Congolese State for social justice, universal identification, and direct distribution of public assistance to citizens of the DRC.",
    }
  },
  ES: {
    topBarOfficial: "Gobierno de la RDC — Servicio Oficial",
    accessibility: "Accesibilidad y Contrastes",
    nav: {
      home: "Inicio",
      whatIs: "El CSU",
      benefits: "Beneficios",
      stations: "Estaciones de Ciudadanía",
      govAccount: "Cuenta Gov",
      help: "Ayuda y FAQ",
      enter: "Entrar",
    },
    hero: {
      slide1: {
        title: "El catastro que otorga un nombre y derechos a cada ciudadano congoleño",
        subtitle: "Con el CSU, usted existe para el Estado: salud, educación, protección social y transferencias llegan a quienes realmente lo necesitan — incluso sin documentos previos.",
        ctaPrimary: "Inscribirme ahora",
        ctaSecondary: "Ver cómo funciona",
      },
      slide2: {
        title: "Cerca de usted: Estaciones de Ciudadanía y unidades móviles en las 26 provincias",
        subtitle: "Atención de proximidad, gratuita y digna. ¿Sin internet? Ningún problema: catastro biométrico fuera de línea con geolocalización y sincronización segura.",
        ctaPrimary: "Encontrar la estación más cercana",
        ctaSecondary: "Ver rutas de brigadas móviles",
      },
      slide3: {
        title: "Su Cuenta Gov: sus datos y sus beneficios en su bolsillo",
        subtitle: "Consulte su número CSU nacional, supervise sus cobros por dinero móvil y autorice el uso de sus datos con total transparencia.",
        ctaPrimary: "Acceder a mi Cuenta Gov",
        ctaSecondary: "Activar mi registro",
      },
    },
    common: {
      loading: "Cargando...",
      retry: "Reintentar",
      back: "Volver",
      officialService: "República Democrática del Congo · Catastro Socioeconómico Unificado (CSU)",
      dataSovereignty: "Datos alojados soberanamente en la RDC — Soberanía Digital",
      lawCitation: "Conforme a la Ley n° 09/001 del 10/01/2009 sobre protección de datos e identidad ciudadana.",
      csuFullName: "Catastro Socioeconómico Unificado",
      footerMission: "El Catastro Socioeconómico Unificado (CSU) constituye la base digital del Estado congoleño para la justicia social, la identificación universal y la asignación directa de ayudas públicas a los ciudadanos de la RDC.",
    }
  },
  PT: {
    topBarOfficial: "Governo da RDC — Serviço Oficial",
    accessibility: "Acessibilidade & Contrastes",
    nav: {
      home: "Início",
      whatIs: "O CSU",
      benefits: "Benefícios",
      stations: "Estações Cidadania",
      govAccount: "Conta Gov",
      help: "Ajuda & FAQ",
      enter: "Entrar",
    },
    hero: {
      slide1: {
        title: "O cadastro que garante um nome e direitos a cada cidadão congolês",
        subtitle: "Com o CSU, você existe para o Estado: saúde, escola, proteção social e auxílios chegam a quem realmente precisa — mesmo sem documentos prévios.",
        ctaPrimary: "Quero me cadastrar",
        ctaSecondary: "Veja como funciona",
      },
      slide2: {
        title: "Perto de você: Estações Cidadania e unidades móveis nas 26 províncias",
        subtitle: "Atendimento de proximidade, gratuito e humanizado. Sem internet? Sem problemas: cadastramento offline com geolocalização e sincronização segura.",
        ctaPrimary: "Buscar estação mais próxima",
        ctaSecondary: "Ver rotas das unidades móveis",
      },
      slide3: {
        title: "Sua Conta Gov: seus dados e benefícios na palma da mão",
        subtitle: "Consulte seu número CSU nacional, acompanhe pagamentos via mobile money e autorize o uso dos seus dados com total transparência.",
        ctaPrimary: "Acessar minha Conta Gov",
        ctaSecondary: "Ativar meu cadastro",
      },
    },
    common: {
      loading: "Carregando...",
      retry: "Tentar novamente",
      back: "Voltar",
      officialService: "República Democrática do Congo · Cadastro Socioeconômico Unificado (CSU)",
      dataSovereignty: "Dados hospedados soberanamente na RDC — Soberania Digital",
      lawCitation: "Em conformidade com a Lei nº 09/001 de 10/01/2009 sobre proteção de dados e identidade cidadã.",
      csuFullName: "Cadastro Socioeconômico Unificado",
      footerMission: "O Cadastro Socioeconômico Unificado (CSU) constitui a base digital do Estado congolês para a justiça social, identificação universal e atribuição direta de benefícios públicos aos cidadãos da RDC.",
    }
  },
  ZH: {
    topBarOfficial: "刚果（金）政府 — 官方公共服务",
    accessibility: "无障碍与高对比度",
    nav: {
      home: "首页",
      whatIs: "认识CSU",
      benefits: "社会权益",
      stations: "公民登记站",
      govAccount: "政府通行证",
      help: "帮助中心",
      enter: "登录系统",
    },
    hero: {
      slide1: {
        title: "赋予每一位刚果公民合法身份与国家基本权益的社会经济地籍与登记",
        subtitle: "加入统一社会经济地籍与登记册（CSU），让国家看见您：医疗救助、免费教育与精准现金补贴直达真正需要的人群 — 即使目前暂无前置身份凭证。",
        ctaPrimary: "立即登记建档",
        ctaSecondary: "了解办理流程",
      },
      slide2: {
        title: "服务就在身边：覆盖全国26个省的公民登记大厅与巡回服务车队",
        subtitle: "家门口的暖心服务，全程免费。身处无网络偏远林区？不用担心：支持全离线高精度地籍与生物特征采集，通过加密硬件安全同步。",
        ctaPrimary: "查询就近登记网点",
        ctaSecondary: "查看流动服务队行进路线",
      },
      slide3: {
        title: "您的政府通行证：专属社会权益与补贴资金随时随地一键查阅",
        subtitle: "随时查询您的CSU终身唯一编码，实时跟踪移动钱包资金发放进度，全透明自主掌控个人数据授权。",
        ctaPrimary: "进入我的政府通行证",
        ctaSecondary: "激活我的身份登记",
      },
    },
    common: {
      loading: "正在安全加载中...",
      retry: "重新尝试",
      back: "返回上一页",
      officialService: "刚果民主共和国 · 统一社会经济地籍与登记册（CSU）",
      dataSovereignty: "数据安全存储于刚果（金）境内 — 国家数字数据主权保障",
      lawCitation: "依据刚果民主共和国2009年1月10日第09/001号《个人数据与公民身份保护法》。",
      csuFullName: "统一社会经济地籍与登记册",
      footerMission: "统一社会经济地籍与登记册（CSU）是刚果（金）国家数字主权基石，旨在实现社会公正、全民普惠身份识别以及向刚果（金）全体公民直接发放国家救助与权益。",
    }
  }
};
