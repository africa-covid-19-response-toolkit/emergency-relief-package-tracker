CREATE TABLE public.organizations
(
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    contact_name character varying(255) NOT NULL,
    contact_phone character varying(255) NOT NULL,
    pin_code integer NOT NULL UNIQUE,
    "createdat" timestamp with time zone NOT NULL,
    "updatedat" timestamp with time zone
);

CREATE TABLE public.subcities
(
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    area geometry,
    "createdat" timestamp with time zone NOT NULL,
    "updatedat" timestamp with time zone
);

CREATE TABLE public.collection_points
(
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    organization_id integer REFERENCES organizations,
    location geometry,
    "createdat" timestamp with time zone NOT NULL,
    "updatedat" timestamp with time zone
);

CREATE TABLE public.shipments
(
    id SERIAL PRIMARY KEY,
    organization_id integer REFERENCES organizations,
    collection_point_id integer REFERENCES collection_points,
    subcity_id integer REFERENCES subcities,
    number_of_packages integer NOT NULL,
    items jsonb,
    "createdat" timestamp with time zone NOT NULL,
    "updatedat" timestamp with time zone
);

CREATE TABLE public.items
(
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    unit character varying(255) NOT NULL,
    "createdat" timestamp with time zone NOT NULL,
    "updatedat" timestamp with time zone
);

CREATE TABLE public.deliveries
(
    id SERIAL PRIMARY KEY,    
    organization_id integer REFERENCES organizations,
    num_of_packages_delivered integer NOT NULL,
    location geometry,
    "createdat" timestamp with time zone NOT NULL,
    "updatedat" timestamp with time zone
);