CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`service` varchar(255) NOT NULL,
	`appointmentDate` date NOT NULL,
	`timeSlot` varchar(32) NOT NULL,
	`provider` varchar(120) NOT NULL,
	`customerName` varchar(160) NOT NULL,
	`customerPhone` varchar(20) NOT NULL,
	`status` enum('requested','confirmed','cancelled') NOT NULL DEFAULT 'requested',
	`whatsappSentAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
