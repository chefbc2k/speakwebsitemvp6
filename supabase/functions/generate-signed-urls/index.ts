import { serve } from 'https://deno.land/std@0.188.0/http/server.ts'
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.46.0"

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req: Request) => {
  try {
    const { path } = await req.json()

    if (!path) {
      return new Response(
        JSON.stringify({ error: 'path is required' }),
        { status: 400 }
      )
    }

    const { data, error } = await supabase.storage
      .from('user-content')
      .createSignedUrl(path, 60 * 60) // 1-hour expiration

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ signedUrl: data.signedUrl }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error generating signed URL:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    )
  }
})