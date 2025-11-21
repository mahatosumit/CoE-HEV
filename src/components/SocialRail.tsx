import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const SocialRail = () => {
  const socials = [
    { Icon: Facebook, url: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-[#1877f2]' },
    { Icon: Twitter, url: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-[#1da1f2]' },
    { Icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-[#0077b5]' },
    { Icon: Instagram, url: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-gradient-to-tr hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af]' },
    { Icon: Youtube, url: 'https://youtube.com', label: 'YouTube', color: 'hover:bg-[#ff0000]' },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <div className="flex flex-col gap-0 rounded-2xl overflow-hidden shadow-xl">
        {socials.map((social, index) => {
          const Icon = social.Icon;
          return (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative w-14 h-14 bg-white ${social.color} text-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 hover:z-10 border-b border-border last:border-b-0`}
              aria-label={social.label}
            >
              <Icon size={24} className="relative z-10" />
              <span className="absolute left-full ml-3 px-3 py-1.5 bg-card text-foreground text-sm font-medium rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                {social.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialRail;
