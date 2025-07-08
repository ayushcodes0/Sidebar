import { NavLink, Outlet } from 'react-router-dom';
import "./Home.css"
import { FaLightbulb } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import PlaceholderImage from "../assets/placeholder-profile.jpg";
import { CgProfile } from "react-icons/cg";
import { FaDiceD6 } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { CgOrganisation } from "react-icons/cg";
import { FaRegPaperPlane } from "react-icons/fa6";
import { BsPersonStanding } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegNewspaper } from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FaRegStickyNote } from "react-icons/fa";
import { GoCodeOfConduct } from "react-icons/go";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { useEffect, useRef, useState } from 'react';
import { FiSidebar } from "react-icons/fi";


export default function Home() {

    const [dashboardDrawer, setDashboardDrawer] = useState(false);
    const [menuClick, setMenuClick] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const sidebarToggleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuClick &&
        sidebarRef.current && 
        sidebarToggleRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        !sidebarToggleRef.current.contains(e.target as Node)
      ) {
        setMenuClick(false);
      }
    };

    if (menuClick) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('sidebar-open');
    };
  }, [menuClick]);

  return (
    <div className="shell">
      <div className={`sidebar ${menuClick ? 'open' : ''}`} ref={sidebarRef}>
        <div className='menu-icon'><FiSidebar onClick={()=>setMenuClick(false)}/></div>
        <NavLink to={"/"} onClick={()=>setDashboardDrawer(false)}>
            <h2>
                <FaLightbulb className="bulb-icon" />
                Create Snap
            </h2>
        </NavLink>

        <div className="nav-links">
            <div className="link">
                <NavLink to="/" end onClick={()=>setDashboardDrawer(false)}><span>Home</span></NavLink>
            </div>

            <div className="link">
                <NavLink onClick={()=>setDashboardDrawer(!dashboardDrawer)} to="/dashboard"><span>Dashboard</span><span>{dashboardDrawer? <FaAngleUp/> : <FaAngleDown/>}</span></NavLink>
            </div>
            
            <div className="drawer">
                {
                    dashboardDrawer && (
                        <>
                            <div className="link">
                                <NavLink to="/profiles"><span><CgProfile className='nav-icons'/>Profiles</span></NavLink>
                            </div>

                            <div className="link">
                                <NavLink to="/roles"><span><FaDiceD6 className='nav-icons'/>Roles</span></NavLink>
                            </div>

                            <div className="link">
                                <NavLink to="/organisations"><span><CgOrganisation className='nav-icons'/>Organisations</span></NavLink>
                            </div>

                            <div className="link">
                                <NavLink to="/plans"><span><FaRegPaperPlane className='nav-icons'/>Plans</span></NavLink>
                            </div>

                            <div className="link">
                                <NavLink to="/groups"><span><HiUserGroup className='nav-icons'/>Groups</span></NavLink>
                            </div>

                            <div className="link">
                                <NavLink to="/employees"><span><BsPersonStanding className='nav-icons'/>Employees</span></NavLink>
                            </div>

                            <div className="link">
                                <NavLink to="/notifications"><span><IoIosNotificationsOutline className='nav-icons'/>Notifications</span></NavLink>
                            </div>

                            <div className="link">
                                <NavLink to="/newsletter"><span><FaRegNewspaper className='nav-icons'/>Newsletter</span></NavLink>
                            </div>

                            <div className="link">
                                <NavLink to="/privacy-policy"><span><MdOutlinePrivacyTip className='nav-icons'/>Privacy Policy</span></NavLink>
                            </div>

                            <div className="link">
                                <NavLink to="/terms-and-conditions"><span><FaRegStickyNote className='nav-icons'/>Terms & Conditions</span></NavLink>
                            </div>

                            <div className="link">
                                <NavLink to="/code-of-conduct"><span><GoCodeOfConduct className='nav-icons'/>Code of Conduct</span></NavLink>
                            </div>
                        </>
                    )
                }
            </div>

            
        </div>
        
      </div>
      <div className="panel">
            <div className="nav">
                <div className="nav-elements">
                    <div className="nav-left" ref={sidebarToggleRef}><FiSidebar  onClick={() => setMenuClick(true)} className='sidebar-icon'/></div>
                    <div className="nav-right">
                        <span className='bell-icon-container'><FaBell className='bell-icon'/><div className='hover-text notification-hover'>Notification</div></span>
                        <span className='profile-image-container'><img src={PlaceholderImage} alt="" /><div className="hover-text profile-hover">Profile</div></span>
                    </div>
                </div>
            </div>
            <div className="panel-screen"><Outlet /></div>
      </div>
    </div>
  );
}
