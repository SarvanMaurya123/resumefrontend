import { useState, useEffect } from 'react';
import './App.css';
import './Navbar.css';
import './Loadar.css'; // Ensure the CSS file is named correctly
import 'aos/dist/aos.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RoutersPage from './assets/Component/Router';
import { AuthProvider } from './assets/ContaxtApi/Context'; // Corrected path

import 'react-toastify/dist/ReactToastify.css';
import ScrollToTopButton from './assets/Component/Scrolle'; // Corrected path
import Loader from './Loder';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthProvider>
      <RoutersPage />

      <ScrollToTopButton />
    </AuthProvider>
  );
}

export default App;
