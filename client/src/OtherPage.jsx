import { Link } from "react-router-dom";

const OtherPage = () => {
  return (
    <div>
      <p>I'm another page!</p>
      <br />
      <Link to="/">Go back to the home screen</Link>
    </div>
  );
};

export default OtherPage;
