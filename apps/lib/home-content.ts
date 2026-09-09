import type { FrIconClassName } from "@codegouvaor/react-ads/fr";
import { sectionPaths, type PrimaryNavKey } from "@/lib/site-structure";

/**
 * Content configuration of the portal homepage.
 *
 * Demo content lives here, never in the components: every block of the
 * homepage is rendered from this configuration + the message catalogs, so the
 * mock data can later be replaced by a government API without touching the
 * visual layer.
 *
 * Label/desc/date texts are not stored here — they come from the `home.*`
 * message keys referenced by each entry.
 */

export const HOME_PATH = "/";
export const PROJECTS_PATH = "/projets";
export const POLICIES_PATH = "/politiques-publiques";
export const NEWS_PATH = "/actualites";
export const DATA_PATH = "/donnees";
export const GOVERNMENT_PATH = "/gouvernement";
export const INDICATORS_PATH = "/donnees/indicateurs";

/* ------------------------------------------------------------------ */
/* 06 — Six domains                                                     */
/* ------------------------------------------------------------------ */

export type HomeDomain = {
  key: PrimaryNavKey;
  href: string;
  iconId: FrIconClassName;
};

/** Order follows the header taxonomy — a single taxonomy for the portal. */
export const homeDomains: ReadonlyArray<HomeDomain> = [
  { key: "infrastructures", href: sectionPaths.infrastructures, iconId: "fr-icon-building-line" },
  { key: "logement", href: sectionPaths.logement, iconId: "fr-icon-home-4-line" },
  { key: "energie", href: sectionPaths.energie, iconId: "fr-icon-charging-pile-2-line" },
  { key: "mobilite", href: sectionPaths.mobilite, iconId: "fr-icon-car-line" },
  { key: "numerique", href: sectionPaths.numerique, iconId: "fr-icon-server-line" },
  { key: "territoires", href: sectionPaths.territoires, iconId: "fr-icon-road-map-line" },
];

/* ------------------------------------------------------------------ */
/* 07 — Major national projects                                         */
/* ------------------------------------------------------------------ */

export type ProjectStatusKey = "inConstruction" | "inProgress" | "inStudies" | "delivered";
export type ProjectKindKey = "nationalInfrastructure" | "nationalProgram";

export type HomeProject = {
  key: string;
  domainKey: PrimaryNavKey;
  kindKey: ProjectKindKey;
  statusKey: ProjectStatusKey;
  progress: number;
  href: string;
};

export const homeProjects: ReadonlyArray<HomeProject> = [
  {
    key: "railNordSud",
    domainKey: "mobilite",
    kindKey: "nationalInfrastructure",
    statusKey: "inConstruction",
    progress: 72,
    href: `${PROJECTS_PATH}/ligne-ferroviaire-nord-sud`,
  },
  {
    key: "tresHautDebit",
    domainKey: "numerique",
    kindKey: "nationalProgram",
    statusKey: "inProgress",
    progress: 58,
    href: `${PROJECTS_PATH}/reseau-tres-haut-debit-national`,
  },
  {
    key: "barrageVallee",
    domainKey: "territoires",
    kindKey: "nationalInfrastructure",
    statusKey: "inStudies",
    progress: 34,
    href: `${PROJECTS_PATH}/grand-barrage-de-la-vallee`,
  },
  {
    key: "renovationEnergetique",
    domainKey: "logement",
    kindKey: "nationalProgram",
    statusKey: "inProgress",
    progress: 46,
    href: `${PROJECTS_PATH}/renovation-energetique-des-logements`,
  },
];

/* ------------------------------------------------------------------ */
/* 08 — The infrastructure of the Republic (State)                     */
/* ------------------------------------------------------------------ */

export type HomeStateItem = {
  key: string;
  iconId: FrIconClassName;
};

export const homeStateItems: ReadonlyArray<HomeStateItem> = [
  { key: "reseauxGouvernementaux", iconId: "fr-icon-global-line" },
  { key: "dataCenters", iconId: "fr-icon-server-line" },
  { key: "cloudGouvernemental", iconId: "fr-icon-cloud-line" },
  { key: "telecommunications", iconId: "fr-icon-signal-tower-line" },
  { key: "batimentsPublics", iconId: "fr-icon-building-line" },
  { key: "infrastructuresNumeriques", iconId: "fr-icon-hard-drive-2-line" },
  { key: "interoperabilite", iconId: "fr-icon-links-line" },
  { key: "continuite", iconId: "fr-icon-shield-line" },
];

