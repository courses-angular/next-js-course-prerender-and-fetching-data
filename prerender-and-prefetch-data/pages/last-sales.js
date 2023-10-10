import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSales = (props) => {
  const [sales, setSales] = useState([props.sales]);
  // const [isLoading, setIsLoading] = useState(false);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://nextjs-course-b1a4b-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
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

  if (!data && !sales) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Failed to load</p>;
  }
  return (
    <ul>
      {sales.map((sale, index) => (
        <li key={index}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(
    "https://nextjs-course-b1a4b-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();
  const transformedData = [];
  for (const key in data) {
    transformedData.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return {
    props: { sales: transformedData, revalidate: 10 },
  };
};
export default LastSales;
