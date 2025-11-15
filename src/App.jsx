import React, { useState, useEffect } from 'react';
import { 
  MapPin, Navigation, AlertCircle, Clock, Shield, Users, TrendingUp, 
  ChevronRight, Play, Info, Bell, Search, ChevronDown, X, Settings, 
  Calendar, Zap, TrendingDown, ChevronLeft, ChevronUp, ChevronDownCircle, 
  EyeOff, Eye, Sparkles, ArrowUpRight, ArrowDownLeft 
} from 'lucide-react';
import { motion } from 'framer-motion';

const App = () => {
  const [appState, setAppState] = useState('splash');
  const [activeView, setActiveView] = useState('now');
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentCity, setCurrentCity] = useState('oak-cliff');
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);
  const [showInsights, setShowInsights] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [isExpanded, setIsExpanded] = useState({});
  const [settings, setSettings] = useState({
    proactiveAlerts: true,
    crowdSurgeAlerts: true,
    parkingAlerts: true,
    eventAlerts: true
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const generateHourlyPredictions = (venue) => {
    const predictions = [];
    const baseTime = new Date(currentTime);
    for (let i = 0; i < 12; i++) {
      const hour = new Date(baseTime.getTime() + i * 60 * 60 * 1000);
      const hourNum = hour.getHours();
      let crowdLevel = venue.crowd;
      let confidence = 95 - (i * 5);
      
      if (venue.type.includes('Restaurant') || venue.type.includes('Brewery')) {
        if (hourNum >= 17 && hourNum <= 21) {
          crowdLevel = Math.min(95, venue.crowd + (hourNum - 17) * 8);
        } else if (hourNum >= 12 && hourNum <= 14) {
          crowdLevel = Math.min(85, venue.crowd + 15);
        } else {
          crowdLevel = Math.max(20, venue.crowd - 20);
        }
      } else if (venue.type.includes('Arts') || venue.type.includes('Shopping')) {
        if (hourNum >= 14 && hourNum <= 19) {
          crowdLevel = Math.min(90, venue.crowd + 15);
        } else {
          crowdLevel = Math.max(30, venue.crowd - 10);
        }
      }
      
      if (venue.events && venue.events.some(e => {
        const eventHour = parseInt(e.time.split(':')[0]);
        return Math.abs(eventHour - hourNum) <= 1;
      })) {
        crowdLevel = Math.min(95, crowdLevel + 25);
        confidence = Math.min(90, confidence + 5);
      }
      
      const parkingAvailable = Math.max(10, 100 - crowdLevel);
      predictions.push({
        hour,
        hourNum,
        time: hour.toLocaleTimeString([], { hour: 'numeric' }),
        crowd: Math.round(crowdLevel),
        parking: Math.round(parkingAvailable),
        confidence: Math.max(60, confidence),
        status: crowdLevel < 50 ? 'clear' : crowdLevel < 75 ? 'moderate' : 'busy'
      });
    }
    return predictions;
  };

  const generateInsights = (venues) => {
    const insights = [];
    const currentHour = currentTime.getHours();
    
    venues.forEach(venue => {
      const predictions = generateHourlyPredictions(venue);
      const nextHourPrediction = predictions[1];
      
      if (nextHourPrediction && nextHourPrediction.crowd > venue.crowd + 20) {
        insights.push({
          type: 'warning',
          icon: TrendingUp,
          venue: venue.name,
          message: `Crowd surging soon - ${nextHourPrediction.crowd}% in 1 hour`,
          actionable: `Visit now or wait until ${predictions.find(p => p.crowd < 60)?.time || 'later'}`,
          priority: 'high'
        });
      }
      
      if (nextHourPrediction && nextHourPrediction.parking < 30 && venue.crowd < 60) {
        insights.push({
          type: 'info',
          icon: AlertCircle,
          venue: venue.name,
          message: 'Parking filling up soon',
          actionable: 'Arrive in next 30 minutes for easier parking',
          priority: 'medium'
        });
      }
      
      const optimalWindow = predictions.find(p => p.crowd < 50 && p.confidence > 75);
      if (optimalWindow && venue.crowd > 70) {
        insights.push({
          type: 'success',
          icon: Zap,
          venue: venue.name,
          message: `Best time to visit: ${optimalWindow.time}`,
          actionable: `${optimalWindow.crowd}% capacity with ${optimalWindow.parking}% parking available`,
          priority: 'low'
        });
      }
      
      if (venue.events) {
        venue.events.forEach(event => {
          const eventTime = parseInt(event.time.split(':')[0]);
          if (Math.abs(eventTime - currentHour) <= 2) {
            insights.push({
              type: 'event',
              icon: Calendar,
              venue: venue.name,
              message: event.name,
              actionable: event.impact,
              priority: 'high'
            });
          }
        });
      }
    });
    
    return insights.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const cities = {
    'oak-cliff': {
      name: 'Oak Cliff',
      subtitle: 'Dallas, TX',
      description: 'Neighborhood intelligence',
      icon: '🏙️',
      venues: [
        {
          id: 1,
          name: 'Bishop Arts District',
          type: 'Arts & Shopping',
          address: 'N Bishop Ave, Oak Cliff',
          distance: '0.3 mi',
          status: 'moderate',
          crowd: 68,
          safety: 94,
          trending: true,
          image: '🎨',
          description: 'Gallery openings and boutique shopping',
          peakTime: '7:00 PM',
          currentWait: 'No wait',
          isOpen: true,
          hours: 'Open until 10 PM',
          civicZone: 'Oak Cliff Arts District',
          alerts: ['Street event 6-9 PM', 'Limited parking'],
          events: [
            {
              name: 'First Friday Art Walk',
              time: '18:00',
              impact: 'Expect 200+ attendees, Bishop Ave closed',
              crowdSurge: 85
            }
          ]
        },
        {
          id: 2,
          name: 'Kessler Theater',
          type: 'Live Venue',
          address: '1230 W Davis St',
          distance: '0.8 mi',
          status: 'clear',
          crowd: 42,
          safety: 96,
          trending: false,
          image: '🎭',
          description: 'Historic theater with live performances',
          peakTime: '8:30 PM',
          currentWait: 'Tickets available',
          isOpen: true,
          hours: 'Show at 8 PM',
          civicZone: 'Historic Oak Cliff',
          alerts: [],
          events: [
            {
              name: 'Concert - Show ends 10 PM',
              time: '20:00',
              impact: 'Expect crowd dispersal 10-10:30 PM',
              crowdSurge: 90
            }
          ]
        },
        {
          id: 3,
          name: 'Fuel City Tacos',
          type: 'Restaurant',
          address: '801 S Riverfront Blvd',
          distance: '1.2 mi',
          status: 'busy',
          crowd: 85,
          safety: 90,
          trending: true,
          image: '🌮',
          description: 'Authentic tacos, open 24/7',
          peakTime: 'Always busy',
          currentWait: '15-20 min',
          isOpen: true,
          hours: 'Open 24/7',
          civicZone: 'Industrial District',
          alerts: ['High volume', 'Cash preferred']
        },
        {
          id: 4,
          name: 'Trinity River Park',
          type: 'Outdoor',
          address: 'Great Trinity Forest',
          distance: '1.5 mi',
          status: 'clear',
          crowd: 28,
          safety: 98,
          trending: false,
          image: '🌳',
          description: '6,000 acres of urban forest and trails',
          peakTime: 'Sunset (6:45 PM)',
          currentWait: 'Open access',
          isOpen: true,
          hours: 'Dawn to dusk',
          civicZone: 'Great Trinity Forest',
          alerts: []
        },
        {
          id: 5,
          name: 'Oak Cliff Brewing',
          type: 'Brewery',
          address: '301 E 8th St',
          distance: '0.6 mi',
          status: 'moderate',
          crowd: 72,
          safety: 92,
          trending: true,
          image: '🍺',
          description: 'Craft brewery with patio seating',
          peakTime: 'Happy hour now',
          currentWait: '5-10 min for table',
          isOpen: true,
          hours: 'Open until midnight',
          civicZone: 'Oak Cliff Commercial',
          alerts: ['Live music at 8 PM'],
          events: [
            {
              name: 'Live Music - Band starts 8 PM',
              time: '20:00',
              impact: 'Crowd peaks 8-10 PM, patio seating limited',
              crowdSurge: 88
            }
          ]
        }
      ],
      status: {
        overall: 'Safe',
        safetyScore: 94,
        activeIncidents: 0,
        trafficLevel: 'Moderate',
        crowdLevel: 'Moderate',
        trend: 'Improving',
        alerts: [
          { type: 'event', message: 'First Friday Art Walk - Bishop Ave closed', severity: 'medium' },
          { type: 'traffic', message: 'I-35E southbound delays near Colorado', severity: 'low' }
        ]
      }
    },
    'reno': {
      name: 'Reno',
      subtitle: 'Nevada',
      description: 'The Biggest Little City',
      icon: '🎰',
      venues: [
        {
          id: 1,
          name: 'Truckee River Walk',
          type: 'Outdoor Recreation',
          address: '100 Reno Ave',
          distance: '0.2 mi',
          status: 'clear',
          crowd: 35,
          safety: 97,
          trending: true,
          image: '💧',
          description: 'Scenic river path with public art',
          peakTime: 'Sunset (7:30 PM)',
          currentWait: 'Open access',
          isOpen: true,
          hours: 'Dawn to dusk',
          civicZone: 'Downtown Reno',
          alerts: ['Weekly farmers market today'],
          events: [
            {
              name: "Farmers Market - Closes 2 PM",
              time: '14:00',
              impact: 'Crowd disperses 2-3 PM, parking opens up',
              crowdSurge: 75
            }
          ]
        },
        {
          id: 2,
          name: 'Midtown District',
          type: 'Dining & Shopping',
          address: '500 S Virginia St',
          distance: '0.5 mi',
          status: 'moderate',
          crowd: 75,
          safety: 93,
          trending: true,
          image: '🛍️',
          description: 'Boutique shops and craft breweries',
          peakTime: '5:00 PM',
          currentWait: '10-15 min for parking',
          isOpen: true,
          hours: 'Most open until 9 PM',
          civicZone: 'Midtown Reno',
          alerts: ['Street fair this weekend']
        },
        {
          id: 3,
          name: 'National Automobile Museum',
          type: 'Museum',
          address: '1 Lake St',
          distance: '0.7 mi',
          status: 'clear',
          crowd: 40,
          safety: 98,
          trending: false,
          image: '🚗',
          description: 'Historic car collection and exhibits',
          peakTime: '2:00 PM',
          currentWait: 'Quick entry',
          isOpen: true,
          hours: 'Open until 8 PM',
          civicZone: 'Downtown Reno',
          alerts: []
        },
        {
          id: 4,
          name: 'Sparks Marina',
          type: 'Outdoor',
          address: '1655 N Virginia St, Sparks',
          distance: '3.2 mi',
          status: 'busy',
          crowd: 88,
          safety: 91,
          trending: true,
          image: '⛵',
          description: 'Boating, fishing and walking trails',
          peakTime: 'Weekend afternoons',
          currentWait: 'Limited parking',
          isOpen: true,
          hours: '5 AM - 10 PM',
          civicZone: 'Sparks',
          alerts: ['Fishing tournament today'],
          events: [
            {
              name: 'Fishing Tournament - Ends 5 PM',
              time: '17:00',
              impact: 'Parking clears after 5 PM',
              crowdSurge: 92
            }
          ]
        },
        {
          id: 5,
          name: 'Reno Arch',
          type: 'Landmark',
          address: 'Virginia St & Commercial Row',
          distance: '0.4 mi',
          status: 'clear',
          crowd: 25,
          safety: 96,
          trending: false,
          image: '🌉',
          description: 'Iconic Reno landmark and photo spot',
          peakTime: 'Evening (for lighting)',
          currentWait: 'No wait',
          isOpen: true,
          hours: '24/7 viewing',
          civicZone: 'Downtown Reno',
          alerts: ['Light show at 8 PM & 10 PM'],
          events: [
            {
              name: 'Light Show - 8 PM',
              time: '20:00',
              impact: 'Brief crowd gathering, clears quickly',
              crowdSurge: 45
            }
          ]
        }
      ],
      status: {
        overall: 'Safe',
        safetyScore: 91,
        activeIncidents: 1,
        trafficLevel: 'Heavy',
        crowdLevel: 'Moderate',
        trend: 'Stable',
        alerts: [
          { type: 'traffic', message: 'I-80 eastbound construction at Wells Ave', severity: 'medium' },
          { type: 'event', message: 'Reno River Festival setup on Virginia Street', severity: 'low' }
        ]
      }
    }
  };

  const { venues, status: cityStatus } = cities[currentCity];
  const insights = generateInsights(venues);

  const StatusPill = ({ status, size = 'sm' }) => {
    const config = {
      clear: { color: 'text-emerald-400', dot: 'bg-emerald-400', label: 'Clear' },
      moderate: { color: 'text-amber-400', dot: 'bg-amber-400', label: 'Moderate' },
      busy: { color: 'text-rose-400', dot: 'bg-rose-400', label: 'Busy' }
    };
    
    const style = config[status] || config.clear;
    const isLarge = size === 'lg';
    
    return (
      <div className={`inline-flex items-center gap-2 ${isLarge ? 'text-base' : 'text-xs'} ${style.color} font-medium`}>
        <div className={`${isLarge ? 'w-2 h-2' : 'w-1.5 h-1.5'} rounded-full ${style.dot}`}></div>
        {style.label}
      </div>
    );
  };

  const GlassCard = ({ children, className = '', noPadding = false, isHeader = false }) => (
    <div className={`bg-white/[0.02] backdrop-blur-2xl rounded-2xl border border-white/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.25)] ${!noPadding ? 'p-6' : ''} ${isHeader ? 'pt-10 pb-8 px-8' : ''} ${className}`}>
      {children}
    </div>
  );

  const HourlyTimeline = ({ venue }) => {
    const predictions = generateHourlyPredictions(venue);
    const currentHourPrediction = predictions[0];
    const displayHour = selectedHour !== null ? predictions[selectedHour] : currentHourPrediction;
    
    return (
      <div className="space-y-6">
        {/* Selected hour details - Glass morphism */}
        <GlassCard>
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <div className="text-5xl font-semibold text-white mb-1">{displayHour.time}</div>
              <div className="text-sm text-white/30">Predicted conditions</div>
            </div>
            <StatusPill status={displayHour.status} size="lg" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-white/50 mb-1 uppercase tracking-wider">Crowd</div>
              <div className="text-3xl font-light text-white">{displayHour.crowd}%</div>
            </div>
            <div>
              <div className="text-xs text-white/50 mb-1 uppercase tracking-wider">Parking</div>
              <div className="text-3xl font-light text-emerald-400">{displayHour.parking}%</div>
            </div>
            <div>
              <div className="text-xs text-white/50 mb-1 uppercase tracking-wider">Certainty</div>
              <div className="text-3xl font-light" style={{ 
                color: `rgba(255, 255, 255, ${displayHour.confidence/100 * 0.8 + 0.2})`
              }}>
                {displayHour.confidence}%
              </div>
            </div>
          </div>
        </GlassCard>
        
        {/* Horizontal scrollable timeline */}
        <div className="relative -mx-6 px-6">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {predictions.map((pred, idx) => {
              const isSelected = selectedHour === idx;
              const opacity = pred.confidence / 100;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedHour(idx)}
                  className={`flex-shrink-0 w-20 transition-all ${
                    isSelected 
                      ? 'bg-white/[0.08] backdrop-blur-xl shadow-lg' 
                      : 'bg-white/[0.015] backdrop-blur-lg hover:bg-white/[0.03]'
                  } rounded-xl p-3 border ${
                    isSelected ? 'border-emerald-500/40' : 'border-white/[0.03]'
                  }`}
                >
                  <div className="text-xs text-white/50 mb-2 font-medium">{pred.time}</div>
                  {/* Crowd level bar */}
                  <div className="h-16 bg-black/20 rounded-lg relative overflow-hidden mb-2">
                    <div 
                      className={`absolute bottom-0 left-0 right-0 transition-all rounded-lg ${
                        pred.status === 'clear' ? 'bg-emerald-500/70' :
                        pred.status === 'moderate' ? 'bg-amber-500/70' :
                        'bg-rose-500/70'
                      }`}
                      style={{ 
                        height: `${pred.crowd}%`,
                        opacity: opacity * 0.7 + 0.3
                      }}
                    />
                  </div>
                  <div className="text-sm font-medium text-white" style={{ opacity }}>
                    {pred.crowd}%
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="text-xs text-white/30 leading-relaxed max-w-prose">
          Predictions synthesized from historical patterns, current conditions, and scheduled events
        </div>
      </div>
    );
  };

  if (appState === 'splash') {
    return (
      <div className="h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center px-8">
        <div className="text-center max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <MapPin className="w-20 h-20 text-blue-400 mx-auto mb-8" strokeWidth={1.2} />
            <h1 className="text-8xl font-black text-white tracking-tighter mb-4">KROWD</h1>
            <p className="text-xl text-white/40 max-w-md mx-auto">Urban Intelligence Platform</p>
          </motion.div>
          
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setAppState('main')}
            className="px-12 py-5 bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 backdrop-blur-xl text-white rounded-2xl font-semibold text-lg border border-white/5 transition-all duration-300 w-full shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20"
          >
            Begin exploration
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex items-center justify-center gap-4 text-base text-white/30"
          >
            <Shield className="w-5 h-5" />
            <span>Municipal open data intelligence</span>
          </motion.div>
        </div>
      </div>
    );
  }

  const NowView = () => {
    const featuredVenue = venues[0];
    
    return (
      <div className="h-full overflow-y-auto pb-32">
        {/* Hero section - Editorial style with asymmetric layout */}
        <div className="px-10 pt-12 pb-20 relative overflow-hidden">
          <div className="max-w-4xl">
            <div className="mb-10">
              <div className="text-8xl mb-8">{featuredVenue.image}</div>
              <StatusPill status={featuredVenue.status} size="lg" />
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-black text-white mb-6 leading-tight tracking-tighter max-w-2xl"
            >
              {featuredVenue.name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl"
            >
              {featuredVenue.description}
            </motion.p>
            
            <div className="flex flex-wrap gap-8 text-base text-white/50 mb-12">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" strokeWidth={1.5} />
                <span>{featuredVenue.distance}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" strokeWidth={1.5} />
                <span>{featuredVenue.peakTime}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" strokeWidth={1.5} />
                <span>{featuredVenue.crowd}% capacity</span>
              </div>
            </div>
            
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setSelectedVenue(featuredVenue)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 backdrop-blur-xl text-white rounded-xl font-medium text-lg border border-white/5 transition-all duration-300 shadow-lg shadow-blue-500/10"
            >
              View details
            </motion.button>
          </div>
        </div>
        
        {/* Ambient insights - Collapsed by default with subtle indicator */}
        {insights.length > 0 && settings.proactiveAlerts && (
          <div className="px-10 mb-16">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setShowInsights(!showInsights)}
              className="w-full text-left group"
            >
              <GlassCard>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                      <Zap className="w-6 h-6 text-blue-400" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white mb-1">Smart insights</div>
                      <div className="text-sm text-white/50">Predictive intelligence for your city</div>
                    </div>
                  </div>
                  <ChevronDownCircle 
                    className={`w-6 h-6 text-blue-400/70 transition-transform duration-300 ${
                      showInsights ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
                {showInsights && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 pt-6 border-t border-white/5 space-y-5"
                  >
                    {insights.map((insight, idx) => {
                      const Icon = insight.icon;
                      const colors = {
                        warning: 'text-amber-400',
                        info: 'text-blue-400',
                        success: 'text-emerald-400',
                        event: 'text-purple-400'
                      };
                      return (
                        <div key={idx} className="flex gap-4">
                          <div className={`p-3 bg-${colors[insight.type].split('-')[1]}/10 rounded-xl`}>
                            <Icon className={`w-5 h-5 ${colors[insight.type]}`} strokeWidth={1.5} />
                          </div>
                          <div className="flex-1">
                            <div className="text-lg font-medium text-white mb-1">{insight.venue}</div>
                            <div className="text-base text-white/80 mb-1">{insight.message}</div>
                            <div className="text-sm text-white/50">{insight.actionable}</div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </GlassCard>
            </motion.button>
          </div>
        )}
        
        {/* City alerts - Minimal design */}
        {cityStatus.alerts.length > 0 && (
          <div className="px-10 mb-16">
            <h2 className="text-sm uppercase tracking-wider text-white/40 mb-6">Active alerts</h2>
            <GlassCard>
              {cityStatus.alerts.map((alert, idx) => (
                <div key={idx} className={`flex items-start gap-4 ${idx > 0 ? 'mt-5 pt-5 border-t border-white/5' : ''}`}>
                  <div className="p-2.5 bg-amber-400/10 rounded-lg mt-0.5">
                    <AlertCircle className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
                  </div>
                  <div className="text-lg text-white/85">{alert.message}</div>
                </div>
              ))}
            </GlassCard>
          </div>
        )}
        
        {/* Trending locations - Editorial cards */}
        <div className="px-10 mb-16">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-sm uppercase tracking-wider text-white/40">Trending</h2>
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {venues.filter(v => v.trending).map((venue) => (
              <motion.button
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * venue.id }}
                onClick={() => setSelectedVenue(venue)}
                className="w-full text-left group"
              >
                <GlassCard className="overflow-hidden hover:border-white/10 transition-all duration-300">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl flex items-center justify-center text-4xl border border-white/[0.05] group-hover:scale-105 transition-transform">
                      {venue.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-semibold text-white mb-1">{venue.name}</h3>
                        <StatusPill status={venue.status} />
                      </div>
                      <p className="text-lg text-white/70 mb-3">{venue.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-base text-white/50">
                        <span>{venue.distance}</span>
                        <span>•</span>
                        <span>{venue.currentWait}</span>
                        <span>•</span>
                        <span>{venue.crowd}% capacity</span>
                      </div>
                    </div>
                  </div>
                  
                  {venue.events && venue.events.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2.5 text-base text-purple-400">
                        <Calendar className="w-5 h-5" strokeWidth={1.5} />
                        <span className="font-medium">{venue.events[0].name}</span>
                      </div>
                    </div>
                  )}
                </GlassCard>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* All locations - Minimal list with expandable details */}
        <div className="px-10 pb-16">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-sm uppercase tracking-wider text-white/40">All locations</h2>
            <button 
              onClick={() => setIsExpanded(prev => ({ ...prev, allLocations: !prev.allLocations }))}
              className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
            >
              {isExpanded.allLocations ? 'Collapse' : 'Expand all'} <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded.allLocations ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <div className="space-y-3">
            {venues.map((venue) => (
              <motion.button
                key={venue.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full text-left px-5 py-4 hover:bg-white/[0.02] rounded-2xl transition-colors group border border-transparent hover:border-white/5"
                onClick={() => {
                  setSelectedVenue(venue);
                  setIsExpanded(prev => ({ ...prev, [venue.id]: !prev[venue.id] }));
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/[0.03] rounded-xl flex items-center justify-center text-xl border border-white/[0.05] group-hover:scale-110 transition-transform">
                      {venue.image}
                    </div>
                    <div className="text-left">
                      <span className="text-lg font-medium text-white block">{venue.name}</span>
                      <span className="text-sm text-white/50">{venue.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-white/50">{venue.distance}</span>
                    <StatusPill status={venue.status} />
                    <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                </div>
                
                {isExpanded[venue.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 pt-4 border-t border-white/5"
                  >
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-2xl font-semibold text-white mb-1">{venue.crowd}%</div>
                        <div className="text-sm text-white/50">Current crowd</div>
                      </div>
                      <div>
                        <div className="text-2xl font-semibold text-emerald-400 mb-1">{venue.safety}%</div>
                        <div className="text-sm text-white/50">Safety rating</div>
                      </div>
                      <div>
                        <div className="text-2xl font-semibold text-white mb-1">{venue.currentWait}</div>
                        <div className="text-sm text-white/50">Wait time</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const MapView = () => {
    return (
      <div className="h-full relative">
        {/* Simplified map background - Editorial style */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.08)_0%,rgba(0,0,0,0)_50%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.3)_50%,transparent_100%)]"></div>
          
          {/* City grid lines - Subtle */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          {/* Venue markers with elevation */}
          {venues.map((venue, idx) => {
            const colors = {
              clear: 'from-emerald-400/15 to-emerald-500/15',
              moderate: 'from-amber-400/15 to-amber-500/15',
              busy: 'from-rose-400/15 to-rose-500/15'
            };
            
            // Position markers in a more organic pattern
            const positions = [
              { left: 30, top: 45 },
              { left: 65, top: 30 },
              { left: 40, top: 65 },
              { left: 20, top: 30 },
              { left: 70, top: 60 }
            ];
            
            const pos = positions[idx % positions.length];
            
            return (
              <motion.button
                key={venue.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                style={{ 
                  left: `${pos.left}%`, 
                  top: `${pos.top}%` 
                }}
                onClick={() => setSelectedVenue(venue)}
              >
                <div className="relative">
                  <div className={`w-20 h-20 bg-gradient-to-br ${colors[venue.status]} rounded-2xl flex items-center justify-center text-3xl shadow-xl backdrop-blur-xl border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                    {venue.image}
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white/80 text-sm font-medium whitespace-nowrap max-w-32 text-center">
                    {venue.name}
                  </div>
                </div>
              </motion.button>
            );
          })}
          
          {/* User location */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
              <div className="w-5 h-5 bg-blue-400 rounded-full border-2 border-white shadow-lg"></div>
            </div>
          </div>
        </div>
        
        {/* City status card - Editorial header */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-12 px-10">
          <GlassCard isHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-black text-white mb-2">{cities[currentCity].name}</div>
                <div className="text-lg text-white/60">{cities[currentCity].subtitle}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="text-lg text-emerald-400 font-medium">Live data</span>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-black text-emerald-400 mb-2">{cityStatus.safetyScore}</div>
                <div className="text-lg text-white/60">Safety score</div>
              </div>
              <div>
                <div className="text-4xl font-black text-amber-400 mb-2">{cityStatus.trafficLevel}</div>
                <div className="text-lg text-white/60">Traffic level</div>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-2">{venues.filter(v => v.trending).length}</div>
                <div className="text-lg text-white/60">Trending spots</div>
              </div>
            </div>
          </GlassCard>
        </div>
        
        {/* Venue detail sheet - Glass morphism */}
        {selectedVenue && (
          <div className="absolute bottom-0 left-0 right-0 z-30 max-h-[80vh] overflow-y-auto">
            <div className="p-10">
              <GlassCard>
                <div className="flex justify-between items-start mb-10">
                  <div className="flex items-start gap-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-white/[0.08] to-white/[0.03] rounded-2xl flex items-center justify-center text-5xl border border-white/[0.08] shadow-xl">
                      {selectedVenue.image}
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white mb-3">{selectedVenue.name}</h3>
                      <p className="text-xl text-white/70 mb-4 max-w-2xl">{selectedVenue.description}</p>
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <StatusPill status={selectedVenue.status} size="lg" />
                        <div className="flex items-center gap-3 text-lg text-white/60">
                          <MapPin className="w-5 h-5" strokeWidth={1.5} />
                          <span>{selectedVenue.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedVenue(null);
                      setSelectedHour(null);
                      setShowTimeline(false);
                    }}
                    className="p-3 hover:bg-white/[0.05] rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-white/50" />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-8 mb-12">
                  <div className="text-center p-6 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
                    <div className="text-3xl font-black text-white mb-2">{selectedVenue.crowd}%</div>
                    <div className="text-lg text-white/50">Current crowd</div>
                  </div>
                  <div className="text-center p-6 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
                    <div className="text-3xl font-black text-emerald-400 mb-2">{selectedVenue.safety}%</div>
                    <div className="text-lg text-white/50">Safety rating</div>
                  </div>
                  <div className="text-center p-6 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
                    <div className="text-3xl font-black text-white mb-2">{selectedVenue.currentWait}</div>
                    <div className="text-lg text-white/50">Current wait</div>
                  </div>
                </div>
                
                {/* Timeline toggle - Ambient */}
                <button
                  onClick={() => setShowTimeline(!showTimeline)}
                  className="w-full mb-10 p-6 bg-gradient-to-br from-white/[0.02] to-white/[0.01] hover:from-white/[0.04] hover:to-white/[0.02] rounded-2xl border border-white/[0.05] transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                        <Clock className="w-6 h-6 text-blue-400" strokeWidth={1.5} />
                      </div>
                      <div className="text-left">
                        <div className="text-xl font-medium text-white mb-1">Hourly forecast</div>
                        <div className="text-base text-white/50">Next 12 hours of predictions</div>
                      </div>
                    </div>
                    <ChevronUp className={`w-6 h-6 text-white/50 transition-transform duration-300 ${showTimeline ? '' : 'rotate-180'}`} />
                  </div>
                </button>
                
                {showTimeline && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mb-12"
                  >
                    <HourlyTimeline venue={selectedVenue} />
                  </motion.div>
                )}
                
                {/* Events */}
                {selectedVenue.events && selectedVenue.events.length > 0 && (
                  <div className="mb-10 p-6 bg-purple-500/5 rounded-2xl border border-purple-500/15">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 bg-purple-500/15 rounded-lg">
                        <Calendar className="w-5 h-5 text-purple-400" strokeWidth={1.5} />
                      </div>
                      <h4 className="text-lg font-semibold text-purple-400">Upcoming events</h4>
                    </div>
                    {selectedVenue.events.map((event, idx) => (
                      <div key={idx} className={idx > 0 ? 'mt-5 pt-5 border-t border-white/[0.05]' : ''}>
                        <div className="text-xl font-medium text-white mb-2">{event.name}</div>
                        <div className="text-lg text-white/70 mb-3">{event.time}</div>
                        <div className="text-lg text-white/60">{event.impact}</div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-6">
                  <button className="flex-1 py-5 bg-gradient-to-r from-blue-500/15 to-blue-600/15 hover:from-blue-500/25 hover:to-blue-600/25 backdrop-blur-xl text-white rounded-xl font-medium text-lg border border-white/10 transition-all duration-300 shadow-lg shadow-blue-500/10">
                    <div className="flex items-center justify-center gap-2">
                      <Navigation className="w-5 h-5" />
                      Navigate
                    </div>
                  </button>
                  <button className="flex-1 py-5 bg-gradient-to-r from-emerald-500/15 to-emerald-600/15 hover:from-emerald-500/25 hover:to-emerald-600/25 backdrop-blur-xl text-white rounded-xl font-medium text-lg border border-white/10 transition-all duration-300 shadow-lg shadow-emerald-500/10">
                    <div className="flex items-center justify-center gap-2">
                      <Bell className="w-5 h-5" />
                      Set alert
                    </div>
                  </button>
                </div>
                
                <div className="mt-10 pt-8 border-t border-white/[0.05] text-lg text-white/50">
                  <div>{selectedVenue.civicZone}</div>
                  <div className="mt-2">{selectedVenue.hours}</div>
                </div>
              </GlassCard>
            </div>
          </div>
        )}
      </div>
    );
  };

  const AlertsView = () => (
    <div className="h-full overflow-y-auto pb-32">
      <div className="px-10 pt-12">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 max-w-3xl"
        >
          <div className="text-2xl text-white/60 mb-3">{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
          <h1 className="text-7xl font-black text-white leading-none tracking-tighter mb-6">{cities[currentCity].name}</h1>
          <p className="text-2xl text-white/70 max-w-2xl">{cities[currentCity].description}</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          <div className="lg:col-span-2 space-y-10">
            {/* Status card */}
            <GlassCard>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="mb-8 md:mb-0">
                  <div className="text-sm uppercase tracking-wider text-emerald-400 mb-3">City status</div>
                  <div className="text-5xl font-black text-white mb-3">{cityStatus.overall}</div>
                  <div className="text-xl text-white/60">Safety score: {cityStatus.safetyScore}/100</div>
                </div>
                <Shield className="w-24 h-24 text-emerald-400/20" strokeWidth={0.8} />
              </div>
            </GlassCard>
            
            {/* Smart insights - Ambient expansion */}
            {settings.proactiveAlerts && insights.length > 0 && (
              <div>
                <div className="flex justify-between items-baseline mb-8">
                  <h2 className="text-sm uppercase tracking-wider text-white/40">Smart insights</h2>
                  <button 
                    onClick={() => setIsExpanded(prev => ({ ...prev, insights: !prev.insights }))}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
                  >
                    {isExpanded.insights ? 'Collapse' : 'Expand all'} <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded.insights ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                <div className="space-y-5">
                  {insights.map((insight, idx) => {
                    const Icon = insight.icon;
                    const colors = {
                      warning: 'text-amber-400',
                      info: 'text-blue-400',
                      success: 'text-emerald-400',
                      event: 'text-purple-400'
                    };
                    const bgColor = {
                      warning: 'bg-amber-500/5',
                      info: 'bg-blue-500/5',
                      success: 'bg-emerald-500/5',
                      event: 'bg-purple-500/5'
                    };
                    
                    return (
                      <GlassCard key={idx} className={`${bgColor[insight.type]} border-l-2 border-${colors[insight.type].split('-')[1]}/500`}>
                        <div className="flex gap-6">
                          <div className={`p-4 rounded-xl ${bgColor[insight.type]}`}>
                            <Icon className={`w-6 h-6 ${colors[insight.type]}`} strokeWidth={1.5} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div className="text-xl font-medium text-white">{insight.venue}</div>
                              <span className={`text-sm px-3 py-1 rounded-full ${bgColor[insight.type]} ${colors[insight.type]}`}>
                                {insight.priority.toUpperCase()}
                              </span>
                            </div>
                            <div className="text-xl text-white/85 mb-3">{insight.message}</div>
                            <div className="text-lg text-white/60">{insight.actionable}</div>
                          </div>
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Active alerts */}
            <div>
              <div className="flex justify-between items-baseline mb-8">
                <h2 className="text-sm uppercase tracking-wider text-white/40">Active alerts</h2>
                <button 
                  onClick={() => setIsExpanded(prev => ({ ...prev, alerts: !prev.alerts }))}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
                >
                  {isExpanded.alerts ? 'Collapse' : 'Expand all'} <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded.alerts ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div className="space-y-5">
                {cityStatus.alerts.map((alert, idx) => {
                  const severityColors = {
                    high: 'text-rose-400 border-rose-500/30 bg-rose-500/5',
                    medium: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
                    low: 'text-blue-400 border-blue-500/30 bg-blue-500/5'
                  };
                  const colorClass = severityColors[alert.severity] || severityColors.low;
                  
                  return (
                    <GlassCard key={idx} className={`${colorClass} border-l-2`}>
                      <div className="flex items-start gap-5">
                        <div className={`p-3 rounded-lg ${colorClass.replace('text', 'bg').replace('/400', '/100')}`}>
                          <AlertCircle className={`w-6 h-6 ${colorClass.split(' ')[0]}`} strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className={`text-sm uppercase tracking-wider mb-2 ${colorClass.split(' ')[0]}`}>
                            {alert.type.toUpperCase()}
                          </div>
                          <div className="text-xl text-white/85 mb-2">{alert.message}</div>
                          <div className="text-base text-white/60 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${colorClass.split(' ')[0]}`}></span>
                            {alert.severity.toUpperCase()} severity
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="space-y-10">
            {/* Quick stats */}
            <GlassCard>
              <div className="text-sm uppercase tracking-wider text-white/50 mb-6">Traffic overview</div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 border-r border-white/5">
                  <div className="text-4xl font-black text-amber-400 mb-2">{cityStatus.trafficLevel}</div>
                  <div className="text-lg text-white/60">Current level</div>
                </div>
                <div className="text-center p-6">
                  <div className="text-4xl font-black text-white mb-2">{cityStatus.activeIncidents}</div>
                  <div className="text-lg text-white/60">Active incidents</div>
                </div>
              </div>
            </GlassCard>
            
            {/* Venue status */}
            <GlassCard>
              <div className="flex justify-between items-baseline mb-8">
                <h2 className="text-sm uppercase tracking-wider text-white/40">Venue status</h2>
                <button 
                  onClick={() => setIsExpanded(prev => ({ ...prev, venues: !prev.venues }))}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
                >
                  {isExpanded.venues ? 'Collapse' : 'Expand'} <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded.venues ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              <div className="space-y-5">
                {venues.map((venue) => (
                  <div key={venue.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div className="text-lg font-medium text-white">{venue.name}</div>
                    <StatusPill status={venue.status} />
                  </div>
                ))}
              </div>
            </GlassCard>
            
            {/* Actions */}
            <GlassCard>
              <div className="text-center">
                <div className="text-sm uppercase tracking-wider text-white/50 mb-6">Quick actions</div>
                <div className="space-y-4">
                  <button className="w-full py-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 backdrop-blur-xl text-white rounded-xl font-medium text-lg border border-white/5 transition-all duration-300">
                    <div className="flex items-center justify-center gap-2">
                      <Bell className="w-5 h-5" />
                      Set custom alert
                    </div>
                  </button>
                  <button className="w-full py-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 backdrop-blur-xl text-white rounded-xl font-medium text-lg border border-white/5 transition-all duration-300">
                    <div className="flex items-center justify-center gap-2">
                      <EyeOff className="w-5 h-5" />
                      Mute notifications
                    </div>
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsModal = () => (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-end justify-center"
      onClick={() => setIsSettingsOpen(false)}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-10 mx-6 mb-10">
          <GlassCard>
            <div className="flex justify-between items-start mb-10">
              <div>
                <h2 className="text-4xl font-black text-white">Preferences</h2>
                <p className="text-xl text-white/60 mt-2 max-w-md">Customize your KROWD experience with granular controls</p>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-3 hover:bg-white/[0.05] rounded-xl transition-colors"
              >
                <X className="w-7 h-7 text-white/50" />
              </button>
            </div>
            
            <div className="space-y-8">
              {[
                { key: 'proactiveAlerts', label: 'Proactive insights', desc: 'Receive smart suggestions before you need them', icon: Sparkles },
                { key: 'crowdSurgeAlerts', label: 'Crowd surge warnings', desc: 'Get notified when crowds are expected to peak', icon: TrendingUp },
                { key: 'parkingAlerts', label: 'Parking notifications', desc: 'Receive warnings when parking availability drops below 30%', icon: Navigation },
                { key: 'eventAlerts', label: 'Event updates', desc: 'Stay informed about concerts, shows, and community events', icon: Calendar }
              ].map(setting => {
                const Icon = setting.icon;
                return (
                  <div key={setting.key} className="flex items-start justify-between p-6 bg-white/[0.015] rounded-2xl border border-white/[0.03] hover:border-white/10 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="p-3 bg-blue-500/10 rounded-xl mt-1">
                          <Icon className="w-6 h-6 text-blue-400" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-semibold text-white">{setting.label}</h3>
                      </div>
                      <p className="text-lg text-white/60 max-w-xl">{setting.desc}</p>
                    </div>
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, [setting.key]: !prev[setting.key] }))}
                      className={`ml-6 w-14 h-8 rounded-full transition-colors relative flex-shrink-0 ${
                        settings[setting.key] ? 'bg-emerald-500' : 'bg-white/10'
                      }`}
                    >
                      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform shadow-lg ${
                        settings[setting.key] ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-12 p-8 bg-gradient-to-br from-blue-500/5 to-blue-600/5 rounded-2xl border border-blue-500/15">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/15 rounded-xl mt-1 flex-shrink-0">
                  <Info className="w-6 h-6 text-blue-400" strokeWidth={1.5} />
                </div>
                <p className="text-xl text-white/80">
                  KROWD learns from your behavior. Dismiss alerts you don't find useful to reduce their frequency. Your preferences are stored locally and never shared.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex flex-col">
      {appState === 'main' && (
        <div className="absolute top-0 left-0 right-0 z-40 pt-10 pb-6 px-10">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-5">
              <MapPin className="w-8 h-8 text-blue-400" strokeWidth={1.2} />
              <div>
                <div className="text-2xl font-black text-white tracking-tight">KROWD</div>
                <div className="text-lg text-white/50">{cities[currentCity].name}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCitySelectorOpen(true)}
                className="p-3 hover:bg-white/[0.05] rounded-xl transition-colors"
                aria-label="Change city"
              >
                <span className="text-2xl">{cities[currentCity].icon}</span>
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-3 hover:bg-white/[0.05] rounded-xl transition-colors"
                aria-label="Settings"
              >
                <Settings className="w-7 h-7 text-white/50" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1 pt-32 pb-24 overflow-hidden max-w-7xl mx-auto w-full px-6">
        {activeView === 'now' && <NowView />}
        {activeView === 'map' && <MapView />}
        {activeView === 'alerts' && <AlertsView />}
      </div>
      
      {appState === 'main' && (
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-6 mb-8 max-w-4xl mx-auto">
            <GlassCard noPadding>
              <div className="px-3 py-3">
                <div className="flex items-center justify-around">
                  {[
                    { id: 'now', icon: Play, label: 'Now' },
                    { id: 'map', icon: MapPin, label: 'Map' },
                    { id: 'alerts', icon: Bell, label: 'Alerts' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveView(tab.id)}
                      className={`flex flex-col items-center gap-2.5 py-4 px-6 rounded-2xl transition-all ${
                        activeView === tab.id 
                          ? 'bg-gradient-to-br from-blue-500/15 to-blue-600/15 text-white shadow-lg shadow-blue-500/10' 
                          : 'text-white/50 hover:text-white/70 hover:bg-white/[0.02]'
                      }`}
                    >
                      <tab.icon 
                        className="w-7 h-7"
                        strokeWidth={1.5}
                      />
                      <span className="text-lg font-medium">
                        {tab.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}
      
      {/* City Selector */}
      {isCitySelectorOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-end justify-center"
          onClick={() => setIsCitySelectorOpen(false)}
        >
          <div 
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-10 mx-6 mb-10">
              <GlassCard>
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h2 className="text-4xl font-black text-white">Select city</h2>
                    <p className="text-xl text-white/60 mt-2 max-w-md">Connect to municipal open data for real-time urban intelligence</p>
                  </div>
                  <button 
                    onClick={() => setIsCitySelectorOpen(false)}
                    className="p-3 hover:bg-white/[0.05] rounded-xl transition-colors"
                  >
                    <X className="w-7 h-7 text-white/50" />
                  </button>
                </div>
                
                <div className="space-y-5">
                  {Object.entries(cities).map(([id, city]) => (
                    <motion.button
                      key={id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setCurrentCity(id);
                        setIsCitySelectorOpen(false);
                        setSelectedVenue(null);
                        setSelectedHour(null);
                        setShowTimeline(false);
                        setIsExpanded({});
                      }}
                      className={`w-full flex items-center gap-6 p-7 rounded-2xl transition-all ${
                        currentCity === id
                          ? 'bg-gradient-to-br from-blue-500/15 to-blue-600/15 border border-blue-500/30 shadow-lg shadow-blue-500/10' 
                          : 'bg-white/[0.015] hover:bg-white/[0.03] border border-white/[0.03]'
                      }`}
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-white/[0.08] to-white/[0.03] rounded-2xl flex items-center justify-center text-4xl border border-white/[0.08]">
                        {city.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-2xl font-bold text-white mb-2">{city.name}</h3>
                        <p className="text-lg text-white/60">{city.subtitle}</p>
                        <p className="text-base text-white/40 mt-2 max-w-md">{city.description}</p>
                      </div>
                      {currentCity === id && (
                        <div className="flex items-center text-emerald-400 text-lg font-medium">
                          <span>Selected</span> <ArrowUpRight className="w-5 h-5 ml-2" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/[0.05] text-center">
                  <p className="text-lg text-white/40">
                    Powered by Reno Open Data & Dallas Open Data APIs
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      )}
      
      {isSettingsOpen && <SettingsModal />}
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
