import { pgTable, serial, text, integer, timestamp, check, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	xp: integer('xp').notNull().default(0),
	lifes: integer('lifes').notNull().default(10), //.check('lifes_check', 'lifes BETWEEN 1 AND 10'),
	activityHistory: text('activity_history').notNull().default('{}'),
	showTutorial: boolean('show_tutorial').notNull().default(true)
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
