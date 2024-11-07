import { useContext } from 'react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import ThemeContext from '../../../context/ThemeContext';

const Switch = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="flex items-center px-0 py-2.5 justify-end">
      <BsFillSunFill color="white" />

      <input
        id="darkmodeSwitch"
        role="switch"
        type="checkbox"
        className={`relative checked:bg-white appearance-none bg-white w-10 h-[15px] duration-500 mx-2.5 my-0
         rounded-[20px] checked:before:left-[25px] before:w-[15px] before:h-[15px] before:content-[''] before:absolute 
         before:-translate-y-2/4 before:duration-500 before:rounded-[50%] before:left-0 before:top-1/2 
         before:bg-black checked:before:bg-black`}
        checked={theme?.isDarkMode}
        onChange={() => theme?.toggleTheme()}
      />

      <BsFillMoonStarsFill color="white" />
    </div>
  );
};

export default Switch;
