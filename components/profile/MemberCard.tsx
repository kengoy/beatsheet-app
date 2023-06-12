import Image, { StaticImageData } from 'next/image';
import verify from '/public/images/icon/verify.png';
import Button from '../common/Button';

type PropeType = {
  data: {
    id: number | string;
    role: string;
    name: string;
    img: StaticImageData;
    avt: StaticImageData;
  };
};

const MemberCard = ({ data }: PropeType) => {
  const { id, role, name, img, avt } = data;

  return (
    <div className="bg-white dark:bg-[var(--color-gray-6)] rounded-lg p-3">
      <div className="rounded-lg relative">
        <div>
          <Image
            src={img}
            alt="nft_1"
            className="w-full rounded-lg hover:scale-95 transition-all duration-500 ease-out"
          />
        </div>
        <div className="absolute right-5 -bottom-5 w-10 h-10 border-2 border-[var(--color-gray-5)] rounded-lg overflow-hidden">
          <Image src={avt} alt="user_1" className="flex-shrink-0" />
        </div>
      </div>
      <div className="mt-7">
        <p className="flex items-center gap-3 text-base leading-[150%] text-[var(--color-gray-4)] dark:text-[var(--color-gray-3)]">
          {role}
          <Image src={verify} alt="verify" />
        </p>
        <div>
          <h6 className="font-bold text-[var(--color-gray-6)] dark:text-white mt-3">
            {name}
          </h6>
        </div>
      </div>
      <div className="flex items-center justify-end mt-7">
        <Button>Chat</Button>
      </div>
    </div>
  );
};

export default MemberCard;
