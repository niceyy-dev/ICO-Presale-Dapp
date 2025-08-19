import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiX,
  FiMoon,
  FiSun,
  FiChevronDown,
  FiBook,
  FiMap,
  FiFileText,
  FiCompass,
  FiActivity,
  FiCpu,
  FiLayers,
  FiDatabase,
  FiCode,
  FiInfo,
} from "react-icons/fi";
import { RiWallet3Line } from "react-icons/ri";
import CustomConnectButton from "../Global/CustomConnectButton";

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME;
const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL;
const TOKEN_SUPPLY = process.env.NEXT_PUBLIC_TOKEN_SUPPLY;
const PER_TOKEN_USD_PRICE = process.env.NEXT_PUBLIC_PER_TOKEN_USD_PRICE;
const NEXT_PER_TOKEN_USD_PRICE =
  process.env.NEXT_PUBLIC_NEXT_PER_TOKEN_USD_PRICE;
const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY;
const BLOCKCHAIN = process.env.NEXT_PUBLIC_BLOCKCHAIN;
const EXPLORER_TOKEN_URL = process.env.NEXT_PUBLIC_EXPLORER_TOKEN_URL;
const EXPLORER_ADDRESS_URL = process.env.NEXT_PUBLIC_EXPLORER_ADDRESS_URL;
const LINKTUM_ADDRESS = process.env.NEXT_PUBLIC_LINKTUM_ADDRESS;

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeOutRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuHover = (menuId) => {
    clearTimeout(timeOutRef.current);
    setActiveMegaMenu(menuId);
  };
  const handleMenuLeave = () => {
    timeOutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 300);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClasses = `w-full transition-all duration-500 ease-out ${
    isDarkMode
      ? "bg-[#0e0b12]/95 backdrop-blur-md"
      : "bg-white/95 backdrop-blur-md"
  }${
    isHeaderSticky
      ? "fixed top-0 left-0 z-50 w-full shadow-lg animate-slowSlideDown border-b"
      : "relative border-b"
  }${isDarkMode ? "border-gray-800/50" : "border-gray-200/50"}}`;

  // Mega menu content
  const megaMenus = {
    ecosystem: {
      title: "Ecosystem",
      columns: [
        {
          title: "Core Technology",
          links: [
            {
              icon: <FiActivity className="text-fuchsia-500" />,
              label: "Linktum AI",
              href: "https://linktum.gitbook.io/linktum",
            },
            {
              icon: <FiCpu className="text-indigo-500" />,
              label: "AIVM",
              href: "https://linktum.gitbook.io/linktum/linktum-docs/quickstart",
            },
            {
              icon: <FiLayers className="text-fuchsia-500" />,
              label: "Framework",
              href: "https://linktum.gitbook.io/linktum/linktum-docs",
            },
          ],
        },
        {
          title: "Applications",
          links: [
            {
              icon: <FiCode className="text-fuchsia-500" />,
              label: "How To Buy",
              href: "https://linktum.gitbook.io/linktum/linktum-docs/publish-your-docs",
            },
            {
              icon: <FiCompass className="text-indigo-500" />,
              label: "Explorer",
              href: `${EXPLORER_TOKEN_URL}${LINKTUM_ADDRESS}`,
            },
            {
              icon: <FiMap className="text-fuchsia-500" />,
              label: "Create Wallet",
              href: "https://linktum.gitbook.io/linktum/linktum-docs/publish-your-docs/create-a-wallet",
            },
          ],
        },
        {
          title: "Community",
          links: [
            {
              icon: <FiFileText className="text-indigo-500" />,
              label: "Token Documentation",
              href: "https://linktum.gitbook.io/linktum/tokenomics",
            },
            {
              icon: <FiBook className="text-fuchsia-500" />,
              label: "Referral",
              href: "https://linktum.gitbook.io/linktum/referral",
            },
            {
              icon: <FiCompass className="text-indigo-500" />,
              label: "Audits",
              href: "https://linktum.gitbook.io/linktum/audits",
            },
          ],
        },
      ],
      featuredBox: {
        title: "Join Our Community",
        description:
          "Be part of the Linktum revolution and help shape the future of AI-driven blockchain.",
        linkText: "Join Discord",
        linkUrl: "https://discord.gg/hCEy5vREwr",
        bgClass: isDarkMode ? "bg-indigo-500/10" : "bg-indigo-100/60",
      },
    },
    resources: {
      title: "Resources",
      columns: [
        {
          title: "Learn",
          links: [
            {
              icon: <FiFileText className="text-fuchsia-500" />,
              label: "Whitepaper",
              href: "https://linktum.gitbook.io/linktum/linktum-docs/quickstart",
            },
            {
              icon: <FiMap className="text-indigo-500" />,
              label: "Import Token",
              href: "https://linktum.gitbook.io/linktum/import-token",
            },
            {
              icon: <FiBook className="text-fuchsia-500" />,
              label: "Documentation",
              href: "https://linktum.gitbook.io/linktum/import-token",
            },
          ],
        },
        {
          title: "Tools",
          links: [
            {
              icon: <FiCompass className="text-fuchsia-500" />,
              label: "Block Explorer",
              href: `${EXPLORER_ADDRESS_URL}${LINKTUM_ADDRESS}`,
            },
            {
              icon: <FiDatabase className="text-indigo-500" />,
              label: "Analytics",
              href: "/dashboard",
            },
            {
              icon: <FiCpu className="text-fuchsia-500" />,
              label: "Dashboard",
              href: "/dashboard",
            },
          ],
        },
      ],
      featuredBox: {
        title: "Start Building Today",
        description:
          "Access developer resources and start building on the Linktum Protocol.",
        linkText: "Developer Portal",
        linkUrl: "/dashboard",
        bgClass: isDarkMode ? "bg-teal-500/10" : "bg-teal-100/60",
      },
    },
  };
  return (
    <>
      {isHeaderSticky && <div className="h-[90px] md:h-[98px]"></div>}

      <header
        className={`w-full transition-all duration-500 ease-out fixed top-0 left-0 z-50 w-full shadow-lg animate-slowSlideDown border-b ${
          isDarkMode
            ? "bg-[#0e0b12]/95 backdrop-blur-md border-gray-800/50"
            : "bg-white/95 backdrop-blur-md border-gray-200/50"
        }`}
        ref={menuRef}
      >
        {!isScrolled && (
          <div className="relative py-3 overflow-hidden whitespace-nowrap">
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white z-0"></div>
            <div
              className="absolute inset-0 z-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.1) 1px transparent 1px)",
                backgroundSize: "20px 20px 30px 30px",
                backgroundPosition: "0 0, 15px 15px",
              }}
            ></div>
            <div className="animate-marquee inline-block whitespace-nowrap text-white relative z-10">
              <span className="mx-4 text-sm md:text-base">
                {TOKEN_NAME} ({TOKEN_SYMBOL}) PreSale is NOW LIVE! Be part of
                the future-claim your discounted tokens and exclusive access to
                AI Blockchain technology
                <span className="mx-1">🌍</span>
                Don&apos;t wait, join the innovation wave tokday!
                <span className="ml-1">🔥</span>
              </span>
            </div>
          </div>
        )}
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative w-10 h-10 mr-3 overflow-hidden">
                <div className="absolute inset-0"></div>
                <div className="absolute inset-1 flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600 animate-gradient-x">
                {TOKEN_NAME}
              </span>
            </Link>
          </div>
          <nav className="hidden lg:flex items-center space-x-6">
            <div
              className="relative group"
              onMouseEnter={() => handleMenuHover("ecosystem")}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className={`flex items-center space-x-2 py-2 px-1 transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-fuchsia-500"
                    : "text-gray-700 hover:text-teal-600"
                } ${activeMegaMenu === "ecosystem" ? " text-fuchsia-500" : ""}`}
                onClick={() =>
                  setActiveMegaMenu(
                    activeMegaMenu === "ecosystem" ? null : "ecosystem"
                  )
                }
              >
                <span>Ecosystem</span>
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    activeMegaMenu === "ecosystem" ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => handleMenuHover("resources")}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className={`flex items-center space-x-2 py-2 px-1 transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-fuchsia-500"
                    : "text-gray-700 hover:text-teal-600"
                } ${activeMegaMenu === "resources" ? " text-fuchsia-500" : ""}`}
                onClick={() =>
                  setActiveMegaMenu(
                    activeMegaMenu === "resources" ? null : "resources"
                  )
                }
              >
                <span>Resources</span>
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    activeMegaMenu === "resources" ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <Link
              href={`${EXPLORER_ADDRESS_URL}${LINKTUM_ADDRESS}`}
              target="_blank"
              className={`py-2 px-1 transition-colors ${
                isDarkMode
                  ? "text-gray-300 hover:text-fuchsia-500"
                  : "text-gray-700 hover:text-teal-600"
              }`}
            >
              <span>Explorer</span>
            </Link>
            <Link
              href={`/dashboard`}
              className={`py-2 px-1 transition-colors ${
                isDarkMode
                  ? "text-gray-300 hover:text-fuchsia-500"
                  : "text-gray-700 hover-text-teal-600"
              }`}
            >
              <span>LTUM</span>
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white"
                  : "bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white"
              }`}
              aria-label={
                isDarkMode ? "Switch to light mode " : "Switch to dark mode"
              }
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <a href="/dashboard" className="group">
              <div className="w-10 h-10 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
                <span className="text-white">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </a>
            <CustomConnectButton active={true} />
          </div>
          <div className="flex lg:hidden items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white"
                  : "bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white"
              }`}
              aria-label={
                isDarkMode ? "Switch to light mode " : "Switch to dark mode"
              }
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className={`focus:outline-none ${
                isDarkMode ? "text-fuchsia-500" : "text-indigo-500"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        {Object.keys(megaMenus).map((menuKey) => {
          const menu = megaMenus[menuKey];
          return (
            <div
              key={menuKey}
              className={`absolute left-0 w-full z-40 transition-all duration-300 transform ${
                activeMegaMenu === menuKey
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-2 pointer-events-none"
              } ${
                isDarkMode
                  ? "bg-[#14101a]/95 backdrop-blur-md border-b border-gray-800/50"
                  : "bg-white/95 backdrop-blur-md border-b border-gray-200/50"
              } shadow-xl`}
              onMouseEnter={() => handleMenuHover(menuKey)}
              onMouseLeave={handleMenuLeave}
            >
              <div className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {menu.columns.map((column, idx) => (
                    <div key={idx} className="space-y-4">
                      <h3
                        className={`text-sm font-bold uppercase tracking-wider ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {column.title}
                      </h3>
                      <ul className="space-y-2">
                        {column.links.map((link, linkIdx) => (
                          <li key={linkIdx}>
                            <Link
                              href={link.href}
                              target="_blank"
                              className={`flex items-center space-x-2 py-1 transition-colors duration-200 ${
                                isDarkMode
                                  ? "text-gray-300 hover:text-fuchsia-500"
                                  : "text-gray-700 hover:text-teal-600 "
                              }`}
                              onClick={() => setActiveMegaMenu(null)}
                            >
                              <span className="text-lg">{link.icon}</span>
                              <span className="">{link.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className={`rounded-xl p-6 ${menu.featuredBox.bgClass}`}>
                    <h3
                      className={`text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600`}
                    >
                      {menu.featuredBox.title}
                    </h3>
                    <p
                      className={`text-sm mb-4 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {menu.featuredBox.description}
                    </p>
                    <Link
                      href={menu.featuredBox.linkUrl}
                      target="_blank"
                      className="inline-flex items-center space-x-1 font-medium bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600"
                      onClick={() => setActiveMegaMenu(null)}
                    >
                      <span>{menu.featuredBox.linkText}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div
          className={`lg:hidden fixed inset-y-0 z-50 left-0 w-4/5 max-w-xs transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } ${
            isDarkMode
              ? "bg-[#14101a] border-b"
              : "bg-white border-r border-gray-200/50"
          }`}
          style={{ height: "100vh", overflow: "auto" }}
        >
          <div className="h-full overflow-auto ">
            <div
              className={`p-5 border-b ${
                isDarkMode ? "border-gray-800/50" : "border-gray-200/50"
              } flex justify-between items-center`}
            >
              <Link
                href={"/"}
                className="flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <div className="relative w-10 h-10 mr-3 overflow-hidden">
                  <div className="absolute inset-0"></div>
                  <div className="absolute inset-1 flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="LOGO"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600 animate-gradient-x">
                  {TOKEN_NAME}
                </span>
              </Link>
              <button
                onClick={toggleMenu}
                className={`focus:outline-none ${
                  isDarkMode ? "text-fuchsia-500" : "text-purple-600"
                } `}
                aria-label="Close Menu"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-5">
              <nav className="flex flex-col">
                <MobileAccordionItem
                  title={"Ecosystem"}
                  isDarkMode={isDarkMode}
                  items={[
                    {
                      icon: <FiActivity className="text-fuchsia-500" />,
                      label: "Linktum AI",
                      href: "#",
                    },
                    {
                      icon: <FiCpu className="text-fuchsia-500" />,
                      label: "AIVM",
                      href: "#",
                    },
                    {
                      icon: <FiLayers className="text-fuchsia-500" />,
                      label: "Framework",
                      href: "#",
                    },
                    {
                      icon: <FiCompass className="text-fuchsia-500" />,
                      label: "Explorer",
                      href: "#",
                    },
                  ]}
                  toggleMenu={toggleMenu}
                />
                <MobileAccordionItem
                  title={"Resources"}
                  isDarkMode={isDarkMode}
                  items={[
                    {
                      icon: <FiFileText className="text-fuchsia-500" />,
                      label: "Whitepaper",
                      href: "#",
                    },
                    {
                      icon: <FiMap className="text-fuchsia-500" />,
                      label: "Import Token",
                      href: "#",
                    },
                    {
                      icon: <FiBook className="text-fuchsia-500" />,
                      label: "Documentation",
                      href: "#",
                    },
                    {
                      icon: <FiDatabase className="text-fuchsia-500" />,
                      label: "Analytics",
                      href: "#",
                    },
                  ]}
                  toggleMenu={toggleMenu}
                />
                <Link
                  href={`${EXPLORER_ADDRESS_URL}${LINKTUM_ADDRESS}`}
                  target="_blank"
                  className={`flex items-center space-x-2 py-4 border-b ${
                    isDarkMode
                      ? "border-gray-800/50 text-gray-300 hover:text-fuchsia-500"
                      : "border-gray-200/50 text-gray-700 hover:text-fuchsia-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <FiCompass size={18} />
                  <span>Explorer</span>
                </Link>
                <Link
                  href={`/dashboard`}
                  className={`flex items-center space-x-2 py-4 border-b ${
                    isDarkMode
                      ? "border-gray-800/50 text-gray-300 hover:text-fuchsia-500"
                      : "border-gray-200/50 text-gray-700 hover:text-fuchsia-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <FiInfo size={18} />
                  <span>Dashboard</span>
                </Link>
                <div className="mt-8">
                  <CustomConnectButton />
                </div>
              </nav>
            </div>
          </div>
        </div>
        {isOpen && (
          <div
            className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
            onClick={toggleMenu}
          ></div>
        )}
      </header>
      <style jsx>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
            .animate-marquee {
              animation: marquee 20s linear infinite;
              display: inline-block;
            }
          }
        `}
      </style>
    </>
  );
};

const MobileAccordionItem = ({ title, items, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`border-b ${
        isDarkMode ? "border-gray-800/50" : "border-gray-200/50"
      }`}
    >
      <button
        className={`flex items-center justify-between w-full py-4 ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
      >
        <span className="flex items-center space-x-2">
          <FiChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
          <span>{title}</span>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="pl-6 pb-2 space-y-2">
          {items.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              target="_blank"
              className={`flex items-center space-x-2 py-3 ${
                isDarkMode
                  ? "text-gray-400 hover:text-fuchsia-500"
                  : "text-gray-600 hover:text-teal-600"
              } transition-colors`}
              onClick={() => {
                toggleMenu();
                setIsOpen(false);
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Header;
