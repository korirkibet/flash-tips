import { useLayoutEffect } from 'react'
import Contact from '../components/Contact/Contact';
import FaqItem from '../components/FaqItem/FaqItem';
import { faqs } from '../data';
import AppHelmet from '../components/AppHelmet';

export default function About() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <div className='about'>
      <AppHelmet
        title="About"
        location={'/about'}
        description="Learn about Flash VIP Tips - the leading football prediction platform offering expert betting tips, VIP predictions, and in-depth analysis for major leagues worldwide."
        keywords="about flash vip tips, football predictions, betting tips platform, vip predictions, soccer betting"
      />
      <div className="quote">
        <div className='content'>
          <h2>Welcome to Flash VIP Tips</h2>
          <p>
            Your go-to platform for accurate and reliable football betting predictions. Our mission is to provide football enthusiasts and bettors with expert tips, in-depth analysis, and strategic insights to help you make informed betting decisions.
          </p>
        </div>
      </div>
      <div className="quote">
        <div className='content'>
          <p>
            At Flash VIP Tips, we cover a wide range of football leagues and tournaments, offering free and premium VIP predictions. Our team of analysts uses advanced data models, historical statistics, and real-time information to deliver predictions that give you an edge in the betting market.
          </p>
          <p>
            With our VIP subscription, you will gain access to exclusive, higher-accuracy tips designed for serious bettors. You can easily subscribe using MPesa, PayPal, or cryptocurrency, ensuring a smooth and convenient experience.
          </p>
          <p>
            Join our community today and start winning with confidence!
          </p>
        </div>
      </div>
      <h1 id='faq'>Frequently Asked Questions</h1>
      <h2>People often ask</h2>
      <div className="faqs-container">
        {faqs.map(faq => (
          <FaqItem key={faq.id} question={faq.question} answer={faq.answer}/>
        ))}
      </div>
      <Contact />
    </div>
  )
}
