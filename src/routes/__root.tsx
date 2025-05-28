import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import MainHeader from "../components/main-header";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col h-screen">
      <MainHeader />

      <main className="container-wrapper flex flex-1 py-4">
        <div className="container h-full">
          <Outlet />
        </div>
      </main>

      <TanStackRouterDevtools />
    </div>
  ),
});
