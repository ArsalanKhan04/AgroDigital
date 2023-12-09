CREATE TABLE Topic
(
  topic_id INT PRIMARY KEY IDENTITY(31000, 1),
  topic_name VARCHAR(40),
  total_messages INT,
  date_created DATETIME
)

CREATE TABLE Discussions
(
  discussion_id INT PRIMARY KEY IDENTITY(35000,1),
  user_id INT FOREIGN KEY REFERENCES Users(user_id),
  content VARCHAR(2000),
  topic_id INT FOREIGN KEY REFERENCES Topic(topic_id),
)
