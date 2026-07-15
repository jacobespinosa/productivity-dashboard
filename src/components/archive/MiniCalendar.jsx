import './MiniCalendar.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function MiniCalendar() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth()));

    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    const dayNumbers = [];
    while (startOfMonth <= endOfMonth) {
        dayNumbers.push(startOfMonth.getDate());
        startOfMonth.setDate(startOfMonth.getDate() + 1);
    }

    function handlePrevMonth() {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    }

    function handleNextMonth() {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    }

    return (
        <div className="mini-calendar-container">
            <div className='mini-calendar-header'>
                <button type="button" 
                        className="button prev-month"
                        onClick={handlePrevMonth}>
                    <FontAwesomeIcon icon={faChevronLeft} className="chevron-left"/>
                </button>
                <span className='current-month-name'>{currentMonth.toLocaleDateString('en-US', {month: 'long'})}</span>
                <button type="button" 
                        className='button next-month'
                        onClick={handleNextMonth}>
                    <FontAwesomeIcon icon={faChevronRight} className='chevron-right'/>
                </button>
            </div>
            <div className="divider"></div>
            <div className='mini-calendar-grid'>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
                {dayNumbers.map((num) => {
                    return (
                        <button key={num} 
                                type='button' 
                                className='button mini-calendar-day'>
                            {num}
                        </button>
                    )
                })}
            </div>
        </div>
    );
}

export default MiniCalendar