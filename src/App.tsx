import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import AIEmailAutomation from './forms/AIEmailAutomation';
import LeadGenerationSystems from './forms/LeadGenerationSystems';
import AIChatbots from './forms/AIChatbots';
import SocialMediaAutomation from './forms/SocialMediaAutomation';
import AutomationWorkflows from './forms/AutomationWorkflows';
import CustomAIDevelopment from './forms/CustomAIDevelopment';
import AIVoiceReceptionist from './forms/AIVoiceReceptionist';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full flex-grow"
    >
      {children}
    </motion.div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:id" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/services/ai-email-automation" element={<PageTransition><AIEmailAutomation /></PageTransition>} />
        <Route path="/services/leadgen" element={<PageTransition><LeadGenerationSystems /></PageTransition>} />
        <Route path="/services/chatbots" element={<PageTransition><AIChatbots /></PageTransition>} />
        <Route path="/services/social-media" element={<PageTransition><SocialMediaAutomation /></PageTransition>} />
        <Route path="/services/workflows" element={<PageTransition><AutomationWorkflows /></PageTransition>} />
        <Route path="/services/custom" element={<PageTransition><CustomAIDevelopment /></PageTransition>} />
        <Route path="/services/ai-voice-receptionist" element={<PageTransition><AIVoiceReceptionist /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen selection:bg-accent-blue/30 bg-brand-bg text-brand-text">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-grow flex flex-col">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
