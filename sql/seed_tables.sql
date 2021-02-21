INSERT into users(lastname, firstname, email, password) 
VALUES
('Chen', 'Anastasia', 'asulya@gmail.com', crypt('password', gen_salt('bf')));
('Hawtree', 'Jo', 'johawtree@gmail.com', crypt('password', gen_salt('bf')));

INSERT INTO schedules(user_id, day, start_time, end_time)
VALUES
(1, 1, '2021-02-20 09:30:00+11', '2021-02-20 15:00:00+11');
(1, 2, '2021-02-20 08:45:00+11', '2021-02-20 12:00:00+11');
(2, 3, '2021-02-20 07:15:00+11', '2021-02-20 13:30:00+11');
(2, 4, '2021-02-20 10:30:00+11', '2021-02-20 18:15:00+11');