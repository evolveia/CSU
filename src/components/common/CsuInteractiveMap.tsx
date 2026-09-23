import React, { useState, useEffect, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps';
import { StationLocation } from '../../types';
import { Navigation, Compass, MapPin, Building, Truck, Clock, ShieldCheck } from 'lucide-react';

interface CsuInteractiveMapProps {
  stations: StationLocation[];
  activeStation: StationLocation | null;
  onSelectStation?: (station: StationLocation) => void;
  center?: [number, number];
  zoom?: number;
  heightClass?: string;
  miniMode?: boolean;
}

// Controller to smoothly pan and zoom to active station or fit bounds
const MapViewController: React.FC<{
  activeStation: StationLocation | null;
  stations: StationLocation[];
  defaultCenter: { lat: number; lng: number };
  defaultZoom: number;
}> = ({ activeStation, stations, defaultCenter, defaultZoom }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (activeStation) {
      map.panTo({
        lat: activeStation.coordinates.lat,
        lng: activeStation.coordinates.lng,
      });
      map.setZoom(14);
    } else if (stations.length > 0 && typeof google !== 'undefined' && google.maps) {
      const bounds = new google.maps.LatLngBounds();
      stations.forEach((st) => {
        bounds.extend({ lat: st.coordinates.lat, lng: st.coordinates.lng });
      });
      map.fitBounds(bounds, 40);
    } else {
      map.panTo(defaultCenter);
      map.setZoom(defaultZoom);
    }
  }, [map, activeStation, stations, defaultCenter, defaultZoom]);

  return null;
};

