import React, { useState, useEffect } from 'react';
import { MapPin, Users, Shield, TrendingUp, Sparkles, Circle, Clock, Star, ChevronRight } from 'lucide-react';

const App = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('Oak Cliff');
  const [activeView, setActiveView] = useState('overview');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const districts = [
    { id: 1, name: 'Oak Cliff', score: 78, trend: '+5', color: 'from-amber-400 to-orange-500', status: 'moderate' },
    { id: 2, name: 'Uptown', score: 85, trend: '+2', color: 'from-emerald-400 to-green-500', status: 'safe' },
    { id: 3, name: 'Downtown', score: 72, trend: '-3', color: 'from-red-400 to-rose-500', status: 'caution' },
    { id: 4, name: 'Design District', score: 88, trend: '+7', color: 'from-emerald-400 to-green-500', status: 'safe' },
  ];

  const venues = [
    { id: 1, name: 'Klyde Warren Park', crowd: 85, safety: 78, time: 'Peak Hours', icon: '🌳' },
    { id: 2, name: 'The Rustic', crowd: 45, safety: 88, time: 'Light Traffic', icon: '🍽️' },
    { id: 3, name: 'Deep Ellum Brewing', crowd: 92, safety: 72, time: 'Very Busy', icon: '🍺' },
    { id: 4, name: 'Cidercade', crowd: 75, safety: 90, time: 'Moderate', icon: '🎮' },
  ];

  const insights = [
    { label: 'Active Now', value: '1.2M', change: '+18%', gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Safety Score', value: '78%', change: '+5%', gradient: 'from-emerald-500 to-green-500' },
    { label: 'Alerts', value: '3', change: '-2', gradient: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="absolute inset-0 backdrop-blur-3xl"></div>
        
        <div className="relative px-8 pt-12 pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Time & Status */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-emerald-400 text-sm font-medium">Live</span>
              </div>
              <div className="text-gray-400 text-sm font-mono">
                {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {/* Main Title */}
            <div className="mb-4">
              <h1 className="text-6xl font-bold tracking-tight mb-2">
                Safety
              </h1>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Reimagined
              </h2>
            </div>
            
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Real-time crowd intelligence at your fingertips. 
              Experience safety monitoring like never before.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        
        {/* Quick Insights */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {insights.map((insight, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" 
                   style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="text-gray-400 text-sm mb-2">{insight.label}</div>
                <div className="flex items-end justify-between">
                  <div className={`text-4xl font-bold bg-gradient-to-r ${insight.gradient} bg-clip-text text-transparent`}>
                    {insight.value}
                  </div>
                  <div className={`text-sm font-medium ${insight.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {insight.change}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Districts - Card Carousel */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Districts</h3>
            <div className="flex gap-2">
              {['Today', 'Week', 'Month'].map((period, idx) => (
                <button 
                  key={idx}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    idx === 0 
                      ? 'bg-white text-black' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {districts.map((district) => (
              <div 
                key={district.id}
                onClick={() => setSelectedDistrict(district.name)}
                className="group cursor-pointer"
              >
                <div className={`relative overflow-hidden rounded-3xl p-8 transition-all duration-500 ${
                  selectedDistrict === district.name 
                    ? 'bg-white/10 border-2 border-white/30 scale-[1.02]' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/8'
                }`}>
                  
                  {/* Background Gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${district.color} opacity-20 rounded-full blur-3xl`}></div>
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h4 className="text-2xl font-semibold mb-2">{district.name}</h4>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            district.status === 'safe' ? 'bg-emerald-400' :
                            district.status === 'moderate' ? 'bg-amber-400' : 'bg-rose-400'
                          }`}></div>
                          <span className="text-gray-400 text-sm capitalize">{district.status}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-4xl font-bold bg-gradient-to-r ${district.color} bg-clip-text text-transparent`}>
                          {district.score}
                        </div>
                        <div className="text-emerald-400 text-sm font-medium">{district.trend}%</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${district.color} transition-all duration-1000 rounded-full`}
                        style={{ width: `${district.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Venues - Minimalist Cards */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Live Venues</h3>
          
          <div className="space-y-4">
            {venues.map((venue) => (
              <div 
                key={venue.id}
                className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-4xl">{venue.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium mb-1">{venue.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          <span>{venue.crowd}% capacity</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                        <div className="flex items-center gap-1.5">
                          <Shield className="w-4 h-4" />
                          <span>{venue.safety}% safe</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                        <span>{venue.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Indicator */}
                  <div className="flex items-center gap-3">
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${
                      venue.crowd > 80 ? 'from-rose-500/20 to-red-500/20' :
                      venue.crowd > 60 ? 'from-amber-500/20 to-orange-500/20' :
                      'from-emerald-500/20 to-green-500/20'
                    } flex items-center justify-center`}>
                      <div className={`text-2xl font-bold ${
                        venue.crowd > 80 ? 'text-rose-400' :
                        venue.crowd > 60 ? 'text-amber-400' :
                        'text-emerald-400'
                      }`}>
                        {venue.crowd}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Preview */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-purple-950/50 to-pink-950/50"></div>
          <div className="relative p-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Safety Map</h3>
                <p className="text-gray-400">Real-time district visualization</p>
              </div>
              <button className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors">
                Explore Map
              </button>
            </div>

            <div className="relative h-64 rounded-2xl bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-indigo-400" />
                <p className="text-gray-400">Interactive map coming soon</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/10 backdrop-blur-2xl rounded-full p-2 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-2">
            {[
              { icon: Sparkles, label: 'Overview' },
              { icon: MapPin, label: 'Map' },
              { icon: Users, label: 'Venues' },
              { icon: Shield, label: 'Safety' }
            ].map((item, idx) => (
              <button
                key={idx}
                className={`p-4 rounded-full transition-all ${
                  idx === 0 
                    ? 'bg-white text-black' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;