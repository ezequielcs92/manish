"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type PortfolioFilterCase = {
  client: string;
  type: string;
  year: string;
  className: string;
  word: string;
  slug: string;
  coverImageUrl: string | null;
  externalUrl?: string;
  categories: string[];
};

const categoryOptions = [
  ["all", "Todo"],
  ["redes", "Manejo de redes"],
  ["contenido", "Creación de contenido"],
  ["diseno", "Diseño gráfico"],
  ["desarrollo", "Desarrollo"],
  ["ads", "Ads"],
] as const;

export function PortfolioFilter({ cases }: { cases: PortfolioFilterCase[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredCases = activeCategory === "all" ? cases : cases.filter((project) => project.categories.includes(activeCategory));
  const changeCategory = (category: string) => {
    const scrollY = window.scrollY;
    setActiveCategory(category);
    requestAnimationFrame(() => window.scrollTo({ top: scrollY, behavior: "instant" }));
  };

  return (
    <>
      <div className="container portfolio-toolbar" data-reveal>
        <p>TRABAJO SELECCIONADO</p>
        <div aria-label="Disciplinas del trabajo seleccionado">
          {categoryOptions.map(([value, label]) => <button className={activeCategory === value ? "active" : ""} type="button" aria-pressed={activeCategory === value} onClick={() => changeCategory(value)} key={value}>{label}</button>)}
        </div>
      </div>

      <div className="container case-grid">
        {filteredCases.map((project) => (
          <article className={`case-card ${project.className}`} key={project.client}>
            <div className={`case-art${project.coverImageUrl ? " has-cover" : ""}`}>
              {project.coverImageUrl ? <><Image src={project.coverImageUrl} alt={`${project.client} - proyecto realizado por Manish`} fill sizes="(max-width: 640px) 100vw, 50vw" /><i className="case-cover-shade" /></> : null}
              <div className="case-grid-lines" />
              {!project.coverImageUrl ? <span className="case-word">{project.word}</span> : null}
              <i className="case-shape shape-one" /><i className="case-shape shape-two" />
              {project.externalUrl ? <a className="case-cover-link" href={project.externalUrl} target="_blank" rel="noreferrer" aria-label={`Abrir enlace de ${project.client}`} /> : null}
            </div>
            <div className="case-info">
              <p>{project.type}</p>
              <h2>{project.client}</h2>
              <div className="case-info-links">{project.externalUrl ? <a className="button button-small case-action" href={project.externalUrl} target="_blank" rel="noreferrer">Visitar <svg className="arrow-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5m-8 0h8v8" /></svg></a> : null}{project.slug ? <Link className="button button-small case-action case-action-secondary" href={`/portfolio/${project.slug}`}>Ver caso <svg className="arrow-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5m-8 0h8v8" /></svg></Link> : null}</div>
            </div>
          </article>
        ))}
        {!filteredCases.length ? <div className="portfolio-no-results"><h2>No encontramos casos en esta categoría.</h2><button type="button" onClick={() => changeCategory("all")}>Ver todo el trabajo →</button></div> : null}
      </div>
    </>
  );
}
