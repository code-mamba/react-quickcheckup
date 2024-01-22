import { useSelector } from "react-redux";
import { Login } from "../Login/Login";

import { authSelector } from "src/redux/slices/authSlices";
import "./MainBanner.css";

export const MainBanner = () => {
  const isAuthenticated = useSelector(authSelector.isAuthenticated);
  return (
    <div>
      <div className="main-banner"></div>
      <div className="banner-home">
        <div className="banner-content">
          <h1>Quick Checkup We care about your health. .</h1>
          <h2>
            Additional description if needed Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quidem magnam commodi quia nesciunt,
            maxime fugit excepturi dignissimos officia, minima aut ullam nemo
            unde voluptatum veniam dolor sint quas itaque. Quam? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Nemo sunt nulla unde
            consequatur voluptatum nam corrupti minus, quaerat officia nihil
            neque sit ducimus fugiat voluptatem itaque reprehenderit minima
            dolores velit!
          </h2>
        </div>
        {!isAuthenticated&&<Login />}
      </div>
    </div>
  );
};
