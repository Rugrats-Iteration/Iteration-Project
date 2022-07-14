--deletes the tables if they exists, then recreate the tables down below
--we do this so we can rerun at anytime an
--cascase allows us to delete the table, even if the table is referenced in other tables via a foreign key
drop table if exists Sellers cascade;
drop table if exists Buyers cascade;
drop table if exists Dishes cascade;
drop table if exists Orders cascade;

CREATE TABLE "public".Sellers
(
 pk_seller_id         serial PRIMARY KEY,
 seller_email         varchar(50) UNIQUE NOT NULL,
 password             varchar NOT NULL,
 seller_nickname      varchar(20) UNIQUE NOT NULL,
 seller_bio           varchar(50) NULL,
 kitchen_name         varchar(30) UNIQUE NULL,
 pickup_window_start  time NULL,
 pickup_window_end    time  NULL,
 seller_street_name   varchar(50)  NULL,
 seller_street_number integer  NULL,
 seller_city          varchar(20)  NULL,
 seller_zip_code      varchar(10)  NULL,
 cuisine              varchar NULL,
 market_enabled       boolean NULL
);


CREATE TABLE "public".Buyers
(
 pk_buyer_id         serial PRIMARY KEY,
 buyer_email         varchar(50) UNIQUE NOT NULL,
 password            varchar NOT NULL,
 buyer_nickname      varchar(20) UNIQUE NOT NULL,
 buyer_street_name   varchar(30) NULL,
 buyer_street_number integer NULL,
 buyer_zip_code      varchar(10) NULL,
 buyer_city          varchar(20) NULL
);

CREATE TABLE "public".Dishes
(
 pk_dish_id         serial PRIMARY KEY,
 dish_name          varchar(50) NOT NULL,
 description        varchar(100) NOT NULL,
 price              money NOT NULL,
 quantity_available integer NULL,
 dish_photo_url     varchar NULL,
 fk_seller_id       serial NOT NULL,
 CONSTRAINT fk_seller_id
 --on Delete Cascade, w/out this SQL won't let us delete anything if there are existing keys in another table
 --if Seller deletes their account, will go an delete all their dishes as well
 --On Delete Set Null - if Seller deletes their acc, will simply set seller_id to null (if we want to keep track of dishes, even if seller deletes their acc)
FOREIGN KEY ("fk_seller_id") references Sellers("pk_seller_id") on delete cascade
);

CREATE TABLE "public".Orders
(
 pk_order_id       serial PRIMARY KEY,
 fk_seller_id      serial NOT NULL,
 fk_buyer_id       serial NOT NULL,
 fk_dish_id        serial NOT NULL,
 quantity_of_order integer NOT NULL,
 seller_confirm    boolean NULL,
 buyer_confirm     boolean NULL,
 CONSTRAINT fk_seller_id
 FOREIGN KEY ("fk_seller_id") references Sellers("pk_seller_id"),
 CONSTRAINT fk_buyer_id
 FOREIGN KEY ("fk_buyer_id") references Buyers("pk_buyer_id") 
);