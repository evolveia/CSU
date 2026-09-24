import { SupportedLang, RoleType } from '../types';

export interface ProfileTranslation {
  title: string;
  badge: string;
  description: string;
}

// 14 Specialized Administrative Profiles in all 9 supported languages
export const PROFILES_I18N: Record<string, Partial<Record<SupportedLang, ProfileTranslation>>> = {
  citoyen: {
    FR: {
      title: "Espace Citoyen (/gov)",
      badge: "Compte Gov Particulier",
      description: "Gestion de votre foyer, vérification de votre identifiant CSU national, suivi des versements et téléchargement du récépissé."
    },
    PT: {
      title: "Espaço do Cidadão (/gov)",
      badge: "Conta Gov Particular",
      description: "Gestão do domicílio, verificação do número CSU nacional, acompanhamento de pagamentos e emissão de comprovante."
    },
    EN: {
      title: "Citizen Space (/gov)",
      badge: "Individual Gov Account",
      description: "Household management, verification of national CSU ID, tracking of social transfers and downloading official receipt."
    },
    ES: {
      title: "Espacio Ciudadano (/gov)",
      badge: "Cuenta Gov Particular",
      description: "Gestión del hogar, verificación del identificador CSU nacional, seguimiento de pagos y descarga del comprobante."
    },
    ZH: {
      title: "公民服务空间 (/gov)",
      badge: "个人政府通行证",
      description: "家庭成员管理、全国CSU统一编码核验、社会救助到账跟踪与官方回执打印。"
    },
    LN: {
      title: "Esika ya Mwana Mboka (/gov)",
      badge: "Konte Gov ya Moto ye moko",
      description: "Kotala libota, bokengi ya nimero CSU, kolanda mbongo mpe kozwa mokanda ya mikanda."
    },
    SW: {
      title: "Nafasi ya Mwananchi (/gov)",
      badge: "Akaunti Gov ya Binafsi",
      description: "Usimamizi wa kaya, uhakiki wa nambari ya CSU ya kitaifa, ufuatiliaji wa malipo na kutoa stakabadhi."
    },
    KG: {
      title: "Kisika ya Muntu (/gov)",
      badge: "Konte Gov ya Muntu",
      description: "Kutala dibuta, lutaninu ya nimero CSU, kulanda mbongo mpe kubaka mukanda ya Luyalu."
    },
    TSH: {
      title: "Muaba wa Muenamboka (/gov)",
      badge: "Konte Gov wa Muntu Nkayende",
      description: "Didiakidila dia diku, kutala nimero wa CSU, kulonda difutu ne kupatula mukanda."
    }
  },
  agente_n1: {
    FR: {
      title: "Agente de Cadastro — Nível 1",
      badge: "Guichet d'Enrôlement",
      description: "Accueil du public, saisie des données civiles des ménages, prise de vue faciale et délivrance du premier récépissé imprimé."
    },
    PT: {
      title: "Agente de Cadastro — Nível 1",
      badge: "Guichê de Cadastramento",
      description: "Atendimento presencial e de campo, cadastro de domicílios, captura biométrica e fotográfica e emissão do primeiro comprovante QR."
    },
    EN: {
      title: "Registration Officer — Level 1",
      badge: "Enrollment Desk",
      description: "Front-desk & field registration, civil data intake, biometric/photo capture, offline drafting and issuance of QR receipt."
    },
    ES: {
      title: "Agente de Registro — Nivel 1",
      badge: "Ventanilla de Registro",
      description: "Atención al ciudadano y campo, captura de datos civiles, fotografía y biometría, y emisión de comprobante con código QR."
    },
    ZH: {
      title: "一级登记专员（N1）",
      badge: "公民登记服务台",
      description: "驻点服务台与巡回入户登记、民事数据录入、人脸与生物特征采集、离线建档及发放防伪QR凭据。"
    }
  },
  agente_n2: {
    FR: {
      title: "Agente de Cadastro Sênior — Nível 2",
      badge: "Résolution des Litiges & Rejets",
      description: "Traitement des dossiers signalés en anomalie, correction des homonymies, validation des cas spéciaux et resoumission des dossiers rejetés."
    },
    PT: {
      title: "Agente de Cadastro Sênior — Nível 2",
      badge: "Resolução de Casos Complexos",
      description: "Tratamento de inconsistências leves, retificação de dados pós-validação, reenvio de cadastros rejeitados e apoio a agentes N1."
    },
    EN: {
      title: "Senior Registration Officer — Level 2",
      badge: "Dispute & Anomaly Resolution",
      description: "Handling complex and rejected cases, fixing civil status discrepancies, validating special exceptions and assisting Level 1 agents."
    },
    ES: {
      title: "Agente de Registro Sénior — Nivel 2",
      badge: "Resolución de Casos Especiales",
      description: "Atención de casos complejos, rectificación de datos tras validación, reenvío de expedientes rechazados y soporte a agentes N1."
    },
    ZH: {
      title: "高级登记专员（N2）",
      badge: "疑难与争议处置",
      description: "审核驳回重报、同名与指纹异常纠偏、复核特例与特殊家庭凭证，为一级专员提供二级业务指导。"
    }
  },
  supervisor: {
    FR: {
      title: "Superviseur de Station Cidadania",
      badge: "Coordination de Station",
      description: "Gestion des guichets physiques, suivi de la productivité des agents, approbation des dossiers en attente et contrôle de synchronisation offline."
    },
    PT: {
      title: "Supervisor de Estação Cidadania",
      badge: "Gestão da Unidade Física",
      description: "Gestão dos agentes da estação, controle de metas e filas, aprovação de cadastros pendentes e monitoramento da sincronização offline."
    },
    EN: {
      title: "Citizenship Station Supervisor",
      badge: "Station Management",
      description: "Managing physical station desks, tracking agent productivity, approving pending enrollments, and overseeing offline sync queues."
    },
    ES: {
      title: "Supervisor de Estación de Ciudadanía",
      badge: "Gestión de Unidad Física",
      description: "Supervisión del equipo de la estación, seguimiento de productividad, aprobación de trámites pendientes y sincronización sin conexión."
    },
    ZH: {
      title: "公民站主管（Supervisor）",
      badge: "站点运营统筹",
      description: "实体登记大厅管理、专员绩效追踪、在途档案审批、特例核销、排队叫号调度与离线同步巡检。"
    }
  },
  coordenador_municipal: {
    FR: {
      title: "Coordenador Municipal / Distrital",
      badge: "Supervision Territoriale",
      description: "Pilotage des stations communales et brigades mobiles, analyse des quotas de couverture, détection des risques et réquisition d'audits."
    },
    PT: {
      title: "Coordenador Municipal / Distrital",
      badge: "Supervisão Distrital",
      description: "Gestão de múltiplas estações e equipes de campo, distribuição de metas, aprovação de cadastros de alto risco e combate a fraudes."
    },
    EN: {
      title: "Municipal / District Coordinator",
      badge: "District Supervision",
      description: "Overseeing multi-station networks and mobile brigades, setting municipal quotas, approving high-risk files and mitigating fraud."
    },
    ES: {
      title: "Coordinador Municipal / Distrital",
      badge: "Supervisión Distrital",
      description: "Gestión de múltiples estaciones y brigadas de campo, distribución de metas, aprobación de expedientes de riesgo y control de fraudes."
    },
    ZH: {
      title: "市镇/区级协调员",
      badge: "市辖区巡查与风控",
      description: "统筹全市/全区公民站与流动车队、分配登记指标、审批高风险档案、监测异常重复申领并提请专项审计。"
    }
  },
  coordenador_provincial: {
    FR: {
      title: "Coordenador Provincial / Estadual",
      badge: "Direction Régionale (26 Provinces)",
      description: "Consolidation des indicateurs macro-provinciaux, arbitrage des déploiements 4x4 et fluviaux, et politique d'inclusion régionale."
    },
    PT: {
      title: "Coordenador Provincial / Estadual",
      badge: "Diretoria Regional (26 Províncias)",
      description: "Monitoramento de indicadores regionais, homologação de políticas de enquadramento, cobertura territorial e integração intergovernamental."
    },
    EN: {
      title: "Provincial Coordinator",
      badge: "Regional Directorate (26 Provinces)",
      description: "Consolidating macro-provincial indicators, approving registration policies, optimizing 4x4/fluvial coverage, and regional integrations."
    },
    ES: {
      title: "Coordinador Provincial",
      badge: "Dirección Regional (26 Provincias)",
      description: "Seguimiento de indicadores regionales, aprobación de políticas de empadronamiento, cobertura territorial y enlace interinstitucional."
    },
    ZH: {
      title: "省管协调员（26省大区长）",
      badge: "大区统筹与战略监督",
      description: "汇聚全省宏观民生数据、调配偏远林区与水路流动资源、核准省域政策口径并对接省属公共政务系统。"
    }
  },
  gestor_nacional: {
    FR: {
      title: "Gestor Nacional da Plataforma",
      badge: "Haute Autorité CSU RDC",
      description: "Définition des règles souveraines nationales, homologation des modèles de données, intégrations interministérielles et quotas budgétaires."
    },
    PT: {
      title: "Gestor Nacional da Plataforma",
      badge: "Alta Autoridade CSU RDC",
      description: "Definição de regras nacionais de negócio, gestão dos programas sociais, parametrização global e autorização de integrações críticas."
    },
    EN: {
      title: "National Platform Manager",
      badge: "High Authority CSU DRC",
      description: "Setting national business rules, governing social assistance programs, parameterizing global schemas and authorizing core API links."
    },
    ES: {
      title: "Gestor Nacional de la Plataforma",
      badge: "Alta Autoridad CSU RDC",
      description: "Definición de reglas soberanas, gestión de programas sociales, parametrización global y autorización de enlaces estratégicos."
    },
    ZH: {
      title: "国家级平台主管",
      badge: "全国最高监管权限",
      description: "制定全国统一民事与救助规则、维护全量社会保障项目、审批全国核心数据模型、调度百亿级财政补贴配额。"
    }
  },
  administrador_sistema: {
    FR: {
      title: "Administrador de Sistema (DevOps)",
      badge: "Infrastructure & Sécurité HSM",
      description: "Surveillance de la disponibilité des clusters, application des correctifs, gestion des clés cryptographiques et monitoring de charge."
    },
    PT: {
      title: "Administrador de Sistema (DevOps)",
      badge: "Infraestrutura & Módulo HSM",
      description: "Gestão de usuários técnicos, ambientes de alta disponibilidade, backups, patches de segurança e telemetria de servidores."
    },
    EN: {
      title: "System Administrator (DevOps)",
      badge: "Infrastructure & HSM Security",
      description: "Cluster availability monitoring, patch deployment, cryptographic key vault management and real-time telemetry."
    },
    ES: {
      title: "Administrador del Sistema (DevOps)",
      badge: "Infraestructura y Seguridad HSM",
      description: "Supervisión de servidores, gestión de usuarios técnicos, copias de seguridad, parches y telemetría de alta disponibilidad."
    },
    ZH: {
      title: "系统运维管理员（DevOps）",
      badge: "国密硬件HSM与基础设施",
      description: "双活集群高可用监控、安全补丁编排、加密密钥全生命周期审计、容器化微服务性能监控与灾备演练。"
    }
  },
  oficial_protecao_dados: {
    FR: {
      title: "Oficial de Proteção de Dados / Privacidade",
      badge: "Autorité de Conformité RGPD / Loi 09",
      description: "Vérification des accès aux données nominatives, gestion du droit à l'effacement/rectification, et suspension des traitements non conformes."
    },
    PT: {
      title: "Oficial de Proteção de Dados / Privacidade (DPO)",
      badge: "Conformidade & Lei 09/001",
      description: "Monitoramento de conformidade legal, auditoria de consentimento, atendimento a pedidos de titulares e suspensão de operações irregulares."
    },
    EN: {
      title: "Data Protection Officer (DPO)",
      badge: "Compliance & Privacy Authority",
      description: "Auditing access to nominative citizen records, enforcing data subject rights, reviewing DPIAs, and halting unlawful data flows."
    },
    ES: {
      title: "Oficial de Protección de Datos (DPO)",
      badge: "Autoridad de Privacidad / Ley 09",
      description: "Supervisión de conformidad legal, tramitación de solicitudes de titulares, auditoría de consentimiento y suspensión de desvíos."
    },
    ZH: {
      title: "数据保护与隐私合规官（DPO）",
      badge: "国家隐私合规与权利保护",
      description: "公民个人敏感信息访问全链路审计、处理公民知情权与更正申请、评估隐私影响（DPIA）及叫停违规操作。"
    }
  },
  auditor: {
    FR: {
      title: "Auditor Independente de Estado",
      badge: "Cour des Comptes & Inspection",
      description: "Consultation en lecture seule des pistes d'audit inviolables, analyse des flux financiers et vérification de non-altération des registres."
    },
    PT: {
      title: "Auditor Independente de Estado",
      badge: "Fiscalização & Compliance (Read-Only)",
      description: "Consulta estrita somente-leitura a trilhas de auditoria, histórico de acessos, logs de consentimento e relatórios de compliance."
    },
    EN: {
      title: "State Independent Auditor",
      badge: "Inspection & Fiscal Audit (Read-Only)",
      description: "Strict read-only forensic scrutiny of immutable audit trails, tracking budget allocations, fraud patterns and compliance reports."
    },
    ES: {
      title: "Auditor Independiente del Estado",
      badge: "Fiscalización y Cumplimiento (Solo Lectura)",
      description: "Acceso de solo lectura a pistas de auditoría inalterables, trazabilidad de modificaciones y emisión de dictámenes de control."
    },
    ZH: {
      title: "国家独立审计员（只读）",
      badge: "最高审计监察与司法取证",
      description: "纯只读穿透式调取防篡改审计底稿、追溯补贴款链条、核验全周期操作数字签名与法纪合规核准。"
    }
  },
  gestor_programas_sociais: {
    FR: {
      title: "Gestor de Programas Sociais",
      badge: "Direction des Filets Sociaux",
      description: "Création de programmes ciblés (bourse santé, gratuité scolaire, soutien agricole), calcul des seuils de vulnérabilité et ciblage."
    },
    PT: {
      title: "Gestor de Programas Sociais",
      badge: "Políticas Sociais & Benefícios",
      description: "Criação de programas sociais, definição de regras de elegibilidade, consulta a beneficiários e avaliação de impacto social."
    },
    EN: {
      title: "Social Programs Manager",
      badge: "Social Safety Nets Authority",
      description: "Creating targeted cash transfer programs, configuring vulnerability thresholds, querying eligible rosters and measuring social impact."
    },
    ES: {
      title: "Gestor de Programas Sociales",
      badge: "Políticas Sociales y Focalización",
      description: "Creación de programas de asistencia, definición de criterios de elegibilidad, consulta de padrones y medición de impacto."
    },
    ZH: {
      title: "社会保障与救助项目主管",
      badge: "国家兜底民生政策",
      description: "设立救助专项计划、设定多维贫困脆弱度准入阈值、穿透式检索拟享受名单并开展减贫成效评估。"
    }
  },
  operador_beneficios: {
    FR: {
      title: "Operador de Benefícios & Pagamentos",
      badge: "Guichet d'Octroi des Aides",
      description: "Analyse individuelle des demandes de subvention, vérification des critères d'éligibilité, imputation budgétaire et ordre de virement."
    },
    PT: {
      title: "Operador de Benefícios & Pagamentos",
      badge: "Concessão & Análise de Auxílios",
      description: "Análise de solicitações individuais, concessão ou negação de benefícios, registro de justificativas e consulta ao histórico cidadão."
    },
    EN: {
      title: "Benefits & Disbursements Operator",
      badge: "Aid Granting & Approval Desk",
      description: "Analyzing individual benefit claims, approving/denying social disbursements, logging statutory justifications and cross-checking payout history."
    },
    ES: {
      title: "Operador de Beneficios y Pagos",
      badge: "Ventanilla de Concesión de Ayudas",
      description: "Evaluación individual de solicitudes, concesión o denegación de subsidios, registro de justificaciones y revisión de antecedentes."
    },
    ZH: {
      title: "福利救助审核发放员",
      badge: "补贴审批与资金下达",
      description: "逐笔核查救助申领表件、依据政策做准予或驳回决定、登记经办理由并联动移动支付系统执行资金清算。"
    }
  },
  integrador_dev: {
    FR: {
      title: "Integrador / Desenvolvedor API",
      badge: "Portail Développeurs & Webhooks",
      description: "Gestion des tokens OAuth2 mTLS, documentation OpenAPI 3.0, bac à sable (Sandbox) et supervision des passerelles télécoms."
    },
    PT: {
      title: "Integrador / Desenvolvedor API",
      badge: "Portal do Desenvolvedor & Webhooks",
      description: "Acesso técnico a APIs REST/GraphQL, documentação OpenAPI, chaves de teste (sandbox) e monitoramento de conectores governamentais."
    },
    EN: {
      title: "API Integrator & Developer",
      badge: "Developer Portal & Webhooks",
      description: "Managing mTLS API credentials, querying OpenAPI 3.0 specs, running sandbox test flows and inspecting telecom gateway throughput."
    },
    ES: {
      title: "Integrador / Desarrollador API",
      badge: "Portal de Desarrolladores y APIs",
      description: "Administración de credenciales de API, especificaciones OpenAPI, pruebas en entorno sandbox y supervisión de pasarelas móviles."
    },
    ZH: {
      title: "API集成与开放平台开发者",
      badge: "开发者沙箱与开放规范",
      description: "管理双向TLS与OAuth2凭证、OpenAPI 3.0规范查阅、沙箱测试数据回放及国家级政务数据中台对接。"
    }
  },
  suporte_tecnico: {
    FR: {
      title: "Suporte Técnico (Helpdesk)",
      badge: "Centre de Support Opérationnel",
      description: "Assistance aux opérateurs de terrain, réinitialisation des jetons FIDO2/MFA, diagnostic des synchronisations et suivi des incidents."
    },
    PT: {
      title: "Suporte Técnico (Helpdesk)",
      badge: "Atendimento & Suporte aos Agentes",
      description: "Atendimento a chamados técnicos de campo, diagnóstico de falhas, reset de credenciais/MFA e suporte à sincronização de kits móveis."
    },
    EN: {
      title: "Technical Support (Helpdesk)",
      badge: "Field Operations Support Desk",
      description: "Resolving agent tickets, troubleshooting biometric sync bottlenecks, resetting MFA/FIDO tokens and dispatching hardware diagnostics."
    },
    ES: {
      title: "Soporte Técnico (Helpdesk)",
      badge: "Mesa de Ayuda Operativa",
      description: "Atención de incidencias de campo, diagnóstico de fallas, restablecimiento de credenciales MFA y asistencia a kits móviles."
    },
    ZH: {
      title: "技术支持与客服中心（Helpdesk）",
      badge: "一线运维协同与工单保障",
      description: "受理各省驻点与移动车队报障工单、解决生物识别采集仪与打印机驱动异常、重置MFA硬件口令与排查离线堆积。"
    }
  }
};

