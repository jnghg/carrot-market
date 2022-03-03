import { ProductWithCount } from "pages";
import useSWR from "swr";
import Item from "./item";

interface Recod {
  id: number;
  product: ProductWithCount;
}
interface ProductListResponse {
  [key: string]: Recod[];
}

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          id={record.product.id}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.favs}
        />
      ))}
    </>
  ) : null;
}
