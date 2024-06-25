

CREATE SCHEMA IF NOT EXISTS `expenses` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;

USE `expenses` ;





-- -----------------------------------------------------

-- Table `expenses`.`type_category`

-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `expenses`.`type_category` (

  `id` BIGINT NOT NULL AUTO_INCREMENT,

  `name` VARCHAR(20) NOT NULL,

  PRIMARY KEY (`id`),

  UNIQUE INDEX `name` (`name` ASC) VISIBLE)

ENGINE = InnoDB

AUTO_INCREMENT = 3

DEFAULT CHARACTER SET = utf8mb4

COLLATE = utf8mb4_0900_ai_ci;



-- -----------------------------------------------------

-- Table `expenses`.`expenses1_categorymodel`

-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `expenses`.`expenses1_categorymodel` (

  `id` BIGINT NOT NULL AUTO_INCREMENT,

  `title` VARCHAR(30) NOT NULL,

  `fk_id_type_id` BIGINT NOT NULL,

  PRIMARY KEY (`id`),

  UNIQUE INDEX `title` (`title` ASC) VISIBLE,

  INDEX `expenses1_categorymo_fk_id_type_id_9c1af4f5_fk_type_cate` (`fk_id_type_id` ASC) VISIBLE,

  CONSTRAINT `expenses1_categorymo_fk_id_type_id_9c1af4f5_fk_type_cate`

    FOREIGN KEY (`fk_id_type_id`)

    REFERENCES `expenses`.`type_category` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)

ENGINE = InnoDB

AUTO_INCREMENT = 32

DEFAULT CHARACTER SET = utf8mb4

COLLATE = utf8mb4_0900_ai_ci;





-- -----------------------------------------------------

-- Table `expenses`.`expenses1_recordmodel`

-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `expenses`.`expenses1_recordmodel` (

  `id` BIGINT NOT NULL AUTO_INCREMENT,

  `amount` DECIMAL(10,2) NOT NULL,

  `note` LONGTEXT NULL DEFAULT NULL,

  `register_date` DATE NOT NULL,

  `fk_id_category_id` BIGINT NOT NULL,

  PRIMARY KEY (`id`),

  INDEX `expenses1_recordmode_fk_id_category_id_c47b1d22_fk_expenses1` (`fk_id_category_id` ASC) VISIBLE,

  CONSTRAINT `expenses1_recordmode_fk_id_category_id_c47b1d22_fk_expenses1`

    FOREIGN KEY (`fk_id_category_id`)

    REFERENCES `expenses`.`expenses1_categorymodel` (`id`))

ENGINE = InnoDB

AUTO_INCREMENT = 27

DEFAULT CHARACTER SET = utf8mb4

COLLATE = utf8mb4_0900_ai_ci;



USE `expenses` ;



-- -----------------------------------------------------

-- procedure GetAmountsWeek

-- -----------------------------------------------------



DELIMITER $$

USE `expenses`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAmountsWeek`(IN date_week DATE)

SELECT SUM(er.amount) as amount, DAYNAME(er.register_date) as register_day

	FROM expenses1_recordmodel er

	WHERE YEAR(er.register_date) = YEAR(date_week)

	AND WEEK(er.register_date, 1) = WEEK(date_week, 1) AND er.amount > 0

	GROUP BY DAYNAME(er.register_date);$$



DELIMITER ;



-- -----------------------------------------------------

-- procedure GetBalances

-- -----------------------------------------------------



DELIMITER $$

USE `expenses`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetBalances`()

BEGIN

    SELECT 

        SUM(er.amount) AS total_balance, 

        (SELECT SUM(er.amount) FROM expenses1_recordmodel er WHERE er.amount > 0) AS total_amount,

        (SELECT SUM(er.amount) FROM expenses1_recordmodel er WHERE er.amount < 0) AS total_expense 

    FROM expenses1_recordmodel er;

END$$



DELIMITER ;



-- -----------------------------------------------------

-- procedure GetExpensesWeek

-- -----------------------------------------------------



DELIMITER $$

USE `expenses`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetExpensesWeek`(IN date_week DATE)

SELECT SUM(er.amount) as amount, DAYNAME(er.register_date) as register_day

	FROM expenses1_recordmodel er

	WHERE YEAR(er.register_date) = YEAR(date_week)

	AND WEEK(er.register_date, 1) = WEEK(date_week, 1) AND er.amount < 0

	GROUP BY DAYNAME(er.register_date);$$



DELIMITER ;



-- -----------------------------------------------------

-- procedure GetStadisticRecords

-- -----------------------------------------------------



DELIMITER $$

USE `expenses`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetStadisticRecords`(IN type_id INT)

SELECT er.amount, er.note from expenses1_recordmodel er 

	INNER JOIN expenses1_categorymodel ec on ec.id = er.fk_id_category_id

	WHERE ec.fk_id_type_id = type_id;$$



DELIMITER ;





INSERT INTO `expenses`.`type_category`(name) VALUES ('EXPENSE'), ('INCOME');

