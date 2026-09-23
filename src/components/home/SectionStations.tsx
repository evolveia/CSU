import React, { useState, useEffect } from 'react';
import { stationsService, DRC_PROVINCES } from '../../services/stationsService';
import { StationLocation } from '../../types';
import { MapPin, Search, Clock, Users, Truck, AlertCircle, Navigation, Layers, Compass } from 'lucide-react';
import { CsuInteractiveMap } from '../common/CsuInteractiveMap';

export const SectionStations: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>('Kinshasa');
  const [selectedTerritory, setSelectedTerritory] = useState<string>('all');
  const [selectedCommune, setSelectedCommune] = useState<string>('all');
  const [stations, setStations] = useState<StationLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeStation, setActiveStation] = useState<StationLocation | null>(null);

  // Available territories based on province
  const currentProvinceData = DRC_PROVINCES.find((p) => p.name === selectedProvince);
  const territories = currentProvinceData ? currentProvinceData.territories : [];

  // Available communes based on territory
  const currentTerritoryData = territories.find((t) => t.name === selectedTerritory);
  const communes = currentTerritoryData ? currentTerritoryData.communes : [];

  const fetchStations = async () => {
    setLoading(true);
    try {
      const results = await stationsService.searchStations(
        selectedProvince,
        selectedTerritory,
        selectedCommune
      );
      setStations(results);
      if (results.length > 0) {
        setActiveStation(results[0]);
      } else {
        setActiveStation(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, [selectedProvince, selectedTerritory, selectedCommune]);

  const getStatusBadge = (status: 'fluide' | 'modere' | 'charge', wait: number) => {
    switch (status) {
      case 'fluide':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1E8E5A]/15 text-[#1E8E5A] border border-[#1E8E5A]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E8E5A] animate-pulse" />
            File fluide (~{wait} min)
          </span>
        );
      case 'modere':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#C77D0A]/15 text-[#C77D0A] border border-[#C77D0A]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C77D0A]" />
            Affluence modérée (~{wait} min)
          </span>
        );
      case 'charge':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#C0392B]/15 text-[#C0392B] border border-[#C0392B]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C0392B]" />
            Forte affluence (~{wait} min)
          </span>
        );
    }
  };

  return (
    <section id="stations" className="py-16 sm:py-24 bg-white border-b border-[#DCE4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-3 mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9C7B1E] font-display">
            Réseau de Proximité · Cartographie Souveraine
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#08243F] tracking-tight">
            Stations Citoyenneté & Unités Mobiles
          </h2>
          <p className="font-citizen text-sm sm:text-base text-[#0A1B2A]/75 leading-relaxed">
            Consultez en temps réel les heures d’ouverture, la géolocalisation GPS et l’état de la file d’attente avant de vous déplacer.
          </p>
        </div>

        {/* Cascading Filter Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#08243F] text-white shadow-xl mb-8 sm:mb-10 border border-[#14477E]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {/* 1. Province */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#D9B84A] mb-1.5">
                1. Province (26 provinces)
              </label>
              <select
                value={selectedProvince}
                onChange={(e) => {
                  setSelectedProvince(e.target.value);
                  setSelectedTerritory('all');
                  setSelectedCommune('all');
                }}
                className="w-full bg-[#0A2E52] border border-[#14477E] rounded-xl px-3 py-2 sm:py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
              >
                {DRC_PROVINCES.map((p) => (
                  <option key={p.code} value={p.name}>
                    {p.name} ({p.code})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Territoire / Ville */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#D9B84A] mb-1.5">
                2. Ville / Territoire
              </label>
              <select
                value={selectedTerritory}
                onChange={(e) => {
                  setSelectedTerritory(e.target.value);
                  setSelectedCommune('all');
                }}
                className="w-full bg-[#0A2E52] border border-[#14477E] rounded-xl px-3 py-2 sm:py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
              >
                <option value="all">Tous les territoires / villes</option>
                {territories.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Commune */}
            <div className="sm:col-span-2 md:col-span-1">
              <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#D9B84A] mb-1.5">
                3. Commune / Quartier
              </label>
              <select
                value={selectedCommune}
                onChange={(e) => setSelectedCommune(e.target.value)}
                disabled={selectedTerritory === 'all' || communes.length === 0}
                className="w-full bg-[#0A2E52] border border-[#14477E] rounded-xl px-3 py-2 sm:py-2.5 text-xs text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
              >
                <option value="all">Toutes les communes</option>
                {communes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results & Interactive Leaflet Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* List of Stations (Left) */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between text-xs text-[#08243F] font-semibold border-b border-[#DCE4EE] pb-2">
              <span>{stations.length} point(s) d'enrôlement détecté(s)</span>
              <span className="text-[#9C7B1E] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Mise à jour temps réel
              </span>
            </div>

            {loading ? (
              <div className="p-8 text-center text-xs text-[#0A1B2A]/60">
                Recherche des stations disponibles...
              </div>
            ) : stations.length === 0 ? (
              <div className="p-6 sm:p-8 text-center bg-[#F6F8FB] rounded-2xl border border-dashed border-[#DCE4EE]">
                <AlertCircle className="w-8 h-8 text-[#C77D0A] mx-auto mb-2" />
                <p className="text-sm font-bold text-[#08243F]">Aucune station fixe trouvée pour ce filtre</p>
                <p className="text-xs text-[#0A1B2A]/70 mt-1">
                  Une unité mobile solaire passe dans votre zone sous 48h. Contactez le numéro vert gratuit 108.
                </p>
              </div>
            ) : (
              stations.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setActiveStation(st)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                    activeStation?.id === st.id
                      ? 'bg-[#F6F8FB] border-[#C9A227] shadow-lg ring-2 ring-[#C9A227]'
                      : 'bg-white border-[#DCE4EE] hover:border-[#14477E] hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {st.isMobileUnit ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#08243F] bg-[#D9B84A] px-2 py-0.5 rounded">
                            <Truck className="w-3 h-3" />
                            Unité Mobile Fluviale/Terrestre
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0E3A66] bg-[#EAEFF5] px-2 py-0.5 rounded">
                            <MapPin className="w-3 h-3" />
                            Station Citoyenneté Fixe
                          </span>
                        )}
                        <span className="text-[10px] sm:text-[11px] font-mono text-[#0A1B2A]/50">
                          {st.province} · {st.commune}
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-sm sm:text-base text-[#08243F]">
                        {st.name}
                      </h4>

                      <p className="font-citizen text-xs text-[#0A1B2A]/75 flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                        <span className="line-clamp-1">{st.address}</span>
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      {getStatusBadge(st.queueStatus, st.waitMinutes)}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#DCE4EE]/70 flex flex-wrap items-center justify-between text-xs text-[#0A1B2A]/70 gap-2">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#0E3A66]" />
                      <span>{st.openHours}</span>
                    </div>

                    {st.mobileNextStop && (
                      <span className="text-[10px] sm:text-[11px] font-semibold text-[#9C7B1E]">
                        {st.mobileNextStop}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Interactive Leaflet Map Visual (Right) */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="rounded-2xl bg-[#08243F] border border-[#14477E] p-4 sm:p-5 shadow-xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-[#14477E] pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C9A227]" />
                  <span className="font-display font-bold text-sm">
                    Localisation Réelle & Bornes GPS
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#D9B84A] bg-[#0E3A66] px-2 py-0.5 rounded">
                  GPS TEMPS RÉEL RDC
                </span>
              </div>

              {/* Real Leaflet Map Component with Popups and Markers */}
              <CsuInteractiveMap
                stations={stations}
                activeStation={activeStation}
                onSelectStation={(st) => setActiveStation(st)}
                heightClass="h-72 sm:h-96"
              />

              {activeStation ? (
                <div className="space-y-2 pt-1 bg-[#0A2E52]/60 p-3 rounded-xl border border-[#14477E]">
                  <div className="text-xs text-[#DCE4EE]">
                    <span className="text-[#C9A227] font-semibold text-[11px] block">
                      Station sélectionnée :
                    </span>
                    <strong className="text-white text-sm block font-display">
                      {activeStation.name}
                    </strong>
                    <span className="text-[11px] text-[#DCE4EE]/80">{activeStation.address}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#DCE4EE]/70 pt-2 border-t border-[#14477E]/80">
                    <span>Coordonnées géographiques :</span>
                    <span className="font-mono text-[#D9B84A] text-xs">
                      {activeStation.coordinates.lat.toFixed(4)}°, {activeStation.coordinates.lng.toFixed(4)}°
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#DCE4EE]/60 text-center py-2">
                  Cliquez sur un marqueur ou une station dans la liste pour voir les détails d'accès.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
