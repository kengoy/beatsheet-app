import BeatSheet from './BeatSheet';
import { ActData, ActBeatsMapData } from './beatSheetData';

export type BeatSheetMainProps = {
  acts: ActData[]; // Acts data
  actBeatsMap: ActBeatsMapData; // Acts and Beats data map
};

// BeatSheetMain is the main component for the Beat Sheet page.
function BeatSheetMain(props: BeatSheetMainProps) {
  return (
    <div className="w-full">
      <BeatSheet acts={props.acts} actBeatsMap={props.actBeatsMap} />
    </div>
  );
}

export default BeatSheetMain;
