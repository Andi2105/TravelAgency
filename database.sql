-- DROP SCHEMA dbo;

CREATE SCHEMA dbo;
-- Travel.dbo.Categories definition

-- Drop table

-- DROP TABLE Travel.dbo.Categories;

CREATE TABLE Travel.dbo.Categories (
	CategoryID int IDENTITY(1,1) NOT NULL,
	Name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Description text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__Categori__19093A2BF484CBDD PRIMARY KEY (CategoryID),
	CONSTRAINT UQ__Categori__737584F6AB35DEA8 UNIQUE (Name)
);


-- Travel.dbo.Destinations definition

-- Drop table

-- DROP TABLE Travel.dbo.Destinations;

CREATE TABLE Travel.dbo.Destinations (
	DestinationID int IDENTITY(1,1) NOT NULL,
	Name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Country varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Description text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Price decimal(10,2) NOT NULL,
	CONSTRAINT PK__Destinat__DB5FE4AC9FC2B1B4 PRIMARY KEY (DestinationID)
);


-- Travel.dbo.Roles definition

-- Drop table

-- DROP TABLE Travel.dbo.Roles;

CREATE TABLE Travel.dbo.Roles (
	RoleID int IDENTITY(1,1) NOT NULL,
	RoleName varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Roles__8AFACE3A183940F5 PRIMARY KEY (RoleID),
	CONSTRAINT UQ__Roles__8A2B616086C29B15 UNIQUE (RoleName)
);


-- Travel.dbo.sysdiagrams definition

-- Drop table

-- DROP TABLE Travel.dbo.sysdiagrams;

CREATE TABLE Travel.dbo.sysdiagrams (
	name sysname COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	principal_id int NOT NULL,
	diagram_id int IDENTITY(1,1) NOT NULL,
	version int NULL,
	definition varbinary(MAX) NULL,
	CONSTRAINT PK__sysdiagr__C2B05B6135E361A4 PRIMARY KEY (diagram_id),
	CONSTRAINT UK_principal_name UNIQUE (principal_id,name)
);


-- Travel.dbo.Packages definition

-- Drop table

-- DROP TABLE Travel.dbo.Packages;

CREATE TABLE Travel.dbo.Packages (
	PackageID int IDENTITY(1,1) NOT NULL,
	Name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Description text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Price decimal(10,2) NOT NULL,
	Duration int NOT NULL,
	DestinationID int NULL,
	CategoryID int NULL,
	CONSTRAINT PK__Packages__322035EC6852CFC8 PRIMARY KEY (PackageID),
	CONSTRAINT FK__Packages__Catego__114A936A FOREIGN KEY (CategoryID) REFERENCES Travel.dbo.Categories(CategoryID) ON DELETE SET NULL,
	CONSTRAINT FK__Packages__Destin__10566F31 FOREIGN KEY (DestinationID) REFERENCES Travel.dbo.Destinations(DestinationID) ON DELETE SET NULL
);


-- Travel.dbo.Users definition

-- Drop table

-- DROP TABLE Travel.dbo.Users;

CREATE TABLE Travel.dbo.Users (
	UserID int IDENTITY(1,1) NOT NULL,
	Name varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Email varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Phone varchar(15) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Password varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	RoleID int NULL,
	CONSTRAINT PK__Users__1788CCAC6E79C6A8 PRIMARY KEY (UserID),
	CONSTRAINT UQ__Users__A9D10534DBD3BEEF UNIQUE (Email),
	CONSTRAINT FK__Users__RoleID__2645B050 FOREIGN KEY (RoleID) REFERENCES Travel.dbo.Roles(RoleID) ON DELETE SET NULL
);


-- Travel.dbo.Bookings definition

-- Drop table

-- DROP TABLE Travel.dbo.Bookings;

CREATE TABLE Travel.dbo.Bookings (
	BookingID int IDENTITY(1,1) NOT NULL,
	UserID int NULL,
	PackageID int NULL,
	BookingDate datetime DEFAULT getdate() NULL,
	Status varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'pending' NULL,
	TotalPrice decimal(10,2) NOT NULL,
	CONSTRAINT PK__Bookings__73951ACD76A5327B PRIMARY KEY (BookingID),
	CONSTRAINT FK__Bookings__Packag__17F790F9 FOREIGN KEY (PackageID) REFERENCES Travel.dbo.Packages(PackageID) ON DELETE CASCADE,
	CONSTRAINT FK__Bookings__UserID__17036CC0 FOREIGN KEY (UserID) REFERENCES Travel.dbo.Users(UserID) ON DELETE CASCADE
);
ALTER TABLE Travel.dbo.Bookings WITH NOCHECK ADD CONSTRAINT CK__Bookings__Status__151B244E CHECK (([Status]='cancelled' OR [Status]='confirmed' OR [Status]='pending'));


-- Travel.dbo.Payments definition

-- Drop table

-- DROP TABLE Travel.dbo.Payments;

CREATE TABLE Travel.dbo.Payments (
	PaymentID int IDENTITY(1,1) NOT NULL,
	BookingID int NULL,
	Amount decimal(10,2) NOT NULL,
	PaymentDate datetime DEFAULT getdate() NULL,
	PaymentMethod varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Status varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'pending' NULL,
	CONSTRAINT PK__Payments__9B556A588717E529 PRIMARY KEY (PaymentID),
	CONSTRAINT UQ__Payments__73951ACC44F6534B UNIQUE (BookingID),
	CONSTRAINT FK__Payments__Bookin__1F98B2C1 FOREIGN KEY (BookingID) REFERENCES Travel.dbo.Bookings(BookingID) ON DELETE CASCADE
);
ALTER TABLE Travel.dbo.Payments WITH NOCHECK ADD CONSTRAINT CK__Payments__Paymen__1CBC4616 CHECK (([PaymentMethod]='bank_transfer' OR [PaymentMethod]='paypal' OR [PaymentMethod]='credit_card'));
ALTER TABLE Travel.dbo.Payments WITH NOCHECK ADD CONSTRAINT CK__Payments__Status__1DB06A4F CHECK (([Status]='failed' OR [Status]='completed' OR [Status]='pending'));


-- Travel.dbo.Reviews definition

-- Drop table

-- DROP TABLE Travel.dbo.Reviews;

CREATE TABLE Travel.dbo.Reviews (
	ReviewID int IDENTITY(1,1) NOT NULL,
	UserID int NULL,
	PackageID int NULL,
	Rating int NULL,
	Comment text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ReviewDate datetime DEFAULT getdate() NULL,
	CONSTRAINT PK__Reviews__74BC79AE7EC1C663 PRIMARY KEY (ReviewID),
	CONSTRAINT FK__Reviews__Package__25518C17 FOREIGN KEY (PackageID) REFERENCES Travel.dbo.Packages(PackageID) ON DELETE CASCADE,
	CONSTRAINT FK__Reviews__UserID__245D67DE FOREIGN KEY (UserID) REFERENCES Travel.dbo.Users(UserID) ON DELETE CASCADE
);
ALTER TABLE Travel.dbo.Reviews WITH NOCHECK ADD CONSTRAINT CK__Reviews__Rating__22751F6C CHECK (([Rating]>=(1) AND [Rating]<=(5)));