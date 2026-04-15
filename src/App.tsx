import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BlogList from './pages/BlogList';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BlogList />} />
          <Route path=":slug" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

