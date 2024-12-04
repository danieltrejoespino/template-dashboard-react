
import SweetAlert2 from 'react-sweetalert2';


const CustomSweetAlert = ({ show, title, text, onClose,icon,showConfirmButton,timer }) => {
  return (
    <SweetAlert2
      show={show}
      icon={icon}
      title={title}
      text={text}
      showConfirmButton={showConfirmButton}
      timer={timer}
      didClose={onClose}
    />
  );
};
export default CustomSweetAlert;