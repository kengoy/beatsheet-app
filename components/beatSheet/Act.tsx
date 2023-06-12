import React, { MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { ActData, BeatData } from './beatSheetData';
import BeatList from './BeatList';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteActs, getBeats } from '@/pages/api/beatsheet';

type ActProps = {
  act: ActData; // Act data
  index: number; // Act index
  collapsed: boolean; // Act collapse state
  toggleCollapse: () => void; // Act collapse toggle handler
  initialBeatsData: BeatData[]; // Initial beats data
};

// Act component
function Act(props: ActProps) {
  const queryBeats = useQuery({
    queryKey: ['beats', props.act.id.toString()],
    queryFn: getBeats,
    initialData: props.initialBeatsData,
  });

  // Delete mutation
  const queryClient = useQueryClient();
  const mutationDelete = useMutation({
    mutationFn: (actId: number) => deleteActs(actId),
    onSuccess: () => {
      queryClient.invalidateQueries(['acts']);
    },
    onError: () => {
      console.error('Failed to delete an act!');
    },
  });

  // Delete button handler
  const handleDeleteButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutationDelete.mutate(props.act.id);
  };

  // Showing Loading state
  if (queryBeats.isLoading) return <h1>Loading...</h1>;

  // Error handling
  if (queryBeats.isError) return <pre>{JSON.stringify(queryBeats.error)}</pre>;

  // Calculate time range of the act from the beats
  const beats = queryBeats.data;
  let timeRange = '';
  if (beats.length > 0) {
    timeRange =
      beats[0].time.split('-')[0] +
      '-' +
      beats[beats.length - 1].time.split('-')[1];
  }

  return (
    <div className="relative bg-white dark:bg-[var(--color-gray-6)] shadow-[0px_1px_2px_rgba(0,0,0,0.2)] mt-4 rounded-lg px-5 hover:outline hover:outline-1 hover:outline-[var(--color-primary)] hover:dark:outline-[var(--color-primary-dark)]">
      <div
        className={`grid grid-cols-4 justify-between text-base gap-5 py-2 md:py-3 cursor-pointer ${
          props.collapsed ? 'shadow-[0px_1px_0px_rgba(0,0,0,0.2)] mb-3' : ''
        }`}
        onClick={() => props.toggleCollapse()}
      >
        <div className="min-w-[120px] whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-2">
              <p className="leading-[150%] text-[var(--color-gray-5)] dark:text-[var(--color-gray-3)]">
                {props.index}. {props.act.name}
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-[120px] whitespace-nowrap">
          <p className="leading-[150%] text-[var(--color-gray-5)] dark:text-[var(--color-gray-3)]">
            {timeRange}
          </p>
        </div>
        <div className="min-w-[120px] whitespace-nowrap leading-[150%]">
          <p className="leading-[150%] text-[var(--color-gray-5)] dark:text-[var(--color-gray-3)]">
            {beats.length}
          </p>
        </div>
        <div className="min-w-[120px] whitespace-nowrap leading-[150%]">
          <button
            type={'button'}
            className="flex items-center gap-2 font-bold leading-[150%] text-[var(--color-primary) dark:text-[var(--color-primary-dark)]"
          >
            Details
            <motion.span
              className="material-symbols-outlined !text-lg !text-[var(--color-primary) dark:!text-[var(--color-primary-dark)]"
              animate={{
                rotate: props.collapsed ? 0 : 180,
              }}
              transition={{ duration: 0.2 }}
            >
              expand_more
            </motion.span>
          </button>
        </div>
        <div>
          {beats.length === 0 && (
            <span
              className="absolute top-3 right-5 material-symbols-outlined text-xl text-neutral-900 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 hover:rounded-full focus-visible:ring-blue-500 focus-visible:ring-offset-2 p-1 pl-2 pr-2"
              onClick={handleDeleteButton}
            >
              delete
            </span>
          )}
        </div>
      </div>

      <motion.div
        className="flex items-center justify-between gap-6 overflow-hidden mb-3 overflow-x-auto "
        animate={{ height: props.collapsed ? 0 : 'auto' }}
        transition={{ duration: 0.5 }}
      >
        <BeatList actId={props.act.id} beats={beats} />
      </motion.div>
    </div>
  );
}

export default Act;
