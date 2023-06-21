DROP TABLE IF EXISTS todos;

CREATE TABLE todos(
    id serial PRIMARY KEY,
    todo_body varchar(50)
);

INSERT INTO todos (todo_body) VALUES (
    'make bed'
), (
    'brush teeth'
) , (
    'go to work'
);