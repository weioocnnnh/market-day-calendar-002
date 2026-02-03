import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMonthDays, isMarketDay, formatYearMonth, isSameDate } from '../utils/dateUtils';

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];

const Calendar: React.FC = () => {
  // Initialize with the target start date: February 2026
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 1, 1)); 
  const [today, setToday] = useState<Date>(new Date());

  // Update "today" on mount
  useEffect(() => {
    setToday(new Date());
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden font-sans select-none">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
        <div className="text-lg font-medium opacity-90 mb-2">街天日历</div>
        <div className="flex items-center justify-between">
          <button 
            onClick={handlePrevMonth}
            className="p-1 hover:bg-white/20 rounded-full transition-colors focus:outline-none"
            aria-label="Previous Month"
          >
            <ChevronLeft size={28} />
          </button>
          
          <h2 className="text-3xl font-bold tracking-wide">
            {formatYearMonth(currentDate)}
          </h2>
          
          <button 
            onClick={handleNextMonth}
            className="p-1 hover:bg-white/20 rounded-full transition-colors focus:outline-none"
            aria-label="Next Month"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 text-center py-4 border-b border-gray-100">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-gray-400 font-medium text-sm">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="p-4 grid grid-cols-7 gap-y-4 gap-x-1">
        {days.map((dayObj, index) => {
          const isMarket = isMarketDay(dayObj.date);
          const isToday = isSameDate(dayObj.date, today);
          
          return (
            <div 
              key={index} 
              className={`
                flex flex-col items-center justify-start pt-3 h-16 rounded-2xl relative
                transition-all duration-200
                ${isMarket && dayObj.isCurrentMonth ? 'bg-red-50 shadow-sm' : ''}
              `}
            >
              {/* Day Number */}
              <span className={`
                text-lg font-medium leading-none mb-1.5
                ${!dayObj.isCurrentMonth ? 'text-gray-300' : 'text-gray-800'}
                ${isToday && dayObj.isCurrentMonth ? '!text-green-600 font-bold' : ''}
              `}>
                {dayObj.date.getDate()}
              </span>

              {/* Market Day Badge */}
              {isMarket && (
                <span className={`
                  text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none
                  ${dayObj.isCurrentMonth ? 'text-red-500 bg-red-100/50' : 'text-red-200'}
                `}>
                  街
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="px-6 py-4 bg-gray-50 flex justify-between items-center text-xs text-gray-500 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
          <span>街天 (Market Day)</span>
        </div>
        <span>每隔两天一街</span>
      </div>
    </div>
  );
};

export default Calendar;