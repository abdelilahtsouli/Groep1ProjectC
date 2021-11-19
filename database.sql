CREATE TABLE IF NOT EXISTS public.pages
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(64) COLLATE pg_catalog."default",
    created_at character varying(32) COLLATE pg_catalog."default",
    updated_at character varying(32) COLLATE pg_catalog."default",
    content text COLLATE pg_catalog."default",
    CONSTRAINT pages_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS public.media
(
    media_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    type character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT media_pkey PRIMARY KEY (media_id)
)

CREATE TABLE public.td_user
(
    id smallint NOT NULL,
    name character varying(25) COLLATE pg_catalog."default",
    email character varying(30) COLLATE pg_catalog."default",
    password character varying(50) COLLATE pg_catalog."default",
    twofa boolean,
    secret_key character varying(100) COLLATE pg_catalog."default",
    oauth_token character varying(50) COLLATE pg_catalog."default",
    salt character varying(100) COLLATE pg_catalog."default",
    superuser boolean,
    CONSTRAINT td_user_pkey PRIMARY KEY (id)
)