import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest } from "next/server";

export const createClient = (request: NextRequest) => {
  // Create a response to modify cookies on
  const response = new Response(null, { headers: request.headers });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.headers.set('Set-Cookie', `${name}=${value}; ${options ? Object.entries(options).map(([key, val]) => `${key}=${val}`).join('; ') : ''}`);
          });
        },
      },
    },
  );

  return response;
};
