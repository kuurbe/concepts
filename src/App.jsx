import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Users, Zap, Heart, Calendar, Shield, TrendingUp, Clock, Star, AlertCircle, Car, Music, Flame, Coffee, Sun, Moon } from 'lucide-react';

const App = () => {
  const [appState, setAppState] = useState('splash');
  const [activeTab, setActiveTab] = useState('discover');
  const [pulse, setPulse] = useState(0);
  const [likedVenues, setLikedVenues] = useState(new Set([1, 3, 5]));
  const [selectedVenue, setSelectedVenue] = useState(null);

  useEffect(() => {
    const pulseTimer = setInterval(() => setPulse(p => (p + 1) % 100), 30);
    return () => clearInterval(pulseTimer);
  }, []);

  // Real Dallas data
  const venues = [
    { 
      id: 1, name: 'Klyde Warren Park', type: 'Park', address: '2012 Woodall Rodgers Fwy',
      crowd: 72, parking: 45, vibe: 92, safety: 95, rating: 4.8, distance: '0.3 mi',
      emoji: '🌳', color: 'from-emerald-500 to-green-500', hours: 'Open 24/7',
      tags: ['Family', 'Outdoor', 'Free'], price: 'Free'
    },
    { 
      id: 2, name: 'Pecan Lodge', type: 'BBQ Restaurant', address: '2702 Main St, Deep Ellum',
      crowd: 88, parking: 62, vibe: 89, safety: 87, rating: 4.7, distance: '1.2 mi',
      emoji: '🍖', color: 'from-rose-500 to-red-500', hours: '11 AM - 9 PM',
      tags: ['BBQ', 'Popular', 'Lunch'], price: '$$'
    },
    { 
      id: 3, name: 'Reunion Tower', type: 'Observation', address: '300 Reunion Blvd',
      crowd: 45, parking: 78, vibe: 94, safety: 98, rating: 4.9, distance: '0.8 mi',
      emoji: '🏙️', color: 'from-blue-500 to-cyan-500', hours: '10 AM - 10 PM',
      tags: ['Views', 'Tourist', 'Indoor'], price: '$$$'
    },
    { 
      id: 4, name: 'The Rustic', type: 'Live Music', address: '3656 Howell St, Uptown',
      crowd: 91, parking: 34, vibe: 96, safety: 84, rating: 4.6, distance: '2.1 mi',
      emoji: '🎸', color: 'from-purple-500 to-violet-500', hours: '4 PM - 2 AM',
      tags: ['Music', 'Bar', 'Outdoor'], price: '$$'
    },
    { 
      id: 5, name: 'Dallas Museum of Art', type: 'Museum', address: '1717 N Harwood St',
      crowd: 38, parking: 85, vibe: 88, safety: 96, rating: 4.8, distance: '0.5 mi',
      emoji: '🎨', color: 'from-amber-500 to-orange-500', hours: '11 AM - 5 PM',
      tags: ['Art', 'Culture', 'Indoor'], price: 'Free'
    },
    { 
      id: 6, name: 'Bishop Arts District', type: 'Shopping', address: 'N Bishop Ave',
      crowd: 68, parking: 52, vibe: 91, safety: 89, rating: 4.7, distance: '3.2 mi',
      emoji: '🛍️', color: 'from-fuchsia-500 to-pink-500', hours: '10 AM - 9 PM',
      tags: ['Shopping', 'Food', 'Art'], price: '$$'
    }
  ];

  const events = [
    {
      id: 1, name: 'Dallas Mavericks Game', venue: 'American Airlines Center',
      time: 'Tonight 7:30 PM', date: 'Nov 13', type: 'Sports',
      crowd: 95, safety: 92, tickets: 234, emoji: '🏀', color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2, name: 'Deep Ellum Art Walk', venue: 'Deep Ellum District',
      time: 'Saturday 6:00 PM', date: 'Nov 15', type: 'Art',
      crowd: 78, safety: 88, tickets: 'Free', emoji: '🎨', color: 'from-purple-500 to-violet-500'
    },
    {
      id: 3, name: 'Food Truck Friday', venue: 'Klyde Warren Park',
      time: 'Friday 11:00 AM', date: 'Nov 14', type: 'Food',
      crowd: 82, safety: 94, tickets: 'Free', emoji: '🍔', color: 'from-amber-500 to-orange-500'
    },
    {
      id: 4, name: 'Farmers Market', venue: 'Dallas Farmers Market',
      time: 'Sunday 9:00 AM', date: 'Nov 16', type: 'Market',
      crowd: 65, safety: 91, tickets: 'Free', emoji: '🌽', color: 'from-emerald-500 to-green-500'
    }
  ];

  const safetyAlerts = [
    { id: 1, type: 'Traffic', location: 'I-35E & Woodall Rogers', level: 'high', time: '3m ago', active: true },
    { id: 2, type: 'Event Crowd', location: 'American Airlines Center', level: 'medium', time: '12m ago', active: true },
    { id: 3, type: 'Road Closure', location: 'Main St & Elm St', level: 'low', time: '25m ago', active: false },
  ];

  const safetyMetrics = [
    { label: 'Area Safety', value: 94, change: '+5', icon: Shield, color: 'from-emerald-500 to-green-500' },
    { label: 'Crowd Level', value: 68, change: '+12', icon: Users, color: 'from-purple-500 to-violet-500' },
    { label: 'Parking Available', value: 72, change: '-8', icon: Car, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Alerts', value: 2, change: '-1', icon: AlertCircle, color: 'from-amber-500 to-orange-500' }
  ];

  // SPLASH SCREEN - Standalone Text with Beautiful Background
  if (appState === 'splash') {
    return (
      <div 
        onClick={() => setAppState('permission')}
        className="h-screen relative overflow-hidden cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite'
        }}
      >
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-600/30 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-fuchsia-600/30 via-transparent to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center animate-in fade-in zoom-in duration-1000">
            {/* Brand Name */}
            <div className="mb-8">
              <h1 className="text-8xl font-black text-white mb-2 tracking-tight" 
                  style={{ 
                    textShadow: '0 10px 40px rgba(0,0,0,0.3), 0 0 80px rgba(255,255,255,0.2)',
                    letterSpacing: '-0.02em'
                  }}>
                KROWD
              </h1>
              <h1 className="text-8xl font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent tracking-tight"
                  style={{ 
                    textShadow: '0 10px 40px rgba(0,0,0,0.2)',
                    letterSpacing: '-0.02em'
                  }}>
                GUIDE
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-3xl text-white/90 font-light mb-16" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              Live crowd intelligence for Dallas
            </p>

            {/* Floating cards animation */}
            <div className="flex gap-4 justify-center mb-12">
              {['👥', '🚗', '🎵', '🛡️'].map((emoji, i) => (
                <div 
                  key={i}
                  className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-2xl"
                  style={{ 
                    animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                >
                  <span className="text-3xl">{emoji}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="animate-pulse">
              <div className="inline-flex items-center gap-3 px-10 py-5 bg-white/20 backdrop-blur-2xl rounded-full border-2 border-white/40 shadow-2xl">
                <span className="text-white font-semibold text-lg">Tap to explore Dallas</span>
                <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </div>
    );
  }

  // PERMISSION SCREEN
  if (appState === 'permission') {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="mb-8 text-center">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full blur-2xl opacity-50"></div>
              <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <MapPin className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">Experience Dallas Live</h2>
          <p className="text-lg text-gray-600 text-center mb-12 leading-relaxed">
            Real-time crowd, parking, vibe, and safety data for every venue in Dallas.
          </p>

          <button
            onClick={() => setAppState('main')}
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-lg font-bold py-5 rounded-2xl shadow-lg shadow-violet-500/50 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            Enable Location Services
          </button>

          <p className="text-xs text-gray-400 text-center mt-8">
            🔒 Your location data is encrypted and never shared
          </p>
        </div>
      </div>
    );
  }

  // MAIN APP
  const DiscoverView = () => (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="px-6 pt-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Discover Dallas</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5 text-violet-600" />
            <span className="font-semibold">Downtown • </span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm">Live data</span>
            </div>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-3xl p-5 shadow-lg">
            <Flame className="w-6 h-6 text-white mb-2" />
            <div className="text-3xl font-black text-white mb-1">Hot Now</div>
            <div className="text-white/90 text-sm">12 trending spots</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-3xl p-5 shadow-lg">
            <Shield className="w-6 h-6 text-white mb-2" />
            <div className="text-3xl font-black text-white mb-1">94%</div>
            <div className="text-white/90 text-sm">Area safe</div>
          </div>
        </div>

        {/* Venues */}
        <h2 className="text-2xl font-black text-gray-900 mb-4">Popular Venues</h2>
        <div className="space-y-4">
          {venues.map((venue) => (
            <div 
              key={venue.id}
              onClick={() => setSelectedVenue(venue)}
              className="bg-white rounded-3xl p-5 shadow-lg border-2 border-gray-100 hover:border-violet-300 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${venue.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>
                  {venue.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-gray-900 text-lg mb-1">{venue.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{venue.type} • {venue.distance}</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-gray-900">{venue.rating}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{venue.price}</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setLikedVenues(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(venue.id)) newSet.delete(venue.id);
                      else newSet.add(venue.id);
                      return newSet;
                    });
                  }}
                >
                  <Heart className={`w-6 h-6 transition-all ${likedVenues.has(venue.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-300'}`} />
                </button>
              </div>

              {/* Live Metrics */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Users className={`w-5 h-5 mx-auto mb-1 ${venue.crowd > 80 ? 'text-rose-500' : venue.crowd > 60 ? 'text-amber-500' : 'text-emerald-500'}`} />
                  <div className="text-xs font-bold text-gray-900">{venue.crowd}%</div>
                  <div className="text-xs text-gray-500">Crowd</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Car className={`w-5 h-5 mx-auto mb-1 ${venue.parking < 40 ? 'text-rose-500' : venue.parking < 60 ? 'text-amber-500' : 'text-emerald-500'}`} />
                  <div className="text-xs font-bold text-gray-900">{venue.parking}%</div>
                  <div className="text-xs text-gray-500">Parking</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Music className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                  <div className="text-xs font-bold text-gray-900">{venue.vibe}%</div>
                  <div className="text-xs text-gray-500">Vibe</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Shield className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                  <div className="text-xs font-bold text-gray-900">{venue.safety}%</div>
                  <div className="text-xs text-gray-500">Safe</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {venue.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-violet-50 text-violet-700 text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                <Navigation className="w-5 h-5" />
                Navigate
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const EventsView = () => (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="px-6 pt-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Events</h1>
        <p className="text-gray-600 mb-8">Happening now and soon in Dallas</p>

        {/* This Week */}
        <h2 className="text-2xl font-black text-gray-900 mb-4">This Week</h2>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-3xl p-5 shadow-lg border-2 border-gray-100 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-20 h-20 bg-gradient-to-br ${event.color} rounded-2xl flex items-center justify-center text-4xl shadow-lg flex-shrink-0`}>
                  {event.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-black text-gray-900 text-lg mb-1">{event.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{event.venue}</p>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700 font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">{event.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="text-sm font-bold text-gray-900">{event.crowd}%</div>
                      <div className="text-xs text-gray-500">Expected</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="text-sm font-bold text-emerald-600">{event.safety}%</div>
                      <div className="text-xs text-gray-500">Safety</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="text-sm font-bold text-gray-900">{event.tickets}</div>
                      <div className="text-xs text-gray-500">Tickets</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SafetyView = () => (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="px-6 pt-8">
        <h1 className="text-4xl font-black text-gray-900 mb-8">Safety Hub</h1>

        {/* Current Score */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-[3rem] blur-2xl"></div>
          <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 rounded-[3rem] p-8 shadow-2xl">
            <div className="text-center">
              <div className="text-8xl font-black text-white mb-2">94</div>
              <div className="text-2xl text-white/90 font-bold mb-4">Very Safe</div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl rounded-full px-4 py-2">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-white font-semibold">+5% safer than yesterday</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {safetyMetrics.map((metric, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${metric.color} rounded-2xl p-5 shadow-lg`}>
              <metric.icon className="w-6 h-6 text-white mb-2" />
              <div className="text-3xl font-black text-white mb-1">{metric.value}{idx === 3 ? '' : '%'}</div>
              <div className="text-white/90 text-sm mb-2">{metric.label}</div>
              <div className={`text-xs font-medium ${metric.change.startsWith('+') ? 'text-white' : 'text-white/70'}`}>
                {metric.change} from average
              </div>
            </div>
          ))}
        </div>

        {/* Live Alerts */}
        <h2 className="text-2xl font-black text-gray-900 mb-4">Live Alerts</h2>
        <div className="space-y-3">
          {safetyAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`rounded-2xl p-4 shadow-lg border-2 transition-all ${
                alert.active ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    alert.level === 'high' ? 'bg-rose-500 animate-pulse' :
                    alert.level === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}></div>
                  <div>
                    <div className="font-bold text-gray-900">{alert.type}</div>
                    <div className="text-sm text-gray-600">{alert.location}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{alert.time}</div>
                  {alert.active && (
                    <div className="text-xs font-medium text-rose-600 mt-1">Active</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col overflow-hidden">
      
      {/* Content */}
      {activeTab === 'discover' && <DiscoverView />}
      {activeTab === 'events' && <EventsView />}
      {activeTab === 'safety' && <SafetyView />}

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t-2 border-gray-200 shadow-2xl z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-around">
            {[
              { id: 'discover', icon: Zap, label: 'Discover' },
              { id: 'events', icon: Calendar, label: 'Events' },
              { id: 'safety', icon: Shield, label: 'Safety' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-2 px-6 py-2 rounded-2xl transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 scale-110 shadow-lg shadow-violet-500/50' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <tab.icon className={`w-7 h-7 ${activeTab === tab.id ? 'text-white' : ''}`} />
                <span className={`text-xs font-bold ${activeTab === tab.id ? 'text-white' : ''}`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;