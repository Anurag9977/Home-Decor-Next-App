import { IconButton } from "@/components/form/Buttons";
import EmptyList from "@/components/global/EmptyList";
import DeleteProductButton from "@/components/products/DeleteProductButton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminProducts } from "@/utils/actions";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";

async function AdminProductsPage() {
  const adminProducts = await getAdminProducts();

  if (adminProducts.length < 1) {
    return <EmptyList text="No products found..." />;
  }
  return (
    <main>
      <h1 className="md:text-xl font-medium tracking-wide">Our Products</h1>
      <Table className="mt-4">
        <TableHeader>
          <TableRow className="md:text-base tracking-wider">
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminProducts.map((product) => {
            const { id, name, company, price } = product;
            return (
              <TableRow key={id} className="text-xs md:text-sm">
                <TableCell className="py-3">
                  <Link
                    href={`/products/${id}`}
                    className="text-muted-foreground tracking-wide capitalize hover:underline"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{formatPrice(price)}</TableCell>
                <TableCell className="flex justify-end items-center gap-2">
                  <Link href={`/admin/products/${id}`}>
                    <IconButton actionType="edit" />
                  </Link>
                  <DeleteProductButton productID={id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableCaption className="md:text-base tracking-wider">
          Total Products : {adminProducts.length}
        </TableCaption>
      </Table>
    </main>
  );
}
export default AdminProductsPage;
