import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import Drawer from "~/components/drawer.";
import { NavBar } from "~/components/navbar";
import { TRPCReactProvider } from "./providers";

export const runtime = "edge";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await auth();

  const hasSession = !!session?.user.id;

  const headersList = headers();
  const pathname = headersList.get("x-invoke-path");
  console.log("current path", pathname);
  console.log("hasSession", hasSession);
  console.log("session", session);
  if (!hasSession && pathname !== "/login") {
    console.log("redirecting to login");
    return redirect("/login");
  } else {
    return (
      <html lang="en">
        <body
          className={[
            "bg-base-100 text-base-content",
            "font-sans",
            fontSans.variable,
          ].join(" ")}
        >
          {/* {hasSession && <NavBar session={session} />} */}
          <TRPCReactProvider headers={headers()}>
            {!hasSession && props.children}
            {hasSession && <Drawer session={session}>{props.children}</Drawer>}
          </TRPCReactProvider>
        </body>
      </html>
    );
  }
}
