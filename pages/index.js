import fs from "fs/promises";
import Link from "next/link";
import path from "path";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((listel) => (
        <li key={listel.id}><Link href={`/${listel.id}`}>{listel.title}</Link></li>
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
    props: { products: data.products },
    revalidate: 1000,
  };
}

export default HomePage;
