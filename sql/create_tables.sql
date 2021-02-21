DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    lastname VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password CHAR(60) NOT NULL
);

DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS schedules (
    schedule_id SERIAL PRIMARY KEY,
    user_id SMALLINT NOT NULL,
    day SMALLINT NOT NULL CHECK (day >= 1 AND day <= 7),
    start_time timestamptz,
    end_time timestamptz
);