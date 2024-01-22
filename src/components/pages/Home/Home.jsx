import { Button } from "src/components/utils/atoms/Button/Button";
import { MainBanner } from "../Banners/MainBanner";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Login } from "../Login/Login";
export const Home = () => {
  const navigate = useNavigate();

  const onClick = () => {
    
    navigate("/login");
  };

  return (
    <>
      <MainBanner />
      <div className="footer">
        <div className="footer-content">
          <h1>About Quick Checkup Landing Page</h1>
          <h3>
            Quo, sunt deserunt. Voluptatibus est eveniet sequi non quidem.
            Quibusdam quisquam consequatur dolor incidunt ipsum ratione
            necessitatibus. Eius impedit nihil voluptas dolores! Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Ipsum in, impedit
            architecto suscipit, reiciendis natus ullam ducimus corporis minus
            consectetur placeat accusantium perferendis, dignissimos molestiae
            tenetur? Eligendi voluptas nostrum quibusdam! Lorem ipsum dolor, sit
            amet consectetur adipisicing elit. Dolorum quos tenetur repellat
            praesentium quis saepe obcaecati nam cupiditate, quidem minima
            perspiciatis quo dolor ut qui magni, corporis autem dicta omnis?
          </h3>
        </div>
      </div>
    </>
  );
};
