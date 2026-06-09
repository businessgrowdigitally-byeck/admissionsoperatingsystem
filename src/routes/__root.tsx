import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter,
  HeadContent, Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-semibold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page isn't part of AdmitOS yet.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant">Back to Mission Control</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">Something didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head back to your dashboard.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant">Try again</button>
          <a href="/" className="rounded-xl border border-border bg-surface-elevated px-4 py-2 text-sm font-medium">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AdmitOS | Mission Control" },
      { name: "description", content: "AdmitOS: Elite admissions management platform for Ivy-bound applicants. Essays, deadlines, testing, financial aid — all in one place." },
      { name: "theme-color", content: "#57068C" },
      { property: "og:title", content: "AdmitOS | Mission Control" },
      { property: "og:description", content: "AdmitOS: Elite admissions management platform for Ivy-bound applicants. Essays, deadlines, testing, financial aid — all in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "AdmitOS | Mission Control" },
      { name: "twitter:description", content: "AdmitOS: Elite admissions management platform for Ivy-bound applicants. Essays, deadlines, testing, financial aid — all in one place." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5dd6d339-037e-407f-b077-eaefe66aaeb6/id-preview-e84d3ae5--78fd462d-8a93-4abb-a827-92797be01cdb.lovable.app-1780946715034.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5dd6d339-037e-407f-b077-eaefe66aaeb6/id-preview-e84d3ae5--78fd462d-8a93-4abb-a827-92797be01cdb.lovable.app-1780946715034.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "google-site-verification", content: "0qoFP7TNm4IU2ZZFs_6ChVEAAYK7_HAuo89H0WZ9O-8" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
