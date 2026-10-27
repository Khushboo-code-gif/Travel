import { supabase } from '@/lib/supabase'
import { MOCK_DESTINATIONS } from '@/data/mockDestinations'
import { Destination } from '@/types'

export async function getDestinations(): Promise<Destination[]> {
    if (!supabase) {
        console.log('Fetching destinations from MOCK DATA')
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))
        return MOCK_DESTINATIONS
    }

    try {
        const { data, error } = await supabase
            .from('destinations')
            .select('*')

        if (error) {
            console.error('Supabase error:', error)
            return MOCK_DESTINATIONS
        }

        if (!data || data.length === 0) {
            console.log('No data in Supabase, falling back to mock')
            return MOCK_DESTINATIONS
        }

        return data as Destination[]
    } catch (err) {
        console.error('Unexpected error fetching destinations:', err)
        return MOCK_DESTINATIONS
    }
}

export async function getDestinationById(id: string): Promise<Destination | undefined> {
    if (!supabase) {
        return MOCK_DESTINATIONS.find(d => d.id === id)
    }

    try {
        const { data, error } = await supabase
            .from('destinations')
            .select('*')
            .eq('id', id)
            .single()

        if (error || !data) {
            return MOCK_DESTINATIONS.find(d => d.id === id)
        }

        return data as Destination
    } catch {
        return MOCK_DESTINATIONS.find(d => d.id === id)
    }
}
