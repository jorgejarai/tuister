import Footer from './Footer';
import Header from './Header';

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <main className="w-screen h-screen flex justify-center">
      <div className="w-full h-full flex flex-col">
        <Header />
        {children}
      </div>
    </main>
  );
};

export default Layout;
