import PropTypes from 'prop-types';

// project-imports
import SimpleBarScroll from 'components/third-party/SimpleBar';
import Navigation from '../DrawerContent';

type VerticalDrawerContentProps = {
  selectedItems?: any;
  setSelectedItems?: ((value: any) => void) | any;
};

export default function VerticalDrawerContent({ selectedItems, setSelectedItems }: VerticalDrawerContentProps) {
  return (
    <SimpleBarScroll style={{ height: 'calc(100vh - 74px)' }}>
      <Navigation selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
    </SimpleBarScroll>
  );
}

VerticalDrawerContent.propTypes = { selectedItems: PropTypes.any, setSelectedItems: PropTypes.oneOfType([PropTypes.func, PropTypes.any]) };
