import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ActData, ActBeatsMapData, BeatData } from './beatSheetData';
import Act from './Act';
import ActEdit from './ActEdit';
import { addActs } from '@/pages/api/beatsheet';

type ActListProps = {
  acts: ActData[]; // Acts data
  actBeatsMap: ActBeatsMapData; // Acts and Beats data map
};

// ActList component
function ActList(props: ActListProps) {
  const [addMode, setAddMode] = useState(false);
  const [collapsed, setCollapsed] = useState(
    Array(props.acts.length).fill(true)
  );

  // Add Acts mutation
  const queryClient = useQueryClient();
  const mutationAdd = useMutation({
    mutationFn: (act: ActData) => addActs(act),
    onSuccess: () => {
      queryClient.invalidateQueries(['acts']);
    },
    onError: () => {
      console.error('Failed to add a new act!');
    },
  });

  // Toggle a specific act component to collapse or expand
  function toggleCollapse(index: number) {
    const newCollapsed = [...collapsed];
    newCollapsed[index] = !newCollapsed[index];
    setCollapsed(newCollapsed);
  }

  // Toggle all act component to collapse or expand
  function toggleCollapseAll() {
    const newCollapsed = [...collapsed];
    const allCollapsed = newCollapsed.every((c) => c);
    setCollapsed(newCollapsed.fill(!allCollapsed));
  }

  // Close Add Dialog handler
  const closeAddMode = () => {
    setAddMode(false);
  };

  // Add Act handler
  const handleAddAct = (newAct: ActData) => {
    mutationAdd.mutate(newAct);
  };

  return (
    <>
      <div className="grid grid-cols-4 items-center justify-between max-w-auto mb-5 ml-5 mr-5">
        {['Act', 'Time Range', 'Beats', '', ''].map((itm, i, arr) => (
          <div
            key={i}
            className="flex items-center justify-start leading-[150%] text-black dark:text-white font-normal whitespace-nowrap gap-1"
          >
            {itm}
            {i === arr.length - 2 && (
              <div className="min-w-[120px] whitespace-nowrap text-sm leading-[150%]">
                <button
                  type={'button'}
                  className="flex items-center gap-2 text-sm font-bold leading-[150%] "
                  onClick={toggleCollapseAll}
                >
                  Details
                  <motion.span
                    className="material-symbols-outlined !text-lg "
                    animate={{
                      rotate: collapsed[i] ? 0 : 180,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    expand_more
                  </motion.span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        {props.acts.map((act: ActData, i: number) => (
          <Act
            key={act.id}
            act={act}
            collapsed={collapsed[i]}
            index={i + 1}
            toggleCollapse={() => toggleCollapse(i)}
            initialBeatsData={props.actBeatsMap[act.id]}
          />
        ))}
        <div
          className="flex flex-col justify-center items-center gap-1 w-full h-16 bg-white dark:bg-[var(--color-gray-6)] shadow-[0px_1px_2px_rgba(0,0,0,0.2)] mt-4 rounded-lg px-5 hover:outline hover:outline-1 hover:outline-[var(--color-primary)] hover:dark:outline-[var(--color-primary-dark)]"
          onClick={() => setAddMode(true)}
        >
          <div>
            <span className="flex h-full justify-center items-center material-symbols-outlined text-4xl font-light text-neutral-900 dark:text-white">
              add_circle
            </span>{' '}
          </div>
          <div className="text-xs">Add Act</div>
        </div>
      </div>
      {addMode && <ActEdit onClose={closeAddMode} onAdd={handleAddAct} />}
    </>
  );
}

export default ActList;
