use nodejs;

create table users(
	idx int auto_increment primary key,
	userid varchar(50) unique not null,
	password varchar(200) not null,
	name varchar(20) not null,
	email varchar(50) not null,
	url varchar(200)
);

create table posts (
	 idx int auto_increment primary key,
     useridx int not null, 
     crateAt datetime default now(),
     text varchar(2000) not null,
     foreign key(useridx) references users(idx)
);


insert into users(userid, password, name, email) values("id1", "asdfgh", "김이박", "mail@gmail.com");
insert into users(userid, password, name, email) values("id2", "asdfgh", "최정한", "mail@naver.com");

insert into posts(useridx, crateAt, text) values(1, now(), "Lorem ipsum dolor sit, a");
insert into posts(useridx, crateAt, text) values(2, now(), "met con
sectetur adipisicing elit. ");
insert into posts(useridx, crateAt, text) values(3, now(), "met con
sectetur adipisicing elit. ");


select * from users;
select * from posts;

select * from users where userid = 'id1';
insert into users (userid, password, name, email, url) values('banana', '11111111', '김사과', 'apple@apple.com', 'https://randomuser.me/api/portraits/men/29.jpg');

update posts set text='qkRnls rmf' where idx=2;
select * from users;
drop table users;
drop table posts;
select * from posts;

select * from users where idx = 2;
select * from posts where idx = 2;

select u.userid, u.name, u.url, p.idx, p.useridx, p.text, p.crateAt from users as u join posts as p on u.idx = p.useridx;

delete from post where idx=2;

