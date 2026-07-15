import './CalendarHeader.css'

function CalendarHeader() {
    const today = new Date();
    const monthName = today.toLocaleDateString('en-US', {month: 'long'});
    const fullYear = today.toLocaleDateString('en-US', {year: 'numeric'});

    return (
        <div className="calendar-header-container">
            <h1>Calendar</h1>
            <div className='date'>
                <span className='month'>{monthName}</span>
                <span className='year'>{fullYear}</span>
            </div>
        </div>
    );
}

export default CalendarHeader