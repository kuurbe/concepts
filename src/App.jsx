import React, { useState, useEffect } from ‘react’;
import { MapPin, Navigation, AlertCircle, Clock, Shield, Users, TrendingUp, ChevronRight, Play, Info, Bell, Search, Menu } from ‘lucide-react’;

const App = () => {
const [appState, setAppState] = useState(‘splash’);
const [activeView, setActiveView] = useState(‘now’);
const [selectedVenue, setSelectedVenue] = useState(null);
const [currentTime, setCurrentTime] = useState(new Date());
const [liveAlerts, setLiveAlerts] = useState([]);

// Real-time clock
useEffect(() => {
const timer = setInterval(() => setCurrentTime(new Date()), 60000);
return () => clearInterval(timer);
}, []);

// Simulated live alerts
useEffect(() => {
if (appState === ‘main’) {
const alertInterval = setInterval(() => {
// Simulate incoming alerts
const newAlert = {
id: Date.now(),
type: Math.random() > 0.5 ? ‘crowd’ : ‘safety’,
severity: Math.random() > 0.7 ? ‘high’ : ‘medium’,
message: ‘Bishop Arts crowd increasing’,
time: new Date()
};
setLiveAlerts(prev => [newAlert, …prev.slice(0, 4)]);
}, 15000);
return () => clearInterval(alertInterval);
}
}, [appState]);

// VENUE DATA - Real-time Oak Cliff
const venues = [
{
id: 1,
name: ‘Bishop Arts District’,
type: ‘Arts & Shopping’,
address: ‘N Bishop Ave, Oak Cliff’,
distance: ‘0.3 mi’,
status: ‘moderate’,
crowd: 68,
safety: 94,
trending: true,
image: ‘🎨’,
description: ‘Gallery openings and boutique shopping’,
peakTime: ‘7:00 PM’,
currentWait: ‘No wait’,
isOpen: true,
hours: ‘Open until 10 PM’,
civicZone: ‘Oak Cliff Arts District’,
alerts: [‘Street event 6-9 PM’, ‘Limited parking on Bishop Ave’]
},
{
id: 2,
name: ‘Kessler Theater’,
type: ‘Live Venue’,
address: ‘1230 W Davis St’,
distance: ‘0.8 mi’,
status: ‘clear’,
crowd: 42,
safety: 96,
trending: false,
image: ‘🎭’,
description: ‘Historic theater with live performances’,
peakTime: ‘8:30 PM’,
currentWait: ‘Tickets available’,
isOpen: true,
hours: ‘Show at 8 PM’,
civicZone: ‘Historic Oak Cliff’,
alerts: []
},
{
id: 3,
name: ‘Fuel City Tacos’,
type: ‘Restaurant’,
address: ‘801 S Riverfront Blvd’,
distance: ‘1.2 mi’,
status: ‘busy’,
crowd: 85,
safety: 90,
trending: true,
image: ‘🌮’,
description: ‘Authentic tacos, open 24/7’,
peakTime: ‘Always busy’,
currentWait: ‘15-20 min’,
isOpen: true,
hours: ‘Open 24/7’,
civicZone: ‘Industrial District’,
alerts: [‘High volume’, ‘Cash preferred’]
},
{
id: 4,
name: ‘Trinity River Park’,
type: ‘Outdoor’,
address: ‘Great Trinity Forest’,
distance: ‘1.5 mi’,
status: ‘clear’,
crowd: 28,
safety: 98,
trending: false,
image: ‘🌳’,
description: ‘6,000 acres of urban forest and trails’,
peakTime: ‘Sunset (6:45 PM)’,
currentWait: ‘Open access’,
isOpen: true,
hours: ‘Dawn to dusk’,
civicZone: ‘Great Trinity Forest’,
alerts: []
},
{
id: 5,
name: ‘Oak Cliff Brewing’,
type: ‘Brewery’,
address: ‘301 E 8th St’,
distance: ‘0.6 mi’,
status: ‘moderate’,
crowd: 72,
safety: 92,
trending: true,
image: ‘🍺’,
description: ‘Craft brewery with patio seating’,
peakTime: ‘Happy hour now’,
currentWait: ‘5-10 min for table’,
isOpen: true,
hours: ‘Open until midnight’,
civicZone: ‘Oak Cliff Commercial’,
alerts: [‘Live music at 8 PM’]
}
];

// CIVIC INTELLIGENCE
const oakCliffStatus = {
overall: ‘SAFE’,
safetyScore: 94,
activeIncidents: 0,
trafficLevel: ‘MODERATE’,
crowdLevel: ‘MODERATE’,
trend: ‘IMPROVING’,
lastUpdate: new Date(),
alerts: [
{ type: ‘event’, message: ‘First Friday Art Walk - Bishop Ave closed’, severity: ‘medium’ },
{ type: ‘traffic’, message: ‘I-35E southbound delays near Colorado’, severity: ‘low’ }
]
};

if (appState === ‘splash’) {
return (
<div className="h-screen bg-black relative overflow-hidden">
{/* Subtle grid pattern */}
<div className="absolute inset-0 opacity-10">
<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
</div>

```
<div className="relative h-full flex flex-col items-center justify-center px-8">
<div className="text-center">
{/* Logo */}
<div className="mb-8">
<div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
<MapPin className="w-8 h-8 text-red-500" strokeWidth={2} />
<h1 className="text-5xl font-bold text-white tracking-tight">KROWD</h1>
</div>
</div>

<p className="text-2xl text-gray-400 mb-12 font-light">
Oak Cliff Intelligence
</p>

<button
onClick={() => setAppState('main')}
className="group relative px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-lg shadow-2xl transition-all"
>
Start Exploring
</button>

<div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-600">
<Shield className="w-4 h-4" />
<span>Powered by Dallas Open Data</span>
</div>
</div>
</div>
</div>
);
```

}

// STATUS INDICATOR COMPONENT
const StatusBadge = ({ status }) => {
const config = {
clear: { bg: ‘bg-emerald-500/10’, text: ‘text-emerald-400’, border: ‘border-emerald-500/20’, label: ‘CLEAR’ },
moderate: { bg: ‘bg-amber-500/10’, text: ‘text-amber-400’, border: ‘border-amber-500/20’, label: ‘MODERATE’ },
busy: { bg: ‘bg-red-500/10’, text: ‘text-red-400’, border: ‘border-red-500/20’, label: ‘BUSY’ }
};
const style = config[status] || config.clear;

```
return (
<div className={`inline-flex items-center gap-2 px-3 py-1 ${style.bg} ${style.text} border ${style.border} rounded-full text-xs font-bold tracking-wide`}>
<div className={`w-2 h-2 rounded-full ${style.text.replace('text-', 'bg-')} animate-pulse`}></div>
{style.label}
</div>
);
```

};

// NOW VIEW - Real-time intelligence
const NowView = () => {
const featuredVenue = venues[0];

```
return (
<div className="h-full overflow-y-auto pb-24 bg-black">
{/* Hero Section - Featured Venue */}
<div className="relative h-[60vh] overflow-hidden">
{/* Gradient overlay */}
<div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
{/* Background pattern (simulating image) */}
<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black">
<div className="absolute inset-0 flex items-center justify-center opacity-20">
<div className="text-[20rem]">{featuredVenue.image}</div>
</div>
</div>

{/* Content */}
<div className="relative z-20 h-full flex flex-col justify-end p-6 pb-12">
<StatusBadge status={featuredVenue.status} />
<h1 className="text-5xl font-bold text-white mt-4 mb-3 leading-tight">
{featuredVenue.name}
</h1>
<p className="text-lg text-gray-300 mb-4 max-w-md">
{featuredVenue.description}
</p>

<div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
<span className="flex items-center gap-1">
<MapPin className="w-4 h-4" />
{featuredVenue.distance}
</span>
<span className="flex items-center gap-1">
<Clock className="w-4 h-4" />
{featuredVenue.peakTime}
</span>
<span className="flex items-center gap-1">
<Users className="w-4 h-4" />
{featuredVenue.crowd}% capacity
</span>
</div>

{/* Action buttons */}
<div className="flex gap-3">
<button
onClick={() => setSelectedVenue(featuredVenue)}
className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors"
>
<Play className="w-5 h-5" fill="currentColor" />
Navigate
</button>
<button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20">
<Info className="w-5 h-5" />
Details
</button>
</div>
</div>
</div>

{/* Live Alerts Bar */}
{oakCliffStatus.alerts.length > 0 && (
<div className="px-6 py-4 bg-amber-500/10 border-l-4 border-amber-500">
<div className="flex items-start gap-3">
<AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
<div className="flex-1">
<div className="text-sm font-bold text-amber-400 mb-1">ACTIVE ALERTS</div>
{oakCliffStatus.alerts.map((alert, idx) => (
<div key={idx} className="text-sm text-gray-300">{alert.message}</div>
))}
</div>
<div className="text-xs text-gray-500">LIVE</div>
</div>
</div>
)}

{/* Trending Now */}
<div className="px-6 py-8">
<div className="flex items-center justify-between mb-6">
<h2 className="text-2xl font-bold text-white">Trending Now</h2>
<button className="text-sm text-gray-400 hover:text-white transition-colors">
See All
</button>
</div>

<div className="space-y-3">
{venues.filter(v => v.trending).slice(1).map((venue) => (
<button
key={venue.id}
onClick={() => setSelectedVenue(venue)}
className="w-full group bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-xl p-4 transition-all border border-white/10 hover:border-white/20 text-left"
>
<div className="flex items-start gap-4">
<div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
{venue.image}
</div>
<div className="flex-1 min-w-0">
<div className="flex items-start justify-between mb-2">
<div className="flex-1">
<h3 className="text-lg font-bold text-white mb-1">{venue.name}</h3>
<p className="text-sm text-gray-400">{venue.type}</p>
</div>
<StatusBadge status={venue.status} />
</div>

<div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
<span>{venue.distance}</span>
<span>•</span>
<span>{venue.currentWait}</span>
</div>

{venue.alerts.length > 0 && (
<div className="flex items-center gap-2 text-xs text-amber-400">
<AlertCircle className="w-3 h-3" />
<span>{venue.alerts[0]}</span>
</div>
)}
</div>

<ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors flex-shrink-0 mt-6" />
</div>
</button>
))}
</div>
</div>

{/* All Venues */}
<div className="px-6 pb-8">
<h2 className="text-2xl font-bold text-white mb-6">All Locations</h2>
<div className="space-y-2">
{venues.map((venue) => (
<button
key={venue.id}
onClick={() => setSelectedVenue(venue)}
className="w-full group bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-lg p-4 transition-all border border-white/5 hover:border-white/10 text-left"
>
<div className="flex items-center gap-4">
<div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center text-2xl">
{venue.image}
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center justify-between mb-1">
<h3 className="text-base font-semibold text-white">{venue.name}</h3>
<StatusBadge status={venue.status} />
</div>
<p className="text-sm text-gray-500">{venue.distance} • {venue.currentWait}</p>
</div>

<ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
</div>
</button>
))}
</div>
</div>
</div>
);
```

};

// MAP VIEW
const MapView = () => (
<div className="h-full relative bg-black">
{/* Dark map background */}
<div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

```
{/* Venue markers */}
{venues.map((venue, idx) => {
const statusColor =
venue.status === 'clear' ? 'from-emerald-400 to-green-400' :
venue.status === 'moderate' ? 'from-amber-400 to-orange-400' :
'from-red-400 to-rose-400';
return (
<button
key={venue.id}
className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
style={{
left: `${20 + idx * 15}%`,
top: `${25 + (idx % 3) * 25}%`
}}
onClick={() => setSelectedVenue(venue)}
>
{/* Glow */}
<div className={`w-32 h-32 bg-gradient-to-br ${statusColor} rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition-opacity`}></div>
{/* Marker */}
<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
<div className="bg-black/90 backdrop-blur-xl rounded-xl p-3 border border-white/20 shadow-2xl min-w-[140px]">
<div className="flex items-center gap-2 mb-2">
<div className={`w-10 h-10 bg-gradient-to-br ${statusColor} rounded-lg flex items-center justify-center text-xl`}>
{venue.image}
</div>
<div className="flex-1 min-w-0">
<div className="text-xs font-bold text-white truncate">{venue.name}</div>
<div className="text-xs text-gray-500">{venue.distance}</div>
</div>
</div>
<StatusBadge status={venue.status} />
</div>
</div>
</button>
);
})}

{/* User location */}
<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
<div className="relative">
<div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-black shadow-lg"></div>
<div className="absolute inset-0 w-6 h-6 bg-blue-500 rounded-full animate-ping"></div>
</div>
</div>
</div>

{/* Map controls */}
<div className="absolute top-6 left-6 right-6 z-20">
<div className="bg-black/80 backdrop-blur-2xl rounded-xl p-4 border border-white/10">
<div className="flex items-center justify-between mb-3">
<div className="text-white font-bold">Oak Cliff Live</div>
<div className="flex items-center gap-2 text-xs text-gray-400">
<div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
UPDATING
</div>
</div>
<div className="grid grid-cols-3 gap-2 text-xs">
<div className="text-center py-2 bg-white/5 rounded-lg border border-white/10">
<div className="text-emerald-400 font-bold">{oakCliffStatus.safetyScore}</div>
<div className="text-gray-500">Safety</div>
</div>
<div className="text-center py-2 bg-white/5 rounded-lg border border-white/10">
<div className="text-amber-400 font-bold">{oakCliffStatus.trafficLevel}</div>
<div className="text-gray-500">Traffic</div>
</div>
<div className="text-center py-2 bg-white/5 rounded-lg border border-white/10">
<div className="text-white font-bold">{venues.filter(v => v.trending).length}</div>
<div className="text-gray-500">Trending</div>
</div>
</div>
</div>
</div>

{/* Selected venue bottom sheet */}
{selectedVenue && (
<div className="absolute bottom-0 left-0 right-0 z-30 animate-in slide-in-from-bottom-4">
<div className="px-6 pb-24">
<div className="bg-black/95 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-2xl">
<div className="flex justify-between items-start mb-4">
<div className="flex items-start gap-4">
<div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-3xl">
{selectedVenue.image}
</div>
<div>
<h3 className="text-xl font-bold text-white mb-1">{selectedVenue.name}</h3>
<p className="text-sm text-gray-400 mb-2">{selectedVenue.address}</p>
<StatusBadge status={selectedVenue.status} />
</div>
</div>
<button
onClick={() => setSelectedVenue(null)}
className="text-gray-500 hover:text-white text-2xl leading-none"
>
×
</button>
</div>

<div className="grid grid-cols-3 gap-2 mb-4 text-xs">
<div className="bg-white/5 rounded-lg p-2 text-center border border-white/10">
<div className="text-lg font-bold text-white">{selectedVenue.crowd}%</div>
<div className="text-gray-500">Capacity</div>
</div>
<div className="bg-white/5 rounded-lg p-2 text-center border border-white/10">
<div className="text-lg font-bold text-emerald-400">{selectedVenue.safety}%</div>
<div className="text-gray-500">Safety</div>
</div>
<div className="bg-white/5 rounded-lg p-2 text-center border border-white/10">
<div className="text-lg font-bold text-white">{selectedVenue.currentWait}</div>
<div className="text-gray-500">Wait</div>
</div>
</div>

<button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
<Navigation className="w-5 h-5" />
Navigate Now
</button>

<div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-500">
{selectedVenue.civicZone} • {selectedVenue.hours}
</div>
</div>
</div>
</div>
)}
</div>
```

);

// ALERTS VIEW
const AlertsView = () => (
<div className="h-full overflow-y-auto pb-24 bg-black">
<div className="px-6 pt-8">
<h1 className="text-4xl font-bold text-white mb-2">Oak Cliff Status</h1>
<p className="text-gray-400 mb-8">
Real-time intelligence • Updated {currentTime.toLocaleTimeString([], { hour: ‘2-digit’, minute: ‘2-digit’ })}
</p>

```
{/* Overall status card */}
<div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl p-6 mb-6 border border-emerald-500/20">
<div className="flex items-start justify-between mb-4">
<div>
<div className="text-sm font-bold text-emerald-400 mb-2">OVERALL STATUS</div>
<div className="text-5xl font-bold text-white mb-2">{oakCliffStatus.overall}</div>
<div className="text-sm text-gray-400">Safety Score: {oakCliffStatus.safetyScore}/100</div>
</div>
<Shield className="w-16 h-16 text-emerald-400/50" />
</div>
<div className="flex items-center gap-2 text-sm text-emerald-400">
<TrendingUp className="w-4 h-4" />
<span className="font-semibold">{oakCliffStatus.trend}</span>
</div>
</div>

{/* Quick stats */}
<div className="grid grid-cols-2 gap-4 mb-8">
<div className="bg-white/5 rounded-xl p-4 border border-white/10">
<div className="text-2xl font-bold text-white mb-1">{oakCliffStatus.activeIncidents}</div>
<div className="text-sm text-gray-400">Active Incidents</div>
</div>
<div className="bg-white/5 rounded-xl p-4 border border-white/10">
<div className="text-2xl font-bold text-amber-400 mb-1">{oakCliffStatus.trafficLevel}</div>
<div className="text-sm text-gray-400">Traffic</div>
</div>
</div>

{/* Active alerts */}
<h2 className="text-xl font-bold text-white mb-4">Active Alerts</h2>
<div className="space-y-3 mb-8">
{oakCliffStatus.alerts.map((alert, idx) => (
<div
key={idx}
className={`p-4 rounded-xl border ${
alert.severity === 'high' ? 'bg-red-500/10 border-red-500/20' :
alert.severity === 'medium' ? 'bg-amber-500/10 border-amber-500/20' :
'bg-blue-500/10 border-blue-500/20'
}`}
>
<div className="flex items-start gap-3">
<AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
alert.severity === 'high' ? 'text-red-400' :
alert.severity === 'medium' ? 'text-amber-400' :
'text-blue-400'
}`} />
<div className="flex-1">
<div className={`text-sm font-bold mb-1 ${
alert.severity === 'high' ? 'text-red-400' :
alert.severity === 'medium' ? 'text-amber-400' :
'text-blue-400'
}`}>
{alert.type.toUpperCase()}
</div>
<div className="text-sm text-gray-300">{alert.message}</div>
</div>
<div className="text-xs text-gray-500">LIVE</div>
</div>
</div>
))}
</div>

