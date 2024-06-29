import Layout from '../components/Layout';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Feed from '../components/Feed';

const Home = () => {
  return (
    <Layout>
      <LeftSidebar />
      <Feed />
      <RightSidebar />
    </Layout>
  );
};

export default Home;
