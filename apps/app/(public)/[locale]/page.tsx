import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates, resolveLocaleParam } from "@/lib/localized-metadata";
import {
  GOVERNMENT_PATH,
  homeDataResources,
  homeDomains,
  homeMapFilters,
  homeNews,
  homePriorities,
  homeProjects,
  homeResilienceItems,
  homeStateItems,
  homeStatistics,
  NEWS_PATH,
  POLICIES_PATH,
  PROJECTS_PATH,
} from "@/lib/home-content";
import {
  ArticleCard,
  CtaButtonsGroup,
  SearchSuggestionTag,
} from "@/components/public/content/ads-fragments";

const HOME_PATH = "/";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);

  const tHome = await getTranslations({ locale, namespace: "home" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  return {
    title: { absolute: tHome("metaTitle") },
    description: tMeta("description"),
    ...localizedAlternates(locale, HOME_PATH),
  };
}

/* Layout helpers below use the ADS design tokens through `var(--ads-*)` (the
 * single source of tokens — main.css) so light/dark switching and theming stay
 * owned by the Design System. Only the ministry-specific arrangement of these
 * blocks is expressed here, inline, without any local stylesheet. */

const heroContainerStyle: CSSProperties = {
  maxWidth: "52rem",
  marginInline: "auto",
  textAlign: "center",
};

const teaserCardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  height: "100%",
  padding: "1.25rem",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  borderTop: "3px solid var(--ads-color-primary)",
  textDecoration: "none",
  color: "var(--ads-color-text)",
};

const teaserTagStyle: CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--ads-color-primary)",
};

const teaserTitleStyle: CSSProperties = {
  display: "block",
  fontSize: "1.0625rem",
  lineHeight: 1.35,
  fontWeight: 700,
};

const teaserDescStyle: CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  lineHeight: 1.55,
  color: "var(--ads-color-text-muted)",
};

const teaserArrowStyle: CSSProperties = {
  marginTop: "auto",
  alignSelf: "flex-end",
  fontSize: "1rem",
  color: "var(--ads-color-primary)",
};

const teaserIconStyle: CSSProperties = {
  fontSize: "1.375rem",
  lineHeight: 1,
  color: "var(--ads-color-primary)",
};

const figureValueStyle: CSSProperties = {
  display: "block",
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  lineHeight: 1.2,
  fontWeight: 700,
};

const figureLabelStyle: CSSProperties = {
  display: "block",
  fontSize: "0.9375rem",
  fontWeight: 600,
};

const noteStyle: CSSProperties = {
  margin: "1.25rem 0 0",
  fontSize: "0.8125rem",
  lineHeight: 1.5,
  color: "var(--ads-color-text-muted)",
};

const progressTrackStyle: CSSProperties = {
  width: "100%",
  height: "0.375rem",
  borderRadius: "999px",
  background: "var(--ads-color-surface-muted)",
  border: "1px solid var(--ads-color-border)",
  overflow: "hidden",
};

/* Region anchors of the schematic map (see “Les infrastructures en Astoria”). */
const mapRegions = [
  { key: "nord", x: 210, y: 100 },
  { key: "littoral", x: 145, y: 245 },
  { key: "capitale", x: 470, y: 190 },
  { key: "est", x: 820, y: 125 },
  { key: "vallee", x: 645, y: 330 },
  { key: "sud", x: 355, y: 370 },
] as const;

/** Corridors linking the regions — one pair of points per line. */
const mapCorridors: ReadonlyArray<readonly [number, number, number, number]> = [
  // Radial network through the capital
  [210, 100, 470, 190],
  [145, 245, 470, 190],
  [820, 125, 470, 190],
  [645, 330, 470, 190],
  [355, 370, 470, 190],
  // Peripheral loop
  [210, 100, 820, 125],
  [820, 125, 645, 330],
  [645, 330, 355, 370],
  [355, 370, 145, 245],
  [145, 245, 210, 100],
];

/**
 * Homepage of the Ministry of Infrastructure and Digital Affairs of the
 * Republic of Astoria.
 *
 * The page tells one story, section after section:
 *
 *   01 Hero            — what this ministry is (physical + digital foundation)
 *   02 Les six domaines — what it acts on (the header taxonomy, unchanged)
 *   03 Grands projets   — what it builds
 *   04 Infrastructures de la République — infrastructure also means the State
 *   05 Carte           — a single territorial view of the networks
 *   06 Astoria en chiffres — their state, in a few figures
 *   07 Nos priorités    — why the ministry runs these projects
 *   08 Actualités       — how to follow its action
 *   09 Données et transparence — how its action can be checked
 *   10 Résilience       — preparing the Republic for crises
 *
 * Every section is driven by `@/lib/home-content` (mock data, later a
 * government API) and the `home.*` message catalogs. The six domains never
 * appear as a second navigation: they are the header taxonomy, and every
 * domain card links back to its header route.
 */
