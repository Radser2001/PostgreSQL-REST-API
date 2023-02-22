CREATE DATABASE perntodo

CREATE TABLE todo(
    -- SERIAL -> increment the primary key
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(250)
);