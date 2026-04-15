import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BlogList from './pages/BlogList';
import PostPage from './pages/PostPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BlogList />} />
          <Route path=":slug" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

