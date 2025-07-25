import React, { useEffect, useState } from 'react';
import { Plus, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  updateDoc, 
  getDocs, 
  deleteDoc,
  doc,
  setDoc,
  getDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { JobDescription } from '../interface/JobDescription';
import { Recruiter } from '../interface/Recruiter';

export default function Requisitions() {
  const [requisitions, setRequisitions] = useState<JobDescription[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState<JobDescription | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [recruitersList, setRecruitersList] = useState<string[]>([]);

  const fetchRequisitions = async () => {
    const snapshot = await getDocs(collection(db, 'requisitions'));
    const data = snapshot.docs.map(doc => doc.data() as JobDescription);
    setRequisitions(data);
  };

  useEffect(() => {
    fetchRequisitions();
  }, []);

  const openModal = async (req?: JobDescription) => {
    try {
      // Fetch recruiters first
      const querySnapshot = await getDocs(collection(db, 'recruiters'));
      const recruiters = querySnapshot.docs.map(doc => doc.data().name);
      setRecruitersList(recruiters);

      // Then set the current requisition
      if (req) {
        setCurrent({ ...req });
      } else {
        setCurrent({
          id: `REQ-${Date.now()}`,
          title: '',
          department: '',
          hiringManager: '',
          recruiter: '',
          status: 'Draft',
          slaStatus: 'On Track',
          daysOpen: 0,
          candidates: 0,
          priority: 'Medium',
          createdAt: Date.now(),
        });
      }
      setFile(null);
      setIsOpen(true);
    } catch (error) {
      console.error('Error fetching recruiters:', error);
      alert('Failed to load recruiters list');
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrent(null);
    setFile(null);
  };

  const save = async () => {
    if (!current) return;

    try {
      // Validate required fields
      if (!current.title || !current.hiringManager || !current.recruiter) {
        alert("Please fill in all required fields.");
        return;
      }

      let attachmentUrl = current.attachmentUrl || '';
      let attachmentName = current.attachmentName || '';

      if (file) {
        const storageRef = ref(storage, `attachments/${current.id}/${file.name}`);
        await uploadBytes(storageRef, file);
        attachmentUrl = await getDownloadURL(storageRef);
        attachmentName = file.name;
      }

      const updated: JobDescription = {
        ...current,
        attachmentUrl,
        attachmentName,
        updatedAt: Date.now(),
        createdAt: current.createdAt || Date.now(),
      };

      // Create or update document in Firestore
      const requisitionRef = doc(db, 'requisitions', updated.id);
      await setDoc(requisitionRef, updated);

      // Update local state
      setRequisitions(prev => {
        const exists = prev.find(r => r.id === updated.id);
        if (exists) {
          return prev.map(r => (r.id === updated.id ? updated : r));
        } else {
          return [...prev, updated];
        }
      });

      closeModal();
    } catch (err) {
      console.error("Failed to save requisition:", err);
      alert("An error occurred while saving. Check the console.");
    }
  };

  const deleteRequisition = async () => {
    if (!current?.id) return;

    if (!confirm('Are you sure you want to delete this requisition?')) {
    return;
    }
    
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'requisitions', current.id));

      // Update local state
      setRequisitions(prev => prev.filter(r => r.id !== current.id));

      // Close modal
      closeModal();
    } catch (err) {
    console.error("Failed to delete requisition:", err);
    alert("An error occurred while deleting. Check the console.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrent(c => c && { ...c, [name]: e.target.type === 'number' ? Number(value) : value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const addRecruiter = async (recruiter: Omit<Recruiter, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const timestamp = Date.now();
      const docRef = await addDoc(collection(db, 'recruiters'), {
        ...recruiter,
        activeRequisitions: 0,
        createdAt: timestamp,
        updatedAt: timestamp
      });

      // Update the document with its ID
      await updateDoc(docRef, {
        id: docRef.id
      });

      return docRef.id;
    } catch (error) {
      console.error('Error adding recruiter:', error);
      throw error;
    }
  };

  const getRecruiters = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'recruiters'));
      return querySnapshot.docs.map(doc => doc.data() as Recruiter);
    } catch (error) {
      console.error('Error fetching recruiters:', error);
      throw error;
    }
  };

  const updateRecruiterRequisitions = async (recruiterId: string, change: number) => {
    try {
      const recruiterRef = doc(db, 'recruiters', recruiterId);
      const recruiterDoc = await getDoc(recruiterRef);
      
      if (recruiterDoc.exists()) {
        const currentCount = recruiterDoc.data().activeRequisitions || 0;
        await updateDoc(recruiterRef, {
          activeRequisitions: currentCount + change,
          updatedAt: Date.now()
        });
      }
    } catch (error) {
      console.error('Error updating recruiter requisitions:', error);
      throw error;
    }
  };

  const getIcon = (s: JobDescription['slaStatus']) => ({
    'On Track': <CheckCircle className="h-5 w-5 text-green-500" />,
    'At Risk': <Clock className="h-5 w-5 text-yellow-500" />,
    'Breached': <AlertCircle className="h-5 w-5 text-red-500" />
  }[s]);

  const getColor = (s: JobDescription['slaStatus']) => ({
    'On Track': 'bg-green-100 text-green-800',
    'At Risk': 'bg-yellow-100 text-yellow-800',
    'Breached': 'bg-red-100 text-red-800'
  }[s]);

  useEffect(() => {
    const initializeRecruiters = async () => {
      // Check if recruiters already exist
      const existingRecruiters = await getRecruiters();
      if (existingRecruiters.length === 0) {
        const defaultRecruiters = [
          { name: 'John Smith', email: 'john.smith@company.com', department: 'Technology' },
          { name: 'Lisa Wong', email: 'lisa.wong@company.com', department: 'Engineering' },
          { name: 'Sarah Davis', email: 'sarah.davis@company.com', department: 'Product' }
        ];

        for (const recruiter of defaultRecruiters) {
          await addRecruiter(recruiter);
        }
      }
    };

    initializeRecruiters();
  }, []); // Run once on component mount

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Requisition Management</h1>
        <button 
          onClick={() => openModal().catch(err => console.error('Error opening modal:', err))} 
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" /> Create New
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Title', 'Hiring Manager', 'Recruiter', 'SLA', 'Days', 'Candidates', 'Actions'].map(h => (
                <th key={h} className="px-6 py-3 text-xs font-medium text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requisitions.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{r.title}</td>
                <td className="px-6 py-4">{r.hiringManager}</td>
                <td className="px-6 py-4">{r.recruiter}</td>
                <td className="px-6 py-4 flex items-center">
                  {getIcon(r.slaStatus)}
                  <span className={`ml-2 text-xs px-2 py-1 rounded-full ${getColor(r.slaStatus)}`}>
                    {r.slaStatus}
                  </span>
                </td>
                <td className="px-6 py-4">{r.daysOpen}</td>
                <td className="px-6 py-4">{r.candidates}</td>
                <td className="px-6 py-4">
                  <button onClick={() => openModal(r).catch(err => console.error('Error opening modal:', err))} className="text-blue-600">View/Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold">
              {current?.id ? 'Edit Requisition' : 'Create Requisition'}
            </Dialog.Title>

            <form className="space-y-3 mt-4">
              <input
                type="text"
                name="title"
                value={current?.title || ''}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="department"
                value={current?.department || ''}
                onChange={handleChange}
                placeholder="Department"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="hiringManager"
                value={current?.hiringManager || ''}
                onChange={handleChange}
                placeholder="Hiring Manager"
                className="w-full border px-3 py-2 rounded"
              />
              
              <select
                name="recruiter"
                value={current?.recruiter || ''}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">Select a Recruiter</option>
                {recruitersList.map((recruiter) => (
                  <option key={recruiter} value={recruiter}>
                    {recruiter}
                  </option>
                ))}
              </select>

              <select name="status" value={current?.status} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                {['Draft', 'Published', 'Idle', 'Active'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <select name="slaStatus" value={current?.slaStatus} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                {['On Track', 'At Risk', 'Breached'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <select name="priority" value={current?.priority} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                {['Low', 'Medium', 'High'].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              <input
                type="number"
                name="daysOpen"
                value={current?.daysOpen || 0}
                onChange={handleChange}
                placeholder="Days Open"
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="number"
                name="candidates"
                value={current?.candidates || 0}
                onChange={handleChange}
                placeholder="Number of Candidates"
                className="w-full border px-3 py-2 rounded"
              />

              <input type="file" onChange={handleFileChange} className="w-full" />
            </form>

            <div className = "mt-4 flex justify-end space-x-2">
              <button onClick={deleteRequisition} className='px-4 py-2 bg-red-600 text-white rounded'
              > Delete </button>

              <button  onClick={closeModal} className='px-4 py-2 bg-grey-600 border rounded'> Cancel</button>
              <button  onClick={save} className='px-4 py-2 bg-blue-600 text-white rounded'>Save</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
