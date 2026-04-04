import { Fragment, useCallback, useEffect, useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

// project-imports
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';

// ==============================|| NAVIGATION - GROUP ||============================== //

type NavGroupProps = {
  item: any;
  selectedID?: string;
  setSelectedID?: (value: string) => void;
  setSelectedItems?: (value: any) => void;
  selectedItems?: any;
  setSelectedLevel?: (value: number) => void;
  selectedLevel?: number;
  setSelectTab?: (value: any) => void;
};

export default function NavGroup(props: NavGroupProps) {
  const { item, setSelectedID, setSelectedItems, selectedItems, setSelectedLevel, selectedLevel } = props;

  const { pathname } = useLocation();
  const currentItem = item;

  //  Helper: Recursively check if route matches
  const findMatchingChild = useCallback(
    (children: any[], parentId: string) => {
      children.forEach((child) => {
        if (child.children?.length) findMatchingChild(child.children, parentId);
        const path = child.link || child.url;
        if (path && matchPath({ path, end: true }, pathname)) {
          setSelectedID?.(parentId);
        }
      });
    },
    [pathname, setSelectedID]
  );

  //  On-load selection
  useEffect(() => {
    const children = currentItem.children ?? [];
    children.forEach((child) => {
      if (child.children?.length) findMatchingChild(child.children, currentItem.id);
      const path = child.link || child.url;
      if (path && matchPath({ path, end: true }, pathname)) {
        setSelectedID?.(currentItem.id);
      }
    });
  }, [pathname, currentItem, findMatchingChild, setSelectedID]);

  //  Memoized children render
  const navCollapse = useMemo(() => {
    if (!currentItem.children) return null;

    return currentItem.children.map((menuItem, index) => {
      const key = menuItem.id || `${menuItem.type}-${index}`;

      switch (menuItem.type) {
        case 'collapse':
          return (
            <NavCollapse
              key={key}
              menu={menuItem}
              setSelectedItems={setSelectedItems}
              setSelectedLevel={setSelectedLevel}
              selectedLevel={selectedLevel}
              selectedItems={selectedItems}
              level={1}
              parentId={currentItem.id}
            />
          );
        case 'item':
          return <NavItem key={key} item={menuItem} level={1} />;
        default:
          return (
            <h6 key={`fix-${index}`} className="align-center text-danger">
              Fix - Group Collapse or Items
            </h6>
          );
      }
    });
  }, [currentItem, selectedItems, selectedLevel, setSelectedItems, setSelectedLevel]);

  return (
    <Fragment>
      <li className="pc-item pc-caption" key={item.id}>
        <label>{item.title}</label>
      </li>
      {navCollapse}
    </Fragment>
  );
}
