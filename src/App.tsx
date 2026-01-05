import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ChiSiamo from './pages/ChiSiamo';
import Vendita from './pages/Vendita';
import Noleggio from './pages/Noleggio';
import Ricambi from './pages/Ricambi';
import News from './pages/News';
import Payment from './pages/Payment';
import Checkout from './pages/Checkout';
import Contatti from './pages/Contatti';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'chi-siamo':
        return <ChiSiamo />;
      case 'vendita':
        return <Vendita onNavigate={handleNavigate} />;
      case 'noleggio':
        return <Noleggio />;
      case 'ricambi':
        return <Ricambi />;
      case 'news':
        return <News />;
      case 'contatti':
        return <Contatti />;
      case 'payment':
        return <Payment onNavigate={handleNavigate} />;
      case 'checkout':
        return <Checkout onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7F6]">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
