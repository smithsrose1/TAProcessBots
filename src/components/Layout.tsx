// src/components/ui/Layout.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  User,
  ChevronDown,
  X,
} from 'lucide-react';
import { cn } from '../lib/utils';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc as firestoreDoc,
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { signOut } from 'firebase/auth';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Requisitions', href: '/requisitions', icon: FileText },
  { name: 'Candidates', href: '/candidates', icon: Users },
  { name: 'Interviews', href: '/interviews', icon: Calendar },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Notifications
  const [notifOpen, setNotifOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const notifRef = useRef<HTMLDivElement>(null);

  // Logout dropdown
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Inline logout banner
  const [showLogoutBanner, setShowLogoutBanner] = useState(false);

  // User profile modal
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Recruiters state
  const [recruiters, setRecruiters] = useState<string[]>([]);
  const [newRecruiter, setNewRecruiter] = useState('');
  const [selectedRecruiter, setSelectedRecruiter] = useState('John Smith');
  const [selectedRecruiterToDelete, setSelectedRecruiterToDelete] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Click‑outside handlers
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Fetch recruiters once
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const snap = await getDocs(collection(db, 'recruiters'));
        setRecruiters(snap.docs.map(d => d.data().name as string));
      } catch {
        alert('Failed to load recruiters');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const addNewRecruiter = async () => {
    const name = newRecruiter.trim();
    if (!name || recruiters.includes(name)) {
      if (name) alert('This recruiter already exists');
      return;
    }
    try {
      const docRef = await addDoc(collection(db, 'recruiters'), {
        name,
        email: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setRecruiters(r => [...r, name]);
      setNewRecruiter('');
      console.log('Added recruiter', docRef.id);
    } catch {
      alert('Failed to add recruiter');
    }
  };

  const deleteRecruiter = async () => {
    if (!selectedRecruiterToDelete) return;
    try {
      const snap = await getDocs(collection(db, 'recruiters'));
      const found = snap.docs.find(d => d.data().name === selectedRecruiterToDelete);
      if (found) {
        await deleteDoc(firestoreDoc(db, 'recruiters', found.id));
        setRecruiters(r => r.filter(n => n !== selectedRecruiterToDelete));
        setSelectedRecruiterToDelete('');
      }
    } catch {
      alert('Failed to delete recruiter');
    }
  };

  const notifications = [
    { id: 1, text: 'New candidate applied' },
    { id: 2, text: 'Interview scheduled' },
    { id: 3, text: 'JD clarity alert' },
  ];

  // Logout click
  const onLogout = async () => {
    try {
      await signOut(auth);
      setProfileOpen(false);
      setShowLogoutBanner(true);
    } catch {
      console.error('Logout failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
          <div className="flex items-center px-4">
            <h1 className="text-xl font-bold text-gray-900">Talent Acquisition Tool</h1>
          </div>
          {/* User-role button */}
          <div className="mt-8 px-4">
            <button
              onClick={() => setIsUserModalOpen(true)}
              className="w-full bg-blue-50 rounded-lg p-3 hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center">
                <User className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">John Miller</p>
                  <p className="text-xs text-gray-500">Hiring Manager</p>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
              </div>
            </button>
          </div>
          {/* Navigation */}
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigationItems.map(item => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    active
                      ? 'bg-blue-100 border-r-2 border-blue-500 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )}
                >
                  <item.icon
                    className={cn(
                      active ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 h-5 w-5 flex-shrink-0'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900">Real-Time TA Process Bots</h2>

              {/* Right controls */}
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => {
                      setNotifOpen(o => !o);
                      setHasUnread(false);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <Bell className="h-6 w-6" />
                    {hasUnread && (
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                    )}
                  </button>
                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-50">
                      {notifications.map(n => (
                        <div key={n.id} className="px-4 py-2 hover:bg-gray-50">
                          {n.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Profile → Logout */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(o => !o)}
                    className="flex items-center space-x-1 p-2"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">JS</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        profileOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Logout dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                      <button
                        onClick={onLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}

                  {/* Inline banner */}
                  {showLogoutBanner && (
                    <div className="absolute right-0 mt-2 w-48 bg-green-50 border border-green-200 rounded p-3 shadow-md z-50">
                      <p className="text-green-800 text-sm mb-2">
                        You've Successfully Logged Out.
                      </p>
                      <button
                        onClick={() => {
                          setShowLogoutBanner(false);
                          navigate('/');
                        }}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Return to Home
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-7xl mx-auto p-4">{children}</div>
        </main>
      </div>

      {/* User Profile Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">User Profile</h2>
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              {/* Avatar + Name */}
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-medium">JM</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">John Miller</h3>
                  <p className="text-gray-500">Hiring Manager</p>
                </div>
              </div>

              {/* Department */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Department</h4>
                <p>Human Resources</p>
              </div>

              {/* Email */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Email</h4>
                <p>john.miller@company.com</p>
              </div>

              {/* View/Modify Recruiters */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  View/Modify Recruiters
                </h4>
                {isLoading ? (
                  <div className="text-center py-2">Loading recruiters...</div>
                ) : (
                  <>
                    <select
                      value={selectedRecruiter}
                      onChange={e => setSelectedRecruiter(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="">Select a recruiter</option>
                      {recruiters.map((r, i) => (
                        <option key={i} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>

                    <div className="mt-4 flex space-x-2 items-center">
                      <input
                        type="text"
                        value={newRecruiter}
                        onChange={e => setNewRecruiter(e.target.value)}
                        placeholder="New recruiter name"
                        className="flex-1 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                      />
                      <button
                        onClick={addNewRecruiter}
                        className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Add
                      </button>
                    </div>

                    <div className="mt-4 flex space-x-2 items-center">
                      <select
                        value={selectedRecruiterToDelete}
                        onChange={e => setSelectedRecruiterToDelete(e.target.value)}
                        className="flex-1 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                      >
                        <option value="">Select recruiter to delete</option>
                        {recruiters.map((r, i) => (
                          <option key={i} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={deleteRecruiter}
                        disabled={!selectedRecruiterToDelete}
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Close */}
              <div className="border-t pt-4">
                <button
                  onClick={() => setIsUserModalOpen(false)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
