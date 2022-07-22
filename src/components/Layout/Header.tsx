import Link from 'next/link';

import User from './User';

const Header = () => (
  <header className="p-4 flex items-center justify-between">
    <Link href="/">
      <a>
        <div className="text-2xl">🐦</div>
      </a>
    </Link>
    <User />
  </header>
);

export default Header;
