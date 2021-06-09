import React from "react";
import { useQuery } from "react-query";
import classes from "./Home.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import VideoElement from "components/VideoElement"

const baseUrl = "http://localhost:8080/";


const fetchVideos = async () => {
  const req = {
    Limit: 10,
    Offset: 1,
  };
  const res = await fetch(
    `${baseUrl}listStreams?Limit=${req.Limit}&Offset=${req.Offset}`,
    { method: "GET" }
  );
  return res.json();
};

const Home = () => {
  const { data, status } = useQuery("vidoes", fetchVideos);
  console.log(data);

  return (
    <div className={classes.homeRoot}>
      {status === "loading" && (
        <div className={classes.loader}>
        <Loader
        type="Puff"
        color="#3f495e"
        height={100}
        width={100}
        timeout={10000}
        />
        </div>
      )}

      {status === "success" &&
        data.map((stream) => {
          return (
            <>
              <VideoElement
                baseUrl={baseUrl}
                name={stream.channel}
                streamId={stream.id}
                key={stream.channel + stream.id}
              />
            </>
          );
        })}

      {status === "error" &&
          (
            <>
            <VideoElement
            baseUrl={baseUrl}
            name="Test Stream 1"
            streamId={21}
            key={1}
            />
            <VideoElement
            baseUrl={baseUrl}
            name="Test Stream 2"
            streamId={22}
            key={2}
            />
            <VideoElement
            baseUrl={baseUrl}
            name="Test Stream 3"
            streamId={23}
            key={3}
            />
            <VideoElement
            baseUrl={baseUrl}
            name="Test Stream 4"
            streamId={24}
            key={4}
            />
            </>
          )
      }
    </div>
  );
};

export default Home;
