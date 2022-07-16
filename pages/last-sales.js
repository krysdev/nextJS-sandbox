/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

const firebase =
  "https://nextjs-udemy-32a96-default-rtdb.europe-west1.firebasedatabase.app/";
const firebaseNode = "sales";
const firebasePath = firebase + firebaseNode + ".json";

function lastSalesPage(props) {
  const [sales, setSales] = useState();   // sales set to 'undefined'
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(firebasePath)
      .then((response) => response.json())
      .then((data) => {
        //*  data:
        //   {
        //     "s1": {
        //         "username": "user1",
        //         "volume": 100
        //     },
        //     "s2": {
        //         "username": "user2",
        //         "volume": 50
        //     }
        //   }

        const transformedData = [];

        // transform Object into Array
        for (const record in data) {
          transformedData.push({
            id: record,
            username: data[record].username,
            volume: data[record].volume,
          });
        }

        //*  transformedData:
        // [
        //   {
        //       "id": "s1",
        //       "username": "user1",
        //       "volume": 100
        //   },
        //   {
        //       "id": "s2",
        //       "username": "user2",
        //       "volume": 50
        //   }
        // ]

        setSales(transformedData); // 'sales' set to Array
        setIsLoading(false);

        function newFunction() {
          console.log(transformedData);
        }
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>
  }

  // Without this IF there will be an error wihle "sales.map", because 'sales' is initially undefined 
  // and it only gets some data after a FETCH wich happens in useEffect. The page is re-rendered after useEffect
  if (!sales) {
    return <p>No data yet</p> // in fact this is the prerenderd version of the page, data is fetched after the page is loaded for the first time
  }

  return (
    <ul>
      {sales.map(item =>(
        <li key={item.id}>{item.username} - {item.volume}</li>
      ))}
    </ul>
  );
}

export default lastSalesPage;
