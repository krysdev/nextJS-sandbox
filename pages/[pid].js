import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
  const { singleProduct } = props;

  return (
    <div>
      <h1>{singleProduct.title}</h1>
      <p>{singleProduct.description}</p>
    </div>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const prodId = params.pid; // pid ==> [pid].js

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((prdct) => prdct.id === prodId);

  return {
    props: {
      singleProduct: product,
    },
  };
}

export default ProductDetailPage;
