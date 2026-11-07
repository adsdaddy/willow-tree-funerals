import { trpc } from "@/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

// Register service worker for cache-first performance
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // SW registration failed  -  continue without caching
    });
  });
}

// Report Core Web Vitals to GA4
if (typeof window !== 'undefined') {
  import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
    const sendToGA4 = ({ name, value, id }: { name: string; value: number; id: string }) => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', name, {
          event_category: 'Web Vitals',
          value: Math.round(name === 'CLS' ? value * 1000 : value),
          event_label: id,
          non_interaction: true,
        });
      }
    };
    onCLS(sendToGA4);
    onINP(sendToGA4);
    onFCP(sendToGA4);
    onLCP(sendToGA4);
    onTTFB(sendToGA4);
  }).catch(() => {});
}

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
