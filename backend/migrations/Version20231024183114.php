<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231024183114 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create user';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL, surname VARCHAR(45) NOT NULL, email VARCHAR(45) NOT NULL, password VARCHAR(45) NOT NULL, phone_number VARCHAR(45) NOT NULL, city VARCHAR(45) NOT NULL, gender VARCHAR(45) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE user');
    }
}
