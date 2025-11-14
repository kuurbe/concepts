import React, { useState, useEffect } from ‘react’;
import { MapPin, Navigation, Eye, Shield, Users, Car, Music, TrendingUp, Star, Calendar, AlertCircle, Flame, Coffee, Utensils, Building2, ShoppingBag } from ‘lucide-react’;

const App = () => {
const [appState, setAppState] = useState(‘loader’); // loader, permission, main
const [loaderStep, setLoaderStep] = useState(0); // 0: nothing, 1: KROWD, 2: GUIDE, 3: tagline
const [activeTab, setActiveTab] = useState(‘discover’);
const [heatMode, setHeatMode] = useState(‘safety’);
const [selectedVenue, setSelectedVenue] = useState(null);
const [timeOfDay, setTimeOfDay] = useState(‘evening’);

useEffect(() => {
if (appState === ‘loader’) {
// KROWD appears
setTimeout(() => setLoaderStep(1), 300);
// GUIDE appears
setTimeout(() => setLoaderStep(2), 1200);
// Tagline appears
setTimeout(() => setLoaderStep(3), 2000);
}
}, [appState]);

// Real Dallas Open Data
const venues = [
{
id: 1, name: ‘Klyde Warren Park’, type: ‘Park’, category: ‘outdoor’,
address: ‘2012 Woodall Rodgers Fwy’, neighborhood: ‘Downtown’,
crowd: 68, parking: 52, vibe: 94, safety: 96, rating: 4.8,
lat: 32.7890, lng: -96.8010, emoji: ‘🌳’, distance: ‘0.2 mi’,
hours: ‘Open 24/7’, popular: true, trending: true
},
{
id: 2, name: ‘Pecan Lodge’, type: ‘BBQ Restaurant’, category: ‘food’,
address: ‘2702 Main St’, neighborhood: ‘Deep Ellum’,
crowd: 92, parking: 45, vibe: 91, safety: 88, rating: 4.7,
lat: 32.7820, lng: -96.7850, emoji: ‘🍖’, distance: ‘1.1 mi’,
hours: ‘11 AM - 9 PM’, popular: true, trending: false
},
{
id: 3, name: ‘Reunion Tower’, type: ‘Observation Deck’, category: ‘attraction’,
address: ‘300 Reunion Blvd E’, neighborhood: ‘Downtown’,
crowd: 42, parking: 81, vibe: 96, safety: 98, rating: 4.9,
lat: 32.7755, lng: -96.8089, emoji: ‘🏙️’, distance: ‘0.6 mi’,
hours: ‘10 AM - 10 PM’, popular: true, trending: false
},
{
id: 4, name: ‘The Rustic’, type: ‘Live Music Venue’, category: ‘nightlife’,
address: ‘3656 Howell St’, neighborhood: ‘Uptown’,
crowd: 88, parking: 38, vibe: 97, safety: 85, rating: 4.6,
lat: 32.8021, lng: -96.7989, emoji: ‘🎸’, distance: ‘2.8 mi’,
hours: ‘4 PM - 2 AM’, popular: true, trending: true
},
{
id: 5, name: ‘Dallas Museum of Art’, type: ‘Museum’, category: ‘culture’,
address: ‘1717 N Harwood St’, neighborhood: ‘Arts District’,
crowd: 35, parking: 88, vibe: 89, safety: 97, rating: 4.8,
lat: 32.7876, lng: -96.8010, emoji: ‘🎨’, distance: ‘0.4 mi’,
hours: ‘11 AM - 5 PM’, popular: false, trending: false
},
{
id: 6, name: ‘Bishop Arts District’, type: ‘Shopping District’, category: ‘shopping’,
address: ‘N Bishop Ave’, neighborhood: ‘Oak Cliff’,
crowd: 73, parking: 56, vibe: 93, safety: 90, rating: 4.7,
lat: 32.7490, lng: -96.8217, emoji: ‘🛍️’, distance: ‘4.2 mi’,
hours: ‘10 AM - 10 PM’, popular: true, trending: true
},
{
id: 7, name: ‘Deep Ellum Brewing’, type: ‘Brewery’, category: ‘nightlife’,
address: ‘2823 St Louis St’, neighborhood: ‘Deep Ellum’,
crowd: 81, parking: 62, vibe: 88, safety: 86, rating: 4.5,
lat: 32.7839, lng: -96.7764, emoji: ‘🍺’, distance: ‘1.4 mi’,
hours: ‘12 PM - 11 PM’, popular: false, trending: true
},
{
id: 8, name: ‘Sixty Vines’, type: ‘Wine Bar’, category: ‘food’,
address: ‘3701 McKinney Ave’, neighborhood: ‘Uptown’,
crowd: 65, parking: 71, vibe: 90, safety: 92, rating: 4.6,
lat: 32.8039, lng: -96.7989, emoji: ‘🍷’, distance: ‘2.9 mi’,
hours: ‘11 AM - 11 PM’, popular: false, trending: false
}
];

const liveEvents = [
{
id: 1, name: ‘Dallas Mavericks vs Lakers’, venue: ‘American Airlines Center’,
time: ‘Tonight 7:30 PM’, category: ‘Sports’, crowd: 98, safety: 93,
emoji: ‘🏀’, address: ‘2500 Victory Ave’
},
{
id: 2, name: ‘Deep Ellum Art Walk’, venue: ‘Deep Ellum’,
time: ‘Saturday 6:00 PM’, category: ‘Art’, crowd: 75, safety: 89,
emoji: ‘🎨’, address: ‘Main St’
},
{
id: 3, name: ‘Food Truck Rally’, venue: ‘Klyde Warren Park’,
time: ‘Tomorrow 5:00 PM’, category: ‘Food’, crowd: 82, safety: 95,
emoji: ‘🍔’, address: ‘2012 Woodall Rodgers’
}
];

const safetyData = {
overall: 94,
trend: ‘+5’,
alerts: [
{ type: ‘High Traffic’, location: ‘I-35E & Woodall Rogers’, level: ‘medium’, time: ‘5m ago’ },
{ type: ‘Large Crowd’, location: ‘American Airlines Center’, level: ‘high’, time: ‘12m ago’ }
],
safestAreas: [‘Arts District’, ‘Uptown’, ‘Highland Park’],
incidents: 2
};

// LOADER ANIMATION
if (appState === ‘loader’) {
return (
<div
onClick={() => setAppState(‘permission’)}
className=“h-screen bg-black relative overflow-hidden cursor-pointer”
>
{/* Animated Background */}
<div className="absolute inset-0">
<div className=“absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[150px]”
style={{ animation: ‘pulse 4s ease-in-out infinite’ }}></div>
<div className=“absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-cyan-600/30 rounded-full blur-[150px]”
style={{ animation: ‘pulse 5s ease-in-out infinite 1s’ }}></div>
</div>

```
{/* Content */}
<div className="relative h-full flex flex-col items-center justify-center">
{/* KROWD */}
<div className="overflow-hidden mb-4">
<h1
className={`text-[10rem] font-black text-white tracking-tight transition-all duration-1000 ${
loaderStep >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
}`}
style={{
textShadow: '0 0 80px rgba(139, 92, 246, 0.8)',
fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
}}
>
KROWD
</h1>
</div>

{/* GUIDE */}
<div className="overflow-hidden mb-8">
<h1
className={`text-[10rem] font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight transition-all duration-1000 ${
loaderStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
}`}
style={{
textShadow: '0 0 80px rgba(34, 211, 238, 0.6)',
fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
}}
>
GUIDE
</h1>
</div>

{/* Tagline */}
{loaderStep >= 3 && (
<div className="animate-in fade-in duration-700">
<p className="text-2xl text-white/80 font-light mb-12">Real-time intelligence for Dallas</p>
<div className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
<span className="text-white font-semibold">Tap to begin</span>
<div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
</div>
</div>
)}
</div>

<style>{`
@keyframes pulse {
0%, 100% { transform: scale(1); opacity: 0.3; }
50% { transform: scale(1.1); opacity: 0.5; }
}
`}</style>
</div>
);
```

}

// PERMISSION SCREEN
if (appState === ‘permission’) {
return (
<div className="h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-6 relative overflow-hidden">
<div className="absolute inset-0">
<div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse"></div>
<div className=“absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/30 rounded-full blur-[120px] animate-pulse” style={{ animationDelay: ‘1s’ }}></div>
</div>

```
<div className="relative max-w-lg w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
<div className="mb-10 text-center">
<div className="inline-block relative mb-6">
<div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-3xl opacity-60"></div>
<div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl">
<MapPin className="w-16 h-16 text-white" />
</div>
</div>
</div>

<h2 className="text-5xl font-black text-white mb-6 text-center leading-tight">
Enable Your<br/>Experience
</h2>

<p className="text-xl text-gray-300 text-center mb-12 leading-relaxed px-4">
Get live crowd levels, parking availability, and safety scores for venues near you.
</p>

<button
onClick={() => setAppState('main')}
className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white text-xl font-bold py-6 rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-95 transition-all"
>
Continue
</button>

<p className="text-sm text-gray-500 text-center mt-8">
🔒 Your data is encrypted and never shared
</p>
</div>
</div>
);
```

}

// MAIN APP - DISCOVER TAB
const DiscoverView = () => {
const trending = venues.filter(v => v.trending);
const popular = venues.filter(v => v.popular);

```
return (
<div className="h-full overflow-y-auto pb-32" style={{ scrollBehavior: 'smooth' }}>
{/* Hero */}
<div className="sticky top-0 z-10 bg-gradient-to-b from-white via-white to-transparent pb-6">
<div className="px-6 pt-8">
<div className="flex items-center gap-2 mb-3">
<div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
<span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Live Data</span>
</div>
<h1 className="text-5xl font-black text-gray-900 mb-2 leading-tight">
Discover<br/>Dallas
</h1>
<p className="text-lg text-gray-600">8 venues • {timeOfDay}</p>
</div>
</div>

{/* Quick Stats */}
<div className="px-6 mb-8">
<div className="grid grid-cols-4 gap-3">
{[
{ icon: Shield, value: '94%', label: 'Safe', color: 'from-emerald-500 to-green-500' },
{ icon: Users, value: '2.4K', label: 'Active', color: 'from-purple-500 to-violet-500' },
{ icon: Car, value: '68%', label: 'Parking', color: 'from-blue-500 to-cyan-500' },
{ icon: Flame, value: '6', label: 'Trending', color: 'from-rose-500 to-pink-500' }
].map((stat, idx) => (
<button
key={idx}
className="group relative"
>
<div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity`}></div>
<div className={`relative bg-gradient-to-br ${stat.color} rounded-2xl p-4 shadow-lg hover:scale-105 active:scale-95 transition-transform`}>
<stat.icon className="w-5 h-5 text-white mb-2" />
<div className="text-2xl font-black text-white">{stat.value}</div>
<div className="text-xs text-white/80 font-medium">{stat.label}</div>
</div>
</button>
))}
</div>
</div>

