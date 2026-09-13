import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import './layout.css';

export function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__main" id="contenu">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
