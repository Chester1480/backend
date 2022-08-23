/*系統設定*/
CREATE TABLE SystemConfig (
  id serial PRIMARY KEY,
  key VARCHAR (30) NOT NULL,
  name VARCHAR (50) NOT NULL,
  description VARCHAR (220),
  value VARCHAR (255) NOT NULL
);
/*使用者登入*/
CREATE TABLE IF NOT EXISTS Account (
  id serial PRIMARY KEY,
  accountName VARCHAR (70) NOT NULL,
  password VARCHAR (150) NOT NULL,
  vertycode VARCHAR (180) NOT NULL,
  loginerrortimes int DEFAULT 0 NOT NULL,
  lastloginip cidr NOT NULL,
  lastlogintime timestamp,
  active SMALLINT DEFAULT 1 NOT NULL
);
COMMENT ON COLUMN Account.active IS '是否啟用'
/*使用者資訊*/
CREATE TABLE IF NOT EXISTS AccountInfo (
  id serial PRIMARY KEY,
  name VARCHAR (90) NOT NULL,
  email VARCHAR (150) NOT NULL,
  role VARCHAR (200) NOT NULL,
  photo VARCHAR (200) NOT NULL,
  phone VARCHAR (150),
  country VARCHAR (90) NOT NULL,
  active SMALLINT DEFAULT 1 NOT NULL,
  createtime timestamp NOT NULL DEFAULT NOW()
);
/*管理者資訊*/
CREATE TABLE Admin (
  id serial PRIMARY KEY,
  account VARCHAR (70) NOT NULL,
  password VARCHAR (150) NOT NULL,
  active SMALLINT DEFAULT 1 NOT NULL,
  name VARCHAR (30) NOT NULL,
  email VARCHAR (100) NOT NULL,
  active SMALLINT DEFAULT 1 NOT NULL,
  lastloginip cidr NOT NULL,
  createtime timestamp NOT NULL DEFAULT NOW()
);
/* datachangelog*/
CREATE TABLE AdminInfo (
  id serial PRIMARY KEY,
  method VARCHAR (100) NOT NULL,
  actioninfo VARCHAR (100) NOT NULL,
  userId INT NOT NULL,
  createtime timestamp NOT NULL DEFAULT NOW()
);
comment on column AdminInfo.actioninfo is '執行資訊';
CREATE TABLE Producer { id serial PRIMARY KEY,
name VARCHAR (80) NOT NULL,
};
CREATE TABLE ProductInfo (
  id serial PRIMARY KEY,
  name VARCHAR (80) NOT NULL,
  price DECIMAL NOT NULL,
  userId INT NOT NULL,
  createtime timestamp NOT NULL DEFAULT NOW()
);
comment on column AdminInfo.actioninfo is '執行資訊';