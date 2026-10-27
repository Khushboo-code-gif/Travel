import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
    try {
        const { query } = await request.json();

        if (!query) {
            return NextResponse.json({ error: 'Query is required' }, { status: 400 });
        }

        // STEP 1: Generate Embedding
        // In a real app, you'd call OpenAI or some other provider here
        /*
        const embeddingRes = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: query,
        });
        const embedding = embeddingRes.data[0].embedding;
        */

        // For demo, we'll use a mock vector if not available
        // OR we can just use Supabase's similarity search if the DB is set up

        // MOCK EMBEDDING (random 1536 dimension vector)
        const mockEmbedding = Array.from({ length: 1536 }, () => Math.random());

        // STEP 2: RPC Search
        const { data, error } = await supabase.rpc('match_destinations', {
            query_embedding: mockEmbedding,
            match_threshold: 0.5,
            match_count: 5,
        });

        if (error) {
            console.error("Semantic search failed:", error);
            // Fallback to text search if RPC fails/not deployed
            const { data: textData } = await supabase
                .from('destinations')
                .select('*')
                .ilike('name', `%${query}%`)
                .limit(5);
            return NextResponse.json({ data: textData || [] });
        }

        return NextResponse.json({ data });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
