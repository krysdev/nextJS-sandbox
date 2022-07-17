import fs from "fs/promises";
import path from "path";
import Link from "next/link";

function HomePage(props) {
  const { productsdata } = props;

  return (
    <ul>
      {productsdata.map((listel) => (
        <li key={listel.id}><Link href={`products/${listel.id}`}>{listel.title}</Link></li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log("Generating");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  
  // const data = null
  if (!data) {
    return {
      redirect: { destination: "/no-data" },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: { productsdata: data.products },
    revalidate: 1000,
  };
}

export default HomePage;
