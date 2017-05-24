--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

-- Started on 2017-05-03 15:18:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 187 (class 1259 OID 16417)
-- Name: Articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "Articles" (
    id integer NOT NULL,
    title character varying(255),
    author character varying(255),
    body text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Articles" OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 16415)
-- Name: Articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Articles_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Articles_id_seq" OWNER TO postgres;

--
-- TOC entry 2128 (class 0 OID 0)
-- Dependencies: 186
-- Name: Articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Articles_id_seq" OWNED BY "Articles".id;


--
-- TOC entry 2002 (class 2604 OID 16420)
-- Name: Articles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Articles" ALTER COLUMN id SET DEFAULT nextval('"Articles_id_seq"'::regclass);


--
-- TOC entry 2123 (class 0 OID 16417)
-- Dependencies: 187
-- Data for Name: Articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "Articles" (id, title, author, body, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 2129 (class 0 OID 0)
-- Dependencies: 186
-- Name: Articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Articles_id_seq"', 1, false);


--
-- TOC entry 2004 (class 2606 OID 16425)
-- Name: Articles Articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Articles"
    ADD CONSTRAINT "Articles_pkey" PRIMARY KEY (id);


-- Completed on 2017-05-03 15:18:48

--
-- PostgreSQL database dump complete
--

