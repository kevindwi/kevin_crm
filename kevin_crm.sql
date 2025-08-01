--
-- PostgreSQL database cluster dump
--

-- Started on 2025-08-01 22:24:25 WIB

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE root;
ALTER ROLE root WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Ubuntu 17.5-1.pgdg24.04+1)

-- Started on 2025-08-01 22:24:26 WIB

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2025-08-01 22:24:26 WIB

--
-- PostgreSQL database dump complete
--

--
-- Database "kevin_crm" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Ubuntu 17.5-1.pgdg24.04+1)

-- Started on 2025-08-01 22:24:26 WIB

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3462 (class 1262 OID 41585)
-- Name: kevin_crm; Type: DATABASE; Schema: -; Owner: root
--

CREATE DATABASE kevin_crm WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE kevin_crm OWNER TO root;

\connect kevin_crm

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 217 (class 1259 OID 41586)
-- Name: cache; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache OWNER TO root;

--
-- TOC entry 218 (class 1259 OID 41591)
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache_locks OWNER TO root;

--
-- TOC entry 219 (class 1259 OID 41596)
-- Name: customer_products; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.customer_products (
    id bigint NOT NULL,
    customer_id bigint NOT NULL,
    product_id bigint NOT NULL,
    start_date date NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.customer_products OWNER TO root;

--
-- TOC entry 220 (class 1259 OID 41600)
-- Name: customer_products_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.customer_products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customer_products_id_seq OWNER TO root;

--
-- TOC entry 3463 (class 0 OID 0)
-- Dependencies: 220
-- Name: customer_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.customer_products_id_seq OWNED BY public.customer_products.id;


--
-- TOC entry 221 (class 1259 OID 41601)
-- Name: customers; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.customers (
    id bigint NOT NULL,
    lead_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    phone character varying(255),
    email character varying(255),
    address text,
    status character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.customers OWNER TO root;

--
-- TOC entry 222 (class 1259 OID 41606)
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customers_id_seq OWNER TO root;

--
-- TOC entry 3464 (class 0 OID 0)
-- Dependencies: 222
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- TOC entry 223 (class 1259 OID 41607)
-- Name: leads; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.leads (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255),
    phone character varying(255),
    address text,
    status character varying(255) DEFAULT 'new'::character varying NOT NULL,
    created_by bigint NOT NULL,
    notes character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.leads OWNER TO root;

--
-- TOC entry 224 (class 1259 OID 41613)
-- Name: leads_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.leads_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.leads_id_seq OWNER TO root;

--
-- TOC entry 3465 (class 0 OID 0)
-- Dependencies: 224
-- Name: leads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.leads_id_seq OWNED BY public.leads.id;


--
-- TOC entry 225 (class 1259 OID 41614)
-- Name: migrations; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO root;

--
-- TOC entry 226 (class 1259 OID 41617)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO root;

--
-- TOC entry 3466 (class 0 OID 0)
-- Dependencies: 226
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 227 (class 1259 OID 41618)
-- Name: products; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.products (
    id bigint NOT NULL,
    product_name character varying(255) NOT NULL,
    speed character varying(255) NOT NULL,
    price numeric(8,2) DEFAULT '0'::numeric NOT NULL,
    description text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.products OWNER TO root;

--
-- TOC entry 228 (class 1259 OID 41625)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO root;

--
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 228
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 229 (class 1259 OID 41626)
-- Name: projects; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.projects (
    id bigint NOT NULL,
    lead_id bigint NOT NULL,
    sales_id bigint NOT NULL,
    status character varying(255) NOT NULL,
    manager_id bigint,
    approval_date timestamp(0) without time zone,
    notes text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    product_id bigint NOT NULL
);


ALTER TABLE public.projects OWNER TO root;

--
-- TOC entry 230 (class 1259 OID 41631)
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.projects_id_seq OWNER TO root;

--
-- TOC entry 3468 (class 0 OID 0)
-- Dependencies: 230
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- TOC entry 231 (class 1259 OID 41632)
-- Name: sessions; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO root;

--
-- TOC entry 232 (class 1259 OID 41637)
-- Name: users; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    role character varying,
    remember_token character varying(255)
);


ALTER TABLE public.users OWNER TO root;

--
-- TOC entry 233 (class 1259 OID 41642)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO root;

--
-- TOC entry 3469 (class 0 OID 0)
-- Dependencies: 233
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3252 (class 2604 OID 41643)
-- Name: customer_products id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.customer_products ALTER COLUMN id SET DEFAULT nextval('public.customer_products_id_seq'::regclass);


--
-- TOC entry 3254 (class 2604 OID 41644)
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- TOC entry 3255 (class 2604 OID 41645)
-- Name: leads id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.leads ALTER COLUMN id SET DEFAULT nextval('public.leads_id_seq'::regclass);


--
-- TOC entry 3257 (class 2604 OID 41646)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3258 (class 2604 OID 41647)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 3261 (class 2604 OID 41648)
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- TOC entry 3262 (class 2604 OID 41649)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3440 (class 0 OID 41586)
-- Dependencies: 217
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.cache (key, value, expiration) FROM stdin;
\.


--
-- TOC entry 3441 (class 0 OID 41591)
-- Dependencies: 218
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.cache_locks (key, owner, expiration) FROM stdin;
\.


--
-- TOC entry 3442 (class 0 OID 41596)
-- Dependencies: 219
-- Data for Name: customer_products; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.customer_products (id, customer_id, product_id, start_date, is_active, created_at, updated_at) FROM stdin;
2	3	2	2025-08-01	t	2025-08-01 14:18:14	2025-08-01 14:18:14
\.


--
-- TOC entry 3444 (class 0 OID 41601)
-- Dependencies: 221
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.customers (id, lead_id, name, phone, email, address, status, created_at, updated_at) FROM stdin;
3	3	andi	086573652626	andi@email.com	Surabaya	active	2025-08-01 14:18:14	2025-08-01 14:18:14
\.


--
-- TOC entry 3446 (class 0 OID 41607)
-- Dependencies: 223
-- Data for Name: leads; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.leads (id, name, email, phone, address, status, created_by, notes, created_at, updated_at) FROM stdin;
2	ujang	ujang@example.com	086573652626	Surabaya	new	1	hello	2025-07-31 06:16:31	2025-07-31 06:16:31
3	andi	andi@email.com	086573652626	Surabaya	new	1	tes	2025-07-31 15:03:01	2025-07-31 15:03:01
\.


--
-- TOC entry 3448 (class 0 OID 41614)
-- Dependencies: 225
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.migrations (id, migration, batch) FROM stdin;
3	0001_01_01_000002_create_jobs_table	1
4	2025_07_31_040402_create_leads_table	2
5	2025_07_31_094603_create_products_table	3
6	2025_07_31_110649_create_projects_table	4
7	2025_07_31_123156_create_customers_table	4
8	2025_07_31_123255_create_customer_products_table	4
9	2025_07_31_152807_add_column_project_id_to_table_projects	5
10	2025_07_31_160358_add_nullable_to_manager_id_on_projects_table	6
11	2025_07_31_161149_add_column_product_id_to_table_projects	7
12	2025_07_31_161330_add_column_product_id_to_table_projects	8
13	0001_01_01_000001_create_cache_table	9
\.


--
-- TOC entry 3450 (class 0 OID 41618)
-- Dependencies: 227
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.products (id, product_name, speed, price, description, is_active, created_at, updated_at) FROM stdin;
1	Internet lambat	10 Mbps	150000.00	Lorem impsum	f	2025-07-31 10:39:32	2025-07-31 10:39:32
2	Internet cepat	30 Mbps	50000.00	Lorem ipsum	t	2025-07-31 10:40:27	2025-07-31 10:40:27
4	Super cepat	100 Mbps	300000.00	Lorem ipsum	t	2025-08-01 03:16:46	2025-08-01 03:16:46
\.


--
-- TOC entry 3452 (class 0 OID 41626)
-- Dependencies: 229
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.projects (id, lead_id, sales_id, status, manager_id, approval_date, notes, created_at, updated_at, product_id) FROM stdin;
6	2	1	waiting	\N	\N	\N	2025-08-01 14:14:34	2025-08-01 14:14:34	4
7	3	1	approved	3	2025-08-01 14:18:14	\N	2025-08-01 14:14:44	2025-08-01 14:18:14	2
\.


--
-- TOC entry 3454 (class 0 OID 41632)
-- Dependencies: 231
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
MXxUBu3cSLU6RaDIMGhkyD2OMvNmh4GZwvijdNvi	3	127.0.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36	YTo0OntzOjY6Il90b2tlbiI7czo0MDoibHdsRVpUcHA4eEVLancwWG5rZkgxQnZCTW1LRnFqUDRCdHI0SHp0RiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MztzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozMToiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2N1c3RvbWVycyI7fX0=	1754058192
\.


--
-- TOC entry 3455 (class 0 OID 41637)
-- Dependencies: 232
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.users (id, name, email, password, created_at, updated_at, role, remember_token) FROM stdin;
1	sales	sales@example.com	$2y$12$2svNXlOLz/5C5dJS8oBEoeqamgT1jD3wUwRvptyNzxxK1COgiZLUm	2025-07-30 11:54:18	2025-07-30 11:54:18	sales	\N
3	manager	manager@email.com	$2y$12$W3HYb02bVhTTwpEcaahf3elAoVRaVS8jVPkKXzCrARrwK4M214Cni	2025-08-01 09:29:09	2025-08-01 09:29:09	manager	\N
\.


--
-- TOC entry 3470 (class 0 OID 0)
-- Dependencies: 220
-- Name: customer_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.customer_products_id_seq', 2, true);


--
-- TOC entry 3471 (class 0 OID 0)
-- Dependencies: 222
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.customers_id_seq', 3, true);


--
-- TOC entry 3472 (class 0 OID 0)
-- Dependencies: 224
-- Name: leads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.leads_id_seq', 4, true);


--
-- TOC entry 3473 (class 0 OID 0)
-- Dependencies: 226
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.migrations_id_seq', 13, true);


--
-- TOC entry 3474 (class 0 OID 0)
-- Dependencies: 228
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.products_id_seq', 4, true);


--
-- TOC entry 3475 (class 0 OID 0)
-- Dependencies: 230
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.projects_id_seq', 7, true);


--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 233
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- TOC entry 3266 (class 2606 OID 41651)
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- TOC entry 3264 (class 2606 OID 41653)
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- TOC entry 3268 (class 2606 OID 41655)
-- Name: customer_products customer_products_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.customer_products
    ADD CONSTRAINT customer_products_pkey PRIMARY KEY (id);


--
-- TOC entry 3270 (class 2606 OID 41657)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- TOC entry 3272 (class 2606 OID 41659)
-- Name: leads leads_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);


--
-- TOC entry 3274 (class 2606 OID 41661)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3276 (class 2606 OID 41663)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 3278 (class 2606 OID 41665)
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- TOC entry 3281 (class 2606 OID 41667)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 3284 (class 2606 OID 41669)
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- TOC entry 3286 (class 2606 OID 41671)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3279 (class 1259 OID 41672)
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- TOC entry 3282 (class 1259 OID 41673)
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- TOC entry 3287 (class 2606 OID 41674)
-- Name: customer_products customer_products_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.customer_products
    ADD CONSTRAINT customer_products_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE CASCADE;


--
-- TOC entry 3288 (class 2606 OID 41679)
-- Name: customer_products customer_products_product_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.customer_products
    ADD CONSTRAINT customer_products_product_id_foreign FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 3289 (class 2606 OID 41684)
-- Name: customers customers_lead_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_lead_id_foreign FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE CASCADE;


--
-- TOC entry 3290 (class 2606 OID 41689)
-- Name: leads leads_created_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_created_by_foreign FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3291 (class 2606 OID 41694)
-- Name: projects projects_lead_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_lead_id_foreign FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE CASCADE;


--
-- TOC entry 3292 (class 2606 OID 41699)
-- Name: projects projects_manager_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3293 (class 2606 OID 41704)
-- Name: projects projects_product_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_product_id_foreign FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 3294 (class 2606 OID 41709)
-- Name: projects projects_sales_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_sales_id_foreign FOREIGN KEY (sales_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-08-01 22:24:27 WIB

--
-- PostgreSQL database dump complete
--

-- Completed on 2025-08-01 22:24:27 WIB

--
-- PostgreSQL database cluster dump complete
--
