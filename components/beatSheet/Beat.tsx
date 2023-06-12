import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BeatData } from './beatSheetData';
import BeatEdit from './BeatEdit';
import { addBeat, deleteBeat, putBeat } from '@/pages/api/beatsheet';

type BeatProps = {
  actId: number;
  beat?: BeatData;
};

// Beat component
function Beat({ actId, beat }: BeatProps) {
  const [editMode, setEditMode] = useState(false);

  // Edit Beat mutation
  const queryClient = useQueryClient();
  const mutationEdit = useMutation({
    mutationFn: (beat: BeatData) => putBeat(beat),
    onSuccess: () => {
      queryClient.invalidateQueries(['beats']);
    },
    onError: () => {
      console.error('Failed to save beat!');
    },
  });

  // Add Beat mutation
  const mutationAdd = useMutation({
    mutationFn: (beat: BeatData) => addBeat(actId, beat),
    onSuccess: () => {
      queryClient.invalidateQueries(['beats']);
    },
    onError: () => {
      console.error('Failed to add a new beat!');
    },
  });

  // Delete Beat mutation
  const mutationDelete = useMutation({
    mutationFn: ({ actId, beatId }: { actId: number; beatId: number }) =>
      deleteBeat(actId, beatId),
    onSuccess: () => {
      queryClient.invalidateQueries(['beats']);
    },
    onError: () => {
      console.error('Failed to delete a new beat!');
    },
  });

  // Close Edit Dialog handler
  const closeEditMode = () => {
    setEditMode(false);
  };

  // Save Beat callback function
  const onSave = (updatedBeat: BeatData) => {
    mutationEdit.mutate(updatedBeat);
  };

  // Add Beat callback function
  const onAdd = (newBeat: BeatData) => {
    delete newBeat.id;
    mutationAdd.mutate(newBeat);
  };

  // Delete Beat callback function
  const onDelete = () => {
    if (beat && beat.id) mutationDelete.mutate({ actId, beatId: beat.id });
  };

  let renderedBeat = beat;
  let beatEl;
  if (renderedBeat) {
    // Render Beat component for existing beat
    beatEl = (
      <div
        className="flex flex-col gap-3 text-base bg-[var(--color-gray-2)] dark:bg-[var(--color-gray-5)] w-64 max-h-96 rounded-lg p-4 overflow-y-auto mb-5 box-content hover:border hover:border-1 hover:border-[var( --color-dark)] dark:hover:border-[var( --color-dark) cursor-pointer"
        onClick={() => setEditMode(true)}
      >
        <div className="text-ml font-semibold mb-2">{renderedBeat.name}</div>
        <div className="flex gap-3">
          <span className="material-symbols-outlined !text-lg text-neutral-900 dark:text-white">
            schedule
          </span>{' '}
          {renderedBeat.time}
        </div>
        <div className="flex gap-3">
          <span className="material-symbols-outlined !text-lg text-neutral-900 dark:text-white">
            description
          </span>{' '}
          {renderedBeat.content}
        </div>
        <div className="flex gap-3">
          <span className="material-symbols-outlined !text-lg text-neutral-900 dark:text-white">
            videocam
          </span>{' '}
          {renderedBeat.cameraAngle}
        </div>
        <div className="flex gap-3">
          <span className="material-symbols-outlined !text-lg text-neutral-900 dark:text-white">
            notes
          </span>{' '}
          {renderedBeat.notes}
        </div>
      </div>
    );
  } else {
    // Create a new Beat
    renderedBeat = {
      id: -1,
      name: '',
      time: '00:00-00:00',
      content: '',
      cameraAngle: '',
      notes: '',
    };

    beatEl = (
      <div
        className="flex flex-col justify-center items-center gap-3 bg-[var(--color-gray-2)] dark:bg-[var(--color-gray-5)] w-64 max-h-96 rounded-lg p-4 overflow-y-auto mb-5 box-content hover:border hover:border-1 hover:border-[var( --color-dark)] dark:hover:border-[var( --color-dark) cursor-pointer"
        onClick={() => setEditMode(true)}
      >
        <div>
          <span className="flex h-full justify-center items-center material-symbols-outlined text-5xl font-light text-neutral-900 dark:text-white">
            add_circle
          </span>
        </div>
        <div className="text-xs">Add Beat</div>
      </div>
    );
  }

  return (
    <>
      {beatEl}
      {editMode && (
        <BeatEdit
          beat={renderedBeat}
          isOpen={editMode}
          onClose={closeEditMode}
          onSave={onSave}
          onAdd={onAdd}
          onDelete={onDelete}
        />
      )}
    </>
  );
}

export default Beat;
