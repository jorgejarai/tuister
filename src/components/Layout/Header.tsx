import User from './User';

const Header = () => (
  <header className="p-4 flex items-center justify-between">
    <div className="text-2xl">🐦</div>
    <User />
  </header>
);

export default Header;
