import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Giá vàng hôm nay</h1>
      <iframe
        frameborder="0"
        width="100%"
        height="750px"
        src="https://webtygia.com/api/vang?bgheader=b53e3e&colorheader=ffffff&padding=5&fontsize=13&hienthi=&"
      ></iframe>
    </div>
  );
}

export default Home;
