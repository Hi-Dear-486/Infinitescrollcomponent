"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const InfiniteScrollExample1 = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    userdata();
  }, []);

  const userdata = async () => {
    try {
      const res = await axios.get(`https://api.escuelajs.co/api/v1/users`);
      console.log(res);
      setItems(res.data);
    } catch (error) {
      console.log("some thing is wrong check api");
    }
  };

  const fetchMoreData = () => {
    axios
      .get(`https://api.escuelajs.co/api/v1/users?${index}&limit=10`)
      .then((res) => {
        setItems((prevItems) => [...prevItems, ...res.data]);

        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <React.Fragment>
      <InfiniteScroll
        dataLength={items?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div>loading...</div>}
      >
        <div className="main">
          <h1 className="text-center text-bold text-4xl mb-10">
            Infinite Scroll Component
          </h1>

          <div className="container">
            {items?.map((item, index) => {
              const { name, avatar } = item;

              return (
                <div data={item} key={index}>
                  <div className="item item1">
                    <div className="img w-full h-3/4">
                      <img src={avatar} alt="" className="w-full h-full" />
                    </div>
                    <div className="detail flex justify-between px-2 relative top-4">
                      <div className="user w-4 h-4 rounded-full">
                        <img src={avatar} alt="" className="w-full h-full" />
                      </div>
                      <div className="title">{name}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </React.Fragment>
  );
};

export default InfiniteScrollExample1;