export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const tPrimaryNav = await getTranslations({ locale, namespace: "nav.primary" });

  const heroCtas = (
    <CtaButtonsGroup
      alignment="center"
      buttons={[
        {
          children: t("hero.ctaProjects"),
          href: PROJECTS_PATH,
          priority: "primary",
          iconId: "fr-icon-arrow-right-line",
        },
        {
          children: t("hero.ctaPolicies"),
          href: POLICIES_PATH,
          priority: "secondary",
          iconId: "fr-icon-arrow-right-line",
        },
      ]}
    />
  );

  return (
    <>
      {/* 01 — Hero: institutional statement of the ministry, centred like the
          reference hero. */}
      <section className="gov-section" aria-labelledby="home-hero-title">
        <div className="gov-section__container" style={heroContainerStyle}>
          <p className="gov-kicker">{t("hero.kicker")}</p>
          <h1 id="home-hero-title">{t("hero.title")}</h1>
          <p className="gov-lead" style={{ marginBottom: "2rem" }}>
            {t("hero.lead")}
          </p>
          {heroCtas}
        </div>
      </section>

      {/* 02 — Les six domaines: the header taxonomy, directly reachable from
          the page. No second navigation: each card is the landing page of its
          header domain. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="domains-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("domains.kicker")}</p>
              <h2 id="domains-title" className="gov-section__title">
                {t("domains.title")}
              </h2>
              <p className="gov-lead">{t("domains.lead")}</p>
            </div>
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {homeDomains.map((domain) => (
              <li key={domain.key} className="fr-col-12 fr-col-md-6 fr-col-lg-4">
                <a href={domain.href} style={teaserCardStyle}>
                  <span
                    className={domain.iconId}
                    aria-hidden="true"
                    style={teaserIconStyle}
                  />
                  <span style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    <span style={teaserTitleStyle}>{tPrimaryNav(domain.key)}</span>
                    <span style={teaserDescStyle}>
                      {t(`domains.items.${domain.key}.desc`)}
                    </span>
                  </span>
                  <span
                    className="fr-icon-arrow-right-line"
                    aria-hidden="true"
                    style={teaserArrowStyle}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 — Les grands projets d'Astoria: flagship projects with their
          progress. Data-driven: only demo content until the official project
          register is connected. */}
      <section className="gov-section" aria-labelledby="projects-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("projects.kicker")}</p>
              <h2 id="projects-title" className="gov-section__title">
                {t("projects.title")}
              </h2>
              <p className="gov-lead">{t("projects.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("projects.allLink"),
                  href: PROJECTS_PATH,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {homeProjects.map((project) => (
              <li key={project.key} className="fr-col-12 fr-col-md-6">
                <a href={project.href} style={teaserCardStyle}>
                  <span style={teaserTagStyle}>
                    {tPrimaryNav(project.domainKey)}
                    {" · "}
                    {t(`projects.kinds.${project.kindKey}`)}
                  </span>
                  <span style={teaserTitleStyle}>
                    {t(`projects.items.${project.key}.title`)}
                  </span>
                  <span style={teaserDescStyle}>
                    {t(`projects.items.${project.key}.location`)}
                  </span>

                  <span style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span
                      role="progressbar"
                      aria-label={`${t("projects.progressLabel")} : ${project.progress} %`}
                      aria-valuenow={project.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ ...progressTrackStyle, flex: 1 }}
                    >
                      <span
                        style={{
                          display: "block",
                          width: `${project.progress}%`,
                          height: "100%",
                          background: "var(--ads-color-primary)",
                        }}
                      />
                    </span>
                    <span
                      style={{ fontSize: "0.875rem", fontWeight: 700, whiteSpace: "nowrap" }}
                    >
                      {project.progress} %
                    </span>
                  </span>

                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={teaserTagStyle}>
                      {t(`projects.statuses.${project.statusKey}`)}
                    </span>
                    <span style={teaserDescStyle}>
                      {t(`projects.items.${project.key}.deadline`)}
                    </span>
                  </span>

                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.9375rem", fontWeight: 700 }}>
                      {t("projects.seeLink")}
                    </span>
                    <span
                      className="fr-icon-arrow-right-line"
                      aria-hidden="true"
                      style={teaserArrowStyle}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p style={noteStyle}>{t("projects.note")}</p>
        </div>
      </section>

      {/* 04 — Les infrastructures de la République: the ministry also oversees
          what makes the State itself work. Distributed, operated by different
          bodies, standardised by the ministry. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="state-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("state.kicker")}</p>
              <h2 id="state-title" className="gov-section__title">
                {t("state.title")}
              </h2>
              <p className="gov-lead">{t("state.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("state.cta"),
                  href: GOVERNMENT_PATH,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
              maxWidth: "72rem",
              padding: "1.75rem",
              background: "var(--ads-color-background)",
              border: "1px solid var(--ads-color-border)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                lineHeight: 1.6,
                fontWeight: 600,
                maxWidth: "52rem",
              }}
            >
              {t("state.message")}
            </p>
            <ul className="fr-grid-row fr-grid-row--gutters" role="list">
              {homeStateItems.map((item) => (
                <li key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      height: "100%",
                      padding: "0.75rem 0.875rem",
                      background: "var(--ads-color-surface-muted)",
                      border: "1px solid var(--ads-color-border)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      lineHeight: 1.4,
                      color: "var(--ads-color-text)",
                    }}
                  >
                    <span
                      className={item.iconId}
                      aria-hidden="true"
                      style={{ flexShrink: 0, color: "var(--ads-color-primary)" }}
                    />
                    {t(`state.items.${item.key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 05 — Carte: conceptual, schematic view of the national networks. No
          map engine yet — this placeholder keeps the visual language and will
          be replaced by the official data layer. */}
      <section className="gov-section" aria-labelledby="map-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("map.kicker")}</p>
              <h2 id="map-title" className="gov-section__title">
                {t("map.title")}
              </h2>
              <p className="gov-lead">{t("map.lead")}</p>
            </div>
          </div>
          <div
            style={{
              maxWidth: "80rem",
              background:
                "linear-gradient(to right, var(--ads-color-border) 1px, transparent 1px) 0 0 / 32px 32px, linear-gradient(to bottom, var(--ads-color-border) 1px, transparent 1px) 0 0 / 32px 32px",
              backgroundAttachment: "local",
              border: "1px solid var(--ads-color-border)",
            }}
          >
            <svg
              viewBox="0 0 1000 440"
              role="img"
              aria-label={t("map.title")}
              style={{ display: "block", width: "100%", height: "auto" }}
            >
              {/* Corridors — physical and digital networks sketched together */}
              {mapCorridors.map(([x1, y1, x2, y2], index) => (
                <line
                  key={index}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--ads-color-primary)"
                  strokeOpacity="0.18"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              ))}
              {mapCorridors.map(([x1, y1, x2, y2], index) => (
                <line
                  key={`thin-${index}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--ads-color-primary)"
                  strokeOpacity="0.45"
                  strokeWidth="2"
                  strokeDasharray="1 7"
                  strokeLinecap="round"
                />
              ))}
              {/* Region anchors */}
              {mapRegions.map((region) => (
                <g key={region.key}>
                  <circle
                    cx={region.x}
                    cy={region.y}
                    r="12"
                    fill="var(--ads-color-background)"
                    stroke="var(--ads-color-primary)"
                    strokeWidth="2.5"
                  />
                  <text
                    x={region.x}
                    y={region.y - 22}
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill="var(--ads-color-text-muted)"
                  >
                    {t(`map.regions.${region.key}`)}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <p
              style={{
                margin: "0 0 0.5rem",
                fontSize: "0.875rem",
                color: "var(--ads-color-text-muted)",
              }}
              id="map-filters-label"
            >
              {t("map.filterLabel")}
            </p>
            <ul
              style={{
                listStyle: "none",
                margin: "0",
                padding: "0",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
              aria-labelledby="map-filters-label"
            >
              {homeMapFilters.map((filter) => (
                <li key={filter.key}>
                  <SearchSuggestionTag
                    label={t(`map.filters.${filter.key}`)}
                    href={filter.href}
                  />
                </li>
              ))}
            </ul>
          </div>
          <p style={noteStyle}>{t("map.note")}</p>
        </div>
      </section>

      {/* 06 — Astoria en chiffres: demonstration indicators, structured so a
          real indicator API can plug in later. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="stats-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("stats.kicker")}</p>
              <h2 id="stats-title" className="gov-section__title">
                {t("stats.title")}
              </h2>
              <p className="gov-lead">{t("stats.lead")}</p>
            </div>
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {homeStatistics.map((indicator) => (
              <li key={indicator.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <a href={indicator.href} style={teaserCardStyle}>
                  <span style={figureValueStyle}>
                    {t(`stats.items.${indicator.key}.value`)}
                  </span>
                  <span style={figureLabelStyle}>
                    {t(`stats.items.${indicator.key}.label`)}
                  </span>
                  <span
                    className="fr-icon-arrow-right-line"
                    aria-hidden="true"
                    style={teaserArrowStyle}
                  />
                </a>
              </li>
            ))}
          </ul>
          <p style={noteStyle}>{t("stats.note")}</p>
        </div>
      </section>

      {/* 07 — Nos priorités: why the ministry runs these projects. */}
      <section className="gov-section" aria-labelledby="priorities-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("priorities.kicker")}</p>
              <h2 id="priorities-title" className="gov-section__title">
                {t("priorities.title")}
              </h2>
              <p className="gov-lead">{t("priorities.lead")}</p>
            </div>
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {homePriorities.map((priority) => (
              <li key={priority.key} className="fr-col-12 fr-col-md-6 fr-col-lg-4">
                <a href={priority.href} style={teaserCardStyle}>
                  <span
                    className={priority.iconId}
                    aria-hidden="true"
                    style={teaserIconStyle}
                  />
                  <span style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    <span style={teaserTitleStyle}>
                      {t(`priorities.items.${priority.key}.title`)}
                    </span>
                    <span style={teaserDescStyle}>
                      {t(`priorities.items.${priority.key}.desc`)}
                    </span>
                  </span>
                  <span
                    className="fr-icon-arrow-right-line"
                    aria-hidden="true"
                    style={teaserArrowStyle}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 08 — Actualités: the editorial pattern of the reference page — one
          featured article, several secondary ones. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="news-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("news.kicker")}</p>
              <h2 id="news-title" className="gov-section__title">
                {t("news.title")}
              </h2>
              <p className="gov-lead">{t("news.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("news.allLink"),
                  href: NEWS_PATH,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-lg-7">
              <ArticleCard
                title={t(`news.items.${homeNews.featured.key}.title`)}
                tag={t(`news.items.${homeNews.featured.key}.tag`)}
                date={t(`news.items.${homeNews.featured.key}.date`)}
                href={homeNews.featured.href}
                size="large"
                background
                border
              />
            </div>
            <div className="fr-col-12 fr-col-lg-5">
              <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "grid", gap: "1.5rem" }}>
                {homeNews.secondary.map((article) => (
                  <li key={article.key}>
                    <ArticleCard
                      title={t(`news.items.${article.key}.title`)}
                      tag={t(`news.items.${article.key}.tag`)}
                      date={t(`news.items.${article.key}.date`)}
                      href={article.href}
                      size="small"
                      background
                      border
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — Données et transparence: public resources of the ministry,
          preparing the link with the government open-data portal. */}
      <section className="gov-section" aria-labelledby="data-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("data.kicker")}</p>
              <h2 id="data-title" className="gov-section__title">
                {t("data.title")}
              </h2>
              <p className="gov-lead">{t("data.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("data.cta"),
                  href: "/donnees",
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <ul
            role="list"
            style={{
              listStyle: "none",
              margin: "0",
              padding: "0",
              display: "grid",
              gap: "0",
              maxWidth: "72rem",
            }}
          >
            {homeDataResources.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    color: "var(--ads-color-text)",
                    border: "1px solid var(--ads-color-border)",
                    borderTop: "none",
                    background: "var(--ads-color-background)",
                  }}
                >
                  {t(`data.items.${item.key}`)}
                  <span className="fr-icon-arrow-right-line" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10 — Résilience: the closing statement of the page. A national
          infrastructure must keep working when a crisis strikes. */}
      <section
        className="gov-section gov-section--subtle"
        aria-labelledby="resilience-title"
      >
        <div className="gov-section__container" style={{ maxWidth: "72rem" }}>
          <div
            style={{
              padding: "2rem",
              background: "var(--ads-color-background)",
              border: "1px solid var(--ads-color-border)",
              borderTop: "4px solid var(--ads-color-primary)",
            }}
          >
            <div style={{ maxWidth: "52rem" }}>
              <p className="gov-kicker">{t("resilience.kicker")}</p>
              <h2 id="resilience-title" className="gov-section__title">
                {t("resilience.title")}
              </h2>
              <p
                style={{
                  margin: "0 0 1rem",
                  fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                  lineHeight: 1.5,
                  fontWeight: 700,
                }}
              >
                {t("resilience.lead")}
              </p>
              <p
                style={{
                  margin: "0 0 1.75rem",
                  maxWidth: "44rem",
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                  color: "var(--ads-color-text-muted)",
                }}
              >
                {t("resilience.text")}
              </p>
            </div>
            <ul className="fr-grid-row fr-grid-row--gutters" role="list">
              {homeResilienceItems.map((itemKey) => (
                <li key={itemKey} className="fr-col-12 fr-col-sm-6 fr-col-lg-4">
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      height: "100%",
                      padding: "0.75rem 0.875rem",
                      background: "var(--ads-color-surface-muted)",
                      border: "1px solid var(--ads-color-border)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      lineHeight: 1.4,
                      color: "var(--ads-color-text)",
                    }}
                  >
                    <span
                      className="fr-icon-checkbox-circle-line"
                      aria-hidden="true"
                      style={{ flexShrink: 0, color: "var(--ads-color-success)" }}
                    />
                    {t(`resilience.items.${itemKey}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
