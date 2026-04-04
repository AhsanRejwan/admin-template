import { Outlet } from 'react-router-dom';

// project-imports
import Drawer from './Drawer';
import Footer from './Footer';
import Header from './Header';
import Breadcrumbs from 'template/components/Breadcrumbs';
import NavigationScroll from 'template/components/NavigationScroll';

// ==============================|| MAIN LAYOUT ||============================== //

export default function MainLayout() {
  return (
    <>
      <Drawer />
      <Header />
      <div className="pc-container">
        <div className="pc-content">
          <Breadcrumbs />
          <NavigationScroll>
            <Outlet />
          </NavigationScroll>
        </div>
      </div>
      <Footer />
    </>
  );
}
