
import React from 'react';
import type { View } from '../types';
import { View as ViewEnum } from '../types';
import { DashboardIcon, TableIcon, CalendarIcon, PlayerStatsIcon, NewsIcon, HistoryIcon } from './icons';

interface HeaderProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const NavItem: React.FC<{
    label: string;
    view: View;
    currentView: View;
    onClick: (view: View) => void;
    icon: React.ReactNode;
}> = ({ label, view, currentView, onClick, icon }) => {
    const isActive = view === currentView;
    const baseClasses = "flex-shrink-0 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-loven-green";
    const activeClasses = "bg-brand-surface text-loven-green";
    const inactiveClasses = "text-gray-400 hover:bg-brand-surface/50 hover:text-gray-200";

    return (
        <button
            onClick={() => onClick(view)}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="bg-brand-bg sticky top-0 z-10 border-b border-brand-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="https://www.bjorkloven.com/images/bjorkloven/logo-bjorkloven-350x350.svg" alt="Björklöven Logo" className="h-10 w-10"/>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Löven-kollen
          </h1>
        </div>
      </div>
      <nav className="bg-brand-surface/30 border-t border-brand-border">
          <div className="container mx-auto px-2 py-1 flex overflow-x-auto whitespace-nowrap space-x-1">
              <NavItem
                label="Översikt"
                view={ViewEnum.Dashboard}
                currentView={currentView}
                onClick={onViewChange}
                icon={<DashboardIcon />}
              />
              <NavItem
                label="Tabell"
                view={ViewEnum.Table}
                currentView={currentView}
                onClick={onViewChange}
                icon={<TableIcon />}
              />
              <NavItem
                label="Spelschema"
                view={ViewEnum.Schedule}
                currentView={currentView}
                onClick={onViewChange}
                icon={<CalendarIcon />}
              />
              <NavItem
                label="Spelare"
                view={ViewEnum.PlayerStats}
                currentView={currentView}
                onClick={onViewChange}
                icon={<PlayerStatsIcon />}
              />
              <NavItem
                label="Nyheter"
                view={ViewEnum.News}
                currentView={currentView}
                onClick={onViewChange}
                icon={<NewsIcon />}
              />
              <NavItem
                label="Historik"
                view={ViewEnum.History}
                currentView={currentView}
                onClick={onViewChange}
                icon={<HistoryIcon />}
              />
          </div>
      </nav>
    </header>
  );
};

export default Header;
