import './CalButtons.css';

export default function CalButtons({value, onClick}) {
  return (
    <button onClick={ () => onClick(value) }>{value}</button>
  );
}
