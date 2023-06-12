import { BeatData } from './beatSheetData';
import Beat from './Beat';

type BeatListProps = {
  actId: number; // Act ID
  beats: BeatData[]; // Beats data
};

// BeatList component
const BeatList = ({ actId, beats }: BeatListProps) => {
  return (
    <>
      <div className="flex flex-1 gap-5 ">
        {beats.map((beat) => (
          <Beat key={beat.id} actId={actId} beat={beat} />
        ))}
        {/* Add Beat Icon */}
        <Beat actId={actId} />
      </div>
    </>
  );
};

export default BeatList;
