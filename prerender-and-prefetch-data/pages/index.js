import {Inter} from 'next/font/google';
import fs from 'fs/promises';
import path from "path";

const inter = Inter({subsets: ['latin']})

const Home = (props) => {
    const {products} = props
    return (
        <ul>
            {products.map(product => (
                <li key={product.id}>{product.title}</li>)
            )}
        </ul>
    )
}
export const getStaticProps = async (context) => {
    const filePath = path.join(process.cwd(), 'data/dummy-backend.json')
    const fileJSON = await fs.readFile(filePath);
    const data = JSON.parse(fileJSON)
    console.log(data);
    if (!data) {
        return {
            redirect: {
                destination: '/no-data'
            }
        }
    }

    if (!data.products.length) {
        return {notFound: true}
    }
    return {
        props: {
            products: data.products
        },
        revalidate: 10,
    }
}
export default Home
