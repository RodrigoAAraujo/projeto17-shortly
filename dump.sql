--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    user_id integer NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" date DEFAULT now()
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "shortUrl" text NOT NULL UNIQUE,
    url text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    user_id integer NOT NULL,
    "createdAt" date DEFAULT now()
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    "createdAt" date DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, '54e58150-e95b-4aab-bf06-fb74dfda7467', 1, true, '2022-12-22');
INSERT INTO public.sessions VALUES (2, '44ca12ef-c3d5-4798-bfea-48209b202652', 2, true, '2022-12-22');
INSERT INTO public.sessions VALUES (3, 'aa9a577c-6276-49b6-88e7-d7f7a1a98bb3', 3, true, '2022-12-22');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (4, 'BCMUceTLj5JOmHswbHrx1', 'https://www.youtube.com/watch?v=Z6TGsLraL7E', 0, 2, '2022-12-22');
INSERT INTO public.urls VALUES (5, 'aY_ol7GaeALEc4KtOvChN', 'https://www.linguee.com.br/ingles-portugues/traducao/how.html', 0, 2, '2022-12-22');
INSERT INTO public.urls VALUES (1, 'xtssq7Ez0bFUGsPn6TDDo', 'https://www.hashtagtreinamentos.com/join-sql?gclid=CjwKCAiAnZCdBhBmEiwA8nDQxSb48Mhyns9w9xNA5SKTczBFn_FuiHEVhDGH5jn1lraSAxpDjlokXhoCnvMQAvD_BwE', 7, 1, '2022-12-22');
INSERT INTO public.urls VALUES (2, 'fWXw1aZabpjEm7Sb0TCja', 'https://www.linguee.com.br/ingles-portugues/traducao/how.html', 3, 1, '2022-12-22');
INSERT INTO public.urls VALUES (3, 'mE85DAmJ28SqMz7uIQlKJ', 'https://www.receiteria.com.br/receitas-de-macarrao/', 17, 1, '2022-12-22');
INSERT INTO public.urls VALUES (6, 'PZsy_lcPcsTmb4lP76ntW', 'https://www.hashtagtreinamentos.com/join-sql?gclid=CjwKCAiAnZCdBhBmEiwA8nDQxSb48Mhyns9w9xNA5SKTczBFn_FuiHEVhDGH5jn1lraSAxpDjlokXhoCnvMQAvD_BwE', 4, 3, '2022-12-22');
INSERT INTO public.urls VALUES (7, 'PC1LT5CgjI7kbZzh64Wyr', 'https://www.youtube.com/', 1, 3, '2022-12-22');
INSERT INTO public.urls VALUES (8, 'sxT7QWJzzShx7yOulSrWx', 'https://www.youtube.com/', 3, 3, '2022-12-22');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '$2b$12$nOxObp2rwjiUCNbyQbbdK.1OZCryrFEIAgT9N4wjgfX/mjLEanJlu', '2022-12-22');
INSERT INTO public.users VALUES (2, 'Marta', 'marta@driven.com.br', '$2b$12$aKRi4cSZvPwsPuXoCzFOXuAhWc2TLNvitAn4HPTkAnFbP/pAvtIle', '2022-12-22');
INSERT INTO public.users VALUES (3, 'Pablo', 'pablo@driven.com.br', '$2b$12$TDIxYyU0QUaqHYZsH/P6i.zRrYWlwREv/Kl/y.1W.72TU0q/3CHMu', '2022-12-22');
INSERT INTO public.users VALUES (4, 'Carlos', 'carlos@driven.com.br', '$2b$12$RBEQTlqANXilpsxo3nQ5G.1Fgb.VSeSUPBdv1/XKiOX8wQx3XJ53i', '2022-12-22');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 3, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: urls urls_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

