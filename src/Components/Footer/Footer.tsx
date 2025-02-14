import './Footer.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const creationYear = 2024;
  return (
    <footer className='Footer'>
      <div className='footer-link'>
        <p className='copyright'>
          © {creationYear === currentYear ? currentYear : `${creationYear} - ${currentYear}`}{' '}
          CodeForge
        </p>
      </div>
    </footer>
  );
};

export default Footer;