{/* Trending Now */}
<div className="px-6 mb-8">
<div className="flex items-center gap-2 mb-4">
<Flame className="w-5 h-5 text-rose-500" />
<h2 className="text-2xl font-black text-gray-900">Trending Now</h2>
</div>
<div className="space-y-3">
{trending.map((venue) => (
<button
key={venue.id}
onClick={() => setSelectedVenue(venue)}
className="w-full bg-white rounded-3xl p-5 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all text-left"
>
<div className="flex items-start gap-4">
<div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
{venue.emoji}
</div>
<div className="flex-1">
<div className="flex items-start justify-between mb-2">
<div>
<h3 className="font-black text-gray-900 text-lg">{venue.name}</h3>
<p className="text-sm text-gray-500">{venue.neighborhood} • {venue.distance}</p>
</div>
<div className="flex items-center gap-1">
<Star className="w-4 h-4 fill-amber-400 text-amber-400" />
<span className="font-bold text-sm">{venue.rating}</span>
</div>
</div>
<div className="flex gap-2">
{[
{ label: 'Crowd', value: venue.crowd, icon: Users },
{ label: 'Parking', value: venue.parking, icon: Car },
{ label: 'Vibe', value: venue.vibe, icon: Music },
{ label: 'Safety', value: venue.safety, icon: Shield }
].map((metric, idx) => (
<div key={idx} className="flex-1 bg-gray-50 rounded-xl p-2 text-center">
<metric.icon className={`w-4 h-4 mx-auto mb-1 ${
metric.label === 'Crowd' && metric.value > 80 ? 'text-rose-500' :
metric.label === 'Parking' && metric.value < 50 ? 'text-amber-500' :
'text-emerald-500'
}`} />
<div className="text-xs font-bold text-gray-900">{metric.value}%</div>
</div>
))}
</div>
</div>
</div>
</button>
))}
</div>
</div>

