import Image from "next/image";
import type { ReactNode } from "react";
import brandMark from "@/branding/logos/logo dibujo.svg";

type PageHeroProps = {
  index: string;
  kicker: string;
  title: ReactNode;
  description: string;
  tags: string[];
};

export function PageHero({ index, kicker, title, description, tags }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero-grid-bg" aria-hidden="true" />
      <div className="container page-hero-layout">
        <div className="page-hero-copy">
          <p className="eyebrow"><span /> {kicker}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        <div className="page-hero-object" data-tilt aria-hidden="true">
          <div className="page-orbit orbit-outer" />
          <div className="page-orbit orbit-inner" />
          <div className="page-index">{index}</div>
          <Image src={brandMark} alt="" width={230} height={230} priority />
          {tags.map((tag, tagIndex) => (
            <span className={`page-tag page-tag-${tagIndex + 1}`} key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="container page-hero-line">
        <span>SCROLL PARA EXPLORAR</span>
        <i />
      </div>
    </section>
  );
}
