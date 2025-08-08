import { useEffect, useState } from 'react';
import './UserProfile.scss';
import { NavLink, useLocation} from 'react-router-dom';

export default function UserProfile({data}) {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(location.state) {
      setUser(location.state)
    } else {
      setUser(data)
    }
  }, [location]);

  return (
    <div className="user-profile">
      {user && <div className="user-header">
        <div className="uh-left">
          <div className="uh-image">
            <img src="https://i.imgur.com/Qv1WDJq.jpg" alt="Profile" />
            <div className="gradient"></div>
          </div>
        </div>
        <div className="user-links">
            <span><a>@{user.username}</a></span>
            <span>
              {
                user.isPremium ? <a>VIP</a> : <NavLink className="btn"  to='/pay'>GET VIP</NavLink>
              }
              <NavLink to="/users-edit" className="btn" state={user}>Edit</NavLink>
            </span>

        </div>
      </div>}
      <div className="explore"><NavLink to="/tips" className="btn">EXPLORE</NavLink></div>
    </div>
  );
}
