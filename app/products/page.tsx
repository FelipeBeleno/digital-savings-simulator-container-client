import ProductsIndex from "@/components/pages/ProductsIndex"

export default async function ProductPage() {


    const res = await fetch(process.env.API_URL!, {
        next: {
            revalidate: 60 * 60 * 24
        }
    })
    const dummyProducts = await res.json()


    return (
        <ProductsIndex initialProducts={dummyProducts} />
    )
}
