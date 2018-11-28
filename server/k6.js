import http from "k6/http";

export let options = {
 // stages: [
 //   // {duration: "30s", target: 5 },
 //   {duration: "240s", taget: 10 },
 //   // {duration: "10s", target: 0 }
 // ]
};

export default function() {
  var id = Math.floor(Math.random()*10000000);
  http.get(`http://localhost:3001/api/symbol/${id}/day`);
};
