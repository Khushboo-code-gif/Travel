"use client";

import { useEffect, useRef, useState } from 'react';
import Map, { Marker, Popup, NavigationControl, ViewStateChangeEvent, MapLayerMouseEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Star, Sparkles } from 'lucide-react';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoibW9vZHRyaXBhaSIsImEiOiJjbHRyZzF6c2MwMjF6MmxvMG5ycG54ZzJyIn0.placeholder';

interface Destination {
    id: string;
    latitude: number;
    longitude: number;
    name: string;
    crowd_percentage: number;
    is_hidden_gem?: boolean;
    image_url?: string;
}

interface MapViewProps {
    destinations: Destination[];
}

export default function MapView({ destinations }: MapViewProps) {
    const [popupInfo, setPopupInfo] = useState<Destination | null>(null);
    const [viewState, setViewState] = useState({
        latitude: 20,
        longitude: 78,
        zoom: 3.5
    });

    return (
        <div className="w-full h-full relative">
            <Map
                {...viewState}
                onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/light-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                <NavigationControl position="top-right" />

                {destinations.map((dest) => (
                    <Marker
                        key={dest.id}
                        latitude={dest.latitude}
                        longitude={dest.longitude}
                        anchor="bottom"
                        onClick={(e: any) => {
                            e.originalEvent.stopPropagation();
                            setPopupInfo(dest);
                        }}
                    >
                        <div className={`p-1.5 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-110 transition-transform ${dest.is_hidden_gem ? 'bg-amber-500' : 'bg-primary'}`}>
                            {dest.is_hidden_gem ? <Sparkles className="w-3.5 h-3.5 text-white" /> : <MapPin className="w-3.5 h-3.5 text-white" />}
                        </div>
                    </Marker>
                ))}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.longitude)}
                        latitude={Number(popupInfo.latitude)}
                        onClose={() => setPopupInfo(null)}
                        closeButton={false}
                        className="rounded-2xl overflow-hidden"
                    >
                        <div className="p-3 bg-white min-w-[200px]">
                            <div className="h-32 rounded-xl overflow-hidden mb-3">
                                <img
                                    src={popupInfo.image_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'}
                                    className="w-full h-full object-cover"
                                    alt={popupInfo.name}
                                />
                            </div>
                            <h4 className="font-bold text-slate-900 mb-1">{popupInfo.name}</h4>
                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-400">
                                <Users className="w-3 h-3" /> {popupInfo.crowd_percentage}% Occupancy
                            </div>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}

function Users({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}
