'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/help', label: 'Help' },
];


const globalLanguages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español (Spanish)' },
  { code: 'fr', label: 'Français (French)' },
  { code: 'de', label: 'Deutsch (German)' },
  { code: 'zh-CN', label: '中文 (简体) (Chinese Simplified)' },
  { code: 'zh-TW', label: '中文 (繁體) (Chinese Traditional)' },
  { code: 'ja', label: '日本語 (Japanese)' },
  { code: 'ko', label: '한국어 (Korean)' },
  { code: 'ar', label: 'العربية (Arabic)' },
  { code: 'pt', label: 'Português (Portuguese)' },
  { code: 'ru', label: 'Русский (Russian)' },
  { code: 'it', label: 'Italiano (Italian)' },
  { code: 'nl', label: 'Nederlands (Dutch)' },
  { code: 'tr', label: 'Türkçe (Turkish)' },
  { code: 'pl', label: 'Polski (Polish)' },
  { code: 'sv', label: 'Svenska (Swedish)' },
  { code: 'no', label: 'Norsk (Norwegian)' },
  { code: 'da', label: 'Dansk (Danish)' },
  { code: 'fi', label: 'Suomi (Finnish)' },
  { code: 'el', label: 'Ελληνικά (Greek)' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'kn', label: 'കನ್ನಡ (Kannada)' },
  { code: 'ml', label: 'മലയാളം (Malayalam)' },
  { code: 'th', label: 'ไทย (Thai)' },
  { code: 'vi', label: 'Tiếng Việt (Vietnamese)' },
  { code: 'id', label: 'Bahasa Indonesia (Indonesian)' },
  { code: 'ms', label: 'Bahasa Melayu (Malay)' },
  { code: 'tl', label: 'Filipino (Tagalog)' },
  { code: 'he', label: 'עברית (Hebrew)' },
  { code: 'fa', label: 'فارسی (Persian)' },
  { code: 'ur', label: 'اردو (Urdu)' },
  { code: 'uk', label: 'Українська (Ukrainian)' },
  { code: 'ro', label: 'Română (Romanian)' },
  { code: 'hu', label: 'Magyar (Hungarian)' },
  { code: 'cs', label: 'Čeština (Czech)' },
  { code: 'sk', label: 'Slovenčina (Slovak)' },
  { code: 'bg', label: 'Български (Bulgarian)' },
  { code: 'hr', label: 'Hrvatski (Croatian)' },
  { code: 'sr', label: 'Српски (Serbian)' },
  { code: 'sl', label: 'Slovenščina (Slovenian)' },
  { code: 'et', label: 'Eesti (Estonian)' },
  { code: 'lv', label: 'Latviešu (Latvian)' },
  { code: 'lt', label: 'Lietuvių (Lithuanian)' },
  { code: 'ga', label: 'Gaeilge (Irish)' },
  { code: 'cy', label: 'Cymraeg (Welsh)' },
  { code: 'is', label: 'Íslenska (Icelandic)' },
  { code: 'ka', label: 'ქართული (Georgian)' },
  { code: 'hy', label: 'Հայերեն (Armenian)' },
  { code: 'az', label: 'Azərbaycanca (Azerbaijani)' },
  { code: 'eu', label: 'Euskara (Basque)' },
  { code: 'gl', label: 'Galego (Galician)' },
  { code: 'ca', label: 'Català (Catalan)' },
  { code: 'af', label: 'Afrikaans' },
  { code: 'sw', label: 'Kiswahili (Swahili)' },
  { code: 'zu', label: 'isiZulu (Zulu)' },
  { code: 'xh', label: 'isiXhosa (Xhosa)' },
  { code: 'yo', label: 'Yorùbá (Yoruba)' },
  { code: 'ig', label: 'Asụsụ Igbo (Igbo)' },
  { code: 'ha', label: 'Hausa' },
  { code: 'am', label: 'አማርኛ (Amharic)' },
  { code: 'so', label: 'Soomaali (Somali)' },
  { code: 'la', label: 'Latina (Latin)' },
  { code: 'eo', label: 'Esperanto' },
  { code: 'sq', label: 'Shqip (Albanian)' },
  { code: 'mk', label: 'Македонски (Macedonian)' },
  { code: 'be', label: 'Беларуская (Belarusian)' },
  { code: 'mt', label: 'Malti (Maltese)' },
  { code: 'haw', label: 'ʻŌlelo Hawaiʻi (Hawaiian)' },
  { code: 'mi', label: 'Māori' },
  { code: 'sm', label: 'Gagana Samoa (Samoan)' },
  { code: 'mn', label: 'Монгол (Mongolian)' },
  { code: 'kk', label: 'Қาзақ (Kazakh)' },
  { code: 'uz', label: 'Oʻzbek (Uzbek)' },
  { code: 'ky', label: 'Кыргызча (Kyrgyz)' },
  { code: 'tg', label: 'Тоҷикӣ (Tajik)' },
  { code: 'tk', label: 'Türkmen (Turkmen)' },
  { code: 'ne', label: 'नेपाली (Nepali)' },
  { code: 'si', label: 'සිංහල (Sinhala)' },
  { code: 'km', label: 'ខ្មែរ (Khmer)' },
  { code: 'lo', label: 'ລາវ (Lao)' },
  { code: 'my', label: 'မြန်မာ (Burmese)' },
  { code: 'su', label: 'Basa Sunda (Sundanese)' },
  { code: 'jv', label: 'Basa Jawa (Javanese)' },
  { code: 'ps', label: 'پښتو (Pashto)' },
  { code: 'sd', label: 'سنڌي (Sindhi)' },
  { code: 'ku', label: 'Kurdî (Kurdish)' },
  { code: 'lb', label: 'Lëtzebuergesch (Luxembourgish)' },
  { code: 'fy', label: 'Frysk (Frisian)' },
  { code: 'co', label: 'Corsu (Corsican)' },
  { code: 'tt', label: 'Татар (Tatar)' },
  { code: 'ba', label: 'Башҡорт (Bashkir)' },
  { code: 'ug', label: 'ئۇيغۇرچە (Uyghur)' },
  { code: 'mg', label: 'Malagasy' },
  { code: 'ceb', label: 'Cebuano' },
  { code: 'hmn', label: 'Hmong' },
  { code: 'rw', label: 'Ikinyarwanda (Kinyarwanda)' },
  { code: 'sn', label: 'chiShona (Shona)' },
  { code: 'st', label: 'Sesotho' },
  { code: 'ny', label: 'Chinyanja (Chichewa)' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [languages] = useState(globalLanguages);
  const [currentLang, setCurrentLang] = useState('en');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const getGoogleTransCookie = () => {
      const match = document.cookie.match(/googtrans=([^;]+)/);
      if (match) {
        const parts = match[1].split('/');
        return parts[parts.length - 1] || 'en';
      }
      return 'en';
    };
    setCurrentLang(getGoogleTransCookie());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownOpen && !event.target.closest('.lang-picker-container')) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langDropdownOpen]);

  const changeLanguage = (langCode) => {
    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${domain};`;
    if (domain.includes('.')) {
      const dotDomain = domain.substring(domain.indexOf('.'));
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=${dotDomain};`;
    }
    
    setCurrentLang(langCode);
    setLangDropdownOpen(false);

    const triggerSelect = () => {
      const selectEl = document.querySelector('.goog-te-combo');
      if (selectEl) {
        selectEl.value = langCode;
        selectEl.dispatchEvent(new Event('change'));
        return true;
      }
      return false;
    };

    if (!triggerSelect()) {
      setTimeout(() => {
        if (!triggerSelect()) {
          window.location.reload();
        }
      }, 250);
    }
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '12px 0' : '18px 0',
        background: scrolled ? 'rgba(4, 6, 14, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}>
            <img
              src="/logo.png"
              alt="WesternApex SHIPMENT SOLUTIONS"
              style={{
                height: '54px',
                width: 'auto',
                display: 'block',
              }}
            />
          </Link>

          {/* Desktop Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }} className="nav-desktop">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: pathname === link.href ? '#ef4444' : '#94a3b8',
                background: pathname === link.href ? 'rgba(239, 68, 68, 0.08)' : 'transparent',
                transition: 'all 0.3s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                if (pathname !== link.href) {
                  e.currentTarget.style.color = '#f1f5f9';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== link.href) {
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.background = 'transparent';
                }
              }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }} className="nav-desktop">
            {/* Hidden Google Translate div */}
            <div id="google_translate_element" style={{ display: 'none' }}></div>

            {/* Custom Language Picker */}
            <div className="lang-picker-container" style={{ position: 'relative' }}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '9999px',
                  color: '#f1f5f9',
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  outline: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = '#ef4444';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: '#ef4444' }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>{languages.find(l => l.code === currentLang)?.label || 'English'}</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transition: 'transform 0.3s',
                    transform: langDropdownOpen ? 'rotate(180deg)' : 'none',
                    opacity: 0.7,
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {langDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '200px',
                  background: 'rgba(8, 12, 26, 0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: 1100,
                }}>
                  {/* Search box */}
                  <input
                    type="text"
                    placeholder="Search 100+ languages..."
                    value={langSearch}
                    onChange={(e) => setLangSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                      fontSize: '0.8rem',
                      outline: 'none',
                      marginBottom: '8px',
                    }}
                    className="lang-search-input"
                  />
                  
                  {/* Languages container */}
                  <div className="lang-scroll-container" style={{
                    maxHeight: '220px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}>
                    {languages
                      .filter((lang) => lang.label.toLowerCase().includes(langSearch.toLowerCase()))
                      .map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '8px 10px',
                            background: currentLang === lang.code ? 'rgba(239, 68, 68, 0.08)' : 'transparent',
                            border: 'none',
                            borderRadius: '6px',
                            color: currentLang === lang.code ? '#ef4444' : '#94a3b8',
                            fontSize: '0.85rem',
                            fontWeight: currentLang === lang.code ? '600' : '500',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            if (currentLang !== lang.code) {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                              e.currentTarget.style.color = '#f1f5f9';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentLang !== lang.code) {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = '#94a3b8';
                            }
                          }}
                        >
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                            {lang.label}
                          </span>
                          {currentLang === lang.code && (
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/track/search" className="btn-secondary btn-sm" style={{
              padding: '8px 20px',
              fontSize: '0.85rem',
            }}>
              Track Shipment
            </Link>
            <Link href="/admin" className="btn-primary btn-sm" style={{
              padding: '8px 20px',
              fontSize: '0.85rem',
            }}>
              Dashboard
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 1001,
            }}
          >
            <span style={{
              width: '24px',
              height: '2px',
              background: '#f1f5f9',
              borderRadius: '2px',
              transition: 'all 0.3s',
              transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              background: '#f1f5f9',
              borderRadius: '2px',
              transition: 'all 0.3s',
              opacity: mobileOpen ? 0 : 1,
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              background: '#f1f5f9',
              borderRadius: '2px',
              transition: 'all 0.3s',
              transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: 'rgba(4, 6, 14, 0.95)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: mobileOpen ? 1 : 0,
        pointerEvents: mobileOpen ? 'all' : 'none',
        transform: mobileOpen ? 'scale(1)' : 'scale(0.98)',
      }} className="mobile-menu-overlay">
        {navLinks.map((link, i) => (
          <Link key={link.href} href={link.href} style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: pathname === link.href ? '#ef4444' : '#f1f5f9',
            padding: '12px 32px',
            borderRadius: '12px',
            transition: 'all 0.3s',
            textDecoration: 'none',
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${i * 0.05}s`,
          }}>
            {link.label}
          </Link>
        ))}
        <div style={{ height: '20px' }} />
        <Link href="/admin" className="btn-primary" style={{
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '0.3s',
          transition: 'all 0.3s',
        }}>
          Dashboard
        </Link>

        {/* Mobile Language Picker */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '280px',
          marginTop: '24px',
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '0.35s',
          transition: 'all 0.3s',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            color: '#f1f5f9',
            fontSize: '0.9rem',
            fontWeight: '600',
            justifyContent: 'center',
          }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ color: '#ef4444' }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>{languages.find(l => l.code === currentLang)?.label || 'Select Language'}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              style={{ opacity: 0.7 }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          <select
            value={currentLang}
            onChange={(e) => changeLanguage(e.target.value)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer',
              WebkitAppearance: 'menulist-button',
            }}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} style={{ background: '#080c1a', color: '#f1f5f9' }}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Google Translate Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'en',
              layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            }, 'google_translate_element');
          }
        `
      }} />
      <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async />

      <style jsx global>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile-toggle { display: none !important; }
        
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }

        /* Native Google Translate Blending */
        iframe.goog-te-banner-frame,
        .goog-te-banner-frame,
        #goog-gt-tt,
        #goog-gt-tt *,
        .goog-te-balloon-frame,
        .goog-tooltip,
        .goog-tooltip:hover {
          display: none !important;
          visibility: hidden !important;
        }
        body {
          top: 0px !important;
          position: static !important;
        }
        .goog-te-gadget {
          display: none !important;
          visibility: hidden !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
          box-sizing: border-box !important;
        }
        
        /* Custom scrollbar for translation picker */
        .lang-scroll-container::-webkit-scrollbar {
          width: 6px !important;
        }
        .lang-scroll-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02) !important;
          border-radius: 99px !important;
        }
        .lang-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.25) !important;
          border-radius: 99px !important;
        }
        .lang-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #ef4444 !important;
        }
      `}</style>
    </>
  );
}
