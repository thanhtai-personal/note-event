-- Database: EventNote

-- DROP DATABASE "EventNote";

CREATE DATABASE "EventNote"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: public.eventnote

-- DROP TABLE public.eventnote;

CREATE TABLE IF NOT EXISTS public.eventnote
(
    id uuid NOT NULL,
    "userId" uuid NOT NULL,
    "contentText" text COLLATE pg_catalog."default",
    "contentHtml" text COLLATE pg_catalog."default",
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    CONSTRAINT eventnote_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.eventnote
    OWNER to postgres;

-- Table: public.googleaccount

-- DROP TABLE public.googleaccount;

CREATE TABLE IF NOT EXISTS public.googleaccount
(
    id uuid NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    token text COLLATE pg_catalog."default",
    "userId" uuid,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "currentUsing" boolean DEFAULT false,
    CONSTRAINT googleaccount_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.googleaccount
    OWNER to postgres;

-- Table: public.resource

-- DROP TABLE public.resource;

CREATE TABLE IF NOT EXISTS public.resource
(
    id uuid NOT NULL,
    "userId" uuid NOT NULL,
    name text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    url text COLLATE pg_catalog."default",
    "accountId" uuid,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "eventId" uuid,
    CONSTRAINT resource_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.resource
    OWNER to postgres;

-- Table: public."user"

-- DROP TABLE public."user";

CREATE TABLE IF NOT EXISTS public."user"
(
    id uuid NOT NULL,
    "googleId" character varying(128) COLLATE pg_catalog."default",
    username character varying(128) COLLATE pg_catalog."default" NOT NULL,
    password character varying(256) COLLATE pg_catalog."default" NOT NULL,
    token text COLLATE pg_catalog."default",
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "lastLoginTime" timestamp without time zone,
    CONSTRAINT user_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."user"
    OWNER to postgres;

ALTER TABLE public."resource"
  CONSTRAINT fkey_resource_event_note FOREIGN KEY ("eventId")
      REFERENCES public.eventnote (id) MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE NO ACTION,
  CONSTRAINT fkey_resource_google_account FOREIGN KEY ("accountId")
      REFERENCES public.googleaccount (id) MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE NO ACTION,
  CONSTRAINT fkey_resource_user FOREIGN KEY ("userId")
      REFERENCES public."user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE NO ACTION

ALTER TABLE public."googleaccount"
  CONSTRAINT fkey_google_account_user FOREIGN KEY ("userId")
      REFERENCES public."user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE NO ACTION

ALTER TABLE public."eventnote"
CONSTRAINT eventnote_user_fkey FOREIGN KEY ("userId")
    REFERENCES public."user" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
