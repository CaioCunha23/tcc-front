import LoginForm from './components/loginForm';
import Header from './components/header';
import Footer from './components/footer';
import maerskLogo from './assets/Maersk.png';
import './styles/App.css'

export default function App() {
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com' },
    { name: 'Facebook', url: 'https://www.facebook.com' },
    { name: 'Instagram', url: 'https://www.instagram.com' },
    { name: 'YouTube', url: 'https://www.youtube.com' },
    { name: 'Twitter', url: 'https://www.twitter.com' }
  ];

  const policyLinks = [
    { name: 'Cookie Policy', url: '/cookie-policy' },
    { name: 'Cookie Preferences', url: '/cookie-preferences' }
  ];

  return (
    <div className='h-screen w-screen flex flex-col bg-cover bg-center bg-no-repeat bg-[url(https://media.licdn.com/dms/image/v2/D4D12AQE2pTob4BxMiA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1711543574420?e=2147483647&v=beta&t=hFXPNVcH1jhskeVKtyg0ctJhwVI3Tiw1OH1CA2OMWHU)]'>
      <Header image={maerskLogo} />

      <div className='flex items-center h-[100%] justify-end mr-[10em]'>
        <LoginForm />
      </div>

      <Footer socialLinks={socialLinks} policyLinks={policyLinks} />
    </div>
  );
};