import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSales = () => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://nextjs-course-b1a4b-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
    console.group("%c GROUP", "color:#84B59F");
    console.log({ data });
    console.groupEnd();
    if (data) {
      const transformedData = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedData);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://nextjs-course-b1a4b-default-rtdb.firebaseio.com/sales.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedData = [];
  //       for (const key in data) {
  //         transformedData.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }
  //       setSales(transformedData);
  //       setIsLoading(false);
  //       console.log(data);
  //     });
  // }, []);

  if (!data) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Failed to load</p>;
  }
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};
export default LastSales;
