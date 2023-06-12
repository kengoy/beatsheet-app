import { BeatData } from './beatSheetData';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';

type BeatEditProps = {
  beat: BeatData; // Beat data
  isOpen: boolean; // Is the dialog open
  onClose: () => void; // callback function to close the dialog
  onSave?: (updatedBeat: BeatData) => void; // callback function to save the beat
  onAdd?: (newBeat: BeatData) => void; // callback function to add a new beat
  onDelete: () => void; // callback function to delete the beat
};

// BeatEdit component
function BeatEdit({
  beat,
  isOpen,
  onClose,
  onSave,
  onAdd,
  onDelete,
}: BeatEditProps) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const isNewBeatCreation = beat.id === -1;

  // Form validation using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      name: beat.name,
      startMin: beat.time.split('-')[0].split(':')[0],
      startSec: beat.time.split('-')[0].split(':')[1],
      endMin: beat.time.split('-')[1].split(':')[0],
      endSec: beat.time.split('-')[1].split(':')[1],
      description: beat.content,
      cameraAngle: beat.cameraAngle,
      notes: beat.notes,
    },
  });

  // Callback function to save the beat
  const onSubmit = (data: any) => {
    const updatedBeat = {
      ...beat,
      name: data.name,
      time: `${data.startMin}:${data.startSec}-${data.endMin}:${data.endSec}`,
      content: data.description,
      cameraAngle: data.cameraAngle,
      notes: data.notes,
    };
    if (isNewBeatCreation) {
      if (onAdd) onAdd(updatedBeat);
    } else {
      if (onSave) onSave(updatedBeat);
    }
    onClose();
  };

  // Callback function to close the dialog
  const handleClose = () => {
    // if user edited the beat, do not close the dialog on click outside
    if (isDirty) return;

    onClose();
  };

  // Callback function to delete the beat
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  // Delete confirmation dialog
  const confirmDeleteDialog = (
    <Dialog
      open={isOpen}
      onClose={() => setDeleteConfirmation(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center bg-gray-400/90 dark:bg-gray-800/90 p-12">
        <Dialog.Panel className="w-full max-w-screen-md h-64 flex flex-col gap-12 justify-center items-center rounded-lg item-centers border bg-[var(--color-gray-1)] dark:bg-[--color-gray-7] p-8">
          <div>
            <p className="text-2xl text-center">
              {' '}
              Are you sure to delete this beat?
            </p>
          </div>
          <div className="flex justify-center gap-20">
            <Button onClick={() => setDeleteConfirmation(false)}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center overflow-auto bg-gray-400/90 dark:bg-gray-800/90 p-12">
        <Dialog.Panel className="w-full max-w-screen-md rounded-lg border bg-[var(--color-gray-1)] dark:bg-[--color-gray-7] p-8">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="text-2xl font-semibold w-full placeholder:italic placeholder:text-slate-500 placeholder:font-light dark:bg-[--color-gray-7] rounded-md border dark:border-gray-600 leading-[150%] outline-none bg-transparent p-3"
              {...register('name')}
              placeholder="New Beat Name"
            />
            <div className="flex text-xl gap-5">
              <span className="material-symbols-outlined text-neutral-900 dark:text-white">
                schedule
              </span>{' '}
              <input
                type="number"
                className="w-20 dark:bg-[--color-gray-7] rounded-md border dark:border-gray-600 leading-[150%] outline-none bg-transparent dark:placeholder:text-[var(--color-gray-3)] p-3"
                {...register('startMin')}
                min="0"
                max="999"
              />
              :
              <input
                type="number"
                className="w-20 dark:bg-[--color-gray-7] rounded-md border dark:border-gray-600 leading-[150%] outline-none bg-transparent dark:placeholder:text-[var(--color-gray-3)] p-3"
                {...register('startSec')}
                min="0"
                max="59"
              />
              -
              <input
                type="number"
                className="w-20 dark:bg-[--color-gray-7] rounded-md border dark:border-gray-600 leading-[150%] outline-none bg-transparent dark:placeholder:text-[var(--color-gray-3)] p-3"
                {...register('endMin')}
                min="0"
                max="999"
              />
              :
              <input
                type="number"
                className="w-20 dark:bg-[--color-gray-7] rounded-md border dark:border-gray-600 leading-[150%] outline-none bg-transparent dark:placeholder:text-[var(--color-gray-3)] p-3"
                {...register('endSec')}
                min="0"
                max="59"
              />
            </div>
            <div className="flex gap-5">
              <span className="material-symbols-outlined text-neutral-900 dark:text-white">
                description
              </span>{' '}
              <textarea
                className="w-full h-64 placeholder:italic placeholder:text-slate-500 placeholder:font-light dark:bg-[--color-gray-7] rounded-md border dark:border-gray-600 leading-[150%] outline-none bg-transparent p-3"
                {...register('description')}
                defaultValue={beat.content}
                placeholder="Describe the scene..."
              />
            </div>
            <div className="flex gap-5">
              <span className="material-symbols-outlined text-neutral-900 dark:text-white">
                videocam
              </span>{' '}
              <input
                className="w-full placeholder:italic placeholder:text-slate-500 placeholder:font-light dark:bg-[--color-gray-7] rounded-md border dark:border-gray-600 leading-[150%] outline-none bg-transparent p-3"
                {...register('cameraAngle')}
                placeholder='e.g. "Low angle shot"'
              />
            </div>
            <div className="flex gap-5">
              <span className="material-symbols-outlined text-neutral-900 dark:text-white">
                notes
              </span>{' '}
              <input
                className="w-full placeholder:italic placeholder:text-slate-500 dark:bg-[--color-gray-7] rounded-md border dark:border-gray-600 leading-[150%] outline-none bg-transparent p-3"
                {...register('notes')}
                placeholder="notes for the editor"
              />
            </div>
            <div className="mt-6 flex justify-between">
              <div className="ml-8 flex">
                <button
                  type="button"
                  onClick={() => {
                    if (isNewBeatCreation && !isDirty) onClose();
                    setDeleteConfirmation(true);
                  }}
                >
                  <span className="material-symbols-outlined text-3xl text-neutral-900 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 hover:rounded-full focus-visible:ring-blue-500 focus-visible:ring-offset-2 p-1 pl-2 pr-2">
                    delete
                  </span>{' '}
                </button>
              </div>
              <Button type="submit">
                {isNewBeatCreation ? 'Add' : 'Save'}
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
      {deleteConfirmation && confirmDeleteDialog}
    </Dialog>
  );
}

export default BeatEdit;
