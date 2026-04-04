import PropTypes from 'prop-types';
import { useState } from 'react';

// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

// project imports
import NavItem from './NavItem';
import NavGroup from './NavGroup';
import menuItems from 'template/menu-items';

// ==============================|| DRAWER CONTENT ||============================== //

type NavigationProps = {
  selectedItems?: any;
  setSelectedItems?: ((value: any) => void) | any;
  setSelectTab?: ((value: any) => void) | any;
};

export default function Navigation({ selectedItems, setSelectedItems, setSelectTab }: NavigationProps) {
  const items = (menuItems.items as any[]) ?? [];
  const [selectedID, setSelectedID] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(0);

  const navGroups = items.map((item) => {
    switch (item.type) {
      case 'group':
        if (item.url) {
          return (
            <ListGroup.Item key={item.id}>
              <NavItem item={item} level={1} isParents />
            </ListGroup.Item>
          );
        }

        return (
          <NavGroup
            key={item.id}
            setSelectedID={setSelectedID}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedID={selectedID}
            selectedItems={selectedItems}
            item={item}
            setSelectTab={setSelectTab ?? (() => {})}
          />
        );
    }

    return (
      <h6 key={item.id} className="text-danger align-items-center">
        Fix - Navigation Group
      </h6>
    );
  });

  return <ul className="pc-navbar">{navGroups}</ul>;
}

Navigation.propTypes = {
  selectedItems: PropTypes.any,
  setSelectedItems: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  setSelectTab: PropTypes.oneOfType([PropTypes.func, PropTypes.any])
};
