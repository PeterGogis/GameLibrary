PGDMP     -        
            }            gamelist    15.4    15.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16550    gamelist    DATABASE     z   CREATE DATABASE gamelist WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Greek_Greece.1252';
    DROP DATABASE gamelist;
                postgres    false            �            1259    16562    games    TABLE     �   CREATE TABLE public.games (
    id integer NOT NULL,
    title character varying,
    description character varying,
    rating smallint,
    CONSTRAINT games_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);
    DROP TABLE public.games;
       public         heap    postgres    false            �            1259    16561    games_id_seq    SEQUENCE     �   CREATE SEQUENCE public.games_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.games_id_seq;
       public          postgres    false    215            �           0    0    games_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.games_id_seq OWNED BY public.games.id;
          public          postgres    false    214            e           2604    16565    games id    DEFAULT     d   ALTER TABLE ONLY public.games ALTER COLUMN id SET DEFAULT nextval('public.games_id_seq'::regclass);
 7   ALTER TABLE public.games ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            �          0    16562    games 
   TABLE DATA           ?   COPY public.games (id, title, description, rating) FROM stdin;
    public          postgres    false    215   �
                   0    0    games_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.games_id_seq', 36, true);
          public          postgres    false    214            h           2606    16570    games games_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.games DROP CONSTRAINT games_pkey;
       public            postgres    false    215            �      x������ � �     