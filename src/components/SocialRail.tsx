const SocialRail = () => {
  const socials = [
    { icon: 'fab fa-facebook', url: 'https://facebook.com', label: 'Facebook' },
    { icon: 'fab fa-twitter', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'fab fa-linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: 'fab fa-instagram', url: 'https://instagram.com', label: 'Instagram' },
    { icon: 'fab fa-youtube', url: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <div className="flex flex-col gap-3">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white hover:bg-saffron text-blue-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            aria-label={social.label}
          >
            <i className={social.icon}></i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialRail;
