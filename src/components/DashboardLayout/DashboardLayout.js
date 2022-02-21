import { Layout, Menu} from 'antd';
import { UploadOutlined,ReadOutlined} from '@ant-design/icons';
import { ReadOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import Classes from  './DashboardLayout.module.css'
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const DashBoardLayout = (props) =>{
    return(
        <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            // console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type);
          }}
        >
          <div className={Classes.logo} >SHEIKHA ACADEMY</div>
          <Menu
          mode="inline"
          defaultSelectedKeys={props.checkKey}
          defaultOpenKeys={props.subKey}
          style={{ height: '90vh', borderRight: 0 }}
          className={Classes.siteLayoutmenu}
        >
          <SubMenu key="sub1" icon={<ReadOutlined style={{fontSize:'18px',color:'#000'}} />} title="General" className={Classes.siteLayoutSubmenu} >
            <Menu.Item key="1"> <Link to='/institute/home' className={Classes.LayoutLink}>View Profile</Link></Menu.Item>
            <Menu.Item key="2"><Link to='/institute/edit/profile' className={Classes.LayoutLink}>VEdit Profile</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<UploadOutlined />} title="Counter">
            <Menu.Item key="5"><Link to ='/institute/list/counter'>Counters</Link></Menu.Item>
            <Menu.Item key="6"><Link to ='/institute/create/counter'>Create Counter</Link></Menu.Item>
            <Menu.Item key="7"><Link to='/institute/counter/add/slot'>Add Slot</Link></Menu.Item>
            
          </SubMenu>
          <SubMenu key="sub3" icon={<UploadOutlined />} title="Token">
                <Menu.Item key="9"><Link to='/institute/active/tokens'>Booked Tokens</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<UploadOutlined />} title="Professionals">
                <Menu.Item key="10"><Link to='/institute/view/professionals'>Professionals</Link></Menu.Item>
                <Menu.Item key="11"><Link to='/institute/register/professional'>Register professional</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" icon={<UploadOutlined />} title="Security">
                <Menu.Item key="12"><Link to='/institute/change/password'>Change Password</Link></Menu.Item>
               
            </SubMenu>
        </Menu>
        </Sider>
        <Layout>
          <Header className={Classes.siteLayoutSubHeaderBackground}style={{ padding: 0 }} />
          <Content className={Classes.MainLayout}>
            <div className={Classes.siteLayoutBackground} >
              {props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>YesQ Experts Pvt. Ltd.</Footer>
        </Layout>
      </Layout>

    )
}
export default  DashBoardLayout
 