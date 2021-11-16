CREATE TABLE IF NOT EXISTS public.media (
    media_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    type character varying(64) COLLATE pg_catalog."default",
    file character varying(256) COLLATE pg_catalog."default",
    content text COLLATE pg_catalog."default",
    CONSTRAINT media_pkey PRIMARY KEY (media_id)
)

CREATE TABLE IF NOT EXISTS public.media_of_pages (
    page_id integer,
    media_id integer,
    location integer
)

CREATE TABLE IF NOT EXISTS public.pages (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(64) COLLATE pg_catalog."default",
    created_at character varying(32) COLLATE pg_catalog."default",
    updated_at character varying(32) COLLATE pg_catalog."default",
    CONSTRAINT pages_pkey PRIMARY KEY (id)
)