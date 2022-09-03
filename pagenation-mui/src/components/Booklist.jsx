import React, { useState } from "react";
import { Box, CardContent, Card, Typography } from "@mui/material";
import axios from "axios";
import Classes from "./Booklist.module.css";

const Pagenation = () => {
  const [data, setdata] = useState([]);
  const [query, setquery] = useState("");
  const [pageno, setpageno] = useState(1);
  const onchangeHandler = async (event) => {
    if (event.target.value.length > 3) {
      setquery(event.target.value);
      const resp = await axios.get("http://openlibrary.org/search.json", {
        params: { q: query, page: 1 },
      });
      const resdata = await resp.data.docs;
      setdata(resdata);
    }
  };
  const scrollHanduler = async (event) => {
    const traget = event.target;
    if (traget.scrollHeight - traget.scrollTop === traget.clientHeight) {
      setpageno(pageno + 1);
      const resp = await axios.get("http://openlibrary.org/search.json", {
        params: { q: query, page: pageno },
      });
      const resdata = await resp.data.docs;
      setdata((prevdata) => {
        return [...prevdata, ...resdata];
      });
    }
  };

  return (
    <div>
      <input type="text" onChange={onchangeHandler} />
      <div className={Classes.content} onScroll={scrollHanduler}>
        <Box width="500px" height="500px">
          {data.map((bookData) => (
            <Card
              style={{
                backgroundColor: "lightblue",
                marginTop: "20px",
              }}
            >
              <CardContent>
                <Typography>Title: {bookData.title}</Typography>
                <Typography>Author Name: {bookData.author_name}</Typography>
                <Typography>PUblish_Year: {bookData.publish_year}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default Pagenation;
