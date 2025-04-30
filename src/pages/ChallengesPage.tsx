import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppStore } from '../store';
import { 
  Trophy, Clock, Users, Calendar, Check, 
  Award, BarChart2, PieChart, XCircle, 
  ChevronRight, ChevronLeft, Plus, 
  X, ArrowUpRight, Filter, Search, 
  Bookmark, BookmarkCheck, CheckCircle, Edit // Add Edit here
} from 'lucide-react';

// Types for Challenges
interface ChallengeParticipant {
  userId: string;
  name: string;
  avatar: string;
  progress: number;
  rank?: number;
  completedAt?: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'steps' | 'distance' | 'workouts' | 'weight' | 'calories' | 'strength';
  goal: number;
  unit: string;
  startDate: string;
  endDate: string;
  image: string;
  category: 'cardio' | 'strength' | 'nutrition' | 'wellness' | 'team';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  participants: ChallengeParticipant[];
  createdBy: string;
  featured?: boolean;
  rewards?: {
    points: number;
    badge?: string;
    other?: string;
  };
}

function ChallengesPage() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<'all' | 'active' | 'completed' | 'detail'>('all');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Mock challenges data - would typically come from your store
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'challenge-1',
      title: '10K Steps Challenge',
      description: 'Complete 10,000 steps every day for 30 days to build a consistent exercise routine.',
      type: 'steps',
      goal: 300000,
      unit: 'steps',
      startDate: '2025-03-01T00:00:00Z',
      endDate: '2025-03-31T23:59:59Z',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'cardio',
      difficulty: 'beginner',
      participants: [
        { 
          userId: 'user-1', 
          name: 'Sarah Johnson', 
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', 
          progress: 235000,
          rank: 1
        },
        { 
          userId: 'user-2', 
          name: 'Coach Mike', 
          avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5', 
          progress: 215000,
          rank: 2
        },
        { 
          userId: 'user-3', 
          name: 'Alex Chen', 
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61', 
          progress: 198000,
          rank: 3
        }
      ],
      createdBy: 'user-2',
      featured: true,
      rewards: {
        points: 500,
        badge: 'Step Master'
      }
    },
    {
      id: 'challenge-2',
      title: 'Spring Strength Challenge',
      description: 'Increase your strength by completing 15 strength workouts within 30 days.',
      type: 'workouts',
      goal: 15,
      unit: 'workouts',
      startDate: '2025-04-01T00:00:00Z',
      endDate: '2025-04-30T23:59:59Z',
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'strength',
      difficulty: 'intermediate',
      participants: [
        { 
          userId: 'user-3', 
          name: 'Alex Chen', 
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61', 
          progress: 12,
          rank: 1 
        },
        { 
          userId: 'user-4', 
          name: 'Taylor Wilson', 
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', 
          progress: 10,
          rank: 2
        }
      ],
      createdBy: 'user-2',
      rewards: {
        points: 750,
        badge: 'Iron Pumper'
      }
    },
    {
      id: 'challenge-3',
      title: 'Marathon Training',
      description: 'Complete a 16-week marathon training program to prepare for the upcoming city marathon.',
      type: 'distance',
      goal: 500,
      unit: 'miles',
      startDate: '2025-02-01T00:00:00Z',
      endDate: '2025-05-15T23:59:59Z',
      image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'cardio',
      difficulty: 'advanced',
      participants: [
        { 
          userId: 'user-1', 
          name: 'Sarah Johnson', 
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', 
          progress: 320,
          rank: 2
        },
        { 
          userId: 'user-5', 
          name: 'Jamie Smith', 
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956', 
          progress: 342,
          rank: 1
        }
      ],
      createdBy: 'user-1',
      rewards: {
        points: 1000,
        badge: 'Marathon Warrior',
        other: 'Race entry discount'
      }
    }
  ]);
  
  const isAdmin = user?.role === 'admin' || user?.role === 'owner';
  const userChallenges = challenges.filter(challenge => 
    challenge.participants.some(p => p.userId === user?.id)
  );
  
  const filteredChallenges = challenges
    .filter(challenge => {
      if (filter === 'all') return true;
      return challenge.category === filter;
    })
    .filter(challenge => {
      if (!searchQuery) return true;
      return challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    });
  
  const isUserInChallenge = (challenge: Challenge) => {
    return challenge.participants.some(p => p.userId === user?.id);
  };
  
  const getUserProgress = (challenge: Challenge) => {
    if (!user) return 0;
    const participant = challenge.participants.find(p => p.userId === user.id);
    return participant ? participant.progress : 0;
  };
  
  const joinChallenge = (challenge: Challenge) => {
    if (!user) return;
    
    const updatedChallenges = challenges.map(c => {
      if (c.id === challenge.id) {
        return {
          ...c,
          participants: [
            ...c.participants, 
            { 
              userId: user.id, 
              name: user.name || 'Anonymous',
              avatar: user.avatar || '',
              progress: 0
            }
          ]
        };
      }
      return c;
    });
    
    setChallenges(updatedChallenges);
  };
  
  const leaveChallenge = (challenge: Challenge) => {
    if (!user) return;
    
    const updatedChallenges = challenges.map(c => {
      if (c.id === challenge.id) {
        return {
          ...c,
          participants: c.participants.filter(p => p.userId !== user.id)
        };
      }
      return c;
    });
    
    setChallenges(updatedChallenges);
  };
  
  const updateProgress = (challengeId: string, progress: number) => {
    if (!user) return;
    
    const updatedChallenges = challenges.map(c => {
      if (c.id === challengeId) {
        return {
          ...c,
          participants: c.participants.map(p => {
            if (p.userId === user.id) {
              return {
                ...p,
                progress: Math.min(c.goal, progress),
                // If fully completed, mark completion time
                ...(progress >= c.goal && !p.completedAt ? { completedAt: new Date().toISOString() } : {})
              };
            }
            return p;
          })
        };
      }
      return c;
    });
    
    setChallenges(updatedChallenges);
  };
  
  const createChallenge = (challenge: Challenge) => {
    setChallenges([...challenges, challenge]);
    setShowCreateModal(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const renderChallengeIcon = (type: string) => {
    switch (type) {
      case 'steps':
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 'distance':
        return <BarChart2 className="h-6 w-6 text-blue-500" />;
      case 'workouts':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'weight':
        return <PieChart className="h-6 w-6 text-purple-500" />;
      default:
        return <Award className="h-6 w-6 text-yellow-500" />;
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      case 'elite':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get time remaining for a challenge
  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
    
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${hours} hour${hours > 1 ? 's' : ''} left`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {activeView !== 'detail' ? (
        <>
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Challenges</h1>
              <p className="text-gray-500">Join challenges and compete with others</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search challenges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              {isAdmin && (
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Challenge
                </button>
              )}
            </div>
          </div>
          
          {/* Challenge Filters */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="flex flex-wrap border-b border-gray-200">
              <button
                onClick={() => setActiveView('all')}
                className={`px-6 py-3 text-sm font-medium ${activeView === 'all' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                All Challenges
              </button>
              <button
                onClick={() => setActiveView('active')}
                className={`px-6 py-3 text-sm font-medium ${activeView === 'active' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                My Active Challenges
              </button>
              <button
                onClick={() => setActiveView('completed')}
                className={`px-6 py-3 text-sm font-medium ${activeView === 'completed' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Completed
              </button>
            </div>
            
            <div className="px-4 py-3 flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-sm rounded-full ${filter === 'all' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
              >
                All Categories
              </button>
              <button
                onClick={() => setFilter('cardio')}
                className={`px-3 py-1 text-sm rounded-full ${filter === 'cardio' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
              >
                Cardio
              </button>
              <button
                onClick={() => setFilter('strength')}
                className={`px-3 py-1 text-sm rounded-full ${filter === 'strength' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
              >
                Strength
              </button>
              <button
                onClick={() => setFilter('nutrition')}
                className={`px-3 py-1 text-sm rounded-full ${filter === 'nutrition' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
              >
                Nutrition
              </button>
              <button
                onClick={() => setFilter('wellness')}
                className={`px-3 py-1 text-sm rounded-full ${filter === 'wellness' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
              >
                Wellness
              </button>
              <button
                onClick={() => setFilter('team')}
                className={`px-3 py-1 text-sm rounded-full ${filter === 'team' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
              >
                Team Challenges
              </button>
            </div>
          </div>

          {activeView === 'all' && (
            <div className="space-y-6">
              {/* Featured Challenge (if exists) */}
              {challenges.find(c => c.featured) && (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img 
                        className="h-48 w-full object-cover md:w-48" 
                        src={challenges.find(c => c.featured)?.image} 
                        alt="Featured challenge" 
                      />
                    </div>
                    <div className="p-6 md:flex-1">
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                          Featured
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {challenges.find(c => c.featured)?.category}
                        </span>
                      </div>
                      <h2 className="mt-2 text-xl font-semibold text-gray-900">{challenges.find(c => c.featured)?.title}</h2>
                      <p className="mt-2 text-gray-500">{challenges.find(c => c.featured)?.description}</p>
                      
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <p>
                          {formatDate(challenges.find(c => c.featured)?.startDate || '')} - {formatDate(challenges.find(c => c.featured)?.endDate || '')}
                        </p>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex -space-x-2">
                            {challenges.find(c => c.featured)?.participants.slice(0, 3).map((participant, idx) => (
                              <div key={idx} className="inline-block h-8 w-8 rounded-full ring-2 ring-white">
                                <img 
                                  className="h-full w-full rounded-full object-cover" 
                                  src={participant.avatar} 
                                  alt={participant.name} 
                                />
                              </div>
                            ))}
                            {(challenges.find(c => c.featured)?.participants.length || 0) > 3 && (
                              <div className="inline-block h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white flex items-center justify-center text-xs text-gray-600">
                                +{(challenges.find(c => c.featured)?.participants.length || 0) - 3}
                              </div>
                            )}
                          </div>
                          <p className="ml-2 text-sm text-gray-500">
                            {challenges.find(c => c.featured)?.participants.length} participants
                          </p>
                        </div>

                        {/* Challenge join/leave buttons */}
                        {challenges.find(c => c.featured) && (
                          <div>
                            {isUserInChallenge(challenges.find(c => c.featured) as Challenge) ? (
                              <button
                                onClick={() => {
                                  setSelectedChallenge(challenges.find(c => c.featured) as Challenge);
                                  setActiveView('detail');
                                }}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none"
                              >
                                View Challenge
                              </button>
                            ) : (
                              <button
                                onClick={() => joinChallenge(challenges.find(c => c.featured) as Challenge)}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none"
                              >
                                Join Challenge
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Challenge Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredChallenges
                  .filter(c => !c.featured)
                  .map(challenge => (
                    <div 
                      key={challenge.id} 
                      className="bg-white overflow-hidden shadow rounded-lg flex flex-col cursor-pointer"
                      onClick={() => {
                        setSelectedChallenge(challenge);
                        setActiveView('detail'); // Add this line to change the view
                      }}
                    >
                      <div className="relative">
                        <img 
                          className="h-48 w-full object-cover" 
                          src={challenge.image} 
                          alt={challenge.title} 
                        />
                        <div className="absolute top-0 left-0 p-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                            {challenge.difficulty}
                          </span>
                        </div>
                        <div className="absolute top-0 right-0 p-2">
                          {isAdmin && (
                            <button 
                              className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-gray-800 bg-opacity-60 hover:bg-opacity-70"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add edit functionality here
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1 p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          {renderChallengeIcon(challenge.type)}
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {challenge.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">{challenge.title}</h3>
                        
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>{getTimeRemaining(challenge.endDate)}</p>
                        </div>
                        
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>{challenge.participants.length} participants</p>
                        </div>
                        
                        {isUserInChallenge(challenge) && (
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">Your progress</span>
                              <span className="font-medium text-yellow-600">
                                {getUserProgress(challenge)} / {challenge.goal} {challenge.unit}
                              </span>
                            </div>
                            <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-600 h-2 rounded-full" 
                                style={{ 
                                  width: `${Math.min(100, (getUserProgress(challenge) / challenge.goal) * 100)}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="border-t border-gray-200 p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex">
                            <div className="flex -space-x-1">
                              {challenge.participants.slice(0, 2).map((participant, idx) => (
                                <div key={idx} className="inline-block h-6 w-6 rounded-full ring-1 ring-white">
                                  <img 
                                    className="h-full w-full rounded-full object-cover" 
                                    src={participant.avatar} 
                                    alt={participant.name} 
                                  />
                                </div>
                              ))}
                              {challenge.participants.length > 2 && (
                                <div className="inline-block h-6 w-6 rounded-full bg-gray-200 ring-1 ring-white flex items-center justify-center text-xs text-gray-600">
                                  +{challenge.participants.length - 2}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {isUserInChallenge(challenge) ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent double triggering with the card's onClick
                                  setSelectedChallenge(challenge);
                                  setActiveView('detail');
                                }}
                                className="px-3 py-1 text-sm font-medium text-yellow-600 hover:text-yellow-700"
                              >
                                View
                              </button>
                              <button
                                onClick={() => leaveChallenge(challenge)}
                                className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-700"
                              >
                                Leave
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => joinChallenge(challenge)}
                              className="px-3 py-1 text-sm font-medium text-white bg-yellow-600 rounded hover:bg-yellow-700"
                            >
                              Join
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Challenge Detail View */
        <div className="space-y-6">
          <div className="flex items-center">
            <button 
              onClick={() => setActiveView(isUserInChallenge(selectedChallenge as Challenge) ? 'active' : 'all')}
              className="mr-3 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{selectedChallenge?.title}</h1>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative h-64">
              <img 
                src={selectedChallenge?.image} 
                alt={selectedChallenge?.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-gray-800">
                    {selectedChallenge?.category}
                  </div>
                  <h1 className="mt-2 text-3xl font-bold text-white">{selectedChallenge?.title}</h1>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(selectedChallenge?.difficulty || 'beginner')}`}>
                      {selectedChallenge?.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 flex-1">
                  <div className="text-sm text-gray-500">Challenge Type</div>
                  <div className="mt-1 flex items-center">
                    {renderChallengeIcon(selectedChallenge?.type || 'steps')}
                    <span className="ml-1 text-lg font-medium text-gray-900">
                      {selectedChallenge?.type ? selectedChallenge.type.charAt(0).toUpperCase() + selectedChallenge.type.slice(1) : ''}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 flex-1">
                  <div className="text-sm text-gray-500">Goal</div>
                  <div className="mt-1 text-lg font-medium text-gray-900">
                    {selectedChallenge?.goal} {selectedChallenge?.unit}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 flex-1">
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="mt-1 text-lg font-medium text-gray-900">
                    {formatDate(selectedChallenge?.startDate || '')} - {formatDate(selectedChallenge?.endDate || '')}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 flex-1">
                  <div className="text-sm text-gray-500">Participants</div>
                  <div className="mt-1 text-lg font-medium text-gray-900">
                    {selectedChallenge?.participants.length}
                  </div>
                </div>
              </div>
              
              <div className="prose max-w-none mb-6">
                <h2>Description</h2>
                <p>{selectedChallenge?.description}</p>
              </div>
              
              {isUserInChallenge(selectedChallenge as Challenge) && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Your Progress</h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Current Progress</span>
                      <span className="text-lg font-medium text-yellow-600">
                        {getUserProgress(selectedChallenge as Challenge)} / {selectedChallenge?.goal} {selectedChallenge?.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-yellow-600 h-4 rounded-full" 
                        style={{ 
                          width: `${Math.min(100, (getUserProgress(selectedChallenge as Challenge) / (selectedChallenge?.goal || 1)) * 100)}%` 
                        }}
                      ></div>
                    </div>
                    
                    <div className="mt-6 flex items-center">
                      <div className="flex-1">
                        <label htmlFor="update-challenge-progress" className="block text-sm font-medium text-gray-700">
                          Update your progress
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="number"
                            name="update-challenge-progress"
                            id="update-challenge-progress"
                            className="focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                            placeholder="0"
                            min="0"
                            max={selectedChallenge?.goal}
                          />
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 text-sm"
                            onClick={() => {
                              const input = document.getElementById('update-challenge-progress') as HTMLInputElement;
                              if (input && input.value) {
                                updateProgress(selectedChallenge?.id || '', Number(input.value));
                                input.value = '';
                              }
                            }}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Leaderboard</h2>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Participant
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Progress
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Completion
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...(selectedChallenge?.participants || [])].sort((a, b) => b.progress - a.progress).map((participant, idx) => (
                        <tr key={participant.userId} className={participant.userId === user?.id ? 'bg-yellow-50' : ''}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {idx + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src={participant.avatar} alt={participant.name} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {participant.name} {participant.userId === user?.id && '(You)'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {participant.progress} / {selectedChallenge?.goal} {selectedChallenge?.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {participant.completedAt ? formatDate(participant.completedAt) : 'In Progress'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Challenge Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-900">Create New Challenge</h2>
              <button 
                onClick={() => setShowCreateModal(false)} 
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              
              // Form validation and submission logic
              const formData = new FormData(e.target as HTMLFormElement);
              
              const newChallenge: Challenge = {
                id: `challenge-${Date.now()}`,
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                type: formData.get('type') as any,
                goal: Number(formData.get('goal')),
                unit: formData.get('unit') as string,
                startDate: formData.get('startDate') as string,
                endDate: formData.get('endDate') as string,
                image: formData.get('image') as string || 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                category: formData.get('category') as any,
                difficulty: formData.get('difficulty') as any,
                participants: [],
                createdBy: user?.id || 'admin',
                featured: formData.get('featured') === 'true',
                rewards: {
                  points: Number(formData.get('points')),
                  badge: formData.get('badge') as string || undefined,
                  other: formData.get('otherReward') as string || undefined
                }
              };
              
              createChallenge(newChallenge);
            }}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Challenge Title*
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Challenge Type*
                    </label>
                    <select
                      id="type"
                      name="type"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    >
                      <option value="steps">Steps</option>
                      <option value="distance">Distance</option>
                      <option value="workouts">Workouts</option>
                      <option value="weight">Weight</option>
                      <option value="calories">Calories</option>
                      <option value="strength">Strength</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
                      Goal Amount*
                    </label>
                    <input
                      type="number"
                      name="goal"
                      id="goal"
                      required
                      min="1"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                      Unit*
                    </label>
                    <input
                      type="text"
                      name="unit"
                      id="unit"
                      required
                      placeholder="steps, miles, workouts, lbs, etc."
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category*
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    >
                      <option value="cardio">Cardio</option>
                      <option value="strength">Strength</option>
                      <option value="nutrition">Nutrition</option>
                      <option value="wellness">Wellness</option>
                      <option value="team">Team</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                      Difficulty*
                    </label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="elite">Elite</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                      Start Date*
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                      End Date*
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      id="image"
                      placeholder="https://example.com/image.jpg"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Enter a URL for the challenge cover image. Leave empty to use a default image.
                    </p>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900">Rewards</h3>
                  
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label htmlFor="points" className="block text-sm font-medium text-gray-700">
                        Points*
                      </label>
                      <input
                        type="number"
                        name="points"
                        id="points"
                        min="0"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="badge" className="block text-sm font-medium text-gray-700">
                        Badge Name
                      </label>
                      <input
                        type="text"
                        name="badge"
                        id="badge"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="otherReward" className="block text-sm font-medium text-gray-700">
                        Other Reward
                      </label>
                      <input
                        type="text"
                        name="otherReward"
                        id="otherReward"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900">Options</h3>
                  
                  <div className="mt-4">
                    <div className="flex items-center">
                      <input
                        id="featured"
                        name="featured"
                        type="checkbox"
                        value="true"
                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                      />
                      <label htmlFor="featured" className="ml-3 block text-sm font-medium text-gray-700">
                        Featured Challenge
                      </label>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Featured challenges are highlighted at the top of the challenges page.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Create Challenge
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add view for the "active" tab */}
      {activeView === 'active' && (
        <div className="space-y-6">
          {userChallenges.filter(c => new Date(c.endDate) > new Date()).length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userChallenges
                .filter(c => new Date(c.endDate) > new Date())
                .map(challenge => (
                  <div key={challenge.id} className="bg-white overflow-hidden shadow rounded-lg flex flex-col">
                    <div className="relative">
                      <img 
                        className="h-48 w-full object-cover" 
                        src={challenge.image} 
                        alt={challenge.title} 
                      />
                      <div className="absolute top-0 left-0 p-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        {renderChallengeIcon(challenge.type)}
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {challenge.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">{challenge.title}</h3>
                      
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>{getTimeRemaining(challenge.endDate)}</p>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Your progress</span>
                          <span className="font-medium text-yellow-600">
                            {getUserProgress(challenge)} / {challenge.goal} {challenge.unit}
                          </span>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, (getUserProgress(challenge) / challenge.goal) * 100)}%` }}
                          ></div>
                        </div>
                        
                        {/* Quick update progress inline */}
                        <div className="mt-4 flex items-center">
                          <input 
                            type="number" 
                            placeholder="Update"
                            className="w-24 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            min="0"
                            max={challenge.goal}
                            id={`quick-update-${challenge.id}`}
                          />
                          <button
                            className="ml-2 px-3 py-1 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                            onClick={() => {
                              const input = document.getElementById(`quick-update-${challenge.id}`) as HTMLInputElement;
                              if (input && input.value) {
                                updateProgress(challenge.id, Number(input.value));
                                input.value = '';
                              }
                            }}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 p-4">
                        <div className="flex justify-between">
                          <button
                            onClick={() => setSelectedChallenge(challenge)}
                            className="inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700"
                          >
                            View Details
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </button>
                          <button
                            onClick={() => leaveChallenge(challenge)}
                            className="text-sm font-medium text-red-600 hover:text-red-700"
                          >
                            Leave Challenge
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
                <Trophy className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No Active Challenges</h3>
              <p className="mt-2 text-sm text-gray-500">
                You haven't joined any active challenges yet. Explore available challenges and join one to start your journey!
              </p>
              <button
                onClick={() => setActiveView('all')}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700"
              >
                Explore Challenges
              </button>
            </div>
          )}
        </div>
      )}

      {/* Add view for the "completed" tab */}
      {activeView === 'completed' && (
        <div className="space-y-6">
          {userChallenges.filter(c => {
            const participant = c.participants.find(p => p.userId === user?.id);
            return participant?.completedAt || new Date(c.endDate) < new Date();
          }).length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userChallenges
                .filter(c => {
                  const participant = c.participants.find(p => p.userId === user?.id);
                  return participant?.completedAt || new Date(c.endDate) < new Date();
                })
                .map(challenge => (
                  <div key={challenge.id} className="bg-white overflow-hidden shadow rounded-lg flex flex-col">
                    <div className="relative">
                      <img 
                        className="h-48 w-full object-cover filter brightness-90" 
                        src={challenge.image} 
                        alt={challenge.title} 
                      />
                      <div className="absolute top-0 right-0 p-2">
                        {challenge.participants.find(p => p.userId === user?.id)?.completedAt && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        {renderChallengeIcon(challenge.type)}
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {challenge.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">{challenge.title}</h3>
                      
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>{formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}</p>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Final progress</span>
                          <span className="font-medium text-yellow-600">
                            {getUserProgress(challenge)} / {challenge.goal} {challenge.unit}
                          </span>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${
                              getUserProgress(challenge) >= challenge.goal 
                                ? 'bg-green-600' 
                                : 'bg-yellow-600'
                            } h-2 rounded-full`}
                            style={{ width: `${Math.min(100, (getUserProgress(challenge) / challenge.goal) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {challenge.rewards && (
                        <div className="mt-4 bg-yellow-50 p-3 rounded-md">
                          <h4 className="text-sm font-medium text-yellow-800">Rewards Earned</h4>
                          <div className="mt-2 space-y-1 text-sm">
                            {challenge.rewards.points && (
                              <div className="flex items-center">
                                <Award className="h-4 w-4 text-yellow-600 mr-1" />
                                <span>{challenge.rewards.points} points</span>
                              </div>
                            )}
                            {challenge.rewards.badge && (
                              <div className="flex items-center">
                                <Trophy className="h-4 w-4 text-yellow-600 mr-1" />
                                <span>{challenge.rewards.badge}</span>
                              </div>
                            )}
                            {challenge.rewards.other && (
                              <div className="flex items-center">
                                <Award className="h-4 w-4 text-yellow-600 mr-1" />
                                <span>{challenge.rewards.other}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-200 p-4">
                      <button
                        onClick={() => setSelectedChallenge(challenge)}
                        className="inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700"
                      >
                        View Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
                <Trophy className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No Completed Challenges</h3>
              <p className="mt-2 text-sm text-gray-500">
                You haven't completed any challenges yet. Join a challenge and work towards achieving your goals!
              </p>
              <button
                onClick={() => setActiveView('all')}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700"
              >
                Find Challenges
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChallengesPage;