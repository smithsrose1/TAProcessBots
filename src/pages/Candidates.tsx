// import React, { useState } from 'react';
// import { User, Clock, Filter, Search } from 'lucide-react';
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   useDroppable,
//   DragEndEvent,
// } from '@dnd-kit/core';
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
// import {
//   useSortable,
// } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// const candidateStages = [
//   { id: 'application', title: 'Application Review', color: 'bg-blue-100 text-blue-800' },
//   { id: 'phone', title: 'Phone Screen', color: 'bg-purple-100 text-purple-800' },
//   { id: 'technical', title: 'Technical Interview', color: 'bg-yellow-100 text-yellow-800' },
//   { id: 'final', title: 'Final Interview', color: 'bg-green-100 text-green-800' },
//   { id: 'offer', title: 'Offer Stage', color: 'bg-red-100 text-red-800' },
// ];

// interface Candidate {
//   id: number;
//   name: string;
//   role: string;
//   stage: string;
//   recruiter: string;
//   daysInStage: number;
//   avatar: string;
// }

// const initialCandidates: Candidate[] = [
//   {
//     id: 1,
//     name: 'Sarah Johnson',
//     role: 'Senior React Developer',
//     stage: 'application',
//     recruiter: 'John Smith',
//     daysInStage: 2,
//     avatar: 'SJ'
//   },
//   {
//     id: 2,
//     name: 'Michael Chen',
//     role: 'DevOps Engineer',
//     stage: 'phone',
//     recruiter: 'Lisa Wong',
//     daysInStage: 1,
//     avatar: 'MC'
//   },
//   {
//     id: 3,
//     name: 'Emily Rodriguez',
//     role: 'Product Manager',
//     stage: 'technical',
//     recruiter: 'John Smith',
//     daysInStage: 4,
//     avatar: 'ER'
//   },
//   {
//     id: 4,
//     name: 'David Kim',
//     role: 'Senior React Developer',
//     stage: 'final',
//     recruiter: 'Sarah Davis',
//     daysInStage: 2,
//     avatar: 'DK'
//   },
//   {
//     id: 5,
//     name: 'Anna Thompson',
//     role: 'UX Designer',
//     stage: 'offer',
//     recruiter: 'Mike Johnson',
//     daysInStage: 1,
//     avatar: 'AT'
//   },
//   {
//     id: 6,
//     name: 'James Wilson',
//     role: 'Senior React Developer',
//     stage: 'application',
//     recruiter: 'John Smith',
//     daysInStage: 5,
//     avatar: 'JW'
//   }
// ];

// interface SortableCandidateProps {
//   candidate: Candidate;
// }

// function SortableCandidate({ candidate }: SortableCandidateProps) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: candidate.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.5 : 1,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
//     >
//       <div className="flex items-start justify-between">
//         <div className="flex items-center">
//           <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
//             <span className="text-white text-sm font-medium">{candidate.avatar}</span>
//           </div>
//           <div className="ml-3">
//             <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
//             <p className="text-xs text-gray-500">{candidate.role}</p>
//           </div>
//         </div>
//         {candidate.daysInStage > 3 && (
//           <div className="flex items-center text-red-500">
//             <Clock className="h-4 w-4" />
//           </div>
//         )}
//       </div>
//       <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
//         <span>Recruiter: {candidate.recruiter}</span>
//         <span className={`px-2 py-1 rounded-full ${candidate.daysInStage > 3 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
//           {candidate.daysInStage} days
//         </span>
//       </div>
//     </div>
//   );
// }

// interface DroppableStageProps {
//   stage: typeof candidateStages[0];
//   candidates: Candidate[];
// }

// function DroppableStage({ stage, candidates }: DroppableStageProps) {
//   const { setNodeRef, isOver } = useDroppable({ id: stage.id });

//   return (
//     <div
//       ref={setNodeRef}
//       className={`flex-shrink-0 w-80 ${isOver ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}`}
//     >
//       <div className="bg-white rounded-lg shadow">
//         <div className="px-4 py-3 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-medium text-gray-900">{stage.title}</h3>
//             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stage.color}`}>
//               {candidates.length}
//             </span>
//           </div>
//         </div>
//         <div className="p-4 space-y-3 max-h-96 overflow-y-auto min-h-[200px]">
//           <SortableContext items={candidates.map(c => c.id)} strategy={verticalListSortingStrategy}>
//             {candidates.map((candidate) => (
//               <SortableCandidate key={candidate.id} candidate={candidate} />
//             ))}
//           </SortableContext>
//           {candidates.length === 0 && (
//             <div className="text-center py-8 text-gray-500">
//               <User className="mx-auto h-12 w-12 text-gray-300" />
//               <p className="mt-2 text-sm">No candidates in this stage</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// const Candidates = () => {
//   const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const getCandidatesByStage = (stageId: string) => {
//     return candidates.filter(candidate => candidate.stage === stageId);
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;

//     if (!over || active.id === over.id) return;

//     const candidateId = active.id as number;
//     const newStageId = over.id as string;

//     const draggedCandidate = candidates.find(c => c.id === candidateId);
//     if (!draggedCandidate) return;

//     // Only update if the new stage is different
//     if (draggedCandidate.stage !== newStageId) {
//       setCandidates(prev =>
//         prev.map(c =>
//           c.id === candidateId ? { ...c, stage: newStageId, daysInStage: 0 } : c
//         )
//       );
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-900">Candidate Pipeline</h1>
//         <div className="flex space-x-3">
//           <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
//             <Filter className="h-4 w-4 mr-2" />
//             Filter
//           </button>
//           <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
//             <Search className="h-4 w-4 mr-2" />
//             Search
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow p-4">
//         <div className="flex flex-wrap gap-4">
//           <select className="rounded-md border-gray-300 text-sm">
//             <option>All Job Roles</option>
//             <option>Senior React Developer</option>
//             <option>DevOps Engineer</option>
//             <option>Product Manager</option>
//             <option>UX Designer</option>
//           </select>
//           <select className="rounded-md border-gray-300 text-sm">
//             <option>All Recruiters</option>
//             <option>John Smith</option>
//             <option>Lisa Wong</option>
//             <option>Sarah Davis</option>
//             <option>Mike Johnson</option>
//           </select>
//           <select className="rounded-md border-gray-300 text-sm">
//             <option>All Status</option>
//             <option>On Track</option>
//             <option>At Risk</option>
//             <option>Delayed</option>
//           </select>
//         </div>
//       </div>

//       <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <div className="flex space-x-6 overflow-x-auto pb-4">
//           {candidateStages.map(stage => (
//             <DroppableStage
//               key={stage.id}
//               stage={stage}
//               candidates={getCandidatesByStage(stage.id)}
//             />
//           ))}
//         </div>
//       </DndContext>
//     </div>
//   );
// };

// export default Candidates;

//VERSION 2 WITH MESSY CSS


import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { db } from '../firebase.ts';
import {
  collection, query, onSnapshot,
  addDoc, doc, updateDoc, serverTimestamp
} from 'firebase/firestore';
import { Candidate, CandidateStage } from '../interface/Candidate';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

// Set app element for accessibility
Modal.setAppElement('#root'); // Make sure your app root has id="root"

const candidateStages: CandidateStage[] = [
  'Application Review',
  'Phone',
  'Technical',
  'Final',
  'Offer',
];

interface DroppableStageProps {
  stage: CandidateStage;
  candidates: Candidate[];
  onCandidateClick: (candidate: Candidate) => void;
}
function daysSince(dateString: string): number {
  if (!dateString) return 0;
  const enteredDate = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - enteredDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function DroppableStage({ stage, candidates, onCandidateClick }: DroppableStageProps) {
  return (
    <Droppable droppableId={stage}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`rounded-xl bg-white shadow-md border border-gray-200 flex flex-col max-h-[75vh] overflow-hidden ${
            snapshot.isDraggingOver ? 'ring-2 ring-blue-400' : ''
          }`}
        >
          <div className="bg-gray-100 px-4 py-3 border-b text-gray-800 font-semibold flex justify-between items-center">
            <span>{stage}</span>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{candidates.length}</span>
          </div>
          <div className="p-3 space-y-3 overflow-y-auto">
            {candidates.map((candidate, index) => {
              const days = daysSince(candidate.stageEnteredAt);
              let colorClass = 'bg-green-200 text-green-800'; // default green
              if (days >= 4) {
                colorClass = 'bg-red-200 text-red-800';
              } else if (days >= 2) {
                colorClass = 'bg-yellow-200 text-yellow-800';
              }
              return (
                <Draggable
                  key={candidate.id}
                  draggableId={candidate.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => onCandidateClick(candidate)}
                      className={`p-3 rounded-lg border bg-white shadow-sm hover:shadow-md cursor-pointer transition ${
                        snapshot.isDragging ? 'bg-blue-50' : ''
                      } flex justify-between items-center`}
                    >
                      <div>
                        <p className="font-semibold text-gray-800">{candidate.name}</p>
                        <p className="text-sm text-gray-500">{candidate.email}</p>
                      </div>
                      <div
                        className={`ml-4 px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}
                        title={`${days} day${days !== 1 ? 's' : ''} in stage`}
                      >
                        {days}d
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}


const modalStyles = {
  content: {
    maxWidth: '600px',
    width: '50vw',   // half of viewport width
    margin: 'auto',
    inset: '50% auto auto 50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
};

const Candidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [form, setForm] = useState({
    id: '', // for edit mode, store candidate id here
    name: '',
    email: '',
    phone: '',
    resumeUrl: '',
    jobId: '',
    hiringManagerId: '',
    currentStage: 'Application Review' as CandidateStage,
  });

  useEffect(() => {
    const q = query(collection(db, 'candidates'));
    const unsub = onSnapshot(q, snap => {
      setCandidates(snap.docs.map(d => {
        const data = d.data() as any;
        return {
          id: d.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          resumeUrl: data.resumeUrl,
          jobId: data.jobId,
          hiringManagerId: data.hiringManagerId,
          currentStage: data.currentStage as CandidateStage,
          stageEnteredAt: data.stageEnteredAt,
          pipelineStartedAt: data.pipelineStartedAt,
          feedback: data.feedback || [],
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        } as Candidate;
      }));
    });
    return unsub;
  }, []);

  const handleDragEnd = async (result: DropResult) => {
    const { draggableId, destination } = result;

    if (!destination) return; // dropped outside any droppable

    const newStage = destination.droppableId as CandidateStage;
    const candId = draggableId;

    const cand = candidates.find(c => c.id === candId);
    if (!cand || cand.currentStage === newStage) return;

    await updateDoc(doc(db, 'candidates', candId), {
      currentStage: newStage,
      stageEnteredAt: new Date().toISOString(),
      updatedAt: serverTimestamp(),
    });
  };

  // Open the add candidate modal for new candidate
  const openAddModal = () => {
    setIsEditMode(false);
    setForm({
      id: '',
      name: '',
      email: '',
      phone: '',
      resumeUrl: '',
      jobId: '',
      hiringManagerId: '',
      currentStage: 'Application Review',
    });
    setShowAddEditModal(true);
  };

  // Open details modal when clicking a candidate
  const openDetailsModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowDetailsModal(true);
  };

  // Close details modal
  const closeDetailsModal = () => {
    setSelectedCandidate(null);
    setShowDetailsModal(false);
  };

  // Open edit modal from details modal
  const openEditModal = () => {
    if (!selectedCandidate) return;

    setIsEditMode(true);
    setForm({
      id: selectedCandidate.id,
      name: selectedCandidate.name,
      email: selectedCandidate.email,
      phone: selectedCandidate.phone,
      resumeUrl: selectedCandidate.resumeUrl,
      jobId: selectedCandidate.jobId,
      hiringManagerId: selectedCandidate.hiringManagerId,
      currentStage: selectedCandidate.currentStage,
    });
    setShowAddEditModal(true);
    setShowDetailsModal(false);
  };

  const closeAddEditModal = () => {
    setShowAddEditModal(false);
  };

  // Save new or updated candidate
  const handleSave = async () => {
    const timestamp = new Date().toISOString();

    if (isEditMode && form.id) {
      // Update existing candidate
      await updateDoc(doc(db, 'candidates', form.id), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        resumeUrl: form.resumeUrl,
        jobId: form.jobId,
        hiringManagerId: form.hiringManagerId,
        currentStage: form.currentStage,
        updatedAt: timestamp,
      });
    } else {
      // Add new candidate
      await addDoc(collection(db, 'candidates'), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        resumeUrl: form.resumeUrl,
        jobId: form.jobId,
        hiringManagerId: form.hiringManagerId,
        currentStage: form.currentStage,
        stageEnteredAt: timestamp,
        pipelineStartedAt: timestamp,
        feedback: [],
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    }

    closeAddEditModal();

    // Reset form after save
    setForm({
      id: '',
      name: '',
      email: '',
      phone: '',
      resumeUrl: '',
      jobId: '',
      hiringManagerId: '',
      currentStage: 'Application Review',
    });
  };

  return (
    <div>
      {/* Header and Add button aligned horizontally */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Candidate Pipeline
      </h1>
      <button
        onClick={openAddModal}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        + Add Candidate
      </button>
    </div>
      {/* Add / Edit Modal */}
      <Modal
        isOpen={showAddEditModal}
        onRequestClose={closeAddEditModal}
        contentLabel={isEditMode ? "Edit Candidate" : "Add Candidate"}
        style={modalStyles}
      >
        <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit Candidate' : 'Add Candidate'}</h2>
        {['name', 'email', 'phone', 'resumeUrl', 'jobId', 'hiringManagerId'].map(field => (
          <input
            key={field}
            placeholder={field}
            value={(form as any)[field]}
            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
            className="border px-2 py-1 block my-2 w-full"
          />
        ))}
        <select
          value={form.currentStage}
          onChange={e =>
            setForm(f => ({ ...f, currentStage: e.target.value as CandidateStage }))
          }
          className="border px-2 py-1 block my-2 w-full"
        >
          {candidateStages.map(stage => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={closeAddEditModal}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </Modal>

      {/* Candidate Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onRequestClose={closeDetailsModal}
        contentLabel="Candidate Details"
        style={modalStyles}
      >
        {selectedCandidate && (
          <>
            <h2 className="text-xl font-semibold mb-4">Candidate Details</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {selectedCandidate.name}</p>
              <p><strong>Email:</strong> {selectedCandidate.email}</p>
              <p><strong>Phone:</strong> {selectedCandidate.phone}</p>
              <p><strong>Resume URL:</strong> {selectedCandidate.resumeUrl}</p>
              <p><strong>Job ID:</strong> {selectedCandidate.jobId}</p>
              <p><strong>Hiring Manager ID:</strong> {selectedCandidate.hiringManagerId}</p>
              <p><strong>Current Stage:</strong> {selectedCandidate.currentStage}</p>
              <p><strong>Stage Entered At:</strong> {selectedCandidate.stageEnteredAt}</p>
              <p><strong>Pipeline Started At:</strong> {selectedCandidate.pipelineStartedAt}</p>
              {/* Add more details if needed */}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={closeDetailsModal}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Close
              </button>
              <button
                onClick={openEditModal}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
            </div>
          </>
        )}
      </Modal>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-5 gap-4 mt-6">
          {candidateStages.map(stage => (
            <DroppableStage
              key={stage}
              stage={stage}
              candidates={candidates.filter(c => c.currentStage === stage)}
              onCandidateClick={openDetailsModal}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Candidates;
