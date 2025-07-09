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
const TBC_ADDRESS = process.env.NEXT_PUBLIC_TBC_ADDRESS;

const Header = () => {


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
              href: `${EXPLORER_TOKEN_URL}${TBC_ADDRESS}`,
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
              href: `${EXPLORER_ADDRESS_URL}${TBC_ADDRESS}`,
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
  return <div>Header</div>;
};

export default Header;
