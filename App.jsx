import React, { useState, useEffect } from 'react';
import { MapPin, Users, AlertTriangle, TrendingUp, Shield, DollarSign, TrendingDown, Star, Calendar, XCircle, Music, Gamepad2, Utensils, Activity, Heart } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set([1, 3]));
  const [selectedDistrict, setSelectedDistrict] = useState('Oak Cliff');
  const [timeBucket, setTimeBucket] = useState('24h');
  const [selectedVenue, setSelectedVenue] = useState(null);

  const districts = [
    { id: 1, name: 'Oak Cliff', risk: 87, traffic: 92, crime: 12, events: 24, safetyScore: 78 },
    { id: 2, name: 'Uptown', risk: 65, traffic: 78, crime: 8, events: 15, safetyScore: 85 },
    { id: 3, name: 'Downtown', risk: 92, traffic: 95, crime: 18, events: 32, safetyScore: 72 },
    { id: 4, name: 'Design District', risk: 58, traffic: 65, crime: 5, events: 12, safetyScore: 88 },
    { id: 5, name: 'Arts District', risk: 74, traffic: 82, crime: 10, events: 18, safetyScore: 81 }
  ];

  const venues = [
    { id: 1, name: 'Klyde Warren Park', type: 'Park', rating: 4.7, crowd: 85, safety: 78, distance: '0.2 mi', image: 'https://placehold.co/300x200/4F46E5/FFFFFF?text=Park', tags: ['Family', 'Outdoor'], events: ['Concert', 'Yoga'], capacity: 5000, occupancy: 4200 },
    { id: 2, name: 'The Rustic', type: 'Restaurant', rating: 4.2, crowd: 45, safety: 88, distance: '0.5 mi', image: 'https://placehold.co/300x200/059669/FFFFFF?text=Restaurant', tags: ['Fine Dining', 'Live Music'], events: ['Live Music'], capacity: 300, occupancy: 180 },
    { id: 3, name: 'Deep Ellum Brewing', type: 'Brewery', rating: 4.5, crowd: 92, safety: 72, distance: '0.1 mi', image: 'https://placehold.co/300x200/DC2626/FFFFFF?text=Brewery', tags: ['Happy Hour', 'Outdoor'], events: ['Trivia Night'], capacity: 250, occupancy: 230 },
    { id: 4, name: 'Mesquite', type: 'Restaurant', rating: 4.8, crowd: 68, safety: 85, distance: '0.3 mi', image: 'https://placehold.co/300x200/7C3AED/FFFFFF?text=Restaurant', tags: ['Fine Dining'], events: ['Wine Tasting'], capacity: 150, occupancy: 110 },
    { id: 5, name: 'Cidercade', type: 'Arcade', rating: 4.6, crowd: 75, safety: 90, distance: '0.4 mi', image: 'https://placehold.co/300x200/0891B2/FFFFFF?text=Arcade', tags: ['Family', 'Gaming'], events: ['Tournament'], capacity: 200, occupancy: 160 },
    { id: 6, name: 'Papa Johns', type: 'Pizza', rating: 4.4, crowd: 88, safety: 75, distance: '0.6 mi', image: 'https://placehold.co/300x200/EA580C/FFFFFF?text=Pizza', tags: ['Fast', 'Delivery'], events: [], capacity: 100, occupancy: 85 }
  ];

  const events = [
    { id: 1, name: 'Summer Concert Series', venue: 'Klyde Warren Park', time: '7:00 PM', type: 'Music', attendees: 3200 },
    { id: 2, name: 'Trivia Night', venue: 'Deep Ellum Brewing', time: '8:00 PM', type: 'Game', attendees: 120 },
    { id: 3, name: 'Wine Tasting', venue: 'Mesquite', time: '6:30 PM', type: 'Food', attendees: 45 },
    { id: 4, name: 'Arcade Tournament', venue: 'Cidercade', time: '9:00 PM', type: 'Game', attendees: 85 },
    { id: 5, name: 'Yoga in the Park', venue: 'Klyde Warren Park', time: '8:00 AM', type: 'Wellness', attendees: 200 }
  ];

  const crowdData = [
    { hour: '6AM', count: 2300, risk: 12 },
    { hour: '8AM', count: 8900, risk: 45 },
    { hour: '10AM', count: 12500, risk: 67 },
    { hour: '12PM', count: 15800, risk: 89 },
    { hour: '2PM', count: 14200, risk: 78 },
    { hour: '4PM', count: 16700, risk: 92 },
    { hour: '6PM', count: 18900, risk: 95 },
    { hour: '8PM', count: 13400, risk: 72 }
  ];

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venue.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venue.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredDistricts = districts.filter(district =>
    district.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (e, venueId) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(venueId)) {
        newSet.delete(venueId);
      } else {
        newSet.add(venueId);
      }
      return newSet;
    });
  };

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 transition-all hover:shadow-md hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold mt-1 text-gray-900">{value}</p>
          <p className={`text-sm mt-1 font-medium flex items-center ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change.startsWith('+') ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {change}
          </p>
        </div>
        <div className="p-3 rounded-xl bg-gray-100">
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </div>
  );

  const VenueCard = ({ venue }) => (
    <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-md hover:-translate-y-1" onClick={() => setSelectedVenue(venue)}>
      <div className="relative">
        <img src={venue.image} alt={venue.name} className="w-full h-40 object-cover rounded-xl" />
        <button onClick={(e) => toggleFavorite(e, venue.id)} className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
          <Heart className={`w-5 h-5 ${favorites.has(venue.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        <div className="absolute bottom-3 left-3 flex gap-1">
          {venue.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full">{tag}</span>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-900 text-sm">{venue.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{venue.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-xs mt-1">{venue.type} • {venue.distance}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${venue.crowd > 80 ? 'bg-red-500' : venue.crowd > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
            <span className="text-xs text-gray-600">{venue.crowd}% crowded</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-medium">{venue.safety}% safe</span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-gray-500">{venue.occupancy}/{venue.capacity} occupied</div>
          <div className="flex gap-1">
            {venue.events.map((event, idx) => (
              <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">{event}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const EventCard = ({ event }) => {
    const configs = {
      Music: { bg: 'bg-purple-100', icon: Music, color: 'text-purple-600' },
      Game: { bg: 'bg-blue-100', icon: Gamepad2, color: 'text-blue-600' },
      Food: { bg: 'bg-green-100', icon: Utensils, color: 'text-green-600' },
      Wellness: { bg: 'bg-yellow-100', icon: Activity, color: 'text-yellow-600' }
    };
    const config = configs[event.type] || configs.Wellness;
    const Icon = config.icon;

    return (
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
        <div className="flex items-start">
          <div className={`p-3 rounded-xl ${config.bg}`}>
            <Icon className={`w-6 h-6 ${config.color}`} />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="font-bold text-gray-900 text-sm">{event.name}</h3>
            <p className="text-gray-600 text-xs mt-1">{event.venue}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">{event.time}</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-600">{event.attendees}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DistrictCard = ({ district }) => (
    <div onClick={() => setSelectedDistrict(district.name)} className={`bg-white rounded-2xl p-4 border border-gray-200 shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-md hover:-translate-y-1 ${selectedDistrict === district.name ? 'ring-2 ring-indigo-500' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">{district.name}</h3>
          <p className="text-gray-600 text-xs mt-1">Safety Score: {district.safetyScore}/100</p>
        </div>
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${district.safetyScore > 80 ? 'bg-green-100 border-green-600' : district.safetyScore > 60 ? 'bg-yellow-100 border-yellow-600' : 'bg-red-100 border-red-600'}`}>
          <Shield className={`w-4 h-4 ${district.safetyScore > 80 ? 'text-green-600' : district.safetyScore > 60 ? 'text-yellow-600' : 'text-red-600'}`} />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="text-center">
          <div className="text-xs text-gray-600">Risk Level</div>
          <div className="font-bold text-sm">{district.risk}%</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600">Traffic</div>
          <div className="font-bold text-sm">{district.traffic}%</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600">Crime</div>
          <div className="font-bold text-sm">{district.crime}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600">Events</div>
          <div className="font-bold text-sm">{district.events}</div>
        </div>
      </div>
    </div>
  );

  const CrowdChart = () => (
    <div className="h-64">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">Crowd Density</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span className="text-xs text-gray-600">Population</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
            <span className="text-xs text-gray-600">Risk</span>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between h-40 space-x-1">
        {crowdData.map((data, index) => {
          const popHeight = (data.count / 20000) * 100;
          const riskHeight = (data.risk / 100) * 100;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="relative w-full h-full flex items-end">
                <div className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg w-1/2 transition-all duration-1000" style={{ height: `${popHeight}%` }} />
                <div className="bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg w-1/2 transition-all duration-1000" style={{ height: `${riskHeight}%` }} />
              </div>
              <span className="text-xs text-gray-600 mt-2">{data.hour}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold">Crowd Safety Dashboard</h1>
        <p className="text-indigo-100 mt-2">Real-time monitoring for {selectedDistrict}</p>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6 flex gap-2">
          <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
            Dashboard
          </button>
          <button onClick={() => setActiveTab('venues')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'venues' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
            Venues
          </button>
          <button onClick={() => setActiveTab('map')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'map' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
            Map
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard icon={Users} title="Active Population" value="1.2M" change="+18.7%" color="#007AFF" />
              <StatCard icon={DollarSign} title="Revenue Impact" value="$287K" change="-12.3%" color="#34C759" />
              <StatCard icon={AlertTriangle} title="High Risk Zones" value="12" change="+3" color="#FF3B30" />
              <StatCard icon={TrendingUp} title="Prediction Accuracy" value="98.4%" change="+0.8%" color="#FF9500" />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <CrowdChart />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">District Safety Overview</h3>
                <div className="flex gap-2">
                  {['24h', '7d', '30d'].map(bucket => (
                    <button key={bucket} onClick={() => setTimeBucket(bucket)} className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${timeBucket === bucket ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {bucket}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(searchQuery ? filteredDistricts : districts).map(district => (
                  <DistrictCard key={district.id} district={district} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'venues' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Venues in {selectedDistrict}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(searchQuery ? filteredVenues : venues).map(venue => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                {events.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-5 h-5 text-indigo-600 mr-2" />
              Safety Map
            </h3>
            <div className="relative rounded-xl overflow-hidden border border-gray-200" style={{ height: '500px' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
                {districts.map((district, idx) => (
                  <div key={district.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" style={{ left: `${(idx * 20) + 15}%`, top: `${(idx * 10) + 20}%` }} onClick={() => setSelectedDistrict(district.name)}>
                    <div className={`w-8 h-8 rounded-full border-2 shadow-lg flex items-center justify-center ${selectedDistrict === district.name ? 'ring-2 ring-indigo-500' : ''}`} style={{ backgroundColor: district.safetyScore > 80 ? '#4ADE80' : district.safetyScore > 60 ? '#FBBF24' : '#F87171', borderColor: district.safetyScore > 80 ? '#16A34A' : district.safetyScore > 60 ? '#D97706' : '#DC2626' }}>
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                      {district.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedVenue && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedVenue(null)}>
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={selectedVenue.image} alt={selectedVenue.name} className="w-full h-48 object-cover rounded-xl" />
              <button onClick={() => setSelectedVenue(null)} className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                <XCircle className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900 text-lg">{selectedVenue.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{selectedVenue.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-1">{selectedVenue.type} • {selectedVenue.distance}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">Occupancy</p>
                  <p className="text-lg font-bold text-gray-900">{selectedVenue.occupancy}/{selectedVenue.capacity}</p>
                  <p className="text-xs text-gray-500">{Math.round((selectedVenue.occupancy / selectedVenue.capacity) * 100)}% full</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">Safety</p>
                  <p className="text-lg font-bold text-gray-900">{selectedVenue.safety}%</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900">Upcoming Events</p>
                <div className="mt-2 space-y-2">
                  {selectedVenue.events.length > 0 ? selectedVenue.events.map((event, idx) => (
                    <div key={idx} className="flex items-center p-2 bg-gray-50 rounded-lg">
                      <Calendar className="w-4 h-4 text-indigo-500 mr-2" />
                      <span className="text-sm text-gray-700">{event}</span>
                    </div>
                  )) : <p className="text-sm text-gray-500">No upcoming events</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;