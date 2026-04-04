// project-imports
import BasicTabs from 'template/sections/components/basic/tabs-pills/BasicTabs';
import Pills from 'template/sections/components/basic/tabs-pills/BasicPills';
import VerticalPills from 'template/sections/components/basic/tabs-pills/VerticalPills';
import ReferenceHeader from 'template/components/ReferenceHeader';

// ==============================|| BASIC - TABS & PILLS ||============================== //

export default function TabsPillsPage() {
  return (
    <>
      <ReferenceHeader
        caption="Takes the basic nav from above and adds the .nav-tabs class to generate a tabbed interface."
        link="https://react-bootstrap.netlify.app/docs/components/navs/#tabs"
      />
      <BasicTabs />
      <Pills />
      <VerticalPills />
    </>
  );
}
