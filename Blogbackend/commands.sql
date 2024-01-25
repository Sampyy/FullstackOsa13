CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0);
insert into blogs (author, url, title, likes) values ('Matti', 'www.joku.com', 'Blogi 5', 5);
insert into blogs (author, url, title) values ('Pekka', 'www.google.com', 'Something something');