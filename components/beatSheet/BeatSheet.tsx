import { ActData, ActBeatsMapData } from './beatSheetData';
import { useQuery } from '@tanstack/react-query';
import { getActs } from '@/pages/api/beatsheet';
import ActList from './ActList';

type BeatSheetProps = {
  acts: ActData[]; // Acts data
  actBeatsMap: ActBeatsMapData; // Acts and Beats data map
};

// BeatSheet component
const BeatSheet = (props: BeatSheetProps) => {
  const queryActs = useQuery({
    queryKey: ['acts'],
    queryFn: getActs,
    initialData: props.acts,
  });

  // Showing Loading state
  if (queryActs.isLoading) return <h1>Loading...</h1>;

  // Error handling
  if (queryActs.isError) return <pre>{JSON.stringify(queryActs.error)}</pre>;

  return (
    <div className="w-auto bg-white dark:bg-[var(--color-gray-7)] py-8 px-6 ">
      {/* Search Feature is for a future idea to improve the UX */}
      <div className="flex items-center flex-wrap justify-between gap-3 sm:gap-5 border-b dark:border-[#6F767E] dark:border-opacity-40 pb-6 md:pb-8 mb-6 md:mb-8">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center rounded-lg overflow-hidden border border-[rgba(111, 118, 126, 0.4)] dark:border-gray-600 bg-white dark:bg-transparent px-3 py-1">
            <input
              type="text"
              className="text-xs leading-[150%] pe-2 py-2 outline-none bg-transparent dark:placeholder:text-[var(--color-gray-3)]"
              placeholder="Search"
            />
            <button type={'submit'} className="flex items-center">
              <span className="material-symbols-outlined !text-lg">search</span>
            </button>
          </div>
        </form>
      </div>

      {queryActs.isSuccess && (
        <ActList acts={queryActs.data} actBeatsMap={props.actBeatsMap} />
      )}
    </div>
  );
};

export default BeatSheet;
