import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Define environment variables for Supabase initialization
const SUPABASE_URL: string = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY: string = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Initialize the Supabase client
const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface UserRequest {
  user_id: string;
}

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    // Parse the incoming request to extract the user ID
    const { user_id }: UserRequest = await req.json();

    // Define the folder paths for the user
    const folders: string[] = [
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
    ];

    // Iterate through the folders to create them with placeholder files
    for (const folder of folders) {
      const { error } = await supabase.storage
        .from('user-storage') // Reference your main bucket
        .upload(`${folder}placeholder.txt`, new Blob(['Placeholder content']), {
          cacheControl: '3600', // Optional: Set cache control for optimization
          upsert: true, // Ensures folder creation if it already exists
        });

      if (error) {
        throw new Error(`Failed to create folder: ${folder} - ${error.message}`);
      }
    }
    // Return success response
    return Response.json({ message: 'Folders created successfully' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error creating folders:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};