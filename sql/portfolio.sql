-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `project` (
  `id` INT NOT NULL,
  `name` VARCHAR(65) NULL,
  `description` VARCHAR(1000) NULL,
  `github_url` VARCHAR(150) NULL,
  `deploy_url` VARCHAR(150) NULL,
  `picture_url` VARCHAR(150) NULL,
  `techno` VARCHAR(150) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
