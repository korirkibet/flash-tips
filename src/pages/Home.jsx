import { useContext, useEffect, useState } from 'react'
import { getAllTips } from '../firebase';
import AppHelmet from '../components/AppHelmet';
import { NavLink } from 'react-router-dom';
import Testimonials from '../components/Testimonials/Testimonials';
import { PriceContext } from '../PriceContext';
import { Error, Verified } from '@mui/icons-material';
import Pricing from '../components/Pricing/Pricing';
import Tips from './Tips';

export default function Home({ userData }) {
  const [loading, setLoading] = useState(false);
  const [allTips, setAllTips] = useState(null);
  const [filteredTips, setFilteredTips] = useState(null);
  const { setPrice } = useContext(PriceContext);
  const [status, setStatus] = useState(false);
  const [isOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    getAllTips(setAllTips, setLoading)
  }, [isOnline]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    if (allTips === null) return;
    const grouped = allTips.reduce((acc, item) => {
      const key = item.date;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
    const result = Object.keys(grouped).map(date => ({
      date,
      items: grouped[date]
    })).sort((a, b) => new Date(b.date) - new Date(a.date));
    setFilteredTips(result);
  }, [allTips]);

  return (
    <div className='Home'>
      <AppHelmet
        title="Home"
        location=""
        description="Get accurate football predictions for Premier League, La Liga, Bundesliga, Serie A and more. Free and VIP betting tips with expert analysis."
        keywords="football predictions, vip tips, betting tips, soccer predictions, premier league tips, fixed matches"
      />
      <section>
        <Tips userData={userData} />
      </section>
      <section>
        <h1 className="section-title">Pricing</h1>
        <Pricing />
      </section>
      <section className='tables'>
        {filteredTips && (
          <>
            <h1 className="section-title">Winning History</h1>
            <span className='btn-holder'>
              <div className={`btn ${!status ? "selected" : ""}`} onClick={() => setStatus(false)}>Free</div>
              <div className={`btn ${status ? "selected" : ""}`} onClick={() => setStatus(true)}>Premium</div>
              <NavLink to="/pay" className='btn'>Get VIP</NavLink>
            </span>
          </>
        )}
        {filteredTips && filteredTips.map(filteredTip => (
          <div key={filteredTip.date} className="history-group">
            {filteredTip.items && filteredTip.items.filter(t => t.status === 'finished' && t.premium === status).length > 0 && (
              <h2>{filteredTip.date}</h2>
            )}
            {filteredTip.items && filteredTip.items.filter(t => t.status === 'finished' && t.premium === status).length > 0 && (
              <table className='history-table wrapper'>
                <thead>
                  <tr>
                    <th>Home</th>
                    <th>Away</th>
                    <th>Pick</th>
                    <th>Odds</th>
                    <th>Results</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTip.items.filter(t => t.status === 'finished' && t.premium === status).map(tip => (
                    <tr key={tip.id || `${tip.home}-${tip.away}`}>
                      <td>{tip.home}</td>
                      <td>{tip.away}</td>
                      <td>{tip.pick}</td>
                      <td>{tip.odd}</td>
                      <td>
                        {tip.won === 'won' ? (
                          <span className='won'>
                            <span>Won</span>
                            <Verified className='icon' />
                          </span>
                        ) : (
                          <span className='lost'>
                            <span>Lost</span>
                            <Error className='icon' />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </section>
      <section>
        <h1 className="section-title">Testimonials</h1>
        <h2>What clients say:</h2>
        <Testimonials />
      </section>
      <section>
        <div className="cta-banner">
          <h1>Join The Winning Team</h1>
          <h1>Get VIP membership for 1 month with as little as KSH 3000.</h1>
          <NavLink to="/pay" className='btn' onClick={() => setPrice(3000)}>Subscribe Now</NavLink>
        </div>
      </section>
    </div>
  )
}
