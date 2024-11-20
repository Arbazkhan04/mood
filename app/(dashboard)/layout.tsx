import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'History' },
];

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 h-full bg-white shadow-md fixed top-0 left-0 flex flex-col">
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-blue-600">Mood Tracker</h1>
        </div>
        <nav className="flex-1 py-4">
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.href} className="group">
                <Link
                  href={link.href}
                  className="block px-6 py-2 text-lg font-medium text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col ml-64">
        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <div className="text-xl font-medium text-gray-700">Dashboard</div>
          <div>
            <UserButton />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
