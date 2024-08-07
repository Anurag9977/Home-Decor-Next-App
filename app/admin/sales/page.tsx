import EmptyList from "@/components/global/EmptyList";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminOrders } from "@/utils/actions";
import { formatPrice } from "@/utils/formatPrice";

async function SalesPage() {
  const sales = await getAdminOrders();

  if (sales.length === 0) {
    return <EmptyList text="No sales so far..." />;
  }
  return (
    <main>
      <h1 className="md:text-xl font-medium tracking-wide">Our Sales</h1>
      <Table className="mt-4 table-fixed sm:table-auto">
        <TableHeader>
          <TableRow className="text-xs md:text-sm tracking-wider break-words sm:break-normal">
            <TableHead className="w-[30px] md:w-auto">#</TableHead>
            <TableHead>Customer Email</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Total Products</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead className="text-right">Order Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale, index) => {
            const {
              id,
              email,
              createdAt,
              products,
              shipping,
              tax,
              orderTotal,
            } = sale;
            return (
              <TableRow
                key={id}
                className="text-xs md:text-sm break-words sm:break-normal"
              >
                <TableCell className="py-3">{index + 1}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{createdAt.toDateString()}</TableCell>
                <TableCell>{products}</TableCell>
                <TableCell>{formatPrice(shipping)}</TableCell>
                <TableCell>{formatPrice(tax)}</TableCell>
                <TableCell className="text-right">
                  {formatPrice(orderTotal)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableCaption className="md:text-base tracking-wider">
          Total Sales : {sales.length}
        </TableCaption>
      </Table>
    </main>
  );
}
export default SalesPage;
