INSERT INTO account (username, pass_hash, role, student_id, real_name)
             VALUES ('wsa', '$argon2id$v=19$m=102400,t=2,p=8$8T6HMIaQklLK+d+bMyaEUA$gGDGdUJw8YC6SuxqFJxy4A', 'TA', 'b09705017', '王紹安');

INSERT INTO account (username, pass_hash, role, student_id, real_name)
             VALUES ('daphne', '$argon2id$v=19$m=102400,t=2,p=8$8T6HMIaQklLK+d+bMyaEUA$gGDGdUJw8YC6SuxqFJxy4A', 'TA', 'b09705005', '侯維書');

INSERT INTO account (username, pass_hash, role, student_id, real_name)
             VALUES ('jtc', '$argon2id$v=19$m=102400,t=2,p=8$8T6HMIaQklLK+d+bMyaEUA$gGDGdUJw8YC6SuxqFJxy4A', 'TA', 'b09705001', '陳杰彤');

INSERT INTO s3_file (uuid, key, bucket)
             VALUES ('7cbfc374-e0f8-42c4-b832-b0e75940f872', '7cbfc374-e0f8-42c4-b832-b0e75940f872', 'temp');

INSERT INTO problem (title, testcase_file_uuid, filename, start_time, end_time, description)
             VALUES ('hack1', '7cbfc374-e0f8-42c4-b832-b0e75940f872', 'cypress.zip', '2021-12-10', '2021-12-17', 'This is a test problem');



