ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS projects_featured_idx
  ON public.projects (is_featured, status, sort_order);
