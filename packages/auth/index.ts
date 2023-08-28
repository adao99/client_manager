import Discord, { type DiscordProfile } from "@auth/core/providers/discord";
import type { DefaultSession } from "@auth/core/types";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import { db, eq, tableCreator } from "@acme/db";
import { users } from "@acme/db/schema/auth";

import { env } from "./env.mjs";

export type { Session } from "next-auth";

// Update this whenever adding new providers so that the client can
export const providers = ["discord"] as const;
export type OAuthProviders = (typeof providers)[number];

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental,
} = NextAuth({
  adapter: DrizzleAdapter(db, tableCreator),
  useSecureCookies: env.NODE_ENV === "production",
  providers: [
    Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async (params) => {
      //update user profile image if it has changed
      const discordProfile = params.profile as DiscordProfile;

      if (params.user === undefined) {
        return true;
      }

      if (params.user?.image !== discordProfile.image_url) {
        console.log("updating user image");
        await db
          .update(users)
          .set({
            image: discordProfile.image_url,
          })
          .where(eq(users.id, params.user.id));
      }

      return true;
    },
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },

    // @TODO - if you wanna have auth on the edge
    jwt: ({ token, profile }) => {
      if (profile?.id) {
        token.id = profile.id;
        token.image = profile.picture;
      }
      return token;
    },

    // @TODO
    authorized({ request, auth }) {
      return !!auth?.user;
    },
  },
});
