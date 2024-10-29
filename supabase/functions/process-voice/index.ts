import { serve } from 'https://deno.land/std@0.188.0/http/server.ts'
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.46.0"

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req: Request) => {
  try {
    const { user_id, voice_data } = await req.json()

    if (!user_id || !voice_data) {
      return new Response(
        JSON.stringify({ error: 'user_id and voice_data are required' }),
        { status: 400 }
      )
    }

    // Save voice data to storage
    const { data, error } = await supabase.storage
      .from('user-content')
      .upload(
        `voice_clips/${user_id}/voice_clips/${Date.now()}.wav`,
        new Blob([Uint8Array.from(atob(voice_data), c => c.charCodeAt(0))]),
        {
          contentType: 'audio/wav',
        }
      )

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ message: 'Voice data saved successfully', data }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing voice data:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    )
  }
})
