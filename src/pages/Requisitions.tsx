// import React, { useState } from 'react';
// import { Plus, Clock, AlertCircle, CheckCircle, Trash } from 'lucide-react';
// import { Dialog } from '@headlessui/react';

// interface Requisition {
//   id: string;
//   title: string;
//   department: string;
//   hiringManager: string;
//   recruiter: string;
//   status: 'Active' | 'Paused';
//   slaStatus: 'On Track' | 'At Risk' | 'Breach';
//   daysOpen: number;
//   candidates: number;
//   priority: 'Low' | 'Medium' | 'High';
// }

// const initialRequisitions: Requisition[] = [
//   {
//     id: 'REQ-001',
//     title: 'Senior React Developer',
//     department: 'Engineering',
//     hiringManager: 'Sarah Johnson',
//     recruiter: 'John Smith',
//     status: 'Active',
//     slaStatus: 'On Track',
//     daysOpen: 12,
//     candidates: 8,
//     priority: 'High'
//   },
//   {
//     id: 'REQ-002',
//     title: 'DevOps Engineer',
//     department: 'Engineering',
//     hiringManager: 'Michael Chen',
//     recruiter: 'Lisa Wong',
//     status: 'Active',
//     slaStatus: 'At Risk',
//     daysOpen: 18,
//     candidates: 5,
//     priority: 'Medium'
//   },
//   {
//     id: 'REQ-003',
//     title: 'Product Manager',
//     department: 'Product',
//     hiringManager: 'Emily Rodriguez',
//     recruiter: 'John Smith',
//     status: 'Paused',
//     slaStatus: 'Breach',
//     daysOpen: 25,
//     candidates: 12,
//     priority: 'High'
//   }
// ];

// export default function Requisitions() {
//   const [requisitions, setRequisitions] = useState<Requisition[]>(initialRequisitions);
//   const [isOpen, setIsOpen] = useState(false);
//   const [current, setCurrent] = useState<Requisition | null>(null);

//   const emptyTemplate: Omit<Requisition, 'id'> = {
//     title: '',
//     department: '',
//     hiringManager: '',
//     recruiter: '',
//     status: 'Active',
//     slaStatus: 'On Track',
//     daysOpen: 0,
//     candidates: 0,
//     priority: 'Medium'
//   };

//   const openModal = (req?: Requisition) => {
//     if (req) {
//       setCurrent({ ...req });
//     } else {
//       setCurrent({ id: `REQ-${Date.now()}`, ...emptyTemplate });
//     }
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     setCurrent(null);
//   };

//   const save = () => {
//     if (!current) return;
//     setRequisitions(prev => {
//       const exists = prev.some(r => r.id === current.id);
//       return exists
//         ? prev.map(r => r.id === current.id ? current : r)
//         : [...prev, current];
//     });
//     closeModal();
//   };

//   const del = () => {
//     if (!current) return;
//     setRequisitions(prev => prev.filter(r => r.id !== current.id));
//     closeModal();
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setCurrent(c => c && { ...c, [e.target.name]: e.target.value });
//   };

//   const getIcon = (s: Requisition['slaStatus']) => ({
//     'On Track': <CheckCircle className="h-5 w-5 text-green-500" />,
//     'At Risk': <Clock className="h-5 w-5 text-yellow-500" />,
//     'Breach': <AlertCircle className="h-5 w-5 text-red-500" />
//   }[s] || <Clock className="h-5 w-5 text-gray-500" />);

//   const getColor = (s: Requisition['slaStatus']) => ({
//     'On Track': 'bg-green-100 text-green-800',
//     'At Risk': 'bg-yellow-100 text-yellow-800',
//     'Breach': 'bg-red-100 text-red-800'
//   }[s] || 'bg-gray-100 text-gray-800');

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-900">Requisition Management</h1>
//         <button
//           onClick={() => openModal()}
//           className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           <Plus className="h-4 w-4 mr-2" /> Create New
//         </button>
//       </div>

//       {/* Summary Cards (omitted for brevity) */}
//       {/* Requisitions Table */}
//       <div className="bg-white rounded-lg shadow">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h3 className="text-lg font-medium text-gray-900">Open Requisitions</h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {['Requisition','Hiring Manager','Recruiter','SLA Status','Days Open','Candidates','Actions'].map(h => (
//                   <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {requisitions.map(r => (
//                 <tr key={r.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div>
//                       <div className="text-sm font-medium">{r.title}</div>
//                       <div className="text-sm text-gray-500">{r.id} • {r.department}</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">{r.hiringManager}</td>
//                   <td className="px-6 py-4">{r.recruiter}</td>
//                   <td className="px-6 py-4 flex items-center">
//                     {getIcon(r.slaStatus)}
//                     <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${getColor(r.slaStatus)}`}>
//                       {r.slaStatus}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">{r.daysOpen}</td>
//                   <td className="px-6 py-4">{r.candidates}</td>
//                   <td className="px-6 py-4">
//                     <button onClick={() => openModal(r)} className="text-blue-600 mr-2">View/Edit</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal */}
//       <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
//         {/* Overlay */}
//         <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

//         {/* Dialog container */}
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel className="mx-auto w-full max-w-md rounded bg-white p-6">
//             <Dialog.Title className="text-lg font-medium">Your title</Dialog.Title>
//             <Dialog.Description className="text-sm text-gray-500">
//               Description here
//             </Dialog.Description>
//             {/* Content and buttons */}
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// }



//SECOND VERSION

import React, { useEffect, useState } from 'react';
import { Plus, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { JobDescription } from '../interface/JobDescription';

export default function Requisitions() {
  const [requisitions, setRequisitions] = useState<JobDescription[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState<JobDescription | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const fetchRequisitions = async () => {
    const snapshot = await getDocs(collection(db, 'requisitions'));
    const data = snapshot.docs.map(doc => doc.data() as JobDescription);
    setRequisitions(data);
  };

  useEffect(() => {
    fetchRequisitions();
  }, []);

  const openModal = (req?: JobDescription) => {
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
      if (!current.title || !current.hiringManager || !current.recruiter || !current.id) {
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
        createdAt: current.createdAt || Date.now(),
      };

      await setDoc(doc(db, 'requisitions', updated.id), updated);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Requisition Management</h1>
        <button onClick={() => openModal()} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
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
                  <button onClick={() => openModal(r)} className="text-blue-600">View/Edit</button>
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
              <input
                type="text"
                name="recruiter"
                value={current?.recruiter || ''}
                onChange={handleChange}
                placeholder="Recruiter"
                className="w-full border px-3 py-2 rounded"
              />

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

            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={closeModal} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
