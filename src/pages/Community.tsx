import React, { useState, useRef } from 'react';
import { Users, MessageSquare, User, Search, Filter, ThumbsUp, MessageCircle, Share2, X, Send, Heart, MoreHorizontal, Trash2, Edit, ArrowLeft, Calendar, FileText, Settings, MapPin, FileSpreadsheet, Download, AlertTriangle, UserPlus, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

// Add these interface imports
// You can also create a separate types file if preferred
interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  joinDate: string;
  bio?: string;
  email?: string; // Add this line
  stats?: {
    workoutsCompleted: number;
    achievements: string[];
    favoriteWorkouts: string[];
  };
}

interface CommunityComment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

interface CommunityPost {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  images: string | null; // Use 'images' instead of 'image'
  timestamp: string;
  likes: string[];
  comments: CommunityComment[];
}

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  members: string[];
  avatar?: string;
  isPrivate: boolean;
  image?: string; // Make image optional to match the store type
}

interface GroupDetailViewProps {
  groupId: string;
  onBack: () => void;
  user: any;
  handleGroupMembership: (groupId: string) => void;
  isUserInGroup: (groupId: string) => boolean;
}

const GroupDetailView: React.FC<GroupDetailViewProps> = ({ groupId, onBack, user, handleGroupMembership, isUserInGroup }) => {
  const [activeSection, setActiveSection] = useState('posts');
  const [newPostContent, setNewPostContent] = useState('');
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const groups = useAppStore(state => state.communityGroups);
  const members = useAppStore(state => state.communityMembers);
  const allPosts = useAppStore(state => state.communityPosts);

  const group = groups.find(g => g.id === groupId);
  if (!group) return <div>Group not found</div>;

  const groupMembers = members.filter(member => group.members.includes(member.id));

  const groupEvents = [
    {
      id: 'event1',
      name: 'Saturday Morning Bootcamp',
      date: new Date('2025-04-06T08:00:00').toISOString(),
      description: 'Join us for an intense bootcamp session at Central Park. All fitness levels welcome!',
      location: 'Central Park, Main Lawn',
      attendees: ['user-2', 'user-3', 'user-5'],
      organizer: 'user-3'
    },
    {
      id: 'event2',
      name: 'Group Strength Training',
      date: new Date('2025-04-10T18:00:00').toISOString(),
      description: 'Weekly strength training session focusing on compound movements.',
      location: 'The Lab Fitness Studio - Room 2',
      attendees: ['user-4', 'user-6'],
      organizer: 'user-3'
    }
  ];

  const groupResources = [
    {
      id: 'resource1',
      name: 'Strength Training Program - Beginners',
      type: 'pdf',
      uploadedBy: 'user-3',
      uploadDate: new Date('2025-03-15').toISOString(),
      downloadUrl: '#'
    },
    {
      id: 'resource2',
      name: 'Nutrition Guide for Athletes',
      type: 'pdf',
      uploadedBy: 'user-3',
      uploadDate: new Date('2025-03-20').toISOString(),
      downloadUrl: '#'
    },
    {
      id: 'resource3',
      name: 'Workout Tracking Sheet',
      type: 'xlsx',
      uploadedBy: 'user-7',
      uploadDate: new Date('2025-03-25').toISOString(),
      downloadUrl: '#'
    }
  ];

  const groupPosts = allPosts.filter((_, index) => index % 3 === 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    setNewPostContent('');
    alert('Group post created! (Demo only)');
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCreateEvent(false);
    setNewEventName('');
    setNewEventDate('');
    setNewEventDescription('');
    alert('Event created! (Demo only)');
  };

  const isGroupAdmin = user?.id === 'user-3';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${group.image})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-black bg-opacity-30 rounded-full p-2 text-white hover:bg-opacity-50"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-2xl font-bold">{group.name}</h1>
          <p className="flex items-center mt-1">
            <Users className="h-4 w-4 mr-2" />
            {group.members.length} members
          </p>
        </div>

        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => handleGroupMembership(groupId)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Leave Group
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex overflow-x-auto">
          <button
            onClick={() => setActiveSection('posts')}
            className={`py-4 px-6 text-center font-medium ${
              activeSection === 'posts'
                ? 'text-yellow-600 border-b-2 border-yellow-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Posts
            </div>
          </button>
          <button
            onClick={() => setActiveSection('members')}
            className={`py-4 px-6 text-center font-medium ${
              activeSection === 'members'
                ? 'text-yellow-600 border-b-2 border-yellow-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Members
            </div>
          </button>
          <button
            onClick={() => setActiveSection('events')}
            className={`py-4 px-6 text-center font-medium ${
              activeSection === 'events'
                ? 'text-yellow-600 border-b-2 border-yellow-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Events
            </div>
          </button>
          <button
            onClick={() => setActiveSection('resources')}
            className={`py-4 px-6 text-center font-medium ${
              activeSection === 'resources'
                ? 'text-yellow-600 border-b-2 border-yellow-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Resources
            </div>
          </button>
          {isGroupAdmin && (
            <button
              onClick={() => setActiveSection('settings')}
              className={`py-4 px-6 text-center font-medium ${
                activeSection === 'settings'
                  ? 'text-yellow-600 border-b-2 border-yellow-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </div>
            </button>
          )}
        </nav>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <p className="text-gray-600">{group.description}</p>
      </div>

      <div className="p-6">
        {activeSection === 'posts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <form onSubmit={handleCreatePost}>
                <div className="flex">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 mr-3">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
                      placeholder={`Share something with the ${group.name} group...`}
                      rows={3}
                    />
                    <div className="flex justify-between mt-2">
                      <button
                        type="button"
                        className="px-3 py-1 text-sm text-gray-600 hover:text-yellow-600"
                      >
                        Add Photo
                      </button>
                      <button
                        type="submit"
                        disabled={!newPostContent.trim()}
                        className={`px-4 py-2 rounded-md ${
                          newPostContent.trim()
                            ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Post to Group
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {groupPosts.length > 0 ? (
              groupPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{post.author.name}</h3>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 mr-2">{formatDate(post.timestamp)}</span>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full">
                            {group.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-4">{post.content}</p>
                    {post.images && (
                      <div className="mb-4">
                        <img
                          src={Array.isArray(post.images) ? post.images[0] : post.images}
                          alt="Post"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                      <button className="flex items-center hover:text-yellow-600">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{post.likes.length}</span>
                      </button>
                      <button className="flex items-center hover:text-yellow-600">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>{post.comments.length} comments</span>
                      </button>
                      <button className="flex items-center hover:text-yellow-600">
                        <Share2 className="h-4 w-4 mr-1" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
                <p className="text-gray-500 mt-1">Be the first to post in this group!</p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'members' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Group Members ({groupMembers.length})</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search members..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
            
            <div className="bg-white overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {groupMembers.map(member => (
                    <tr key={member.id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src={member.avatar} alt={member.name} />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-xs text-gray-500">{(member as any).email || 'No email'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          member.id === 'user-3' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {member.id === 'user-3' ? 'Admin' : 'Member'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(member.joinDate)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-yellow-600 hover:text-yellow-900 mr-2">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                        {isGroupAdmin && member.id !== user?.id && (
                          <button className="text-red-600 hover:text-red-900">
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'events' && (
          <div className="space-y-6">
            {showCreateEvent ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Create New Event</h3>
                  <button onClick={() => setShowCreateEvent(false)} className="text-gray-400 hover:text-gray-500">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <form onSubmit={handleCreateEvent}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="event-name" className="block text-sm font-medium text-gray-700">
                        Event Name
                      </label>
                      <input
                        type="text"
                        id="event-name"
                        value={newEventName}
                        onChange={(e) => setNewEventName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="event-date" className="block text-sm font-medium text-gray-700">
                        Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        id="event-date"
                        value={newEventDate}
                        onChange={(e) => setNewEventDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="event-location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        id="event-location"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="event-description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="event-description"
                        rows={3}
                        value={newEventDescription}
                        onChange={(e) => setNewEventDescription(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        required
                      />
                    </div>
                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setShowCreateEvent(false)}
                        className="mr-3 px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
                      >
                        Create Event
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
                <button
                  onClick={() => setShowCreateEvent(true)}
                  className="px-4 py-2 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                >
                  Create Event
                </button>
              </div>
            )}

            {groupEvents.length > 0 ? (
              <div className="space-y-4">
                {groupEvents.map(event => (
                  <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="sm:flex sm:items-start sm:justify-between">
                      <div className="sm:flex sm:items-start">
                        <div className="sm:ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{event.name}</h3>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <p>
                              <time dateTime={event.date}>{formatEventDate(event.date)}</time>
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <p>{event.location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
                        <div className="flex -space-x-1 overflow-hidden mr-4">
                          {event.attendees.map((attendeeId, i) => (
                            <div key={attendeeId} className="inline-block h-6 w-6 rounded-full ring-2 ring-white">
                              <div className="h-full w-full bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600">
                                {attendeeId.charAt(0)}
                              </div>
                            </div>
                          ))}
                          <div className="h-6 w-6 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                            +{event.attendees.length}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-yellow-600 hover:bg-yellow-700"
                        >
                          RSVP
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                <h3 className="text-lg font-medium text-gray-900">No events yet</h3>
                <p className="text-gray-500 mt-1">Create the first event for this group!</p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'resources' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Group Resources</h2>
              <button
                className="px-4 py-2 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              >
                Upload Resource
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
              {groupResources.map(resource => (
                <div key={resource.id} className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    {resource.type === 'pdf' ? (
                      <div className="h-10 w-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                        <FileText className="h-5 w-5" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                        <FileSpreadsheet className="h-5 w-5" />
                      </div>
                    )}
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">{resource.name}</h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Uploaded {formatDate(resource.uploadDate)}</span>
                        <span className="mx-2">•</span>
                        <span>by Coach Mike</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href={resource.downloadUrl}
                      className="font-medium text-yellow-600 hover:text-yellow-500 flex items-center"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'settings' && isGroupAdmin && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Group Settings</h2>
              
              <form>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="group-name" className="block text-sm font-medium text-gray-700">
                      Group Name
                    </label>
                    <input
                      type="text"
                      id="group-name"
                      defaultValue={group.name}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="group-description" className="block text-sm font-medium text-gray-700">
                      Group Description
                    </label>
                    <textarea
                      id="group-description"
                      rows={3}
                      defaultValue={group.description}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Group Privacy</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <input
                          id="public"
                          name="privacy"
                          type="radio"
                          defaultChecked
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                        />
                        <label htmlFor="public" className="ml-3 block text-sm font-medium text-gray-700">
                          Public - Anyone can see and join this group
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="private"
                          name="privacy"
                          type="radio"
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                        />
                        <label htmlFor="private" className="ml-3 block text-sm font-medium text-gray-700">
                          Private - Only members can see content, approval required to join
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Danger Zone</h3>
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">Delete this group</h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>
                              This action cannot be undone. The group and all its content will be permanently deleted.
                            </p>
                          </div>
                          <div className="mt-4">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Delete Group
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="ml-3 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showComments, setShowComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [showMemberProfile, setShowMemberProfile] = useState<string | null>(null);
  const [showPostOptions, setShowPostOptions] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editPostContent, setEditPostContent] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupPrivacy, setNewGroupPrivacy] = useState('public');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = useAppStore(state => state.user);
  const posts = useAppStore(state => state.communityPosts);
  const groups = useAppStore(state => state.communityGroups);
  const members = useAppStore(state => state.communityMembers);
  const addPost = useAppStore(state => state.addCommunityPost);
  const deletePost = useAppStore(state => state.deleteCommunityPost);
  const updatePost = useAppStore(state => state.updateCommunityPost);
  const likePost = useAppStore(state => state.likeCommunityPost);
  const unlikePost = useAppStore(state => state.unlikeCommunityPost);
  const addComment = useAppStore(state => state.addCommunityComment);
  const deleteComment = useAppStore(state => state.deleteCommunityComment);
  const joinGroup = useAppStore(state => state.joinCommunityGroup);
  const leaveGroup = useAppStore(state => state.leaveCommunityGroup);
  const addGroup = useAppStore(state => state.addGroup);

  const handleViewGroup = (groupId: string) => {
    setSelectedGroup(groupId);
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
  };

  const handleGroupMembership = (groupId: string) => {
    if (!user) return;

    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    if (group.members.includes(user.id)) {
      leaveGroup(groupId, user.id);
    } else {
      joinGroup(groupId, user.id);
    }
  };

  const isUserInGroup = (groupId: string) => {
    if (!user) return false;
    const group = groups.find(g => g.id === groupId);
    return group ? group.members.includes(user.id) : false;
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();

    const newGroup = {
      id: `group-${Date.now()}`,
      name: newGroupName,
      description: newGroupDescription,
      members: [user?.id].filter(Boolean) as string[],
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    };

    addGroup(newGroup);

    setNewGroupName('');
    setNewGroupDescription('');
    setShowCreateGroup(false);
  };

  const isAdmin = user?.role === 'owner' || user?.role === 'admin';

  const filteredGroups: CommunityGroup[] = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community</h1>
          <p className="text-gray-500">Connect with other athletes and trainers</p>
        </div>
        
        {/* Admin Actions */}
        {isAdmin && (
          <div className="mt-4 md:mt-0 flex">
            <button 
              onClick={() => setShowCreateGroup(true)}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700"
            >
              <Users className="h-4 w-4 mr-2" />
              Create Group
            </button>
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Create New Group</h3>
              <button onClick={() => setShowCreateGroup(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateGroup}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="group-name" className="block text-sm font-medium text-gray-700">
                    Group Name
                  </label>
                  <input
                    type="text"
                    id="group-name"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="group-description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="group-description"
                    rows={3}
                    value={newGroupDescription}
                    onChange={(e) => setNewGroupDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Group Privacy</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        id="public"
                        name="privacy"
                        type="radio"
                        checked={newGroupPrivacy === 'public'}
                        onChange={() => setNewGroupPrivacy('public')}
                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                      />
                      <label htmlFor="public" className="ml-3 block text-sm font-medium text-gray-700">
                        Public - Anyone can see and join this group
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="private"
                        name="privacy"
                        type="radio"
                        checked={newGroupPrivacy === 'private'}
                        onChange={() => setNewGroupPrivacy('private')}
                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                      />
                      <label htmlFor="private" className="ml-3 block text-sm font-medium text-gray-700">
                        Private - Only members can see content, approval required to join
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowCreateGroup(false)}
                    className="mr-3 px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
                    disabled={!newGroupName.trim() || !newGroupDescription.trim()}
                  >
                    Create Group
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex-1 py-4 px-4 text-center font-medium ${
              activeTab === 'feed'
                ? 'text-yellow-600 border-b-2 border-yellow-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Activity Feed
            </div>
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`flex-1 py-4 px-4 text-center font-medium ${
              activeTab === 'groups'
                ? 'text-yellow-600 border-b-2 border-yellow-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center">
              <Users className="h-5 w-5 mr-2" />
              Groups
            </div>
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`flex-1 py-4 px-4 text-center font-medium ${
              activeTab === 'members'
                ? 'text-yellow-600 border-b-2 border-yellow-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center">
              <User className="h-5 w-5 mr-2" />
              Members
            </div>
          </button>
        </div>
      </div>

      {activeTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Post creation form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!user) return;

                  const newPost = {
                    id: Date.now().toString(),
                    author: {
                      id: user.id,
                      name: user.name,
                      avatar: user.avatar || '/images/avatars/default.jpg',
                    },
                    content: newPostContent,
                    images: null as any, // Use 'images' instead of 'image'
                    timestamp: new Date().toISOString(),
                    likes: [],
                    comments: [],
                  };

                  addPost(newPost);
                  setNewPostContent('');
                }}
              >
                <div className="flex">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 mr-3">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
                      placeholder="Share something with the community..."
                      rows={3}
                    />
                    <div className="flex justify-between mt-2">
                      <button
                        type="button"
                        className="px-3 py-1 text-sm text-gray-600 hover:text-yellow-600"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Add Photo
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={() => {}} // Handle file upload
                      />
                      <button
                        type="submit"
                        disabled={!newPostContent.trim()}
                        className={`px-4 py-2 rounded-md ${
                          newPostContent.trim()
                            ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Posts list */}
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Post header */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{post.author.name}</h3>
                        <p className="text-xs text-gray-500">
                          {new Date(post.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Admin post controls */}
                    {isAdmin && (
                      <div className="relative">
                        <button
                          onClick={() => setShowPostOptions(showPostOptions === post.id ? null : post.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>

                        {showPostOptions === post.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <div className="py-1">
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                onClick={() => {
                                  setEditingPost(post.id);
                                  setEditPostContent(post.content);
                                  setShowPostOptions(null);
                                }}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit post
                              </button>
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                                onClick={() => {
                                  if (window.confirm('Are you sure you want to delete this post?')) {
                                    deletePost(post.id);
                                  }
                                  setShowPostOptions(null);
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete post
                              </button>
                              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Flag as inappropriate
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Post content */}
                  {editingPost === post.id ? (
                    <div className="mb-4">
                      <textarea
                        value={editPostContent}
                        onChange={(e) => setEditPostContent(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
                        rows={3}
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded mr-2"
                          onClick={() => {
                            setEditingPost(null);
                            setEditPostContent('');
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-3 py-1 text-sm bg-yellow-600 hover:bg-yellow-700 text-white rounded"
                          onClick={() => {
                            updatePost(post.id, { content: editPostContent });
                            setEditingPost(null);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-800 mb-4">{post.content}</p>
                  )}

                  {post.images && (
                    <div className="mb-4">
                      <img
                        src={Array.isArray(post.images) ? post.images[0] : post.images}
                        alt="Post"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Post actions */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                    <button
                      className={`flex items-center ${
                        post.likes.includes(user?.id || '') ? 'text-yellow-600' : 'hover:text-yellow-600'
                      }`}
                      onClick={() => {
                        if (!user) return;
                        post.likes.includes(user.id)
                          ? unlikePost(post.id, user.id)
                          : likePost(post.id, user.id);
                      }}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{post.likes.length}</span>
                    </button>
                    <button
                      className="flex items-center hover:text-yellow-600"
                      onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>{post.comments.length} comments</span>
                    </button>
                    <button className="flex items-center hover:text-yellow-600">
                      <Share2 className="h-4 w-4 mr-1" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* Comments section */}
                {showComments === post.id && (
                  <div className="bg-gray-50 p-4 border-t border-gray-200">
                    <div className="space-y-4">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex">
                          <img
                            src={comment.author.avatar}
                            alt={comment.author.name}
                            className="h-8 w-8 rounded-full mr-3"
                          />
                          <div className="flex-1">
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                              <div className="text-sm font-medium text-gray-900">{comment.author.name}</div>
                              <p className="text-sm text-gray-800">{comment.content}</p>
                            </div>
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                              <span>{new Date(comment.timestamp).toLocaleDateString()}</span>

                              {/* Admin comment controls */}
                              {isAdmin && (
                                <button
                                  className="ml-2 text-red-500 hover:text-red-700"
                                  onClick={() => deleteComment(post.id, comment.id)}
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Add comment form */}
                      <div className="flex mt-4">
                        <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 mr-3">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex rounded-md overflow-hidden">
                            <input
                              type="text"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              className="flex-1 px-4 py-2 border-t border-b border-l border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                              placeholder="Add a comment..."
                            />
                            <button
                              disabled={!commentText.trim()}
                              onClick={() => {
                                if (!user || !commentText.trim()) return;

                                const newComment = {
                                  author: {
                                    id: user.id,
                                    name: user.name || 'Anonymous User',
                                    avatar:
                                      user.avatar ||
                                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                                  },
                                  content: commentText,
                                  timestamp: new Date().toISOString(),
                                };

                                addComment(post.id, newComment);
                                setCommentText('');
                              }}
                              className={`px-4 flex items-center justify-center ${
                                commentText.trim()
                                  ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              <Send className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Admin analytics panel */}
            {isAdmin && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-medium text-gray-900 mb-4">Admin Analytics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Members</span>
                    <span className="font-medium">{members.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Groups</span>
                    <span className="font-medium">{groups.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Posts</span>
                    <span className="font-medium">{posts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Active Users Today</span>
                    <span className="font-medium">{Math.floor(members.length * 0.6)}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">
                      View Full Dashboard
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Group Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-4">Recent Group Activity</h3>
              <div className="space-y-4">
                {groups.slice(0, 3).map((group) => (
                  <div key={group.id} className="flex items-center">
                    <div
                      className="h-10 w-10 rounded bg-cover bg-center mr-3"
                      style={{ backgroundImage: `url(${group.image})` }}
                    ></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{group.name}</h4>
                      <p className="text-xs text-gray-500">{group.members.length} members</p>
                    </div>
                    <button
                      onClick={() => handleViewGroup(group.id)}
                      className="text-xs text-yellow-600 hover:text-yellow-700"
                    >
                      View
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setActiveTab('groups')}
                  className="w-full text-center text-sm text-yellow-600 hover:text-yellow-700 pt-2"
                >
                  View All Groups
                </button>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-4">Community Guidelines</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Be respectful to other community members</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Share your progress and celebrate others</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Ask questions if you're unsure about form</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Keep discussions fitness-focused</span>
                </li>
              </ul>
              {isAdmin && (
                <button className="w-full mt-4 text-sm text-yellow-600 hover:text-yellow-700">Edit Guidelines</button>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'groups' && (
        <>
          {selectedGroup ? (
            <GroupDetailView
              groupId={selectedGroup}
              onBack={handleBackToGroups}
              user={user}
              handleGroupMembership={handleGroupMembership}
              isUserInGroup={isUserInGroup}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group) => (
                  <div key={group.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${group.image})` }}></div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{group.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{group.members.length} members</p>
                      <p className="text-sm text-gray-600 mb-4">{group.description}</p>
                      <div className="flex space-x-2">
                        {isUserInGroup(group.id) && (
                          <button
                            onClick={() => handleViewGroup(group.id)}
                            className="flex-1 py-2 rounded-md bg-yellow-600 text-white hover:bg-yellow-700"
                          >
                            View Group
                          </button>
                        )}
                        <button
                          onClick={() => handleGroupMembership(group.id)}
                          className={`${
                            isUserInGroup(group.id) ? 'flex-none' : 'flex-1'
                          } py-2 px-4 rounded-md ${
                            isUserInGroup(group.id)
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'bg-yellow-600 text-white hover:bg-yellow-700'
                          }`}
                        >
                          {isUserInGroup(group.id) ? 'Leave' : 'Join Group'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-white shadow rounded-lg p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-yellow-50 flex items-center justify-center rounded-full mb-4">
                    <Users className="h-8 w-8 text-yellow-500" />
                  </div>
                  <h2 className="text-lg font-medium mb-2">No groups found</h2>
                  <p className="text-gray-500 mb-6">Try adjusting your search or check back later.</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {activeTab === 'members' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Community Members</h2>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              {isAdmin && (
                <button className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Member
                </button>
              )}
            </div>
          </div>
          
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Groups
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                {isAdmin && (
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map(member => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={member.avatar} alt={member.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{(member as any).email || 'No email'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      member.role === 'admin' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {member.role === 'admin' ? 'Admin' : 'Member'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {groups.filter(g => g.members.includes(member.id)).length} groups
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {posts.filter(p => p.author.id === member.id).length} posts
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                        <MessageCircle className="h-4 w-4" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                        {member.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          
          {members.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No members</h3>
              <p className="mt-1 text-sm text-gray-500">No members found with the current search criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import withSubscriptionGuard from '../components/SubscriptionGuard';
export default withSubscriptionGuard(Community);