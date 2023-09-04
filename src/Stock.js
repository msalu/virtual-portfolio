export default function Stock(props) {
  return (
    <div>
      <h2>{props.stock_name}</h2>
      <h2>{props.stock_current_price}</h2>
    </div>
  );
}
