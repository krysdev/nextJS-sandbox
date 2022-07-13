import fs from 'fs/promises'

function HomePage(props) {
  const {products} = props

  return (
    <ul>
      {
        products.map((listel)=>(
          <li key={listel.id}>{listel.title}</li>
        ))
      }

    </ul>
  );
}

export async function getStaticProps() {
  await fs.readFile()
  return {
    props: {
      products: [
        { id: "p1", title: "Product 1", description: "This is product 1" },
        { id: "p2", title: "Product 2", description: "This is product 2" },
        { id: "p3", title: "Product 3", description: "This is product 3" },
      ],
    },
  };
}

export default HomePage;
