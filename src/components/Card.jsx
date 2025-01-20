import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { IoMdMail } from "react-icons/io";
import { TbBrandWhatsappFilled } from "react-icons/tb";

const Card = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://www.reddit.com/r/reactjs.json");
        const result = await response.json();
        setData(result.data.children);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="container-fluid my-4">
      <div className="text-end bg-dark rounded p-3">
        <h5 className="mb-0 text-white">Stany Madanu (React Developer)</h5>
        <div>
          <span className="text-white me-2">
            <IoMdMail />
          </span>
          <a href="mailTo:stanymadhanu.sm@gmail.com" target="blank">
            stanymadhanu.sm@gmail.com
          </a>
        </div>

        <div>
          <a
            href="https://wa.me/916303101569?text=Hello%20there!"
            target="_blank"
            className="text-white text-decoration-none"
            rel="noopener noreferrer"
          >
            <span className="text-success me-2">
              <TbBrandWhatsappFilled size={20} />
            </span>
            Send Message
          </a>
        </div>
      </div>
      <div className="row">
        {data.length > 0 && console.log(data)}
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex my-2"
            >
              <div className="card flex-fill p-3 bg-black text-white">
                <div className="card-heading text-center">
                  <h5>{item.data.title}</h5>
                </div>
                <div
                  className="card-body"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      decodeHTML(item.data.selftext_html)
                    ),
                  }}
                />
                <div className="text-end">
                  <button className="btn btn-sm btn-primary">
                    <a
                      href={item.data.url}
                      target="blank"
                      className="text-decoration-none text-white"
                    >
                      Read More
                    </a>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5 className="text-center text-white mt-4">
            Fetching Data... Please Wait 🤗💚
          </h5>
        )}
      </div>
    </div>
  );
};

export default Card;
