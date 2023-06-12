import Image from 'next/image';
import Link from 'next/link';
import avatar_photo from '/public/images/avatar_photo.webp';

type NavbarProps = {
  openSidBar: boolean;
  isOpen?: boolean;
  setIsOpen: (a: boolean) => void;
  setOpenSidBar: (a: boolean) => void;
};

const NavBar = ({
  isOpen,
  setIsOpen,
  setOpenSidBar,
  openSidBar,
}: NavbarProps) => {
  return (
    <nav className="sticky top-0 left-0 z-50 px-2 lg:px-10 shadow-[0px_1px_2px_rgba(0,0,0,0.2)] py-3 md:py-[19px] bg-white dark:bg-[var(--color-gray-7)]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex lg:hidden items-center gap-4">
            <button type={'button'} onClick={() => setOpenSidBar(!openSidBar)}>
              <span className="material-symbols-outlined text-3xl">
                menu_open
              </span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <Link
            href="/profile"
            className="hidden sm:flex items-center gap-3 px-3 bg-[var(--color-gray-3)] dark:bg-[var(--color-gray-5)] rounded-lg cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image src={avatar_photo} alt="avt" className="w-full" />
            </div>
            <div className="flex flex-col ">
              <h6 className="text-base font-bold">Renata Luna</h6>
              <div className="flex items-center gap-1 text-[#6F767E]">
                <small>Team Buffalo</small>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-3 md:gap-6">
            <button
              type={'button'}
              className="flex items-center justify-center text-lg leading-[150%] text-white dark:text-[#171717] bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] px-3 py-1 rounded-lg"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
