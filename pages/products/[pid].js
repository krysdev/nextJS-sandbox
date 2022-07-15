import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
  const { singleProduct } = props;

  // this is a fallback TRUE state for getStaticPaths
  if (!singleProduct) return <p>Loading...</p>; // the page will be re-rendered after it gets the data, but before 'Loading...' will be shown

  return (
    <div>
      <h1>{singleProduct.title}</h1>
      <p>{singleProduct.description}</p>
    </div>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const prodId = params.pid; // pid ==> [pid].js

  const data = await getData();

  const product = data.products.find((prdct) => prdct.id === prodId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      singleProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((item) => item.id);
  const paramsForPaths = ids.map((id) => ({ params: { pid: id } }));

  // paramsForPaths:
  // [
  //   { params: { pid: 'p1' } },
  //   { params: { pid: 'p2' } },
  //   { params: { pid: 'p3' } }
  // ]

  return {
    paths: paramsForPaths,
    fallback: true, // if you want to use fallback, then its state should be in the component body
    // fallback: 'blocking'  // when set to BLOCKING you don't need the fallback state in the component body (simply nothing is shown)
  };
}

export default ProductDetailPage;
