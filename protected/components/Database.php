<?php
class Database
{
	public function create()
	{
		$mysql=Yii::app()->db;
		$mysql->setCharset("UTF8");
                
		$CREATE_USER=
		"create table IF NOT EXISTS user(id int auto_increment primary key,
		username varchar(255) not null,
		password varchar(255) not null,
		email varchar(255),
		accesslevel int not null default 0,
		acceptemail int not null default 0,
		) CHARACTER SET 'utf8'";
		$mysql->runSql($CREATE_USER);
		
                
                
                
                
                $CREATE_SCHOOL=
		"create table IF NOT EXISTS school(id int auto_increment primary key,
		userid int not null,
		schoolname varchar(255) not null,
		phone varchar(255),
		coverscope varchar(255),
		interestedpeople int default 0,
		signedpeople int default 0,
		description varchar(5000),
		avatar int default 0
		) CHARACTER SET 'utf8'";
		$mysql->runSql($CREATE_USER);
		
		$CREATE_COURSE=
		"create table IF NOT EXISTS course(id int auto_increment primary key,
		schoolid int not null,
		coursename varchar(255) not null,
		studyarea varchar(255) not null,
		price1 int not null,
		price2 int not null,
		description varchar(5000),
		) CHARACTER SET 'utf8'";		
	}
}