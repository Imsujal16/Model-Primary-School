import { Routes, Route } from 'react-router-dom';
import {
  HomePage, AboutPage, AcademicsPage, GalleryPage,
  AdmissionsPage, ContactPage, Layout
} from './School';
import EVChatbot from './ev/EVChatbot';

// EVChatbot is mounted HERE outside Routes so it persists across all page navigations
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"           element={<HomePage />} />
          <Route path="/about"      element={<AboutPage />} />
          <Route path="/academics"  element={<AcademicsPage />} />
          <Route path="/gallery"    element={<GalleryPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/contact"    element={<ContactPage />} />
          <Route path="*"           element={<HomePage />} />
        </Route>
      </Routes>
      <EVChatbot />
    </>
  );
}

export default App;