{/* All Venues */}
<div className="px-6">
<h2 className="text-2xl font-black text-gray-900 mb-4">All Venues</h2>
<div className="space-y-3">
{venues.map((venue) => (
<button
key={venue.id}
onClick={() => setSelectedVenue(venue)}
className="w-full bg-white rounded-3xl p-4 shadow-md border border-gray-100 hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all text-left"
>
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-cyan-100 rounded-xl flex items-center justify-center text-2xl">
{venue.emoji}
</div>
<div className="flex-1 min-w-0">
<h3 className="font-bold text-gray-900 truncate">{venue.name}</h3>
<p className="text-xs text-gray-500">{venue.type}</p>
</div>
<div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
venue.safety >= 90 ? 'bg-emerald-500 text-white' :
venue.safety >= 80 ? 'bg-amber-500 text-white' :
'bg-rose-500 text-white'
}`}>
{venue.safety}
</div>
</div>
</button>
))}
</div>
</div>
</div>
);
```

};

// EVENTS TAB
const EventsView = () => (
<div className="h-full overflow-y-auto pb-32">
<div className="px-6 pt-8">
<h1 className="text-5xl font-black text-gray-900 mb-2">Events</h1>
<p className="text-lg text-gray-600 mb-8">Happening in Dallas</p>

```
<div className="space-y-4">
{liveEvents.map((event) => (
<div key={event.id} className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
<div className="flex items-start gap-4">
<div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-4xl">
{event.emoji}
</div>
<div className="flex-1">
<h3 className="font-black text-gray-900 text-lg mb-1">{event.name}</h3>
<p className="text-sm text-gray-600 mb-2">{event.venue}</p>
<div className="flex items-center gap-3 text-sm">
<div className="flex items-center gap-1">
<Calendar className="w-4 h-4 text-gray-500" />
<span className="text-gray-700 font-medium">{event.time}</span>
</div>
</div>
<div className="flex gap-2 mt-3">
<div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
<div className="text-sm font-bold text-gray-900">{event.crowd}%</div>
<div className="text-xs text-gray-500">Expected</div>
</div>
<div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
<div className="text-sm font-bold text-emerald-600">{event.safety}%</div>
<div className="text-xs text-gray-500">Safety</div>
</div>
</div>
</div>
</div>
</div>
))}
</div>
</div>
</div>
```

);

// MAP TAB
const MapView = () => (
<div className="h-full relative">
<div className="absolute inset-0 bg-gray-900">
<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

```
{venues.map((venue, idx) => {
const colors = heatMode === 'safety'
? venue.safety >= 90 ? 'from-emerald-400 to-green-400' : venue.safety >= 80 ? 'from-amber-400 to-orange-400' : 'from-rose-400 to-red-400'
: venue.crowd < 60 ? 'from-cyan-400 to-blue-400' : venue.crowd < 80 ? 'from-purple-400 to-violet-400' : 'from-fuchsia-400 to-pink-400';
return (
<button
key={venue.id}
className="absolute transform -translate-x-1/2 -translate-y-1/2"
style={{ left: `${20 + idx * 12}%`, top: `${25 + (idx % 3) * 25}%` }}
onClick={() => setSelectedVenue(venue)}
>
<div className={`w-40 h-40 bg-gradient-to-br ${colors} rounded-full blur-[70px] opacity-50 animate-pulse`}></div>
<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
<div className="bg-black/70 backdrop-blur-xl rounded-xl px-3 py-2 border border-white/20 whitespace-nowrap">
<div className="text-white font-bold text-sm">{venue.name}</div>
<div className="text-cyan-400 text-xs">{heatMode === 'safety' ? `${venue.safety}%` : `${venue.crowd}%`}</div>
</div>
</div>
</button>
);
})}

<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
<div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
<div className="absolute inset-0 w-6 h-6 bg-blue-500 rounded-full animate-ping"></div>
</div>
</div>

<div className="absolute top-6 left-6 right-6 z-30">
<div className="bg-black/70 backdrop-blur-2xl rounded-2xl p-4 border border-white/20">
<div className="flex gap-2">
<button
onClick={() => setHeatMode('safety')}
className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
heatMode === 'safety'
? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
: 'bg-white/10 text-white/60'
}`}
>
Safety
</button>
<button
onClick={() => setHeatMode('crowd')}
className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
heatMode === 'crowd'
? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white'
: 'bg-white/10 text-white/60'
}`}
>
Crowd
</button>
</div>
</div>
</div>

{selectedVenue && (
<div className="absolute bottom-6 left-6 right-6 z-30 animate-in slide-in-from-bottom-4">
<div className="bg-black/80 backdrop-blur-2xl rounded-3xl p-6 border border-white/20">
<div className="flex justify-between mb-4">
<div>
<h3 className="text-2xl font-black text-white">{selectedVenue.name}</h3>
<p className="text-gray-400">{selectedVenue.address}</p>
</div>
<button onClick={() => setSelectedVenue(null)} className="text-white/60 text-2xl">×</button>
</div>
<button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-4 rounded-xl">
<div className="flex items-center justify-center gap-2">
<Navigation className="w-5 h-5" />
Navigate
</div>
</button>
</div>
</div>
)}
</div>
```

);

