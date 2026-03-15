import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UploadPolicy from "./pages/UploadPolicy";
import RuleViewer from "./pages/RuleViewer";
import ViolationsMonitor from "./pages/ViolationsMonitor";
import ConflictDetector from "./pages/ConflictDetector";
import Reports from "./pages/Reports";

const App = () => {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="h-full"
        >
          <Routes location={location}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<UploadPolicy />} />
            <Route path="/rules" element={<RuleViewer />} />
            <Route path="/violations" element={<ViolationsMonitor />} />
            <Route path="/conflicts" element={<ConflictDetector />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default App;