// Common UI actions & module translations
export const MODULES_I18N: Record<string, Partial<Record<SupportedLang, string>>> = {
  dashboard: {
    FR: "Vue d'Ensemble",
    PT: "Visão Geral",
    EN: "Overview",
    ES: "Vista General",
    ZH: "概览看板",
    LN: "Botalisi Nyoso",
    SW: "Mwangaza wa Jumla",
    KG: "Kutala Yonso",
    TSH: "Ditangila Dionso"
  },
  cadastros: {
    FR: "Dossiers & Enrôlement",
    PT: "Cadastros & Inscrições",
    EN: "Records & Enrollment",
    ES: "Expedientes y Registros",
    ZH: "档案与登记",
    LN: "Buku ya Bato",
    SW: "Faili na Usajili",
    KG: "Mikanda ya Bato",
    TSH: "Mikanda ya Difunda"
  },
  atendimento: {
    FR: "Guichet & Files",
    PT: "Atendimento & Fila",
    EN: "Attendance & Queue",
    ES: "Atención y Filas",
    ZH: "服务台与排队",
    LN: "Esika ya boyambi",
    SW: "Mapokezi na Foleni",
    KG: "Kuyamba Bantu",
    TSH: "Diakidila dia Banto"
  },
  validacao: {
    FR: "Validation & Plan B",
    PT: "Validação & Plan B",
    EN: "Validation & Plan B",
    ES: "Validación y Plan B",
    ZH: "审核与B计划",
    LN: "Bokengi mpe Plan B",
    SW: "Uhakiki na Plan B",
    KG: "Kutala mpe Plan B",
    TSH: "Dijadika ne Plan B"
  },
  equipe: {
    FR: "Équipes & Stations",
    PT: "Equipes & Estações",
    EN: "Teams & Stations",
    ES: "Equipos y Estaciones",
    ZH: "团队与工作站",
    LN: "Bituluku mpe Bisika",
    SW: "Timu na Vituo",
    KG: "Bantu ya Kisalu",
    TSH: "Bisalu ne Banza"
  },
  mapa: {
    FR: "Carte & Territoire",
    PT: "Mapas & Território",
    EN: "Maps & Territory",
    ES: "Mapas y Cobertura",
    ZH: "地图与辖区",
    LN: "Karte ya Mboka",
    SW: "Ramani na Eneo",
    KG: "Karte ya Luyalu",
    TSH: "Karte wa Ditunga"
  },
  metas_fraude: {
    FR: "Metas & Anti-Fraude",
    PT: "Metas & Anti-Fraude",
    EN: "Targets & Anti-Fraud",
    ES: "Metas y Anti-Fraude",
    ZH: "目标与反欺诈",
    LN: "Bapano mpe Bokengi",
    SW: "Malengo na Ulaghai",
    KG: "Makanisi mpe Lutaninu",
    TSH: "Mipatshila ne Bukubi"
  },
  relatorios: {
    FR: "Rapports & Export",
    PT: "Relatórios & Exportação",
    EN: "Reports & Export",
    ES: "Informes y Exportación",
    ZH: "报表与导出",
    LN: "Lapolo mpe Kobimisa",
    SW: "Ripoti na Kutoa",
    KG: "Raporo mpe Kubimisa",
    TSH: "Rapolo ne Kupatula"
  },
  mensagens: {
    FR: "Alertes & Messages",
    PT: "Notificações & Mensagens",
    EN: "Alerts & Messages",
    ES: "Alertas y Mensajes",
    ZH: "消息与通知",
    LN: "Bansango mpe Makebisi",
    SW: "Ujumbe na Tahadhari",
    KG: "Bansangu mpe Lukebiso",
    TSH: "Mikenji ne Dimanyisha"
  },
  configuracoes: {
    FR: "Paramètres Système",
    PT: "Configurações do Sistema",
    EN: "System Settings",
    ES: "Configuración del Sistema",
    ZH: "系统配置",
    LN: "Bongisi ya Masini",
    SW: "Mipangilio ya Mfumo",
    KG: "Kuyidika ya Masini",
    TSH: "Malongolodu a Mashinyi"
  }
};

