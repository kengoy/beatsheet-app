import { Dialog } from '@headlessui/react';
import { ActData } from './beatSheetData';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';

type ActEditProps = {
  onClose: () => void; // callback function to close the dialog
  onAdd: (newAct: ActData) => void; // callback function to add the new act to the beat sheet
};

// ActEdit component
function ActEdit({ onClose, onAdd }: ActEditProps) {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm();

  // callback function to add the new act to the beat sheet
  const onSubmit = (data: any) => {
    const newAct = {
      id: -1,
      name: data.name,
    };
    onAdd(newAct);
    onClose();
  };

  // callback function to close the dialog
  const handleClose = () => {
    // if user edited the beat, do not close the dialog on click outside
    if (isDirty) return;

    onClose();
  };

  return (
    <Dialog open={true} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 flex items-start justify-center bg-gray-400/90 dark:bg-gray-800/90 p-12">
        <Dialog.Panel className="w-full max-w-screen-md rounded-lg border mt-64 bg-[var(--color-gray-1)] dark:bg-[--color-gray-7] p-8">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="text-2xl font-semibold w-full placeholder:italic placeholder:text-slate-500 placeholder:font-light dark:bg-[--color-gray-7] rounded-md border dark:border-gray-600 leading-[150%] outline-none bg-transparent p-3"
              {...register('name')}
              placeholder="New Act Name"
            />
            <div className="flex justify-between text-xl gap-5 ">
              {isDirty ? (
                <span
                  className="material-symbols-outlined text-3xl text-neutral-900 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 hover:rounded-full focus-visible:ring-blue-500 focus-visible:ring-offset-2 p-1 pl-2 pr-2"
                  onClick={onClose}
                >
                  delete
                </span>
              ) : (
                <span></span>
              )}
              <Button type="submit">Add</Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ActEdit;
