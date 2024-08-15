-- 20240713215122_add_welcome_email_sent.sql

-- Ajoutez une colonne welcomeEmailSent à la table User
ALTER TABLE `User` ADD COLUMN `welcomeEmailSent` BOOLEAN DEFAULT FALSE;

-- (Facultatif) Ajouter une commande pour créer un index si nécessaire
-- CREATE INDEX `index_name` ON `User` (`welcomeEmailSent`);