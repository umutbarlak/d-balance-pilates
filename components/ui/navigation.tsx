"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

const defaultMenuItems: MenuItem[] = [
  {
    label: "Kurumsal",
    href: "/kurumsal",
    children: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Postür Değerlendirme", href: "/postur-degerlendirme" },
      { label: "Ekibimiz", href: "/ekibimiz" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
  {
    label: "Pilates",
    href: "/pilates",
    children: [
      { label: "Pilates", href: "/pilates" },
      { label: "Klinik Pilates", href: "/klinik-pilates" },
      { label: "Reformer Pilates", href: "/reformer-pilates" },
      { label: "Bloglar", href: "/blog" },
    ],
  },
];

export default function Navigation() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenuItems);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center">
              <div className="bg-primary rounded-full flex items-center justify-center">
                <Image
                  width={60}
                  height={60}
                  className="bg-white object-cover"
                  src="/logo.png"
                  alt="d-balance pilates"
                />
              </div>
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                D-Balance Pilates
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <div key={item.label} className="relative group">
                  <button className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium flex items-center">
                    {item.label}
                    {item.children && <ChevronDown className="ml-1 h-4 w-4" />}
                  </button>

                  {item.children && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-6">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
