import EmptyList from "@/components/global/EmptyList";
import SectionTitle from "@/components/global/SectionTitle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserOrders } from "@/utils/actions";
import { formatPrice } from "@/utils/formatPrice";

async function OrdersPage() {
  const orders = await getUserOrders();
  if (orders.length === 0)
    return <EmptyList text="You do not have any orders currently." />;

  return (
    <main>
      <SectionTitle title="Your orders" />
      <Table className="mt-8">
        <TableHeader>
          <TableRow className="text-lg tracking-wider">
            <TableHead>#</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Total Products</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead className="text-right">Order Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => {
            const { id, createdAt, products, shipping, tax, orderTotal } =
              order;
            return (
              <TableRow key={id} className="text-base tracking-wide">
                <TableCell className="py-4">{index + 1}</TableCell>
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
        <TableCaption className="text-base tracking-wider">
          Total Orders : {orders.length}
        </TableCaption>
      </Table>
    </main>
  );
}
export default OrdersPage;
