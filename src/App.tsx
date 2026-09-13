import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import { ScrollToTop } from './components/scroll-to-top/scroll-to-top';
import { AgendaPage } from './pages/AgendaPage';
import { ContactPage } from './pages/ContactPage';
import { GalleryPage } from './pages/GalleryPage';
import { GroupPage } from './pages/GroupPage';
import { HomePage } from './pages/HomePage';
import { MembersPage } from './pages/MembersPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/le-groupe" element={<GroupPage />} />
          <Route path="/membres" element={<MembersPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/galerie" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
