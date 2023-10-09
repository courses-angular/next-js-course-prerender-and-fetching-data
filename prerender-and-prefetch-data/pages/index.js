import {Inter} from 'next/font/google';
import fs from 'fs/promises';
import path from "path";
import Link from "next/link";

const inter = Inter({subsets: ['latin']})

const Home = (props) => {
    const {products} = props
    return (
        <ul>
            {products.map(product => (
                <li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link></li>)
            )}
        </ul>
    )
}
const getData = async () => {
    const filePath = path.join(process.cwd(), 'data/dummy-backend.json')
    const fileJSON = await fs.readFile(filePath);
    return JSON.parse(fileJSON)
}
export const getStaticProps = async (context) => {
    const data = await getData();
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
