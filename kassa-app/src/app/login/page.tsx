"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-obsidian mb-2">
              Sign in to KA<span className="text-gold font-bold">§§</span>A
            </h1>
            <p className="text-sm text-driftwood">
              Enter your email to receive a magic link
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-driftwood mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2.5 text-sm border border-sandstone rounded-md bg-white text-obsidian placeholder:text-driftwood/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
              />
            </div>
            <Button className="w-full" size="lg">
              Send Magic Link
            </Button>
          </form>

          <p className="text-[10px] text-driftwood text-center mt-6">
            No account? We&apos;ll create one when you click the link.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