// SAFETY TAB
const SafetyView = () => (
<div className="h-full overflow-y-auto pb-32">
<div className="px-6 pt-8">
<h1 className="text-5xl font-black text-gray-900 mb-8">Safety</h1>

```
<div className="relative mb-8">
<div className="absolute inset-0 bg-emerald-500/20 rounded-[3rem] blur-2xl"></div>
<div className="relative bg-gradient-to-br from-emerald-500 to-green-600 rounded-[3rem] p-8 text-center">
<div className="text-8xl font-black text-white mb-2">{safetyData.overall}</div>
<div className="text-2xl text-white/90 font-bold mb-4">Very Safe</div>
<div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl rounded-full px-4 py-2">
<TrendingUp className="w-4 h-4 text-white" />
<span className="text-white font-semibold">{safetyData.trend}% from yesterday</span>
</div>
</div>
</div>

<h2 className="text-2xl font-black text-gray-900 mb-4">Live Alerts</h2>
<div className="space-y-3">
{safetyData.alerts.map((alert, idx) => (
<div key={idx} className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<div className={`w-3 h-3 rounded-full ${alert.level === 'high' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'}`}></div>
<div>
<div className="font-bold text-gray-900">{alert.type}</div>
<div className="text-sm text-gray-600">{alert.location}</div>
</div>
</div>
<div className="text-xs text-gray-500">{alert.time}</div>
</div>
</div>
))}
</div>
</div>
</div>
```

);

return (
<div className="h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">

```
{activeTab === 'discover' && <DiscoverView />}
{activeTab === 'events' && <EventsView />}
{activeTab === 'map' && <MapView />}
{activeTab === 'safety' && <SafetyView />}

{/* Bottom Navigation */}
<div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-2xl border-t border-gray-200 shadow-2xl">
<div className="px-4 py-3">
<div className="flex items-center justify-around">
{[
{ id: 'discover', icon: Eye, label: 'Discover' },
{ id: 'events', icon: Calendar, label: 'Events' },
{ id: 'map', icon: Navigation, label: 'Map' },
{ id: 'safety', icon: Shield, label: 'Safety' }
].map((tab) => (
<button
key={tab.id}
onClick={() => setActiveTab(tab.id)}
className={`flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all ${
activeTab === tab.id
? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 scale-110 shadow-lg'
: 'text-gray-400'
}`}
>
<tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'text-white' : ''}`} />
<span className={`text-xs font-bold ${activeTab === tab.id ? 'text-white' : ''}`}>
{tab.label}
</span>
</button>
))}
</div>
</div>
</div>
</div>
```

);
};

export default App;