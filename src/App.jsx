import React, { useState, useEffect } from 'react';
import { Mic, Sparkles, Clock, TrendingUp, AlertCircle, CheckCircle, MapPin, Radio, Siren, Zap, Users, Shield, Phone, Navigation } from 'lucide-react';

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMode, setActiveMode] = useState('intelligence'); // intelligence, districts, emergency
  const [voiceActive, setVoiceActive] = useState(false);
  const [activeView, setActiveView] = useState('now');
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [aiInsight, setAiInsight] = useState(null);
  const [breathe, setBreathe] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const breatheTimer = setInterval(() => setBreathe(b => (b + 0.3) % 360), 50);
    
    const insightTimer = setTimeout(() => {
      if (activeMode === 'intelligence') {
        setAiInsight({
          text: "Oak Cliff crowd expected to peak in 2 hours",
          confidence: 94
        });
      }
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(breatheTimer);
      clearTimeout(insightTimer);
    };
  }, [activeMode]);

  const districts = [
    { id: 1, name: 'Oak Cliff', score: 78, population: 245000, trend: '-3', status: 'moderate', alerts: 2, units: 12, response: '4 min' },
    { id: 2, name: 'Uptown', score: 85, population: 189000, trend: '+5', status: 'safe', alerts: 0, units: 8, response: '3 min' },
    { id: 3, name: 'Downtown', score: 72, population: 312000, trend: '-7', status: 'caution', alerts: 5, units: 18, response: '6 min' },
    { id: 4, name: 'Design District', score: 88, population: 156000, trend: '+2', status: 'safe', alerts: 1, units: 6, response: '3 min' },
    { id: 5, name: 'Arts District', score: 81, population: 198000, trend: '+1', status: 'moderate', alerts: 1, units: 9, response: '4 min' }
  ];

  const emergencyUnits = [
    { id: 'AMB-01', type: 'Ambulance', status: 'En Route', location: 'Oak Cliff', eta: '3 min', priority: 'high' },
    { id: 'POL-15', type: 'Police', status: 'Available', location: 'Uptown', eta: '-', priority: 'normal' },
    { id: 'AMB-03', type: 'Ambulance', status: 'On Scene', location: 'Downtown', eta: '-', priority: 'critical' },
    { id: 'POL-22', type: 'Police', status: 'En Route', location: 'Arts District', eta: '5 min', priority: 'high' },
    { id: 'AMB-05', type: 'Ambulance', status: 'Available', location: 'Design District', eta: '-', priority: 'normal' }
  ];

  const timeViews = {
    past: { title: 'Yesterday', data: { score: 82 }, color: 'from-gray-400 to-gray-300', glow: 'rgba(156, 163, 175, 0.3)' },
    now: { title: 'Right Now', data: { score: 85 }, color: 'from-emerald-400 to-green-300', glow: 'rgba(16, 185, 129, 0.5)' },
    future: { title: 'In 2 Hours', data: { score: 78 }, color: 'from-amber-400 to-orange-300', glow: 'rgba(251, 146, 60, 0.4)' }
  };

  const currentView = timeViews[activeView];

  const getStatusColor = (status) => {
    switch(status) {
      case 'safe': return 'from-emerald-400 to-green-300';
      case 'moderate': return 'from-amber-400 to-orange-300';
      case 'caution': return 'from-rose-400 to-red-300';
      default: return 'from-gray-400 to-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'normal': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full blur-[160px] transition-all duration-[3000ms]"
          style={{ 
            background: activeMode === 'emergency' ? 'rgba(239, 68, 68, 0.4)' : currentView?.glow || 'rgba(16, 185, 129, 0.5)',
            transform: `translate(${Math.sin(breathe * 0.02) * 100}px, ${Math.cos(breathe * 0.02) * 100}px) scale(${1 + Math.sin(breathe * 0.01) * 0.2})`,
            opacity: 0.4
          }}
        ></div>
      </div>

      {/* Mode Selector - Top */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-2xl rounded-full p-2 border border-white/10">
          <button
            onClick={() => setActiveMode('intelligence')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
              activeMode === 'intelligence' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Intelligence</span>
          </button>
          <button
            onClick={() => setActiveMode('districts')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
              activeMode === 'districts' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Districts</span>
          </button>
          <button
            onClick={() => setActiveMode('emergency')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
              activeMode === 'emergency' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Siren className="w-4 h-4" />
            <span>Emergency</span>
          </button>
        </div>
      </div>

      {/* INTELLIGENCE MODE */}
      {activeMode === 'intelligence' && (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-16">
          
          {/* Time Navigation */}
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-2xl rounded-full p-2 border border-white/10">
              {['past', 'now', 'future'].map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
                    activeView === view ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {view === 'past' && 'Yesterday'}
                  {view === 'now' && 'Now'}
                  {view === 'future' && 'Predicted'}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full max-w-4xl">
            <div className="text-center mb-16 transition-all duration-700">
              <div className="text-gray-500 text-2xl mb-4 font-light">{currentView.title}</div>
              <div 
                className={`text-[14rem] font-bold leading-none bg-gradient-to-br ${currentView.color} bg-clip-text text-transparent transition-all duration-700`}
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
              >
                {currentView.data.score}
              </div>
            </div>

            {aiInsight && (
              <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 group hover:bg-white/8 transition-all">
                  <div className="flex items-start gap-4">
                    <Sparkles className="w-6 h-6 text-purple-400 mt-1" />
                    <div className="flex-1">
                      <div className="text-xl text-white font-medium mb-2">{aiInsight.text}</div>
                      <div className="text-sm text-gray-500 font-mono">{aiInsight.confidence}% confidence</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DISTRICTS MODE */}
      {activeMode === 'districts' && (
        <div className="relative min-h-screen pt-32 px-16 pb-24">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-6xl font-bold mb-4">District Command</h1>
              <p className="text-2xl text-gray-500 font-light">Real-time oversight for city officials</p>
            </div>

            {/* Districts Grid */}
            <div className="grid grid-cols-2 gap-8">
              {districts.map((district) => (
                <div 
                  key={district.id}
                  onClick={() => setSelectedDistrict(selectedDistrict === district.id ? null : district.id)}
                  className={`group cursor-pointer transition-all duration-500 ${
                    selectedDistrict === district.id ? 'scale-[1.02]' : ''
                  }`}
                >
                  <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-3xl font-bold mb-2">{district.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            district.status === 'safe' ? 'bg-emerald-400' :
                            district.status === 'moderate' ? 'bg-amber-400' : 'bg-rose-400'
                          }`}></div>
                          <span className="text-gray-400 capitalize">{district.status}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-5xl font-bold bg-gradient-to-br ${getStatusColor(district.status)} bg-clip-text text-transparent`}>
                          {district.score}
                        </div>
                        <div className={`text-sm font-medium ${district.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {district.trend}%
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/5 rounded-2xl p-4">
                        <div className="text-gray-500 text-xs mb-1">Population</div>
                        <div className="text-white font-bold">{(district.population / 1000).toFixed(0)}K</div>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4">
                        <div className="text-gray-500 text-xs mb-1">Alerts</div>
                        <div className="text-white font-bold">{district.alerts}</div>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4">
                        <div className="text-gray-500 text-xs mb-1">Response</div>
                        <div className="text-white font-bold">{district.response}</div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedDistrict === district.id && (
                      <div className="border-t border-white/10 pt-6 animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Shield className="w-4 h-4" />
                            <span>{district.units} units deployed</span>
                          </div>
                          <button className="px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors">
                            Deploy
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Footer */}
            <div className="mt-12 bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
              <div className="grid grid-cols-4 gap-8">
                <div>
                  <div className="text-gray-500 text-sm mb-2">Total Population</div>
                  <div className="text-3xl font-bold">1.1M</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-2">Active Alerts</div>
                  <div className="text-3xl font-bold text-amber-400">9</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-2">Units Deployed</div>
                  <div className="text-3xl font-bold text-emerald-400">53</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-2">Avg Response</div>
                  <div className="text-3xl font-bold">4.2 min</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EMERGENCY MODE */}
      {activeMode === 'emergency' && (
        <div className="relative min-h-screen pt-32 px-16 pb-24">
          <div className="max-w-7xl mx-auto">
            
            {/* Emergency Header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
                </div>
                <span className="text-red-400 text-sm font-medium">LIVE DISPATCH</span>
              </div>
              <h1 className="text-6xl font-bold mb-4">Emergency Command</h1>
              <p className="text-2xl text-gray-500 font-light">Real-time unit deployment and tracking</p>
            </div>

            {/* Quick Deploy */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <button className="group bg-gradient-to-br from-red-500/20 to-rose-500/20 hover:from-red-500/30 hover:to-rose-500/30 backdrop-blur-2xl rounded-3xl p-8 border border-red-500/30 hover:border-red-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="flex items-center gap-3 mb-3">
                      <Siren className="w-8 h-8 text-red-400" />
                      <h3 className="text-2xl font-bold">Deploy Ambulance</h3>
                    </div>
                    <p className="text-gray-400">3 units available</p>
                  </div>
                  <div className="text-5xl">🚑</div>
                </div>
              </button>

              <button className="group bg-gradient-to-br from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 backdrop-blur-2xl rounded-3xl p-8 border border-blue-500/30 hover:border-blue-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="w-8 h-8 text-blue-400" />
                      <h3 className="text-2xl font-bold">Deploy Police</h3>
                    </div>
                    <p className="text-gray-400">2 units available</p>
                  </div>
                  <div className="text-5xl">🚓</div>
                </div>
              </button>
            </div>

            {/* Active Units */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Active Units</h3>
              <div className="space-y-4">
                {emergencyUnits.map((unit) => (
                  <div 
                    key={unit.id}
                    className="bg-white/5 rounded-2xl p-6 hover:bg-white/8 transition-all border border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 flex-1">
                        {/* Unit ID & Type */}
                        <div className="min-w-[120px]">
                          <div className="text-white font-bold mb-1">{unit.id}</div>
                          <div className="text-gray-500 text-sm">{unit.type}</div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            unit.status === 'En Route' ? 'bg-amber-400 animate-pulse' :
                            unit.status === 'On Scene' ? 'bg-red-400 animate-pulse' :
                            'bg-emerald-400'
                          }`}></div>
                          <span className="text-gray-400 text-sm">{unit.status}</span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-400">{unit.location}</span>
                        </div>

                        {/* ETA */}
                        {unit.eta !== '-' && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-white font-medium">{unit.eta}</span>
                          </div>
                        )}
                      </div>

                      {/* Priority Badge */}
                      <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(unit.priority)} text-white`}>
                          {unit.priority.toUpperCase()}
                        </div>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Phone className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Voice Control - Bottom Right */}
      <div className="fixed bottom-12 right-12 z-50">
        <button 
          onClick={() => setVoiceActive(!voiceActive)}
          className="group relative"
        >
          <div className={`absolute inset-0 bg-blue-500 rounded-full blur-2xl transition-opacity duration-500 ${
            voiceActive ? 'opacity-60' : 'opacity-0 group-hover:opacity-30'
          }`}></div>
          <div className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            voiceActive ? 'bg-blue-500 scale-110' : 'bg-white/10 group-hover:bg-white/20'
          } border border-white/20`}>
            <Mic className={`w-6 h-6 transition-colors ${voiceActive ? 'text-white' : 'text-gray-400'}`} />
          </div>
        </button>
        
        {voiceActive && (
          <div className="absolute bottom-full right-0 mb-4 bg-white/10 backdrop-blur-2xl rounded-2xl px-4 py-3 border border-white/20 whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-sm text-white">Listening...</span>
            </div>
          </div>
        )}
      </div>

      {/* Time Display */}
      <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 text-6xl font-mono font-light text-gray-600 tracking-wider">
        {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default App;