// Global translation dictionary mapping common French/Portuguese phrases to all target languages
export const PHRASE_BOOK: Record<string, Partial<Record<SupportedLang, string>>> = {
  "Cadastre Socio-Économique Unifié": {
    FR: "Cadastre Socio-Économique Unifié",
    PT: "Cadastro Socioeconômico Unificado",
    EN: "Unified Socio-Economic Cadastre",
    ES: "Catastro Socioeconómico Unificado",
    ZH: "统一社会经济地籍与登记册",
    LN: "Cadastre Socio-Économique Unifié",
    SW: "Daftari la Kijamii na Kiuchumi Lililounganishwa",
    KG: "Cadastre Socio-Économique Unifié",
    TSH: "Cadastre Socio-Économique Unifié"
  },
  "Recensement Socio-Économique Unifié": {
    FR: "Cadastre Socio-Économique Unifié",
    PT: "Cadastro Socioeconômico Unificado",
    EN: "Unified Socio-Economic Cadastre",
    ES: "Catastro Socioeconómico Unificado",
    ZH: "统一社会经济地籍与登记册",
    LN: "Cadastre Socio-Économique Unifié",
    SW: "Daftari la Kijamii na Kiuchumi Lililounganishwa",
    KG: "Cadastre Socio-Économique Unifié",
    TSH: "Cadastre Socio-Économique Unifié"
  },
  "Le Cadastre Socio-Économique Unifié": {
    FR: "Le Cadastre Socio-Économique Unifié",
    PT: "O Cadastro Socioeconômico Unificado",
    EN: "The Unified Socio-Economic Cadastre",
    ES: "El Catastro Socioeconómico Unificado",
    ZH: "统一社会经济地籍与登记册",
    LN: "Cadastre Socio-Économique Unifié",
    SW: "Daftari la Kijamii na Kiuchumi Lililounganishwa",
    KG: "Cadastre Socio-Économique Unifié",
    TSH: "Cadastre Socio-Économique Unifié"
  },
  "Gouvernement de la RDC — Service officiel": {
    PT: "Governo da RDC — Serviço Oficial",
    EN: "Government of the DRC — Official Service",
    ES: "Gobierno de la RDC — Servicio Oficial",
    ZH: "刚果（金）政府 — 官方公共服务",
    LN: "Leta ya RDC — Mosala ya Leta ya Solo",
    SW: "Serikali ya RDC — Huduma Rasmi",
    KG: "Luyalu ya RDC — Kisalu ya Kieleka",
    TSH: "Mbulamatadi wa RDC — Mudimu wa Bushuwa"
  },
  "Mode Démonstration · 14 Profils Homologués :": {
    PT: "Modo Demonstração · 14 Perfis Homologados :",
    EN: "Demo Mode · 14 Certified Roles:",
    ES: "Modo Demostración · 14 Perfiles Homologados:",
    ZH: "演示体验模式 · 14个合规政务角色："
  },
  "Módulos de Trabalho": {
    FR: "Modules de Travail",
    PT: "Módulos de Trabalho",
    EN: "Work Modules",
    ES: "Módulos de Trabajo",
    ZH: "业务工作台"
  },
  "Visão Geral do Painel (Recharts)": {
    FR: "Vue d'Ensemble Analytique (Recharts)",
    PT: "Visão Geral do Painel (Recharts)",
    EN: "Dashboard Overview (Recharts)",
    ES: "Vista General del Panel (Recharts)",
    ZH: "统计仪表板（Recharts）"
  },
  "Nouvel Enrôlement": {
    PT: "Novo Cadastro",
    EN: "New Enrollment",
    ES: "Nuevo Registro",
    ZH: "新建登记"
  },
  "Consulter les Dossiers": {
    PT: "Consultar Cadastros",
    EN: "Browse Records",
    ES: "Consultar Expedientes",
    ZH: "查阅档案"
  },
  "Mode Hors-Ligne (Local)": {
    PT: "Modo Offline (Local)",
    EN: "Offline Mode (Local)",
    ES: "Modo Fuera de Línea",
    ZH: "离线模式（本地）"
  },
  "Serveur Central Connecté": {
    PT: "Servidor Central Conectado",
    EN: "Central Server Connected",
    ES: "Servidor Central Conectado",
    ZH: "中央服务器在线"
  },
  "Synchroniser": {
    PT: "Sincronizar",
    EN: "Synchronize",
    ES: "Sincronizar",
    ZH: "立即同步"
  },
  "Portail Public": {
    PT: "Portal Público",
    EN: "Public Portal",
    ES: "Portal Público",
    ZH: "公共门户"
  },
  "Quitter": {
    PT: "Sair",
    EN: "Logout",
    ES: "Salir",
    ZH: "退出登录"
  },
  "Profil CSU :": {
    PT: "Perfil CSU :",
    EN: "CSU Profile:",
    ES: "Perfil CSU:",
    ZH: "CSU专属身份："
  },
  "★ Profil Décisionnel Stratégique": {
    PT: "★ Perfil Estratégico Decisório",
    EN: "★ Strategic Decision Profile",
    ES: "★ Perfil Estratégico Decisorio",
    ZH: "★ 战略决策与综合监管角色"
  },
  "Clé HSM Active · Session Certifiée RDC": {
    PT: "Chave HSM Ativa · Sessão Certificada RDC",
    EN: "HSM Hardware Key Active · Certified Session DRC",
    ES: "Clave HSM Activa · Sesión Certificada RDC",
    ZH: "国密硬件HSM密钥激活 · 刚果（金）主权认证"
  },
  "Plateforme opérationnelle d'enrôlement, de régularisation et de surveillance du Registre Social Unifié (CSU RDC).": {
    PT: "Plataforma operacional de cadastramento, regularização e fiscalização do Registro Social Unificado (CSU RDC).",
    EN: "Operational platform for enrollment, regularization and oversight of the Unified Social Registry (CSU DRC).",
    ES: "Plataforma operativa de registro, regularización y supervisión del Registro Social Unificado (CSU RDC).",
    ZH: "刚果（金）统一社会登记簿（CSU）全业务运营、资格核验与主权监管平台。"
  },
  "Exporter CSV": {
    PT: "Exportar CSV",
    EN: "Export CSV",
    ES: "Exportar CSV",
    ZH: "导出CSV"
  },
  "Exporter PDF": {
    PT: "Exportar PDF",
    EN: "Export PDF",
    ES: "Exportar PDF",
    ZH: "导出PDF"
  },
  "Filtrer": {
    PT: "Filtrar",
    EN: "Filter",
    ES: "Filtrar",
    ZH: "筛选"
  },
  "Rechercher": {
    PT: "Pesquisar",
    EN: "Search",
    ES: "Buscar",
    ZH: "搜索"
  },
  "Rechercher par nom, CSU #, commune...": {
    PT: "Pesquisar por nome, número CSU, comuna...",
    EN: "Search by name, CSU #, commune...",
    ES: "Buscar por nombre, número CSU, comuna...",
    ZH: "按姓名、CSU编码、辖区搜索..."
  },
  "Détails": {
    PT: "Detalhes",
    EN: "Details",
    ES: "Detalles",
    ZH: "详情"
  },
  "Supprimer": {
    PT: "Excluir",
    EN: "Delete",
    ES: "Eliminar",
    ZH: "删除"
  },
  "Modifier": {
    PT: "Editar",
    EN: "Edit",
    ES: "Editar",
    ZH: "编辑"
  },
  "Enregistrer": {
    PT: "Salvar",
    EN: "Save",
    ES: "Guardar",
    ZH: "保存"
  },
  "Annuler": {
    PT: "Cancelar",
    EN: "Cancel",
    ES: "Cancelar",
    ZH: "取消"
  },
  "Confirmer": {
    PT: "Confirmar",
    EN: "Confirm",
    ES: "Confirmar",
    ZH: "确认"
  },
  "Certifié": {
    PT: "Certificado",
    EN: "Certified",
    ES: "Certificado",
    ZH: "已核验入库"
  },
  "Plan B (Témoins)": {
    PT: "Plano B (Testemunhas)",
    EN: "Plan B (Witnesses)",
    ES: "Plan B (Testigos)",
    ZH: "B计划（证人证明）"
  },
  "En attente": {
    PT: "Pendente",
    EN: "Pending",
    ES: "Pendiente",
    ZH: "待审核"
  },
  "Rejeté": {
    PT: "Rejeitado",
    EN: "Rejected",
    ES: "Rechazado",
    ZH: "已驳回"
  }
};

