import { useEffect, useState } from "react";
import useSWR from "swr";

const firebaseURL =
  "https://nextjs-udemy-32a96-default-rtdb.europe-west1.firebasedatabase.app/";
const firebaseNode = "sales";
const firebasePath = firebaseURL + firebaseNode + ".json";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.salesdata); //! sales set to a pre-rendered value from FETCH in "staticProps"

  /*
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(firebasePath)
      .then((response) => response.json())
      .then((data) => {
        const transformedData = [];

        for (const record in data) {
          transformedData.push({
            id: record,
            username: data[record].username,
            volume: data[record].volume,
          });
        }

        setSales(transformedData);
        setIsLoading(false);
      });
  }, []);
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No data yet</p>;
  }
  
  */

  const { data, error } = useSWR(firebasePath, (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedData = [];
      for (const record in data) {
        transformedData.push({
          id: record,
          username: data[record].username,
          volume: data[record].volume,
        });
      }
      setSales(transformedData); //* 'sales' set to Array
    }
  }, [data]);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data && !sales) {  //! "&&"
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((item) => (
        <li key={item.id}>
          {item.username} - {item.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  return fetch(firebasePath)
    .then((response) => response.json())
    .then((data) => {
      const transformedData = [];

      for (const record in data) {
        transformedData.push({
          id: record,
          username: data[record].username,
          volume: data[record].volume,
        });
      }

      return {
        props: { salesdata: transformedData },
      };
    });
}

export default LastSalesPage;