export const CsuInteractiveMap: React.FC<CsuInteractiveMapProps> = ({
  stations,
  activeStation,
  onSelectStation,
  center = [-4.325, 15.322], // Kinshasa coordinates
  zoom = 12,
  heightClass = 'h-80 sm:h-96',
  miniMode = false,
}) => {
  const [selectedStation, setSelectedStation] = useState<StationLocation | null>(activeStation);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [hasMapError, setHasMapError] = useState(false);

  // Sync external activeStation
  useEffect(() => {
    if (activeStation) {
      setSelectedStation(activeStation);
    }
  }, [activeStation]);

  const defaultCenter = { lat: center[0], lng: center[1] };

  // Google Maps API Key from Environment
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBldLdefZ0SJwGUDHAuUv1Uq30V35_IIS0';

  // Handle User Geolocation
  const handleLocateMe = useCallback(() => {
    if (!navigator.geolocation) {
      alert('La géolocalisation n’est pas supportée par votre navigateur.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  }, []);

  return (
    <div
      className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-[#14477E]/50 shadow-xl bg-[#08243F]`}
    >
      <APIProvider
        apiKey={apiKey}
        onLoad={() => setHasMapError(false)}
        onError={() => setHasMapError(true)}
      >
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={zoom}
          mapId="DEMO_MAP_ID"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          gestureHandling="greedy"
          disableDefaultUI={miniMode}
          className="w-full h-full"
        >
          {/* Dynamic pan & zoom manager */}
          <MapViewController
            activeStation={selectedStation}
            stations={stations}
            defaultCenter={defaultCenter}
            defaultZoom={zoom}
          />

          {/* User Location Pulse Marker */}
          {userPos && (
            <AdvancedMarker position={userPos} title="Votre Position">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-[#1B5FAA] opacity-50 animate-ping" />
                <span className="w-4 h-4 rounded-full bg-[#1B5FAA] border-2 border-white shadow-md" />
              </div>
            </AdvancedMarker>
          )}

          {/* Station Markers with Sovereign Gold / Navy styling */}
          {stations.map((st) => {
            const isSelected = selectedStation?.id === st.id;
            return (
              <AdvancedMarker
                key={st.id}
                position={{ lat: st.coordinates.lat, lng: st.coordinates.lng }}
                onClick={() => {
                  setSelectedStation(st);
                  if (onSelectStation) onSelectStation(st);
                }}
                title={st.name}
              >
                <div className="relative flex flex-col items-center cursor-pointer group">
                  {/* Selected label badge */}
                  {isSelected && (
                    <div className="px-2 py-0.5 rounded-md bg-[#08243F] text-[#D9B84A] border border-[#C9A227] text-[10px] font-bold shadow-lg whitespace-nowrap mb-1 animate-pulse">
                      {st.name.split('-')[0].trim()}
                    </div>
                  )}

                  {/* Marker Pin Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-tr from-[#9C7B1E] via-[#C9A227] to-[#E9CE7A] scale-125 ring-4 ring-[#08243F]'
                        : st.isMobileUnit
                        ? 'bg-[#C77D0A] hover:scale-110 ring-2 ring-white'
                        : 'bg-[#0E3A66] hover:scale-110 ring-2 ring-[#C9A227]'
                    }`}
                  >
                    {st.isMobileUnit ? (
                      <Truck className="w-4 h-4 text-white" />
                    ) : (
                      <Building className="w-4 h-4 text-white" />
                    )}
                  </div>

                  {/* Pin Pointer Tail */}
                  <div
                    className={`w-2 h-2 -mt-1 rotate-45 ${
                      isSelected
                        ? 'bg-[#C9A227]'
                        : st.isMobileUnit
                        ? 'bg-[#C77D0A]'
                        : 'bg-[#0E3A66]'
                    }`}
                  />
                </div>
              </AdvancedMarker>
            );
          })}

          {/* InfoWindow for selected station */}
          {selectedStation && (
            <InfoWindow
              position={{
                lat: selectedStation.coordinates.lat,
                lng: selectedStation.coordinates.lng,
              }}
              onCloseClick={() => setSelectedStation(null)}
              headerContent={
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#08243F]">
                  {selectedStation.isMobileUnit ? (
                    <span className="px-1.5 py-0.5 rounded bg-[#C77D0A]/15 text-[#C77D0A] text-[9px] font-mono">
                      Unité Mobile
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded bg-[#0E3A66]/15 text-[#0E3A66] text-[9px] font-mono">
                      Guichet Fixe
                    </span>
                  )}
                  <span>{selectedStation.province}</span>
                </div>
              }
            >
              <div className="font-sans text-xs p-1 max-w-[220px] text-[#0A1B2A]">
                <h4 className="font-display font-bold text-sm text-[#08243F] mb-1">
                  {selectedStation.name}
                </h4>
                <p className="text-[11px] text-[#0A1B2A]/75 mb-2 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                  <span>{selectedStation.address}</span>
                </p>
                <div className="pt-2 border-t border-[#DCE4EE] flex items-center justify-between text-[10px]">
                  <span
                    className={`font-semibold ${
                      selectedStation.queueStatus === 'fluide'
                        ? 'text-[#1E8E5A]'
                        : selectedStation.queueStatus === 'modere'
                        ? 'text-[#C77D0A]'
                        : 'text-[#C0392B]'
                    }`}
                  >
                    ● Attente ~{selectedStation.waitMinutes} min
                  </span>
                  <span className="text-[#0A1B2A]/60 flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{selectedStation.openHours.split('(')[0]}</span>
                  </span>
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>

      {/* Floating Action Buttons */}
      {!miniMode && (
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          {/* Geolocation Button */}
          <button
            type="button"
            onClick={handleLocateMe}
            disabled={isLocating}
            className="p-2.5 rounded-xl bg-[#08243F]/90 backdrop-blur-md hover:bg-[#0E3A66] text-[#D9B84A] border border-[#C9A227]/50 shadow-lg transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer active:scale-95 disabled:opacity-50"
            title="Localiser ma position en RDC"
          >
            <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">
              {isLocating ? 'Recherche...' : 'Ma Position'}
            </span>
          </button>

          {/* Reset View Button */}
          <button
            type="button"
            onClick={() => setSelectedStation(null)}
            className="p-2.5 rounded-xl bg-[#08243F]/90 backdrop-blur-md hover:bg-[#0E3A66] text-[#DCE4EE] border border-[#14477E] shadow-lg transition-all flex items-center justify-center cursor-pointer active:scale-95"
            title="Vue d'ensemble des stations"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom Status Pill */}
      <div className="absolute bottom-3 left-3 right-3 sm:right-auto z-10 bg-[#08243F]/95 backdrop-blur-md border border-[#C9A227]/40 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 text-white text-[11px]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#1E8E5A] shrink-0" />
        <span className="font-medium text-[#DCE4EE]">
          {stations.length} station{stations.length > 1 ? 's' : ''} officielle
          {stations.length > 1 ? 's' : ''} en service
        </span>
        {selectedStation && (
          <span className="hidden md:inline text-[#D9B84A] font-bold border-l border-[#14477E] pl-2">
            {selectedStation.name.split('-')[0]}
          </span>
        )}
      </div>
    </div>
  );
};
