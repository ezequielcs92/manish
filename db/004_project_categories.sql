ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS categories TEXT[] NOT NULL DEFAULT '{}';

ALTER TABLE public.projects
  DROP CONSTRAINT IF EXISTS projects_categories_check;

ALTER TABLE public.projects
  ADD CONSTRAINT projects_categories_check
  CHECK (categories <@ ARRAY['redes', 'contenido', 'diseno', 'desarrollo', 'ads']::TEXT[]);

UPDATE public.projects
SET categories = ARRAY_REMOVE(ARRAY[
  CASE WHEN services ILIKE '%redes%' OR services ILIKE '%social%' THEN 'redes' END,
  CASE WHEN services ILIKE '%contenido%' THEN 'contenido' END,
  CASE WHEN services ILIKE '%diseño%' OR services ILIKE '%diseno%' OR services ILIKE '%branding%' OR services ILIKE '%merch%' THEN 'diseno' END,
  CASE WHEN services ILIKE '%web%' OR services ILIKE '%digital%' OR services ILIKE '%desarrollo%' OR services ILIKE '%woocommerce%' OR services ILIKE '%e-commerce%' OR services ILIKE '%software%' THEN 'desarrollo' END,
  CASE WHEN services ILIKE '%ads%' OR services ILIKE '%paid%' THEN 'ads' END
]::TEXT[], NULL)
WHERE COALESCE(cardinality(categories), 0) = 0;
