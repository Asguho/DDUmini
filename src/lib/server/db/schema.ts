import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	xp: integer('xp').notNull().default(0),
	lifes: integer('lifes').notNull().default(10), //.check('lifes_check', 'lifes BETWEEN 1 AND 10'),
	activityHistory: text('activity_history').notNull().default('{}'),
	showTutorial: boolean('show_tutorial').notNull().default(true),
	pfpB64: text('pfp-b64').notNull().default('')
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const games = pgTable('games', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	sentences: text('sentences').notNull()
});

export const completedGames = pgTable('completed_games', {
	id: serial('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	gameId: text('game_id').notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
