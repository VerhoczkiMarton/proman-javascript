create table "user"
(
    id       serial  not null
        constraint user_pkey
            primary key,
    username varchar not null,
    password varchar not null
);

create table board
(
    id      serial  not null
        constraint board_pkey
            primary key,
    title   varchar not null,
    user_id integer not null
        constraint user_id
            references "user"
);

create table card
(
    id       serial  not null
        constraint card_pkey
            primary key,
    title    varchar not null,
    progress integer not null,
    board_id integer not null
        constraint board_id
            references board
);

