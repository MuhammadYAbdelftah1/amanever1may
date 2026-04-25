export default function ContactLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-b from-emerald-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 h-12 w-3/4 mx-auto rounded-lg bg-slate-200" />
            <div className="mb-8 h-6 w-full mx-auto rounded-lg bg-slate-200" />
            <div className="mb-8 flex justify-center gap-4">
              <div className="h-12 w-32 rounded-lg bg-slate-200" />
              <div className="h-12 w-40 rounded-lg bg-slate-200" />
            </div>
            <div className="flex justify-center gap-3">
              <div className="h-8 w-48 rounded-full bg-slate-200" />
              <div className="h-8 w-40 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Banner Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="h-32 rounded-2xl bg-red-50" />
      </div>

      {/* Channels Skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-48 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="mb-4 h-12 w-12 rounded-full bg-slate-200" />
              <div className="mb-2 h-6 w-3/4 rounded bg-slate-200" />
              <div className="mb-3 h-4 w-full rounded bg-slate-200" />
              <div className="h-5 w-1/2 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>

      {/* Form Skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="h-96 rounded-3xl border border-slate-200 bg-white p-8" />
      </div>
    </div>
  );
}