{/* Venue status list */}
<h2 className="text-xl font-bold text-white mb-4">Venue Status</h2>
<div className="space-y-2">
{venues.map((venue) => (
<div key={venue.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
<div className="flex items-center justify-between mb-2">
<div className="font-semibold text-white">{venue.name}</div>
<StatusBadge status={venue.status} />
</div>
<div className="flex items-center gap-4 text-xs text-gray-500">
<span>{venue.crowd}% capacity</span>
<span>•</span>
<span>{venue.currentWait}</span>
</div>
</div>
))}
</div>
</div>
</div>
```

);

return (
<div className="h-screen bg-black flex flex-col">
{/* Top bar */}
{appState === ‘main’ && (
<div className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-black via-black/80 to-transparent pt-6 pb-12 px-6">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<MapPin className="w-6 h-6 text-red-500" />
<div>
<div className="text-xl font-bold text-white">KROWD</div>
<div className="text-xs text-gray-500">Oak Cliff</div>
</div>
</div>
<div className="flex items-center gap-3">
<button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
<Search className="w-5 h-5 text-gray-400" />
</button>
<button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
<Bell className="w-5 h-5 text-gray-400" />
</button>
</div>
</div>
</div>
)}

```
{/* Main content */}
{activeView === 'now' && <NowView />}
{activeView === 'map' && <MapView />}
{activeView === 'alerts' && <AlertsView />}

{/* Bottom navigation */}
{appState === 'main' && (
<div className="absolute bottom-0 left-0 right-0 bg-black/95 backdrop-blur-2xl border-t border-white/10">
<div className="px-4 py-3">
<div className="flex items-center justify-around">
{[
{ id: 'now', icon: Play, label: 'Now' },
{ id: 'map', icon: MapPin, label: 'Map' },
{ id: 'alerts', icon: AlertCircle, label: 'Alerts' }
].map((tab) => (
<button
key={tab.id}
onClick={() => setActiveView(tab.id)}
className={`flex flex-col items-center gap-1 px-8 py-2 rounded-lg transition-all ${
activeView === tab.id
? 'text-white'
: 'text-gray-500 hover:text-gray-300'
}`}
>
<tab.icon
className={`w-6 h-6 ${activeView === tab.id ? 'fill-red-500 text-red-500' : ''}`}
strokeWidth={2}
/>
<span className="text-xs font-semibold">
{tab.label}
</span>
</button>
))}
</div>
</div>
</div>
)}
</div>
```

);
};

export default App;