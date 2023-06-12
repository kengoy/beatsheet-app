import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex items-center justify-between gap-2 px-2 sm:px-6 m-[34px_0_12px] sm:m-[24px_0_24px]">
      <p className="text-[var(--color-gray-5)] dark:text-white">
        © 2023 Spotter, Inc. · <Link href="/">Terms</Link> ·{' '}
        <Link href="/">Sitemap</Link> · <Link href="/">Privacy</Link>
      </p>
    </footer>
  );
};

export default Footer;
