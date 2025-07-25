// src/components/ui/Layout.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  X 
} from 'lucide-react';
import { cn } from '../lib/utils';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
 
const navigationItems = [
  { name: 'Dashboard',    href: '/',               icon: LayoutDashboard },
  { name: 'Requisitions', href: '/requisitions',   icon: FileText },
  { name: 'Candidates',   href: '/candidates',     icon: Users },
  { name: 'Interviews',   href: '/interviews',     icon: Calendar },
  { name: 'Reports',      href: '/reports',        icon: BarChart3 },
  { name: 'Settings',     href: '/settings',       icon: Settings },
];
 
interface LayoutProps {
  children: React.ReactNode;
}
 
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [recruiters, setRecruiters] = useState<string[]>([]);
  const [newRecruiter, setNewRecruiter] = useState('');
  const [selectedRecruiter, setSelectedRecruiter] = useState('John Smith');
  const [selectedRecruiterToDelete, setSelectedRecruiterToDelete] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close notification dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch recruiters from Firestore
  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, 'recruiters'));
        const recruitersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name
        }));
        setRecruiters(recruitersList.map(r => r.name));
      } catch (error) {
        console.error('Error fetching recruiters:', error);
        alert('Failed to load recruiters');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecruiters();
  }, []);

  const addNewRecruiter = async () => {
    if (!newRecruiter.trim()) return;
    
    try {
      // Check if recruiter already exists
      if (recruiters.includes(newRecruiter)) {
        alert('This recruiter already exists');
        return;
      }

      // Add to Firebase
      const docRef = await addDoc(collection(db, 'recruiters'), {
        name: newRecruiter,
        email: '', // You can add more fields as needed
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // Update local state
      setRecruiters(prev => [...prev, newRecruiter]);
      setNewRecruiter(''); // Clear input
      
      console.log('Recruiter added successfully with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding recruiter:', error);
      alert('Failed to add recruiter');
    }
  };

  const deleteRecruiter = async () => {
    if (!selectedRecruiterToDelete) return;

    try {
      // Query to find the document with this recruiter name
      const querySnapshot = await getDocs(collection(db, 'recruiters'));
      const recruiterDoc = querySnapshot.docs.find(
        doc => doc.data().name === selectedRecruiterToDelete
      );

      if (recruiterDoc) {
        await deleteDoc(doc(db, 'recruiters', recruiterDoc.id));
      }

      // Update local state
      setRecruiters(prev => prev.filter(name => name !== selectedRecruiterToDelete));
      setSelectedRecruiterToDelete(''); // Reset selection
    } catch (error) {
      console.error('Error deleting recruiter:', error);
      alert('Failed to delete recruiter');
    }
  };

  const notifications = [
    { id: 1, text: 'New candidate applied' },
    { id: 2, text: 'Interview scheduled' },
    { id: 3, text: 'JD clarity alert' },
  ];
 
  return (
<div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-900">Talent Acquisition Tool</h1>
          </div>

          {/* User Role Panel */}
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

          {/* Navigation Links */}
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigationItems.map(item => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      isActive
                        ? 'bg-blue-100 border-r-2 border-blue-500 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors'
                    )}
                  >
                    <item.icon
                      className={cn(
                        isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-5 w-5'
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
<div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Page Title */}
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
                Real-Time TA Process Bots
              </h2>

              {/* Right-side Controls */}
              <div className="flex items-center space-x-4">
                {/* Notification Bell */}
<div className="relative">
<button
                    onClick={() => {
                      setNotifOpen(o => !o);
                      if (hasUnread) setHasUnread(false);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                    aria-expanded={notifOpen}
                    aria-label="Notifications"
>
<Bell className="h-6 w-6" />
                    {hasUnread && (
<span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                    )}
</button>
 
                  {notifOpen && (
<div
                      className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-50"
                      role="menu"
                      aria-label="Notification list"
>
<ul className="divide-y divide-gray-100">
                        {notifications.map(n => (
                          <li key={n.id} className="px-4 py-2 hover:bg-gray-50" role="menuitem">
                            {n.text}
</li>
                        ))}
</ul>
</div>
                  )}
</div>
 
                {/* User Avatar */}
<div className="flex items-center space-x-2">
<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
<span className="text-white text-sm font-medium">JS</span>
</div>
</div>
</div>
</div>
</div>
</header>
 
        {/* Page Content */}
<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
</div>
</main>
</div>

      {/* User Modal */}
{isUserModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
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
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-medium">JM</span>
          </div>
          <div>
            <h3 className="text-lg font-medium">John Miller</h3>
            <p className="text-gray-500">Hiring Manager</p>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Department</h4>
          <p>Human Resources</p>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Email</h4>
          <p>john.miller@company.com</p>
        </div>
        
        {/* Replace the existing Recruiters dropdown section */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">View/Modify Recruiters</h4>
          
          {isLoading ? (
            <div className="text-center py-2">Loading recruiters...</div>
          ) : (
            <>
              {/* Dropdown */}
              <select
                value={selectedRecruiter}
                onChange={(e) => setSelectedRecruiter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Select a recruiter</option>
                {recruiters.map((recruiter, index) => (
                  <option key={index} value={recruiter}>{recruiter}</option>
                ))}
              </select>

              {/* New Recruiter Input and Delete Recruiter Dropdown */}
              <div className="mt-4 flex space-x-2 items-center">
                {/* Add New Recruiter Input */}
                <input
                  type="text"
                  value={newRecruiter}
                  onChange={(e) => setNewRecruiter(e.target.value)}
                  placeholder="New recruiter name"
                  className="flex-1 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                />
                <button
                  onClick={addNewRecruiter}
                  className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Delete Recruiter Dropdown and Button */}
              <div className="mt-4 flex space-x-2 items-center">
                <select
                  value={selectedRecruiterToDelete}
                  onChange={(e) => setSelectedRecruiterToDelete(e.target.value)}
                  className="flex-1 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                >
                  <option value="">Select recruiter to delete</option>
                  {recruiters.map((recruiter, index) => (
                    <option key={index} value={recruiter}>{recruiter}</option>
                  ))}
                </select>
                <button
                  onClick={deleteRecruiter}
                  disabled={!selectedRecruiterToDelete}
                  className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>

        <div className="border-t pt-4">
          <button 
            onClick={() => setIsUserModalOpen(false)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
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