/* ------------------------------------------------------------------ */
/* 09 — Conceptual map filters                                          */
/* ------------------------------------------------------------------ */

export type HomeMapFilter = {
  key: string;
  href: string;
};

export const homeMapFilters: ReadonlyArray<HomeMapFilter> = [
  { key: "mobilite", href: sectionPaths.mobilite },
  { key: "energie", href: sectionPaths.energie },
  { key: "numerique", href: sectionPaths.numerique },
  { key: "eau", href: "/territoires/eau" },
  { key: "logement", href: sectionPaths.logement },
  { key: "projets", href: PROJECTS_PATH },
];

/* ------------------------------------------------------------------ */
/* 10 — Figures                                                         */
/* ------------------------------------------------------------------ */

export type HomeStatistic = {
  key: string;
  href: string;
};

export const homeStatistics: ReadonlyArray<HomeStatistic> = [
  { key: "routesNationales", href: INDICATORS_PATH },
  { key: "reseauFerroviaire", href: INDICATORS_PATH },
  { key: "couvertureTresHautDebit", href: INDICATORS_PATH },
  { key: "grandsProjets", href: PROJECTS_PATH },
];

/* ------------------------------------------------------------------ */
/* 11 — Priorities                                                      */
/* ------------------------------------------------------------------ */

export type HomePriority = {
  key: string;
  iconId: FrIconClassName;
  href: string;
};

export const homePriorities: ReadonlyArray<HomePriority> = [
  { key: "resilienceNationale", iconId: "fr-icon-shield-line", href: `${POLICIES_PATH}/resilience-nationale` },
  { key: "souveraineteNumerique", iconId: "fr-icon-lock-line", href: `${POLICIES_PATH}/souverainete-numerique` },
  { key: "transitionEnergetique", iconId: "fr-icon-leaf-line", href: `${POLICIES_PATH}/transition-energetique` },
  { key: "mobiliteNationale", iconId: "fr-icon-train-line", href: `${POLICIES_PATH}/mobilite-nationale` },
  { key: "logementHabitat", iconId: "fr-icon-home-4-line", href: `${POLICIES_PATH}/logement-et-habitat` },
  { key: "territoiresDurables", iconId: "fr-icon-earth-line", href: `${POLICIES_PATH}/territoires-durables` },
];

/* ------------------------------------------------------------------ */
/* 12 — News                                                            */
/* ------------------------------------------------------------------ */

export type HomeNewsItem = {
  key: string;
  href: string;
};

export const homeNews = {
  featured: { key: "railModernisation", href: `${NEWS_PATH}/modernisation-du-reseau-ferroviaire` },
  secondary: [
    { key: "cloudStrategy", href: `${NEWS_PATH}/strategie-cloud-de-l-etat` },
    { key: "fibreBarometer", href: `${NEWS_PATH}/tres-haut-debit-98-7-du-territoire-couvert` },
  ] as ReadonlyArray<HomeNewsItem>,
};

/* ------------------------------------------------------------------ */
/* 13 — Data & transparency                                             */
/* ------------------------------------------------------------------ */

export const homeDataResources: ReadonlyArray<HomeNewsItem> = [
  { key: "donneesOuvertes", href: `${DATA_PATH}/ouvertes` },
  { key: "statistiques", href: `${DATA_PATH}/statistiques` },
  { key: "cartes", href: `${DATA_PATH}/cartes` },
  { key: "indicateurs", href: INDICATORS_PATH },
  { key: "projets", href: PROJECTS_PATH },
  { key: "marchesPublics", href: "/marches-publics" },
  { key: "publications", href: "/publications-officielles" },
  { key: "standards", href: `${DATA_PATH}/standards` },
];

/* ------------------------------------------------------------------ */
/* 14 — Resilience                                                      */
/* ------------------------------------------------------------------ */

export const homeResilienceItems: ReadonlyArray<string> = [
  "infrastructuresCritiques",
  "continuiteServices",
  "redondance",
  "resilienceEnergetique",
  "resilienceNumerique",
  "resilienceTerritoriale",
];
