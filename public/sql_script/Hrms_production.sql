create database hrms;
use hrms;


CREATE TABLE `hrms_employee` (
	`emp_id` int NOT NULL AUTO_INCREMENT,
	`email` varchar(25) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`isactivate` BOOLEAN NOT NULL,
	`isdelete` BOOLEAN NOT NULL,
	created_date timestamp default current_timestamp not null,
	PRIMARY KEY (`emp_id`)
);
CREATE TABLE `basic_info` (
	`basic_info_id` int NOT NULL AUTO_INCREMENT,
	`fk_emp_id` int NOT NULL,
	`first_name` varchar(15) NOT NULL,
	`last_name` varchar(20) NOT NULL,
	`birth_date` DATE NOT NULL,
	`relationship` varchar(10) NOT NULL,
	`blood_group` varchar(10) NOT NULL,
	`gender` varchar(10) NOT NULL,
	`city` varchar(15) NOT NULL,
	`state` varchar(10) NOT NULL,
	`profile_photo` varchar(255) NOT NULL,
	PRIMARY KEY (`basic_info_id`)
);





CREATE TABLE `deparment` (
	`deparment_Id` int NOT NULL AUTO_INCREMENT,
	`department_name` varchar(20) NOT NULL,
	PRIMARY KEY (`deparment_Id`)
);

CREATE TABLE `positions` (
	`positions_id` int NOT NULL AUTO_INCREMENT,
	`position_name` varchar(15) NOT NULL,
	PRIMARY KEY (`positions_id`)
);






CREATE TABLE `education` (
	`education_id` int NOT NULL AUTO_INCREMENT,
	`fk_emp_id` int NOT NULL,
	`course_name` varchar(15) NOT NULL,
	`passing_year` varchar(15) NOT NULL,
	`marks` varchar(10) NOT NULL,
	`college_school` varchar(35) NOT NULL,
	PRIMARY KEY (`education_id`)
);

CREATE TABLE `expreience` (
	`expreience_id` int NOT NULL AUTO_INCREMENT,
	`fk_emp_id` int NOT NULL ,
	`company_name` varchar(20) NOT NULL,
	`start_date` DATE NOT NULL,
	`end_date` DATE NOT NULL,
	`designation` varchar(20) NOT NULL,
	PRIMARY KEY (`expreience_id`)
);

CREATE TABLE `refrences` (
	`refrences_id` int NOT NULL AUTO_INCREMENT,
	`fk_emp_id` int NOT NULL ,
	`persion_name` varchar(15) NOT NULL,
	`persion_contact` varchar(25) NOT NULL,
	`persion_relation` varchar(15) NOT NULL,
	PRIMARY KEY (`refrences_id`)
);

CREATE TABLE `document` (
	`document_id` int NOT NULL AUTO_INCREMENT,
	`fk_emp_id` int NOT NULL,
	`resume` varchar(255) NOT NULL,
	`bank_detail` varchar(255) NOT NULL,
	`pan_card` varchar(255) NOT NULL,
	`aadhar_card` varchar(255) NOT NULL,
	
	PRIMARY KEY (`document_id`)
);

CREATE TABLE `emp_tag` (
	`emp_tag_id` int NOT NULL AUTO_INCREMENT,
	`fk_emp_id` int NOT NULL,
	`tag_name` varchar(20) NOT NULL,
	PRIMARY KEY (`emp_tag_id`)
);

CREATE TABLE `course_master` (
	`course_id (pk)` int NOT NULL AUTO_INCREMENT,
	`course_name` varchar(20) NOT NULL,
	PRIMARY KEY (`course_id (pk)`)
);

CREATE TABLE `state_master` (
	`state_id (pk)` int NOT NULL AUTO_INCREMENT,
	`state_name` varchar(10) NOT NULL,
	PRIMARY KEY (`state_id (pk)`)
);

CREATE TABLE `city_master` (
	`city_id` int NOT NULL AUTO_INCREMENT,
	`fk_state_id` int NOT NULL ,
	`city_name` varchar(10) NOT NULL,
	PRIMARY KEY (`city_id`)
);


create table leave_application(
	leave_id int not null auto_increment primary key,
    fk_emp_id int not null,
    leave_date date NOT NULL,
    leave_reason varchar(100),
    is_halfday int default 0,
    is_cto_approved int default 0,	
    is_hr_approved int default 0,
    foreign key (fk_emp_id) references hrms_employee(emp_id),
    created_date timestamp default current_timestamp not null
);

alter table leave_application add column leave_type varchar(10);

ALTER TABLE `basic_info` ADD CONSTRAINT `basic_info_fk0` FOREIGN KEY (`fk_emp_id`) REFERENCES `hrms_employee`(`emp_id`);



ALTER TABLE `education` ADD CONSTRAINT `education_fk0` FOREIGN KEY (`fk_emp_id`) REFERENCES `hrms_employee`(`emp_id`);

ALTER TABLE `expreience` ADD CONSTRAINT `expreience_fk0` FOREIGN KEY (`fk_emp_id`) REFERENCES `hrms_employee`(`emp_id`);

ALTER TABLE `refrences` ADD CONSTRAINT `refrences_fk0` FOREIGN KEY (`fk_emp_id`) REFERENCES `hrms_employee`(`emp_id`);

ALTER TABLE `document` ADD CONSTRAINT `document_fk0` FOREIGN KEY (`fk_emp_id`) REFERENCES `hrms_employee`(`emp_id`);

ALTER TABLE `emp_tag` ADD CONSTRAINT `emp_tag_fk0` FOREIGN KEY (`fk_emp_id`) REFERENCES `hrms_employee`(`emp_id`);

ALTER TABLE `city_master` ADD CONSTRAINT `city_master_fk0` FOREIGN KEY (`fk_state_id`) REFERENCES `state_master`(`state_id (pk)`);



















