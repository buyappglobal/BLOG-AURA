import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BlogList from './pages/BlogList';
import PostPage from './pages/PostPage';
import LandingPage from './pages/LandingPage';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BlogList />} />
          <Route path="soluciones-marketing-sensorial" element={<LandingPage />} />
          <Route path=":slug" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

