DROP TABLE IF EXISTS ShortenedURL;
CREATE TABLE ShortenedURL (id INTEGER PRIMARY KEY, hashed_value TEXT, raw_url TEXT);
INSERT INTO ShortenedURL (hashed_value, raw_url) VALUES ('uwiz7D', 'https://www.tutorialspoint.com/sqlite/sqlite_using_joins.htm');
