import { relations, sql } from "drizzle-orm";
import { int, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const site = mySqlTable("site", {
  id: serial("id").primaryKey(),
  domain: varchar("domain", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const sitesRelations = relations(site, ({ one }) => ({
  project: one(project, {
    fields: [site.id],
    references: [project.siteId],
  }),
}));

export const project = mySqlTable("project", {
  id: serial("id").primaryKey(),
  startedAt: timestamp("started_at").notNull(),
  finishedAt: timestamp("finished_at").notNull(),
  siteId: int("siteId").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const projectRelations = relations(project, ({ one }) => ({
  site: one(site, {
    fields: [project.siteId],
    references: [site.id],
  }),
}));

export const task = mySqlTable("task", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  requestedBy: varchar("requested_by", { length: 256 }),
  state: varchar("state", { length: 64 }).notNull(),
  type: varchar("type", { length: 16 }).notNull(),
  observations: varchar("observations", { length: 512 }),
  plan: varchar("plan", { length: 256 }),
});
