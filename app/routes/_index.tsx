import type { MetaFunction } from "react-router";
import { useConfigurables } from "~/modules/configurables";

export const meta: MetaFunction = () => {
  return [
    { title: "HelloPage" },
    {
      name: "description",
      content: "A clean, single-section Hello World landing page.",
    },
  ];
};

export default function IndexPage() {
  const { config, loading } = useConfigurables();

  // Guard against SSR/hydration mismatch and the brief pre-config window.
  const headline = config?.heroHeadline ?? "";
  const subtext = config?.heroSubtext ?? "";
  const ctaLabel = config?.ctaLabel ?? "";
  const ctaHref = config?.ctaHref || "#";

  return (
    <main className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-background px-6 py-16">
      {/* Soft ambient accent glow — subtle, no heavy imagery */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{ backgroundColor: "var(--primary)" }}
      />

      <section className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        {loading ? (
          <HeroSkeleton />
        ) : (
          <>
            <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              {headline}
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {subtext}
            </p>

            {ctaLabel ? (
              <div className="mt-10">
                <a
                  href={ctaHref}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
                >
                  {ctaLabel}
                </a>
              </div>
            ) : null}
          </>
        )}
      </section>
    </main>
  );
}

function HeroSkeleton() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="h-14 w-3/4 animate-pulse rounded-2xl bg-muted sm:h-16 md:h-20" />
      <div className="mt-6 h-6 w-full max-w-xl animate-pulse rounded-xl bg-muted" />
      <div className="mt-3 h-6 w-2/3 animate-pulse rounded-xl bg-muted" />
      <div className="mt-10 h-12 w-40 animate-pulse rounded-full bg-muted" />
    </div>
  );
}
