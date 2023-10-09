import {Fragment} from "react";
import path from "path";
import fs from "fs/promises";

const ProductDetails = (props) => {
    const {loadedProduct} = props;

    // If you use fallback: true, you should add a loading state to your component, since it will be rendered initially without any data.If you use fallback: 'blocking', you don't need to add a loading state, since Next.js will wait for the data to be loaded before rendering the page.
    if (!loadedProduct) {
        return <p>Loading...</p>
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title} </h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    )


}
export const getStaticPaths = async () => {
    const data = await getData();
    const ids = data.products.map(product => product.id);
    const pathsWithParams = ids.map(id => ({params: {id: id}}))
    return {
        paths: pathsWithParams,
        fallback: true
    }
}
const getData = async () => {
    const filePath = path.join(process.cwd(), 'data/dummy-backend.json')
    const fileJSON = await fs.readFile(filePath);
    return JSON.parse(fileJSON);
}
export const getStaticProps = async (context) => {
    const {params} = context
    const productId = params.id;
    const data = await getData();
    const product = data.products.find(product => product.id === productId);

    if (!product) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            loadedProduct: product
        }
    }
}
export default ProductDetails
