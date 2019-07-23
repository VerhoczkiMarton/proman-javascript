--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4 (Ubuntu 11.4-1.pgdg18.04+1)
-- Dumped by pg_dump version 11.4 (Ubuntu 11.4-1.pgdg18.04+1)

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

DROP DATABASE IF EXISTS proman;
--
-- Name: proman; Type: DATABASE; Schema: -; Owner: verho
--

CREATE DATABASE proman WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE proman;

\connect proman

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: board; Type: TABLE; Schema: public; Owner: verho
--

CREATE TABLE public.board (
    id integer NOT NULL,
    title character varying NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.board OWNER TO verho;

--
-- Name: board_id_seq; Type: SEQUENCE; Schema: public; Owner: verho
--

CREATE SEQUENCE public.board_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.board_id_seq OWNER TO verho;

--
-- Name: board_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: verho
--

ALTER SEQUENCE public.board_id_seq OWNED BY public.board.id;


--
-- Name: card; Type: TABLE; Schema: public; Owner: verho
--

CREATE TABLE public.card (
    id integer NOT NULL,
    title character varying NOT NULL,
    progress integer NOT NULL,
    board_id integer NOT NULL
);


ALTER TABLE public.card OWNER TO verho;

--
-- Name: card_id_seq; Type: SEQUENCE; Schema: public; Owner: verho
--

CREATE SEQUENCE public.card_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.card_id_seq OWNER TO verho;

--
-- Name: card_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: verho
--

ALTER SEQUENCE public.card_id_seq OWNED BY public.card.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: verho
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO verho;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: verho
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO verho;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: verho
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: board id; Type: DEFAULT; Schema: public; Owner: verho
--

ALTER TABLE ONLY public.board ALTER COLUMN id SET DEFAULT nextval('public.board_id_seq'::regclass);


--
-- Name: card id; Type: DEFAULT; Schema: public; Owner: verho
--

ALTER TABLE ONLY public.card ALTER COLUMN id SET DEFAULT nextval('public.card_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: verho
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: board; Type: TABLE DATA; Schema: public; Owner: verho
--



--
-- Data for Name: card; Type: TABLE DATA; Schema: public; Owner: verho
--



--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: verho
--



--
-- Name: board_id_seq; Type: SEQUENCE SET; Schema: public; Owner: verho
--

SELECT pg_catalog.setval('public.board_id_seq', 1, false);


--
-- Name: card_id_seq; Type: SEQUENCE SET; Schema: public; Owner: verho
--

SELECT pg_catalog.setval('public.card_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: verho
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- Name: board board_pkey; Type: CONSTRAINT; Schema: public; Owner: verho
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_pkey PRIMARY KEY (id);


--
-- Name: card card_pkey; Type: CONSTRAINT; Schema: public; Owner: verho
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT card_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: verho
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: card board_id; Type: FK CONSTRAINT; Schema: public; Owner: verho
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT board_id FOREIGN KEY (board_id) REFERENCES public.board(id);


--
-- Name: board user_id; Type: FK CONSTRAINT; Schema: public; Owner: verho
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