/**
 * Universal translator function for strings
 */
export function translateText(phrase: string, targetLang: SupportedLang): string {
  if (!phrase || targetLang === 'FR') return phrase;

  // Direct phrase match
  const directMatch = PHRASE_BOOK[phrase.trim()];
  if (directMatch && directMatch[targetLang]) {
    return directMatch[targetLang]!;
  }

  return phrase;
}

/**
 * Helper to get translated profile details
 */
export function getProfileI18n(
  roleType: string,
  targetLang: SupportedLang,
  fallback: { title: string; badge: string; description: string }
): { title: string; badge: string; description: string } {
  const profileSet = PROFILES_I18N[roleType];
  if (!profileSet) return fallback;

  const translation = profileSet[targetLang];
  if (!translation) {
    // If not in target lang, check EN or fallback
    const en = profileSet['EN'];
    return {
      title: en?.title || fallback.title,
      badge: en?.badge || fallback.badge,
      description: en?.description || fallback.description,
    };
  }

  return {
    title: translation.title || fallback.title,
    badge: translation.badge || fallback.badge,
    description: translation.description || fallback.description,
  };
}

/**
 * DOM Live Translation Engine:
 * Traverses text nodes in document and translates known phrases
 */
let domObserver: MutationObserver | null = null;
let currentObservedLang: SupportedLang = 'FR';

