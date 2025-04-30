import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Trophy, Clock, Users, Calendar, Award, BarChart2, PieChart, ChevronRight, ChevronLeft, Plus, X, Search, CheckCircle, Edit // Add Edit here
 } from 'lucide-react';
function ChallengesPage() {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('all');
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    // Mock challenges data - would typically come from your store
    const [challenges, setChallenges] = useState([
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
    const userChallenges = challenges.filter(challenge => challenge.participants.some(p => p.userId === user?.id));
    const filteredChallenges = challenges
        .filter(challenge => {
        if (filter === 'all')
            return true;
        return challenge.category === filter;
    })
        .filter(challenge => {
        if (!searchQuery)
            return true;
        return challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    });
    const isUserInChallenge = (challenge) => {
        return challenge.participants.some(p => p.userId === user?.id);
    };
    const getUserProgress = (challenge) => {
        if (!user)
            return 0;
        const participant = challenge.participants.find(p => p.userId === user.id);
        return participant ? participant.progress : 0;
    };
    const joinChallenge = (challenge) => {
        if (!user)
            return;
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
    const leaveChallenge = (challenge) => {
        if (!user)
            return;
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
    const updateProgress = (challengeId, progress) => {
        if (!user)
            return;
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
    const createChallenge = (challenge) => {
        setChallenges([...challenges, challenge]);
        setShowCreateModal(false);
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    const renderChallengeIcon = (type) => {
        switch (type) {
            case 'steps':
                return _jsx(Trophy, { className: "h-6 w-6 text-yellow-500" });
            case 'distance':
                return _jsx(BarChart2, { className: "h-6 w-6 text-blue-500" });
            case 'workouts':
                return _jsx(CheckCircle, { className: "h-6 w-6 text-green-500" });
            case 'weight':
                return _jsx(PieChart, { className: "h-6 w-6 text-purple-500" });
            default:
                return _jsx(Award, { className: "h-6 w-6 text-yellow-500" });
        }
    };
    const getDifficultyColor = (difficulty) => {
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
    const getTimeRemaining = (endDate) => {
        const end = new Date(endDate);
        const now = new Date();
        const diff = end.getTime() - now.getTime();
        if (diff <= 0)
            return 'Ended';
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days > 0)
            return `${days} day${days > 1 ? 's' : ''} left`;
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return `${hours} hour${hours > 1 ? 's' : ''} left`;
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [activeView !== 'detail' ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "md:flex md:items-center md:justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Challenges" }), _jsx("p", { className: "text-gray-500", children: "Join challenges and compete with others" })] }), _jsxs("div", { className: "mt-4 md:mt-0 flex space-x-3", children: [_jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", placeholder: "Search challenges...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" }), _jsx(Search, { className: "h-5 w-5 text-gray-400 absolute left-3 top-2.5" })] }), isAdmin && (_jsxs("button", { onClick: () => setShowCreateModal(true), className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "New Challenge"] }))] })] }), _jsxs("div", { className: "bg-white shadow rounded-lg mb-6", children: [_jsxs("div", { className: "flex flex-wrap border-b border-gray-200", children: [_jsx("button", { onClick: () => setActiveView('all'), className: `px-6 py-3 text-sm font-medium ${activeView === 'all' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500 hover:text-gray-700'}`, children: "All Challenges" }), _jsx("button", { onClick: () => setActiveView('active'), className: `px-6 py-3 text-sm font-medium ${activeView === 'active' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500 hover:text-gray-700'}`, children: "My Active Challenges" }), _jsx("button", { onClick: () => setActiveView('completed'), className: `px-6 py-3 text-sm font-medium ${activeView === 'completed' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500 hover:text-gray-700'}`, children: "Completed" })] }), _jsxs("div", { className: "px-4 py-3 flex flex-wrap gap-2", children: [_jsx("button", { onClick: () => setFilter('all'), className: `px-3 py-1 text-sm rounded-full ${filter === 'all' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`, children: "All Categories" }), _jsx("button", { onClick: () => setFilter('cardio'), className: `px-3 py-1 text-sm rounded-full ${filter === 'cardio' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`, children: "Cardio" }), _jsx("button", { onClick: () => setFilter('strength'), className: `px-3 py-1 text-sm rounded-full ${filter === 'strength' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`, children: "Strength" }), _jsx("button", { onClick: () => setFilter('nutrition'), className: `px-3 py-1 text-sm rounded-full ${filter === 'nutrition' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`, children: "Nutrition" }), _jsx("button", { onClick: () => setFilter('wellness'), className: `px-3 py-1 text-sm rounded-full ${filter === 'wellness' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`, children: "Wellness" }), _jsx("button", { onClick: () => setFilter('team'), className: `px-3 py-1 text-sm rounded-full ${filter === 'team' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`, children: "Team Challenges" })] })] }), activeView === 'all' && (_jsxs("div", { className: "space-y-6", children: [challenges.find(c => c.featured) && (_jsx("div", { className: "bg-white shadow rounded-lg overflow-hidden", children: _jsxs("div", { className: "md:flex", children: [_jsx("div", { className: "md:flex-shrink-0", children: _jsx("img", { className: "h-48 w-full object-cover md:w-48", src: challenges.find(c => c.featured)?.image, alt: "Featured challenge" }) }), _jsxs("div", { className: "p-6 md:flex-1", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2", children: "Featured" }), _jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800", children: challenges.find(c => c.featured)?.category })] }), _jsx("h2", { className: "mt-2 text-xl font-semibold text-gray-900", children: challenges.find(c => c.featured)?.title }), _jsx("p", { className: "mt-2 text-gray-500", children: challenges.find(c => c.featured)?.description }), _jsxs("div", { className: "mt-4 flex items-center text-sm text-gray-500", children: [_jsx(Calendar, { className: "flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" }), _jsxs("p", { children: [formatDate(challenges.find(c => c.featured)?.startDate || ''), " - ", formatDate(challenges.find(c => c.featured)?.endDate || '')] })] }), _jsxs("div", { className: "mt-6 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsxs("div", { className: "flex -space-x-2", children: [challenges.find(c => c.featured)?.participants.slice(0, 3).map((participant, idx) => (_jsx("div", { className: "inline-block h-8 w-8 rounded-full ring-2 ring-white", children: _jsx("img", { className: "h-full w-full rounded-full object-cover", src: participant.avatar, alt: participant.name }) }, idx))), (challenges.find(c => c.featured)?.participants.length || 0) > 3 && (_jsxs("div", { className: "inline-block h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white flex items-center justify-center text-xs text-gray-600", children: ["+", (challenges.find(c => c.featured)?.participants.length || 0) - 3] }))] }), _jsxs("p", { className: "ml-2 text-sm text-gray-500", children: [challenges.find(c => c.featured)?.participants.length, " participants"] })] }), challenges.find(c => c.featured) && (_jsx("div", { children: isUserInChallenge(challenges.find(c => c.featured)) ? (_jsx("button", { onClick: () => {
                                                                    setSelectedChallenge(challenges.find(c => c.featured));
                                                                    setActiveView('detail');
                                                                }, className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none", children: "View Challenge" })) : (_jsx("button", { onClick: () => joinChallenge(challenges.find(c => c.featured)), className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none", children: "Join Challenge" })) }))] })] })] }) })), _jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filteredChallenges
                                    .filter(c => !c.featured)
                                    .map(challenge => (_jsxs("div", { className: "bg-white overflow-hidden shadow rounded-lg flex flex-col cursor-pointer", onClick: () => {
                                        setSelectedChallenge(challenge);
                                        setActiveView('detail'); // Add this line to change the view
                                    }, children: [_jsxs("div", { className: "relative", children: [_jsx("img", { className: "h-48 w-full object-cover", src: challenge.image, alt: challenge.title }), _jsx("div", { className: "absolute top-0 left-0 p-2", children: _jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`, children: challenge.difficulty }) }), _jsx("div", { className: "absolute top-0 right-0 p-2", children: isAdmin && (_jsx("button", { className: "inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-gray-800 bg-opacity-60 hover:bg-opacity-70", onClick: (e) => {
                                                            e.stopPropagation();
                                                            // Add edit functionality here
                                                        }, children: _jsx(Edit, { className: "h-4 w-4" }) })) })] }), _jsxs("div", { className: "flex-1 p-4", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [renderChallengeIcon(challenge.type), _jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800", children: challenge.category })] }), _jsx("h3", { className: "text-lg font-medium text-gray-900", children: challenge.title }), _jsxs("div", { className: "mt-2 flex items-center text-sm text-gray-500", children: [_jsx(Clock, { className: "flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" }), _jsx("p", { children: getTimeRemaining(challenge.endDate) })] }), _jsxs("div", { className: "mt-2 flex items-center text-sm text-gray-500", children: [_jsx(Users, { className: "flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" }), _jsxs("p", { children: [challenge.participants.length, " participants"] })] }), isUserInChallenge(challenge) && (_jsxs("div", { className: "mt-4", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-500", children: "Your progress" }), _jsxs("span", { className: "font-medium text-yellow-600", children: [getUserProgress(challenge), " / ", challenge.goal, " ", challenge.unit] })] }), _jsx("div", { className: "mt-1 w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-yellow-600 h-2 rounded-full", style: {
                                                                    width: `${Math.min(100, (getUserProgress(challenge) / challenge.goal) * 100)}%`
                                                                } }) })] }))] }), _jsx("div", { className: "border-t border-gray-200 p-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("div", { className: "flex", children: _jsxs("div", { className: "flex -space-x-1", children: [challenge.participants.slice(0, 2).map((participant, idx) => (_jsx("div", { className: "inline-block h-6 w-6 rounded-full ring-1 ring-white", children: _jsx("img", { className: "h-full w-full rounded-full object-cover", src: participant.avatar, alt: participant.name }) }, idx))), challenge.participants.length > 2 && (_jsxs("div", { className: "inline-block h-6 w-6 rounded-full bg-gray-200 ring-1 ring-white flex items-center justify-center text-xs text-gray-600", children: ["+", challenge.participants.length - 2] }))] }) }), isUserInChallenge(challenge) ? (_jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { onClick: (e) => {
                                                                    e.stopPropagation(); // Prevent double triggering with the card's onClick
                                                                    setSelectedChallenge(challenge);
                                                                    setActiveView('detail');
                                                                }, className: "px-3 py-1 text-sm font-medium text-yellow-600 hover:text-yellow-700", children: "View" }), _jsx("button", { onClick: () => leaveChallenge(challenge), className: "px-3 py-1 text-sm font-medium text-red-600 hover:text-red-700", children: "Leave" })] })) : (_jsx("button", { onClick: () => joinChallenge(challenge), className: "px-3 py-1 text-sm font-medium text-white bg-yellow-600 rounded hover:bg-yellow-700", children: "Join" }))] }) })] }, challenge.id))) })] }))] })) : (
            /* Challenge Detail View */
            _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center", children: [_jsxs("button", { onClick: () => setActiveView(isUserInChallenge(selectedChallenge) ? 'active' : 'all'), className: "mr-3 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none", children: [_jsx(ChevronLeft, { className: "h-4 w-4 mr-1" }), "Back"] }), _jsx("h1", { className: "text-2xl font-bold text-gray-900", children: selectedChallenge?.title })] }), _jsxs("div", { className: "bg-white shadow-lg rounded-lg overflow-hidden", children: [_jsxs("div", { className: "relative h-64", children: [_jsx("img", { src: selectedChallenge?.image, alt: selectedChallenge?.title, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-black bg-opacity-30" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-gray-800", children: selectedChallenge?.category }), _jsx("h1", { className: "mt-2 text-3xl font-bold text-white", children: selectedChallenge?.title }), _jsx("div", { className: "mt-2", children: _jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(selectedChallenge?.difficulty || 'beginner')}`, children: selectedChallenge?.difficulty }) })] }) })] }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex flex-wrap gap-4 mb-6", children: [_jsxs("div", { className: "bg-gray-50 rounded-lg p-4 flex-1", children: [_jsx("div", { className: "text-sm text-gray-500", children: "Challenge Type" }), _jsxs("div", { className: "mt-1 flex items-center", children: [renderChallengeIcon(selectedChallenge?.type || 'steps'), _jsx("span", { className: "ml-1 text-lg font-medium text-gray-900", children: selectedChallenge?.type ? selectedChallenge.type.charAt(0).toUpperCase() + selectedChallenge.type.slice(1) : '' })] })] }), _jsxs("div", { className: "bg-gray-50 rounded-lg p-4 flex-1", children: [_jsx("div", { className: "text-sm text-gray-500", children: "Goal" }), _jsxs("div", { className: "mt-1 text-lg font-medium text-gray-900", children: [selectedChallenge?.goal, " ", selectedChallenge?.unit] })] }), _jsxs("div", { className: "bg-gray-50 rounded-lg p-4 flex-1", children: [_jsx("div", { className: "text-sm text-gray-500", children: "Duration" }), _jsxs("div", { className: "mt-1 text-lg font-medium text-gray-900", children: [formatDate(selectedChallenge?.startDate || ''), " - ", formatDate(selectedChallenge?.endDate || '')] })] }), _jsxs("div", { className: "bg-gray-50 rounded-lg p-4 flex-1", children: [_jsx("div", { className: "text-sm text-gray-500", children: "Participants" }), _jsx("div", { className: "mt-1 text-lg font-medium text-gray-900", children: selectedChallenge?.participants.length })] })] }), _jsxs("div", { className: "prose max-w-none mb-6", children: [_jsx("h2", { children: "Description" }), _jsx("p", { children: selectedChallenge?.description })] }), isUserInChallenge(selectedChallenge) && (_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Your Progress" }), _jsxs("div", { className: "bg-gray-50 rounded-lg p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm text-gray-500", children: "Current Progress" }), _jsxs("span", { className: "text-lg font-medium text-yellow-600", children: [getUserProgress(selectedChallenge), " / ", selectedChallenge?.goal, " ", selectedChallenge?.unit] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-4", children: _jsx("div", { className: "bg-yellow-600 h-4 rounded-full", style: {
                                                                width: `${Math.min(100, (getUserProgress(selectedChallenge) / (selectedChallenge?.goal || 1)) * 100)}%`
                                                            } }) }), _jsx("div", { className: "mt-6 flex items-center", children: _jsxs("div", { className: "flex-1", children: [_jsx("label", { htmlFor: "update-challenge-progress", className: "block text-sm font-medium text-gray-700", children: "Update your progress" }), _jsxs("div", { className: "mt-1 flex rounded-md shadow-sm", children: [_jsx("input", { type: "number", name: "update-challenge-progress", id: "update-challenge-progress", className: "focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300", placeholder: "0", min: "0", max: selectedChallenge?.goal }), _jsx("button", { type: "button", className: "inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 text-sm", onClick: () => {
                                                                                const input = document.getElementById('update-challenge-progress');
                                                                                if (input && input.value) {
                                                                                    updateProgress(selectedChallenge?.id || '', Number(input.value));
                                                                                    input.value = '';
                                                                                }
                                                                            }, children: "Update" })] })] }) })] })] })), _jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Leaderboard" }), _jsx("div", { className: "bg-gray-50 rounded-lg overflow-hidden", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-100", children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Rank" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Participant" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Progress" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Completion" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: [...(selectedChallenge?.participants || [])].sort((a, b) => b.progress - a.progress).map((participant, idx) => (_jsxs("tr", { className: participant.userId === user?.id ? 'bg-yellow-50' : '', children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: idx + 1 }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0 h-10 w-10", children: _jsx("img", { className: "h-10 w-10 rounded-full", src: participant.avatar, alt: participant.name }) }), _jsx("div", { className: "ml-4", children: _jsxs("div", { className: "text-sm font-medium text-gray-900", children: [participant.name, " ", participant.userId === user?.id && '(You)'] }) })] }) }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [participant.progress, " / ", selectedChallenge?.goal, " ", selectedChallenge?.unit] }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: participant.completedAt ? formatDate(participant.completedAt) : 'In Progress' })] }, participant.userId))) })] }) })] })] })] })] })), showCreateModal && (_jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-xl font-medium text-gray-900", children: "Create New Challenge" }), _jsx("button", { onClick: () => setShowCreateModal(false), className: "text-gray-400 hover:text-gray-500", children: _jsx(X, { className: "h-5 w-5" }) })] }), _jsx("form", { onSubmit: (e) => {
                                e.preventDefault();
                                // Form validation and submission logic
                                const formData = new FormData(e.target);
                                const newChallenge = {
                                    id: `challenge-${Date.now()}`,
                                    title: formData.get('title'),
                                    description: formData.get('description'),
                                    type: formData.get('type'),
                                    goal: Number(formData.get('goal')),
                                    unit: formData.get('unit'),
                                    startDate: formData.get('startDate'),
                                    endDate: formData.get('endDate'),
                                    image: formData.get('image') || 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                                    category: formData.get('category'),
                                    difficulty: formData.get('difficulty'),
                                    participants: [],
                                    createdBy: user?.id || 'admin',
                                    featured: formData.get('featured') === 'true',
                                    rewards: {
                                        points: Number(formData.get('points')),
                                        badge: formData.get('badge') || undefined,
                                        other: formData.get('otherReward') || undefined
                                    }
                                };
                                createChallenge(newChallenge);
                            }, children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "title", className: "block text-sm font-medium text-gray-700", children: "Challenge Title*" }), _jsx("input", { type: "text", name: "title", id: "title", required: true, className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "type", className: "block text-sm font-medium text-gray-700", children: "Challenge Type*" }), _jsxs("select", { id: "type", name: "type", required: true, className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500", children: [_jsx("option", { value: "steps", children: "Steps" }), _jsx("option", { value: "distance", children: "Distance" }), _jsx("option", { value: "workouts", children: "Workouts" }), _jsx("option", { value: "weight", children: "Weight" }), _jsx("option", { value: "calories", children: "Calories" }), _jsx("option", { value: "strength", children: "Strength" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "goal", className: "block text-sm font-medium text-gray-700", children: "Goal Amount*" }), _jsx("input", { type: "number", name: "goal", id: "goal", required: true, min: "1", className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "unit", className: "block text-sm font-medium text-gray-700", children: "Unit*" }), _jsx("input", { type: "text", name: "unit", id: "unit", required: true, placeholder: "steps, miles, workouts, lbs, etc.", className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "category", className: "block text-sm font-medium text-gray-700", children: "Category*" }), _jsxs("select", { id: "category", name: "category", required: true, className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500", children: [_jsx("option", { value: "cardio", children: "Cardio" }), _jsx("option", { value: "strength", children: "Strength" }), _jsx("option", { value: "nutrition", children: "Nutrition" }), _jsx("option", { value: "wellness", children: "Wellness" }), _jsx("option", { value: "team", children: "Team" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "difficulty", className: "block text-sm font-medium text-gray-700", children: "Difficulty*" }), _jsxs("select", { id: "difficulty", name: "difficulty", required: true, className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500", children: [_jsx("option", { value: "beginner", children: "Beginner" }), _jsx("option", { value: "intermediate", children: "Intermediate" }), _jsx("option", { value: "advanced", children: "Advanced" }), _jsx("option", { value: "elite", children: "Elite" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "startDate", className: "block text-sm font-medium text-gray-700", children: "Start Date*" }), _jsx("input", { type: "date", name: "startDate", id: "startDate", required: true, className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "endDate", className: "block text-sm font-medium text-gray-700", children: "End Date*" }), _jsx("input", { type: "date", name: "endDate", id: "endDate", required: true, className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" })] }), _jsxs("div", { className: "sm:col-span-2", children: [_jsx("label", { htmlFor: "image", className: "block text-sm font-medium text-gray-700", children: "Image URL" }), _jsx("input", { type: "text", name: "image", id: "image", placeholder: "https://example.com/image.jpg", className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" }), _jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Enter a URL for the challenge cover image. Leave empty to use a default image." })] }), _jsxs("div", { className: "sm:col-span-2", children: [_jsx("label", { htmlFor: "description", className: "block text-sm font-medium text-gray-700", children: "Description*" }), _jsx("textarea", { id: "description", name: "description", rows: 3, required: true, className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" })] })] }), _jsxs("div", { className: "border-t border-gray-200 pt-6", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Rewards" }), _jsxs("div", { className: "mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "points", className: "block text-sm font-medium text-gray-700", children: "Points*" }), _jsx("input", { type: "number", name: "points", id: "points", min: "0", required: true, className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "badge", className: "block text-sm font-medium text-gray-700", children: "Badge Name" }), _jsx("input", { type: "text", name: "badge", id: "badge", className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" })] }), _jsxs("div", { className: "sm:col-span-2", children: [_jsx("label", { htmlFor: "otherReward", className: "block text-sm font-medium text-gray-700", children: "Other Reward" }), _jsx("input", { type: "text", name: "otherReward", id: "otherReward", className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" })] })] })] }), _jsxs("div", { className: "border-t border-gray-200 pt-6", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Options" }), _jsxs("div", { className: "mt-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "featured", name: "featured", type: "checkbox", value: "true", className: "h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" }), _jsx("label", { htmlFor: "featured", className: "ml-3 block text-sm font-medium text-gray-700", children: "Featured Challenge" })] }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Featured challenges are highlighted at the top of the challenges page." })] })] }), _jsxs("div", { className: "flex justify-end", children: [_jsx("button", { type: "button", onClick: () => setShowCreateModal(false), className: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500", children: "Cancel" }), _jsx("button", { type: "submit", className: "ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500", children: "Create Challenge" })] })] }) })] }) })), activeView === 'active' && (_jsx("div", { className: "space-y-6", children: userChallenges.filter(c => new Date(c.endDate) > new Date()).length > 0 ? (_jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: userChallenges
                        .filter(c => new Date(c.endDate) > new Date())
                        .map(challenge => (_jsxs("div", { className: "bg-white overflow-hidden shadow rounded-lg flex flex-col", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { className: "h-48 w-full object-cover", src: challenge.image, alt: challenge.title }), _jsx("div", { className: "absolute top-0 left-0 p-2", children: _jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`, children: challenge.difficulty }) })] }), _jsxs("div", { className: "flex-1 p-4", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [renderChallengeIcon(challenge.type), _jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800", children: challenge.category })] }), _jsx("h3", { className: "text-lg font-medium text-gray-900", children: challenge.title }), _jsxs("div", { className: "mt-2 flex items-center text-sm text-gray-500", children: [_jsx(Clock, { className: "flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" }), _jsx("p", { children: getTimeRemaining(challenge.endDate) })] }), _jsxs("div", { className: "mt-4", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-500", children: "Your progress" }), _jsxs("span", { className: "font-medium text-yellow-600", children: [getUserProgress(challenge), " / ", challenge.goal, " ", challenge.unit] })] }), _jsx("div", { className: "mt-1 w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-yellow-600 h-2 rounded-full", style: { width: `${Math.min(100, (getUserProgress(challenge) / challenge.goal) * 100)}%` } }) }), _jsxs("div", { className: "mt-4 flex items-center", children: [_jsx("input", { type: "number", placeholder: "Update", className: "w-24 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500", min: "0", max: challenge.goal, id: `quick-update-${challenge.id}` }), _jsx("button", { className: "ml-2 px-3 py-1 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700", onClick: () => {
                                                            const input = document.getElementById(`quick-update-${challenge.id}`);
                                                            if (input && input.value) {
                                                                updateProgress(challenge.id, Number(input.value));
                                                                input.value = '';
                                                            }
                                                        }, children: "Update" })] })] }), _jsx("div", { className: "border-t border-gray-200 p-4", children: _jsxs("div", { className: "flex justify-between", children: [_jsxs("button", { onClick: () => setSelectedChallenge(challenge), className: "inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700", children: ["View Details", _jsx(ChevronRight, { className: "ml-1 h-4 w-4" })] }), _jsx("button", { onClick: () => leaveChallenge(challenge), className: "text-sm font-medium text-red-600 hover:text-red-700", children: "Leave Challenge" })] }) })] })] }, challenge.id))) })) : (_jsxs("div", { className: "bg-white shadow rounded-lg p-8 text-center", children: [_jsx("div", { className: "mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100", children: _jsx(Trophy, { className: "h-8 w-8 text-gray-400" }) }), _jsx("h3", { className: "mt-4 text-lg font-medium text-gray-900", children: "No Active Challenges" }), _jsx("p", { className: "mt-2 text-sm text-gray-500", children: "You haven't joined any active challenges yet. Explore available challenges and join one to start your journey!" }), _jsx("button", { onClick: () => setActiveView('all'), className: "mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700", children: "Explore Challenges" })] })) })), activeView === 'completed' && (_jsx("div", { className: "space-y-6", children: userChallenges.filter(c => {
                    const participant = c.participants.find(p => p.userId === user?.id);
                    return participant?.completedAt || new Date(c.endDate) < new Date();
                }).length > 0 ? (_jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: userChallenges
                        .filter(c => {
                        const participant = c.participants.find(p => p.userId === user?.id);
                        return participant?.completedAt || new Date(c.endDate) < new Date();
                    })
                        .map(challenge => (_jsxs("div", { className: "bg-white overflow-hidden shadow rounded-lg flex flex-col", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { className: "h-48 w-full object-cover filter brightness-90", src: challenge.image, alt: challenge.title }), _jsx("div", { className: "absolute top-0 right-0 p-2", children: challenge.participants.find(p => p.userId === user?.id)?.completedAt && (_jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800", children: [_jsx(CheckCircle, { className: "h-3 w-3 mr-1" }), "Completed"] })) })] }), _jsxs("div", { className: "flex-1 p-4", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [renderChallengeIcon(challenge.type), _jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800", children: challenge.category })] }), _jsx("h3", { className: "text-lg font-medium text-gray-900", children: challenge.title }), _jsxs("div", { className: "mt-2 flex items-center text-sm text-gray-500", children: [_jsx(Calendar, { className: "flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" }), _jsxs("p", { children: [formatDate(challenge.startDate), " - ", formatDate(challenge.endDate)] })] }), _jsxs("div", { className: "mt-4", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-500", children: "Final progress" }), _jsxs("span", { className: "font-medium text-yellow-600", children: [getUserProgress(challenge), " / ", challenge.goal, " ", challenge.unit] })] }), _jsx("div", { className: "mt-1 w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: `${getUserProgress(challenge) >= challenge.goal
                                                        ? 'bg-green-600'
                                                        : 'bg-yellow-600'} h-2 rounded-full`, style: { width: `${Math.min(100, (getUserProgress(challenge) / challenge.goal) * 100)}%` } }) })] }), challenge.rewards && (_jsxs("div", { className: "mt-4 bg-yellow-50 p-3 rounded-md", children: [_jsx("h4", { className: "text-sm font-medium text-yellow-800", children: "Rewards Earned" }), _jsxs("div", { className: "mt-2 space-y-1 text-sm", children: [challenge.rewards.points && (_jsxs("div", { className: "flex items-center", children: [_jsx(Award, { className: "h-4 w-4 text-yellow-600 mr-1" }), _jsxs("span", { children: [challenge.rewards.points, " points"] })] })), challenge.rewards.badge && (_jsxs("div", { className: "flex items-center", children: [_jsx(Trophy, { className: "h-4 w-4 text-yellow-600 mr-1" }), _jsx("span", { children: challenge.rewards.badge })] })), challenge.rewards.other && (_jsxs("div", { className: "flex items-center", children: [_jsx(Award, { className: "h-4 w-4 text-yellow-600 mr-1" }), _jsx("span", { children: challenge.rewards.other })] }))] })] }))] }), _jsx("div", { className: "border-t border-gray-200 p-4", children: _jsxs("button", { onClick: () => setSelectedChallenge(challenge), className: "inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700", children: ["View Details", _jsx(ChevronRight, { className: "ml-1 h-4 w-4" })] }) })] }, challenge.id))) })) : (_jsxs("div", { className: "bg-white shadow rounded-lg p-8 text-center", children: [_jsx("div", { className: "mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100", children: _jsx(Trophy, { className: "h-8 w-8 text-gray-400" }) }), _jsx("h3", { className: "mt-4 text-lg font-medium text-gray-900", children: "No Completed Challenges" }), _jsx("p", { className: "mt-2 text-sm text-gray-500", children: "You haven't completed any challenges yet. Join a challenge and work towards achieving your goals!" }), _jsx("button", { onClick: () => setActiveView('all'), className: "mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700", children: "Find Challenges" })] })) }))] }));
}
export default ChallengesPage;
