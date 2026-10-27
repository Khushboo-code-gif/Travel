import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key';

const isMock = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (isMock) {
    console.warn('⚠️ Missing Supabase environment variables. MoodTrip AI is running in MOCK DATA mode.');
}

// Chainable mock helper
const createChain = () => {
    const chain: any = async () => ({ data: [], error: null });

    chain.select = () => chain;
    chain.from = () => chain;
    chain.eq = () => chain;
    chain.single = async () => ({ data: null, error: null });
    chain.limit = () => chain;
    chain.order = () => chain;
    chain.insert = () => chain;
    chain.update = () => chain;
    chain.delete = () => chain;
    chain.rpc = async () => ({ data: [], error: null });

    // Allow the chain itself to be awaited
    chain.then = (onfulfilled: any) => Promise.resolve({ data: [], error: null }).then(onfulfilled);

    return chain;
};

const mockClient = {
    from: () => createChain(),
    rpc: () => Promise.resolve({ data: [], error: null }),
    auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
    }
} as any;

export const supabase = isMock ? mockClient : createClient(supabaseUrl, supabaseKey);
export { isMock };