export function applyDomTranslations(targetLang: SupportedLang) {
  currentObservedLang = targetLang;

  if (typeof document === 'undefined') return;

  // Set html lang attribute
  const langMap: Record<SupportedLang, string> = {
    FR: 'fr',
    EN: 'en',
    ES: 'es',
    PT: 'pt',
    ZH: 'zh',
    LN: 'ln',
    SW: 'sw',
    KG: 'kg',
    TSH: 'tsh',
  };
  document.documentElement.lang = langMap[targetLang] || 'fr';

  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.nodeValue) {
        // Automatically normalize any remaining legacy occurrences of 'Recensement Socio-Économique Unifié'
        if (node.nodeValue.includes('Recensement Socio-Économique Unifié')) {
          node.nodeValue = node.nodeValue.replace(/Recensement Socio-Économique Unifié/g, 'Cadastre Socio-Économique Unifié');
        }

        // Substring replacement for Cadastre Socio-Économique Unifié across all languages
        if (targetLang !== 'FR' && node.nodeValue.includes('Cadastre Socio-Économique Unifié')) {
          const mapping = PHRASE_BOOK['Cadastre Socio-Économique Unifié'];
          if (mapping && mapping[targetLang]) {
            node.nodeValue = node.nodeValue.replace(/Cadastre Socio-Économique Unifié/g, mapping[targetLang]!);
          }
        }
      }

      const text = node.nodeValue?.trim();
      if (text && text.length > 1) {
        // Check if there is a known translation
        for (const [key, mapping] of Object.entries(PHRASE_BOOK)) {
          if (text === key) {
            const translated = mapping[targetLang];
            if (translated) {
              node.nodeValue = node.nodeValue!.replace(key, translated);
            }
          }
        }
      }
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      !['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes((node as Element).tagName)
    ) {
      // Also check placeholder and title attributes
      const el = node as HTMLElement;
      if (el.title) {
        const tr = translateText(el.title, targetLang);
        if (tr !== el.title) el.title = tr;
      }
      if (el instanceof HTMLInputElement && el.placeholder) {
        const tr = translateText(el.placeholder, targetLang);
        if (tr !== el.placeholder) el.placeholder = tr;
      }

      node.childNodes.forEach(walk);
    }
  };

  walk(document.body);

  // Setup mutation observer if not already active
  if (!domObserver) {
    domObserver = new MutationObserver((mutations) => {
      if (currentObservedLang === 'FR') return;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((n) => walk(n));
      });
    });

    domObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}
