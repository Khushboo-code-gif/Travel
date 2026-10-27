import { supabase } from '../src/lib/supabaseClient';

async function validateDatabase() {
    console.log('🚀 Starting Database Validation Scan...');
    const results: any = {
        destinations: { total: 0, critical_nulls: [], duplicate_slugs: [], duplicate_coords: [] },
        hotels: { total: 0, critical_nulls: [], broken_relations: [] },
        restaurants: { total: 0, critical_nulls: [], broken_relations: [] },
        media: { total: 0, missing_files: [], orphaned: [] }
    };

    // 1. Validate Destinations
    const { data: dests } = await supabase.from('destinations').select('*');
    if (dests) {
        results.destinations.total = dests.length;
        const slugs = new Set();
        const coords = new Set();

        dests.forEach((d: any) => {
            // Critical Nulls
            if (!d.name || !d.slug || !d.state || !d.latitude || !d.longitude) {
                results.destinations.critical_nulls.push({ id: d.id, name: d.name });
            }
            // Duplicate Slugs
            if (slugs.has(d.slug)) {
                results.destinations.duplicate_slugs.push(d.slug);
            }
            slugs.add(d.slug);
            // Duplicate Coords
            const coordKey = `${d.latitude},${d.longitude}`;
            if (coords.has(coordKey)) {
                results.destinations.duplicate_coords.push({ name: d.name, coords: coordKey });
            }
            coords.add(coordKey);
        });
    }

    // 2. Validate Hotels & Relations
    const { data: hotels } = await supabase.from('hotels').select('id, name, destination_id');
    if (hotels) {
        results.hotels.total = hotels.length;
        const destIds = new Set(dests?.map((d: any) => d.id) || []);
        hotels.forEach((h: any) => {
            if (!destIds.has(h.destination_id)) {
                results.hotels.broken_relations.push({ type: 'Hotel', name: h.name, dest_id: h.destination_id });
            }
        });
    }

    console.log('✅ Validation Complete. Summary:');
    console.dir(results, { depth: null });

    return results;
}

validateDatabase().catch(console.error);
