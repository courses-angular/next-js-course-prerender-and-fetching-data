import {useEffect, useState} from "react";

const LastSales = () => {
    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true)
        fetch('https://nextjs-course-b1a4b-default-rtdb.firebaseio.com/sales.json')
            .then(response => response.json())
            .then(data => {
                const transformedData = [];
                for (const key in data) {
                    transformedData.push({
                        id: key,
                        username: data[key].username,
                        volume: data[key].volume
                    })
                }
                setSales(transformedData);
                setIsLoading(false);
                console.log(data)
            })
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }
    if (!sales) {
        return <p>No data yet</p>
    }
    return <ul>
        {sales.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
    </ul>
}
export default LastSales
