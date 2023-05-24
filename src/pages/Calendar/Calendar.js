import Navbar from '../../components/Navbar/Navbar';
import GoBack from '../../components/GoBack/GoBack';

export const Calendar = () => {

  return (
    <article id="calendar-container">
      <Navbar />
      <article className='calendar-header-container'>
        <h1>Tasks</h1>
      </article>
    </article>
  );
}

export default Calendar;
