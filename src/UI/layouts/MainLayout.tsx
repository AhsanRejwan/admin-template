import { Fragment, Suspense } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

import Loader from '@ui/Loader';
import logo from '@assets/images/placeholder-image.svg';
import '@assets/styles/MainLayout.css';

interface SidebarItem {
  label: string;
  to: string;
}

interface SidebarGroup {
  groupLabel: string;
  items: SidebarItem[];
}

interface MainLayoutProps {
  sidebarGroups: SidebarGroup[];
}

const MainLayout = ({ sidebarGroups }: MainLayoutProps) => (
  <div className="main-layout">
    <nav className="main-sidebar">
      <div className="main-sidebar-header">
        <Link to="/" className="main-sidebar-brand">
          <img src={logo} alt="CoPerform logo" className="main-sidebar-brand-logo" />
          <span className="main-sidebar-brand-title">Coperform</span>
        </Link>
      </div>
      <div className="main-sidebar-content">
        <ul className="main-sidebar-nav">
          {sidebarGroups.map((group) => (
            <Fragment key={group.groupLabel}>
              <li className="main-sidebar-caption">{group.groupLabel}</li>
              {group.items.map((item) => (
                <li key={item.to} className="main-sidebar-item">
                  <NavLink
                    to={item.to}
                    end
                    className={({ isActive }) => `main-sidebar-link${isActive ? ' active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </Fragment>
          ))}
        </ul>
      </div>
    </nav>
    <div className="main-topbar" />
    <main className="main-content">
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  </div>
);

export default MainLayout;
