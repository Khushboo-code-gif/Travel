/**
 * Haversine formula to calculate distance between two coordinates in km
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}

/**
 * Filter destinations by radius (km)
 */
export function filterByRadius(items: any[], centerLat: number, centerLon: number, radiusKm: number) {
    return items.filter(item => {
        if (!item.latitude || !item.longitude) return false;
        const distance = calculateDistance(centerLat, centerLon, parseFloat(item.latitude), parseFloat(item.longitude));
        item.distance_km = Math.round(distance * 100) / 100;
        return distance <= radiusKm;
    });
}
