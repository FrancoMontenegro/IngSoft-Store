CREATE TABLE public.carritos
(
    id SERIAL NOT NULL,
    cliente_rut character varying(10) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE public.carrito_items
(
    id SERIAL NOT NULL,
    carrito_id integer NOT NULL,
    producto_id integer NOT NULL,
    cantidad integer NOT NULL CHECK (cantidad > 0),
    PRIMARY KEY (id),
    UNIQUE (carrito_id, producto_id)
);

CREATE TABLE public.orden_items
(
    id SERIAL NOT NULL,
    orden_id integer NOT NULL,
    producto_id integer NOT NULL,
    cantidad integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE public.ordenes
(
    id SERIAL NOT NULL,
    cliente_rut character varying(10) NOT NULL,
    estado character varying(20) NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_DATE NOT NULL,
    monto real,
    total integer,
    PRIMARY KEY (id)
);

CREATE TABLE public.productos
(
    id SERIAL NOT NULL,
    nombre character varying(50) NOT NULL,
    precio real NOT NULL,
    descripcion text NOT NULL,
    stock integer,
    url_imagen character varying,
    PRIMARY KEY (id)
);

CREATE TABLE public.usuarios
(
    id SERIAL NOT NULL,
    correo character varying(100) UNIQUE NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido_p character varying(100) NOT NULL,
    apellido_m character varying(100) NOT NULL,
    fecha_ingreso timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE public.clientes
(
    rut character varying(10),
    usuario_id integer NOT NULL,
    password character varying(200),
    celular integer,
    direccion character varying(200),
    comuna character varying(100),
    estado boolean,
    PRIMARY KEY (rut)
);

CREATE TABLE public.administradores
(
    id SERIAL NOT NULL,
    usuario_id integer NOT NULL,
    password character varying(200),
    PRIMARY KEY (id)
);


ALTER TABLE public.carritos
    ADD FOREIGN KEY (cliente_rut)
    REFERENCES public.clientes (rut)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE public.carrito_items
    ADD FOREIGN KEY (carrito_id)
    REFERENCES public.carritos (id)
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE public.carrito_items
    ADD FOREIGN KEY (producto_id)
    REFERENCES public.productos (id)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE public.orden_items
    ADD FOREIGN KEY (orden_id)
    REFERENCES public.ordenes (id)
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE public.orden_items
    ADD FOREIGN KEY (producto_id)
    REFERENCES public.productos (id)
    ON DELETE SET NULL
    NOT VALID;


ALTER TABLE public.ordenes
    ADD FOREIGN KEY (cliente_rut)
    REFERENCES public.clientes (rut)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.clientes
    ADD FOREIGN KEY (usuario_id)
    REFERENCES public.usuarios (id)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.administradores
    ADD FOREIGN KEY (usuario_id)
    REFERENCES public.usuarios (id)
    ON DELETE CASCADE
    NOT VALID;
