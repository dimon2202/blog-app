import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { PostPage } from "./pages/PostPage";
import { PostFormPage } from "./pages/PostFormPage";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-zinc-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/create" element={<PostFormPage />} />
            <Route path="/edit/:id" element={<PostFormPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
