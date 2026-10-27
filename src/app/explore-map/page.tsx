"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Map, { Source, Layer, Marker, Popup, NavigationControl, MapRef, ViewStateChangeEvent } from 'react-map-gl/mapbox';
import type { GeoJSONSource } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
    Search, MapPin, Star, Sparkles, Filter,
    X, ChevronRight, Info, Compass, Heart,
    Wind, Flame, Zap, Droplet, Coffee, Palette, User, Trees, Landmark, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoibW9vZHRyaXBhaSIsImEiOiJjbHRyZzF6c2MwMjF6MmxvMG5ycG54ZzJyIn0.placeholder';

const moods = [
    { name: 'Burnt Out', icon: Wind, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Romantic', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50' },
    { name: 'Adventure', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
    { name: 'Detox', icon: Zap, color: 'text-green-500', bg: 'bg-green-50' },
    { name: 'Party', icon: Droplet, color: 'text-purple-500', bg: 'bg-purple-50' },
    { name: 'Creative', icon: Palette, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { name: 'Solo Reflection', icon: User, color: 'text-amber-500', bg: 'bg-amber-50' },
    { name: 'Nature Escape', icon: Trees, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { name: 'Heritage Walk', icon: Landmark, color: 'text-brown-500', bg: 'bg-stone-50' },
    { name: 'Urban Vibe', icon: Building2, color: 'text-slate-500', bg: 'bg-slate-50' }
];

export default function ExploreMapPage() {
    const mapRef = useRef<MapRef>(null);
    const [viewState, setViewState] = useState({
        latitude: 20,
        longitude: 40,
        zoom: 2.5
    });
    const [locations, setLocations] = useState<any>({ type: 'FeatureCollection', features: [] });
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedPoint, setSelectedPoint] = useState<any>(null);
    const [currentMood, setCurrentMood] = useState<string | null>(null);
    const [isHiddenGem, setIsHiddenGem] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchLocations = async () => {
        if (!mapRef.current) return;
        const bounds = mapRef.current.getBounds();
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();

        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                swLat: sw.lat.toString(),
                swLng: sw.lng.toString(),
                neLat: ne.lat.toString(),
                neLng: ne.lng.toString(),
                zoom: mapRef.current.getZoom().toString(),
                isHiddenGem: isHiddenGem.toString(),
            });

            if (currentMood) params.append('mood', currentMood);
            if (searchQuery) params.append('query', searchQuery);

            const res = await fetch(`/api/locations?${params.toString()}`);
            const data = await res.json();
            setLocations(data);
        } catch (err) {
            console.error("Fetch failed:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchLocations();
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [viewState, currentMood, isHiddenGem]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchLocations();
    };

    const clusterLayer: any = {
        id: 'clusters',
        type: 'circle',
        source: 'locations',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
            'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
        }
    };

    const clusterCountLayer: any = {
        id: 'cluster-count',
        type: 'symbol',
        source: 'locations',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    };

    const unclusteredPointLayer: any = {
        id: 'unclustered-point',
        type: 'circle',
        source: 'locations',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#3b82f6',
            'circle-radius': 8,
            'circle-stroke-width': 3,
            'circle-stroke-color': '#fff'
        }
    };

    const onMapClick = (event: any) => {
        const feature = event.features[0];
        if (feature) {
            if (feature.layer.id === 'clusters') {
                const clusterId = feature.properties.cluster_id;
                const source = mapRef.current?.getSource('locations') as GeoJSONSource;
                source.getClusterExpansionZoom(clusterId, (err, zoom) => {
                    if (err || zoom === null || zoom === undefined) return;
                    mapRef.current?.easeTo({
                        center: (feature.geometry as any).coordinates,
                        zoom: zoom + 0.5
                    });
                });
            } else {
                setSelectedPoint(feature.properties);
                setSelectedId(feature.properties.id);
            }
        } else {
            setSelectedPoint(null);
            setSelectedId(null);
        }
    };

    return (
        <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-950">
            <Navbar />

            {/* Top Filter Bar */}
            <div className="bg-white/90 backdrop-blur-xl border-b border-slate-200 z-10 px-6 py-4 flex items-center gap-6 shadow-sm overflow-x-auto no-scrollbar pt-28">
                <form onSubmit={handleSearch} className="relative min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search: 'Serene beach hideaway'..."
                        className="pl-10 rounded-full bg-slate-100 border-none h-11"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                <div className="h-8 w-px bg-slate-200" />

                <div className="flex items-center gap-2">
                    {moods.map((mood) => (
                        <Button
                            key={mood.name}
                            variant={currentMood === mood.name ? 'default' : 'outline'}
                            className={`rounded-full px-4 h-10 gap-2 font-bold transition-all ${currentMood === mood.name ? 'bg-primary text-white scale-105' : 'bg-white text-slate-600 border-slate-200'
                                }`}
                            onClick={() => setCurrentMood(currentMood === mood.name ? null : mood.name)}
                        >
                            <mood.icon className={`w-4 h-4 ${currentMood === mood.name ? 'text-white' : mood.color}`} />
                            {mood.name}
                        </Button>
                    ))}
                </div>

                <div className="h-8 w-px bg-slate-200 ml-auto" />

                <div className="flex items-center gap-3 pr-2 min-w-fit">
                    <Label htmlFor="hidden-gem" className="text-sm font-black text-slate-700 uppercase tracking-wider cursor-pointer">Hidden Gems</Label>
                    <Switch
                        id="hidden-gem"
                        checked={isHiddenGem}
                        onCheckedChange={setIsHiddenGem}
                    />
                </div>
            </div>

            <div className="flex-grow relative">
                <Map
                    {...viewState}
                    onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
                    mapStyle="mapbox://styles/mapbox/light-v11"
                    mapboxAccessToken={MAPBOX_TOKEN}
                    ref={mapRef}
                    onClick={onMapClick}
                    interactiveLayerIds={['clusters', 'unclustered-point']}
                >
                    <NavigationControl position="top-right" />

                    <Source
                        id="locations"
                        type="geojson"
                        data={locations}
                        cluster={true}
                        clusterMaxZoom={14}
                        clusterRadius={50}
                    >
                        <Layer {...clusterLayer} />
                        <Layer {...clusterCountLayer} />
                        <Layer {...unclusteredPointLayer} />
                    </Source>

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-100">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <span className="text-xs font-bold text-slate-600">Syncing with satellite...</span>
                        </div>
                    )}
                </Map>

                {/* Destination Detail Card */}
                <AnimatePresence>
                    {selectedPoint && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                            className="absolute bottom-10 right-10 w-[400px] z-20"
                        >
                            <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
                                <div className="relative h-56">
                                    <img
                                        src={selectedPoint.image_url}
                                        className="w-full h-full object-cover"
                                        alt={selectedPoint.place_name}
                                    />
                                    <button
                                        onClick={() => setSelectedPoint(null)}
                                        className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1 shadow-sm">
                                        <Star className="w-3 h-3 fill-primary" />
                                        {selectedPoint.rating} Rating
                                    </div>
                                    {selectedPoint.is_hidden_gem === 'true' && (
                                        <div className="absolute bottom-4 left-4 bg-amber-500/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-1 shadow-sm">
                                            <Sparkles className="w-3 h-3" />
                                            Hidden Gem
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 space-y-6">
                                    <div>
                                        <div className="flex items-center gap-1 text-primary text-[10px] font-black uppercase tracking-widest mb-1">
                                            <MapPin className="w-3 h-3" />
                                            {selectedPoint.city}, {selectedPoint.country}
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900 leading-tight">
                                            {selectedPoint.place_name}
                                        </h2>
                                    </div>

                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        {selectedPoint.description}
                                    </p>

                                    {/* Fun Fact Section */}
                                    <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
                                        <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-wider mb-2">
                                            <Info className="w-4 h-4" />
                                            Fun Fact
                                        </div>
                                        <p className="text-xs text-blue-800 italic leading-relaxed">
                                            "{selectedPoint.fun_fact}"
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {selectedPoint.mood_tags && JSON.parse(selectedPoint.mood_tags).map((tag: string) => (
                                                <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-500 font-bold border-none">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Top Activities</p>
                                                <div className="flex gap-2">
                                                    {selectedPoint.top_activities && JSON.parse(selectedPoint.top_activities).slice(0, 2).map((act: string, i: number) => (
                                                        <span key={i} className="text-xs font-bold text-slate-600 flex items-center gap-1">
                                                            <Compass className="w-3 h-3 text-primary" /> {act}
                                                            {i === 0 && <span className="text-slate-200">|</span>}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <Button className="rounded-full shadow-lg shadow-primary/20 font-black">
                                                Plan Trip
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
