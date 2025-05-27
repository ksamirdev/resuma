import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "../components/Header";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="container-wrapper flex-1 py-4">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <TanStackRouterDevtools />
    </div>
  ),
});
