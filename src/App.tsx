import { Routes, Route, Navigate } from 'react-router-dom';
import Home    from './layout/Home';
import UserDashboardTable from './pages/user-dashboard-table';
import Profiles from './pages/Profiles';
import Roles from './pages/Roles';
import Organisations from './pages/Organisations';
import Plans from './pages/Plans';
import Groups from './pages/Groups';
import Employees from './pages/Employees';
import Notifications from './pages/Notifications';
import Newsletter from './pages/Newsletter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAnsConditions';
import CodeOfConduct from './pages/CodeOfConduct';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="dashboard"   element={<UserDashboardTable />} />
        <Route path="profiles" element={<Profiles />} />
        <Route path="roles" element={<Roles />} />
        <Route path="organisations" element={<Organisations />} />
        <Route path="plans" element={<Plans />} />
        <Route path="groups" element={<Groups />} />
        <Route path="employees" element={<Employees />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="newsletter" element={<Newsletter />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="code-of-conduct" element={<CodeOfConduct />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
