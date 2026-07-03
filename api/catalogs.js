// api/catalogs.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Fetch variables provided in your Vercel Environment
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Missing Database Environment Variables' });
  }

  // Initialize Supabase Client
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Fetch catalogs from Supabase
    const { data, error } = await supabase
      .from('catalog')
      .select('id, catalog_name, catalog_image_url')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Send successful response
    return res.status(200).json(data);
  } catch (error) {
    console.error('Supabase Error:', error);
    return res.status(500).json({ error: 'Failed to fetch catalogs' });
  }
}
