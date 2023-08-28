import type { ComponentProps } from "react";

import type { OAuthProviders } from "@acme/auth";
import { CSRF_experimental } from "@acme/auth";

import { Button } from "./ui/button";

export function SignIn({
  provider,
  ...props
}: { provider: OAuthProviders } & ComponentProps<"button">) {
  return (
    <form action={`/api/auth/signin/${provider}`} method="post">
      <Button className={props.className}> Sign In</Button>
      <CSRF_experimental />
    </form>
  );
}

export function SignOut(props: ComponentProps<"button">) {
  return (
    <form action="/api/auth/signout" method="post">
      <button className={props.className}>Logout</button>
      <CSRF_experimental />
    </form>
  );
}
