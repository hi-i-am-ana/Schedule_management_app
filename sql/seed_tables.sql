INSERT into users(lastname, firstname, email, password, active) 
VALUES
('Musk', 'Elon', 'elon.musk@tesla.com', crypt('Gunsmoke&Lav1', gen_salt('bf')), true),
('Potter', 'Harry', 'harry.potter@gmail.com', crypt('Gunsmoke&Lav1', gen_salt('bf')), true),
('Karenina', 'Anna', 'anna.karenina@gmail.com', crypt('Gunsmoke&Lav1', gen_salt('bf')), true),
('OHara', 'Scarlett', 'scarlett.ohara@gmail.com', crypt('Gunsmoke&Lav1', gen_salt('bf')), true),
('Oldenburg', 'Elza', 'elsa@frozen.com', crypt('Gunsmoke&Lav1', gen_salt('bf')), true);

INSERT INTO schedules(user_id, day, start_time, end_time)
VALUES
(1, 1, '2021-02-20 09:30:00+11', '2021-02-20 15:00:00+11'),
(1, 2, '2021-02-20 08:45:00+11', '2021-02-20 12:00:00+11'),
(2, 3, '2021-02-20 07:15:00+11', '2021-02-20 13:30:00+11'),
(2, 4, '2021-02-20 10:30:00+11', '2021-02-20 18:15:00+11'),
(3, 5, '2021-02-20 09:30:00+11', '2021-02-20 15:00:00+11'),
(3, 6, '2021-02-20 08:45:00+11', '2021-02-20 12:00:00+11'),
(4, 7, '2021-02-20 07:15:00+11', '2021-02-20 13:30:00+11'),
(4, 1, '2021-02-20 10:30:00+11', '2021-02-20 18:15:00+11'),
(5, 2, '2021-02-20 09:30:00+11', '2021-02-20 15:00:00+11'),
(5, 3, '2021-02-20 08:45:00+11', '2021-02-20 12:00:00+11');