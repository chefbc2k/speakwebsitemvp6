import { createClient } from "https://esm.sh/@supabase/supabase-js@2.46.0"
import { serve } from 'https://deno.land/std@0.188.0/http/server.ts'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req: Request) => {
  try {
    const { user_id } = await req.json()
    
    if (!user_id) {
      return new Response(
        JSON.stringify({ error: 'user_id is required' }),
        { status: 400 }
      )
    }

    // Comprehensive folder structure
    const folders = [
      `profile/${user_id}/avatars/`,
      `profile/${user_id}/metadata/`,
      `voice_clips/${user_id}/raw_clips/`,
      `voice_clips/${user_id}/processed_clips/`,
      `voice_clips/${user_id}/metadata/`,
      `nfts/${user_id}/images/`,
      `nfts/${user_id}/videos/`,
      `nfts/${user_id}/metadata/`,
      `contracts/${user_id}/pdfs/`,
      `contracts/${user_id}/agreements/`,
      `contracts/${user_id}/metadata/`,
      `transactions/${user_id}/receipts/`,
      `transactions/${user_id}/logs/`,
      `transactions/${user_id}/metadata/`,
      `activity_logs/${user_id}/reports/`,
      `activity_logs/${user_id}/audit_trails/`,
      `activity_logs/${user_id}/summaries/`,
      `archive_data/${user_id}/old_nfts/`,
      `archive_data/${user_id}/retired_contracts/`,
      `archive_data/${user_id}/legacy_logs/`,
    ]

    // Create folders by uploading empty placeholders
    const results = await Promise.all(
      folders.map(async (path) => {
        try {
          const { error } = await supabase.storage
            .from('user-content') // Make sure this bucket exists
            .upload(`${path}.placeholder`, new Blob(['']))

          if (error) {
            throw error
          }
          return { path, success: true }
        } catch (error) {
          console.error(`Error creating ${path}:`, error)
          return { path, success: false, error }
        }
      })
    )

    return new Response(
      JSON.stringify({ message: 'Storage structure created', results }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    )
  }
})